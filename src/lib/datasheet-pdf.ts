import { readFile } from "node:fs/promises";
import path from "node:path";

import {
  PDFDocument,
  StandardFonts,
  rgb,
  type PDFFont,
  type PDFImage,
  type PDFPage,
} from "pdf-lib";

import { siteConfig } from "@/config/site";
import { sectorsById } from "@/data/sectors";
import { format, getDictionary } from "@/i18n";
import { primaryProductImage } from "@/lib/product-media";
import { resolveStandard } from "@/lib/standards";
import type { Locale, Product } from "@/types";

const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;
const MARGIN_X = 42;
const MARGIN_BOTTOM = 46;
const NAVY = rgb(10 / 255, 23 / 255, 39 / 255);
const GOLD = rgb(143 / 255, 106 / 255, 44 / 255);
const MUTED = rgb(0.38, 0.4, 0.43);
const RULE = rgb(0.82, 0.8, 0.76);
const TEXT = rgb(0.12, 0.14, 0.16);

function pdfSafe(value: string): string {
  return value
    .replaceAll("—", "-")
    .replaceAll("–", "-")
    .replaceAll("“", '"')
    .replaceAll("”", '"')
    .replaceAll("‘", "'")
    .replaceAll("’", "'")
    .replaceAll("…", "...")
    .replaceAll("·", " · ")
    .replace(/\s+/g, " ")
    .trim();
}

function publicPath(src: string): string | null {
  if (!src.startsWith("/") || src.includes("..") || src.includes("\\")) return null;
  const relative = src.replace(/^\/+/, "");
  const root = path.resolve(process.cwd(), "public");
  const absolute = path.resolve(root, relative);
  const prefix = root.endsWith(path.sep) ? root : `${root}${path.sep}`;
  if (absolute !== root && !absolute.startsWith(prefix)) return null;
  return absolute;
}

function wrapText(text: string, font: PDFFont, size: number, maxWidth: number): string[] {
  const safe = pdfSafe(text);
  if (!safe) return [];

  const paragraphs = safe.split(/\n+/);
  const lines: string[] = [];

  for (const paragraph of paragraphs) {
    const words = paragraph.split(/\s+/).filter(Boolean);
    if (words.length === 0) continue;

    let current = "";
    for (const word of words) {
      const candidate = current ? `${current} ${word}` : word;
      if (font.widthOfTextAtSize(candidate, size) <= maxWidth) {
        current = candidate;
        continue;
      }

      if (current) lines.push(current);

      if (font.widthOfTextAtSize(word, size) <= maxWidth) {
        current = word;
        continue;
      }

      let chunk = "";
      for (const char of word) {
        const next = `${chunk}${char}`;
        if (chunk && font.widthOfTextAtSize(next, size) > maxWidth) {
          lines.push(chunk);
          chunk = char;
        } else {
          chunk = next;
        }
      }
      current = chunk;
    }
    if (current) lines.push(current);
  }

  return lines;
}

async function embedPublicImage(doc: PDFDocument, src: string): Promise<PDFImage | null> {
  const filePath = publicPath(src);
  if (!filePath) return null;

  const bytes = await readFile(filePath).catch(() => null);
  if (!bytes) return null;

  const lower = filePath.toLowerCase();
  try {
    if (lower.endsWith(".png")) return await doc.embedPng(bytes);
    if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return await doc.embedJpg(bytes);
  } catch {
    return null;
  }

  return null;
}

function publicHost(): string {
  try {
    const host = new URL(siteConfig.url).hostname;
    return host === "localhost" ? "estepaworkwear.com" : host;
  } catch {
    return "estepaworkwear.com";
  }
}

class SheetWriter {
  private page: PDFPage;
  private pageIndex = 0;
  private y: number;

  constructor(
    private readonly doc: PDFDocument,
    private readonly fonts: { regular: PDFFont; bold: PDFFont },
    private readonly productName: string,
    private readonly filenameLabel: string,
    private readonly logo: PDFImage | null,
  ) {
    this.page = this.doc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    this.y = PAGE_HEIGHT;
  }

  get contentWidth(): number {
    return PAGE_WIDTH - MARGIN_X * 2;
  }

  startCover(kicker: string, code: string | undefined, fabric: string | undefined) {
    this.page.drawRectangle({
      x: 0,
      y: PAGE_HEIGHT - 72,
      width: PAGE_WIDTH,
      height: 72,
      color: rgb(1, 1, 1),
    });

    if (this.logo) {
      const logoHeight = 32;
      const logoWidth = (this.logo.width / this.logo.height) * logoHeight;
      this.page.drawImage(this.logo, {
        x: MARGIN_X,
        y: PAGE_HEIGHT - 52,
        width: Math.min(logoWidth, 160),
        height: logoHeight,
      });
    } else {
      this.page.drawText("ESTEPA", {
        x: MARGIN_X,
        y: PAGE_HEIGHT - 42,
        size: 16,
        font: this.fonts.bold,
        color: NAVY,
      });
    }

    const title = pdfSafe(this.filenameLabel).toUpperCase();
    const titleWidth = this.fonts.bold.widthOfTextAtSize(title, 11);
    this.page.drawText(title, {
      x: PAGE_WIDTH - MARGIN_X - titleWidth,
      y: PAGE_HEIGHT - 34,
      size: 11,
      font: this.fonts.bold,
      color: GOLD,
    });

    const kickerText = pdfSafe(kicker);
    const kickerWidth = this.fonts.regular.widthOfTextAtSize(kickerText, 8);
    this.page.drawText(kickerText, {
      x: PAGE_WIDTH - MARGIN_X - kickerWidth,
      y: PAGE_HEIGHT - 50,
      size: 8,
      font: this.fonts.regular,
      color: MUTED,
    });

    this.page.drawLine({
      start: { x: 0, y: PAGE_HEIGHT - 72 },
      end: { x: PAGE_WIDTH, y: PAGE_HEIGHT - 72 },
      thickness: 2,
      color: NAVY,
    });

    this.y = PAGE_HEIGHT - 96;
    this.drawHeading(this.productName, 20);
    const meta = [code, fabric].filter((value): value is string => Boolean(value)).join("  |  ");
    if (meta) this.drawMuted(meta, 9);
  }

  newPage() {
    this.drawFooter();
    this.page = this.doc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    this.pageIndex += 1;
    this.page.drawRectangle({
      x: 0,
      y: PAGE_HEIGHT - 28,
      width: PAGE_WIDTH,
      height: 28,
      color: NAVY,
    });
    this.page.drawText(pdfSafe(this.productName), {
      x: MARGIN_X,
      y: PAGE_HEIGHT - 18,
      size: 8,
      font: this.fonts.bold,
      color: rgb(1, 1, 1),
    });
    this.y = PAGE_HEIGHT - 48;
  }

  ensure(height: number) {
    if (this.y - height < MARGIN_BOTTOM) this.newPage();
  }

  gap(size = 10) {
    this.y -= size;
  }

  drawHeading(text: string, size = 11) {
    const lines = wrapText(text, this.fonts.bold, size, this.contentWidth);
    const lineHeight = size + 3;
    this.ensure(lines.length * lineHeight + 4);
    for (const line of lines) {
      this.page.drawText(line, {
        x: MARGIN_X,
        y: this.y - size,
        size,
        font: this.fonts.bold,
        color: NAVY,
      });
      this.y -= lineHeight;
    }
    this.y -= 2;
  }

  drawSection(title: string) {
    this.ensure(28);
    this.y -= 8;
    this.page.drawText(pdfSafe(title).toUpperCase(), {
      x: MARGIN_X,
      y: this.y - 9,
      size: 8,
      font: this.fonts.bold,
      color: NAVY,
    });
    this.y -= 14;
    this.page.drawLine({
      start: { x: MARGIN_X, y: this.y },
      end: { x: PAGE_WIDTH - MARGIN_X, y: this.y },
      thickness: 1,
      color: NAVY,
    });
    this.y -= 10;
  }

  drawMuted(text: string, size = 9) {
    this.drawParagraph(text, size, MUTED);
  }

  drawParagraph(text: string, size = 9.5, color = TEXT, width = this.contentWidth) {
    const lines = wrapText(text, this.fonts.regular, size, width);
    const lineHeight = size + 3.5;
    for (const line of lines) {
      this.ensure(lineHeight);
      this.page.drawText(line, {
        x: MARGIN_X,
        y: this.y - size,
        size,
        font: this.fonts.regular,
        color,
      });
      this.y -= lineHeight;
    }
  }

  drawKeyValue(label: string, value: string, width = this.contentWidth) {
    const labelText = `${pdfSafe(label)}: `;
    const labelWidth = this.fonts.bold.widthOfTextAtSize(labelText, 9);
    const valueWidth = Math.max(40, width - labelWidth);
    const valueLines = wrapText(value, this.fonts.regular, 9, valueWidth);
    const lines = valueLines.length > 0 ? valueLines : [""];
    this.ensure(lines.length * 12.5);

    this.page.drawText(labelText, {
      x: MARGIN_X,
      y: this.y - 9,
      size: 9,
      font: this.fonts.bold,
      color: NAVY,
    });
    this.page.drawText(lines[0] ?? "", {
      x: MARGIN_X + labelWidth,
      y: this.y - 9,
      size: 9,
      font: this.fonts.regular,
      color: TEXT,
    });
    this.y -= 12.5;

    for (const line of lines.slice(1)) {
      this.ensure(12.5);
      this.page.drawText(line, {
        x: MARGIN_X + labelWidth,
        y: this.y - 9,
        size: 9,
        font: this.fonts.regular,
        color: TEXT,
      });
      this.y -= 12.5;
    }
  }

  drawBullet(text: string) {
    const lines = wrapText(text, this.fonts.regular, 9, this.contentWidth - 12);
    this.ensure(lines.length * 12.5);
    this.page.drawCircle({
      x: MARGIN_X + 3,
      y: this.y - 5,
      size: 1.4,
      color: GOLD,
    });
    for (const [index, line] of lines.entries()) {
      this.page.drawText(line, {
        x: MARGIN_X + 12,
        y: this.y - 9,
        size: 9,
        font: this.fonts.regular,
        color: TEXT,
      });
      this.y -= 12.5;
      if (index < lines.length - 1) this.ensure(12.5);
    }
  }

  drawPhoto(image: PDFImage, maxWidth: number, maxHeight: number) {
    const scaled = image.scaleToFit(maxWidth, maxHeight);
    this.ensure(scaled.height + 16);
    const y = this.y - scaled.height;
    this.page.drawRectangle({
      x: MARGIN_X,
      y: y - 4,
      width: scaled.width,
      height: scaled.height + 8,
      borderColor: RULE,
      borderWidth: 0.6,
      color: rgb(0.97, 0.96, 0.94),
    });
    this.page.drawImage(image, {
      x: MARGIN_X,
      y,
      width: scaled.width,
      height: scaled.height,
    });
    this.y = y - 14;
  }

  finish() {
    this.drawFooter();
  }

  private drawFooter() {
    this.page.drawLine({
      start: { x: MARGIN_X, y: 32 },
      end: { x: PAGE_WIDTH - MARGIN_X, y: 32 },
      thickness: 1.2,
      color: NAVY,
    });
    this.page.drawText(siteConfig.companyName, {
      x: MARGIN_X,
      y: 18,
      size: 8,
      font: this.fonts.bold,
      color: NAVY,
    });
    const host = `www.${publicHost()}`;
    const pageLabel = `${this.pageIndex + 1}`;
    const hostWidth = this.fonts.regular.widthOfTextAtSize(host, 8);
    this.page.drawText(host, {
      x: PAGE_WIDTH / 2 - hostWidth / 2,
      y: 18,
      size: 8,
      font: this.fonts.regular,
      color: MUTED,
    });
    const pageWidth = this.fonts.regular.widthOfTextAtSize(pageLabel, 8);
    this.page.drawText(pageLabel, {
      x: PAGE_WIDTH - MARGIN_X - pageWidth,
      y: 18,
      size: 8,
      font: this.fonts.regular,
      color: MUTED,
    });
  }
}

export async function buildDatasheetPdf(product: Product, locale: Locale): Promise<Uint8Array> {
  const dictionary = getDictionary(locale);
  const copy = dictionary.product;
  const info = product.technicalInfo;
  const sector = sectorsById[product.sectors[0] ?? "industry"];
  const certifications = (product.certifications ?? []).map(resolveStandard);

  const doc = await PDFDocument.create();
  doc.setTitle(format(copy.datasheetTitle, { name: product.name[locale] }));
  doc.setAuthor(siteConfig.companyName);
  doc.setSubject(product.shortDescription[locale]);
  doc.setCreator(siteConfig.companyName);
  doc.setProducer(siteConfig.companyName);

  const fonts = {
    regular: await doc.embedFont(StandardFonts.Helvetica),
    bold: await doc.embedFont(StandardFonts.HelveticaBold),
  };

  const logo = await embedPublicImage(doc, "/logo.png");
  const photoSrc = primaryProductImage(product)?.src;
  const photo = photoSrc ? await embedPublicImage(doc, photoSrc) : null;

  const writer = new SheetWriter(doc, fonts, product.name[locale], copy.datasheet, logo);

  writer.startCover(
    format(copy.datasheetLine, { name: sector.name[locale] }),
    info?.code,
    product.fabricFamily ?? info?.fabric,
  );

  writer.drawMuted(dictionary.products.categories[product.category], 8);
  writer.drawParagraph(product.shortDescription[locale], 10);
  writer.gap(8);

  if (photo) writer.drawPhoto(photo, 220, 260);

  if (info) {
    writer.drawSection(dictionary.trust.composition);
    if (info.fabric) writer.drawParagraph(info.fabric, 10, NAVY);
    if (info.layers && info.layers.length > 0) {
      for (const layer of info.layers) {
        writer.drawKeyValue(layer.label[locale], layer.value[locale]);
      }
    } else {
      writer.drawParagraph(
        [info.composition[locale], info.weight].filter(Boolean).join(" · "),
        9.5,
      );
    }
  }

  if (product.colors && product.colors.length > 0) {
    writer.drawSection(copy.colors);
    writer.drawParagraph(product.colors.map((color) => color.name[locale]).join(" · "));
  }

  if (product.sizes && product.sizes.length > 0) {
    writer.drawSection(copy.sizesTitle);
    writer.drawParagraph(product.sizes.join("  ·  "), 10, NAVY);
  }

  if (product.technicalFeatures && product.technicalFeatures.length > 0) {
    writer.drawSection(copy.datasheetFeatures);
    for (const feature of product.technicalFeatures) {
      writer.drawKeyValue(feature.label[locale], feature.value[locale]);
    }
  } else if (product.description[locale]) {
    writer.drawSection(copy.overview);
    writer.drawParagraph(product.description[locale]);
  }

  if (certifications.length > 0) {
    writer.drawSection(copy.standards);
    for (const certification of certifications) {
      const detail = certification.description?.[locale];
      writer.drawKeyValue(certification.name, detail ?? certification.name);
    }
  } else {
    writer.drawSection(copy.standards);
    writer.drawMuted(copy.datasheetCertificatesPending);
  }

  if (product.materials?.[locale]?.length) {
    writer.drawSection(copy.materials);
    for (const item of product.materials[locale]) writer.drawBullet(item);
  }

  if (product.recommendedUse?.[locale]?.length) {
    writer.drawSection(copy.recommendedUse);
    for (const item of product.recommendedUse[locale]) writer.drawBullet(item);
  }

  if (product.care?.[locale]?.length) {
    writer.drawSection(copy.datasheetCare);
    for (const item of product.care[locale]) writer.drawBullet(item);
  }

  writer.gap(8);
  writer.drawMuted(copy.datasheetMeasurementsPending, 8);

  const contactBits = [
    siteConfig.contact.address,
    siteConfig.contact.phone,
    siteConfig.contact.email,
  ].filter((value) => value.length > 0);
  if (contactBits.length > 0) {
    writer.gap(6);
    writer.drawMuted(contactBits.join("  |  "), 8);
  }

  writer.finish();
  return doc.save();
}

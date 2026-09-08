import { NextResponse } from "next/server";

import { resolveLocale } from "@/i18n";
import { datasheetPdfFilename } from "@/lib/datasheet";
import { buildDatasheetPdf } from "@/lib/datasheet-pdf";
import { getProductBySlug } from "@/lib/repositories/products";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export async function GET(request: Request, { params }: RouteContext) {
  const { slug } = await params;
  const locale = resolveLocale(new URL(request.url).searchParams.get("locale") ?? undefined);
  const product = await getProductBySlug(slug);

  if (!product) {
    return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
  }

  const bytes = await buildDatasheetPdf(product, locale);
  const filename = datasheetPdfFilename(product.slug, locale);

  return new NextResponse(Buffer.from(bytes), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${filename}"`,
      "Cache-Control": "private, no-store",
    },
  });
}

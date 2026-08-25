import Image from "next/image";

import { CareSymbols } from "@/components/products/care-symbols";
import { CertificationBadge, CertificationRow } from "@/components/products/certification-badge";
import { ColorSwatches } from "@/components/products/technical-sheet";
import { SizeDiagram, sizeMeasureIds, sizeMeasureKeys } from "@/components/products/size-diagram";
import { siteConfig } from "@/config/site";
import { sectorsById } from "@/data/sectors";
import { format, getDictionary } from "@/i18n";
import { cn } from "@/lib/utils";
import type { Locale, Product } from "@/types";

/** Marks shown beside the photo on the sheet — same family as the competitor layout, ESTEPA ids only. */
const SHEET_MARK_IDS = ["ul", "nfpa-2112", "en-11612", "en-61482"] as const;

function publicHost(): string {
  try {
    const host = new URL(siteConfig.url).hostname;
    return host === "localhost" ? "estepaworkwear.com" : host;
  } catch {
    return "estepaworkwear.com";
  }
}

function SheetHeading({ children }: { readonly children: string }) {
  return (
    <h2 className="mb-2 border-b border-navy-900 pb-1 font-display text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-navy-900">
      {children}
    </h2>
  );
}

export function FichaTecnica({
  product,
  locale,
}: {
  readonly product: Product;
  readonly locale: Locale;
}) {
  const dictionary = getDictionary(locale);
  const copy = dictionary.product;
  const info = product.technicalInfo;
  const sector = sectorsById[product.sectors[0] ?? "industry"];
  const photo = product.images.find((image) => image.kind === "studio") ?? product.images[0];
  const certifications = product.certifications ?? [];
  const featured = SHEET_MARK_IDS.map((id) =>
    certifications.find((certification) => certification.id === id),
  ).filter((certification): certification is NonNullable<typeof certification> => Boolean(certification));
  const remaining = certifications.filter(
    (certification) => !SHEET_MARK_IDS.includes(certification.id as (typeof SHEET_MARK_IDS)[number]),
  );
  const measures = sizeMeasureKeys[product.category];
  const sizes = product.sizes ?? [];
  const contactBits = [
    siteConfig.contact.address,
    siteConfig.contact.phone,
    siteConfig.contact.email,
  ].filter((value) => value.length > 0);

  return (
    <article className="datasheet-page border border-border bg-white text-navy-900 shadow-card print:border-0 print:shadow-none">
      <header className="flex flex-wrap items-start justify-between gap-4 border-b-2 border-navy-900 px-5 py-4 sm:px-7">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt={siteConfig.companyName}
            width={1774}
            height={887}
            className="h-10 w-auto sm:h-11"
          />
          <div>
            <p className="font-display text-[0.625rem] font-semibold uppercase tracking-[0.28em] text-text-muted">
              Workwear
            </p>
            {contactBits.length > 0 ? (
              <p className="mt-1 max-w-[18rem] text-[0.6875rem] leading-snug text-text-muted">
                {contactBits.join(" · ")}
              </p>
            ) : null}
          </div>
        </div>

        <div className="text-right">
          <p className="font-display text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-accent">
            {format(copy.datasheetLine, { name: sector.name[locale] })}
          </p>
          {info?.code ? (
            <p className="mt-1 font-display text-sm font-bold tracking-[0.08em] text-navy-900">
              {info.code}
            </p>
          ) : null}
          {product.fabricFamily ? (
            <p className="mt-0.5 font-display text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-accent">
              {product.fabricFamily}
            </p>
          ) : null}
        </div>
      </header>

      <div className="border-b border-border px-5 py-4 sm:px-7">
        <p className="font-display text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-text-subtle">
          {dictionary.products.categories[product.category]}
        </p>
        <h1 className="mt-1 text-2xl leading-tight text-navy-900 sm:text-3xl">
          {product.name[locale]}
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-text-muted">
          {product.shortDescription[locale]}
        </p>
      </div>

      <div className="grid gap-8 px-5 py-6 sm:px-7 lg:grid-cols-12">
        <div className="space-y-5 lg:col-span-6">
          <section>
            <SheetHeading>{copy.datasheetFeatures}</SheetHeading>
            {product.technicalFeatures && product.technicalFeatures.length > 0 ? (
              <dl className="space-y-1.5">
                {product.technicalFeatures.map((feature) => (
                  <div key={feature.label[locale]} className="text-xs leading-snug">
                    <dt className="inline font-semibold text-navy-900">
                      {feature.label[locale]}:{" "}
                    </dt>
                    <dd className="inline text-text">{feature.value[locale]}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="text-xs text-text-muted">{product.description[locale]}</p>
            )}
          </section>

          {info ? (
            <section>
              <SheetHeading>{dictionary.trust.composition}</SheetHeading>
              {info.fabric ? (
                <p className="text-sm font-semibold text-navy-900">{info.fabric}</p>
              ) : null}
              {info.layers && info.layers.length > 0 ? (
                <dl className="mt-1 space-y-0.5 text-xs text-text">
                  {info.layers.map((layer) => (
                    <div key={layer.label[locale]}>
                      <dt className="inline font-medium text-text-muted">{layer.label[locale]}: </dt>
                      <dd className="inline">{layer.value[locale]}</dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <p className="mt-1 text-xs leading-relaxed text-text">
                  {info.composition[locale]}
                  {info.weight ? ` · ${info.weight}` : null}
                </p>
              )}
            </section>
          ) : null}

          {product.care?.[locale]?.length ? (
            <section>
              <SheetHeading>{copy.datasheetCare}</SheetHeading>
              <CareSymbols locale={locale} />
              <ul className="mt-2 list-disc space-y-0.5 pl-4 text-[0.6875rem] leading-snug text-text">
                {product.care[locale].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ) : null}

          {product.colors && product.colors.length > 0 ? (
            <section>
              <SheetHeading>{copy.colors}</SheetHeading>
              <ColorSwatches product={product} locale={locale} />
            </section>
          ) : null}
        </div>

        <div className="lg:col-span-6">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
            <div className="relative aspect-4/5 overflow-hidden border border-border bg-sand-100">
              {photo ? (
                <Image
                  src={photo.src}
                  alt={photo.alt[locale]}
                  fill
                  priority
                  sizes="(min-width: 1024px) 28vw, 70vw"
                  className="object-cover"
                />
              ) : null}
            </div>

            {featured.length > 0 ? (
              <ul className="flex w-[4.85rem] flex-col items-center gap-3">
                {featured.map((certification) => (
                  <li key={certification.id}>
                    <CertificationBadge
                      certification={certification}
                      locale={locale}
                      compact
                    />
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          {remaining.length > 0 ? (
            <div className="mt-4">
              <p className="mb-2 font-display text-[0.5625rem] font-semibold uppercase tracking-[0.14em] text-text-subtle">
                {copy.standards}
              </p>
              <CertificationRow certifications={remaining} locale={locale} compact />
            </div>
          ) : null}

          {certifications.length === 0 ? (
            <p className="mt-4 text-[0.6875rem] leading-relaxed text-text-muted">
              {copy.datasheetCertificatesPending}
            </p>
          ) : null}
        </div>
      </div>

      <section className="grid gap-6 border-t border-border px-5 py-5 sm:px-7 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SizeDiagram
            category={product.category}
            caption={copy.datasheetDiagramCaption}
            kicker={copy.datasheetCutTitle}
          />
          <ul className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1 text-[0.6875rem] text-text">
            {sizeMeasureIds.map((id) => (
              <li key={id}>
                <span className="font-display font-bold text-navy-900">{id}</span>
                <span className="text-text-muted"> — {copy.sizeMeasures[measures[id]]}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-7">
          <SheetHeading>{copy.datasheetSizeChart}</SheetHeading>
          {sizes.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[20rem] border-collapse text-center text-xs">
                <caption className="mb-2 text-left font-display text-[0.5625rem] font-semibold uppercase tracking-[0.12em] text-text-subtle">
                  {copy.datasheetSizeUnit}
                </caption>
                <thead>
                  <tr className="bg-navy-900 text-white">
                    <th className="px-2 py-1.5 font-display text-[0.625rem] font-bold uppercase tracking-[0.08em]">
                      {locale === "es" ? "Medida" : "Measure"}
                    </th>
                    {sizes.map((size) => (
                      <th
                        key={size}
                        className="px-2 py-1.5 font-display text-[0.625rem] font-bold uppercase tracking-[0.08em]"
                      >
                        {size}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sizeMeasureIds.map((id, index) => (
                    <tr
                      key={id}
                      className={cn(index % 2 === 0 ? "bg-sand-50" : "bg-white")}
                    >
                      <th className="border-b border-border px-2 py-1.5 text-left font-display font-bold text-navy-900">
                        {id}
                      </th>
                      {sizes.map((size) => (
                        <td key={size} className="border-b border-border px-2 py-1.5 text-text-subtle">
                          —
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
          <p className="mt-3 text-[0.6875rem] leading-relaxed text-text-muted">
            {copy.datasheetMeasurementsPending}
          </p>
        </div>
      </section>

      <footer className="flex flex-wrap items-center justify-between gap-2 border-t-2 border-navy-900 px-5 py-3 sm:px-7">
        <p className="font-display text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-navy-900">
          {siteConfig.companyName}
        </p>
        <p className="font-display text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-text-muted">
          www.{publicHost()}
        </p>
      </footer>
    </article>
  );
}

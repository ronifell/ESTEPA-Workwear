import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AddToCart } from "@/components/products/add-to-cart";
import { JsonLd } from "@/components/seo/json-ld";
import { ProductGallery } from "@/components/products/product-gallery";
import { ProductGrid } from "@/components/products/product-grid";
import { SpecBlock } from "@/components/products/spec-block";
import { CertificationRow } from "@/components/products/certification-badge";
import { TechnicalSheet } from "@/components/products/technical-sheet";
import { CtaSection } from "@/components/shared/cta-section";
import { WarrantyBadge } from "@/components/shared/warranty-badge";
import { ProtectionIcon } from "@/components/shared/protection-icon";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { DocumentIcon, DownloadIcon } from "@/components/ui/icons";
import { LocalizedLink } from "@/components/ui/localized-link";
import { Notice } from "@/components/ui/notice";
import { Section, SectionHeading } from "@/components/ui/section";
import { buttonStyles } from "@/components/ui/button";
import { locales, siteConfig } from "@/config/site";
import { protectionsById } from "@/data/protections";
import { sectorsById } from "@/data/sectors";
import { getDictionary, resolveLocale } from "@/i18n";
import { getPath } from "@/i18n/routes";
import { formatPrice } from "@/lib/format";
import {
  getAllProductSlugs,
  getProductBySlug,
  getRelatedProducts,
} from "@/lib/repositories/products";
import { buildPageMetadata, buildProductSchema } from "@/lib/seo";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllProductSlugs();
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = resolveLocale(rawLocale);
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: getDictionary(locale).notFound.title, robots: { index: false } };
  }

  return buildPageMetadata({
    route: "productDetail",
    locale,
    params: { slug },
    title: product.name[locale],
    description: product.shortDescription[locale],
    ...(product.images[0] ? { image: product.images[0].src } : {}),
  });
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { locale: rawLocale, slug } = await params;
  const locale = resolveLocale(rawLocale);
  const dictionary = getDictionary(locale);

  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const related = await getRelatedProducts(product, 3);
  const copy = dictionary.product;
  const showPrice = siteConfig.commerce.pricesEnabled && product.price !== undefined;

  const documents = product.documents ?? [];
  const availableDocuments = documents.filter((document) => document.url.length > 0);

  return (
    <>
      <JsonLd
        id={`product-jsonld-${product.slug}`}
        data={buildProductSchema(product, locale)}
      />

      <Section tone="default" className="pt-8 pb-0 sm:pt-10 lg:pt-12 lg:pb-0" flush>
        <div className="container-page pt-8 lg:pt-10">
          <Breadcrumbs
            items={[
              { label: dictionary.nav.home, href: getPath("home", locale) },
              { label: copy.breadcrumbProducts, href: getPath("products", locale) },
              { label: product.name[locale] },
            ]}
          />
        </div>
      </Section>

      <Section tone="default" className="pt-8 lg:pt-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6 xl:col-span-5">
            <ProductGallery product={product} />
          </div>

          <div className="lg:col-span-6 xl:col-span-7">
            <p className="font-display text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-accent">
              {dictionary.products.categories[product.category]}
            </p>

            <h1 className="mt-3 text-3xl leading-[1.1] text-navy-900 sm:text-4xl">
              {product.name[locale]}
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-text-muted">
              {product.shortDescription[locale]}
            </p>

            <TechnicalSheet product={product} locale={locale} />

            <LocalizedLink
              route="productDatasheet"
              locale={locale}
              params={{ slug: product.slug }}
              className={buttonStyles("outline", "md", "mt-4")}
            >
              <DocumentIcon className="size-4" />
              {copy.datasheetOpen}
            </LocalizedLink>

            <div className="mt-6 flex flex-wrap gap-2">
              {product.sectors.map((id) => (
                <Badge key={id} tone="primary">
                  {sectorsById[id].name[locale]}
                </Badge>
              ))}
              {product.protections.map((id) => (
                <Badge key={id} tone="accent">
                  {protectionsById[id].name[locale]}
                </Badge>
              ))}
            </div>

            <div className="mt-8 border-y border-border py-6">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <span
                  className={
                    showPrice
                      ? "font-display text-3xl font-bold text-navy-900"
                      : "font-display text-xl font-semibold text-text-muted"
                  }
                >
                  {showPrice && product.price !== undefined
                    ? formatPrice(product.price, locale, product.currency)
                    : copy.priceOnRequest}
                </span>
                <span className="font-display text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-text-subtle">
                  {product.preliminary ? copy.stockPending : copy.stockAvailable}
                </span>
              </div>

              {!showPrice ? (
                <p className="mt-2 text-sm text-text-muted">{copy.priceNote}</p>
              ) : null}
            </div>

            <div className="mt-8">
              <AddToCart product={product} />
            </div>

            <WarrantyBadge locale={locale} className="mt-8" />

            {product.preliminary ? (
              <Notice tone="pending" className="mt-8" title={copy.preliminaryTitle}>
                {copy.preliminaryDescription}
              </Notice>
            ) : null}
          </div>
        </div>
      </Section>

      <Section tone="muted">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-border bg-surface p-6 lg:p-8">
              <SpecBlock title={copy.overview} pendingLabel={copy.documentsPending}>
                <p className="text-sm leading-relaxed text-text">{product.description[locale]}</p>
              </SpecBlock>

              <SpecBlock
                title={copy.benefits}
                items={product.benefits?.[locale]}
                pendingLabel={copy.documentsPending}
              />

              <SpecBlock title={copy.technical} pendingLabel={copy.documentsPending}>
                {product.technicalFeatures && product.technicalFeatures.length > 0 ? (
                  <dl className="divide-y divide-border">
                    {product.technicalFeatures.map((feature) => (
                      <div
                        key={feature.label[locale]}
                        className="grid gap-1 py-2.5 sm:grid-cols-3 sm:gap-4"
                      >
                        <dt className="text-sm font-medium text-text-muted">
                          {feature.label[locale]}
                        </dt>
                        <dd className="text-sm text-text sm:col-span-2">
                          {feature.value[locale]}
                        </dd>
                      </div>
                    ))}
                  </dl>
                ) : null}
              </SpecBlock>

              <SpecBlock
                title={copy.materials}
                items={product.materials?.[locale]}
                pendingLabel={copy.documentsPending}
              />

              <SpecBlock
                title={copy.recommendedUse}
                items={product.recommendedUse?.[locale]}
                pendingLabel={copy.documentsPending}
                tone="band"
              />

              <SpecBlock
                title={copy.care}
                items={product.care?.[locale]}
                pendingLabel={copy.documentsPending}
              />
            </div>
          </div>

          <div className="space-y-5 lg:col-span-5">
            <div className="rounded-3xl border border-border bg-surface p-6">
              <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-navy-900">
                {copy.protectionAndCertifications}
              </h3>

              <ul className="mt-5 space-y-4">
                {product.protections.map((id) => {
                  const protection = protectionsById[id];
                  return (
                    <li key={id} className="flex gap-3">
                      <ProtectionIcon
                        id={id}
                        className="mt-0.5 size-5 shrink-0 text-accent"
                        strokeWidth={1.4}
                      />
                      <div>
                        <LocalizedLink
                          route="protection"
                          locale={locale}
                          hash={id}
                          className="font-display text-sm font-semibold text-navy-900 transition-colors hover:text-accent"
                        >
                          {protection.name[locale]}
                        </LocalizedLink>
                        <p className="mt-1 text-xs leading-relaxed text-text-muted">
                          {protection.shortDescription[locale]}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>

              {(product.certifications ?? []).length > 0 ? (
                <div className="mt-6 border-t border-border pt-5">
                  <p className="mb-3 font-display text-[0.5625rem] font-semibold uppercase tracking-[0.14em] text-text-subtle">
                    {copy.standards}
                  </p>
                  <CertificationRow
                    certifications={product.certifications ?? []}
                    locale={locale}
                    compact
                  />
                </div>
              ) : (
                <Notice tone="pending" className="mt-6">
                  {dictionary.protectionPage.disclaimerDescription}
                </Notice>
              )}
            </div>

            {product.sizes && product.sizes.length > 0 ? (
              <div className="rounded-3xl border border-border bg-surface p-6">
                <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-navy-900">
                  {copy.sizesTitle}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <li
                      key={size}
                      className="min-w-12 rounded-2xl border border-border-strong px-3 py-1.5 font-display text-xs font-semibold text-text"
                    >
                      {size}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs leading-relaxed text-text-subtle">
                  <LocalizedLink
                    route="productDatasheet"
                    locale={locale}
                    params={{ slug: product.slug }}
                    className="font-semibold text-primary hover:text-accent"
                  >
                    {copy.sizeGuide}
                  </LocalizedLink>
                  {": "}
                  {copy.sizeGuideNote}
                </p>
              </div>
            ) : null}

            <div className="rounded-3xl border border-border bg-surface p-6">
              <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-navy-900">
                {copy.documents}
              </h3>

              <ul className="mt-4 space-y-2">
                <li>
                  <LocalizedLink
                    route="productDatasheet"
                    locale={locale}
                    params={{ slug: product.slug }}
                    className="group flex items-center gap-3 rounded-2xl border border-border px-4 py-3 transition-colors hover:border-primary"
                  >
                    <DocumentIcon className="size-4 shrink-0 text-accent" />
                    <span className="flex-1 text-sm text-text">{copy.datasheet}</span>
                    <DownloadIcon className="size-4 text-text-subtle transition-colors group-hover:text-primary" />
                  </LocalizedLink>
                </li>
                {availableDocuments.map((document) => (
                  <li key={document.id}>
                    <a
                      href={document.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group flex items-center gap-3 rounded-2xl border border-border px-4 py-3 transition-colors hover:border-primary"
                    >
                      <DocumentIcon className="size-4 shrink-0 text-accent" />
                      <span className="flex-1 text-sm text-text">{document.label[locale]}</span>
                      <DownloadIcon className="size-4 text-text-subtle transition-colors group-hover:text-primary" />
                    </a>
                  </li>
                ))}
              </ul>
              {availableDocuments.length === 0 ? (
                <p className="mt-3 text-xs leading-relaxed text-text-subtle">
                  {copy.documentsPendingDescription}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </Section>

      {related.length > 0 ? (
        <Section tone="default">
          <SectionHeading eyebrow={dictionary.products.eyebrow} title={copy.related} />
          <ProductGrid
            products={related}
            locale={locale}
            columns={3}
            className="mt-10 lg:mt-12"
          />
        </Section>
      ) : null}

      <CtaSection locale={locale} />
    </>
  );
}

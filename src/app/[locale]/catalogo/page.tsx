import type { Metadata } from "next";

import { ProductGrid } from "@/components/products/product-grid";
import { CtaSection } from "@/components/shared/cta-section";
import { PageHero } from "@/components/shared/page-hero";
import { ProtectionIcon } from "@/components/shared/protection-icon";
import { buttonStyles } from "@/components/ui/button";
import { ArrowRightIcon, DownloadIcon } from "@/components/ui/icons";
import { LocalizedLink } from "@/components/ui/localized-link";
import { Notice } from "@/components/ui/notice";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { siteConfig } from "@/config/site";
import { protections } from "@/data/protections";
import { sectors } from "@/data/sectors";
import { format, getDictionary, resolveLocale } from "@/i18n";
import { getPath } from "@/i18n/routes";
import { categoryIds } from "@/lib/product-filters";
import {
  countProductsByProtection,
  countProductsBySector,
  getProducts,
} from "@/lib/repositories/products";
import { buildMetadataFromDictionary } from "@/lib/seo";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadataFromDictionary("catalog", resolveLocale(locale), "catalog");
}

export default async function CatalogPage({ params }: PageProps) {
  const locale = resolveLocale((await params).locale);
  const dictionary = getDictionary(locale);
  const copy = dictionary.catalogPage;

  const [allProducts, sectorCounts, protectionCounts] = await Promise.all([
    getProducts(),
    countProductsBySector(),
    countProductsByProtection(),
  ]);

  const categoryCounts = categoryIds.map((id) => ({
    id,
    count: allProducts.filter((product) => product.category === id).length,
  }));

  const countLabel = (count: number) =>
    count === 1
      ? dictionary.products.results.one
      : format(dictionary.products.results.many, { count });

  return (
    <>
      <PageHero
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
        image="/images/sectors/mining.jpg"
        imageAlt=""
        size="compact"
        breadcrumbs={[
          { label: dictionary.nav.home, href: getPath("home", locale) },
          { label: dictionary.nav.catalog },
        ]}
        actions={
          siteConfig.catalogPdfUrl ? (
            <a
              href={siteConfig.catalogPdfUrl}
              target="_blank"
              rel="noreferrer noopener"
              className={buttonStyles("accent", "lg")}
            >
              <DownloadIcon className="size-4" />
              {dictionary.common.downloadCatalog}
            </a>
          ) : undefined
        }
      />

      <Section tone="default">
        <SectionHeading eyebrow={dictionary.common.sectors} title={copy.bySectorTitle} />

        <ul className="mt-10 grid gap-5 lg:mt-12 lg:grid-cols-3">
          {sectors.map((sector, index) => (
            <Reveal as="li" key={sector.id} delay={index * 80}>
              <LocalizedLink
                route="products"
                locale={locale}
                query={{ sector: sector.id }}
                className="group flex h-full flex-col justify-between border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-border-strong hover:shadow-card lg:p-7"
              >
                <div>
                  <h3 className="font-display text-xl font-semibold text-navy-900">
                    {sector.name[locale]}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-text-muted">
                    {sector.tagline[locale]}
                  </p>
                </div>

                <div className="mt-7 flex items-center justify-between border-t border-border pt-4">
                  <span className="font-display text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-text-subtle">
                    {countLabel(sectorCounts[sector.id])}
                  </span>
                  <span className="flex items-center gap-1.5 font-display text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-primary transition-colors group-hover:text-accent">
                    {copy.viewSection}
                    <ArrowRightIcon className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </div>
              </LocalizedLink>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section tone="muted">
        <SectionHeading
          eyebrow={dictionary.common.protections}
          title={copy.byProtectionTitle}
        />

        <ul className="mt-10 grid gap-px border border-border bg-border sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
          {protections.map((protection, index) => (
            <Reveal as="li" key={protection.id} delay={index * 70}>
              <LocalizedLink
                route="products"
                locale={locale}
                query={{ protection: protection.id }}
                className="group flex h-full flex-col bg-surface p-6 transition-colors hover:bg-sand-50"
              >
                <ProtectionIcon
                  id={protection.id}
                  className="size-8 text-navy-700 transition-colors group-hover:text-accent"
                  strokeWidth={1.3}
                />
                <h3 className="mt-5 font-display text-sm font-semibold leading-snug text-navy-900">
                  {protection.name[locale]}
                </h3>
                <span className="mt-3 font-display text-[0.625rem] font-semibold uppercase tracking-[0.1em] text-text-subtle">
                  {countLabel(protectionCounts[protection.id])}
                </span>
              </LocalizedLink>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section tone="default">
        <SectionHeading eyebrow={dictionary.common.category} title={copy.byCategoryTitle} />

        <ul className="mt-10 flex flex-wrap gap-3 lg:mt-12">
          {categoryCounts.map(({ id, count }) => (
            <li key={id}>
              <LocalizedLink
                route="products"
                locale={locale}
                query={{ category: id }}
                className="inline-flex items-center gap-3 border border-border-strong bg-surface px-5 py-3 font-display text-sm font-semibold text-navy-900 transition-colors hover:border-primary hover:text-primary"
              >
                {dictionary.products.categories[id]}
                <span className="font-normal tabular-nums text-text-subtle">{count}</span>
              </LocalizedLink>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="muted">
        <SectionHeading
          eyebrow={dictionary.products.eyebrow}
          title={copy.productsInSection}
          action={
            <LocalizedLink
              route="products"
              locale={locale}
              className={buttonStyles("outline", "md")}
            >
              {dictionary.common.viewAll}
              <ArrowRightIcon className="size-4" />
            </LocalizedLink>
          }
        />

        <ProductGrid
          products={allProducts}
          locale={locale}
          columns={4}
          className="mt-10 lg:mt-12"
        />

        <Reveal delay={120} className="mt-12">
          <div className="grid gap-6 border border-border bg-surface p-6 lg:grid-cols-12 lg:items-center lg:p-8">
            <div className="lg:col-span-8">
              <h3 className="font-display text-lg font-semibold text-navy-900">
                {copy.downloadTitle}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                {copy.downloadDescription}
              </p>
            </div>

            <div className="lg:col-span-4 lg:justify-self-end">
              {siteConfig.catalogPdfUrl ? (
                <a
                  href={siteConfig.catalogPdfUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={buttonStyles("primary", "md")}
                >
                  <DownloadIcon className="size-4" />
                  {dictionary.common.downloadCatalog}
                </a>
              ) : (
                <Notice tone="pending">{dictionary.common.catalogPending}</Notice>
              )}
            </div>
          </div>
        </Reveal>
      </Section>

      <CtaSection locale={locale} />
    </>
  );
}

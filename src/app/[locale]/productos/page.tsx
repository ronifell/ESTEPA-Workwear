import type { Metadata } from "next";

import { CatalogBrowser } from "@/components/products/catalog-browser";
import { ProductGrid } from "@/components/products/product-grid";
import { CtaSection } from "@/components/shared/cta-section";
import { PageHero } from "@/components/shared/page-hero";
import { Section } from "@/components/ui/section";
import { format, getDictionary, resolveLocale } from "@/i18n";
import { getPath } from "@/i18n/routes";
import { parseFilters, type SearchParams } from "@/lib/product-filters";
import { getProducts } from "@/lib/repositories/products";
import { buildMetadataFromDictionary } from "@/lib/seo";

interface PageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<SearchParams>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadataFromDictionary("products", resolveLocale(locale), "products");
}

export default async function ProductsPage({ params, searchParams }: PageProps) {
  const locale = resolveLocale((await params).locale);
  const dictionary = getDictionary(locale);
  const filters = parseFilters(await searchParams);

  const products = await getProducts({
    ...(filters.sector ? { sectors: [filters.sector] } : {}),
    ...(filters.protection ? { protections: [filters.protection] } : {}),
    ...(filters.category ? { categories: [filters.category] } : {}),
    ...(filters.standard ? { standard: filters.standard } : {}),
  });

  const resultsLabel =
    products.length === 0
      ? dictionary.products.results.none
      : products.length === 1
        ? dictionary.products.results.one
        : format(dictionary.products.results.many, { count: products.length });

  return (
    <>
      <PageHero
        eyebrow={dictionary.products.eyebrow}
        title={dictionary.products.title}
        description={dictionary.products.description}
        size="compact"
        breadcrumbs={[
          { label: dictionary.nav.home, href: getPath("home", locale) },
          { label: dictionary.products.title },
        ]}
      />

      <Section tone="default">
        <CatalogBrowser locale={locale} filters={filters} resultsLabel={resultsLabel}>
          <ProductGrid products={products} locale={locale} columns={3} prioritizeFirst />
        </CatalogBrowser>
      </Section>

      <CtaSection locale={locale} />
    </>
  );
}

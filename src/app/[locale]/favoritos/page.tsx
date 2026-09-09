import type { Metadata } from "next";

import { FavoritesContent } from "@/components/favorites/favorites-content";
import { PageHero } from "@/components/shared/page-hero";
import { Section } from "@/components/ui/section";
import { getDictionary, resolveLocale } from "@/i18n";
import { getPath } from "@/i18n/routes";
import { getProducts } from "@/lib/repositories/products";
import { buildPageMetadata } from "@/lib/seo";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const { seo } = getDictionary(locale);

  return buildPageMetadata({
    route: "favorites",
    locale,
    title: seo.favorites.title,
    description: seo.favorites.description,
    noIndex: true,
  });
}

export default async function FavoritesPage({ params }: PageProps) {
  const locale = resolveLocale((await params).locale);
  const dictionary = getDictionary(locale);
  const products = await getProducts();

  return (
    <>
      <PageHero
        eyebrow={dictionary.favorites.eyebrow}
        title={dictionary.favorites.title}
        size="compact"
        breadcrumbs={[
          { label: dictionary.nav.home, href: getPath("home", locale) },
          { label: dictionary.favorites.title },
        ]}
      />

      <Section tone="default">
        <FavoritesContent products={products} />
      </Section>
    </>
  );
}

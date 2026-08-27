import type { Metadata } from "next";

import { Certifications } from "@/components/home/certifications";
import { Corporate } from "@/components/home/corporate";
import { FeaturedProducts } from "@/components/home/featured-products";
import { Hero } from "@/components/home/hero";
import { HomeFaq } from "@/components/home/home-faq";
import { Industries } from "@/components/home/industries";
import { Protections } from "@/components/home/protections";
import { CtaSection } from "@/components/shared/cta-section";
import { resolveLocale } from "@/i18n";
import { getFeaturedProducts } from "@/lib/repositories/products";
import { buildMetadataFromDictionary } from "@/lib/seo";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadataFromDictionary("home", resolveLocale(locale), "home");
}

export default async function HomePage({ params }: PageProps) {
  const locale = resolveLocale((await params).locale);
  const featured = await getFeaturedProducts(6);

  return (
    <>
      <Hero locale={locale} products={featured} />
      <FeaturedProducts locale={locale} products={featured} />
      <Industries locale={locale} />
      <Protections locale={locale} />
      <Certifications locale={locale} />
      <Corporate locale={locale} />
      <HomeFaq locale={locale} />
      <CtaSection locale={locale} />
    </>
  );
}

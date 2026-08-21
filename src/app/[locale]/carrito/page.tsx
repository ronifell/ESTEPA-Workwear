import type { Metadata } from "next";

import { CartContent } from "@/components/cart/cart-content";
import { PageHero } from "@/components/shared/page-hero";
import { Section } from "@/components/ui/section";
import { getDictionary, resolveLocale } from "@/i18n";
import { getPath } from "@/i18n/routes";
import { buildPageMetadata } from "@/lib/seo";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const { seo } = getDictionary(locale);

  return buildPageMetadata({
    route: "cart",
    locale,
    title: seo.cart.title,
    description: seo.cart.description,
    noIndex: true,
  });
}

export default async function CartPage({ params }: PageProps) {
  const locale = resolveLocale((await params).locale);
  const dictionary = getDictionary(locale);

  return (
    <>
      <PageHero
        eyebrow={dictionary.products.eyebrow}
        title={dictionary.cart.title}
        size="compact"
        breadcrumbs={[
          { label: dictionary.nav.home, href: getPath("home", locale) },
          { label: dictionary.cart.title },
        ]}
      />

      <Section tone="default">
        <CartContent />
      </Section>
    </>
  );
}

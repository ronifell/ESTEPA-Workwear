import type { Metadata } from "next";

import { FaqList } from "@/components/faq/faq-list";
import { JsonLd } from "@/components/seo/json-ld";
import { CtaSection } from "@/components/shared/cta-section";
import { PageHero } from "@/components/shared/page-hero";
import { Section } from "@/components/ui/section";
import { getDictionary, resolveLocale } from "@/i18n";
import { getPath } from "@/i18n/routes";
import { buildFaqSchema, buildMetadataFromDictionary } from "@/lib/seo";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadataFromDictionary("faq", resolveLocale(locale), "faq");
}

export default async function FaqPage({ params }: PageProps) {
  const locale = resolveLocale((await params).locale);
  const dictionary = getDictionary(locale);
  const copy = dictionary.faqPage;

  return (
    <>
      <JsonLd id="faq-jsonld" data={buildFaqSchema(copy.items)} />
      <PageHero
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
        size="compact"
        breadcrumbs={[
          { label: dictionary.nav.home, href: getPath("home", locale) },
          { label: dictionary.nav.faq },
        ]}
      />
      <Section tone="default">
        <FaqList locale={locale} />
      </Section>
      <CtaSection locale={locale} />
    </>
  );
}

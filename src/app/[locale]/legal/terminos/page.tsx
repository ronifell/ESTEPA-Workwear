import type { Metadata } from "next";

import { LegalPage } from "@/components/legal/legal-page";
import { getDictionary, resolveLocale } from "@/i18n";
import { buildPageMetadata } from "@/lib/seo";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const { legal } = getDictionary(locale);

  return buildPageMetadata({
    route: "terms",
    locale,
    title: legal.terms.title,
    description: legal.terms.description,
  });
}

export default async function TermsPage({ params }: PageProps) {
  const locale = resolveLocale((await params).locale);
  return <LegalPage locale={locale} document="terms" />;
}

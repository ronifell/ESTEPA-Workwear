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
    route: "privacy",
    locale,
    title: legal.privacy.title,
    description: legal.privacy.description,
  });
}

export default async function PrivacyPage({ params }: PageProps) {
  const locale = resolveLocale((await params).locale);
  return <LegalPage locale={locale} document="privacy" />;
}

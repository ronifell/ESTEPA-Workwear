import type { Metadata } from "next";

import { SectorPage } from "@/components/sectors/sector-page";
import { resolveLocale } from "@/i18n";
import { buildMetadataFromDictionary } from "@/lib/seo";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadataFromDictionary("work", resolveLocale(locale), "work");
}

export default async function WorkPage({ params }: PageProps) {
  const locale = resolveLocale((await params).locale);
  return <SectorPage sectorId="industry" locale={locale} />;
}

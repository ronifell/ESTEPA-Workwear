import type { Metadata } from "next";

import { SectorPage } from "@/components/sectors/sector-page";
import { resolveLocale } from "@/i18n";
import { buildMetadataFromDictionary } from "@/lib/seo";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadataFromDictionary("oilGas", resolveLocale(locale), "oilGas");
}

export default async function OilGasPage({ params }: PageProps) {
  const locale = resolveLocale((await params).locale);
  return <SectorPage sectorId="oil-gas" locale={locale} />;
}

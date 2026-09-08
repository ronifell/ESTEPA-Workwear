import type { Locale } from "@/types";

/** Public URL that returns the product datasheet as an inline PDF. */
export function datasheetPdfHref(slug: string, locale: Locale): string {
  const params = new URLSearchParams({ locale });
  return `/api/products/${encodeURIComponent(slug)}/ficha?${params.toString()}`;
}

export function datasheetPdfFilename(slug: string, locale: Locale): string {
  const safe = slug.replace(/[^a-zA-Z0-9_-]+/g, "-") || "producto";
  return locale === "es"
    ? `ESTEPA-ficha-tecnica-${safe}.pdf`
    : `ESTEPA-technical-sheet-${safe}.pdf`;
}

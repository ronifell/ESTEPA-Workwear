import { siteConfig } from "@/config/site";
import type { Locale } from "@/types";

const localeTags: Record<Locale, string> = {
  es: "es-AR",
  en: "en-US",
};

export function formatPrice(
  amount: number,
  locale: Locale,
  currency: string = siteConfig.commerce.currency,
): string {
  return new Intl.NumberFormat(localeTags[locale], {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(value: number, locale: Locale): string {
  return new Intl.NumberFormat(localeTags[locale]).format(value);
}

export function formatDate(value: Date | string, locale: Locale): string {
  const date = typeof value === "string" ? new Date(value) : value;
  return new Intl.DateTimeFormat(localeTags[locale], {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

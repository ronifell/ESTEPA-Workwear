import { defaultLocale, locales } from "@/config/site";
import type { Locale, Localized } from "@/types";

import { es, type Dictionary } from "./dictionaries/es";
import { en } from "./dictionaries/en";

const dictionaries: Record<Locale, Dictionary> = { es, en };

export type { Dictionary };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export function isValidLocale(value: string): value is Locale {
  return locales.some((locale) => locale === value);
}

export function resolveLocale(value: string | undefined): Locale {
  return value && isValidLocale(value) ? value : defaultLocale;
}

/** Reads the value of a localized field. */
export function t<T>(value: Localized<T>, locale: Locale): T {
  return value[locale];
}

/** Replaces `{placeholders}` inside a translated string. */
export function format(
  template: string,
  values: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => {
    const value = values[key];
    return value === undefined ? match : String(value);
  });
}

export const localeLabels: Record<Locale, { short: string; full: string }> = {
  es: { short: "ES", full: "Español" },
  en: { short: "EN", full: "English" },
};

export const htmlLang: Record<Locale, string> = {
  es: "es-AR",
  en: "en",
};

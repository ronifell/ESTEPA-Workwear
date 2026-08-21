"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";

import type { Dictionary } from "@/i18n";
import type { Locale } from "@/types";

interface I18nValue {
  readonly locale: Locale;
  readonly dictionary: Dictionary;
}

const I18nContext = createContext<I18nValue | null>(null);

export interface I18nProviderProps extends I18nValue {
  readonly children: ReactNode;
}

/** Makes the active locale and dictionary available to client components. */
export function I18nProvider({ locale, dictionary, children }: I18nProviderProps) {
  const value = useMemo(() => ({ locale, dictionary }), [locale, dictionary]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used inside an I18nProvider");
  }
  return context;
}

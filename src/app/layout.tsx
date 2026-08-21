import type { ReactNode } from "react";

/**
 * Every route lives under `/[locale]`, which is where `<html>` is rendered so
 * the `lang` attribute always matches the active language.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}

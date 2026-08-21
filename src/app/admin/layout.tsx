import type { Metadata, Viewport } from "next";
import { Archivo, Inter } from "next/font/google";
import type { ReactNode } from "react";

import { adminCopy } from "@/lib/admin/copy";

import "@/styles/globals.css";

/**
 * The panel lives outside `/[locale]`: it is an internal single-language tool,
 * excluded from the locale proxy and from the search engines. That is why it
 * renders its own `<html>` shell instead of reusing the storefront layout.
 */

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const headingFont = Archivo({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: { default: adminCopy.brand, template: `%s · ${adminCopy.brand}` },
  robots: { index: false, follow: false, nocache: true },
};

export const viewport: Viewport = {
  themeColor: "#0a1727",
  colorScheme: "light",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className={`${bodyFont.variable} ${headingFont.variable}`}>
      <body className="min-h-dvh bg-sand-100 font-sans text-text antialiased">{children}</body>
    </html>
  );
}

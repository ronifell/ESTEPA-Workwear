import type { Metadata, Viewport } from "next";
import { Archivo, Inter } from "next/font/google";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { WhatsappFloat } from "@/components/layout/whatsapp-float";
import { CartProvider } from "@/components/providers/cart-provider";
import { I18nProvider } from "@/components/providers/i18n-provider";
import { JsonLd } from "@/components/seo/json-ld";
import { locales, siteConfig } from "@/config/site";
import { getDictionary, htmlLang, isValidLocale } from "@/i18n";
import { buildAlternates, buildOrganizationSchema } from "@/lib/seo";

import "@/styles/globals.css";

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

export const viewport: Viewport = {
  themeColor: "#16304c",
  colorScheme: "light",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isValidLocale(raw)) return {};

  const dictionary = getDictionary(raw);

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: dictionary.seo.home.title,
      template: `%s | ${siteConfig.companyName}`,
    },
    description: dictionary.seo.home.description,
    keywords: [
      "ropa ignífuga certificada",
      "ropa de trabajo FR Argentina",
      "indumentaria ignífuga minería",
      "ropa antiestática petróleo y gas",
      "ropa de trabajo NFPA 2112",
      "ropa FR arco eléctrico",
      "ropa de alta visibilidad ignífuga",
      "indumentaria de seguridad industrial certificada",
    ],
    applicationName: siteConfig.companyName,
    alternates: buildAlternates("home", raw),
    icons: { icon: "/logo.png", apple: "/logo.png" },
    openGraph: {
      type: "website",
      siteName: siteConfig.companyName,
      locale: htmlLang[raw],
      title: dictionary.seo.home.title,
      description: dictionary.seo.home.description,
    },
    twitter: { card: "summary_large_image" },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isValidLocale(raw)) notFound();

  const dictionary = getDictionary(raw);

  return (
    <html
      lang={htmlLang[raw]}
      className={`${bodyFont.variable} ${headingFont.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-dvh flex-col bg-background font-sans text-text antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:inline-flex focus:h-11 focus:items-center focus:bg-primary focus:px-5 focus:font-display focus:text-[0.8125rem] focus:font-semibold focus:uppercase focus:tracking-[0.1em] focus:text-primary-contrast"
        >
          {dictionary.common.skipToContent}
        </a>

        <I18nProvider locale={raw} dictionary={dictionary}>
          <CartProvider>
            <SiteHeader />
            <main id="main" className="flex-1">
              {children}
            </main>
            <SiteFooter locale={raw} />
            <WhatsappFloat />
          </CartProvider>
        </I18nProvider>

        <JsonLd id="organization-jsonld" data={buildOrganizationSchema(raw)} />
      </body>
    </html>
  );
}

import type { Metadata } from "next";

import { locales, siteConfig } from "@/config/site";
import { getDictionary } from "@/i18n";
import { getPath, type RouteKey, type RouteParams } from "@/i18n/routes";
import type { Locale, Product } from "@/types";

/** Canonical + hreflang alternates for a localized route. */
export function buildAlternates(
  route: RouteKey,
  locale: Locale,
  params?: RouteParams,
): NonNullable<Metadata["alternates"]> {
  const languages: Record<string, string> = {};
  for (const candidate of locales) {
    languages[candidate] = getPath(route, candidate, params);
  }
  languages["x-default"] = getPath(route, siteConfig.defaultLocale, params);

  return {
    canonical: getPath(route, locale, params),
    languages,
  };
}

export interface PageMetadataOptions {
  readonly route: RouteKey;
  readonly locale: Locale;
  readonly title: string;
  readonly description: string;
  readonly params?: RouteParams;
  readonly image?: string;
  readonly noIndex?: boolean;
}

/** Shared metadata builder so every page exposes the same tag set. */
export function buildPageMetadata({
  route,
  locale,
  title,
  description,
  params,
  image,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const url = getPath(route, locale, params);

  return {
    title,
    description,
    alternates: buildAlternates(route, locale, params),
    openGraph: {
      type: "website",
      siteName: siteConfig.companyName,
      title,
      description,
      url,
      ...(image ? { images: [{ url: image }] } : {}),
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}

/**
 * Organization schema. Only fields backed by real configuration are emitted —
 * structured data with invented details is worse than none at all.
 */
export function buildOrganizationSchema(locale: Locale): Record<string, unknown> {
  const { contact, social } = siteConfig;
  const sameAs = [social.linkedin, social.instagram, social.facebook].filter(Boolean);
  const dictionary = getDictionary(locale);

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.companyName,
    description: dictionary.seo.home.description,
    url: `${siteConfig.url}${getPath("home", locale)}`,
    logo: `${siteConfig.url}/logo.png`,
    ...(sameAs.length > 0 ? { sameAs } : {}),
    ...(contact.email || contact.phone
      ? {
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "sales",
            areaServed: "AR",
            availableLanguage: ["es", "en"],
            ...(contact.email ? { email: contact.email } : {}),
            ...(contact.phone ? { telephone: contact.phone } : {}),
          },
        }
      : {}),
    ...(contact.address
      ? { address: { "@type": "PostalAddress", streetAddress: contact.address } }
      : {}),
  };
}

/**
 * Product schema. `offers` is only emitted once a real price exists, so the
 * markup never advertises an amount the business has not confirmed.
 */
export function buildProductSchema(product: Product, locale: Locale): Record<string, unknown> {
  const image = product.images[0]?.src;
  const priced = siteConfig.commerce.pricesEnabled && product.price !== undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name[locale],
    description: product.shortDescription[locale],
    brand: { "@type": "Brand", name: siteConfig.companyName },
    url: `${siteConfig.url}${getPath("productDetail", locale, { slug: product.slug })}`,
    ...(image ? { image: `${siteConfig.url}${image}` } : {}),
    ...(priced
      ? {
          offers: {
            "@type": "Offer",
            price: product.price,
            priceCurrency: product.currency ?? siteConfig.commerce.currency,
            availability: "https://schema.org/InStock",
          },
        }
      : {}),
  };
}

/** Convenience wrapper for pages whose copy lives in the `seo` dictionary. */
export function buildMetadataFromDictionary(
  route: RouteKey,
  locale: Locale,
  key: keyof ReturnType<typeof getDictionary>["seo"],
): Metadata {
  const { seo } = getDictionary(locale);
  return buildPageMetadata({
    route,
    locale,
    title: seo[key].title,
    description: seo[key].description,
  });
}

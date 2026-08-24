/**
 * Central configuration for every piece of information that is likely to change.
 * Nothing here should be duplicated inside UI components.
 *
 * Empty strings mean "not provided by the client yet". The UI must hide the
 * corresponding element instead of rendering a placeholder that looks real.
 */

import type { Locale } from "@/types";

export const locales = ["es", "en"] as const satisfies readonly Locale[];
export const defaultLocale: Locale = "es";

const rawSiteUrl = process.env["NEXT_PUBLIC_SITE_URL"]?.trim();

export const siteConfig = {
  companyName: "ESTEPA Workwear",
  shortName: "ESTEPA",
  url: rawSiteUrl && rawSiteUrl.length > 0 ? rawSiteUrl.replace(/\/$/, "") : "http://localhost:3000",
  defaultLocale,
  locales,

  /** Contact data. Left empty until the client provides the real values. */
  contact: {
    email: process.env["NEXT_PUBLIC_CONTACT_EMAIL"] ?? "",
    phone: process.env["NEXT_PUBLIC_CONTACT_PHONE"] ?? "",
    whatsapp: process.env["NEXT_PUBLIC_CONTACT_WHATSAPP"] ?? "",
    address: process.env["NEXT_PUBLIC_CONTACT_ADDRESS"] ?? "",
  },

  /** Only real profiles should be listed here. */
  social: {
    instagram: process.env["NEXT_PUBLIC_SOCIAL_INSTAGRAM"] ?? "",
    linkedin: process.env["NEXT_PUBLIC_SOCIAL_LINKEDIN"] ?? "",
    facebook: process.env["NEXT_PUBLIC_SOCIAL_FACEBOOK"] ?? "",
  },

  /** Regions the brand is focused on. */
  regions: ["San Juan", "Río Negro", "Neuquén"],

  commerce: {
    currency: "ARS",
    /**
     * Prices are unknown until the client confirms them. While this is false the
     * storefront collects requests instead of showing invented amounts, and the
     * cart/checkout keep working exactly the same once prices are loaded.
     */
    pricesEnabled: process.env["NEXT_PUBLIC_PRICES_ENABLED"] === "true",
    maxQuantityPerItem: 99,
  },

  /** Public asset that can be replaced when the final catalogue is ready. */
  catalogPdfUrl: process.env["NEXT_PUBLIC_CATALOG_PDF_URL"] ?? "",

  /**
   * Google Business profile. Leave empty until the live listing URL is
   * confirmed — the footer still renders a visual badge, without inventing a rating.
   */
  google: {
    reviewsUrl: process.env["NEXT_PUBLIC_GOOGLE_REVIEWS_URL"] ?? "",
    rating: process.env["NEXT_PUBLIC_GOOGLE_RATING"] ?? "",
    reviewCount: process.env["NEXT_PUBLIC_GOOGLE_REVIEW_COUNT"] ?? "",
  },
} as const;

export type SiteConfig = typeof siteConfig;

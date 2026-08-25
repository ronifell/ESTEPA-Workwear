import type { MetadataRoute } from "next";

import { locales, siteConfig } from "@/config/site";
import { getPath, routes, type RouteKey } from "@/i18n/routes";
import { getAllProductSlugs } from "@/lib/repositories/products";

/** Routes that should never be indexed (transactional or user specific). */
const excluded = new Set<RouteKey>([
  "cart",
  "checkout",
  "orderConfirmation",
  "productDetail",
  "productDatasheet",
]);

const priorities: Partial<Record<RouteKey, number>> = {
  home: 1,
  products: 0.9,
  mining: 0.8,
  oilGas: 0.8,
  work: 0.8,
  catalog: 0.7,
  protection: 0.7,
  about: 0.6,
  contact: 0.6,
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [];

  function push(route: RouteKey, params?: Record<string, string>) {
    for (const locale of locales) {
      const languages: Record<string, string> = {};
      for (const candidate of locales) {
        languages[candidate] = `${siteConfig.url}${getPath(route, candidate, params)}`;
      }

      entries.push({
        url: `${siteConfig.url}${getPath(route, locale, params)}`,
        lastModified,
        changeFrequency: route === "home" ? "weekly" : "monthly",
        priority: priorities[route] ?? 0.4,
        alternates: { languages },
      });
    }
  }

  for (const route of Object.keys(routes) as RouteKey[]) {
    if (!excluded.has(route)) push(route);
  }

  for (const slug of await getAllProductSlugs()) {
    push("productDetail", { slug });
    push("productDatasheet", { slug });
  }

  return entries;
}

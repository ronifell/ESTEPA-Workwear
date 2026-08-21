import type { Dictionary } from "@/i18n";
import type { RouteKey } from "@/i18n/routes";

export interface NavItem {
  readonly route: RouteKey;
  readonly labelKey: keyof Dictionary["nav"];
}

/** Sector pages, grouped under a single header entry on desktop. */
export const sectorNav: readonly NavItem[] = [
  { route: "mining", labelKey: "mining" },
  { route: "oilGas", labelKey: "oilGas" },
  { route: "work", labelKey: "work" },
];

/** Items shown directly in the header, after the sectors group. */
export const primaryNav: readonly NavItem[] = [
  { route: "products", labelKey: "products" },
  { route: "protection", labelKey: "protection" },
  { route: "about", labelKey: "about" },
  { route: "contact", labelKey: "contact" },
];

/** Flat list used by the footer and the mobile menu. */
export const fullNav: readonly NavItem[] = [
  { route: "home", labelKey: "home" },
  ...sectorNav,
  { route: "products", labelKey: "products" },
  { route: "catalog", labelKey: "catalog" },
  { route: "protection", labelKey: "protection" },
  { route: "about", labelKey: "about" },
  { route: "contact", labelKey: "contact" },
];

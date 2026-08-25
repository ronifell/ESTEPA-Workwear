import type { Locale } from "@/types";
import { defaultLocale, locales } from "@/config/site";

/**
 * Localized URL map.
 *
 * The Spanish pathname is also the internal (file-system) route, so the English
 * URLs are rewritten to it by the middleware. Adding a language only requires
 * extending this object.
 */
export const routes = {
  home: { es: "/", en: "/" },
  mining: { es: "/mineria", en: "/mining" },
  oilGas: { es: "/petroleo-y-gas", en: "/oil-and-gas" },
  work: { es: "/trabajo", en: "/work" },
  products: { es: "/productos", en: "/products" },
  productDetail: { es: "/productos/[slug]", en: "/products/[slug]" },
  productDatasheet: {
    es: "/productos/[slug]/ficha-tecnica",
    en: "/products/[slug]/technical-sheet",
  },
  protection: { es: "/certificaciones", en: "/protection" },
  about: { es: "/nosotros", en: "/about" },
  catalog: { es: "/catalogo", en: "/catalog" },
  contact: { es: "/contacto", en: "/contact" },
  cart: { es: "/carrito", en: "/cart" },
  checkout: { es: "/checkout", en: "/checkout" },
  orderConfirmation: { es: "/pedido/[id]", en: "/order/[id]" },
  privacy: { es: "/legal/privacidad", en: "/legal/privacy" },
  terms: { es: "/legal/terminos", en: "/legal/terms" },
  returns: { es: "/legal/cambios-y-devoluciones", en: "/legal/returns" },
} as const satisfies Record<string, Record<Locale, string>>;

export type RouteKey = keyof typeof routes;

export type RouteParams = Record<string, string>;

function fillParams(pattern: string, params?: RouteParams): string {
  if (!params) return pattern;
  return pattern.replace(/\[(\w+)\]/g, (match, key: string) => params[key] ?? match);
}

/** Builds a locale-prefixed, localized href, e.g. `getPath("mining", "en")`. */
export function getPath(key: RouteKey, locale: Locale, params?: RouteParams): string {
  const pattern = fillParams(routes[key][locale], params);
  return pattern === "/" ? `/${locale}` : `/${locale}${pattern}`;
}

/** Splits `/en/mining` into its locale and the remaining pathname. */
export function splitLocale(pathname: string): {
  locale: Locale | null;
  rest: string;
} {
  const segments = pathname.split("/").filter(Boolean);
  const [first, ...others] = segments;
  const locale = locales.find((candidate) => candidate === first) ?? null;
  if (!locale) return { locale: null, rest: normalize(pathname) };
  return { locale, rest: normalize(`/${others.join("/")}`) };
}

function normalize(pathname: string): string {
  if (pathname === "" || pathname === "/") return "/";
  return pathname.replace(/\/+$/, "") || "/";
}

interface RouteMatch {
  readonly key: RouteKey;
  readonly params: RouteParams;
}

/** Finds the route definition matching a locale-less pathname. */
export function matchRoute(pathname: string, locale: Locale): RouteMatch | null {
  const target = normalize(pathname).split("/").filter(Boolean);

  for (const key of Object.keys(routes) as RouteKey[]) {
    const pattern = routes[key][locale].split("/").filter(Boolean);
    if (pattern.length !== target.length) continue;

    const params: RouteParams = {};
    const matches = pattern.every((segment, index) => {
      const value = target[index];
      if (value === undefined) return false;
      const dynamic = segment.match(/^\[(\w+)\]$/);
      if (dynamic?.[1]) {
        params[dynamic[1]] = value;
        return true;
      }
      return segment === value;
    });

    if (matches) return { key, params };
  }

  return null;
}

/**
 * Translates a locale-less pathname between languages. Returns null when the
 * pathname does not belong to a known route.
 */
export function translatePath(
  pathname: string,
  from: Locale,
  to: Locale,
): string | null {
  const match = matchRoute(pathname, from);
  if (!match) return null;
  return fillParams(routes[match.key][to], match.params);
}

/** Full localized URL for the equivalent page in another language. */
export function getAlternatePath(currentPathname: string, target: Locale): string {
  const { locale, rest } = splitLocale(currentPathname);
  const current = locale ?? defaultLocale;
  if (current === target) return currentPathname;
  const translated = translatePath(rest, current, target);
  const suffix = translated ?? rest;
  return suffix === "/" ? `/${target}` : `/${target}${suffix}`;
}

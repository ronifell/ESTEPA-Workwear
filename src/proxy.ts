import { NextResponse, type NextRequest } from "next/server";

import { defaultLocale, locales } from "@/config/site";
import { matchRoute, routes, splitLocale, translatePath } from "@/i18n/routes";
import type { Locale } from "@/types";

const LOCALE_COOKIE = "NEXT_LOCALE";
const ONE_YEAR = 60 * 60 * 24 * 365;

function isLocale(value: string | undefined): value is Locale {
  return locales.some((locale) => locale === value);
}

function resolvePreferredLocale(request: NextRequest): Locale {
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  if (isLocale(cookieLocale)) return cookieLocale;

  const header = request.headers.get("accept-language");
  if (header) {
    const ranked = header
      .split(",")
      .map((part) => {
        const [tag = "", quality = "q=1"] = part.trim().split(";");
        return {
          tag: tag.trim().toLowerCase(),
          quality: Number.parseFloat(quality.replace("q=", "")) || 0,
        };
      })
      .sort((a, b) => b.quality - a.quality);

    for (const { tag } of ranked) {
      const base = tag.split("-")[0];
      if (isLocale(base)) return base;
    }
  }

  return defaultLocale;
}

function withLocaleCookie(response: NextResponse, locale: Locale): NextResponse {
  response.cookies.set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: ONE_YEAR,
    sameSite: "lax",
  });
  return response;
}

/** Keeps the original search params and hash while changing the pathname. */
function buildUrl(request: NextRequest, pathname: string): URL {
  const url = new URL(request.url);
  url.pathname = pathname;
  return url;
}

/**
 * Locale routing.
 *
 * Spanish pathnames double as the internal file-system routes, so English URLs
 * (`/en/mining`) are rewritten to their internal equivalent (`/en/mineria`)
 * while the browser keeps the localized URL.
 */
export function proxy(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;
  const { locale, rest } = splitLocale(pathname);

  // No locale in the URL: send the visitor to their preferred language.
  if (!locale) {
    const preferred = resolvePreferredLocale(request);
    const sourceLocale =
      locales.find((candidate) => matchRoute(rest, candidate)) ?? defaultLocale;
    const translated = translatePath(rest, sourceLocale, preferred) ?? rest;
    const target = translated === "/" ? `/${preferred}` : `/${preferred}${translated}`;
    return withLocaleCookie(NextResponse.redirect(buildUrl(request, target)), preferred);
  }

  const match = matchRoute(rest, locale);

  // The pathname belongs to another language: redirect to the canonical one.
  if (!match) {
    const otherLocale = locales.find(
      (candidate) => candidate !== locale && matchRoute(rest, candidate),
    );
    if (otherLocale) {
      const translated = translatePath(rest, otherLocale, locale);
      if (translated) {
        const target = translated === "/" ? `/${locale}` : `/${locale}${translated}`;
        return withLocaleCookie(
          NextResponse.redirect(buildUrl(request, target)),
          locale,
        );
      }
    }
    return withLocaleCookie(NextResponse.next(), locale);
  }

  // Spanish pathnames are the internal routes: nothing to rewrite.
  if (routes[match.key][locale] === routes[match.key][defaultLocale]) {
    return withLocaleCookie(NextResponse.next(), locale);
  }

  const internal = translatePath(rest, locale, defaultLocale);
  if (!internal) return withLocaleCookie(NextResponse.next(), locale);

  const rewritten = internal === "/" ? `/${locale}` : `/${locale}${internal}`;
  return withLocaleCookie(NextResponse.rewrite(buildUrl(request, rewritten)), locale);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|images|icons|documents|.*\\..*).*)"],
};

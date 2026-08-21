import Link from "next/link";

import { defaultLocale } from "@/config/site";
import { getDictionary } from "@/i18n";

import "@/styles/globals.css";

/**
 * Fallback for requests that never reach a locale segment. Localized 404s are
 * handled by `app/[locale]/not-found.tsx`.
 */
export default function GlobalNotFound() {
  const dictionary = getDictionary(defaultLocale);

  return (
    <html lang="es">
      <body className="flex min-h-dvh flex-col items-center justify-center bg-background px-6 text-center font-sans text-text antialiased">
        <p className="eyebrow text-accent">404</p>
        <h1 className="mt-4 text-3xl font-bold text-navy-900">{dictionary.notFound.title}</h1>
        <p className="mt-3 max-w-md text-text-muted">{dictionary.notFound.description}</p>
        <Link
          href={`/${defaultLocale}`}
          className="mt-8 inline-flex h-11 items-center justify-center bg-primary px-6 font-display text-[0.8125rem] font-semibold uppercase tracking-[0.1em] text-primary-contrast transition-colors hover:bg-primary-hover"
        >
          {dictionary.notFound.cta}
        </Link>
      </body>
    </html>
  );
}

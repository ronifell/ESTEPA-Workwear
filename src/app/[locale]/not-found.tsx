import Link from "next/link";

import { buttonStyles } from "@/components/ui/button";
import { defaultLocale } from "@/config/site";
import { getDictionary } from "@/i18n";
import { getPath } from "@/i18n/routes";

/**
 * Rendered inside the locale layout, so the header and footer stay in place.
 * `not-found` receives no params, hence the default locale copy.
 */
export default function LocaleNotFound() {
  const dictionary = getDictionary(defaultLocale);

  return (
    <section className="relative isolate overflow-hidden bg-navy-900 text-text-inverse">
      <div aria-hidden className="blueprint-grid absolute inset-0 opacity-70" />
      <div aria-hidden className="hazard-stripes absolute inset-x-0 bottom-0 h-1 opacity-80" />

      <div className="container-page relative flex min-h-[60vh] flex-col items-start justify-center py-24">
        <p className="font-display text-6xl font-bold tracking-tight text-bronze-300 sm:text-7xl">
          404
        </p>
        <h1 className="mt-6 max-w-2xl text-3xl leading-[1.1] text-text-inverse sm:text-4xl">
          {dictionary.notFound.title}
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-text-inverse-muted">
          {dictionary.notFound.description}
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <Link href={getPath("home", defaultLocale)} className={buttonStyles("inverse", "md")}>
            {dictionary.notFound.cta}
          </Link>
          <Link
            href={getPath("products", defaultLocale)}
            className={buttonStyles("inverse-outline", "md")}
          >
            {dictionary.common.viewProducts}
          </Link>
        </div>
      </div>
    </section>
  );
}

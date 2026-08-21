import Image from "next/image";

import { buttonStyles } from "@/components/ui/button";
import { ArrowRightIcon } from "@/components/ui/icons";
import { LocalizedLink } from "@/components/ui/localized-link";
import { Reveal } from "@/components/ui/reveal";
import { getDictionary } from "@/i18n";
import type { Locale } from "@/types";

export interface CtaSectionProps {
  readonly locale: Locale;
  readonly title?: string;
  readonly description?: string;
}

/** Closing call to action shared by the home page and the inner pages. */
export function CtaSection({ locale, title, description }: CtaSectionProps) {
  const dictionary = getDictionary(locale);

  return (
    <section className="relative isolate overflow-hidden bg-navy-950 text-text-inverse">
      <Image
        src="/images/hero/cta.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-60"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-950/40"
      />

      <div className="container-page relative py-20 lg:py-28">
        <Reveal className="max-w-2xl">
          <h2 className="text-balance-tight text-3xl leading-[1.1] text-text-inverse sm:text-4xl lg:text-[2.75rem]">
            {title ?? dictionary.home.cta.title}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-text-inverse-muted sm:text-lg">
            {description ?? dictionary.home.cta.description}
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <LocalizedLink
              route="products"
              locale={locale}
              className={buttonStyles("accent", "lg")}
            >
              {dictionary.common.viewProducts}
              <ArrowRightIcon className="size-4" />
            </LocalizedLink>
            <LocalizedLink
              route="contact"
              locale={locale}
              className={buttonStyles("inverse-outline", "lg")}
            >
              {dictionary.common.contactUs}
            </LocalizedLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

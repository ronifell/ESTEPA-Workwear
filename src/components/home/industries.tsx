import Image from "next/image";

import { ArrowRightIcon } from "@/components/ui/icons";
import { LocalizedLink } from "@/components/ui/localized-link";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { sectors } from "@/data/sectors";
import { getDictionary } from "@/i18n";
import type { Locale, Sector } from "@/types";

export function Industries({ locale }: { readonly locale: Locale }) {
  const dictionary = getDictionary(locale);

  return (
    <Section id="sectores" tone="default">
      <SectionHeading
        eyebrow={dictionary.home.industries.eyebrow}
        title={dictionary.home.industries.title}
        description={dictionary.home.industries.description}
      />

      <ul className="mt-12 grid items-stretch gap-5 lg:mt-16 lg:grid-cols-3 lg:gap-6">
        {sectors.map((sector, index) => (
          <Reveal as="li" key={sector.id} delay={index * 90} className="flex h-full">
            <IndustryCard sector={sector} locale={locale} />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

interface IndustryCardProps {
  readonly sector: Sector;
  readonly locale: Locale;
}

export function IndustryCard({ sector, locale }: IndustryCardProps) {
  const dictionary = getDictionary(locale);

  return (
    <article className="group relative isolate flex h-full min-h-[22rem] w-full flex-col overflow-hidden bg-navy-900 text-text-inverse lg:min-h-[24rem]">
      <Image
        src={sector.image}
        alt={sector.imageAlt[locale]}
        fill
        sizes="(min-width: 1024px) 33vw, 100vw"
        className="object-cover transition-transform duration-700 ease-[var(--ease-out-industrial)] group-hover:scale-105"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/65 to-navy-950/10 transition-opacity duration-500 group-hover:from-navy-950 group-hover:via-navy-950/75"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-500 ease-[var(--ease-out-industrial)] group-hover:scale-x-100"
      />

      <div className="relative mt-auto flex flex-1 flex-col justify-end p-6 lg:p-7">
        <h3 className="font-display text-xl font-bold leading-tight text-text-inverse lg:text-2xl">
          <LocalizedLink
            route={sector.routeKey}
            locale={locale}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {sector.name[locale]}
          </LocalizedLink>
        </h3>

        <p className="mt-3 line-clamp-4 min-h-[5.5rem] text-sm leading-relaxed text-text-inverse-muted">
          {sector.intro[locale]}
        </p>

        <span className="mt-auto pt-5 inline-flex items-center gap-2 font-display text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-bronze-300">
          {dictionary.common.explore} {sector.name[locale]}
          <ArrowRightIcon className="size-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
        </span>
      </div>
    </article>
  );
}

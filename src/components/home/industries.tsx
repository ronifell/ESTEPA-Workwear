import Image from "next/image";

import { ExploreHint } from "@/components/ui/explore-hint";
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
    <article className="group/photo relative isolate flex h-full min-h-[20rem] w-full flex-col overflow-hidden rounded-3xl bg-navy-900 text-text-inverse lg:min-h-[22rem]">
      <Image
        src={sector.image}
        alt={sector.imageAlt[locale]}
        fill
        sizes="(min-width: 1024px) 33vw, 100vw"
        className="object-cover transition-transform duration-700 ease-[var(--ease-out-industrial)] group-hover/photo:scale-105"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/55 to-navy-950/10 transition-opacity duration-500 group-hover/photo:from-navy-950 group-hover/photo:via-navy-950/70"
      />

      <ExploreHint label={dictionary.common.explore} />

      <div className="relative z-30 mt-auto flex flex-1 flex-col justify-end p-6 lg:p-7">
        <h3 className="font-display text-xl font-bold leading-tight text-text-inverse lg:text-2xl">
          <LocalizedLink
            route={sector.routeKey}
            locale={locale}
            className="after:absolute after:inset-0 after:z-30 after:content-[''] focus-visible:outline-none"
          >
            {sector.name[locale]}
          </LocalizedLink>
        </h3>

        <p className="mt-3 max-w-sm text-sm leading-relaxed text-text-inverse-muted">
          {sector.tagline[locale]}
        </p>
      </div>
    </article>
  );
}

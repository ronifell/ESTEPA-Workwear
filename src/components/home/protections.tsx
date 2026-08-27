import { ProtectionIcon } from "@/components/shared/protection-icon";
import { buttonStyles } from "@/components/ui/button";
import { ArrowRightIcon } from "@/components/ui/icons";
import { LocalizedLink } from "@/components/ui/localized-link";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { protections } from "@/data/protections";
import { getDictionary } from "@/i18n";
import type { Locale } from "@/types";

export function Protections({ locale }: { readonly locale: Locale }) {
  const dictionary = getDictionary(locale);

  return (
    <Section tone="inverse" className="relative overflow-hidden">
      <div aria-hidden className="blueprint-grid absolute inset-0 opacity-60" />

      <div className="relative">
        <SectionHeading
          eyebrow={dictionary.home.protections.eyebrow}
          title={dictionary.home.protections.title}
          description={dictionary.home.protections.description}
          inverse
          action={
            <LocalizedLink
              route="protection"
              locale={locale}
              className={buttonStyles("inverse-outline", "md")}
            >
              {dictionary.home.protections.cta}
              <ArrowRightIcon className="size-4" />
            </LocalizedLink>
          }
        />

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {protections.map((protection, index) => (
            <Reveal
              as="li"
              key={protection.id}
              delay={index * 70}
              className="group flex flex-col rounded-3xl border border-white/15 bg-navy-900 p-6 transition-colors duration-300 hover:bg-navy-800 lg:p-7"
            >
              <ProtectionIcon
                id={protection.id}
                className="size-9 text-bronze-300 transition-transform duration-300 group-hover:-translate-y-0.5"
                strokeWidth={1.25}
              />
              <h3 className="mt-6 font-display text-base font-semibold leading-snug text-text-inverse">
                {protection.name[locale]}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text-inverse-muted">
                {protection.shortDescription[locale]}
              </p>
              <LocalizedLink
                route="protection"
                locale={locale}
                hash={protection.id}
                className="mt-5 inline-flex items-center gap-1.5 font-display text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-bronze-300 transition-colors hover:text-white"
              >
                {dictionary.common.viewAll}
                <ArrowRightIcon className="size-3 transition-transform duration-200 group-hover:translate-x-1" />
              </LocalizedLink>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}

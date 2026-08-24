import { CertStrip } from "@/components/shared/cert-strip";
import { buttonStyles } from "@/components/ui/button";
import { ArrowRightIcon, CheckIcon } from "@/components/ui/icons";
import { LocalizedLink } from "@/components/ui/localized-link";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { filterableStandardIds } from "@/data/standards";
import { getDictionary } from "@/i18n";
import type { Locale } from "@/types";

export function Certifications({ locale }: { readonly locale: Locale }) {
  const dictionary = getDictionary(locale);
  const { certifications } = dictionary.home;
  const copy = dictionary.trust;
  const catalogLines = [copy.catalogNorth, copy.catalogEurope, copy.catalogArc, copy.catalogOther];

  return (
    <Section tone="surface">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow={certifications.eyebrow}
            title={certifications.title}
            description={certifications.description}
          />

          <Reveal delay={120} className="mt-8">
            <LocalizedLink
              route="protection"
              locale={locale}
              hash="por-que-certificada"
              className={buttonStyles("primary", "md")}
            >
              {certifications.cta}
              <ArrowRightIcon className="size-4" />
            </LocalizedLink>
          </Reveal>
        </div>

        <Reveal delay={100} className="lg:col-span-7">
          <CertStrip locale={locale} ids={filterableStandardIds} />

          <ul className="mt-6 space-y-2.5">
            {catalogLines.map((line) => (
              <li key={line} className="flex items-start gap-2.5 text-sm leading-relaxed text-text">
                <CheckIcon className="mt-0.5 size-4 shrink-0 text-accent" />
                {line}
              </li>
            ))}
          </ul>

          <p className="mt-6 text-xs leading-relaxed text-text-subtle">{copy.certificatesNote}</p>
        </Reveal>
      </div>
    </Section>
  );
}

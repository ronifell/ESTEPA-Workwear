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
  const gains = [copy.gainReal, copy.gainAccess, copy.gainCompliance, copy.gainDurability];
  const valuePoints = [copy.valueReplacements, copy.valueLogistics, copy.valueProtection];

  return (
    <Section id="por-que-certificada" tone="surface">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow={certifications.eyebrow}
            title={certifications.title}
            description={certifications.description}
          />

          <h3 className="mt-8 font-display text-lg font-bold text-navy-900">{copy.gainsTitle}</h3>
          <ul className="mt-4 space-y-3">
            {gains.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-text">
                <CheckIcon className="mt-0.5 size-4 shrink-0 text-accent" />
                {item}
              </li>
            ))}
          </ul>

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

          <div className="mt-8 rounded-3xl border border-border bg-surface-muted p-5 lg:p-6">
            <h3 className="font-display text-lg font-bold text-navy-900">{copy.valueTitle}</h3>
            <p className="mt-3 text-sm leading-relaxed text-text">{copy.valueBody}</p>
            <ul className="mt-5 grid gap-2 sm:grid-cols-3">
              {valuePoints.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-border bg-surface px-4 py-3 font-display text-sm font-semibold text-navy-900"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-6 text-xs leading-relaxed text-text-subtle">{copy.certificatesNote}</p>
        </Reveal>
      </div>
    </Section>
  );
}

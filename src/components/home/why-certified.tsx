import { CheckIcon } from "@/components/ui/icons";
import { buttonStyles } from "@/components/ui/button";
import { LocalizedLink } from "@/components/ui/localized-link";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { CertStrip } from "@/components/shared/cert-strip";
import { getDictionary } from "@/i18n";
import { filterableStandardIds } from "@/data/standards";
import type { Locale } from "@/types";

export function WhyCertified({ locale }: { readonly locale: Locale }) {
  const dictionary = getDictionary(locale);
  const copy = dictionary.trust;
  const gains = [copy.gainReal, copy.gainAccess, copy.gainCompliance, copy.gainDurability];
  const valuePoints = [copy.valueReplacements, copy.valueLogistics, copy.valueProtection];

  return (
    <Section id="por-que-certificada" tone="surface">
      <SectionHeading
        eyebrow={copy.whyEyebrow}
        title={copy.whyTitle}
        description={copy.whySubtitle}
      />

      <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-14">
        <Reveal className="lg:col-span-7">
          <h3 className="font-display text-lg font-bold text-navy-900">{copy.whyMatterTitle}</h3>
          <p className="mt-3 text-sm leading-relaxed text-text sm:text-base">{copy.whyMatterBody}</p>

          <h3 className="mt-8 font-display text-lg font-bold text-navy-900">{copy.gainsTitle}</h3>
          <ul className="mt-4 space-y-3">
            {gains.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-text">
                <CheckIcon className="mt-0.5 size-4 shrink-0 text-accent" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={80} className="lg:col-span-5">
          <CertStrip locale={locale} ids={filterableStandardIds} compact />
          <p className="mt-4 text-xs leading-relaxed text-text-subtle">{copy.certificatesNote}</p>
        </Reveal>
      </div>

      <Reveal delay={120} className="mt-12 border border-border bg-surface-muted p-6 lg:mt-16 lg:p-8">
        <h3 className="font-display text-xl font-bold text-navy-900 sm:text-2xl">{copy.valueTitle}</h3>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-text sm:text-base">{copy.valueBody}</p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-3">
          {valuePoints.map((item) => (
            <li
              key={item}
              className="border border-border bg-surface px-4 py-3 font-display text-sm font-semibold text-navy-900"
            >
              {item}
            </li>
          ))}
        </ul>
      </Reveal>

      <div className="mt-8">
        <LocalizedLink route="protection" locale={locale} className={buttonStyles("primary", "md")}>
          {copy.whyCta}
        </LocalizedLink>
      </div>
    </Section>
  );
}

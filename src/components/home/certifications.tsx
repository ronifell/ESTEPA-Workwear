import { buttonStyles } from "@/components/ui/button";
import { ArrowRightIcon, ClipboardIcon, DocumentIcon, ShieldCheckIcon } from "@/components/ui/icons";
import { LocalizedLink } from "@/components/ui/localized-link";
import { Notice } from "@/components/ui/notice";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { getDictionary } from "@/i18n";
import type { Locale } from "@/types";

/**
 * Trust block. The standards area is intentionally an empty, clearly labelled
 * placeholder: no certification may be shown before it is documented.
 */
export function Certifications({ locale }: { readonly locale: Locale }) {
  const dictionary = getDictionary(locale);
  const { certifications } = dictionary.home;

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
              className={buttonStyles("primary", "md")}
            >
              {certifications.cta}
              <ArrowRightIcon className="size-4" />
            </LocalizedLink>
          </Reveal>
        </div>

        <Reveal delay={100} className="lg:col-span-7">
          <div className="border border-border bg-surface-muted p-6 lg:p-8">
            <div className="flex items-start gap-3">
              <ShieldCheckIcon className="mt-0.5 size-5 shrink-0 text-accent" />
              <div>
                <h3 className="font-display text-base font-semibold text-navy-900">
                  {certifications.placeholderTitle}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-text-muted">
                  {certifications.placeholderDescription}
                </p>
              </div>
            </div>

            {/* Reserved slots for the standard logos supplied by the client. */}
            <ul className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[0, 1, 2, 3].map((slot) => (
                <li
                  key={slot}
                  className="flex aspect-3/2 items-center justify-center border border-dashed border-border-strong bg-sand-50"
                >
                  <DocumentIcon className="size-6 text-text-subtle/60" strokeWidth={1.25} />
                </li>
              ))}
            </ul>

            <Notice tone="pending" className="mt-6" title={dictionary.common.preliminaryContent}>
              {certifications.note}
            </Notice>

            <p className="mt-6 flex items-start gap-2.5 text-xs leading-relaxed text-text-subtle">
              <ClipboardIcon className="mt-px size-4 shrink-0" />
              {dictionary.protectionPage.disclaimerDescription}
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

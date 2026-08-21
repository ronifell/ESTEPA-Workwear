import { PageHero } from "@/components/shared/page-hero";
import { buttonStyles } from "@/components/ui/button";
import { LocalizedLink } from "@/components/ui/localized-link";
import { Notice } from "@/components/ui/notice";
import { Section } from "@/components/ui/section";
import { getDictionary } from "@/i18n";
import { getPath } from "@/i18n/routes";
import type { Locale } from "@/types";

type LegalDocument = "privacy" | "terms" | "returns";

export interface LegalPageProps {
  readonly locale: Locale;
  readonly document: LegalDocument;
}

export function LegalPage({ locale, document }: LegalPageProps) {
  const dictionary = getDictionary(locale);
  const copy = dictionary.legal[document];

  return (
    <>
      <PageHero
        eyebrow={dictionary.legal.eyebrow}
        title={copy.title}
        description={copy.description}
        size="compact"
        breadcrumbs={[
          { label: dictionary.nav.home, href: getPath("home", locale) },
          { label: copy.title },
        ]}
      />

      <Section tone="default">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Notice tone="pending">{dictionary.legal.reviewNote}</Notice>

            <div className="mt-10 space-y-9">
              {copy.sections.map((section, index) => (
                <article key={section.title}>
                  <h2 className="flex items-baseline gap-3 font-display text-lg font-semibold text-navy-900">
                    <span className="font-mono text-xs text-text-subtle tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {section.title}
                  </h2>
                  <p className="mt-3 max-w-2xl text-[0.9375rem] leading-relaxed text-text-muted">
                    {section.body}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div className="border border-border bg-surface-muted p-6 lg:sticky lg:top-28">
              <h2 className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-navy-900">
                {dictionary.footer.legalTitle}
              </h2>

              <ul className="mt-4 space-y-2.5">
                {(
                  [
                    ["privacy", dictionary.legal.privacy.title],
                    ["terms", dictionary.legal.terms.title],
                    ["returns", dictionary.legal.returns.title],
                  ] as const
                ).map(([key, label]) => (
                  <li key={key}>
                    {key === document ? (
                      <span className="text-sm font-medium text-navy-900">{label}</span>
                    ) : (
                      <LocalizedLink
                        route={key}
                        locale={locale}
                        className="text-sm text-text-muted transition-colors hover:text-primary"
                      >
                        {label}
                      </LocalizedLink>
                    )}
                  </li>
                ))}
              </ul>

              <p className="mt-6 border-t border-border pt-5 text-sm leading-relaxed text-text-muted">
                {dictionary.legal.questions}
              </p>

              <LocalizedLink
                route="contact"
                locale={locale}
                className={buttonStyles("outline", "sm", "mt-4 w-full")}
              >
                {dictionary.common.contactUs}
              </LocalizedLink>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}

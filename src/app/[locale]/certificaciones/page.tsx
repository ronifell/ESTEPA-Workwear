import type { Metadata } from "next";

import { ProtectionCatalog } from "@/components/protection/protection-catalog";
import { CtaSection } from "@/components/shared/cta-section";
import { CertStrip } from "@/components/shared/cert-strip";
import { PageHero } from "@/components/shared/page-hero";
import { CheckIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { protections } from "@/data/protections";
import { filterableStandardIds } from "@/data/standards";
import { getDictionary, resolveLocale } from "@/i18n";
import { getPath } from "@/i18n/routes";
import { getProducts } from "@/lib/repositories/products";
import { buildMetadataFromDictionary } from "@/lib/seo";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadataFromDictionary("protection", resolveLocale(locale), "protection");
}

export default async function ProtectionPage({ params }: PageProps) {
  const locale = resolveLocale((await params).locale);
  const dictionary = getDictionary(locale);
  const copy = dictionary.protectionPage;

  const sections = await Promise.all(
    protections.map(async (protection) => ({
      protection,
      products: await getProducts({ protections: [protection.id] }),
    })),
  );

  const steps = [copy.steps.one, copy.steps.two, copy.steps.three];

  return (
    <>
      <PageHero
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
        image="/images/sectors/oil-gas.jpg"
        imageAlt={
          locale === "es"
            ? "Ropa antiestática petróleo y gas: indumentaria FR certificada ESTEPA en entorno energético"
            : "Antistatic oil and gas workwear: ESTEPA certified FR apparel in an energy environment"
        }
        size="compact"
        breadcrumbs={[
          { label: dictionary.nav.home, href: getPath("home", locale) },
          { label: dictionary.nav.protection },
        ]}
      />

      <Section id="por-que-certificada" tone="surface">
        <SectionHeading
          eyebrow={dictionary.trust.whyEyebrow}
          title={dictionary.trust.whyTitle}
          description={dictionary.trust.whyMatterBody}
        />

        <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h3 className="font-display text-lg font-bold text-navy-900">
              {dictionary.trust.gainsTitle}
            </h3>
            <ul className="mt-4 space-y-3">
              {[
                dictionary.trust.gainReal,
                dictionary.trust.gainAccess,
                dictionary.trust.gainCompliance,
                dictionary.trust.gainDurability,
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-text">
                  <CheckIcon className="mt-0.5 size-4 shrink-0 text-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-6">
            <CertStrip locale={locale} ids={filterableStandardIds} />
            <p className="mt-4 text-xs leading-relaxed text-text-subtle">
              {dictionary.trust.certificatesNote}
            </p>
          </div>
        </div>
      </Section>

      <Section tone="default">
        <ProtectionCatalog locale={locale} sections={sections} />
      </Section>

      <Section tone="muted">
        <SectionHeading eyebrow={copy.eyebrow} title={copy.howWeWorkTitle} align="center" />

        <ol className="mx-auto mt-12 grid max-w-5xl gap-px border border-border bg-border sm:grid-cols-3 lg:mt-16">
          {steps.map((step, index) => (
            <Reveal as="li" key={step.title} delay={index * 90} className="bg-surface p-6 lg:p-8">
              <span className="font-display text-3xl font-bold tabular-nums text-sand-400">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-display text-base font-semibold text-navy-900">
                {step.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-text-muted">{step.description}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      <CtaSection locale={locale} />
    </>
  );
}

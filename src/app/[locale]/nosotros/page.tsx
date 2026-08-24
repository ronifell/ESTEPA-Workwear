import type { Metadata } from "next";
import Image from "next/image";

import { CtaSection } from "@/components/shared/cta-section";
import { PageHero } from "@/components/shared/page-hero";
import { buttonStyles } from "@/components/ui/button";
import {
  ArrowRightIcon,
  GemIcon,
  LayersIcon,
  ShieldCheckIcon,
  TargetIcon,
  type IconProps,
} from "@/components/ui/icons";
import { LocalizedLink } from "@/components/ui/localized-link";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { sectors } from "@/data/sectors";
import { getDictionary, resolveLocale, type Dictionary } from "@/i18n";
import { getPath } from "@/i18n/routes";
import { buildMetadataFromDictionary } from "@/lib/seo";

interface PageProps {
  params: Promise<{ locale: string }>;
}

const approachIcons: readonly {
  readonly key: keyof Dictionary["about"]["approach"];
  readonly Icon: (props: IconProps) => React.JSX.Element;
}[] = [
  { key: "safety", Icon: ShieldCheckIcon },
  { key: "quality", Icon: GemIcon },
  { key: "specialization", Icon: TargetIcon },
  { key: "service", Icon: LayersIcon },
];

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadataFromDictionary("about", resolveLocale(locale), "about");
}

export default async function AboutPage({ params }: PageProps) {
  const locale = resolveLocale((await params).locale);
  const dictionary = getDictionary(locale);
  const copy = dictionary.about;

  return (
    <>
      <PageHero
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.intro}
        image="/images/sectors/industry.jpg"
        imageAlt={
          locale === "es"
            ? "Indumentaria de seguridad industrial certificada ESTEPA para trabajo e industria"
            : "ESTEPA certified industrial safety apparel for work and industry"
        }
        breadcrumbs={[
          { label: dictionary.nav.home, href: getPath("home", locale) },
          { label: dictionary.nav.about },
        ]}
      />

      <Section tone="default">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow mb-5 text-accent">
              <span aria-hidden className="h-px w-8 bg-accent/50" />
              {copy.missionTitle}
            </p>
            <p className="text-xl leading-relaxed text-navy-900 sm:text-2xl sm:leading-relaxed">
              {copy.missionDescription}
            </p>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-5">
            <div className="relative aspect-3/2 overflow-hidden bg-sand-200 lg:aspect-4/3">
              <Image
                src="/images/hero/about-detail.jpg"
                alt={
                  locale === "es"
                    ? "Ropa de trabajo certificada ESTEPA: detalle de indumentaria técnica industrial"
                    : "ESTEPA certified workwear: detail of technical industrial apparel"
                }
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.approachTitle}
          description={copy.approachDescription}
        />

        <ul className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {approachIcons.map(({ key, Icon }, index) => (
            <Reveal as="li" key={key} delay={index * 80} className="bg-surface p-6 lg:p-7">
              <Icon className="size-8 text-navy-700" strokeWidth={1.3} />
              <h3 className="mt-5 font-display text-base font-semibold text-navy-900">
                {copy.approach[key].title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-text-muted">
                {copy.approach[key].description}
              </p>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section tone="default">
        <SectionHeading eyebrow={dictionary.common.sectors} title={copy.sectorsTitle} />

        <ul className="mt-10 grid gap-5 lg:mt-12 lg:grid-cols-3">
          {sectors.map((sector, index) => (
            <Reveal as="li" key={sector.id} delay={index * 80}>
              <LocalizedLink
                route={sector.routeKey}
                locale={locale}
                className="group relative flex h-full flex-col overflow-hidden border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
              >
                <div className="relative aspect-16/9 overflow-hidden bg-sand-200">
                  <Image
                    src={sector.image}
                    alt={sector.imageAlt[locale]}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-lg font-semibold text-navy-900">
                    {sector.name[locale]}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-text-muted">
                    {sector.tagline[locale]}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 font-display text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-primary transition-colors group-hover:text-accent">
                    {dictionary.common.explore}
                    <ArrowRightIcon className="size-3 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </div>
              </LocalizedLink>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section tone="inverse" className="relative overflow-hidden">
        <div aria-hidden className="blueprint-grid absolute inset-0 opacity-60" />

        <div className="relative grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow={copy.coverageTitle}
              title={copy.coverageTitle}
              description={copy.coverageDescription}
              inverse
            />
          </div>

          <div className="lg:col-span-7">
            <p className="font-display text-xl font-semibold leading-snug text-text-inverse sm:text-2xl">
              {copy.coverageStatement}
            </p>

            <LocalizedLink
              route="contact"
              locale={locale}
              className={buttonStyles("accent", "md", "mt-8")}
            >
              {dictionary.common.talkToAdvisor}
              <ArrowRightIcon className="size-4" />
            </LocalizedLink>
          </div>
        </div>
      </Section>

      <Section id="nuestra-historia" tone="muted">
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.historyTitle}
          description={copy.historyPlaceholder}
        />
        <div className="mt-10 border border-dashed border-border-strong bg-surface px-6 py-16 text-center">
          <span aria-hidden className="hazard-stripes mx-auto h-1 w-16 opacity-70" />
          <p className="mt-6 font-display text-sm font-semibold uppercase tracking-[0.14em] text-text-subtle">
            {copy.historyNote}
          </p>
        </div>
      </Section>

      <CtaSection locale={locale} title={copy.ctaTitle} description={copy.ctaDescription} />
    </>
  );
}

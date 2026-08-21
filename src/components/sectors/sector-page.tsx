import { ProductGrid } from "@/components/products/product-grid";
import { CtaSection } from "@/components/shared/cta-section";
import { PageHero } from "@/components/shared/page-hero";
import { ProtectionIcon } from "@/components/shared/protection-icon";
import { buttonStyles } from "@/components/ui/button";
import { ArrowRightIcon, CheckIcon, ClipboardIcon } from "@/components/ui/icons";
import { LocalizedLink } from "@/components/ui/localized-link";
import { Notice } from "@/components/ui/notice";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { protectionsById } from "@/data/protections";
import { getSector } from "@/data/sectors";
import { getDictionary } from "@/i18n";
import { getPath } from "@/i18n/routes";
import { getProducts } from "@/lib/repositories/products";
import type { Locale, SectorId } from "@/types";

export async function SectorPage({
  sectorId,
  locale,
}: {
  readonly sectorId: SectorId;
  readonly locale: Locale;
}) {
  const dictionary = getDictionary(locale);
  const sector = getSector(sectorId);
  const products = await getProducts({ sectors: [sectorId] });
  const copy = dictionary.sectorPage;

  return (
    <>
      <PageHero
        eyebrow={copy.eyebrow}
        title={sector.heroTitle[locale]}
        description={sector.heroDescription[locale]}
        image={sector.image}
        imageAlt={sector.imageAlt[locale]}
        breadcrumbs={[
          { label: dictionary.nav.home, href: getPath("home", locale) },
          { label: sector.name[locale] },
        ]}
        actions={
          <>
            <LocalizedLink
              route="products"
              locale={locale}
              query={{ sector: sectorId }}
              className={buttonStyles("accent", "lg")}
            >
              {dictionary.common.viewProducts}
              <ArrowRightIcon className="size-4" />
            </LocalizedLink>
            <LocalizedLink
              route="contact"
              locale={locale}
              className={buttonStyles("inverse-outline", "lg")}
            >
              {dictionary.common.requestInformation}
            </LocalizedLink>
          </>
        }
      />

      <Section tone="default">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <p className="text-lg leading-relaxed text-text sm:text-xl">
              {sector.intro[locale]}
            </p>
          </Reveal>

          <Reveal delay={100} className="lg:col-span-5">
            <div className="border border-border bg-surface p-6">
              <p className="eyebrow mb-4 text-accent">{copy.environmentsTitle}</p>
              <ul className="space-y-2.5">
                {sector.environments[locale].map((environment) => (
                  <li key={environment} className="flex items-start gap-2.5 text-sm text-text">
                    <CheckIcon className="mt-0.5 size-4 shrink-0 text-accent" />
                    {environment}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.needsTitle}
          description={copy.needsDescription}
        />

        <ul className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {sector.needs.map((need, index) => (
            <Reveal
              as="li"
              key={need.title[locale]}
              delay={index * 80}
              className="flex flex-col bg-surface p-6 lg:p-7"
            >
              <span className="font-display text-xs font-bold tabular-nums text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-display text-base font-semibold leading-snug text-navy-900">
                {need.title[locale]}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">
                {need.description[locale]}
              </p>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section tone="default">
        <SectionHeading
          eyebrow={dictionary.common.protections}
          title={copy.solutionsTitle}
          description={copy.solutionsDescription}
        />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {sector.relatedProtections.map((id, index) => {
            const protection = protectionsById[id];
            return (
              <Reveal as="li" key={id} delay={index * 80}>
                <LocalizedLink
                  route="protection"
                  locale={locale}
                  hash={id}
                  className="group flex h-full flex-col border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-border-strong hover:shadow-card lg:p-7"
                >
                  <ProtectionIcon
                    id={id}
                    className="size-8 text-navy-700 transition-colors group-hover:text-accent"
                    strokeWidth={1.3}
                  />
                  <h3 className="mt-5 font-display text-base font-semibold text-navy-900">
                    {protection.name[locale]}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-text-muted">
                    {protection.shortDescription[locale]}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 font-display text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-primary transition-colors group-hover:text-accent">
                    {dictionary.common.learnMore}
                    <ArrowRightIcon className="size-3 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </LocalizedLink>
              </Reveal>
            );
          })}
        </ul>

        <Reveal delay={120} className="mt-12">
          <div className="border border-border bg-surface-muted p-6 lg:p-8">
            <div className="flex items-start gap-3">
              <ClipboardIcon className="mt-0.5 size-5 shrink-0 text-accent" />
              <div className="max-w-3xl">
                <h3 className="font-display text-base font-semibold text-navy-900">
                  {copy.technicalTitle}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">
                  {copy.technicalDescription}
                </p>
              </div>
            </div>
            <Notice tone="pending" className="mt-6">
              {copy.technicalPlaceholder}
            </Notice>
          </div>
        </Reveal>
      </Section>

      <Section tone="muted">
        <SectionHeading
          eyebrow={dictionary.products.eyebrow}
          title={copy.productsTitle}
          description={copy.productsDescription}
          action={
            <LocalizedLink
              route="products"
              locale={locale}
              query={{ sector: sectorId }}
              className={buttonStyles("outline", "md")}
            >
              {dictionary.common.viewProducts}
              <ArrowRightIcon className="size-4" />
            </LocalizedLink>
          }
        />

        <ProductGrid products={products} locale={locale} columns={3} className="mt-12 lg:mt-16" />
      </Section>

      <CtaSection locale={locale} title={copy.ctaTitle} description={copy.ctaDescription} />
    </>
  );
}

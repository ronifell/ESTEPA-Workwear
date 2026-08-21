import type { Metadata } from "next";

import { ProductCard } from "@/components/products/product-card";
import { CtaSection } from "@/components/shared/cta-section";
import { PageHero } from "@/components/shared/page-hero";
import { ProtectionIcon } from "@/components/shared/protection-icon";
import { Notice } from "@/components/ui/notice";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { protections } from "@/data/protections";
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
      products: await getProducts({ protections: [protection.id], limit: 2 }),
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
        imageAlt=""
        breadcrumbs={[
          { label: dictionary.nav.home, href: getPath("home", locale) },
          { label: dictionary.nav.protection },
        ]}
      />

      <Section tone="default" className="py-12 lg:py-14">
        <Reveal>
          <Notice tone="info" title={copy.disclaimerTitle}>
            {copy.disclaimerDescription}
          </Notice>
        </Reveal>
      </Section>

      <Section tone="default" className="pt-0">
        <ul className="space-y-5">
          {sections.map(({ protection, products }, index) => (
            <Reveal as="li" key={protection.id} delay={index * 60}>
              <article
                id={protection.id}
                className="scroll-mt-28 border border-border bg-surface"
              >
                <div className="grid gap-8 p-6 lg:grid-cols-12 lg:gap-10 lg:p-8">
                  <div className="lg:col-span-7">
                    <div className="flex items-start gap-4">
                      <span className="flex size-12 shrink-0 items-center justify-center border border-border bg-surface-muted text-navy-700">
                        <ProtectionIcon
                          id={protection.id}
                          className="size-6"
                          strokeWidth={1.35}
                        />
                      </span>
                      <div>
                        <p className="font-display text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-accent">
                          {String(index + 1).padStart(2, "0")}
                        </p>
                        <h2 className="mt-1 font-display text-xl font-semibold text-navy-900 sm:text-2xl">
                          {protection.name[locale]}
                        </h2>
                      </div>
                    </div>

                    <p className="mt-5 text-sm leading-relaxed text-text-muted sm:text-base">
                      {protection.description[locale]}
                    </p>

                    <div className="mt-7 border border-dashed border-border-strong bg-surface-muted p-5">
                      <h3 className="font-display text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-text-subtle">
                        {copy.standardsTitle}
                      </h3>
                      {protection.standards.length > 0 ? (
                        <ul className="mt-3 flex flex-wrap gap-2">
                          {protection.standards.map((standard) => (
                            <li
                              key={standard.id}
                              className="border border-border bg-surface px-3 py-1.5 font-display text-xs font-semibold text-text"
                            >
                              {standard.name}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="mt-2.5 flex items-center gap-2 text-sm text-text-subtle">
                          <span aria-hidden className="hazard-stripes h-px w-6 opacity-60" />
                          {copy.standardsPending}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="lg:col-span-5">
                    <h3 className="font-display text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-text-subtle">
                      {copy.relatedProductsTitle}
                    </h3>

                    {products.length > 0 ? (
                      <ul className="mt-4 grid gap-4 sm:grid-cols-2">
                        {products.map((product) => (
                          <li key={product.id} className="flex">
                            <ProductCard product={product} locale={locale} className="w-full" />
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-4 text-sm text-text-subtle">{copy.noRelatedProducts}</p>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
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

import { ProductCard } from "@/components/products/product-card";
import { ProtectionIcon } from "@/components/shared/protection-icon";
import { buttonStyles } from "@/components/ui/button";
import { LocalizedLink } from "@/components/ui/localized-link";
import { getDictionary } from "@/i18n";
import type { Locale, Product, Protection } from "@/types";

export function ProtectionCatalog({
  locale,
  sections,
}: {
  readonly locale: Locale;
  readonly sections: readonly {
    readonly protection: Protection;
    readonly products: readonly Product[];
  }[];
}) {
  const dictionary = getDictionary(locale);
  const copy = dictionary.protectionPage;

  return (
    <div>
      <nav
        aria-label={copy.selectRisk}
        className="sticky top-16 z-30 -mx-4 mb-10 border-y border-border bg-sand-100/95 px-4 py-3 backdrop-blur-sm lg:top-[4.75rem] lg:mx-0 lg:rounded-full lg:border lg:px-3 lg:py-3"
      >
        <ul className="flex gap-2 overflow-x-auto sm:gap-3 lg:gap-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {sections.map(({ protection }, index) => (
            <li key={protection.id} className="min-w-0 flex-1">
              <a
                href={`#${protection.id}`}
                className="flex w-full items-center justify-center gap-2.5 rounded-full px-4 py-3 font-display text-sm font-semibold uppercase tracking-[0.08em] text-navy-900 transition-colors hover:bg-white hover:text-accent sm:gap-3 sm:px-5 sm:py-3.5 sm:text-base"
              >
                <span className="tabular-nums text-accent">{String(index + 1).padStart(2, "0")}</span>
                <span className="text-center leading-tight">{protection.name[locale]}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="space-y-16 lg:space-y-20">
        {sections.map(({ protection, products }, index) => (
          <section key={protection.id} id={protection.id} className="scroll-mt-28">
            <div className="max-w-3xl">
              <p className="font-display text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-accent">
                {String(index + 1).padStart(2, "0")} · {copy.selectRisk}
              </p>
              <div className="mt-3 flex items-start gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-border bg-surface text-navy-700">
                  <ProtectionIcon id={protection.id} className="size-6" strokeWidth={1.35} />
                </span>
                <div>
                  <h2 className="font-display text-2xl font-semibold text-navy-900 sm:text-3xl">
                    {protection.name[locale]}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted sm:text-base">
                    {protection.shortDescription[locale]}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-display text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-text-subtle">
                {copy.relatedProductsTitle}
              </h3>
              {products.length > 0 ? (
                <ul className="mt-4 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {products.map((product) => (
                    <li key={product.id} className="flex h-full">
                      <ProductCard product={product} locale={locale} className="w-full" />
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-sm text-text-subtle">{copy.noRelatedProducts}</p>
              )}
            </div>

            <div className="mt-8 rounded-3xl border border-navy-900 bg-navy-900 p-6 text-text-inverse lg:p-8">
              <h3 className="font-display text-lg font-semibold">{copy.documentationTitle}</h3>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-text-inverse-muted">
                <li>{copy.documentationItem1}</li>
                <li>{copy.documentationItem2}</li>
              </ul>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <LocalizedLink
                  route="contact"
                  locale={locale}
                  query={{ tema: "documentacion" }}
                  className={buttonStyles("inverse", "md")}
                >
                  {copy.requestDossier}
                </LocalizedLink>
                <LocalizedLink
                  route="contact"
                  locale={locale}
                  query={{ tema: "licitacion" }}
                  className={buttonStyles("inverse-outline", "md")}
                >
                  {copy.requestTender}
                </LocalizedLink>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

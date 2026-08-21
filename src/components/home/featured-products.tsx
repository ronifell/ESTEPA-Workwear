import { ProductGrid } from "@/components/products/product-grid";
import { buttonStyles } from "@/components/ui/button";
import { ArrowRightIcon } from "@/components/ui/icons";
import { LocalizedLink } from "@/components/ui/localized-link";
import { Section, SectionHeading } from "@/components/ui/section";
import { getDictionary } from "@/i18n";
import { getFeaturedProducts } from "@/lib/repositories/products";
import type { Locale } from "@/types";

export async function FeaturedProducts({ locale }: { readonly locale: Locale }) {
  const dictionary = getDictionary(locale);
  const products = await getFeaturedProducts(6);

  return (
    <Section tone="muted">
      <SectionHeading
        eyebrow={dictionary.home.featured.eyebrow}
        title={dictionary.home.featured.title}
        description={dictionary.home.featured.description}
        action={
          <LocalizedLink
            route="products"
            locale={locale}
            className={buttonStyles("outline", "md")}
          >
            {dictionary.home.featured.cta}
            <ArrowRightIcon className="size-4" />
          </LocalizedLink>
        }
      />

      <ProductGrid products={products} locale={locale} columns={3} className="mt-12 lg:mt-16" />
    </Section>
  );
}

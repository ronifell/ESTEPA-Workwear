import { ProductGrid } from "@/components/products/product-grid";
import { getDictionary } from "@/i18n";
import { categoryIds } from "@/lib/product-filters";
import type { Locale, Product } from "@/types";

export function ProductCategorySections({
  products,
  locale,
  columns = 3,
}: {
  readonly products: readonly Product[];
  readonly locale: Locale;
  readonly columns?: 2 | 3 | 4;
}) {
  const dictionary = getDictionary(locale);
  const groups = categoryIds
    .map((id) => ({
      id,
      items: products.filter((product) => product.category === id),
    }))
    .filter((group) => group.items.length > 0);

  if (groups.length === 0) {
    return <ProductGrid products={[]} locale={locale} />;
  }

  return (
    <div className="flex flex-col gap-14 lg:gap-16">
      {groups.map((group, groupIndex) => (
        <section key={group.id} id={group.id} className="scroll-mt-28">
          <h2 className="font-display text-xl font-semibold text-navy-900 sm:text-2xl">
            {dictionary.products.categories[group.id]}
          </h2>
          <ProductGrid
            products={group.items}
            locale={locale}
            columns={columns}
            prioritizeFirst={groupIndex === 0}
            className="mt-6"
          />
        </section>
      ))}
    </div>
  );
}

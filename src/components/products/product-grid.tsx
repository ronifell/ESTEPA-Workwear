import { ProductCard } from "@/components/products/product-card";
import { buttonStyles } from "@/components/ui/button";
import { LocalizedLink } from "@/components/ui/localized-link";
import { Reveal } from "@/components/ui/reveal";
import { getDictionary } from "@/i18n";
import { cn } from "@/lib/utils";
import type { Locale, Product } from "@/types";

export interface ProductGridProps {
  readonly products: readonly Product[];
  readonly locale: Locale;
  readonly columns?: 2 | 3 | 4;
  readonly className?: string;
  readonly prioritizeFirst?: boolean;
}

const columnStyles: Record<2 | 3 | 4, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
};

export function ProductGrid({
  products,
  locale,
  columns = 3,
  className,
  prioritizeFirst = false,
}: ProductGridProps) {
  const dictionary = getDictionary(locale);

  if (products.length === 0) {
    return <EmptyProducts locale={locale} />;
  }

  return (
    <ul className={cn("grid grid-cols-1 gap-5 lg:gap-6", columnStyles[columns], className)}>
      {products.map((product, index) => (
        <Reveal as="li" key={product.id} delay={Math.min(index, 5) * 60} className="flex">
          <ProductCard
            product={product}
            locale={locale}
            className="w-full"
            priority={prioritizeFirst && index === 0}
          />
        </Reveal>
      ))}
      <span className="sr-only">{dictionary.products.title}</span>
    </ul>
  );
}

/** Shown whenever a filter, sector or protection has no published products. */
export function EmptyProducts({
  locale,
  className,
}: {
  readonly locale: Locale;
  readonly className?: string;
}) {
  const dictionary = getDictionary(locale);

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center border border-dashed border-border-strong bg-surface-muted px-6 py-16 text-center",
        className,
      )}
    >
      <span aria-hidden className="hazard-stripes h-1 w-16 opacity-70" />
      <h3 className="mt-6 font-display text-xl font-semibold text-navy-900">
        {dictionary.products.empty.title}
      </h3>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-text-muted">
        {dictionary.products.empty.description}
      </p>
      <LocalizedLink
        route="contact"
        locale={locale}
        className={buttonStyles("outline", "md", "mt-7")}
      >
        {dictionary.products.empty.cta}
      </LocalizedLink>
    </div>
  );
}

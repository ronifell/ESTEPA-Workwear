"use client";

import { ProductGrid } from "@/components/products/product-grid";
import { useFavorites } from "@/components/providers/favorites-provider";
import { useI18n } from "@/components/providers/i18n-provider";
import { buttonStyles } from "@/components/ui/button";
import { ArrowRightIcon, HeartIcon } from "@/components/ui/icons";
import { LocalizedLink } from "@/components/ui/localized-link";
import type { Product } from "@/types";

export function FavoritesContent({ products }: { readonly products: readonly Product[] }) {
  const { locale, dictionary } = useI18n();
  const { ids, isHydrated, clear } = useFavorites();
  const copy = dictionary.favorites;

  if (!isHydrated) {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((index) => (
          <div key={index} className="aspect-4/5 animate-pulse rounded-3xl border border-border bg-surface-muted" />
        ))}
      </div>
    );
  }

  const byId = new Map(products.map((product) => [product.id, product]));
  const saved = ids
    .map((id) => byId.get(id))
    .filter((product): product is Product => product !== undefined && product.active);

  if (saved.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center border border-dashed border-border-strong bg-surface px-6 py-20 text-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-sand-100 text-text-subtle">
          <HeartIcon className="size-7" />
        </span>
        <h2 className="mt-6 font-display text-xl font-semibold text-navy-900">{copy.empty.title}</h2>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-text-muted">
          {copy.empty.description}
        </p>
        <LocalizedLink
          route="products"
          locale={locale}
          className={buttonStyles("primary", "md", "mt-8")}
        >
          {copy.empty.cta}
          <ArrowRightIcon className="size-4" />
        </LocalizedLink>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">
          {saved.length} {saved.length === 1 ? copy.item : copy.items}
        </p>
        <button
          type="button"
          onClick={clear}
          className="font-display text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-primary transition-colors hover:text-accent"
        >
          {copy.clear}
        </button>
      </div>
      <ProductGrid products={saved} locale={locale} />
    </div>
  );
}

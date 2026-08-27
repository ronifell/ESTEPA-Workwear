import Image from "next/image";

import { ProductImageOverlay } from "@/components/products/product-image-overlay";
import { ExploreHint } from "@/components/ui/explore-hint";
import { Badge } from "@/components/ui/badge";
import { ArrowRightIcon } from "@/components/ui/icons";
import { LocalizedLink } from "@/components/ui/localized-link";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { siteConfig } from "@/config/site";
import { getDictionary } from "@/i18n";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Locale, Product } from "@/types";

export interface ProductCardProps {
  readonly product: Product;
  readonly locale: Locale;
  readonly className?: string;
  readonly priority?: boolean;
}

export function ProductCard({ product, locale, className, priority }: ProductCardProps) {
  const dictionary = getDictionary(locale);
  const image = product.images[0];
  const showPrice = siteConfig.commerce.pricesEnabled && product.price !== undefined;

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface transition-all duration-300 ease-[var(--ease-out-industrial)] hover:-translate-y-1 hover:border-border-strong hover:shadow-card-hover",
        className,
      )}
    >
      <div className="group/photo relative aspect-4/5 overflow-hidden bg-sand-200">
        {image ? (
          <Image
            src={image.src}
            alt={image.alt[locale]}
            fill
            priority={priority}
            sizes="(min-width: 1280px) 22rem, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 ease-[var(--ease-out-industrial)] group-hover:scale-[1.03]"
          />
        ) : (
          <PlaceholderImage
            category={product.category}
            label={dictionary.common.comingSoon}
          />
        )}

        <div className="absolute left-3 top-3 z-10 flex flex-wrap gap-1.5">
          {product.preliminary ? (
            <Badge tone="pending">{dictionary.common.preliminaryContent}</Badge>
          ) : null}
          {product.fabricFamily ? (
            <Badge tone="accent">{product.fabricFamily}</Badge>
          ) : null}
        </div>

        <ProductImageOverlay product={product} locale={locale} compact />
        <ExploreHint label={dictionary.common.explore} />
      </div>

      <div className="flex flex-1 flex-col p-5 lg:p-6">
        <h3 className="sr-only">
          <LocalizedLink
            route="productDetail"
            locale={locale}
            params={{ slug: product.slug }}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {product.name[locale]}
          </LocalizedLink>
        </h3>

        <p className="text-sm leading-relaxed text-text-muted">{product.shortDescription[locale]}</p>

        <div className="mt-auto pt-6">
          <div className="flex flex-col gap-2.5 border-t border-border pt-4">
            <span
              className={cn(
                "font-display text-sm font-semibold",
                showPrice ? "text-navy-900" : "text-text-muted",
              )}
            >
              {showPrice && product.price !== undefined
                ? formatPrice(product.price, locale, product.currency)
                : dictionary.product.priceOnRequest}
            </span>

            <span className="flex items-center gap-1.5 font-display text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-primary transition-colors group-hover:text-accent">
              {dictionary.common.viewProduct}
              <ArrowRightIcon className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

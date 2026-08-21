"use client";

import Image from "next/image";

import { useCart } from "@/components/providers/cart-provider";
import { useI18n } from "@/components/providers/i18n-provider";
import { TrashIcon } from "@/components/ui/icons";
import { LocalizedLink } from "@/components/ui/localized-link";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { QuantitySelector } from "@/components/ui/quantity-selector";
import { siteConfig } from "@/config/site";
import { format } from "@/i18n";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { CartLine } from "@/types";

export interface CartLineItemProps {
  readonly line: CartLine;
  readonly compact?: boolean;
}

export function CartLineItem({ line, compact = false }: CartLineItemProps) {
  const { locale, dictionary } = useI18n();
  const { setQuantity, removeLine } = useCart();

  const name = line.snapshot.name[locale];
  const price = line.snapshot.price;
  const lineTotal = price !== undefined ? price * line.quantity : undefined;

  return (
    <li className={cn("flex gap-4", compact ? "py-4" : "py-6")}>
      <LocalizedLink
        route="productDetail"
        locale={locale}
        params={{ slug: line.snapshot.slug }}
        className={cn(
          "relative shrink-0 overflow-hidden border border-border bg-sand-200",
          compact ? "size-20" : "size-24 sm:size-28",
        )}
        tabIndex={-1}
        aria-hidden
      >
        {line.snapshot.image ? (
          <Image
            src={line.snapshot.image}
            alt=""
            fill
            sizes="112px"
            className="object-cover"
          />
        ) : (
          <PlaceholderImage category={line.snapshot.category} iconClassName="size-8" />
        )}
      </LocalizedLink>

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <LocalizedLink
              route="productDetail"
              locale={locale}
              params={{ slug: line.snapshot.slug }}
              className="font-display text-sm font-semibold text-navy-900 transition-colors hover:text-accent"
            >
              {name}
            </LocalizedLink>
            <p className="mt-1 text-xs text-text-muted">
              {dictionary.products.categories[line.snapshot.category]}
              {line.size ? (
                <>
                  <span aria-hidden className="mx-1.5 text-text-subtle">
                    ·
                  </span>
                  {dictionary.cart.size} {line.size}
                </>
              ) : null}
            </p>
          </div>

          <button
            type="button"
            onClick={() => removeLine(line.id)}
            aria-label={format(dictionary.cart.removeItem, { product: name })}
            className="-mr-1 shrink-0 p-1 text-text-subtle transition-colors hover:text-danger"
          >
            <TrashIcon className="size-4" />
          </button>
        </div>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
          <QuantitySelector
            value={line.quantity}
            onChange={(value) => setQuantity(line.id, value)}
            max={siteConfig.commerce.maxQuantityPerItem}
            label={dictionary.common.quantity}
            decreaseLabel={dictionary.common.decrease}
            increaseLabel={dictionary.common.increase}
            size="sm"
          />

          <span
            className={cn(
              "font-display text-sm font-semibold tabular-nums",
              lineTotal === undefined ? "text-text-muted" : "text-navy-900",
            )}
          >
            {lineTotal === undefined
              ? dictionary.product.priceOnRequest
              : formatPrice(lineTotal, locale, line.snapshot.currency)}
          </span>
        </div>
      </div>
    </li>
  );
}

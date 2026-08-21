"use client";

import { useState } from "react";

import { useCart } from "@/components/providers/cart-provider";
import { useI18n } from "@/components/providers/i18n-provider";
import { Button } from "@/components/ui/button";
import { CartIcon, CheckIcon } from "@/components/ui/icons";
import { QuantitySelector } from "@/components/ui/quantity-selector";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

export function AddToCart({ product }: { readonly product: Product }) {
  const { dictionary } = useI18n();
  const { addProduct } = useCart();

  const sizes = product.sizes ?? [];
  const [size, setSize] = useState<string | null>(sizes.length === 1 ? (sizes[0] ?? null) : null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [added, setAdded] = useState(false);

  const hasPrice = siteConfig.commerce.pricesEnabled && product.price !== undefined;

  function handleAdd() {
    if (sizes.length > 0 && !size) {
      setError(dictionary.product.sizeRequired);
      return;
    }

    setError(null);
    addProduct(product, { ...(size ? { size } : {}), quantity });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2500);
  }

  return (
    <div className="space-y-6">
      {sizes.length > 0 ? (
        <fieldset>
          <legend className="mb-3 flex items-baseline justify-between gap-4 font-display text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-text-muted">
            {dictionary.product.selectSize}
          </legend>

          <div className="flex flex-wrap gap-2">
            {sizes.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  setSize(option);
                  setError(null);
                }}
                aria-pressed={size === option}
                className={cn(
                  "min-w-12 border px-3 py-2 font-display text-sm font-semibold transition-colors",
                  size === option
                    ? "border-primary bg-primary text-primary-contrast"
                    : "border-border-strong text-text hover:border-primary hover:text-primary",
                )}
              >
                {option}
              </button>
            ))}
          </div>

          {product.preliminary ? (
            <p className="mt-3 text-xs text-text-subtle">{dictionary.product.sizeGuideNote}</p>
          ) : null}
        </fieldset>
      ) : null}

      <div className="flex flex-wrap items-center gap-3">
        <QuantitySelector
          value={quantity}
          onChange={setQuantity}
          max={siteConfig.commerce.maxQuantityPerItem}
          label={dictionary.common.quantity}
          decreaseLabel={dictionary.common.decrease}
          increaseLabel={dictionary.common.increase}
        />

        <Button
          variant={added ? "accent" : "primary"}
          size="lg"
          onClick={handleAdd}
          className="min-w-56 flex-1"
        >
          {added ? (
            <>
              <CheckIcon className="size-4" />
              {dictionary.product.added}
            </>
          ) : (
            <>
              <CartIcon className="size-4" />
              {hasPrice ? dictionary.product.addToCart : dictionary.product.addToRequest}
            </>
          )}
        </Button>
      </div>

      {error ? (
        <p role="alert" className="text-sm font-medium text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

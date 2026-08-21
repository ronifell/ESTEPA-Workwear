"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import { CartLineItem } from "@/components/cart/cart-line-item";
import { useCart } from "@/components/providers/cart-provider";
import { useI18n } from "@/components/providers/i18n-provider";
import { buttonStyles } from "@/components/ui/button";
import { CartIcon, CloseIcon } from "@/components/ui/icons";
import { LocalizedLink } from "@/components/ui/localized-link";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

export function MiniCart() {
  const { locale, dictionary } = useI18n();
  const { lines, itemCount, subtotal, isMiniCartOpen, closeMiniCart } = useCart();
  const pathname = usePathname();
  const closeRef = useRef<HTMLButtonElement>(null);

  // Navigating away dismisses the drawer. `closeMiniCart` is a stable
  // reference, so this only runs on an actual route change.
  useEffect(() => {
    closeMiniCart();
  }, [pathname, closeMiniCart]);

  useEffect(() => {
    if (!isMiniCartOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeMiniCart();
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isMiniCartOpen, closeMiniCart]);

  return (
    <div
      className={cn("fixed inset-0 z-80", isMiniCartOpen ? "pointer-events-auto" : "pointer-events-none")}
      aria-hidden={!isMiniCartOpen}
    >
      <div
        onClick={closeMiniCart}
        className={cn(
          "absolute inset-0 bg-navy-950/55 transition-opacity duration-300",
          isMiniCartOpen ? "opacity-100" : "opacity-0",
        )}
      />

      <aside
        role="dialog"
        aria-modal={isMiniCartOpen || undefined}
        aria-label={dictionary.cart.miniCartTitle}
        className={cn(
          "absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-surface shadow-2xl transition-transform duration-300 ease-[var(--ease-out-industrial)]",
          isMiniCartOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-border px-5">
          <h2 className="font-display text-sm font-semibold uppercase tracking-[0.12em] text-navy-900">
            {dictionary.cart.miniCartTitle}
            {itemCount > 0 ? (
              <span className="ml-2 font-normal text-text-muted">({itemCount})</span>
            ) : null}
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={closeMiniCart}
            aria-label={dictionary.common.close}
            className="-mr-2 flex size-10 items-center justify-center text-navy-900 transition-colors hover:text-accent"
          >
            <CloseIcon className="size-5" />
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
            <span className="flex size-16 items-center justify-center rounded-full bg-sand-100 text-text-subtle">
              <CartIcon className="size-7" />
            </span>
            <div>
              <p className="font-display text-base font-semibold text-navy-900">
                {dictionary.cart.empty.title}
              </p>
              <p className="mt-2 text-sm text-text-muted">{dictionary.cart.empty.description}</p>
            </div>
            <LocalizedLink
              route="products"
              locale={locale}
              onClick={closeMiniCart}
              className={buttonStyles("outline", "md")}
            >
              {dictionary.cart.empty.cta}
            </LocalizedLink>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5">
              <ul className="divide-y divide-border">
                {lines.map((line) => (
                  <CartLineItem key={line.id} line={line} compact />
                ))}
              </ul>
            </div>

            <footer className="shrink-0 space-y-4 border-t border-border bg-sand-50 px-5 py-5">
              <div className="flex items-baseline justify-between">
                <span className="font-display text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">
                  {dictionary.cart.subtotal}
                </span>
                <span className="font-display text-lg font-bold tabular-nums text-navy-900">
                  {subtotal === null ? dictionary.cart.totalPending : formatPrice(subtotal, locale)}
                </span>
              </div>

              {subtotal === null ? (
                <p className="text-xs leading-relaxed text-text-muted">
                  {dictionary.cart.priceNote}
                </p>
              ) : null}

              <div className="grid gap-2">
                <LocalizedLink
                  route="cart"
                  locale={locale}
                  onClick={closeMiniCart}
                  className={buttonStyles("primary", "md", "w-full")}
                >
                  {dictionary.cart.viewCart}
                </LocalizedLink>
                <button
                  type="button"
                  onClick={closeMiniCart}
                  className={buttonStyles("ghost", "sm", "w-full")}
                >
                  {dictionary.cart.continueShopping}
                </button>
              </div>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}

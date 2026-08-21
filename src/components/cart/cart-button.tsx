"use client";

import { useCart } from "@/components/providers/cart-provider";
import { useI18n } from "@/components/providers/i18n-provider";
import { CartIcon } from "@/components/ui/icons";

export function CartButton() {
  const { dictionary } = useI18n();
  const { itemCount, isHydrated, openMiniCart } = useCart();
  const showCount = isHydrated && itemCount > 0;

  return (
    <button
      type="button"
      onClick={openMiniCart}
      className="relative flex size-10 items-center justify-center rounded-xs text-navy-900 transition-colors hover:text-accent"
      aria-label={
        showCount
          ? `${dictionary.nav.cart} (${itemCount} ${dictionary.nav.cartItems})`
          : dictionary.nav.cart
      }
    >
      <CartIcon className="size-5.5" />
      {showCount ? (
        <span className="absolute right-0.5 top-1 flex min-w-4.5 items-center justify-center rounded-full bg-accent px-1 font-display text-[0.625rem] font-bold leading-4.5 text-white tabular-nums">
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      ) : null}
    </button>
  );
}

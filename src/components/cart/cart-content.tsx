"use client";

import { CartLineItem } from "@/components/cart/cart-line-item";
import { useCart } from "@/components/providers/cart-provider";
import { useI18n } from "@/components/providers/i18n-provider";
import { buttonStyles } from "@/components/ui/button";
import { ArrowRightIcon, CartIcon } from "@/components/ui/icons";
import { LocalizedLink } from "@/components/ui/localized-link";
import { Notice } from "@/components/ui/notice";
import { formatPrice } from "@/lib/format";

export function CartContent() {
  const { locale, dictionary } = useI18n();
  const { lines, itemCount, subtotal, isHydrated } = useCart();
  const copy = dictionary.cart;

  if (!isHydrated) {
    return (
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="space-y-4 lg:col-span-8">
          {[0, 1].map((index) => (
            <div key={index} className="h-32 animate-pulse border border-border bg-surface-muted" />
          ))}
        </div>
        <div className="lg:col-span-4">
          <div className="h-64 animate-pulse border border-border bg-surface-muted" />
        </div>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center border border-dashed border-border-strong bg-surface px-6 py-20 text-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-sand-100 text-text-subtle">
          <CartIcon className="size-7" />
        </span>
        <h2 className="mt-6 font-display text-xl font-semibold text-navy-900">
          {copy.empty.title}
        </h2>
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
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-8">
        <div className="border border-border bg-surface px-5 lg:px-6">
          <div className="flex items-center justify-between border-b border-border py-4">
            <h2 className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-navy-900">
              {copy.product}
            </h2>
            <span className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">
              {itemCount} {itemCount === 1 ? copy.item : copy.items}
            </span>
          </div>

          <ul className="divide-y divide-border">
            {lines.map((line) => (
              <CartLineItem key={line.id} line={line} />
            ))}
          </ul>
        </div>

        <LocalizedLink
          route="products"
          locale={locale}
          className="mt-6 inline-flex items-center gap-2 font-display text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-primary transition-colors hover:text-accent"
        >
          <ArrowRightIcon className="size-3.5 rotate-180" />
          {copy.continueShopping}
        </LocalizedLink>
      </div>

      <div className="lg:col-span-4">
        <div className="lg:sticky lg:top-28">
          <div className="border border-border bg-surface p-6">
            <h2 className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-navy-900">
              {copy.summary}
            </h2>

            <dl className="mt-5 space-y-3 border-b border-border pb-5 text-sm">
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-text-muted">{copy.subtotal}</dt>
                <dd className="font-display font-semibold tabular-nums text-navy-900">
                  {subtotal === null ? copy.totalPending : formatPrice(subtotal, locale)}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-text-muted">{copy.shipping}</dt>
                <dd className="text-text-muted">{copy.shippingNote}</dd>
              </div>
            </dl>

            <div className="mt-5 flex items-baseline justify-between gap-4">
              <span className="font-display text-sm font-semibold uppercase tracking-[0.1em] text-navy-900">
                {copy.total}
              </span>
              <span className="font-display text-xl font-bold tabular-nums text-navy-900">
                {subtotal === null ? copy.totalPending : formatPrice(subtotal, locale)}
              </span>
            </div>

            <LocalizedLink
              route="checkout"
              locale={locale}
              className={buttonStyles("primary", "lg", "mt-6 w-full")}
            >
              {subtotal === null ? copy.checkoutRequest : copy.checkout}
              <ArrowRightIcon className="size-4" />
            </LocalizedLink>
          </div>

          {subtotal === null ? (
            <Notice tone="pending" className="mt-4">
              {copy.priceNote}
            </Notice>
          ) : null}
        </div>
      </div>
    </div>
  );
}

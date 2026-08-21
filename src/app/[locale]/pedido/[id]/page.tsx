import type { Metadata } from "next";

import { PageHero } from "@/components/shared/page-hero";
import { buttonStyles } from "@/components/ui/button";
import { ArrowRightIcon, CheckIcon } from "@/components/ui/icons";
import { LocalizedLink } from "@/components/ui/localized-link";
import { Notice } from "@/components/ui/notice";
import { Section } from "@/components/ui/section";
import { getDictionary, resolveLocale } from "@/i18n";
import { formatDate, formatPrice } from "@/lib/format";
import { getOrderStore } from "@/lib/storage";

interface PageProps {
  params: Promise<{ locale: string; id: string }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const dictionary = getDictionary(locale);

  return {
    title: dictionary.order.title,
    description: dictionary.order.description,
    robots: { index: false, follow: false },
  };
}

export default async function OrderConfirmationPage({ params }: PageProps) {
  const { locale: rawLocale, id } = await params;
  const locale = resolveLocale(rawLocale);
  const dictionary = getDictionary(locale);
  const copy = dictionary.order;

  const store = await getOrderStore();
  const order = await store.findByReference(decodeURIComponent(id)).catch(() => null);

  if (!order) {
    return (
      <>
        <PageHero title={copy.notFoundTitle} description={copy.notFoundDescription} size="compact" />
        <Section tone="default">
          <div className="flex flex-wrap gap-3">
            <LocalizedLink route="home" locale={locale} className={buttonStyles("primary", "md")}>
              {copy.backHome}
            </LocalizedLink>
            <LocalizedLink route="contact" locale={locale} className={buttonStyles("outline", "md")}>
              {dictionary.common.contactUs}
            </LocalizedLink>
          </div>
        </Section>
      </>
    );
  }

  const nextSteps = [copy.nextSteps.one, copy.nextSteps.two, copy.nextSteps.three];
  const deliveryMethodLabel =
    order.delivery.method === "shipping"
      ? dictionary.checkout.methods.shipping
      : order.delivery.method === "pickup"
        ? dictionary.checkout.methods.pickup
        : dictionary.checkout.methods.toBeAgreed;

  return (
    <>
      <PageHero eyebrow={copy.thanks} title={copy.title} description={copy.description} size="compact" />

      <Section tone="default">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <div className="border border-border bg-surface p-6 lg:p-8">
              <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-border pb-5">
                <div>
                  <p className="font-display text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-text-subtle">
                    {copy.orderNumber}
                  </p>
                  <p className="mt-1.5 font-display text-2xl font-bold tracking-tight text-navy-900">
                    {order.reference}
                  </p>
                </div>
                <p className="text-sm text-text-muted">{formatDate(order.createdAt, locale)}</p>
              </div>

              <h2 className="mt-6 font-display text-xs font-semibold uppercase tracking-[0.14em] text-navy-900">
                {copy.summary}
              </h2>

              <ul className="mt-4 divide-y divide-border border-y border-border">
                {order.items.map((item) => (
                  <li
                    key={`${item.productId}-${item.size ?? ""}`}
                    className="flex items-start justify-between gap-4 py-3.5"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-text">{item.name}</p>
                      <p className="mt-0.5 text-xs text-text-muted">
                        {item.size ? `${dictionary.cart.size} ${item.size} · ` : ""}
                        {dictionary.common.quantity}: {item.quantity}
                      </p>
                    </div>
                    <span className="shrink-0 font-display text-sm font-semibold tabular-nums text-navy-900">
                      {item.unitPrice === undefined
                        ? dictionary.product.priceOnRequest
                        : formatPrice(item.unitPrice * item.quantity, locale, order.currency)}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex items-baseline justify-between gap-4">
                <span className="font-display text-sm font-semibold uppercase tracking-[0.1em] text-navy-900">
                  {dictionary.cart.total}
                </span>
                <span className="font-display text-lg font-bold tabular-nums text-navy-900">
                  {order.subtotal === undefined
                    ? dictionary.cart.totalPending
                    : formatPrice(order.subtotal, locale, order.currency)}
                </span>
              </div>

              <Notice tone="pending" className="mt-6">
                {dictionary.checkout.paymentPending}
              </Notice>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <LocalizedLink
                route="products"
                locale={locale}
                className={buttonStyles("primary", "md")}
              >
                {copy.keepBrowsing}
                <ArrowRightIcon className="size-4" />
              </LocalizedLink>
              <LocalizedLink route="home" locale={locale} className={buttonStyles("outline", "md")}>
                {copy.backHome}
              </LocalizedLink>
            </div>
          </div>

          <div className="space-y-5 lg:col-span-5">
            <div className="border border-border bg-surface p-6">
              <h2 className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-navy-900">
                {copy.nextStepsTitle}
              </h2>
              <ol className="mt-5 space-y-4">
                {nextSteps.map((entry, index) => (
                  <li key={entry} className="flex gap-3">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-border-strong font-display text-[0.625rem] font-bold text-text-muted">
                      {index + 1}
                    </span>
                    <p className="text-sm leading-relaxed text-text-muted">{entry}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="border border-border bg-surface p-6">
              <h2 className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-navy-900">
                {copy.contactDetails}
              </h2>
              <ul className="mt-4 space-y-1.5 text-sm text-text">
                <li className="flex items-start gap-2">
                  <CheckIcon className="mt-0.5 size-4 shrink-0 text-accent" />
                  {order.customer.firstName} {order.customer.lastName}
                </li>
                <li className="pl-6 break-all text-text-muted">{order.customer.email}</li>
                <li className="pl-6 text-text-muted">{order.customer.phone}</li>
                {order.customer.company ? (
                  <li className="pl-6 text-text-muted">{order.customer.company}</li>
                ) : null}
              </ul>
            </div>

            <div className="border border-border bg-surface p-6">
              <h2 className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-navy-900">
                {copy.deliveryDetails}
              </h2>
              <ul className="mt-4 space-y-1.5 text-sm text-text-muted">
                <li className="font-medium text-text">{deliveryMethodLabel}</li>
                {order.delivery.address ? <li>{order.delivery.address}</li> : null}
                {order.delivery.city || order.delivery.province ? (
                  <li>{[order.delivery.city, order.delivery.province].filter(Boolean).join(", ")}</li>
                ) : null}
                {order.delivery.postalCode ? <li>{order.delivery.postalCode}</li> : null}
                {order.delivery.notes ? (
                  <li className="pt-2 text-xs italic">{order.delivery.notes}</li>
                ) : null}
              </ul>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

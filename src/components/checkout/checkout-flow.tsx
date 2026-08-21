"use client";

import { useRouter } from "next/navigation";
import { useId, useState, type FormEvent } from "react";

import { useCart } from "@/components/providers/cart-provider";
import { useI18n } from "@/components/providers/i18n-provider";
import { Button, buttonStyles } from "@/components/ui/button";
import { Field, SelectField, TextArea, TextInput } from "@/components/ui/field";
import { ArrowRightIcon, CheckIcon, SpinnerIcon } from "@/components/ui/icons";
import { LocalizedLink } from "@/components/ui/localized-link";
import { Notice } from "@/components/ui/notice";
import { provinces } from "@/data/provinces";
import { getPath } from "@/i18n/routes";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import { customerSchema, deliverySchema } from "@/lib/validation/order";

type Step = "details" | "delivery" | "review";

const steps: readonly Step[] = ["details", "delivery", "review"];

const emptyCustomer = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  taxId: "",
};

const emptyDelivery = {
  method: "to-be-agreed" as const,
  province: "",
  city: "",
  address: "",
  postalCode: "",
  notes: "",
};

type CustomerState = typeof emptyCustomer;
type DeliveryState = {
  method: "shipping" | "pickup" | "to-be-agreed";
  province: string;
  city: string;
  address: string;
  postalCode: string;
  notes: string;
};

export function CheckoutFlow() {
  const { locale, dictionary } = useI18n();
  const router = useRouter();
  const { lines, subtotal, isHydrated, clear } = useCart();
  const copy = dictionary.checkout;
  const formId = useId();

  const [step, setStep] = useState<Step>("details");
  const [customer, setCustomer] = useState<CustomerState>(emptyCustomer);
  const [delivery, setDelivery] = useState<DeliveryState>(emptyDelivery);
  const [customerErrors, setCustomerErrors] = useState<Record<string, string>>({});
  const [deliveryErrors, setDeliveryErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");

  if (!isHydrated) {
    return <div className="h-96 animate-pulse border border-border bg-surface-muted" />;
  }

  if (lines.length === 0) {
    return (
      <div className="border border-dashed border-border-strong bg-surface px-6 py-16 text-center">
        <p className="font-display text-lg font-semibold text-navy-900">{copy.emptyCart}</p>
        <LocalizedLink
          route="products"
          locale={locale}
          className={buttonStyles("primary", "md", "mt-6")}
        >
          {copy.emptyCartCta}
        </LocalizedLink>
      </div>
    );
  }

  function validateCustomer(): boolean {
    const parsed = customerSchema.safeParse(customer);
    if (parsed.success) {
      setCustomerErrors({});
      return true;
    }

    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0]);
      if (key && !errors[key]) {
        errors[key] =
          issue.code === "invalid_format" && key === "email"
            ? dictionary.forms.errorEmail
            : dictionary.forms.errorRequired;
      }
    }
    setCustomerErrors(errors);
    return false;
  }

  function validateDelivery(): boolean {
    const parsed = deliverySchema.safeParse(delivery);
    if (parsed.success) {
      setDeliveryErrors({});
      return true;
    }

    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "address");
      if (!errors[key]) errors[key] = dictionary.forms.errorRequired;
    }
    if (delivery.method === "shipping") {
      if (!delivery.province) errors["province"] = dictionary.forms.errorRequired;
      if (!delivery.city) errors["city"] = dictionary.forms.errorRequired;
      if (!delivery.address) errors["address"] = dictionary.forms.errorRequired;
    }
    setDeliveryErrors(errors);
    return false;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validateCustomer() || !validateDelivery()) return;

    setSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          locale,
          customer,
          delivery,
          website: honeypot,
          items: lines.map((line) => ({
            productId: line.productId,
            ...(line.size ? { size: line.size } : {}),
            quantity: line.quantity,
          })),
        }),
      });

      const body = (await response.json().catch(() => null)) as
        | { ok?: boolean; reference?: string; error?: string }
        | null;

      if (!response.ok || !body?.reference) {
        setSubmitError(
          body?.error === "storage_unavailable"
            ? copy.unavailable
            : dictionary.forms.errorGeneric,
        );
        setSubmitting(false);
        return;
      }

      clear();
      router.push(getPath("orderConfirmation", locale, { id: body.reference }));
    } catch {
      setSubmitError(dictionary.forms.errorNetwork);
      setSubmitting(false);
    }
  }

  const currentIndex = steps.indexOf(step);

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-7">
        <ol className="mb-8 flex items-center gap-2">
          {steps.map((entry, index) => {
            const isDone = index < currentIndex;
            const isCurrent = entry === step;
            return (
              <li key={entry} className="flex flex-1 items-center gap-2">
                <span
                  className={cn(
                    "flex size-7 shrink-0 items-center justify-center rounded-full border font-display text-[0.625rem] font-bold",
                    isDone && "border-success bg-success text-white",
                    isCurrent && "border-primary bg-primary text-primary-contrast",
                    !isDone && !isCurrent && "border-border-strong text-text-subtle",
                  )}
                >
                  {isDone ? <CheckIcon className="size-3.5" /> : index + 1}
                </span>
                <span
                  className={cn(
                    "hidden font-display text-[0.6875rem] font-semibold uppercase tracking-[0.1em] sm:block",
                    isCurrent ? "text-navy-900" : "text-text-subtle",
                  )}
                >
                  {copy.steps[entry]}
                </span>
                {index < steps.length - 1 ? (
                  <span aria-hidden className="h-px flex-1 bg-border" />
                ) : null}
              </li>
            );
          })}
        </ol>

        <form onSubmit={handleSubmit} noValidate>
          {step === "details" ? (
            <section className="border border-border bg-surface p-6 lg:p-8">
              <h2 className="font-display text-lg font-semibold text-navy-900">
                {copy.detailsTitle}
              </h2>
              <p className="mt-2 text-sm text-text-muted">{copy.detailsDescription}</p>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <Field
                  id={`${formId}-firstName`}
                  label={copy.fields.firstName}
                  required
                  error={customerErrors["firstName"]}
                >
                  <TextInput
                    id={`${formId}-firstName`}
                    autoComplete="given-name"
                    value={customer.firstName}
                    invalid={Boolean(customerErrors["firstName"])}
                    onChange={(event) =>
                      setCustomer({ ...customer, firstName: event.target.value })
                    }
                  />
                </Field>

                <Field
                  id={`${formId}-lastName`}
                  label={copy.fields.lastName}
                  required
                  error={customerErrors["lastName"]}
                >
                  <TextInput
                    id={`${formId}-lastName`}
                    autoComplete="family-name"
                    value={customer.lastName}
                    invalid={Boolean(customerErrors["lastName"])}
                    onChange={(event) =>
                      setCustomer({ ...customer, lastName: event.target.value })
                    }
                  />
                </Field>

                <Field
                  id={`${formId}-email`}
                  label={copy.fields.email}
                  required
                  error={customerErrors["email"]}
                >
                  <TextInput
                    id={`${formId}-email`}
                    type="email"
                    autoComplete="email"
                    value={customer.email}
                    invalid={Boolean(customerErrors["email"])}
                    onChange={(event) => setCustomer({ ...customer, email: event.target.value })}
                  />
                </Field>

                <Field
                  id={`${formId}-phone`}
                  label={copy.fields.phone}
                  required
                  error={customerErrors["phone"]}
                >
                  <TextInput
                    id={`${formId}-phone`}
                    type="tel"
                    autoComplete="tel"
                    value={customer.phone}
                    invalid={Boolean(customerErrors["phone"])}
                    onChange={(event) => setCustomer({ ...customer, phone: event.target.value })}
                  />
                </Field>

                <Field
                  id={`${formId}-company`}
                  label={copy.fields.company}
                  optionalLabel={dictionary.common.optional}
                >
                  <TextInput
                    id={`${formId}-company`}
                    autoComplete="organization"
                    value={customer.company}
                    onChange={(event) => setCustomer({ ...customer, company: event.target.value })}
                  />
                </Field>

                <Field
                  id={`${formId}-taxId`}
                  label={copy.fields.taxId}
                  optionalLabel={dictionary.common.optional}
                >
                  <TextInput
                    id={`${formId}-taxId`}
                    value={customer.taxId}
                    onChange={(event) => setCustomer({ ...customer, taxId: event.target.value })}
                  />
                </Field>
              </div>

              <div className="mt-8 flex justify-end">
                <Button
                  size="lg"
                  onClick={() => {
                    if (validateCustomer()) setStep("delivery");
                  }}
                >
                  {copy.continue}
                  <ArrowRightIcon className="size-4" />
                </Button>
              </div>
            </section>
          ) : null}

          {step === "delivery" ? (
            <section className="border border-border bg-surface p-6 lg:p-8">
              <h2 className="font-display text-lg font-semibold text-navy-900">
                {copy.deliveryTitle}
              </h2>
              <p className="mt-2 text-sm text-text-muted">{copy.deliveryDescription}</p>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <Field
                  id={`${formId}-method`}
                  label={copy.fields.method}
                  required
                  className="sm:col-span-2"
                >
                  <SelectField
                    id={`${formId}-method`}
                    value={delivery.method}
                    onChange={(event) =>
                      setDelivery({
                        ...delivery,
                        method: event.target.value as DeliveryState["method"],
                      })
                    }
                  >
                    <option value="to-be-agreed">{copy.methods.toBeAgreed}</option>
                    <option value="shipping">{copy.methods.shipping}</option>
                    <option value="pickup">{copy.methods.pickup}</option>
                  </SelectField>
                </Field>

                {delivery.method === "shipping" ? (
                  <>
                    <Field
                      id={`${formId}-province`}
                      label={copy.fields.province}
                      required
                      error={deliveryErrors["province"]}
                    >
                      <SelectField
                        id={`${formId}-province`}
                        value={delivery.province}
                        invalid={Boolean(deliveryErrors["province"])}
                        onChange={(event) =>
                          setDelivery({ ...delivery, province: event.target.value })
                        }
                      >
                        <option value="">{dictionary.forms.selectOption}</option>
                        {provinces.map((province) => (
                          <option key={province} value={province}>
                            {province}
                          </option>
                        ))}
                      </SelectField>
                    </Field>

                    <Field
                      id={`${formId}-city`}
                      label={copy.fields.city}
                      required
                      error={deliveryErrors["city"]}
                    >
                      <TextInput
                        id={`${formId}-city`}
                        autoComplete="address-level2"
                        value={delivery.city}
                        invalid={Boolean(deliveryErrors["city"])}
                        onChange={(event) => setDelivery({ ...delivery, city: event.target.value })}
                      />
                    </Field>

                    <Field
                      id={`${formId}-address`}
                      label={copy.fields.address}
                      required
                      error={deliveryErrors["address"]}
                    >
                      <TextInput
                        id={`${formId}-address`}
                        autoComplete="street-address"
                        value={delivery.address}
                        invalid={Boolean(deliveryErrors["address"])}
                        onChange={(event) =>
                          setDelivery({ ...delivery, address: event.target.value })
                        }
                      />
                    </Field>

                    <Field
                      id={`${formId}-postalCode`}
                      label={copy.fields.postalCode}
                      optionalLabel={dictionary.common.optional}
                    >
                      <TextInput
                        id={`${formId}-postalCode`}
                        autoComplete="postal-code"
                        value={delivery.postalCode}
                        onChange={(event) =>
                          setDelivery({ ...delivery, postalCode: event.target.value })
                        }
                      />
                    </Field>
                  </>
                ) : null}

                <Field
                  id={`${formId}-notes`}
                  label={copy.fields.notes}
                  optionalLabel={dictionary.common.optional}
                  className="sm:col-span-2"
                >
                  <TextArea
                    id={`${formId}-notes`}
                    rows={4}
                    value={delivery.notes}
                    onChange={(event) => setDelivery({ ...delivery, notes: event.target.value })}
                  />
                </Field>
              </div>

              <div className="mt-8 flex justify-between gap-3">
                <Button variant="ghost" size="lg" onClick={() => setStep("details")}>
                  {copy.back}
                </Button>
                <Button
                  size="lg"
                  onClick={() => {
                    if (validateDelivery()) setStep("review");
                  }}
                >
                  {copy.continue}
                  <ArrowRightIcon className="size-4" />
                </Button>
              </div>
            </section>
          ) : null}

          {step === "review" ? (
            <section className="border border-border bg-surface p-6 lg:p-8">
              <h2 className="font-display text-lg font-semibold text-navy-900">
                {copy.reviewTitle}
              </h2>
              <p className="mt-2 text-sm text-text-muted">{copy.reviewDescription}</p>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <ReviewBlock
                  title={copy.detailsTitle}
                  action={copy.editDetails}
                  onEdit={() => setStep("details")}
                  rows={[
                    `${customer.firstName} ${customer.lastName}`,
                    customer.email,
                    customer.phone,
                    customer.company,
                    customer.taxId,
                  ]}
                />
                <ReviewBlock
                  title={copy.deliveryTitle}
                  action={copy.editDelivery}
                  onEdit={() => setStep("delivery")}
                  rows={[
                    copy.methods[
                      delivery.method === "to-be-agreed"
                        ? "toBeAgreed"
                        : delivery.method === "shipping"
                          ? "shipping"
                          : "pickup"
                    ],
                    delivery.address,
                    [delivery.city, delivery.province].filter(Boolean).join(", "),
                    delivery.postalCode,
                    delivery.notes,
                  ]}
                />
              </div>

              <div className="mt-6">
                <h3 className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-navy-900">
                  {copy.paymentTitle}
                </h3>
                <Notice tone="pending" className="mt-3">
                  {copy.paymentPending}
                </Notice>
              </div>

              {submitError ? (
                <Notice tone="error" role="alert" className="mt-6" title={copy.errorTitle}>
                  {submitError}
                </Notice>
              ) : null}

              {/* Honeypot */}
              <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
                <label htmlFor={`${formId}-website`}>Website</label>
                <input
                  id={`${formId}-website`}
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(event) => setHoneypot(event.target.value)}
                />
              </div>

              <div className="mt-8 flex flex-wrap justify-between gap-3">
                <Button variant="ghost" size="lg" onClick={() => setStep("delivery")}>
                  {copy.back}
                </Button>
                <Button type="submit" size="lg" disabled={submitting}>
                  {submitting ? (
                    <>
                      <SpinnerIcon className="size-4 animate-spin" />
                      {copy.submitting}
                    </>
                  ) : (
                    <>
                      {copy.submit}
                      <ArrowRightIcon className="size-4" />
                    </>
                  )}
                </Button>
              </div>
            </section>
          ) : null}
        </form>
      </div>

      <aside className="lg:col-span-5">
        <div className="lg:sticky lg:top-28">
          <div className="border border-border bg-surface p-6">
            <h2 className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-navy-900">
              {copy.orderSummary}
            </h2>

            <ul className="mt-5 divide-y divide-border border-y border-border">
              {lines.map((line) => (
                <li key={line.id} className="flex items-start justify-between gap-4 py-3.5">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-text">{line.snapshot.name[locale]}</p>
                    <p className="mt-0.5 text-xs text-text-muted">
                      {line.size ? `${dictionary.cart.size} ${line.size} · ` : ""}
                      {dictionary.common.quantity}: {line.quantity}
                    </p>
                  </div>
                  <span className="shrink-0 font-display text-sm font-semibold tabular-nums text-navy-900">
                    {line.snapshot.price === undefined
                      ? "—"
                      : formatPrice(line.snapshot.price * line.quantity, locale)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex items-baseline justify-between gap-4">
              <span className="font-display text-sm font-semibold uppercase tracking-[0.1em] text-navy-900">
                {dictionary.cart.total}
              </span>
              <span className="font-display text-lg font-bold tabular-nums text-navy-900">
                {subtotal === null ? dictionary.cart.totalPending : formatPrice(subtotal, locale)}
              </span>
            </div>

            {subtotal === null ? (
              <p className="mt-3 text-xs leading-relaxed text-text-muted">
                {dictionary.cart.priceNote}
              </p>
            ) : null}
          </div>
        </div>
      </aside>
    </div>
  );
}

function ReviewBlock({
  title,
  action,
  onEdit,
  rows,
}: {
  readonly title: string;
  readonly action: string;
  readonly onEdit: () => void;
  readonly rows: readonly (string | undefined)[];
}) {
  const visible = rows.filter((row): row is string => Boolean(row && row.trim().length > 0));

  return (
    <div className="border border-border bg-surface-muted p-5">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-navy-900">
          {title}
        </h3>
        <button
          type="button"
          onClick={onEdit}
          className="whitespace-nowrap font-display text-[0.625rem] font-semibold uppercase tracking-[0.1em] text-primary transition-colors hover:text-accent"
        >
          {action}
        </button>
      </div>

      <ul className="mt-3 space-y-1">
        {visible.map((row) => (
          <li key={row} className="text-sm text-text">
            {row}
          </li>
        ))}
      </ul>
    </div>
  );
}

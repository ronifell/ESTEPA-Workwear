import { CertificationRow } from "@/components/products/certification-badge";
import { format, getDictionary } from "@/i18n";
import { cn } from "@/lib/utils";
import type { Locale, Product } from "@/types";

export function ColorSwatches({
  product,
  locale,
  size = "md",
}: {
  readonly product: Product;
  readonly locale: Locale;
  readonly size?: "sm" | "md";
}) {
  const colors = product.colors ?? [];
  if (colors.length === 0) return null;

  return (
    <ul className="flex flex-wrap items-center gap-2">
      {colors.map((color) => (
        <li key={color.id} className="flex items-center gap-1.5">
          <span
            title={color.name[locale]}
            className={cn(
              "inline-block rounded-full border border-black/15 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.25)]",
              size === "sm" ? "size-3.5" : "size-[1.125rem]",
            )}
            style={{ backgroundColor: color.hex }}
          />
          {size === "md" ? (
            <span className="font-display text-[0.625rem] font-medium uppercase tracking-[0.08em] text-text-muted">
              {color.name[locale]}
            </span>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

/** Compact catalog strip used on cards. */
export function TechnicalSheetCompact({
  product,
  locale,
}: {
  readonly product: Product;
  readonly locale: Locale;
}) {
  const info = product.technicalInfo;
  if (!info && !product.fabricFamily && (product.certifications?.length ?? 0) === 0) {
    return null;
  }

  return (
    <div className="mt-4 space-y-2.5">
      <div className="flex flex-wrap items-center gap-2">
        {info?.code ? (
          <span className="bg-sky-100 px-2 py-0.5 font-display text-[0.625rem] font-bold tracking-[0.08em] text-navy-900">
            {info.code}
          </span>
        ) : null}
        {product.fabricFamily ? (
          <span className="font-display text-[0.5625rem] font-semibold uppercase tracking-[0.14em] text-accent">
            {product.fabricFamily}
          </span>
        ) : null}
      </div>

      {info ? (
        <p className="text-[0.8125rem] leading-snug text-navy-900">
          {info.fabric ? <span className="font-semibold">{info.fabric}</span> : null}
          {info.composition[locale] ? (
            <>
              {info.fabric ? <span className="text-text-subtle"> · </span> : null}
              {info.composition[locale]}
            </>
          ) : null}
          {info.weight ? (
            <>
              <span className="text-text-subtle"> · </span>
              {info.weight}
            </>
          ) : null}
        </p>
      ) : null}

      <CertificationRow certifications={product.certifications ?? []} compact />
      <ColorSwatches product={product} locale={locale} size="sm" />
    </div>
  );
}

/** Full catalog block used on the product page. */
export function TechnicalSheet({
  product,
  locale,
}: {
  readonly product: Product;
  readonly locale: Locale;
}) {
  const dictionary = getDictionary(locale);
  const info = product.technicalInfo;
  const certifications = product.certifications ?? [];
  const hasLayers = Boolean(info?.layers && info.layers.length > 0);

  if (!info && !product.fabricFamily && certifications.length === 0 && !product.colors?.length) {
    return null;
  }

  return (
    <div className="mt-8 border border-border bg-surface-muted p-5 sm:p-6">
      <p className="font-display text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-text-subtle">
        {dictionary.product.technicalSheet}
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        {info?.code ? (
          <span className="bg-sky-100 px-3 py-1 font-display text-sm font-bold tracking-[0.08em] text-navy-900">
            {info.code}
          </span>
        ) : null}
        {product.fabricFamily ? (
          <span className="border border-accent/40 bg-accent/10 px-2.5 py-1 font-display text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-accent">
            {format(dictionary.product.frartexBadge, { name: product.fabricFamily })}
          </span>
        ) : null}
      </div>

      {info ? (
        <div className="mt-4 space-y-1.5">
          {info.fabric ? (
            <p className="font-display text-base font-semibold text-navy-900">{info.fabric}</p>
          ) : null}
          {hasLayers ? (
            <dl className="space-y-1 text-sm text-text">
              {info.layers?.map((layer) => (
                <div key={layer.label[locale]}>
                  <dt className="inline font-medium text-text-muted">{layer.label[locale]}: </dt>
                  <dd className="inline">{layer.value[locale]}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className="text-sm leading-relaxed text-text">
              {info.composition[locale]}
              {info.weight ? (
                <>
                  {info.composition[locale] ? ", " : null}
                  {info.weight}
                </>
              ) : null}
            </p>
          )}
        </div>
      ) : null}

      {certifications.length > 0 ? (
        <div className="mt-5">
          <p className="mb-3 font-display text-[0.5625rem] font-semibold uppercase tracking-[0.14em] text-text-subtle">
            {dictionary.product.standards}
          </p>
          <CertificationRow certifications={certifications} />
        </div>
      ) : null}

      {product.colors && product.colors.length > 0 ? (
        <div className="mt-5">
          <p className="mb-2.5 font-display text-[0.5625rem] font-semibold uppercase tracking-[0.14em] text-text-subtle">
            {dictionary.product.colors}
          </p>
          <ColorSwatches product={product} locale={locale} />
        </div>
      ) : null}
    </div>
  );
}

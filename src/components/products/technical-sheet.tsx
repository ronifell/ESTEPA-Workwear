import { CertificationRow } from "@/components/products/certification-badge";
import { InfoTooltip } from "@/components/ui/info-tooltip";
import { fabrics } from "@/data/fabrics";
import { format, getDictionary } from "@/i18n";
import { cn } from "@/lib/utils";
import type { Locale, Product } from "@/types";

function SheetLabel({ children }: { readonly children: string }) {
  return (
    <h3 className="mb-2.5 border-t border-border pt-3 font-display text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-navy-900">
      {children}
    </h3>
  );
}

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

function FabricMark({
  name,
  locale,
  compact = false,
}: {
  readonly name: string;
  readonly locale: Locale;
  readonly compact?: boolean;
}) {
  const dictionary = getDictionary(locale);
  const tooltip = name === fabrics.frartex.name ? fabrics.frartex.tooltip[locale] : null;
  const label = format(dictionary.product.frartexBadge, { name });
  const mark = (
    <span
      className={cn(
        "inline-flex border border-accent/50 bg-accent/10 font-display font-bold uppercase tracking-[0.12em] text-accent",
        compact ? "px-2 py-0.5 text-[0.625rem]" : "px-2.5 py-1 text-xs",
      )}
    >
      {name}
    </span>
  );

  if (!tooltip) return mark;

  return (
    <InfoTooltip label={`${label}. ${tooltip}`} title={fabrics.frartex.code} content={tooltip}>
      {mark}
    </InfoTooltip>
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
  const dictionary = getDictionary(locale);
  const info = product.technicalInfo;
  const certifications = product.certifications ?? [];
  if (!info && !product.fabricFamily && certifications.length === 0) {
    return null;
  }

  return (
    <div className="relative z-10 mt-4 space-y-3">
      <div>
        <SheetLabel>{dictionary.trust.composition}</SheetLabel>
        <div className="flex flex-wrap items-center gap-2">
          {info?.code ? (
            <span className="bg-sky-100 px-2 py-0.5 font-display text-[0.625rem] font-bold tracking-[0.08em] text-navy-900">
              {info.code}
            </span>
          ) : null}
          {product.fabricFamily ? (
            <FabricMark name={product.fabricFamily} locale={locale} compact />
          ) : null}
        </div>

        {info ? (
          <p className="mt-2 text-[0.8125rem] leading-snug text-navy-900">
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
      </div>

      {certifications.length > 0 ? (
        <div className="border border-navy-900/20 bg-navy-50/80 p-3">
          <p className="mb-2.5 font-display text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-navy-900">
            {dictionary.product.standards}
          </p>
          <CertificationRow certifications={certifications} locale={locale} compact />
        </div>
      ) : null}

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
      <h2 className="font-display text-sm font-bold uppercase tracking-[0.16em] text-navy-900">
        {dictionary.product.technicalSheet}
      </h2>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {info?.code ? (
          <span className="bg-sky-100 px-3 py-1 font-display text-sm font-bold tracking-[0.08em] text-navy-900">
            {info.code}
          </span>
        ) : null}
        {product.fabricFamily ? <FabricMark name={product.fabricFamily} locale={locale} /> : null}
      </div>

      {info ? (
        <div className="mt-5 border-t border-border pt-4">
          <h3 className="mb-2 font-display text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-navy-900">
            {dictionary.trust.composition}
          </h3>
          {info.fabric ? (
            <p className="font-display text-base font-semibold text-navy-900">{info.fabric}</p>
          ) : null}
          {hasLayers ? (
            <dl className="mt-1.5 space-y-1 text-sm text-text">
              {info.layers?.map((layer) => (
                <div key={layer.label[locale]}>
                  <dt className="inline font-medium text-text-muted">{layer.label[locale]}: </dt>
                  <dd className="inline">{layer.value[locale]}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className="mt-1.5 text-sm leading-relaxed text-text">
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
        <div className="mt-5 border border-navy-900/20 bg-navy-50 p-4">
          <h3 className="mb-3 font-display text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-navy-900">
            {dictionary.product.standards}
          </h3>
          <CertificationRow certifications={certifications} locale={locale} />
        </div>
      ) : null}

      {product.colors && product.colors.length > 0 ? (
        <div className="mt-5 border-t border-border pt-4">
          <h3 className="mb-2.5 font-display text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-navy-900">
            {dictionary.product.colors}
          </h3>
          <ColorSwatches product={product} locale={locale} />
        </div>
      ) : null}
    </div>
  );
}

import { CertificationRow } from "@/components/products/certification-badge";
import { getDictionary } from "@/i18n";
import { sectorsById } from "@/data/sectors";
import { cn } from "@/lib/utils";
import type { Locale, Product } from "@/types";

const MAX_MARKS = 4;
const MAX_MARKS_COMPACT = 3;

export function ProductImageOverlay({
  product,
  locale,
  compact = false,
}: {
  readonly product: Product;
  readonly locale: Locale;
  readonly compact?: boolean;
}) {
  const dictionary = getDictionary(locale);
  const certifications = (product.certifications ?? []).slice(
    0,
    compact ? MAX_MARKS_COMPACT : MAX_MARKS,
  );
  const solutions = product.sectors.map((id) => sectorsById[id]);

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-navy-950 via-navy-950/75 to-transparent",
        compact ? "px-3 pb-3 pt-16" : "px-4 pb-4 pt-24 sm:px-5 sm:pb-5",
      )}
    >
      <p
        className={cn(
          "font-display font-bold leading-snug text-white",
          compact ? "text-sm" : "text-base sm:text-lg",
        )}
      >
        {product.name[locale]}
      </p>

      {solutions.length > 0 ? (
        <ul className={cn("mt-2 flex flex-wrap gap-1.5", compact && "mt-1.5")}>
          {solutions.map((sector) => (
            <li
              key={sector.id}
              className="rounded-full border border-white/25 bg-white/10 px-2.5 py-1 font-display text-[0.5625rem] font-semibold uppercase tracking-[0.1em] text-white/95"
            >
              {sector.name[locale]}
            </li>
          ))}
        </ul>
      ) : null}

      {certifications.length > 0 ? (
        <div
          className={cn(
            "mt-3 rounded-2xl bg-white/95 px-2.5 py-2",
            compact && "mt-2 px-2 py-1.5",
          )}
        >
          <p className="mb-1.5 font-display text-[0.5rem] font-semibold uppercase tracking-[0.14em] text-text-subtle">
            {dictionary.product.overlayCerts}
          </p>
          <CertificationRow certifications={certifications} locale={locale} compact />
        </div>
      ) : null}
    </div>
  );
}

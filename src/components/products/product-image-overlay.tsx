import { sectorsById } from "@/data/sectors";
import { cn } from "@/lib/utils";
import type { Locale, Product } from "@/types";

export function ProductImageOverlay({
  product,
  locale,
  compact = false,
}: {
  readonly product: Product;
  readonly locale: Locale;
  readonly compact?: boolean;
}) {
  const solutions = product.sectors.map((id) => sectorsById[id]);

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-navy-950 via-navy-950/70 to-transparent",
        compact ? "px-3 pb-3 pt-12" : "px-4 pb-4 pt-16 sm:px-5 sm:pb-5",
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
    </div>
  );
}

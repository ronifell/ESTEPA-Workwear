import { ShieldCheckIcon } from "@/components/ui/icons";
import { getDictionary } from "@/i18n";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types";

export function WarrantyBadge({
  locale,
  variant = "card",
  className,
}: {
  readonly locale: Locale;
  readonly variant?: "card" | "footer" | "compact";
  readonly className?: string;
}) {
  const copy = getDictionary(locale).trust;

  if (variant === "compact") {
    return (
      <p
        className={cn(
          "inline-flex items-center gap-2 font-display text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-navy-900",
          className,
        )}
      >
        <ShieldCheckIcon className="size-4 shrink-0 text-accent" />
        {copy.warrantyBadge}
      </p>
    );
  }

  if (variant === "footer") {
    return (
      <div className={cn("flex items-start gap-3", className)}>
        <ShieldCheckIcon className="mt-0.5 size-6 shrink-0 text-bronze-300" strokeWidth={1.3} />
        <div>
          <p className="font-display text-sm font-bold text-text-inverse">{copy.warrantyTitle}</p>
          <p className="mt-1.5 text-xs leading-relaxed text-text-inverse-muted">{copy.warrantyBody}</p>
        </div>
      </div>
    );
  }

  return (
    <aside className={cn("flex items-start gap-3 rounded-2xl border border-border bg-surface-muted p-4", className)}>
      <ShieldCheckIcon className="mt-0.5 size-6 shrink-0 text-accent" strokeWidth={1.3} />
      <div>
        <p className="font-display text-sm font-bold text-navy-900">{copy.warrantyTitle}</p>
        <p className="mt-1.5 text-sm leading-relaxed text-text-muted">{copy.warrantyBody}</p>
      </div>
    </aside>
  );
}

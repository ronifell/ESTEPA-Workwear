import { CertificationRow } from "@/components/products/certification-badge";
import { getStandards, heroStandardIds, type StandardId } from "@/data/standards";
import { getDictionary } from "@/i18n";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types";

export function CertStrip({
  locale,
  ids = heroStandardIds,
  compact = false,
  tone = "light",
  className,
}: {
  readonly locale: Locale;
  readonly ids?: readonly StandardId[];
  readonly compact?: boolean;
  readonly tone?: "light" | "inverse";
  readonly className?: string;
}) {
  const dictionary = getDictionary(locale);
  const certifications = getStandards(ids);

  return (
    <div
      className={cn(
        "overflow-hidden border",
        tone === "inverse" ? "border-white/25 bg-white/5" : "border-navy-900 bg-white",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center gap-2.5 border-b px-4 py-2",
          tone === "inverse" ? "border-white/20" : "border-navy-900 bg-navy-900",
        )}
      >
        <span aria-hidden className="hazard-stripes h-2 w-8 shrink-0 opacity-90" />
        <p
          className={cn(
            "font-display text-[0.625rem] font-bold uppercase tracking-[0.16em]",
            tone === "inverse" ? "text-bronze-300" : "text-white",
          )}
        >
          {dictionary.trust.stripLabel}
        </p>
      </div>

      <div className="overflow-x-auto px-4 py-5 sm:px-5">
        <CertificationRow
          certifications={certifications}
          locale={locale}
          compact={compact}
          className={cn(certifications.length <= 5 && "justify-between sm:flex-nowrap")}
        />
      </div>
    </div>
  );
}

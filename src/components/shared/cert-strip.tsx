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
        "border px-4 py-4 sm:px-5",
        tone === "inverse"
          ? "border-white/20 bg-white/5"
          : "border-navy-900/25 bg-navy-50",
        className,
      )}
    >
      <p
        className={cn(
          "mb-3 font-display text-[0.625rem] font-bold uppercase tracking-[0.16em]",
          tone === "inverse" ? "text-bronze-300" : "text-navy-800",
        )}
      >
        {dictionary.trust.stripLabel}
      </p>
      <CertificationRow certifications={certifications} locale={locale} compact={compact} />
    </div>
  );
}

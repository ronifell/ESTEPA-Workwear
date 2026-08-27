import { ArrowRightIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

/** Hover/focus cue on a product or sector photo. */
export function ExploreHint({
  label,
  className,
}: {
  readonly label: string;
  readonly className?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 z-20 flex items-center justify-center bg-navy-950/50 opacity-0 transition-opacity duration-300 ease-[var(--ease-out-industrial)] group-hover/photo:opacity-100 group-focus-within/photo:opacity-100",
        className,
      )}
    >
      <span className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-display text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-navy-900 shadow-card">
        {label}
        <ArrowRightIcon className="size-3.5" />
      </span>
    </div>
  );
}

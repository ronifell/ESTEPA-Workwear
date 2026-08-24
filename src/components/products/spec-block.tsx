import type { ReactNode } from "react";

import { CheckIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

export interface SpecBlockProps {
  readonly title: string;
  readonly items?: readonly string[];
  readonly children?: ReactNode;
  /** Text shown when the client has not supplied this information yet. */
  readonly pendingLabel: string;
  readonly className?: string;
  /** Inverse band used for a primary callout such as recommended use. */
  readonly tone?: "default" | "band";
}

/**
 * Renders a specification list, or an explicit "pending" state. The catalogue
 * must never fabricate technical content to fill a section.
 */
export function SpecBlock({
  title,
  items,
  children,
  pendingLabel,
  className,
  tone = "default",
}: SpecBlockProps) {
  const hasContent = Boolean(children) || (items && items.length > 0);
  const band = tone === "band";

  return (
    <section className={cn("border-t border-border py-7 first:border-t-0 first:pt-0", className)}>
      <h3
        className={cn(
          "font-display font-bold uppercase tracking-[0.14em]",
          band
            ? "inline-block bg-navy-900 px-3 py-1.5 text-sm text-text-inverse"
            : "text-sm text-navy-900 sm:text-base",
        )}
      >
        {title}
      </h3>

      {hasContent ? (
        <div className="mt-4">
          {children}
          {items && items.length > 0 ? (
            <ul className="space-y-2.5">
              {items.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-text">
                  <CheckIcon className="mt-0.5 size-4 shrink-0 text-accent" />
                  {item}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : (
        <p className="mt-3 flex items-center gap-2 text-sm text-text-subtle">
          <span aria-hidden className="hazard-stripes h-px w-6 opacity-60" />
          {pendingLabel}
        </p>
      )}
    </section>
  );
}

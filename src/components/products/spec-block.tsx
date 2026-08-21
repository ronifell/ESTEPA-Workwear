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
}: SpecBlockProps) {
  const hasContent = Boolean(children) || (items && items.length > 0);

  return (
    <section className={cn("border-t border-border py-7 first:border-t-0 first:pt-0", className)}>
      <h3 className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-navy-900">
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

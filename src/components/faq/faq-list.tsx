import { getDictionary } from "@/i18n";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types";

export function FaqList({
  locale,
  items,
  className,
}: {
  readonly locale: Locale;
  readonly items?: readonly { readonly q: string; readonly a: string }[];
  readonly className?: string;
}) {
  const list = items ?? getDictionary(locale).faqPage.items;

  return (
    <ul className={cn("space-y-3", className)}>
      {list.map((item) => (
        <li key={item.q}>
          <details className="group rounded-3xl border border-border bg-surface open:border-navy-900">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-display text-base font-semibold text-navy-900 marker:content-none [&::-webkit-details-marker]:hidden">
              {item.q}
              <span
                aria-hidden
                className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border text-lg leading-none text-navy-900 transition-transform duration-300 group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="border-t border-border px-5 py-4 text-sm leading-relaxed text-text-muted">
              {item.a}
            </p>
          </details>
        </li>
      ))}
    </ul>
  );
}

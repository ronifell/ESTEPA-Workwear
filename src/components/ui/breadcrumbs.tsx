import Link from "next/link";

import { ChevronRightIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

export interface Crumb {
  readonly label: string;
  readonly href?: string;
}

export interface BreadcrumbsProps {
  readonly items: readonly Crumb[];
  readonly className?: string;
  readonly inverse?: boolean;
}

export function Breadcrumbs({ items, className, inverse = false }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol
        className={cn(
          "flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs",
          inverse ? "text-text-inverse-muted" : "text-text-muted",
        )}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className={cn(
                    "transition-colors",
                    inverse ? "hover:text-text-inverse" : "hover:text-primary",
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={cn(inverse ? "text-text-inverse" : "text-text")}
                >
                  {item.label}
                </span>
              )}
              {!isLast ? <ChevronRightIcon className="size-3 opacity-50" /> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

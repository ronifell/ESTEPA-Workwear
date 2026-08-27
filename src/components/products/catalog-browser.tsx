"use client";

import { useEffect, useId, useState, type ReactNode } from "react";

import { ProductFilters } from "@/components/products/product-filters";
import { useI18n } from "@/components/providers/i18n-provider";
import { buttonStyles } from "@/components/ui/button";
import { CloseIcon, FilterIcon } from "@/components/ui/icons";
import { hasActiveFilters, type ActiveFilters } from "@/lib/product-filters";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types";

export function CatalogBrowser({
  locale,
  filters,
  resultsLabel,
  children,
}: {
  readonly locale: Locale;
  readonly filters: ActiveFilters;
  readonly resultsLabel: string;
  readonly children: ReactNode;
}) {
  const { dictionary } = useI18n();
  const copy = dictionary.products.filters;
  const titleId = useId();
  const filtered = hasActiveFilters(filters);
  const [open, setOpen] = useState(filtered);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    if (window.matchMedia("(max-width: 1023px)").matches) {
      document.body.style.overflow = "hidden";
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls={titleId}
          className={buttonStyles(open ? "primary" : "outline", "md")}
        >
          {open ? <CloseIcon className="size-4" /> : <FilterIcon className="size-4" />}
          {open ? copy.hideFilters : copy.openFilters}
        </button>
        <p
          aria-live="polite"
          className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-text-muted"
        >
          {resultsLabel}
        </p>
      </div>

      <div
        className={cn(
          "lg:grid lg:items-start lg:gap-8",
          open && "lg:grid-cols-[minmax(18rem,22rem)_minmax(0,1fr)]",
        )}
      >
        <div
          className={cn(
            "fixed inset-0 z-70 lg:static lg:z-auto",
            open ? "pointer-events-auto" : "pointer-events-none lg:hidden",
          )}
        >
          <div
            onClick={() => setOpen(false)}
            className={cn(
              "absolute inset-0 bg-navy-950/50 transition-opacity duration-300 lg:hidden",
              open ? "opacity-100" : "opacity-0",
            )}
          />
          <aside
            id={titleId}
            className={cn(
              "absolute inset-y-0 left-0 flex w-[min(100%,22rem)] flex-col overflow-y-auto rounded-r-3xl bg-sand-100 shadow-2xl transition-transform duration-300 ease-[var(--ease-out-industrial)] lg:static lg:w-auto lg:rounded-3xl lg:shadow-none",
              open ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
            )}
          >
            <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-4 lg:hidden">
              <p className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-navy-900">
                {copy.title}
              </p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={copy.closeFilters}
                className="flex size-10 items-center justify-center rounded-full hover:bg-sand-200"
              >
                <CloseIcon className="size-5" />
              </button>
            </div>
            <div className="p-4 lg:p-0">
              <ProductFilters locale={locale} filters={filters} />
            </div>
          </aside>
        </div>

        <div>{children}</div>
      </div>
    </div>
  );
}

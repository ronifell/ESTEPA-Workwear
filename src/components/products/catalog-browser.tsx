"use client";

import { useEffect, useId, useState, type FormEvent, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";

import { ProductFilters } from "@/components/products/product-filters";
import { useI18n } from "@/components/providers/i18n-provider";
import { buttonStyles } from "@/components/ui/button";
import { CloseIcon, FilterIcon, SearchIcon } from "@/components/ui/icons";
import { LocalizedLink } from "@/components/ui/localized-link";
import { protectionsById } from "@/data/protections";
import { sectorsById } from "@/data/sectors";
import { standardsCatalog } from "@/data/standards";
import {
  hasActiveFilters,
  toQuery,
  type ActiveFilters,
} from "@/lib/product-filters";
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
  const [query, setQuery] = useState(filters.q ?? "");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setQuery(filters.q ?? "");
  }, [filters.q]);

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

  function applySearch(value: string) {
    const next = toQuery({ ...filters, q: value.trim() || null });
    const qs = new URLSearchParams(next).toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  function onSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    applySearch(query);
  }

  const chips: readonly { key: string; label: string; href: Record<string, string> }[] = [
    filters.q
      ? { key: "q", label: `“${filters.q}”`, href: toQuery({ ...filters, q: null }) }
      : null,
    filters.category
      ? {
          key: "category",
          label: dictionary.products.categories[filters.category],
          href: toQuery({ ...filters, category: null }),
        }
      : null,
    filters.sector
      ? {
          key: "sector",
          label: sectorsById[filters.sector].name[locale],
          href: toQuery({ ...filters, sector: null }),
        }
      : null,
    filters.protection
      ? {
          key: "protection",
          label: protectionsById[filters.protection].name[locale],
          href: toQuery({ ...filters, protection: null }),
        }
      : null,
    filters.standard
      ? {
          key: "standard",
          label: standardsCatalog[filters.standard].name,
          href: toQuery({ ...filters, standard: null }),
        }
      : null,
  ].filter((chip): chip is { key: string; label: string; href: Record<string, string> } => chip !== null);

  return (
    <div>
      <form onSubmit={onSearchSubmit} className="mb-5">
        <label htmlFor={`${titleId}-search`} className="sr-only">
          {copy.search}
        </label>
        <div className="flex overflow-hidden rounded-full border border-border bg-surface focus-within:border-navy-900">
          <span className="flex items-center pl-4 text-text-muted">
            <SearchIcon className="size-4" />
          </span>
          <input
            id={`${titleId}-search`}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={copy.searchPlaceholder}
            className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-navy-900 outline-none placeholder:text-text-subtle"
          />
          <button type="submit" className={cn(buttonStyles("primary", "sm"), "m-1 shrink-0")}>
            {copy.search}
          </button>
        </div>
      </form>

      {chips.length > 0 ? (
        <ul className="mb-5 flex flex-wrap items-center gap-2">
          <li className="font-display text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-text-subtle">
            {copy.activeFilters}
          </li>
          {chips.map((chip) => (
            <li key={chip.key}>
              <LocalizedLink
                route="products"
                locale={locale}
                query={chip.href}
                scroll={false}
                className="inline-flex items-center gap-1.5 rounded-full border border-navy-900/15 bg-sand-50 py-1 pl-3 pr-2 font-display text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-navy-900 transition-colors hover:border-navy-900"
              >
                {chip.label}
                <span className="flex size-5 items-center justify-center rounded-full bg-navy-900 text-white">
                  <CloseIcon className="size-3" />
                  <span className="sr-only">{copy.removeFilter}</span>
                </span>
              </LocalizedLink>
            </li>
          ))}
        </ul>
      ) : null}

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

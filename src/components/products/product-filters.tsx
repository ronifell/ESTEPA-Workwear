"use client";

import { useState } from "react";
import Image from "next/image";

import { CertificationBadge } from "@/components/products/certification-badge";
import { ChevronDownIcon, CloseIcon } from "@/components/ui/icons";
import { LocalizedLink } from "@/components/ui/localized-link";
import { ProtectionIcon } from "@/components/shared/protection-icon";
import { protectionsById } from "@/data/protections";
import { sectorsById } from "@/data/sectors";
import { filterableStandardIds, standardsCatalog } from "@/data/standards";
import { format, getDictionary } from "@/i18n";
import {
  protectionIds,
  sectorIds,
  toQuery,
  type ActiveFilters,
} from "@/lib/product-filters";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types";

type Pillar = "sector" | "protection" | "standard";

export function ProductFilters({
  locale,
  filters,
}: {
  readonly locale: Locale;
  readonly filters: ActiveFilters;
}) {
  const dictionary = getDictionary(locale);
  const copy = dictionary.products.filters;
  const derived: Pillar = !filters.sector
    ? "sector"
    : !filters.protection
      ? "protection"
      : "standard";
  const [open, setOpen] = useState<Pillar>(derived);
  const [previousDerived, setPreviousDerived] = useState(derived);
  if (derived !== previousDerived) {
    setPreviousDerived(derived);
    setOpen(derived);
  }

  const related = filters.sector ? sectorsById[filters.sector].relatedProtections : protectionIds;
  const protectionOrder = [
    ...related,
    ...protectionIds.filter((id) => !related.includes(id)),
  ];

  const isFiltered = Boolean(filters.sector || filters.protection || filters.standard);

  const pillars: readonly {
    readonly key: Pillar;
    readonly step: number;
    readonly label: string;
    readonly hint: string;
  }[] = [
    { key: "sector", step: 1, label: copy.sector, hint: copy.sectorHint },
    { key: "protection", step: 2, label: copy.protection, hint: copy.protectionHint },
    { key: "standard", step: 3, label: copy.standard, hint: copy.standardHint },
  ];

  return (
    <div className="rounded-3xl border border-border bg-surface p-2 sm:p-3">
      <p className="px-3 pt-2 font-display text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-text-subtle">
        {copy.pillarsLead}
      </p>

      <div className="mt-2 space-y-2">
        {pillars.map((pillar) => {
          const expanded = open === pillar.key;
          return (
            <section
              key={pillar.key}
              className={cn(
                "overflow-hidden rounded-2xl border transition-colors",
                expanded ? "border-navy-900 bg-sand-50" : "border-border bg-surface",
              )}
            >
              <button
                type="button"
                onClick={() => setOpen(pillar.key)}
                aria-expanded={expanded}
                className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left"
              >
                <span>
                  <span className="block font-display text-[0.5625rem] font-semibold uppercase tracking-[0.16em] text-accent">
                    {format(copy.step, { n: pillar.step })}
                  </span>
                  <span className="mt-0.5 block font-display text-sm font-bold text-navy-900">
                    {pillar.label}
                  </span>
                </span>
                <ChevronDownIcon
                  className={cn(
                    "size-4 shrink-0 text-text-muted transition-transform duration-300",
                    expanded && "rotate-180",
                  )}
                />
              </button>

              <div
                className={cn(
                  "grid transition-[grid-template-rows] duration-300 ease-[var(--ease-out-industrial)]",
                  expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                )}
              >
                <div className="overflow-hidden">
                  <div className="space-y-2 px-3 pb-3">
                    <p className="px-1 text-xs leading-relaxed text-text-muted">{pillar.hint}</p>

                    {pillar.key === "sector" ? (
                      <ul className="space-y-2">
                        <li>
                          <FilterLink
                            locale={locale}
                            filters={{ ...filters, sector: null }}
                            active={!filters.sector}
                            label={copy.all}
                          />
                        </li>
                        {sectorIds.map((id) => {
                          const sector = sectorsById[id];
                          return (
                            <li key={id}>
                              <LocalizedLink
                                route="products"
                                locale={locale}
                                query={toQuery({ ...filters, sector: id })}
                                scroll={false}
                                aria-current={filters.sector === id ? "true" : undefined}
                                className={cn(
                                  "group flex overflow-hidden rounded-2xl border transition-colors",
                                  filters.sector === id
                                    ? "border-navy-900"
                                    : "border-border hover:border-border-strong",
                                )}
                              >
                                <span className="relative h-16 w-20 shrink-0">
                                  <Image
                                    src={sector.image}
                                    alt=""
                                    fill
                                    sizes="80px"
                                    className="object-cover"
                                  />
                                </span>
                                <span className="flex min-w-0 flex-1 flex-col justify-center px-3 py-2">
                                  <span className="font-display text-sm font-semibold text-navy-900">
                                    {sector.name[locale]}
                                  </span>
                                  <span className="mt-0.5 line-clamp-2 text-[0.6875rem] leading-snug text-text-muted">
                                    {sector.tagline[locale]}
                                  </span>
                                </span>
                              </LocalizedLink>
                            </li>
                          );
                        })}
                      </ul>
                    ) : null}

                    {pillar.key === "protection" ? (
                      <ul className="space-y-2">
                        <li>
                          <FilterLink
                            locale={locale}
                            filters={{ ...filters, protection: null }}
                            active={!filters.protection}
                            label={copy.all}
                          />
                        </li>
                        {protectionOrder.map((id) => {
                          const protection = protectionsById[id];
                          return (
                            <li key={id}>
                              <LocalizedLink
                                route="products"
                                locale={locale}
                                query={toQuery({ ...filters, protection: id })}
                                scroll={false}
                                aria-current={filters.protection === id ? "true" : undefined}
                                className={cn(
                                  "flex items-start gap-3 rounded-2xl border px-3 py-3 transition-colors",
                                  filters.protection === id
                                    ? "border-navy-900 bg-white"
                                    : "border-border hover:border-border-strong",
                                )}
                              >
                                <ProtectionIcon
                                  id={id}
                                  className="mt-0.5 size-5 shrink-0 text-accent"
                                  strokeWidth={1.4}
                                />
                                <span>
                                  <span className="block font-display text-sm font-semibold text-navy-900">
                                    {protection.name[locale]}
                                  </span>
                                  <span className="mt-0.5 block text-[0.6875rem] leading-snug text-text-muted">
                                    {protection.shortDescription[locale]}
                                  </span>
                                </span>
                              </LocalizedLink>
                            </li>
                          );
                        })}
                      </ul>
                    ) : null}

                    {pillar.key === "standard" ? (
                      <ul className="grid grid-cols-2 gap-2">
                        <li className="col-span-2">
                          <FilterLink
                            locale={locale}
                            filters={{ ...filters, standard: null }}
                            active={!filters.standard}
                            label={copy.all}
                          />
                        </li>
                        {filterableStandardIds.map((id) => {
                          const standard = standardsCatalog[id];
                          return (
                            <li key={id}>
                              <LocalizedLink
                                route="products"
                                locale={locale}
                                query={toQuery({ ...filters, standard: id })}
                                scroll={false}
                                aria-current={filters.standard === id ? "true" : undefined}
                                className={cn(
                                  "flex h-full flex-col items-center rounded-2xl border px-2 py-3 text-center transition-colors",
                                  filters.standard === id
                                    ? "border-navy-900 bg-white"
                                    : "border-border hover:border-border-strong",
                                )}
                              >
                                <span className="pointer-events-none">
                                  <CertificationBadge
                                    certification={standard}
                                    locale={locale}
                                    compact
                                  />
                                </span>
                              </LocalizedLink>
                            </li>
                          );
                        })}
                      </ul>
                    ) : null}
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {isFiltered ? (
        <LocalizedLink
          route="products"
          locale={locale}
          scroll={false}
          className="mt-3 inline-flex items-center gap-1.5 px-3 py-2 font-display text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-danger transition-opacity hover:opacity-75"
        >
          <CloseIcon className="size-3" />
          {copy.clear}
        </LocalizedLink>
      ) : null}
    </div>
  );
}

function FilterLink({
  locale,
  filters,
  active,
  label,
}: {
  readonly locale: Locale;
  readonly filters: ActiveFilters;
  readonly active: boolean;
  readonly label: string;
}) {
  return (
    <LocalizedLink
      route="products"
      locale={locale}
      query={toQuery(filters)}
      scroll={false}
      aria-current={active ? "true" : undefined}
      className={cn(
        "flex rounded-2xl border px-3 py-2.5 font-display text-xs font-semibold uppercase tracking-[0.08em] transition-colors",
        active
          ? "border-navy-900 bg-navy-900 text-white"
          : "border-border text-text-muted hover:border-navy-900 hover:text-navy-900",
      )}
    >
      {label}
    </LocalizedLink>
  );
}

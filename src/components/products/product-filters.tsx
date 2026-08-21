import { ChevronDownIcon, CloseIcon } from "@/components/ui/icons";
import { LocalizedLink } from "@/components/ui/localized-link";
import { protectionsById } from "@/data/protections";
import { sectorsById } from "@/data/sectors";
import { getDictionary } from "@/i18n";
import {
  categoryIds,
  protectionIds,
  sectorIds,
  toQuery,
  type ActiveFilters,
} from "@/lib/product-filters";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types";

interface FilterOption {
  readonly value: string | null;
  readonly label: string;
}

/**
 * Filters are plain links: the catalogue stays fully server-rendered, works
 * without JavaScript and every filtered view has its own shareable URL.
 */
export function ProductFilters({
  locale,
  filters,
}: {
  readonly locale: Locale;
  readonly filters: ActiveFilters;
}) {
  const dictionary = getDictionary(locale);
  const copy = dictionary.products.filters;

  const groups: readonly {
    readonly key: keyof ActiveFilters;
    readonly label: string;
    readonly options: readonly FilterOption[];
  }[] = [
    {
      key: "sector",
      label: copy.sector,
      options: [
        { value: null, label: copy.all },
        ...sectorIds.map((id) => ({ value: id, label: sectorsById[id].name[locale] })),
      ],
    },
    {
      key: "protection",
      label: copy.protection,
      options: [
        { value: null, label: copy.all },
        ...protectionIds.map((id) => ({ value: id, label: protectionsById[id].name[locale] })),
      ],
    },
    {
      key: "category",
      label: copy.category,
      options: [
        { value: null, label: copy.all },
        ...categoryIds.map((id) => ({
          value: id,
          label: dictionary.products.categories[id],
        })),
      ],
    },
  ];

  const isFiltered = Boolean(filters.sector || filters.protection || filters.category);

  return (
    <div className="border border-border bg-surface">
      <details className="group" open>
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 border-b border-border px-5 py-4 lg:cursor-default lg:py-4">
          <span className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-navy-900">
            {copy.title}
          </span>
          <ChevronDownIcon className="size-4 text-text-muted transition-transform duration-200 group-open:rotate-180 lg:hidden" />
        </summary>

        <div className="space-y-6 px-5 py-6">
          {groups.map((group) => (
            <fieldset key={group.key}>
              <legend className="mb-3 font-display text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-text-subtle">
                {group.label}
              </legend>

              <ul className="flex flex-wrap gap-2">
                {group.options.map((option) => {
                  const isActive = filters[group.key] === option.value;
                  const query = toQuery({ ...filters, [group.key]: option.value });

                  return (
                    <li key={option.value ?? "all"}>
                      <LocalizedLink
                        route="products"
                        locale={locale}
                        query={query}
                        scroll={false}
                        aria-current={isActive ? "true" : undefined}
                        className={cn(
                          "inline-flex items-center rounded-xs border px-3 py-1.5 font-display text-[0.6875rem] font-semibold uppercase tracking-[0.08em] transition-colors",
                          isActive
                            ? "border-primary bg-primary text-primary-contrast"
                            : "border-border-strong bg-transparent text-text-muted hover:border-primary hover:text-primary",
                        )}
                      >
                        {option.label}
                      </LocalizedLink>
                    </li>
                  );
                })}
              </ul>
            </fieldset>
          ))}

          {isFiltered ? (
            <LocalizedLink
              route="products"
              locale={locale}
              scroll={false}
              className="inline-flex items-center gap-1.5 font-display text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-danger transition-opacity hover:opacity-75"
            >
              <CloseIcon className="size-3" />
              {copy.clear}
            </LocalizedLink>
          ) : null}
        </div>
      </details>
    </div>
  );
}

import type { ProductCategoryId, ProtectionId, SectorId } from "@/types";
import { isStandardId, type StandardId } from "@/data/standards";

export const sectorIds = ["mining", "oil-gas", "industry"] as const;

export const protectionIds = [
  "chemical",
  "electrical",
  "flash-fire",
  "high-visibility",
] as const;

export const categoryIds = [
  "coveralls",
  "jackets",
  "trousers",
  "shirts",
  "vests",
] as const;

export interface ActiveFilters {
  readonly sector: SectorId | null;
  readonly protection: ProtectionId | null;
  readonly category: ProductCategoryId | null;
  readonly standard: StandardId | null;
}

export type SearchParams = Record<string, string | string[] | undefined>;

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

/** Reads the catalogue filters from the URL, ignoring unknown values. */
export function parseFilters(searchParams: SearchParams): ActiveFilters {
  const sector = firstValue(searchParams["sector"]);
  const protection = firstValue(searchParams["protection"]);
  const category = firstValue(searchParams["category"]);
  const standard = firstValue(searchParams["standard"]);

  return {
    sector: sectorIds.find((id) => id === sector) ?? null,
    protection: protectionIds.find((id) => id === protection) ?? null,
    category: categoryIds.find((id) => id === category) ?? null,
    standard: isStandardId(standard) ? standard : null,
  };
}

export function hasActiveFilters(filters: ActiveFilters): boolean {
  return Boolean(filters.sector || filters.protection || filters.category || filters.standard);
}

/** Builds the query object for a filter set, omitting empty values. */
export function toQuery(filters: Partial<ActiveFilters>): Record<string, string> {
  const query: Record<string, string> = {};
  if (filters.sector) query["sector"] = filters.sector;
  if (filters.protection) query["protection"] = filters.protection;
  if (filters.category) query["category"] = filters.category;
  if (filters.standard) query["standard"] = filters.standard;
  return query;
}

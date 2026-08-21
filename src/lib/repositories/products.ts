import { products as staticProducts } from "@/data/products";
import type {
  Product,
  ProductCategoryId,
  ProtectionId,
  SectorId,
} from "@/types";

/**
 * Single access point to the catalogue.
 *
 * Pages and components never import `@/data/products` directly, so moving the
 * catalogue to PostgreSQL later only requires changing the body of these
 * functions (they are already async for that reason).
 */

export interface ProductFilters {
  readonly sectors?: readonly SectorId[];
  readonly protections?: readonly ProtectionId[];
  readonly categories?: readonly ProductCategoryId[];
  readonly featured?: boolean;
  readonly limit?: number;
  readonly excludeIds?: readonly string[];
}

function applyFilters(source: readonly Product[], filters: ProductFilters): Product[] {
  const { sectors, protections, categories, featured, excludeIds, limit } = filters;

  let result = source.filter((product) => product.active);

  if (sectors?.length) {
    result = result.filter((product) =>
      product.sectors.some((sector) => sectors.includes(sector)),
    );
  }

  if (protections?.length) {
    result = result.filter((product) =>
      product.protections.some((protection) => protections.includes(protection)),
    );
  }

  if (categories?.length) {
    result = result.filter((product) => categories.includes(product.category));
  }

  if (featured !== undefined) {
    result = result.filter((product) => product.featured === featured);
  }

  if (excludeIds?.length) {
    result = result.filter((product) => !excludeIds.includes(product.id));
  }

  return typeof limit === "number" ? result.slice(0, limit) : result;
}

export async function getProducts(filters: ProductFilters = {}): Promise<Product[]> {
  return applyFilters(staticProducts, filters);
}

export async function getFeaturedProducts(limit = 6): Promise<Product[]> {
  return applyFilters(staticProducts, { featured: true, limit });
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return staticProducts.find((product) => product.slug === slug && product.active) ?? null;
}

export async function getProductById(id: string): Promise<Product | null> {
  return staticProducts.find((product) => product.id === id) ?? null;
}

export async function getProductsByIds(ids: readonly string[]): Promise<Product[]> {
  const index = new Map(staticProducts.map((product) => [product.id, product]));
  return ids
    .map((id) => index.get(id))
    .filter((product): product is Product => product !== undefined);
}

export async function getAllProductSlugs(): Promise<string[]> {
  return staticProducts.filter((product) => product.active).map((product) => product.slug);
}

/** Products sharing a sector or a protection with the given one. */
export async function getRelatedProducts(product: Product, limit = 3): Promise<Product[]> {
  const candidates = staticProducts.filter(
    (candidate) => candidate.active && candidate.id !== product.id,
  );

  const scored = candidates
    .map((candidate) => {
      const sectorScore = candidate.sectors.filter((sector) =>
        product.sectors.includes(sector),
      ).length;
      const protectionScore = candidate.protections.filter((protection) =>
        product.protections.includes(protection),
      ).length;
      const categoryScore = candidate.category === product.category ? 1 : 0;
      return { candidate, score: sectorScore * 2 + protectionScore * 2 + categoryScore };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score);

  const related = scored.map((entry) => entry.candidate);

  // Keep the section populated even when nothing overlaps.
  if (related.length < limit) {
    for (const candidate of candidates) {
      if (related.length >= limit) break;
      if (!related.includes(candidate)) related.push(candidate);
    }
  }

  return related.slice(0, limit);
}

export async function countProductsBySector(): Promise<Record<SectorId, number>> {
  const counts: Record<SectorId, number> = { mining: 0, "oil-gas": 0, industry: 0 };
  for (const product of staticProducts) {
    if (!product.active) continue;
    for (const sector of product.sectors) counts[sector] += 1;
  }
  return counts;
}

export async function countProductsByProtection(): Promise<Record<ProtectionId, number>> {
  const counts: Record<ProtectionId, number> = {
    chemical: 0,
    cut: 0,
    electrical: 0,
    "flash-fire": 0,
    "high-visibility": 0,
  };
  for (const product of staticProducts) {
    if (!product.active) continue;
    for (const protection of product.protections) counts[protection] += 1;
  }
  return counts;
}

import { readCatalogue } from "@/lib/storage/product-store";
import type {
  Product,
  ProductCategoryId,
  ProtectionId,
  SectorId,
} from "@/types";
import type { StandardId } from "@/data/standards";

/**
 * Single access point to the catalogue.
 *
 * Pages and components never read the catalogue directly, so the underlying
 * source can change without touching the UI. Today it is the editable store
 * (`.data/products.json`, seeded from `@/data/products`); moving it to
 * PostgreSQL later only requires changing the body of these functions.
 */

export interface ProductFilters {
  readonly sectors?: readonly SectorId[];
  readonly protections?: readonly ProtectionId[];
  readonly categories?: readonly ProductCategoryId[];
  readonly featured?: boolean;
  readonly limit?: number;
  readonly excludeIds?: readonly string[];
  readonly standard?: StandardId;
}

function applyFilters(source: readonly Product[], filters: ProductFilters): Product[] {
  const { sectors, protections, categories, featured, excludeIds, limit, standard } = filters;

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

  if (standard) {
    result = result.filter((product) =>
      (product.certifications ?? []).some((certification) => certification.id === standard),
    );
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
  return applyFilters(await readCatalogue(), filters);
}

export async function getFeaturedProducts(limit = 6): Promise<Product[]> {
  return applyFilters(await readCatalogue(), { featured: true, limit });
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const catalogue = await readCatalogue();
  return catalogue.find((product) => product.slug === slug && product.active) ?? null;
}

export async function getProductById(id: string): Promise<Product | null> {
  const catalogue = await readCatalogue();
  return catalogue.find((product) => product.id === id) ?? null;
}

export async function getProductsByIds(ids: readonly string[]): Promise<Product[]> {
  const catalogue = await readCatalogue();
  const index = new Map(catalogue.map((product) => [product.id, product]));
  return ids
    .map((id) => index.get(id))
    .filter((product): product is Product => product !== undefined);
}

export async function getAllProductSlugs(): Promise<string[]> {
  const catalogue = await readCatalogue();
  return catalogue.filter((product) => product.active).map((product) => product.slug);
}

/** Every product, including inactive ones. Used by the admin panel only. */
export async function getAllProductsForAdmin(): Promise<Product[]> {
  return readCatalogue();
}

/** Products sharing a sector or a protection with the given one. */
export async function getRelatedProducts(product: Product, limit = 3): Promise<Product[]> {
  const catalogue = await readCatalogue();
  const candidates = catalogue.filter(
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
  for (const product of await readCatalogue()) {
    if (!product.active) continue;
    for (const sector of product.sectors) counts[sector] += 1;
  }
  return counts;
}

export async function countProductsByProtection(): Promise<Record<ProtectionId, number>> {
  const counts: Record<ProtectionId, number> = {
    chemical: 0,
    electrical: 0,
    "flash-fire": 0,
    "high-visibility": 0,
  };
  for (const product of await readCatalogue()) {
    if (!product.active) continue;
    for (const protection of product.protections) counts[protection] += 1;
  }
  return counts;
}

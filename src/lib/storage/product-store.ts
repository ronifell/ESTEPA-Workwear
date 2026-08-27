import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

import { products as seedProducts } from "@/data/products";
import { protectionIds } from "@/lib/product-filters";
import type { Product, ProtectionId } from "@/types";

import { StorageUnavailableError } from "./types";

/**
 * Editable catalogue.
 *
 * The catalogue shipped in `src/data/products.ts` is the seed: until someone
 * saves a change from the admin panel there is no file on disk and the site
 * renders the seed exactly as before. The first save writes the whole
 * catalogue to `.data/products.json`, which then becomes the source of truth.
 *
 * On read-only hosting the write throws `StorageUnavailableError` so the panel
 * can tell the user instead of pretending the product was saved.
 */

// Statically scoped so the bundler does not trace the whole project.
const DATA_DIR = path.join(process.cwd(), ".data");
const PRODUCTS_FILE = path.join(process.cwd(), ".data", "products.json");
const PRODUCTS_TMP_FILE = path.join(process.cwd(), ".data", "products.json.tmp");

interface CatalogueFile {
  readonly version: 1;
  readonly updatedAt: string;
  readonly products: Product[];
}

function isProtectionId(value: string): value is ProtectionId {
  return (protectionIds as readonly string[]).includes(value);
}

/** Drops retired protection tags so an older catalogue file cannot break the storefront. */
function sanitizeProduct(product: Product): Product {
  const protections = (product.protections as readonly string[]).filter(isProtectionId);
  if (protections.length === product.protections.length) return product;
  return { ...product, protections };
}

function sanitizeCatalogue(products: readonly Product[]): Product[] {
  return products.map(sanitizeProduct);
}

/** True once the catalogue has been edited from the panel. */
export async function isCatalogueOverridden(): Promise<boolean> {
  const content = await readFile(PRODUCTS_FILE, "utf8").catch(() => null);
  return content !== null;
}

/** Full catalogue, including inactive products. */
export async function readCatalogue(): Promise<Product[]> {
  const content = await readFile(PRODUCTS_FILE, "utf8").catch(() => null);
  if (content === null) return sanitizeCatalogue(seedProducts);

  try {
    const parsed = JSON.parse(content) as Partial<CatalogueFile>;
    if (!Array.isArray(parsed.products)) return sanitizeCatalogue(seedProducts);
    return sanitizeCatalogue(parsed.products);
  } catch {
    // A corrupted file must not take the storefront down.
    return sanitizeCatalogue(seedProducts);
  }
}

export async function writeCatalogue(products: readonly Product[]): Promise<void> {
  const payload: CatalogueFile = {
    version: 1,
    updatedAt: new Date().toISOString(),
    products: [...products],
  };

  try {
    await mkdir(DATA_DIR, { recursive: true });
    // Write then rename so a crash never leaves a half-written catalogue.
    await writeFile(PRODUCTS_TMP_FILE, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
    await rename(PRODUCTS_TMP_FILE, PRODUCTS_FILE);
  } catch (error) {
    throw new StorageUnavailableError(
      `Cannot write the catalogue to ${PRODUCTS_FILE}: ${(error as Error).message}`,
    );
  }
}

export async function findProductById(id: string): Promise<Product | null> {
  const catalogue = await readCatalogue();
  return catalogue.find((product) => product.id === id) ?? null;
}

/** Rejects slugs and ids already used by another product. */
export async function assertUniqueProduct(
  product: Pick<Product, "id" | "slug">,
  { ignoreId }: { ignoreId?: string } = {},
): Promise<void> {
  const catalogue = await readCatalogue();
  const others = catalogue.filter((entry) => entry.id !== ignoreId);

  if (others.some((entry) => entry.id === product.id)) {
    throw new DuplicateProductError("id");
  }
  if (others.some((entry) => entry.slug === product.slug)) {
    throw new DuplicateProductError("slug");
  }
}

export class DuplicateProductError extends Error {
  constructor(readonly field: "id" | "slug") {
    super(`A product with the same ${field} already exists`);
    this.name = "DuplicateProductError";
  }
}

export async function createProduct(product: Product): Promise<Product> {
  await assertUniqueProduct(product);
  const catalogue = await readCatalogue();
  await writeCatalogue([...catalogue, product]);
  return product;
}

export async function updateProduct(id: string, product: Product): Promise<Product> {
  const catalogue = await readCatalogue();
  const index = catalogue.findIndex((entry) => entry.id === id);
  if (index === -1) throw new ProductNotFoundError(id);

  await assertUniqueProduct(product, { ignoreId: id });

  const next = [...catalogue];
  next[index] = product;
  await writeCatalogue(next);
  return product;
}

export async function deleteProduct(id: string): Promise<void> {
  const catalogue = await readCatalogue();
  const next = catalogue.filter((entry) => entry.id !== id);
  if (next.length === catalogue.length) throw new ProductNotFoundError(id);
  await writeCatalogue(next);
}

export class ProductNotFoundError extends Error {
  constructor(id: string) {
    super(`Product ${id} does not exist`);
    this.name = "ProductNotFoundError";
  }
}

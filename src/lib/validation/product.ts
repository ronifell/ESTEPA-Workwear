import { z } from "zod";

import { siteConfig } from "@/config/site";
import { categoryIds, protectionIds, sectorIds } from "@/lib/product-filters";
import type { Product } from "@/types";

/**
 * Validation for the admin product editor.
 *
 * Two rules shape this schema:
 *   1. Spanish is the source language. English is optional and falls back to
 *      the Spanish text, so the site never renders a blank string.
 *   2. Empty optional blocks are dropped instead of stored as empty arrays,
 *      which keeps the "specifications pending" state of the storefront honest.
 */

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const identifier = z
  .string()
  .trim()
  .min(2, "min_length")
  .max(64, "max_length")
  .transform((value) => value.toLowerCase())
  .refine((value) => SLUG_PATTERN.test(value), "invalid_identifier");

/** Local path (`/uploads/...`) or absolute URL. */
function isMediaPath(value: string): boolean {
  return value.startsWith("/") || /^https?:\/\//.test(value);
}

const mediaPath = z
  .string()
  .trim()
  .min(1, "required")
  .max(500, "max_length")
  .refine(isMediaPath, "invalid_path");

const optionalMediaPath = z
  .string()
  .trim()
  .max(500, "max_length")
  .default("")
  .refine((value) => value === "" || isMediaPath(value), "invalid_path");

function localizedText(max: number) {
  return z
    .object({
      es: z.string().trim().min(1, "required").max(max, "max_length"),
      en: z.string().trim().max(max, "max_length").default(""),
    })
    .transform(({ es, en }) => ({ es, en: en || es }));
}

function optionalLocalizedText(max: number) {
  return z
    .object({
      es: z.string().trim().max(max, "max_length").default(""),
      en: z.string().trim().max(max, "max_length").default(""),
    })
    .default({ es: "", en: "" })
    .transform(({ es, en }) =>
      es || en ? { es: es || en, en: en || es } : undefined,
    );
}

function localizedList(maxItems = 40, maxLength = 400) {
  return z
    .object({
      es: z.array(z.string().trim().max(maxLength, "max_length")).max(maxItems).default([]),
      en: z.array(z.string().trim().max(maxLength, "max_length")).max(maxItems).default([]),
    })
    .default({ es: [], en: [] })
    .transform(({ es, en }) => {
      const spanish = es.filter((entry) => entry.length > 0);
      const english = en.filter((entry) => entry.length > 0);
      if (spanish.length === 0 && english.length === 0) return undefined;
      return {
        es: spanish.length > 0 ? spanish : english,
        en: english.length > 0 ? english : spanish,
      };
    });
}

const optionalAmount = z
  .union([z.number(), z.null()])
  .optional()
  .transform((value) =>
    typeof value === "number" && Number.isFinite(value) && value > 0
      ? Math.round(value * 100) / 100
      : undefined,
  );

const imageSchema = z.object({
  src: mediaPath,
  alt: localizedText(240),
  kind: z.enum(["studio", "in-use", "detail", "material"]).default("studio"),
});

const featureSchema = z.object({
  label: localizedText(120),
  value: localizedText(400),
});

const certificationSchema = z.object({
  id: z.string().trim().min(1, "required").max(64, "max_length"),
  name: z.string().trim().min(1, "required").max(120, "max_length"),
  description: optionalLocalizedText(600),
  logo: optionalMediaPath,
});

const documentSchema = z.object({
  id: identifier,
  label: localizedText(160),
  type: z.enum(["technical-sheet", "certificate", "care-guide", "other"]).default("other"),
  /** Empty while the file has not been supplied: the UI shows it as pending. */
  url: optionalMediaPath,
});

const variantSchema = z.object({
  id: identifier,
  sku: z.string().trim().min(1, "required").max(64, "max_length"),
  size: z.string().trim().min(1, "required").max(24, "max_length"),
  color: optionalLocalizedText(80),
  price: optionalAmount,
  stock: z.union([z.number().int().min(0).max(1_000_000), z.null()]).optional(),
  available: z.boolean().default(true),
});

export const productInputSchema = z.object({
  id: identifier,
  slug: identifier,

  name: localizedText(120),
  shortDescription: localizedText(240),
  description: localizedText(6000),

  category: z.enum(categoryIds),
  sectors: z.array(z.enum(sectorIds)).min(1, "min_one_sector").max(sectorIds.length),
  protections: z.array(z.enum(protectionIds)).max(protectionIds.length).default([]),

  images: z.array(imageSchema).max(12).default([]),

  price: optionalAmount,
  currency: z.string().trim().length(3).toUpperCase().optional(),

  sizes: z.array(z.string().trim().max(24)).max(30).default([]),
  variants: z.array(variantSchema).max(60).default([]),

  certifications: z.array(certificationSchema).max(20).default([]),

  benefits: localizedList(),
  technicalFeatures: z.array(featureSchema).max(40).default([]),
  materials: localizedList(),
  recommendedUse: localizedList(),
  care: localizedList(),

  documents: z.array(documentSchema).max(20).default([]),

  featured: z.boolean().default(false),
  active: z.boolean().default(true),
  preliminary: z.boolean().default(true),
});

export type ProductInput = z.output<typeof productInputSchema>;

/**
 * Builds the stored record. Optional keys are omitted rather than written as
 * `undefined` so the catalogue file stays readable.
 */
export function toProduct(input: ProductInput): Product {
  const sizes = input.sizes.filter((size) => size.length > 0);
  const uniqueSizes = [...new Set(sizes)];

  return {
    id: input.id,
    slug: input.slug,
    name: input.name,
    shortDescription: input.shortDescription,
    description: input.description,
    category: input.category,
    sectors: [...new Set(input.sectors)],
    protections: [...new Set(input.protections)],
    images: input.images,
    ...(input.price !== undefined
      ? { price: input.price, currency: input.currency ?? siteConfig.commerce.currency }
      : input.currency
        ? { currency: input.currency }
        : {}),
    ...(uniqueSizes.length > 0 ? { sizes: uniqueSizes } : {}),
    ...(input.variants.length > 0
      ? {
          variants: input.variants.map((variant) => ({
            id: variant.id,
            sku: variant.sku,
            size: variant.size,
            ...(variant.color ? { color: variant.color } : {}),
            ...(variant.price !== undefined ? { price: variant.price } : {}),
            ...(typeof variant.stock === "number" ? { stock: variant.stock } : {}),
            available: variant.available,
          })),
        }
      : {}),
    ...(input.certifications.length > 0
      ? {
          certifications: input.certifications.map((certification) => ({
            id: certification.id,
            name: certification.name,
            ...(certification.description ? { description: certification.description } : {}),
            ...(certification.logo ? { logo: certification.logo } : {}),
          })),
        }
      : {}),
    ...(input.benefits ? { benefits: input.benefits } : {}),
    ...(input.technicalFeatures.length > 0
      ? { technicalFeatures: input.technicalFeatures }
      : {}),
    ...(input.materials ? { materials: input.materials } : {}),
    ...(input.recommendedUse ? { recommendedUse: input.recommendedUse } : {}),
    ...(input.care ? { care: input.care } : {}),
    ...(input.documents.length > 0 ? { documents: input.documents } : {}),
    featured: input.featured,
    active: input.active,
    preliminary: input.preliminary,
  };
}

/** Field-level errors keyed by dotted path, ready for the form to display. */
export function flattenIssues(error: z.ZodError): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".") || "form";
    errors[key] ??= issue.message;
  }
  return errors;
}

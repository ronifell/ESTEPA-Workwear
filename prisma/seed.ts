/**
 * Loads the placeholder catalogue into PostgreSQL.
 *
 *   npm run db:push && npm run db:seed
 *
 * The source of truth stays `src/data/products.ts`, so replacing the placeholder
 * records there and re-running the seed keeps both backends in sync.
 */
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

import { PrismaClient, type Prisma } from "../src/generated/prisma/client";
import { products } from "../src/data/products";

const connectionString = process.env["DATABASE_URL"];
if (!connectionString) {
  throw new Error("DATABASE_URL is required to seed the database.");
}

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });

/** The catalogue types are deeply readonly; Prisma's JSON inputs are not. */
function json<T>(value: T): Prisma.InputJsonValue {
  return structuredClone(value) as Prisma.InputJsonValue;
}

async function main() {
  console.log(`Seeding ${products.length} products…`);

  for (const product of products) {
    const data = {
      slug: product.slug,
      name: json(product.name),
      shortDescription: json(product.shortDescription),
      description: json(product.description),
      category: product.category,
      sectors: [...product.sectors],
      protections: [...product.protections],
      images: json(product.images),
      price: product.price ?? null,
      currency: product.currency ?? "ARS",
      sizes: product.sizes ? [...product.sizes] : [],
      certifications: json(product.certifications ?? []),
      benefits: json(product.benefits ?? {}),
      technicalFeatures: json(product.technicalFeatures ?? []),
      materials: json(product.materials ?? {}),
      recommendedUse: json(product.recommendedUse ?? {}),
      care: json(product.care ?? {}),
      documents: json(product.documents ?? []),
      featured: product.featured,
      active: product.active,
      preliminary: product.preliminary,
    };

    await prisma.product.upsert({
      where: { id: product.id },
      create: { id: product.id, ...data },
      update: data,
    });
  }

  console.log("Done.");
}

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());

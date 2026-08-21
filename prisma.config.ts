import "dotenv/config";

import { defineConfig } from "prisma/config";

/**
 * Prisma CLI configuration (Prisma 7 moved the connection URL out of the schema).
 *
 * `prisma generate` must keep working on machines that never configure a
 * database — the storefront runs on the file store by default — so the URL falls
 * back to a placeholder instead of throwing. Commands that actually touch the
 * database (`db push`, `migrate`, `db seed`) still require a real DATABASE_URL.
 */
const databaseUrl =
  process.env["DATABASE_URL"] ?? "postgresql://user:password@localhost:5432/estepa";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: databaseUrl,
  },
});

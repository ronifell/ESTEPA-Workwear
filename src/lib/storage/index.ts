import { fileLeadStore, fileOrderStore } from "./file-store";
import type { LeadStore, OrderStore } from "./types";

export * from "./types";

/**
 * Storage resolution.
 *
 * `DATABASE_URL` selects the PostgreSQL implementation once `prisma generate`
 * has been run; otherwise the file store is used. Nothing else in the app knows
 * which backend is active.
 */
export async function getLeadStore(): Promise<LeadStore> {
  const prismaStores = await loadPrismaStores();
  return prismaStores?.leadStore ?? fileLeadStore;
}

export async function getOrderStore(): Promise<OrderStore> {
  const prismaStores = await loadPrismaStores();
  return prismaStores?.orderStore ?? fileOrderStore;
}

interface PrismaStores {
  readonly leadStore: LeadStore;
  readonly orderStore: OrderStore;
}

let prismaStoresPromise: Promise<PrismaStores | null> | undefined;

function loadPrismaStores(): Promise<PrismaStores | null> {
  if (!process.env["DATABASE_URL"]) return Promise.resolve(null);

  prismaStoresPromise ??= import("./prisma-store")
    .then((module) => module.createPrismaStores())
    .catch((error: unknown) => {
      console.warn(
        "[storage] DATABASE_URL is set but the Prisma client is unavailable; " +
          "falling back to the file store. Run `npm run db:generate`.",
        error,
      );
      return null;
    });

  return prismaStoresPromise;
}

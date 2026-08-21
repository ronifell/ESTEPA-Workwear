import type { ContactLead, LeadStore, Order, OrderStore } from "./types";
import type { CustomerDetails, DeliveryDetails, Locale, OrderStatus } from "@/types";

/**
 * PostgreSQL implementation.
 *
 * Loaded lazily by `./index.ts` only when `DATABASE_URL` is set, so the project
 * builds and runs without the generated Prisma client.
 */

interface PrismaLikeClient {
  contactLead: { create: (args: { data: Record<string, unknown> }) => Promise<unknown> };
  order: {
    create: (args: { data: Record<string, unknown> }) => Promise<unknown>;
    findUnique: (args: {
      where: { reference: string };
      include: { items: true };
    }) => Promise<PrismaOrderRow | null>;
  };
}

interface PrismaOrderItemRow {
  productId: string;
  slug: string;
  name: string;
  size: string | null;
  quantity: number;
  unitPrice: number | null;
}

interface PrismaOrderRow {
  id: string;
  reference: string;
  createdAt: Date;
  locale: string;
  status: string;
  customer: unknown;
  delivery: unknown;
  subtotal: number | null;
  currency: string;
  items: PrismaOrderItemRow[];
}

const globalForPrisma = globalThis as unknown as { estepaPrisma?: PrismaLikeClient };

/**
 * Prisma 7 requires an explicit driver adapter. Both the client and the adapter
 * are imported lazily so a deployment without `DATABASE_URL` never loads them.
 */
async function getClient(): Promise<PrismaLikeClient> {
  if (globalForPrisma.estepaPrisma) return globalForPrisma.estepaPrisma;

  const [{ PrismaClient }, { PrismaPg }] = await Promise.all([
    import("@/generated/prisma/client"),
    import("@prisma/adapter-pg"),
  ]);

  const adapter = new PrismaPg({ connectionString: process.env["DATABASE_URL"] ?? "" });
  const client = new PrismaClient({ adapter }) as unknown as PrismaLikeClient;

  globalForPrisma.estepaPrisma = client;
  return client;
}

export async function createPrismaStores(): Promise<{
  leadStore: LeadStore;
  orderStore: OrderStore;
}> {
  const client = await getClient();

  const leadStore: LeadStore = {
    async create(lead: ContactLead) {
      await client.contactLead.create({
        data: {
          id: lead.id,
          createdAt: new Date(lead.createdAt),
          locale: lead.locale,
          name: lead.name,
          company: lead.company,
          role: lead.role ?? null,
          email: lead.email,
          phone: lead.phone ?? null,
          region: lead.region ?? null,
          sector: lead.sector,
          message: lead.message,
        },
      });
    },
  };

  const orderStore: OrderStore = {
    async create(order: Order) {
      await client.order.create({
        data: {
          id: order.id,
          reference: order.reference,
          createdAt: new Date(order.createdAt),
          locale: order.locale,
          status: order.status,
          customer: order.customer,
          delivery: order.delivery,
          subtotal: order.subtotal ?? null,
          currency: order.currency,
          items: {
            create: order.items.map((item) => ({
              productId: item.productId,
              slug: item.slug,
              name: item.name,
              size: item.size ?? null,
              quantity: item.quantity,
              unitPrice: item.unitPrice ?? null,
            })),
          },
        },
      });
    },

    async findByReference(reference: string) {
      const row = await client.order.findUnique({
        where: { reference },
        include: { items: true },
      });
      if (!row) return null;

      return {
        id: row.id,
        reference: row.reference,
        createdAt: row.createdAt.toISOString(),
        locale: row.locale as Locale,
        status: row.status as OrderStatus,
        customer: row.customer as CustomerDetails,
        delivery: row.delivery as DeliveryDetails,
        currency: row.currency,
        ...(row.subtotal !== null ? { subtotal: row.subtotal } : {}),
        items: row.items.map((item) => ({
          productId: item.productId,
          slug: item.slug,
          name: item.name,
          quantity: item.quantity,
          ...(item.size !== null ? { size: item.size } : {}),
          ...(item.unitPrice !== null ? { unitPrice: item.unitPrice } : {}),
        })),
      } satisfies Order;
    },
  };

  return { leadStore, orderStore };
}

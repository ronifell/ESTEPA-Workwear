import type { CustomerDetails, DeliveryDetails, Locale, OrderStatus } from "@/types";

export interface ContactLead {
  readonly id: string;
  readonly createdAt: string;
  readonly locale: Locale;
  readonly name: string;
  readonly company: string;
  readonly role?: string;
  readonly email: string;
  readonly phone?: string;
  readonly region?: string;
  readonly sector: string;
  readonly message: string;
}

export interface OrderItem {
  readonly productId: string;
  readonly slug: string;
  readonly name: string;
  readonly size?: string;
  readonly quantity: number;
  /** Resolved on the server from the catalogue, never from the client. */
  readonly unitPrice?: number;
}

export interface Order {
  readonly id: string;
  readonly reference: string;
  readonly createdAt: string;
  readonly locale: Locale;
  readonly status: OrderStatus;
  readonly customer: CustomerDetails;
  readonly delivery: DeliveryDetails;
  readonly items: readonly OrderItem[];
  readonly subtotal?: number;
  readonly currency: string;
}

/**
 * Persistence contracts. Swapping the file store for PostgreSQL (see
 * `prisma/schema.prisma`) means implementing these two interfaces.
 */
export interface LeadStore {
  readonly create: (lead: ContactLead) => Promise<void>;
}

export interface OrderStore {
  readonly create: (order: Order) => Promise<void>;
  readonly findByReference: (reference: string) => Promise<Order | null>;
}

export class StorageUnavailableError extends Error {
  constructor(message = "Storage backend is not available") {
    super(message);
    this.name = "StorageUnavailableError";
  }
}

import { randomInt, randomUUID } from "node:crypto";

import { NextResponse } from "next/server";

import { siteConfig } from "@/config/site";
import { checkRateLimit, getClientKey } from "@/lib/rate-limit";
import { getProductsByIds } from "@/lib/repositories/products";
import {
  getOrderStore,
  StorageUnavailableError,
  type Order,
  type OrderItem,
} from "@/lib/storage";
import { orderSchema } from "@/lib/validation/order";

export const runtime = "nodejs";

const REFERENCE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

/** `EST-260821-7KQ2XM4P` — date prefix for humans, random suffix for privacy. */
function buildReference(): string {
  const now = new Date();
  const datePart = [
    String(now.getFullYear()).slice(2),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("");

  let random = "";
  for (let index = 0; index < 8; index += 1) {
    random += REFERENCE_ALPHABET[randomInt(REFERENCE_ALPHABET.length)];
  }

  return `EST-${datePart}-${random}`;
}

export async function POST(request: Request) {
  const { allowed, retryAfterSeconds } = checkRateLimit(getClientKey(request, "orders"), {
    limit: 8,
    windowMs: 10 * 60_000,
  });

  if (!allowed) {
    return NextResponse.json(
      { ok: false, error: "rate_limited" },
      { status: 429, headers: { "Retry-After": String(retryAfterSeconds) } },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = orderSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "validation_error",
        issues: parsed.error.issues.map((issue) => ({
          path: issue.path.join("."),
          code: issue.code,
        })),
      },
      { status: 422 },
    );
  }

  if (parsed.data.website) {
    return NextResponse.json({ ok: false, error: "rejected" }, { status: 400 });
  }

  // Prices and names always come from the catalogue, never from the browser.
  const requested = parsed.data.items;
  const products = await getProductsByIds(requested.map((item) => item.productId));
  const index = new Map(products.map((product) => [product.id, product]));

  const items: OrderItem[] = [];
  for (const item of requested) {
    const product = index.get(item.productId);
    if (!product) {
      return NextResponse.json(
        { ok: false, error: "unknown_product", productId: item.productId },
        { status: 422 },
      );
    }

    items.push({
      productId: product.id,
      slug: product.slug,
      name: product.name[parsed.data.locale],
      quantity: item.quantity,
      ...(item.size ? { size: item.size } : {}),
      ...(product.price !== undefined ? { unitPrice: product.price } : {}),
    });
  }

  const allPriced = items.every((item) => item.unitPrice !== undefined);
  const subtotal =
    siteConfig.commerce.pricesEnabled && allPriced
      ? items.reduce((total, item) => total + (item.unitPrice ?? 0) * item.quantity, 0)
      : undefined;

  const order: Order = {
    id: randomUUID(),
    reference: buildReference(),
    createdAt: new Date().toISOString(),
    locale: parsed.data.locale,
    // Payment is not wired up yet, so every order starts as a reviewable request.
    status: "pending_review",
    customer: parsed.data.customer,
    delivery: parsed.data.delivery,
    items,
    currency: siteConfig.commerce.currency,
    ...(subtotal !== undefined ? { subtotal } : {}),
  };

  try {
    const store = await getOrderStore();
    await store.create(order);
  } catch (error) {
    if (error instanceof StorageUnavailableError) {
      console.error("[orders] storage unavailable", error);
      return NextResponse.json({ ok: false, error: "storage_unavailable" }, { status: 503 });
    }
    console.error("[orders] unexpected error", error);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }

  return NextResponse.json({ ok: true, reference: order.reference }, { status: 201 });
}

import { NextResponse } from "next/server";

import { requireAdmin, revalidateStorefront } from "@/lib/admin/api";
import {
  createProduct,
  DuplicateProductError,
  readCatalogue,
} from "@/lib/storage/product-store";
import { StorageUnavailableError } from "@/lib/storage/types";
import { flattenIssues, productInputSchema, toProduct } from "@/lib/validation/product";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const guard = requireAdmin(request);
  if ("response" in guard) return guard.response;

  return NextResponse.json({ ok: true, products: await readCatalogue() });
}

export async function POST(request: Request) {
  const guard = requireAdmin(request);
  if ("response" in guard) return guard.response;

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = productInputSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "validation_error", fields: flattenIssues(parsed.error) },
      { status: 422 },
    );
  }

  try {
    const product = await createProduct(toProduct(parsed.data));
    revalidateStorefront();
    return NextResponse.json({ ok: true, product }, { status: 201 });
  } catch (error) {
    if (error instanceof DuplicateProductError) {
      return NextResponse.json(
        { ok: false, error: "duplicate", fields: { [error.field]: "duplicate" } },
        { status: 409 },
      );
    }
    if (error instanceof StorageUnavailableError) {
      console.error("[admin/products] storage unavailable", error);
      return NextResponse.json({ ok: false, error: "storage_unavailable" }, { status: 503 });
    }
    console.error("[admin/products] unexpected error", error);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}

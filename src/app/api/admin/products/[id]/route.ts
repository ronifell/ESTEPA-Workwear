import { NextResponse } from "next/server";

import { requireAdmin, revalidateStorefront } from "@/lib/admin/api";
import {
  deleteProduct,
  DuplicateProductError,
  findProductById,
  ProductNotFoundError,
  updateProduct,
} from "@/lib/storage/product-store";
import { StorageUnavailableError } from "@/lib/storage/types";
import { flattenIssues, productInputSchema, toProduct } from "@/lib/validation/product";

export const runtime = "nodejs";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: RouteContext) {
  const guard = requireAdmin(request);
  if ("response" in guard) return guard.response;

  const { id } = await params;
  const product = await findProductById(id);
  if (!product) {
    return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true, product });
}

export async function PUT(request: Request, { params }: RouteContext) {
  const guard = requireAdmin(request);
  if ("response" in guard) return guard.response;

  const { id } = await params;

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
    const product = await updateProduct(id, toProduct(parsed.data));
    revalidateStorefront();
    return NextResponse.json({ ok: true, product });
  } catch (error) {
    return handleWriteError(error, "update");
  }
}

export async function DELETE(request: Request, { params }: RouteContext) {
  const guard = requireAdmin(request);
  if ("response" in guard) return guard.response;

  const { id } = await params;

  try {
    await deleteProduct(id);
    revalidateStorefront();
    return NextResponse.json({ ok: true });
  } catch (error) {
    return handleWriteError(error, "delete");
  }
}

function handleWriteError(error: unknown, scope: string): NextResponse {
  if (error instanceof ProductNotFoundError) {
    return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
  }
  if (error instanceof DuplicateProductError) {
    return NextResponse.json(
      { ok: false, error: "duplicate", fields: { [error.field]: "duplicate" } },
      { status: 409 },
    );
  }
  if (error instanceof StorageUnavailableError) {
    console.error(`[admin/products:${scope}] storage unavailable`, error);
    return NextResponse.json({ ok: false, error: "storage_unavailable" }, { status: 503 });
  }
  console.error(`[admin/products:${scope}] unexpected error`, error);
  return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
}

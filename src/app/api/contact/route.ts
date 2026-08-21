import { randomUUID } from "node:crypto";

import { NextResponse } from "next/server";

import { checkRateLimit, getClientKey } from "@/lib/rate-limit";
import { getLeadStore, StorageUnavailableError, type ContactLead } from "@/lib/storage";
import { contactSchema } from "@/lib/validation/contact";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const { allowed, retryAfterSeconds } = checkRateLimit(getClientKey(request, "contact"), {
    limit: 5,
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

  const parsed = contactSchema.safeParse(payload);
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

  // Honeypot filled in: silently accept without storing anything.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true, id: null });
  }

  const lead: ContactLead = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    locale: parsed.data.locale,
    name: parsed.data.name,
    company: parsed.data.company,
    email: parsed.data.email,
    sector: parsed.data.sector,
    message: parsed.data.message,
    ...(parsed.data.role ? { role: parsed.data.role } : {}),
    ...(parsed.data.phone ? { phone: parsed.data.phone } : {}),
    ...(parsed.data.region ? { region: parsed.data.region } : {}),
  };

  try {
    const store = await getLeadStore();
    await store.create(lead);
  } catch (error) {
    if (error instanceof StorageUnavailableError) {
      console.error("[contact] storage unavailable", error);
      return NextResponse.json({ ok: false, error: "storage_unavailable" }, { status: 503 });
    }
    console.error("[contact] unexpected error", error);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }

  return NextResponse.json({ ok: true, id: lead.id }, { status: 201 });
}

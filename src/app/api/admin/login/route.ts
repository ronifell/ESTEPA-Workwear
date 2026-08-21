import { NextResponse } from "next/server";

import {
  ADMIN_COOKIE,
  buildSessionCookieOptions,
  createSessionToken,
  isAdminConfigured,
  verifyCredentials,
} from "@/lib/admin/auth";
import { checkRateLimit, getClientKey } from "@/lib/rate-limit";
import { adminLoginSchema } from "@/lib/validation/admin";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!isAdminConfigured()) {
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  const { allowed, retryAfterSeconds } = checkRateLimit(getClientKey(request, "admin-login"), {
    limit: 8,
    windowMs: 10 * 60_000,
  });

  if (!allowed) {
    return NextResponse.json(
      { ok: false, error: "rate_limited", retryAfterSeconds },
      { status: 429, headers: { "Retry-After": String(retryAfterSeconds) } },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = adminLoginSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "invalid_credentials" }, { status: 400 });
  }

  const email = verifyCredentials(parsed.data.email, parsed.data.password);
  if (!email) {
    return NextResponse.json({ ok: false, error: "invalid_credentials" }, { status: 401 });
  }

  const { token, maxAge } = createSessionToken(email);
  const response = NextResponse.json({ ok: true, email });
  response.cookies.set(ADMIN_COOKIE, token, buildSessionCookieOptions(maxAge));
  return response;
}

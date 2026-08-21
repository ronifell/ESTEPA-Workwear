import { NextResponse } from "next/server";

import { ADMIN_COOKIE, buildSessionCookieOptions } from "@/lib/admin/auth";

export const runtime = "nodejs";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, "", buildSessionCookieOptions(0));
  return response;
}

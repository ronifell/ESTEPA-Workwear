import { NextResponse } from "next/server";

import {
  ADMIN_COOKIE,
  buildSessionCookieOptions,
  isHttpsRequest,
} from "@/lib/admin/auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(
    ADMIN_COOKIE,
    "",
    buildSessionCookieOptions(0, isHttpsRequest(request)),
  );
  return response;
}

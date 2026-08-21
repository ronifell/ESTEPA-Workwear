import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { getAdminSessionFromRequest, type AdminSession } from "./auth";

/**
 * Guard for the admin API routes. Every mutation checks the session itself
 * rather than trusting the layout, so a route can never be reached without
 * credentials.
 */
export function requireAdmin(
  request: Request,
): { session: AdminSession } | { response: NextResponse } {
  const session = getAdminSessionFromRequest(request);
  if (!session) {
    return {
      response: NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 }),
    };
  }
  return { session };
}

/**
 * Drops the cached storefront after a catalogue change. The site is small, so
 * clearing everything is simpler and safer than tracking each affected route.
 */
export function revalidateStorefront(): void {
  revalidatePath("/", "layout");
}

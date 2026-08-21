import { createHash, createHmac, timingSafeEqual } from "node:crypto";

import { cookies } from "next/headers";

/**
 * Admin authentication.
 *
 * Accounts live in the environment, never in the database or the repository:
 *
 *   ADMIN_USERS="ana@estepa.com:clave-uno, luis@estepa.com:clave-dos"
 *   ADMIN_EMAIL=ana@estepa.com          # single-account shorthand
 *   ADMIN_PASSWORD=clave-uno
 *
 * The session is a signed cookie (HMAC-SHA256), so there is nothing to store
 * server side and the panel keeps working without a database.
 */

export const ADMIN_COOKIE = "estepa_admin";

const SESSION_TTL_SECONDS = 8 * 60 * 60;

export interface AdminAccount {
  readonly email: string;
  readonly password: string;
}

export interface AdminSession {
  readonly email: string;
  /** Unix seconds. */
  readonly exp: number;
}

/**
 * Parses `ADMIN_USERS` plus the single-account shorthand.
 *
 * Entries are separated by commas or newlines and split on the *first* colon,
 * so passwords may contain colons.
 */
export function getAdminAccounts(): readonly AdminAccount[] {
  const accounts = new Map<string, string>();

  const single = {
    email: process.env["ADMIN_EMAIL"]?.trim() ?? "",
    password: process.env["ADMIN_PASSWORD"] ?? "",
  };
  if (single.email && single.password) {
    accounts.set(single.email.toLowerCase(), single.password);
  }

  const raw = process.env["ADMIN_USERS"] ?? "";
  for (const entry of raw.split(/[,\n]/)) {
    const trimmed = entry.trim();
    if (!trimmed) continue;

    const separator = trimmed.indexOf(":");
    if (separator < 1) continue;

    const email = trimmed.slice(0, separator).trim().toLowerCase();
    const password = trimmed.slice(separator + 1).trim();
    if (email && password) accounts.set(email, password);
  }

  return [...accounts].map(([email, password]) => ({ email, password }));
}

export function isAdminConfigured(): boolean {
  return getAdminAccounts().length > 0;
}

/** Constant-time comparison that tolerates different lengths. */
function matches(a: string, b: string): boolean {
  const bufferA = createHash("sha256").update(a).digest();
  const bufferB = createHash("sha256").update(b).digest();
  return timingSafeEqual(bufferA, bufferB);
}

/** Returns the normalized email when the credentials are valid. */
export function verifyCredentials(email: string, password: string): string | null {
  const normalized = email.trim().toLowerCase();
  let authenticated: string | null = null;

  // Every account is checked so the response time does not reveal which
  // address exists.
  for (const account of getAdminAccounts()) {
    if (matches(account.email, normalized) && matches(account.password, password)) {
      authenticated = account.email;
    }
  }

  return authenticated;
}

/**
 * Signing key. `ADMIN_SESSION_SECRET` is preferred; without it the key is
 * derived from the configured credentials, which means changing a password
 * invalidates existing sessions.
 */
function getSigningKey(): string {
  const explicit = process.env["ADMIN_SESSION_SECRET"]?.trim();
  if (explicit && explicit.length >= 16) return explicit;

  const fingerprint = getAdminAccounts()
    .map((account) => `${account.email}:${account.password}`)
    .join("|");

  return createHash("sha256").update(`estepa-admin:${fingerprint}`).digest("hex");
}

function sign(payload: string): string {
  return createHmac("sha256", getSigningKey()).update(payload).digest("base64url");
}

export function createSessionToken(email: string): { token: string; maxAge: number } {
  const session: AdminSession = {
    email,
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
  };

  const payload = Buffer.from(JSON.stringify(session), "utf8").toString("base64url");
  return { token: `${payload}.${sign(payload)}`, maxAge: SESSION_TTL_SECONDS };
}

export function verifySessionToken(token: string | undefined): AdminSession | null {
  if (!token) return null;

  const separator = token.lastIndexOf(".");
  if (separator < 1) return null;

  const payload = token.slice(0, separator);
  const signature = token.slice(separator + 1);
  if (!matches(sign(payload), signature)) return null;

  try {
    const decoded = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as unknown;
    if (typeof decoded !== "object" || decoded === null) return null;

    const session = decoded as Partial<AdminSession>;
    if (typeof session.email !== "string" || typeof session.exp !== "number") return null;
    if (session.exp <= Math.floor(Date.now() / 1000)) return null;

    // A removed account must lose access immediately.
    const stillConfigured = getAdminAccounts().some(
      (account) => account.email === session.email,
    );
    if (!stillConfigured) return null;

    return { email: session.email, exp: session.exp };
  } catch {
    return null;
  }
}

/** Session of the current request, or null when not signed in. */
export async function getAdminSession(): Promise<AdminSession | null> {
  const store = await cookies();
  return verifySessionToken(store.get(ADMIN_COOKIE)?.value);
}

/** Same check for API routes, which read the cookie straight off the request. */
export function getAdminSessionFromRequest(request: Request): AdminSession | null {
  const header = request.headers.get("cookie");
  if (!header) return null;

  const token = header
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${ADMIN_COOKIE}=`))
    ?.slice(ADMIN_COOKIE.length + 1);

  return verifySessionToken(token ? decodeURIComponent(token) : undefined);
}

export function buildSessionCookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge,
  };
}

import { randomBytes } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { NextResponse } from "next/server";

import { requireAdmin } from "@/lib/admin/api";
import { slugify } from "@/lib/utils";

export const runtime = "nodejs";

/**
 * Stores product media under `public/uploads`, which Next serves statically.
 * The response returns the public path, which the editor writes into the
 * product record.
 */

// Statically scoped so the bundler does not trace the whole project.
const IMAGE_DIR = path.join(process.cwd(), "public", "uploads", "products");
const DOCUMENT_DIR = path.join(process.cwd(), "public", "uploads", "documents");

const MAX_IMAGE_BYTES = 6 * 1024 * 1024;
const MAX_DOCUMENT_BYTES = 12 * 1024 * 1024;

type UploadKind = "image" | "document";

interface FormatSpec {
  readonly extension: string;
  readonly matches: (bytes: Uint8Array) => boolean;
}

function startsWith(bytes: Uint8Array, signature: readonly number[]): boolean {
  return signature.every((byte, index) => bytes[index] === byte);
}

function ascii(bytes: Uint8Array, start: number, length: number): string {
  return Buffer.from(bytes.slice(start, start + length)).toString("latin1");
}

/**
 * Formats are identified by their signature, not by the extension or the
 * declared MIME type: both are chosen by the client and these files end up
 * being served from a public URL.
 */
const IMAGE_FORMATS: readonly FormatSpec[] = [
  { extension: "jpg", matches: (bytes) => startsWith(bytes, [0xff, 0xd8, 0xff]) },
  {
    extension: "png",
    matches: (bytes) => startsWith(bytes, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
  },
  {
    extension: "webp",
    matches: (bytes) => ascii(bytes, 0, 4) === "RIFF" && ascii(bytes, 8, 4) === "WEBP",
  },
  {
    extension: "avif",
    matches: (bytes) =>
      ascii(bytes, 4, 4) === "ftyp" && ascii(bytes, 8, 4).startsWith("avi"),
  },
];

const DOCUMENT_FORMATS: readonly FormatSpec[] = [
  { extension: "pdf", matches: (bytes) => ascii(bytes, 0, 5) === "%PDF-" },
];

function detectFormat(bytes: Uint8Array, kind: UploadKind): FormatSpec | null {
  const formats = kind === "image" ? IMAGE_FORMATS : DOCUMENT_FORMATS;
  return formats.find((format) => format.matches(bytes)) ?? null;
}

function buildFileName(originalName: string, extension: string): string {
  const base = slugify(path.parse(originalName).name).slice(0, 60) || "archivo";
  return `${base}-${randomBytes(4).toString("hex")}.${extension}`;
}

export async function POST(request: Request) {
  const guard = requireAdmin(request);
  if ("response" in guard) return guard.response;

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_form" }, { status: 400 });
  }

  const file = form.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ ok: false, error: "missing_file" }, { status: 400 });
  }

  const kind: UploadKind = form.get("kind") === "document" ? "document" : "image";
  const maxBytes = kind === "image" ? MAX_IMAGE_BYTES : MAX_DOCUMENT_BYTES;

  if (file.size > maxBytes) {
    return NextResponse.json(
      { ok: false, error: "file_too_large", maxBytes },
      { status: 413 },
    );
  }

  const bytes = new Uint8Array(await file.arrayBuffer());
  const format = detectFormat(bytes, kind);
  if (!format) {
    return NextResponse.json({ ok: false, error: "unsupported_format" }, { status: 415 });
  }

  const directory = kind === "image" ? IMAGE_DIR : DOCUMENT_DIR;
  const fileName = buildFileName(file.name, format.extension);

  try {
    await mkdir(directory, { recursive: true });
    await writeFile(path.join(directory, fileName), bytes);
  } catch (error) {
    console.error("[admin/uploads] cannot write file", error);
    return NextResponse.json({ ok: false, error: "storage_unavailable" }, { status: 503 });
  }

  const publicPath = `/uploads/${kind === "image" ? "products" : "documents"}/${fileName}`;
  return NextResponse.json(
    { ok: true, path: publicPath, size: file.size, format: format.extension },
    { status: 201 },
  );
}

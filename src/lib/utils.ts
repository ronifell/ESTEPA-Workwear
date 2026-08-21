export type ClassValue =
  | string
  | number
  | bigint
  | boolean
  | null
  | undefined
  | ClassValue[]
  | Record<string, boolean | null | undefined>;

/** Minimal class-name joiner — avoids pulling a dependency for string concatenation. */
export function cn(...values: ClassValue[]): string {
  const classes: string[] = [];

  for (const value of values) {
    if (!value) continue;

    if (typeof value === "string" || typeof value === "number") {
      classes.push(String(value));
      continue;
    }

    if (Array.isArray(value)) {
      const nested = cn(...value);
      if (nested) classes.push(nested);
      continue;
    }

    for (const [key, enabled] of Object.entries(value)) {
      if (enabled) classes.push(key);
    }
  }

  return classes.join(" ");
}

export function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

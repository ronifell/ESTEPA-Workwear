import { canonicalizeStandardId, isStandardId, standardsCatalog } from "@/data/standards";
import type { Certification, Locale } from "@/types";

/** Overlay catalogue copy onto a product certification so tooltips stay current. */
export function resolveStandard(certification: Certification): Certification {
  const id = canonicalizeStandardId(certification.id);
  if (!isStandardId(id)) return id === certification.id ? certification : { ...certification, id };
  const fromCatalog = standardsCatalog[id];
  return {
    ...certification,
    id,
    name: fromCatalog.name,
    description: fromCatalog.description,
    icon: fromCatalog.icon ?? certification.icon,
  };
}

export function standardAriaLabel(certification: Certification, locale: Locale): string {
  const resolved = resolveStandard(certification);
  const detail = resolved.description?.[locale];
  return detail ? `${resolved.name}: ${detail}` : resolved.name;
}

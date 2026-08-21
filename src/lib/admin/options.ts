import type { AdminOptions } from "@/components/admin/product-form";
import { protectionsById } from "@/data/protections";
import { sectorsById } from "@/data/sectors";
import { getDictionary } from "@/i18n";
import { categoryIds, protectionIds, sectorIds } from "@/lib/product-filters";

import { adminCopy } from "./copy";

/**
 * Select and checkbox labels for the editor, resolved on the server so the
 * sector and protection datasets never reach the client bundle.
 */
export function buildAdminOptions(): AdminOptions {
  const dictionary = getDictionary("es");

  return {
    categories: categoryIds.map((id) => ({
      value: id,
      label: dictionary.products.categories[id],
    })),
    sectors: sectorIds.map((id) => ({ value: id, label: sectorsById[id].name.es })),
    protections: protectionIds.map((id) => ({
      value: id,
      label: protectionsById[id].name.es,
    })),
    imageKinds: (["studio", "in-use", "detail", "material"] as const).map((kind) => ({
      value: kind,
      label: adminCopy.form.images.kinds[kind],
    })),
    documentTypes: (
      ["technical-sheet", "certificate", "care-guide", "other"] as const
    ).map((type) => ({ value: type, label: adminCopy.form.documents.types[type] })),
  };
}

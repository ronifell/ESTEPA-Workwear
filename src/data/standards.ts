import type { Certification, LocalizedText } from "@/types";

/**
 * Canonical catalogue of standards shown on the storefront.
 *
 * Product records may carry a shorter description; badges always resolve
 * name, icon and tooltip copy from this file so the live catalogue stays
 * consistent even when `.data/products.json` was seeded earlier.
 */

export const standardIds = [
  "en-11611",
  "en-11612",
  "en-1149",
  "en-61482-2",
  "en-13034",
  "en-17353",
  "en-342",
  "en-343",
  "ul",
  "ul-certificate",
  "nfpa-2112",
  "astm-f1506",
  "astm-f1959",
  "nfpa-70e",
  "cat-2",
] as const;

export type StandardId = (typeof standardIds)[number];

/** Ids written by older catalogue files, rewritten on read. */
export const standardIdAliases: Record<string, StandardId> = {
  "en-61482": "en-61482-2",
  "en-6148": "en-61482-2",
};

export const heroStandardIds = [
  "ul",
  "nfpa-2112",
  "en-11612",
  "en-61482-2",
  "nfpa-70e",
] as const satisfies readonly StandardId[];

/** Withdrawn from the live catalogue; still recognised so old records can be stripped. */
export const retiredStandardIds = ["en-13034", "en-343"] as const satisfies readonly StandardId[];

export const retiredStandardIdSet: ReadonlySet<string> = new Set(retiredStandardIds);

/** Standards offered as catalogue filters. */
export const filterableStandardIds = [
  "en-11611",
  "en-11612",
  "en-1149",
  "en-61482-2",
  "en-17353",
  "en-342",
  "ul",
  "nfpa-2112",
  "astm-f1506",
  "astm-f1959",
  "nfpa-70e",
  "cat-2",
] as const satisfies readonly StandardId[];

const catalog = {
  "en-11611": {
    id: "en-11611",
    name: "EN ISO 11611",
    icon: "weld",
    description: {
      es: "Protección para soldadura y procesos afines: salpicaduras de metal fundido y contacto breve con llama.",
      en: "Protection for welding and allied processes: molten-metal splashes and brief flame contact.",
    } satisfies LocalizedText,
  },
  "en-11612": {
    id: "en-11612",
    name: "EN ISO 11612",
    icon: "flame",
    description: {
      es: "Protección contra el calor y la llama: limita la propagación de la llama y la transferencia de calor.",
      en: "Protection against heat and flame: limits flame spread and heat transfer.",
    } satisfies LocalizedText,
  },
  "en-1149": {
    id: "en-1149",
    name: "EN 1149",
    icon: "antistatic",
    description: {
      es: "Propiedades electrostáticas: disipa la carga estática. Requerida en zonas con atmósferas explosivas (ATEX).",
      en: "Electrostatic properties: dissipates static charge. Required in explosive atmospheres (ATEX).",
    } satisfies LocalizedText,
  },
  "en-61482-2": {
    id: "en-61482-2",
    name: "EN 61482-2",
    icon: "arc",
    description: {
      es: "Ropa de protección contra los peligros térmicos de un arco eléctrico (IEC/EN 61482-2).",
      en: "Protective clothing against the thermal hazards of an electric arc (IEC/EN 61482-2).",
    } satisfies LocalizedText,
  },
  "en-13034": {
    id: "en-13034",
    name: "EN 13034",
    icon: "chemical",
    description: {
      es: "Protección limitada contra salpicaduras de productos químicos líquidos (Tipo 6 / PB [6]).",
      en: "Limited protection against liquid chemical splashes (Type 6 / PB [6]).",
    } satisfies LocalizedText,
  },
  "en-17353": {
    id: "en-17353",
    name: "EN 17353",
    icon: "badge",
    description: {
      es: "Equipos de visibilidad mejorada para situaciones de riesgo medio, distintos de EN ISO 20471.",
      en: "Enhanced-visibility equipment for medium-risk situations, distinct from EN ISO 20471.",
    } satisfies LocalizedText,
  },
  "en-342": {
    id: "en-342",
    name: "EN 342",
    icon: "cold",
    description: {
      es: "Ropa de protección contra el frío: aislamiento térmico y resistencia al paso del aire.",
      en: "Protective clothing against cold: thermal insulation and resistance to air penetration.",
    } satisfies LocalizedText,
  },
  "en-343": {
    id: "en-343",
    name: "EN 343",
    icon: "rain",
    description: {
      es: "Ropa de protección contra la lluvia: resistencia al agua y transpirabilidad.",
      en: "Protective clothing against rain: water penetration resistance and breathability.",
    } satisfies LocalizedText,
  },
  ul: {
    id: "ul",
    name: "UL Certified",
    icon: "ul",
    description: {
      es: "Certificación independiente de Underwriters Laboratories que valida el cumplimiento de las normas declaradas.",
      en: "Independent Underwriters Laboratories certification that validates declared standard compliance.",
    } satisfies LocalizedText,
  },
  "ul-certificate": {
    id: "ul-certificate",
    name: "UL Certificate",
    icon: "badge",
    description: {
      es: "Certificado UL que acredita el cumplimiento de las normas de indumentaria FR declaradas.",
      en: "UL certificate that attests compliance with the declared FR clothing standards.",
    } satisfies LocalizedText,
  },
  "nfpa-2112": {
    id: "nfpa-2112",
    name: "NFPA 2112",
    icon: "badge",
    description: {
      es: "Norma norteamericana de ropa FR contra fuego repentino (flash fire) en petróleo y gas.",
      en: "North American FR clothing standard against flash fire in oil and gas.",
    } satisfies LocalizedText,
  },
  "astm-f1506": {
    id: "astm-f1506",
    name: "ASTM F1506",
    icon: "badge",
    description: {
      es: "Norma norteamericana de ropa FR frente a arco eléctrico y llama momentánea, para trabajos eléctricos.",
      en: "North American FR clothing standard for electric arc and momentary flame, for electrical work.",
    } satisfies LocalizedText,
  },
  "astm-f1959": {
    id: "astm-f1959",
    name: "ASTM F1959",
    icon: "arc",
    description: {
      es: "Método de ensayo de arco eléctrico (ATPV / EBT) usado para calificar el desempeño térmico de la prenda.",
      en: "Electric-arc test method (ATPV / EBT) used to rate the garment's thermal performance.",
    } satisfies LocalizedText,
  },
  "nfpa-70e": {
    id: "nfpa-70e",
    name: "NFPA 70E",
    icon: "badge",
    description: {
      es: "Estándar de seguridad eléctrica que define las categorías de riesgo de arco (Arc Flash PPE).",
      en: "Electrical safety standard that defines arc-flash PPE risk categories.",
    } satisfies LocalizedText,
  },
  "cat-2": {
    id: "cat-2",
    name: "CAT 2",
    icon: "badge",
    description: {
      es: "Categoría de protección contra arco (NFPA 70E): valor de arco mínimo de 8 cal/cm².",
      en: "Arc-protection category (NFPA 70E): minimum arc rating of 8 cal/cm².",
    } satisfies LocalizedText,
  },
} as const satisfies Record<StandardId, Certification>;

export const standardsCatalog: Record<StandardId, Certification> = catalog;

export const standardsList: readonly Certification[] = standardIds.map((id) => catalog[id]);

export function isStandardId(value: string | null | undefined): value is StandardId {
  return Boolean(value && standardIds.some((id) => id === value));
}

export function canonicalizeStandardId(value: string): string {
  return standardIdAliases[value] ?? value;
}

export function getStandard(id: StandardId): Certification {
  return catalog[id];
}

export function getStandards(ids: readonly StandardId[]): Certification[] {
  return ids.map((id) => catalog[id]);
}

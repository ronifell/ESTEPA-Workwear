import { getStandards } from "@/data/standards";
import type { LocalizedText, ProductColor } from "@/types";

/**
 * Named tissues used across the catalogue.
 *
 * The oil & gas line is built on 88/12 cotton-nylon FR (7.5 oz) and inherent
 * aramid. `FRARTEX_FAMILY` is kept only so an old admin save still sanitizes.
 */

export const FRARTEX_FAMILY = "FRARTEX";

export const fabrics = {
  frartex: {
    id: "FR 88/12",
    name: "FR 88/12",
    code: "88% algodón / 12% nailon",
    weight: "7,5 oz",
    composition: {
      es: "88% algodón / 12% nailon",
      en: "88% cotton / 12% nylon",
    } satisfies LocalizedText,
    tooltip: {
      es: "Tejido FR de algodón y nailon 7,5 oz. Protección frente a llama y abrasión, con normas NFPA, ASTM y EN según cada prenda.",
      en: "7.5 oz cotton/nylon FR cloth. Flame and abrasion protection, with NFPA, ASTM and EN standards per garment.",
    } satisfies LocalizedText,
    shortDescription: {
      es: "Tejido FR de algodón y nailon de la línea de petróleo y gas. No se funde ni se adhiere a la piel frente a una fuente de calor.",
      en: "Cotton/nylon FR cloth of the oil and gas line. It does not melt or stick to the skin near a heat source.",
    } satisfies LocalizedText,
    description: {
      es: "La línea de petróleo y gas se construye sobre algodón/nailon FR 7,5 oz y, en las prendas inherentes, aramida 93/5/2. El algodón aporta confort en jornadas de yacimiento; el nailon suma resistencia a la abrasión. El comportamiento frente a la llama es del tejido: no depende de un acabado que se lave con el uso.",
      en: "The oil and gas line is built on 7.5 oz cotton/nylon FR and, for inherent garments, 93/5/2 aramid. Cotton keeps the garment wearable through long field days; nylon adds abrasion resistance. Flame behaviour is in the cloth: it does not depend on a finish that washes out.",
    } satisfies LocalizedText,
    properties: {
      es: [
        "Algodón / nailon FR 7,5 oz para camisas, overoles y pantalones",
        "Aramida inherente 4,5–6 oz donde se pide protección que no se lava",
        "Avíos, hilos y cintas FR según cada ficha",
        "Normas NFPA 2112, NFPA 70E, ASTM F1506 y EN ISO según el modelo",
      ],
      en: [
        "7.5 oz cotton/nylon FR for shirts, coveralls and trousers",
        "Inherent aramid 4.5–6 oz where wash-out protection is not acceptable",
        "FR trims, thread and tape per garment sheet",
        "NFPA 2112, NFPA 70E, ASTM F1506 and EN ISO standards by model",
      ],
    },
  },
} as const;

export const frartexColors: readonly ProductColor[] = [
  { id: "navy", name: { es: "Azul marino", en: "Navy" }, hex: "#1B2A4A" },
  { id: "orange", name: { es: "Naranja alta visibilidad", en: "High-visibility orange" }, hex: "#E85D04" },
  { id: "khaki", name: { es: "Khaki", en: "Khaki" }, hex: "#C4A574" },
  { id: "graphite", name: { es: "Grafito", en: "Graphite" }, hex: "#4A4F55" },
];

/** Standards associated with the 88/12 FR workwear line. */
export const frartexCertifications = getStandards([
  "nfpa-2112",
  "nfpa-70e",
  "astm-f1506",
  "cat-2",
  "ul",
  "en-11612",
  "en-1149",
]);

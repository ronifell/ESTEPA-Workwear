import { getStandards } from "@/data/standards";
import type { LocalizedText, ProductColor } from "@/types";

/**
 * Named tissues used across the catalogue.
 *
 * FRARTEX is the flame-resistant, antistatic fabric of the oil & gas line.
 * Composition and associated standards follow the manufacturer's catalog
 * presentation for this tissue (FRARTEX-2400AS).
 */

export const FRARTEX_FAMILY = "FRARTEX";

export const fabrics = {
  frartex: {
    id: FRARTEX_FAMILY,
    name: FRARTEX_FAMILY,
    code: "FRARTEX-2400AS",
    weight: "240 g/m² · 7 oz",
    composition: {
      es: "88% algodón, 10% nailon, 2% antiestático",
      en: "88% cotton, 10% nylon, 2% anti-static",
    } satisfies LocalizedText,
    tooltip: {
      es: "Tejido ignífugo de alto desempeño. 88% algodón / 10% nailon / 2% fibra antiestática · 240 g/m² (7 oz). Protección FR duradera a lavados industriales y disipación de carga estática.",
      en: "High-performance flame-resistant fabric. 88% cotton / 10% nylon / 2% antistatic fibre · 240 g/m² (7 oz). Durable FR protection through industrial laundering, with static-charge dissipation.",
    } satisfies LocalizedText,
    shortDescription: {
      es: "Tejido inherente ignífugo y antiestático de la línea de petróleo y gas. No se funde ni se adhiere a la piel frente a una fuente de calor.",
      en: "Inherent flame-resistant and antistatic fabric of the oil and gas line. It does not melt or stick to the skin near a heat source.",
    } satisfies LocalizedText,
    description: {
      es: "FRARTEX es el tejido técnico con el que ESTEPA construye la indumentaria de petróleo y gas. La base de algodón aporta confort en jornadas de yacimiento; el nailon suma resistencia a la abrasión; la fibra antiestática disipa la carga eléctrica del cuerpo. El comportamiento frente a la llama es inherente al tejido: no depende de un acabado que se lave con el uso.",
      en: "FRARTEX is the technical fabric ESTEPA uses to build oil and gas apparel. The cotton base keeps the garment wearable through long field days; nylon adds abrasion resistance; the antistatic fibre dissipates body charge. Flame behaviour is inherent to the cloth: it does not depend on a finish that washes out.",
    } satisfies LocalizedText,
    properties: {
      es: [
        "Resistencia inherente a la llama: no se funde ni gotea",
        "Fibra antiestática integrada en la trama",
        "Composición 88 / 10 / 2, 240 g/m² (7 oz)",
        "Desarrollado para campos de producción, plantas y workover",
      ],
      en: [
        "Inherent flame resistance: does not melt or drip",
        "Antistatic fibre woven into the cloth",
        "88 / 10 / 2 blend, 240 gsm (7 oz)",
        "Developed for production fields, plants and workover",
      ],
    },
  },
} as const;

export const frartexColors: readonly ProductColor[] = [
  { id: "navy", name: { es: "Azul marino", en: "Navy" }, hex: "#1B2A4A" },
  { id: "orange", name: { es: "Naranja alta visibilidad", en: "High-visibility orange" }, hex: "#E85D04" },
  { id: "khaki", name: { es: "Arena", en: "Khaki" }, hex: "#C4A574" },
  { id: "graphite", name: { es: "Grafito", en: "Graphite" }, hex: "#4A4F55" },
];

/** Standards associated with the FRARTEX line in the manufacturer's catalogue. */
export const frartexCertifications = getStandards([
  "en-11611",
  "en-11612",
  "en-1149",
  "en-61482",
  "ul",
  "nfpa-2112",
  "astm-f1506",
  "nfpa-70e",
  "cat-2",
]);

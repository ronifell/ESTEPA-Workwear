import type { Protection, ProtectionId } from "@/types";

/**
 * Protection categories.
 *
 * `standards` is deliberately empty for every entry: no norm, level or
 * certification may be published until the client or the manufacturer provides
 * the supporting documentation. The UI renders a "pending validation" state.
 */
export const protections: readonly Protection[] = [
  {
    id: "chemical",
    icon: "chemical",
    name: { es: "Protección química", en: "Chemical protection" },
    shortDescription: {
      es: "Para operaciones con exposición a sustancias y agentes industriales.",
      en: "For operations with exposure to industrial substances and agents.",
    },
    description: {
      es: "Prendas diseñadas para acompañar operaciones donde la exposición a sustancias y agentes industriales requiere una protección adecuada. La selección del material y de la construcción de la prenda depende del tipo de agente, de la concentración y del tiempo de exposición previsto en cada tarea.",
      en: "Garments designed to support operations where exposure to industrial substances and agents requires adequate protection. Material and construction choices depend on the type of agent, its concentration and the expected exposure time of each task.",
    },
    standards: [],
  },
  {
    id: "cut",
    icon: "cut",
    name: { es: "Protección contra cortes", en: "Cut protection" },
    shortDescription: {
      es: "Para tareas con riesgo de corte, abrasión y contacto con bordes filosos.",
      en: "For tasks with cut, abrasion and sharp-edge contact risks.",
    },
    description: {
      es: "Soluciones orientadas a tareas donde existe contacto con bordes filosos, chapas, herramientas de corte o materiales abrasivos. El nivel de protección requerido se define a partir del análisis de la tarea y del tipo de contacto esperado.",
      en: "Solutions aimed at tasks involving contact with sharp edges, metal sheets, cutting tools or abrasive materials. The required protection level is defined through task analysis and the type of contact expected.",
    },
    standards: [],
  },
  {
    id: "electrical",
    icon: "electrical",
    name: { es: "Riesgo eléctrico", en: "Electrical risk" },
    shortDescription: {
      es: "Para intervenciones sobre instalaciones y equipos energizados.",
      en: "For interventions on energised installations and equipment.",
    },
    description: {
      es: "Indumentaria pensada para tareas de mantenimiento e intervención en instalaciones donde existe riesgo eléctrico. Este tipo de protección requiere documentación técnica específica del fabricante, que se publica junto con cada producto una vez validada.",
      en: "Apparel intended for maintenance and intervention tasks in installations where electrical risk is present. This type of protection requires specific manufacturer documentation, published with each product once validated.",
    },
    standards: [],
  },
  {
    id: "flash-fire",
    icon: "flash-fire",
    name: { es: "Fuego repentino", en: "Flash fire" },
    shortDescription: {
      es: "Para entornos con riesgo de ignición momentánea.",
      en: "For environments with a momentary ignition risk.",
    },
    description: {
      es: "Prendas orientadas a entornos donde puede producirse una ignición momentánea, habituales en la industria del petróleo y el gas. El comportamiento del tejido frente a la llama es una característica que debe estar respaldada por ensayos del fabricante.",
      en: "Garments intended for environments where momentary ignition can occur, common in the oil and gas industry. Fabric behaviour when exposed to flame is a characteristic that must be backed by manufacturer testing.",
    },
    standards: [],
  },
  {
    id: "high-visibility",
    icon: "high-visibility",
    name: { es: "Alta visibilidad", en: "High visibility" },
    shortDescription: {
      es: "Para zonas con circulación de maquinaria y baja luminosidad.",
      en: "For areas with machinery traffic and low light.",
    },
    description: {
      es: "Indumentaria orientada a mejorar la detección visual del operario en zonas con circulación de vehículos y maquinaria, condiciones de baja luminosidad o presencia de polvo en suspensión. La superficie de material retrorreflectivo y su disposición se definen según la aplicación.",
      en: "Apparel designed to improve visual detection of workers in areas with vehicle and machinery traffic, low-light conditions or airborne dust. The retroreflective surface and its layout are defined according to the application.",
    },
    standards: [],
  },
];

export const protectionsById: Readonly<Record<ProtectionId, Protection>> =
  Object.fromEntries(
    protections.map((protection) => [protection.id, protection]),
  ) as Record<ProtectionId, Protection>;

export function getProtection(id: ProtectionId): Protection {
  return protectionsById[id];
}

import type { Sector, SectorId } from "@/types";

/**
 * Sector content. Copy describes purpose and application, never certification
 * levels — those are only published once the manufacturer supplies evidence.
 */
export const sectors: readonly Sector[] = [
  {
    id: "mining",
    routeKey: "mining",
    name: { es: "Minería", en: "Mining" },
    tagline: {
      es: "Jornadas extensas, ambientes abrasivos y visibilidad crítica.",
      en: "Long shifts, abrasive environments and critical visibility.",
    },
    heroTitle: {
      es: "Protección para los desafíos de la industria minera.",
      en: "Protection for the challenges of the mining industry.",
    },
    heroDescription: {
      es: "La minería combina jornadas prolongadas, condiciones climáticas cambiantes y operaciones con maquinaria pesada. La indumentaria tiene que acompañar al operario durante todo el turno sin comprometer la seguridad ni el confort.",
      en: "Mining combines long shifts, changing weather conditions and heavy machinery operations. Apparel has to support the worker throughout the entire shift without compromising safety or comfort.",
    },
    intro: {
      es: "Desarrollamos soluciones pensadas para operaciones mineras a cielo abierto y subterráneas, con foco en resistencia, visibilidad y comodidad durante turnos extendidos.",
      en: "We develop solutions designed for open-pit and underground mining operations, focused on resistance, visibility and comfort during extended shifts.",
    },
    image: "/images/sectors/mining.jpg",
    imageAlt: {
      es: "Operario minero con casco y ropa de alta visibilidad en una operación a cielo abierto",
      en: "Mining worker with helmet and high-visibility clothing at an open-pit operation",
    },
    needs: [
      {
        title: { es: "Visibilidad en obra", en: "Visibility on site" },
        description: {
          es: "Circulación permanente de maquinaria pesada y vehículos livianos en zonas con polvo en suspensión y baja luminosidad.",
          en: "Constant movement of heavy machinery and light vehicles in dusty, low-light areas.",
        },
      },
      {
        title: { es: "Abrasión y desgaste", en: "Abrasion and wear" },
        description: {
          es: "Contacto continuo con superficies rocosas, herramientas y estructuras que aceleran el deterioro de la prenda.",
          en: "Continuous contact with rock surfaces, tools and structures that accelerate garment wear.",
        },
      },
      {
        title: { es: "Amplitud térmica", en: "Temperature swings" },
        description: {
          es: "Diferencias marcadas de temperatura entre el inicio y el final del turno, especialmente en operaciones de altura.",
          en: "Sharp temperature differences between the start and the end of the shift, especially at high altitude.",
        },
      },
      {
        title: { es: "Turnos prolongados", en: "Extended shifts" },
        description: {
          es: "Jornadas largas que exigen prendas con buena transpirabilidad, libertad de movimiento y ajuste estable.",
          en: "Long working days requiring garments with good breathability, freedom of movement and a stable fit.",
        },
      },
    ],
    environments: {
      es: [
        "Operaciones a cielo abierto",
        "Minería subterránea",
        "Plantas de procesamiento",
        "Mantenimiento de equipos",
        "Logística y transporte interno",
      ],
      en: [
        "Open-pit operations",
        "Underground mining",
        "Processing plants",
        "Equipment maintenance",
        "Internal logistics and transport",
      ],
    },
    relatedProtections: ["high-visibility", "cut", "chemical"],
  },
  {
    id: "oil-gas",
    routeKey: "oilGas",
    name: { es: "Petróleo y Gas", en: "Oil & Gas" },
    tagline: {
      es: "Entornos energéticos con riesgos térmicos y eléctricos.",
      en: "Energy environments with thermal and electrical risks.",
    },
    heroTitle: {
      es: "Indumentaria preparada para entornos energéticos exigentes.",
      en: "Apparel prepared for demanding energy environments.",
    },
    heroDescription: {
      es: "Campos de producción, plantas de tratamiento y refinerías presentan riesgos específicos donde la elección de la indumentaria forma parte del sistema de seguridad de la operación.",
      en: "Production fields, treatment plants and refineries present specific risks where apparel selection is part of the operation's safety system.",
    },
    intro: {
      es: "Nuestra línea para petróleo y gas se construye sobre FRARTEX, un tejido inherente ignífugo y antiestático. Está orientada a operaciones donde conviven riesgos térmicos, eléctricos y de exposición a hidrocarburos, con requerimientos estrictos de identificación y visibilidad.",
      en: "Our oil and gas line is built on FRARTEX, an inherent flame-resistant and antistatic fabric. It targets operations where thermal, electrical and hydrocarbon exposure risks coexist, with strict identification and visibility requirements.",
    },
    image: "/images/sectors/oil-gas.jpg",
    imageAlt: {
      es: "Trabajador de la industria petrolera junto a instalaciones de producción",
      en: "Oil industry worker next to production facilities",
    },
    needs: [
      {
        title: { es: "Fuego repentino", en: "Flash fire" },
        description: {
          es: "Operaciones con presencia de hidrocarburos donde puede existir riesgo de ignición momentánea.",
          en: "Operations involving hydrocarbons where a momentary ignition risk may exist.",
        },
      },
      {
        title: { es: "Riesgo eléctrico", en: "Electrical risk" },
        description: {
          es: "Tareas de mantenimiento e intervención sobre equipos e instalaciones energizadas.",
          en: "Maintenance and intervention tasks on energised equipment and installations.",
        },
      },
      {
        title: { es: "Exposición a sustancias", en: "Substance exposure" },
        description: {
          es: "Contacto potencial con fluidos, lodos de perforación y agentes químicos propios del proceso.",
          en: "Potential contact with fluids, drilling muds and chemical agents inherent to the process.",
        },
      },
      {
        title: { es: "Identificación y visibilidad", en: "Identification and visibility" },
        description: {
          es: "Requisitos de visibilidad e identificación de personal en locaciones amplias y de operación continua.",
          en: "Visibility and personnel identification requirements across large, continuously operating sites.",
        },
      },
    ],
    environments: {
      es: [
        "Campos de producción",
        "Perforación y workover",
        "Plantas de tratamiento",
        "Refinerías",
        "Mantenimiento e inspección",
      ],
      en: [
        "Production fields",
        "Drilling and workover",
        "Treatment plants",
        "Refineries",
        "Maintenance and inspection",
      ],
    },
    relatedProtections: ["flash-fire", "electrical", "chemical", "high-visibility"],
  },
  {
    id: "industry",
    routeKey: "work",
    name: { es: "Trabajo e Industria", en: "Work & Industry" },
    tagline: {
      es: "Construcción, logística, operaciones y mantenimiento.",
      en: "Construction, logistics, operations and maintenance.",
    },
    heroTitle: {
      es: "Ropa de trabajo para operaciones industriales de todos los días.",
      en: "Workwear for everyday industrial operations.",
    },
    heroDescription: {
      es: "Cada actividad industrial tiene su propio perfil de riesgo. Nuestra línea general está pensada para equipos que necesitan prendas resistentes, cómodas y consistentes en el uso diario.",
      en: "Every industrial activity has its own risk profile. Our general line is designed for teams that need resistant, comfortable and consistent garments for daily use.",
    },
    intro: {
      es: "Soluciones para construcción, industria manufacturera, logística, operaciones y mantenimiento, con una estructura preparada para incorporar nuevos rubros a medida que la línea crece.",
      en: "Solutions for construction, manufacturing, logistics, operations and maintenance, with a structure ready to incorporate new segments as the line grows.",
    },
    image: "/images/sectors/industry.jpg",
    imageAlt: {
      es: "Equipo de trabajo industrial en una planta de producción",
      en: "Industrial work team in a production plant",
    },
    needs: [
      {
        title: { es: "Uso intensivo", en: "Intensive use" },
        description: {
          es: "Prendas sometidas a lavados frecuentes y a un uso diario que exige durabilidad en costuras y refuerzos.",
          en: "Garments subject to frequent washing and daily use that demands durability in seams and reinforcements.",
        },
      },
      {
        title: { es: "Movilidad", en: "Mobility" },
        description: {
          es: "Tareas manuales que requieren libertad de movimiento sin comprometer el ajuste ni la seguridad.",
          en: "Manual tasks requiring freedom of movement without compromising fit or safety.",
        },
      },
      {
        title: { es: "Identificación corporativa", en: "Corporate identification" },
        description: {
          es: "Necesidad de uniformidad visual y espacio para identificación de empresa y personal.",
          en: "The need for visual uniformity and space for company and personnel identification.",
        },
      },
      {
        title: { es: "Riesgos mixtos", en: "Mixed risks" },
        description: {
          es: "Combinación de riesgos mecánicos, tránsito de equipos y exposición ocasional a agentes industriales.",
          en: "A combination of mechanical risks, equipment traffic and occasional exposure to industrial agents.",
        },
      },
    ],
    environments: {
      es: [
        "Construcción",
        "Industria y manufactura",
        "Logística y depósitos",
        "Operaciones",
        "Mantenimiento",
      ],
      en: [
        "Construction",
        "Industry and manufacturing",
        "Logistics and warehousing",
        "Operations",
        "Maintenance",
      ],
    },
    relatedProtections: ["cut", "high-visibility", "chemical"],
  },
];

export const sectorsById: Readonly<Record<SectorId, Sector>> = Object.fromEntries(
  sectors.map((sector) => [sector.id, sector]),
) as Record<SectorId, Sector>;

export function getSector(id: SectorId): Sector {
  return sectorsById[id];
}

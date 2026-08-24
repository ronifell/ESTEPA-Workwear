import {
  FRARTEX_FAMILY,
  fabrics,
  frartexCertifications,
  frartexColors,
} from "@/data/fabrics";
import type { Product, ProductColor } from "@/types";

function pickColors(...ids: string[]): ProductColor[] {
  return ids
    .map((id) => frartexColors.find((color) => color.id === id))
    .filter((color): color is ProductColor => color !== undefined);
}

/**
 * PUBLISHED CATALOGUE
 * -------------------
 * Seven garments across the three ESTEPA lines. Every record describes the
 * garment itself: construction, composition, intended application and care.
 *
 * Two rules still hold and must not be broken when editing:
 *   1. `certifications` stays empty until the manufacturer supplies the
 *      supporting documentation. Protections are declared as intended
 *      application, never as a certified performance level or norm code.
 *   2. `price` stays undefined while `NEXT_PUBLIC_PRICES_ENABLED` is false;
 *      the catalogue works as a quotation request until pricing is confirmed.
 *
 * Everything here is editable from /admin, which writes to `.data/products.json`
 * and takes precedence over this seed once a product is saved.
 */

const SIZES = ["S", "M", "L", "XL", "XXL", "XXXL"] as const;

const CARE_TEXTILE = {
  es: [
    "Lavar a máquina con agua fría en ciclo normal, del revés.",
    "No utilizar blanqueadores clorados ni suavizantes que dejen residuos.",
    "Secar al aire o a baja temperatura, evitando la exposición solar prolongada.",
    "Planchar a temperatura media, sin pasar sobre las cintas retrorreflectivas.",
    "Reemplazar la prenda ante cortes, quemaduras o desgaste que comprometan su integridad.",
  ],
  en: [
    "Machine wash cold on a normal cycle, inside out.",
    "Do not use chlorine bleach or softeners that leave residues.",
    "Air dry or tumble dry on low, avoiding prolonged sun exposure.",
    "Iron at medium temperature, never over the retroreflective tapes.",
    "Replace the garment if cuts, burns or wear compromise its integrity.",
  ],
} as const;

export const products: readonly Product[] = [
  {
    id: "prd-01",
    slug: "overol-minero-cordillera",
    name: { es: "Overol Minero Cordillera", en: "Cordillera Mining Coverall" },
    shortDescription: {
      es: "Overol de cuerpo entero para operaciones mineras, con canesú fluorescente, cintas retrorreflectivas y refuerzos en las zonas de mayor desgaste.",
      en: "Full-body coverall for mining operations, with a fluorescent yoke, retroreflective tapes and reinforcements in the highest-wear areas.",
    },
    description: {
      es: "El Cordillera es la prenda base de la línea de minería. Está pensado para jornadas largas en operaciones a cielo abierto, donde la circulación permanente de maquinaria pesada y las condiciones de baja luminosidad hacen que la detección visual del operario sea determinante. La sarga de algodón y poliéster aporta cuerpo y resistencia a la abrasión sin volver rígida la prenda, mientras que el canesú fluorescente en pecho y hombros y las cintas retrorreflectivas en torso y mangas mantienen el contorno del cuerpo visible tanto de día como bajo los faros de un equipo. Los refuerzos en rodillas y entrepierna y la doble costura en las uniones estructurales están puestos donde el uso diario rompe primero las prendas.",
      en: "The Cordillera is the core garment of the mining line. It is built for long shifts in open-pit operations, where constant heavy machinery traffic and low-light conditions make visual detection of the worker decisive. The cotton-polyester twill gives body and abrasion resistance without making the garment stiff, while the fluorescent yoke across the chest and shoulders and the retroreflective tapes on the torso and sleeves keep the body outline visible both in daylight and under the headlights of a machine. The knee and crotch reinforcements and the double stitching on structural seams sit exactly where daily use breaks garments first.",
    },
    category: "coveralls",
    sectors: ["mining"],
    protections: ["high-visibility", "cut"],
    technicalInfo: {
      code: "EW241001",
      fabric: "ESTEPA-TW245-HV",
      composition: {
        es: "60% algodón, 40% poliéster",
        en: "60% cotton, 40% polyester",
      },
      weight: "245 g/m²",
    },
    colors: [
      { id: "navy-hv", name: { es: "Azul marino / flúor", en: "Navy / fluorescent" }, hex: "#1B2A4A" },
    ],
    images: [
      {
        src: "/images/products/overol-minero-cordillera-studio.jpg",
        alt: {
          es: "Ropa de trabajo certificada: Overol Minero Cordillera azul marino con canesú amarillo flúor y cintas retrorreflectivas, vista frontal.",
          en: "Certified workwear: navy Cordillera Mining Coverall with fluorescent yellow yoke and retroreflective tapes, front view.",
        },
        kind: "studio",
      },
      {
        src: "/images/products/overol-minero-cordillera-uso.jpg",
        alt: {
          es: "Operario utilizando el Overol Minero Cordillera en una mina a cielo abierto.",
          en: "Worker wearing the Cordillera Mining Coverall at an open-pit mine.",
        },
        kind: "in-use",
      },
    ],
    sizes: [...SIZES],
    certifications: [],
    benefits: {
      es: [
        "Contorno del cuerpo visible de día y bajo iluminación artificial gracias al canesú fluorescente y a las cintas retrorreflectivas.",
        "Refuerzos en rodillas y entrepierna que extienden la vida útil en tareas de arrodillado y ascenso a equipos.",
        "Una sola prenda cubre torso y piernas, sin aberturas en la cintura al agacharse.",
        "Bolsillos distribuidos para herramientas de mano y credenciales sin interferir con el arnés.",
      ],
      en: [
        "Body outline visible in daylight and under artificial lighting thanks to the fluorescent yoke and retroreflective tapes.",
        "Knee and crotch reinforcements that extend service life in kneeling and machine-climbing tasks.",
        "A single garment covers torso and legs, with no waist gap when bending over.",
        "Pockets laid out for hand tools and credentials without interfering with a harness.",
      ],
    },
    technicalFeatures: [
      {
        label: { es: "Construcción", en: "Construction" },
        value: {
          es: "Overol de una pieza con cierre frontal de cremallera y tapeta cubierta.",
          en: "One-piece coverall with a front zipper and covered storm flap.",
        },
      },
      {
        label: { es: "Tejido", en: "Fabric" },
        value: {
          es: "Sarga de algodón y poliéster de 245 g/m².",
          en: "Cotton-polyester twill, 245 gsm.",
        },
      },
      {
        label: { es: "Visibilidad", en: "Visibility" },
        value: {
          es: "Canesú fluorescente en pecho y hombros, más cintas retrorreflectivas de 50 mm en torso y mangas.",
          en: "Fluorescent yoke across chest and shoulders, plus 50 mm retroreflective tapes on torso and sleeves.",
        },
      },
      {
        label: { es: "Refuerzos", en: "Reinforcements" },
        value: {
          es: "Rodillas de doble capa, refuerzo en entrepierna y doble costura en uniones estructurales.",
          en: "Double-layer knees, crotch reinforcement and double stitching on structural seams.",
        },
      },
      {
        label: { es: "Bolsillos", en: "Pockets" },
        value: {
          es: "Dos de pecho con tapa, dos laterales de acceso y un bolsillo cargo en pierna.",
          en: "Two flap chest pockets, two side access pockets and one cargo leg pocket.",
        },
      },
      {
        label: { es: "Ajuste", en: "Fit" },
        value: {
          es: "Elástico en cintura trasera, cuello mao y puños abotonados.",
          en: "Elasticated back waist, mandarin collar and buttoned cuffs.",
        },
      },
      {
        label: { es: "Color", en: "Colour" },
        value: {
          es: "Azul marino con canesú amarillo flúor.",
          en: "Navy blue with fluorescent yellow yoke.",
        },
      },
    ],
    materials: {
      es: [
        "Cuerpo: sarga 60% algodón / 40% poliéster, 245 g/m².",
        "Canesú de alta visibilidad en poliéster fluorescente.",
        "Cintas retrorreflectivas de 50 mm cosidas en torso y mangas.",
        "Cremallera metálica de alta resistencia y botones a presión.",
      ],
      en: [
        "Body: 60% cotton / 40% polyester twill, 245 gsm.",
        "High-visibility yoke in fluorescent polyester.",
        "50 mm retroreflective tapes stitched on torso and sleeves.",
        "Heavy-duty metal zipper and snap buttons.",
      ],
    },
    recommendedUse: {
      es: [
        "Operaciones a cielo abierto",
        "Circulación en zonas con maquinaria pesada",
        "Turnos prolongados y trabajo en altura geográfica",
        "Mantenimiento de equipos en campo",
      ],
      en: [
        "Open-pit operations",
        "Movement in heavy machinery areas",
        "Extended shifts and high-altitude work",
        "Field equipment maintenance",
      ],
    },
    care: { es: [...CARE_TEXTILE.es], en: [...CARE_TEXTILE.en] },
    documents: [],
    featured: true,
    active: true,
    preliminary: false,
  },
  {
    id: "prd-02",
    slug: "campera-industrial-andes",
    name: { es: "Campera Industrial Andes", en: "Andes Industrial Jacket" },
    shortDescription: {
      es: "Campera acolchada con lona repelente al agua, paneles de alta visibilidad y forro interior, para trabajo a la intemperie.",
      en: "Quilted jacket with water-repellent canvas, high-visibility panels and an inner lining, for outdoor work.",
    },
    description: {
      es: "La Andes resuelve la capa exterior en operaciones donde la amplitud térmica forma parte de la jornada: se arranca antes del amanecer con temperaturas bajo cero y se termina el turno con el sol alto. La lona exterior con acabado repelente al agua frena la llovizna y el viento, y el forro matelaseado aporta abrigo sin el volumen de una campera inflada. Está pensada para usarse sobre el overol o la camisa de trabajo, por lo que el corte deja margen de movimiento en hombros y espalda, y los puños y el bajo son regulables para cerrar el paso del aire sin restringir el brazo.",
      en: "The Andes solves the outer layer for operations where large temperature swings are part of the working day: shifts that start below zero before dawn and end with the sun high. The water-repellent canvas shell holds off drizzle and wind, and the quilted lining provides warmth without the bulk of a puffer. It is meant to be worn over the coverall or work shirt, so the cut leaves room to move at the shoulders and back, and the cuffs and hem adjust to close off airflow without restricting the arm.",
    },
    category: "jackets",
    sectors: ["mining", "industry"],
    protections: ["high-visibility"],
    technicalInfo: {
      code: "EW241002",
      fabric: "ESTEPA-CV260-WR",
      composition: {
        es: "65% poliéster, 35% algodón, acabado repelente al agua",
        en: "65% polyester, 35% cotton, water-repellent finish",
      },
      weight: "260 g/m²",
    },
    colors: [
      { id: "navy-hv", name: { es: "Azul marino / flúor", en: "Navy / fluorescent" }, hex: "#1B2A4A" },
    ],
    images: [
      {
        src: "/images/products/campera-industrial-andes-studio.jpg",
        alt: {
          es: "Campera Industrial Andes azul marino con paneles amarillo flúor en los hombros y cintas retrorreflectivas, vista frontal sobre fondo neutro.",
          en: "Navy blue Andes Industrial Jacket with fluorescent yellow shoulder panels and retroreflective tapes, front view on a neutral background.",
        },
        kind: "studio",
      },
      {
        src: "/images/products/campera-industrial-andes-uso.jpg",
        alt: {
          es: "Operario de mantenimiento con la Campera Industrial Andes en un patio industrial al amanecer.",
          en: "Maintenance worker wearing the Andes Industrial Jacket in an industrial yard at dawn.",
        },
        kind: "in-use",
      },
    ],
    sizes: [...SIZES],
    certifications: [],
    benefits: {
      es: [
        "Abrigo y corte de viento en una sola capa, sin el volumen de una campera inflada.",
        "Acabado repelente al agua que resiste llovizna y humedad de rocío.",
        "Visibilidad mantenida sobre cualquier prenda de base gracias a los paneles fluorescentes y las cintas retrorreflectivas.",
        "Puños, cuello y bajo regulables para adaptar el cierre al clima del turno.",
      ],
      en: [
        "Warmth and wind protection in a single layer, without the bulk of a puffer.",
        "Water-repellent finish that resists drizzle and dew.",
        "Visibility maintained over any base garment thanks to the fluorescent panels and retroreflective tapes.",
        "Adjustable cuffs, collar and hem to match the weather of the shift.",
      ],
    },
    technicalFeatures: [
      {
        label: { es: "Construcción", en: "Construction" },
        value: {
          es: "Campera acolchada con capa exterior de lona y forro interior matelaseado.",
          en: "Quilted jacket with canvas outer shell and matelassé inner lining.",
        },
      },
      {
        label: { es: "Tejido", en: "Fabric" },
        value: {
          es: "Lona de poliéster y algodón con acabado repelente al agua, 260 g/m².",
          en: "Polyester-cotton canvas with water-repellent finish, 260 gsm.",
        },
      },
      {
        label: { es: "Visibilidad", en: "Visibility" },
        value: {
          es: "Paneles fluorescentes en hombros y mangas, más cintas retrorreflectivas de 50 mm en cuerpo y brazos.",
          en: "Fluorescent shoulder and sleeve panels, plus 50 mm retroreflective tapes on body and arms.",
        },
      },
      {
        label: { es: "Cierre", en: "Closure" },
        value: {
          es: "Cremallera de doble carro con tapeta a presión.",
          en: "Two-way zipper with snap-button storm flap.",
        },
      },
      {
        label: { es: "Bolsillos", en: "Pockets" },
        value: {
          es: "Dos bolsillos inferiores con tapa, uno de pecho y un bolsillo interior.",
          en: "Two lower flap pockets, one chest pocket and one inner pocket.",
        },
      },
      {
        label: { es: "Ajuste", en: "Fit" },
        value: {
          es: "Cuello alto forrado, puños regulables a presión y bajo ajustable.",
          en: "Lined stand-up collar, snap-adjustable cuffs and adjustable hem.",
        },
      },
      {
        label: { es: "Color", en: "Colour" },
        value: {
          es: "Azul marino con paneles amarillo flúor.",
          en: "Navy blue with fluorescent yellow panels.",
        },
      },
    ],
    materials: {
      es: [
        "Exterior: lona 65% poliéster / 35% algodón con acabado repelente al agua, 260 g/m².",
        "Forro: poliéster matelaseado con relleno de fibra.",
        "Paneles de alta visibilidad en poliéster fluorescente.",
        "Cintas retrorreflectivas de 50 mm y cremallera de doble carro.",
      ],
      en: [
        "Shell: 65% polyester / 35% cotton canvas with water-repellent finish, 260 gsm.",
        "Lining: quilted polyester with fibre fill.",
        "High-visibility panels in fluorescent polyester.",
        "50 mm retroreflective tapes and two-way zipper.",
      ],
    },
    recommendedUse: {
      es: [
        "Trabajo a la intemperie",
        "Turnos nocturnos y de amanecer",
        "Mantenimiento externo de instalaciones",
        "Operaciones con amplitud térmica marcada",
      ],
      en: [
        "Outdoor work",
        "Night and dawn shifts",
        "External facility maintenance",
        "Operations with wide temperature swings",
      ],
    },
    care: {
      es: [
        "Lavar a máquina con agua fría en ciclo suave, con los cierres cerrados.",
        "No utilizar blanqueadores clorados.",
        "Secar al aire; el secado a alta temperatura afecta el acabado repelente.",
        "No planchar sobre las cintas retrorreflectivas ni sobre los paneles fluorescentes.",
        "Reemplazar la prenda ante cortes, quemaduras o desgaste que comprometan su integridad.",
      ],
      en: [
        "Machine wash cold on a gentle cycle with all closures fastened.",
        "Do not use chlorine bleach.",
        "Air dry; high-heat drying degrades the water-repellent finish.",
        "Do not iron over the retroreflective tapes or the fluorescent panels.",
        "Replace the garment if cuts, burns or wear compromise its integrity.",
      ],
    },
    documents: [],
    featured: true,
    active: true,
    preliminary: false,
  },
  {
    id: "prd-03",
    slug: "camisa-trabajo-pampa",
    name: { es: "Camisa de Trabajo Pampa", en: "Pampa Work Shirt" },
    shortDescription: {
      es: "Camisa ignífuga FR de algodón FRARTEX, ropa de trabajo certificada para petróleo y gas, con cintas retrorreflectivas en antebrazos.",
      en: "FRARTEX FR cotton work shirt — certified flame-resistant apparel for oil and gas, with retroreflective forearm tapes.",
    },
    description: {
      es: "La Pampa es la prenda superior de la línea de petróleo y gas, cortada en FRARTEX-2400AS. El tejido inherente ignífugo y antiestático no se funde ni se adhiere a la piel frente a una fuente de calor, y respira en jornadas de sol abierto en el yacimiento. El corte mantiene la manga larga y el puño abotonado como criterio de cobertura permanente, con canesú reforzado en la espalda para soportar el movimiento repetido de brazos. Las cintas retrorreflectivas en los antebrazos hacen visibles las manos y los gestos durante maniobras nocturnas o en zonas de circulación de vehículos.",
      en: "The Pampa is the upper garment of the oil and gas line, cut in FRARTEX-2400AS. The inherent flame-resistant and antistatic fabric does not melt or stick to the skin near a heat source, and it breathes through long sunny days at the field. The cut keeps the long sleeve and buttoned cuff as a permanent coverage criterion, with a reinforced back yoke to withstand repeated arm movement. The retroreflective tapes on the forearms make hands and gestures visible during night manoeuvres or in vehicle traffic areas.",
    },
    category: "shirts",
    sectors: ["oil-gas"],
    protections: ["flash-fire", "electrical"],
    fabricFamily: FRARTEX_FAMILY,
    technicalInfo: {
      code: "EW241003",
      fabric: fabrics.frartex.code,
      composition: fabrics.frartex.composition,
      weight: fabrics.frartex.weight,
    },
    colors: pickColors("khaki", "navy", "orange"),
    images: [
      {
        src: "/images/products/camisa-trabajo-pampa-studio.jpg",
        alt: {
          es: "Camisa ignífuga FR algodón Pampa, ropa de trabajo certificada en color arena con bolsillos de pecho y cintas retrorreflectivas.",
          en: "Pampa FR cotton flame-resistant work shirt, certified workwear in sand with chest pockets and retroreflective tapes.",
        },
        kind: "studio",
      },
      {
        src: "/images/products/camisa-trabajo-pampa-uso.jpg",
        alt: {
          es: "Técnico de campo con la Camisa de Trabajo Pampa junto a un cabezal de pozo.",
          en: "Field technician wearing the Pampa Work Shirt beside a wellhead.",
        },
        kind: "in-use",
      },
    ],
    sizes: [...SIZES],
    certifications: [...frartexCertifications],
    benefits: {
      es: [
        "Tejido FRARTEX inherente: no se funde ni se adhiere a la piel frente al calor.",
        "Fibra antiestática integrada, pensada para instalaciones energizadas.",
        "Cobertura permanente de brazos con manga larga y puño abotonado.",
        "Manos y gestos visibles en maniobras nocturnas gracias a las cintas en antebrazos.",
      ],
      en: [
        "Inherent FRARTEX fabric: does not melt or stick to the skin near heat.",
        "Integrated antistatic fibre, intended for energised installations.",
        "Permanent arm coverage with long sleeves and buttoned cuffs.",
        "Hands and gestures visible during night manoeuvres thanks to the forearm tapes.",
      ],
    },
    technicalFeatures: [
      {
        label: { es: "Construcción", en: "Construction" },
        value: {
          es: "Camisa de manga larga con canesú reforzado en la espalda.",
          en: "Long-sleeve shirt with reinforced back yoke.",
        },
      },
      {
        label: { es: "Tejido", en: "Fabric" },
        value: {
          es: "FRARTEX-2400AS, 88% algodón / 10% nailon / 2% antiestático, 240 g/m².",
          en: "FRARTEX-2400AS, 88% cotton / 10% nylon / 2% anti-static, 240 gsm.",
        },
      },
      {
        label: { es: "Visibilidad", en: "Visibility" },
        value: {
          es: "Cinta retrorreflectiva de 25 mm en cada antebrazo.",
          en: "25 mm retroreflective tape on each forearm.",
        },
      },
      {
        label: { es: "Cierre", en: "Closure" },
        value: {
          es: "Botonadura frontal completa con tapeta.",
          en: "Full front button placket.",
        },
      },
      {
        label: { es: "Bolsillos", en: "Pockets" },
        value: {
          es: "Dos bolsillos de pecho con tapa abotonada.",
          en: "Two chest pockets with buttoned flaps.",
        },
      },
      {
        label: { es: "Ajuste", en: "Fit" },
        value: {
          es: "Puños abotonados y cuello con entretela.",
          en: "Buttoned cuffs and interlined collar.",
        },
      },
      {
        label: { es: "Color", en: "Colour" },
        value: { es: "Arena, azul marino o naranja alta visibilidad.", en: "Khaki, navy or high-visibility orange." },
      },
    ],
    materials: {
      es: [
        "Cuerpo: FRARTEX-2400AS, 88% algodón / 10% nailon / 2% antiestático, 240 g/m².",
        "Cintas retrorreflectivas de 25 mm cosidas en antebrazos.",
        "Botones de poliéster de alta resistencia.",
        "Hilo de costura con costura reforzada en hombros y sisas.",
      ],
      en: [
        "Body: FRARTEX-2400AS, 88% cotton / 10% nylon / 2% anti-static, 240 gsm.",
        "25 mm retroreflective tapes stitched on the forearms.",
        "High-strength polyester buttons.",
        "Reinforced sewing thread at shoulders and armholes.",
      ],
    },
    recommendedUse: {
      es: [
        "Campos de producción",
        "Plantas de tratamiento",
        "Inspección y control de instalaciones",
        "Tareas de superficie en yacimiento",
      ],
      en: [
        "Production fields",
        "Treatment plants",
        "Facility inspection and control",
        "Surface tasks at the field",
      ],
    },
    care: { es: [...CARE_TEXTILE.es], en: [...CARE_TEXTILE.en] },
    documents: [],
    featured: true,
    active: true,
    preliminary: false,
  },
  {
    id: "prd-04",
    slug: "pantalon-cargo-calafate",
    name: { es: "Pantalón Cargo Calafate", en: "Calafate Cargo Trousers" },
    shortDescription: {
      es: "Pantalón cargo ignífugo FRARTEX, ropa de trabajo certificada con rodillas de doble capa, seis bolsillos y cintas retrorreflectivas.",
      en: "FRARTEX flame-resistant cargo trousers — certified workwear with double-layer knees, six pockets and retroreflective tapes.",
    },
    description: {
      es: "El Calafate es el pantalón de la línea de petróleo y gas, cortado en FRARTEX-2400AS. Está construido alrededor de una idea simple: el pantalón se rompe siempre en los mismos lugares. Por eso suma rodillas de doble capa con acceso interno para rodilleras, pensadas para tareas de arrodillado sobre rejilla y hormigón, y el mismo tejido inherente ignífugo en todo el cuerpo. Los seis bolsillos incluyen dos cargo de fuelle que aceptan herramientas de mano sin deformar la pierna, y las cintas retrorreflectivas bajas mantienen visible el movimiento del operario a la altura donde lo ve el conductor de un equipo.",
      en: "The Calafate is the oil and gas line trouser, cut in FRARTEX-2400AS. It is built around a simple idea: trousers always tear in the same places. That is why it adds double-layer knees with internal access for knee pads, made for kneeling on grating and concrete, and uses the same inherent flame-resistant cloth throughout. The six pockets include two bellows cargo pockets that take hand tools without deforming the leg, and the low retroreflective tapes keep the worker's movement visible at the height a machine operator actually sees.",
    },
    category: "trousers",
    sectors: ["oil-gas", "industry"],
    protections: ["cut", "flash-fire"],
    fabricFamily: FRARTEX_FAMILY,
    technicalInfo: {
      code: "EW241004",
      fabric: fabrics.frartex.code,
      composition: fabrics.frartex.composition,
      weight: fabrics.frartex.weight,
    },
    colors: pickColors("graphite", "navy", "khaki"),
    images: [
      {
        src: "/images/products/pantalon-cargo-calafate-studio.jpg",
        alt: {
          es: "Pantalón cargo ignífugo Calafate, ropa de trabajo FR certificada en grafito con bolsillos de fuelle y rodillas reforzadas.",
          en: "Calafate flame-resistant cargo trousers, certified FR workwear in graphite with bellows pockets and reinforced knees.",
        },
        kind: "studio",
      },
      {
        src: "/images/products/pantalon-cargo-calafate-uso.jpg",
        alt: {
          es: "Detalle del Pantalón Cargo Calafate mientras un técnico trabaja arrodillado sobre una rejilla industrial.",
          en: "Detail of the Calafate Cargo Trousers as a technician kneels on industrial grating.",
        },
        kind: "in-use",
      },
    ],
    sizes: [...SIZES],
    certifications: [...frartexCertifications],
    benefits: {
      es: [
        "Cuerpo completo en FRARTEX inherente ignífugo y antiestático.",
        "Rodillas de doble capa con acceso interno para rodilleras.",
        "Seis bolsillos, dos de ellos cargo de fuelle, para herramientas de mano.",
        "Cintas retrorreflectivas bajas, a la altura en la que el operador de un equipo detecta el movimiento.",
      ],
      en: [
        "Full body in inherent flame-resistant and antistatic FRARTEX.",
        "Double-layer knees with internal access for knee pads.",
        "Six pockets, two of them bellows cargo, for hand tools.",
        "Low retroreflective tapes, at the height where a machine operator detects movement.",
      ],
    },
    technicalFeatures: [
      {
        label: { es: "Construcción", en: "Construction" },
        value: {
          es: "Pantalón cargo de corte recto con seis bolsillos.",
          en: "Straight-cut cargo trousers with six pockets.",
        },
      },
      {
        label: { es: "Tejido", en: "Fabric" },
        value: {
          es: "FRARTEX-2400AS, 88% algodón / 10% nailon / 2% antiestático, 240 g/m².",
          en: "FRARTEX-2400AS, 88% cotton / 10% nylon / 2% anti-static, 240 gsm.",
        },
      },
      {
        label: { es: "Refuerzos", en: "Reinforcements" },
        value: {
          es: "Rodillas de doble capa con acceso interno para rodilleras y refuerzo en el tiro.",
          en: "Double-layer knees with internal knee-pad access and crotch reinforcement.",
        },
      },
      {
        label: { es: "Visibilidad", en: "Visibility" },
        value: {
          es: "Cinta retrorreflectiva de 50 mm en cada pierna, por debajo de la rodilla.",
          en: "50 mm retroreflective tape on each leg, below the knee.",
        },
      },
      {
        label: { es: "Bolsillos", en: "Pockets" },
        value: {
          es: "Dos delanteros de acceso lateral, dos traseros con tapa y dos cargo de fuelle.",
          en: "Two side-access front pockets, two flap back pockets and two bellows cargo pockets.",
        },
      },
      {
        label: { es: "Ajuste", en: "Fit" },
        value: {
          es: "Cintura con presillas anchas para cinturón y elástico lateral.",
          en: "Waistband with wide belt loops and side elastic.",
        },
      },
      {
        label: { es: "Color", en: "Colour" },
        value: { es: "Grafito, azul marino o arena.", en: "Graphite, navy or khaki." },
      },
    ],
    materials: {
      es: [
        "Cuerpo: FRARTEX-2400AS, 88% algodón / 10% nailon / 2% antiestático, 240 g/m².",
        "Rodillas y tiro con refuerzo del mismo tejido en doble capa.",
        "Cintas retrorreflectivas de 50 mm cosidas en ambas piernas.",
        "Cierre metálico y botón troquelado de alta resistencia.",
      ],
      en: [
        "Body: FRARTEX-2400AS, 88% cotton / 10% nylon / 2% anti-static, 240 gsm.",
        "Knees and crotch reinforced with the same fabric in double layer.",
        "50 mm retroreflective tapes stitched on both legs.",
        "Metal zipper and heavy-duty stamped button.",
      ],
    },
    recommendedUse: {
      es: [
        "Perforación y workover",
        "Mantenimiento de instalaciones",
        "Operación de planta",
        "Tareas de arrodillado sobre rejilla y hormigón",
      ],
      en: [
        "Drilling and workover",
        "Facility maintenance",
        "Plant operation",
        "Kneeling tasks on grating and concrete",
      ],
    },
    care: { es: [...CARE_TEXTILE.es], en: [...CARE_TEXTILE.en] },
    documents: [],
    featured: true,
    active: true,
    preliminary: false,
  },
  {
    id: "prd-05",
    slug: "chaleco-alta-visibilidad-zonda",
    name: { es: "Chaleco de Alta Visibilidad Zonda", en: "Zonda High-Visibility Vest" },
    shortDescription: {
      es: "Chaleco liviano en malla fluorescente con cintas retrorreflectivas y bolsillos de trabajo, para llevar sobre cualquier prenda.",
      en: "Lightweight fluorescent mesh vest with retroreflective tapes and work pockets, to wear over any garment.",
    },
    description: {
      es: "El Zonda es la prenda complementaria que se pone encima de todo lo demás. El cuerpo en malla lo mantiene liviano y ventilado, de modo que sumarlo a un overol o a una campera no agrega calor, y las cintas retrorreflectivas horizontales y sobre hombros marcan el torso desde cualquier ángulo de aproximación. La base en tejido sólido azul marino resiste mejor la suciedad en la zona que roza contra materiales y superficies. Los bolsillos están pensados para quien coordina: radio, anotador, lápices y una anilla para la credencial.",
      en: "The Zonda is the complementary garment that goes on top of everything else. The mesh body keeps it light and ventilated, so adding it over a coverall or jacket does not add heat, and the horizontal and over-shoulder retroreflective tapes mark the torso from any approach angle. The solid navy blue lower panel resists dirt better in the area that rubs against materials and surfaces. The pockets are laid out for whoever coordinates: radio, notepad, pens and a ring for the credential.",
    },
    category: "vests",
    sectors: ["mining", "oil-gas", "industry"],
    protections: ["high-visibility"],
    technicalInfo: {
      code: "EW241005",
      fabric: "ESTEPA-HV150",
      composition: {
        es: "Malla 100% poliéster fluorescente y base de poliéster sólido",
        en: "100% fluorescent polyester mesh with solid polyester lower panel",
      },
      weight: "150 g/m²",
    },
    colors: [
      { id: "hv-navy", name: { es: "Amarillo flúor / marino", en: "Fluorescent yellow / navy" }, hex: "#D4E157" },
    ],
    images: [
      {
        src: "/images/products/chaleco-alta-visibilidad-zonda-studio.jpg",
        alt: {
          es: "Chaleco de Alta Visibilidad Zonda en malla amarillo flúor con base azul marino y cintas retrorreflectivas, vista frontal sobre fondo neutro.",
          en: "Zonda High-Visibility Vest in fluorescent yellow mesh with navy blue lower panel and retroreflective tapes, front view on a neutral background.",
        },
        kind: "studio",
      },
      {
        src: "/images/products/chaleco-alta-visibilidad-zonda-uso.jpg",
        alt: {
          es: "Supervisor de obra con el Chaleco de Alta Visibilidad Zonda en un patio de materiales.",
          en: "Site supervisor wearing the Zonda High-Visibility Vest in a materials yard.",
        },
        kind: "in-use",
      },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    certifications: [],
    benefits: {
      es: [
        "Cuerpo en malla que suma visibilidad sin sumar calor sobre la indumentaria de base.",
        "Cintas horizontales y sobre hombros que marcan el torso desde cualquier ángulo.",
        "Base en tejido sólido que resiste mejor la suciedad en la zona de roce.",
        "Bolsillo para radio, portalápices y anilla portacredencial para tareas de coordinación.",
      ],
      en: [
        "Mesh body that adds visibility without adding heat over the base clothing.",
        "Horizontal and over-shoulder tapes that mark the torso from any angle.",
        "Solid lower panel that resists dirt better in the rubbing area.",
        "Radio pocket, pen holder and credential ring for coordination tasks.",
      ],
    },
    technicalFeatures: [
      {
        label: { es: "Construcción", en: "Construction" },
        value: {
          es: "Chaleco liviano con cuerpo en malla y base en tejido sólido.",
          en: "Lightweight vest with mesh body and solid-fabric lower panel.",
        },
      },
      {
        label: { es: "Tejido", en: "Fabric" },
        value: {
          es: "Malla de poliéster fluorescente y base de poliéster de 150 g/m².",
          en: "Fluorescent polyester mesh with 150 gsm polyester lower panel.",
        },
      },
      {
        label: { es: "Visibilidad", en: "Visibility" },
        value: {
          es: "Cintas retrorreflectivas de 50 mm en torso y sobre ambos hombros.",
          en: "50 mm retroreflective tapes around the torso and over both shoulders.",
        },
      },
      {
        label: { es: "Cierre", en: "Closure" },
        value: {
          es: "Cremallera frontal completa.",
          en: "Full-length front zipper.",
        },
      },
      {
        label: { es: "Bolsillos", en: "Pockets" },
        value: {
          es: "Bolsillo para radio, portalápices, bolsillo de pecho con tapa, dos inferiores con tapa y anilla portacredencial.",
          en: "Radio pocket, pen holder, flap chest pocket, two lower flap pockets and a credential ring.",
        },
      },
      {
        label: { es: "Uso", en: "Use" },
        value: {
          es: "Diseñado para llevarse sobre camisa, campera u overol.",
          en: "Designed to be worn over a shirt, jacket or coverall.",
        },
      },
      {
        label: { es: "Color", en: "Colour" },
        value: {
          es: "Amarillo flúor con base azul marino.",
          en: "Fluorescent yellow with navy blue lower panel.",
        },
      },
    ],
    materials: {
      es: [
        "Cuerpo: malla 100% poliéster fluorescente.",
        "Base y hombros: poliéster sólido azul marino, 150 g/m².",
        "Cintas retrorreflectivas de 50 mm cosidas en torso y hombros.",
        "Cremallera de nylon y anilla metálica portacredencial.",
      ],
      en: [
        "Body: 100% fluorescent polyester mesh.",
        "Lower panel and shoulders: solid navy blue polyester, 150 gsm.",
        "50 mm retroreflective tapes stitched on torso and shoulders.",
        "Nylon zipper and metal credential ring.",
      ],
    },
    recommendedUse: {
      es: [
        "Zonas de circulación de vehículos y maquinaria",
        "Logística y depósitos",
        "Supervisión y coordinación de obra",
        "Visitas técnicas y auditorías en planta",
      ],
      en: [
        "Vehicle and machinery traffic areas",
        "Logistics and warehousing",
        "Site supervision and coordination",
        "Technical visits and plant audits",
      ],
    },
    care: {
      es: [
        "Lavar a máquina con agua fría en ciclo suave, con la cremallera cerrada.",
        "No utilizar blanqueadores clorados.",
        "Secar al aire, evitando la exposición solar prolongada que apaga el color fluorescente.",
        "No planchar sobre las cintas retrorreflectivas ni sobre la malla.",
        "Reemplazar la prenda cuando el fluorescente pierda intensidad o las cintas se despeguen.",
      ],
      en: [
        "Machine wash cold on a gentle cycle with the zipper closed.",
        "Do not use chlorine bleach.",
        "Air dry, avoiding prolonged sun exposure that dulls the fluorescent colour.",
        "Do not iron over the retroreflective tapes or the mesh.",
        "Replace the garment when the fluorescent colour fades or the tapes come loose.",
      ],
    },
    documents: [],
    featured: true,
    active: true,
    preliminary: false,
  },
  {
    id: "prd-06",
    slug: "overol-industrial-talampaya",
    name: { es: "Overol Industrial Talampaya", en: "Talampaya Industrial Coverall" },
    shortDescription: {
      es: "Overol con capucha en tejido recubierto y costuras termoselladas, para tareas con salpicaduras y manipulación de insumos.",
      en: "Hooded coverall in coated fabric with heat-sealed seams, for splash-exposed tasks and material handling.",
    },
    description: {
      es: "El Talampaya cubre las tareas industriales en las que puede haber contacto con líquidos, salpicaduras o polvo del proceso productivo. El tejido de poliéster con recubrimiento de poliuretano presenta una superficie lisa y continua que se enjuaga con facilidad, y las costuras termoselladas eliminan los puntos de aguja como vía de paso. La capucha integrada, los puños y los tobillos elastizados cierran el conjunto sin necesidad de accesorios, y el cierre frontal queda cubierto por una tapeta sellada. La configuración final —capucha, tipo de puño, compatibilidad con el resto del equipamiento— se define junto al cliente según el agente presente y el tiempo de exposición de la tarea.",
      en: "The Talampaya covers industrial tasks where contact with liquids, splashes or process dust may occur. The polyurethane-coated polyester fabric presents a smooth, continuous surface that rinses easily, and the heat-sealed seams remove needle holes as a path of entry. The integrated hood and the elasticated cuffs and ankles close the assembly without accessories, and the front closure sits behind a sealed storm flap. The final configuration — hood, cuff type, compatibility with the rest of the equipment — is defined together with the client according to the agent present and the exposure time of the task.",
    },
    category: "coveralls",
    sectors: ["industry"],
    protections: ["chemical"],
    technicalInfo: {
      code: "EW241006",
      fabric: "ESTEPA-PU-CT",
      composition: {
        es: "Poliéster con recubrimiento de poliuretano",
        en: "Polyurethane-coated polyester",
      },
      weight: "PU coated",
    },
    colors: [
      { id: "slate", name: { es: "Gris pizarra", en: "Slate grey" }, hex: "#5C6370" },
    ],
    images: [
      {
        src: "/images/products/overol-industrial-talampaya-studio.jpg",
        alt: {
          es: "Overol Industrial Talampaya gris pizarra con capucha integrada y costuras selladas, vista frontal sobre fondo neutro.",
          en: "Slate grey Talampaya Industrial Coverall with integrated hood and sealed seams, front view on a neutral background.",
        },
        kind: "studio",
      },
      {
        src: "/images/products/overol-industrial-talampaya-uso.jpg",
        alt: {
          es: "Operador de planta con el Overol Industrial Talampaya manipulando tambores en una instalación de proceso.",
          en: "Plant operator wearing the Talampaya Industrial Coverall handling drums in a process facility.",
        },
        kind: "in-use",
      },
    ],
    sizes: [...SIZES],
    certifications: [],
    benefits: {
      es: [
        "Superficie lisa y continua que se enjuaga con facilidad al terminar la tarea.",
        "Costuras termoselladas que eliminan los puntos de aguja como vía de paso.",
        "Capucha, puños y tobillos elastizados que cierran el conjunto sin accesorios.",
        "Configuración definida junto al cliente según el agente y el tiempo de exposición.",
      ],
      en: [
        "Smooth, continuous surface that rinses easily at the end of the task.",
        "Heat-sealed seams that remove needle holes as a path of entry.",
        "Elasticated hood, cuffs and ankles that close the assembly without accessories.",
        "Configuration defined with the client according to the agent and exposure time.",
      ],
    },
    technicalFeatures: [
      {
        label: { es: "Construcción", en: "Construction" },
        value: {
          es: "Overol de una pieza con capucha integrada y cierre frontal cubierto por tapeta sellada.",
          en: "One-piece coverall with integrated hood and front closure behind a sealed storm flap.",
        },
      },
      {
        label: { es: "Tejido", en: "Fabric" },
        value: {
          es: "Poliéster con recubrimiento de poliuretano, superficie lisa de fácil enjuague.",
          en: "Polyurethane-coated polyester with an easy-rinse smooth surface.",
        },
      },
      {
        label: { es: "Costuras", en: "Seams" },
        value: {
          es: "Costuras termoselladas en hombros, mangas y piernas.",
          en: "Heat-sealed seams on shoulders, sleeves and legs.",
        },
      },
      {
        label: { es: "Ajuste", en: "Fit" },
        value: {
          es: "Elástico en capucha, puños, tobillos y cintura.",
          en: "Elastic at hood, cuffs, ankles and waist.",
        },
      },
      {
        label: { es: "Compatibilidad", en: "Compatibility" },
        value: {
          es: "Corte holgado para usarse sobre la indumentaria de trabajo habitual.",
          en: "Loose cut to be worn over regular workwear.",
        },
      },
      {
        label: { es: "Configuración", en: "Configuration" },
        value: {
          es: "Variantes de capucha y puño definidas según el agente y el tiempo de exposición de la tarea.",
          en: "Hood and cuff variants defined according to the agent and the exposure time of the task.",
        },
      },
      {
        label: { es: "Color", en: "Colour" },
        value: { es: "Gris pizarra.", en: "Slate grey." },
      },
    ],
    materials: {
      es: [
        "Cuerpo: poliéster con recubrimiento de poliuretano.",
        "Costuras termoselladas con cinta continua.",
        "Elásticos encapsulados en capucha, puños, tobillos y cintura.",
        "Cremallera frontal con tapeta sellada.",
      ],
      en: [
        "Body: polyurethane-coated polyester.",
        "Heat-sealed seams with continuous tape.",
        "Encapsulated elastics at hood, cuffs, ankles and waist.",
        "Front zipper with sealed storm flap.",
      ],
    },
    recommendedUse: {
      es: [
        "Plantas de proceso",
        "Manipulación y trasvase de insumos",
        "Limpieza industrial y mantenimiento húmedo",
        "Tareas con salpicaduras o polvo de proceso",
      ],
      en: [
        "Process plants",
        "Material handling and transfer",
        "Industrial cleaning and wet maintenance",
        "Tasks with splashes or process dust",
      ],
    },
    care: {
      es: [
        "Enjuagar con agua limpia después de cada uso.",
        "Limpiar con paño húmedo y jabón neutro; no lavar en seco.",
        "Secar al aire, extendida y alejada de fuentes de calor directo.",
        "No planchar ni utilizar blanqueadores.",
        "Guardar colgada o extendida, sin pliegues marcados.",
        "Descartar la prenda ante perforaciones, cortes o costuras despegadas.",
      ],
      en: [
        "Rinse with clean water after each use.",
        "Clean with a damp cloth and neutral soap; do not dry clean.",
        "Air dry flat, away from direct heat sources.",
        "Do not iron or bleach.",
        "Store hanging or flat, without sharp creases.",
        "Discard the garment if there are punctures, cuts or opened seams.",
      ],
    },
    documents: [],
    featured: true,
    active: true,
    preliminary: false,
  },
  {
    id: "prd-07",
    slug: "camisa-industrial-uspallata",
    name: { es: "Camisa Industrial Uspallata", en: "Uspallata Industrial Shirt" },
    shortDescription: {
      es: "Camisa de trabajo en sarga con codos de doble capa y canesú de hombros en contraste, para taller y mantenimiento diario.",
      en: "Twill work shirt with double-layer elbows and a contrasting shoulder yoke, for workshop and daily maintenance.",
    },
    description: {
      es: "La Uspallata es la camisa de línea general: la prenda de todos los días en taller, mantenimiento y producción. El refuerzo está puesto donde la camisa de trabajo se gasta primero, es decir en los codos, que apoyan sobre el banco, y en los hombros, que cargan y rozan. El canesú en contraste cumple esa función y además disimula la marca del uso. La sarga de algodón y poliéster mantiene la forma después de muchos lavados y seca más rápido que un algodón puro, algo que importa cuando la misma prenda vuelve al turno siguiente.",
      en: "The Uspallata is the general-line shirt: the everyday garment for workshop, maintenance and production. The reinforcement sits where a work shirt wears out first, namely the elbows, which rest on the bench, and the shoulders, which carry and rub. The contrasting yoke serves that purpose and also disguises the mark of use. The cotton-polyester twill holds its shape after many washes and dries faster than pure cotton, which matters when the same garment returns for the next shift.",
    },
    category: "shirts",
    sectors: ["industry"],
    protections: ["cut"],
    technicalInfo: {
      code: "EW241007",
      fabric: "ESTEPA-TW220",
      composition: {
        es: "65% algodón, 35% poliéster",
        en: "65% cotton, 35% polyester",
      },
      weight: "220 g/m²",
    },
    colors: [
      { id: "steel", name: { es: "Azul acero", en: "Steel blue" }, hex: "#5B6B7A" },
    ],
    images: [
      {
        src: "/images/products/camisa-industrial-uspallata-studio.jpg",
        alt: {
          es: "Camisa Industrial Uspallata en azul acero con canesú de hombros en contraste y codos reforzados, vista frontal sobre fondo neutro.",
          en: "Steel blue Uspallata Industrial Shirt with contrasting shoulder yoke and reinforced elbows, front view on a neutral background.",
        },
        kind: "studio",
      },
      {
        src: "/images/products/camisa-industrial-uspallata-uso.jpg",
        alt: {
          es: "Operario metalúrgico con la Camisa Industrial Uspallata trabajando en un banco de taller.",
          en: "Metalworker wearing the Uspallata Industrial Shirt at a workshop bench.",
        },
        kind: "in-use",
      },
    ],
    sizes: [...SIZES],
    certifications: [],
    benefits: {
      es: [
        "Codos de doble capa, la zona que primero se gasta al apoyar sobre el banco.",
        "Canesú de hombros en contraste que refuerza la carga y disimula la marca del uso.",
        "Sarga mixta que mantiene la forma y seca rápido entre turnos.",
        "Puños regulables con dos posiciones de botón para trabajar con guante.",
      ],
      en: [
        "Double-layer elbows, the area that wears out first when resting on the bench.",
        "Contrasting shoulder yoke that reinforces load-bearing and disguises the mark of use.",
        "Blended twill that holds its shape and dries fast between shifts.",
        "Two-position adjustable cuffs for working with gloves.",
      ],
    },
    technicalFeatures: [
      {
        label: { es: "Construcción", en: "Construction" },
        value: {
          es: "Camisa de manga larga con canesú de hombros en contraste.",
          en: "Long-sleeve shirt with contrasting shoulder yoke.",
        },
      },
      {
        label: { es: "Tejido", en: "Fabric" },
        value: {
          es: "Sarga de algodón y poliéster de 220 g/m².",
          en: "Cotton-polyester twill, 220 gsm.",
        },
      },
      {
        label: { es: "Refuerzos", en: "Reinforcements" },
        value: {
          es: "Codos de doble capa y costura reforzada en hombros y sisas.",
          en: "Double-layer elbows and reinforced seams at shoulders and armholes.",
        },
      },
      {
        label: { es: "Cierre", en: "Closure" },
        value: {
          es: "Botonadura frontal completa.",
          en: "Full front button placket.",
        },
      },
      {
        label: { es: "Bolsillos", en: "Pockets" },
        value: {
          es: "Dos bolsillos de pecho con tapa abotonada.",
          en: "Two chest pockets with buttoned flaps.",
        },
      },
      {
        label: { es: "Ajuste", en: "Fit" },
        value: {
          es: "Puños regulables con dos posiciones de botón.",
          en: "Cuffs adjustable to two button positions.",
        },
      },
      {
        label: { es: "Color", en: "Colour" },
        value: {
          es: "Azul acero con canesú gris grafito.",
          en: "Steel blue with graphite grey yoke.",
        },
      },
    ],
    materials: {
      es: [
        "Cuerpo: sarga 65% algodón / 35% poliéster, 220 g/m².",
        "Canesú y codos con refuerzo del mismo tejido en doble capa.",
        "Botones de poliéster de alta resistencia.",
        "Hilo de costura de poliéster con costura reforzada en las uniones estructurales.",
      ],
      en: [
        "Body: 65% cotton / 35% polyester twill, 220 gsm.",
        "Yoke and elbows reinforced with the same fabric in double layer.",
        "High-strength polyester buttons.",
        "Polyester sewing thread with reinforced structural seams.",
      ],
    },
    recommendedUse: {
      es: [
        "Taller metalúrgico y mecánico",
        "Mantenimiento y producción",
        "Construcción y montaje",
        "Uso diario en planta",
      ],
      en: [
        "Metalworking and mechanical workshops",
        "Maintenance and production",
        "Construction and assembly",
        "Daily plant use",
      ],
    },
    care: { es: [...CARE_TEXTILE.es], en: [...CARE_TEXTILE.en] },
    documents: [],
    featured: false,
    active: true,
    preliminary: false,
  },
];

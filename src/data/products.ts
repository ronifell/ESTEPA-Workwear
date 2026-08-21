import type { Product } from "@/types";

/**
 * PLACEHOLDER CATALOGUE
 * ---------------------
 * The definitive products arrive with the samples. Every record below is
 * structural: generic naming, no invented certifications, no invented
 * materials, no invented prices.
 *
 * To publish a real product:
 *   1. Replace `name`, `shortDescription` and `description`.
 *   2. Fill `technicalFeatures`, `materials`, `benefits` and `care`.
 *   3. Add `certifications` only with manufacturer documentation.
 *   4. Add `price` (and `currency`) and set `NEXT_PUBLIC_PRICES_ENABLED=true`.
 *   5. Add real images to `/public/images/products` and list them in `images`.
 *   6. Set `preliminary: false`.
 */

const PRELIMINARY_SIZES = ["S", "M", "L", "XL", "XXL"] as const;

export const products: readonly Product[] = [
  {
    id: "prd-01",
    slug: "producto-tecnico-01",
    name: { es: "Producto técnico 01", en: "Technical product 01" },
    shortDescription: {
      es: "Overol de trabajo orientado a operaciones mineras con requerimientos de visibilidad.",
      en: "Work coverall intended for mining operations with visibility requirements.",
    },
    description: {
      es: "Prenda de cuerpo entero pensada para operaciones mineras donde la circulación de maquinaria y las condiciones de baja luminosidad hacen que la detección visual del operario sea determinante. Su construcción está orientada al uso intensivo durante turnos prolongados.",
      en: "Full-body garment designed for mining operations where machinery traffic and low-light conditions make visual detection of the worker decisive. Its construction is oriented towards intensive use during long shifts.",
    },
    category: "coveralls",
    sectors: ["mining"],
    protections: ["high-visibility", "cut"],
    images: [],
    sizes: [...PRELIMINARY_SIZES],
    certifications: [],
    benefits: { es: [], en: [] },
    technicalFeatures: [],
    materials: { es: [], en: [] },
    recommendedUse: {
      es: ["Operaciones a cielo abierto", "Circulación en zonas con maquinaria", "Turnos prolongados"],
      en: ["Open-pit operations", "Movement in machinery areas", "Extended shifts"],
    },
    care: { es: [], en: [] },
    documents: [],
    featured: true,
    active: true,
    preliminary: true,
  },
  {
    id: "prd-02",
    slug: "producto-tecnico-02",
    name: { es: "Producto técnico 02", en: "Technical product 02" },
    shortDescription: {
      es: "Campera de trabajo para condiciones climáticas cambiantes en operaciones industriales.",
      en: "Work jacket for changing weather conditions in industrial operations.",
    },
    description: {
      es: "Capa exterior orientada a operaciones donde la amplitud térmica y las condiciones climáticas cambiantes forman parte de la jornada. Pensada para combinarse con el resto de la indumentaria sin restringir el movimiento.",
      en: "Outer layer intended for operations where temperature swings and changing weather are part of the working day. Designed to be combined with the rest of the apparel without restricting movement.",
    },
    category: "jackets",
    sectors: ["mining", "industry"],
    protections: ["high-visibility"],
    images: [],
    sizes: [...PRELIMINARY_SIZES],
    certifications: [],
    benefits: { es: [], en: [] },
    technicalFeatures: [],
    materials: { es: [], en: [] },
    recommendedUse: {
      es: ["Operaciones de altura", "Trabajo a la intemperie", "Mantenimiento externo"],
      en: ["High-altitude operations", "Outdoor work", "External maintenance"],
    },
    care: { es: [], en: [] },
    documents: [],
    featured: true,
    active: true,
    preliminary: true,
  },
  {
    id: "prd-03",
    slug: "producto-tecnico-03",
    name: { es: "Producto técnico 03", en: "Technical product 03" },
    shortDescription: {
      es: "Camisa de trabajo para entornos de petróleo y gas con requerimientos térmicos.",
      en: "Work shirt for oil and gas environments with thermal requirements.",
    },
    description: {
      es: "Prenda superior desarrollada para operaciones de la industria energética, donde conviven requerimientos de identificación del personal y protección frente a riesgos térmicos y eléctricos.",
      en: "Upper garment developed for energy industry operations, where personnel identification requirements coexist with protection against thermal and electrical risks.",
    },
    category: "shirts",
    sectors: ["oil-gas"],
    protections: ["flash-fire", "electrical"],
    images: [],
    sizes: [...PRELIMINARY_SIZES],
    certifications: [],
    benefits: { es: [], en: [] },
    technicalFeatures: [],
    materials: { es: [], en: [] },
    recommendedUse: {
      es: ["Campos de producción", "Plantas de tratamiento", "Inspección y control"],
      en: ["Production fields", "Treatment plants", "Inspection and control"],
    },
    care: { es: [], en: [] },
    documents: [],
    featured: true,
    active: true,
    preliminary: true,
  },
  {
    id: "prd-04",
    slug: "producto-tecnico-04",
    name: { es: "Producto técnico 04", en: "Technical product 04" },
    shortDescription: {
      es: "Pantalón de trabajo para operaciones energéticas de campo y planta.",
      en: "Work trousers for field and plant energy operations.",
    },
    description: {
      es: "Pantalón orientado a tareas de campo y planta en la industria del petróleo y el gas. Su desarrollo prioriza la resistencia en zonas de mayor desgaste y la compatibilidad con el resto del equipamiento de protección.",
      en: "Trousers aimed at field and plant tasks in the oil and gas industry. Development prioritises resistance in high-wear areas and compatibility with the rest of the protective equipment.",
    },
    category: "trousers",
    sectors: ["oil-gas"],
    protections: ["flash-fire"],
    images: [],
    sizes: [...PRELIMINARY_SIZES],
    certifications: [],
    benefits: { es: [], en: [] },
    technicalFeatures: [],
    materials: { es: [], en: [] },
    recommendedUse: {
      es: ["Perforación y workover", "Mantenimiento de instalaciones", "Operación de planta"],
      en: ["Drilling and workover", "Facility maintenance", "Plant operation"],
    },
    care: { es: [], en: [] },
    documents: [],
    featured: true,
    active: true,
    preliminary: true,
  },
  {
    id: "prd-05",
    slug: "producto-tecnico-05",
    name: { es: "Producto técnico 05", en: "Technical product 05" },
    shortDescription: {
      es: "Overol industrial para tareas con exposición a agentes químicos.",
      en: "Industrial coverall for tasks with exposure to chemical agents.",
    },
    description: {
      es: "Solución de cuerpo entero para tareas industriales en las que puede existir contacto con sustancias o agentes propios del proceso productivo. La configuración final se define según el tipo de agente y el tiempo de exposición.",
      en: "Full-body solution for industrial tasks where contact with substances or agents from the production process may occur. The final configuration is defined by the type of agent and the exposure time.",
    },
    category: "coveralls",
    sectors: ["industry"],
    protections: ["chemical"],
    images: [],
    sizes: [...PRELIMINARY_SIZES],
    certifications: [],
    benefits: { es: [], en: [] },
    technicalFeatures: [],
    materials: { es: [], en: [] },
    recommendedUse: {
      es: ["Plantas de proceso", "Manipulación de insumos", "Limpieza industrial"],
      en: ["Process plants", "Material handling", "Industrial cleaning"],
    },
    care: { es: [], en: [] },
    documents: [],
    featured: true,
    active: true,
    preliminary: true,
  },
  {
    id: "prd-06",
    slug: "producto-tecnico-06",
    name: { es: "Producto técnico 06", en: "Technical product 06" },
    shortDescription: {
      es: "Chaleco de alta visibilidad para uso sobre la indumentaria de trabajo.",
      en: "High-visibility vest for use over standard workwear.",
    },
    description: {
      es: "Prenda complementaria pensada para incrementar la detección visual del operario en zonas de circulación de vehículos y maquinaria, tanto en operaciones mineras como en entornos industriales y logísticos.",
      en: "Complementary garment designed to increase visual detection of workers in vehicle and machinery traffic areas, in mining operations as well as industrial and logistics environments.",
    },
    category: "vests",
    sectors: ["mining", "industry"],
    protections: ["high-visibility"],
    images: [],
    sizes: [...PRELIMINARY_SIZES],
    certifications: [],
    benefits: { es: [], en: [] },
    technicalFeatures: [],
    materials: { es: [], en: [] },
    recommendedUse: {
      es: ["Zonas de circulación", "Logística y depósitos", "Visitas a obra"],
      en: ["Traffic areas", "Logistics and warehousing", "Site visits"],
    },
    care: { es: [], en: [] },
    documents: [],
    featured: true,
    active: true,
    preliminary: true,
  },
  {
    id: "prd-07",
    slug: "producto-tecnico-07",
    name: { es: "Producto técnico 07", en: "Technical product 07" },
    shortDescription: {
      es: "Pantalón de trabajo reforzado para uso industrial diario.",
      en: "Reinforced work trousers for daily industrial use.",
    },
    description: {
      es: "Pantalón de línea general orientado a construcción, mantenimiento y operaciones industriales, con foco en la durabilidad de las zonas expuestas a mayor desgaste durante el uso diario.",
      en: "General-line trousers aimed at construction, maintenance and industrial operations, focused on durability in the areas exposed to the most wear during daily use.",
    },
    category: "trousers",
    sectors: ["industry"],
    protections: ["cut"],
    images: [],
    sizes: [...PRELIMINARY_SIZES],
    certifications: [],
    benefits: { es: [], en: [] },
    technicalFeatures: [],
    materials: { es: [], en: [] },
    recommendedUse: {
      es: ["Construcción", "Mantenimiento", "Operaciones industriales"],
      en: ["Construction", "Maintenance", "Industrial operations"],
    },
    care: { es: [], en: [] },
    documents: [],
    featured: false,
    active: true,
    preliminary: true,
  },
];

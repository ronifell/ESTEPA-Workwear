/**
 * Copy for the admin panel.
 *
 * The panel is an internal tool, so it ships in a single language (Spanish,
 * the default locale of the site) instead of going through the public i18n
 * dictionaries. Keeping the strings here means the UI files stay free of
 * hard-coded text, same rule as the storefront.
 */
export const adminCopy = {
  brand: "Panel de administración",
  signedInAs: "Sesión activa",
  logout: "Cerrar sesión",
  viewSite: "Ver sitio",

  nav: {
    products: "Productos",
    newProduct: "Nuevo producto",
  },

  notFound: {
    title: "No encontramos esa página",
    description: "El producto pudo haber sido eliminado o la dirección no existe.",
    cta: "Volver al catálogo",
  },

  login: {
    title: "Acceso al panel",
    subtitle: "Ingresá con las credenciales configuradas en el archivo de entorno.",
    email: "Correo electrónico",
    password: "Contraseña",
    submit: "Ingresar",
    submitting: "Verificando…",
    invalid: "Las credenciales no son correctas.",
    rateLimited: "Demasiados intentos. Esperá unos minutos antes de reintentar.",
    unexpected: "No se pudo completar el acceso. Reintentá en unos instantes.",
    notConfiguredTitle: "Panel sin credenciales configuradas",
    notConfigured:
      "Definí ADMIN_EMAIL y ADMIN_PASSWORD (o ADMIN_USERS) en el archivo .env y reiniciá el servidor para habilitar el acceso.",
  },

  list: {
    title: "Catálogo",
    subtitle: "Productos publicados y borradores del sitio.",
    newProduct: "Cargar producto",
    empty: "Todavía no hay productos en el catálogo.",
    columns: {
      product: "Producto",
      category: "Categoría",
      sectors: "Sectores",
      price: "Precio",
      state: "Estado",
      actions: "Acciones",
    },
    edit: "Editar",
    delete: "Eliminar",
    deleting: "Eliminando…",
    deleteConfirm: (name: string) =>
      `¿Eliminar "${name}"? El producto se quita del catálogo y de la web.`,
    deleteError: "No se pudo eliminar el producto.",
    noPrice: "A confirmar",
    states: {
      active: "Publicado",
      inactive: "Oculto",
      featured: "Destacado",
      preliminary: "Preliminar",
    },
    seedNoticeTitle: "Catálogo inicial de ejemplo",
    seedNotice:
      "Estás viendo el catálogo preliminar incluido con el proyecto. Al guardar el primer cambio se crea .data/products.json y ese archivo pasa a ser la fuente de datos del sitio.",
  },

  form: {
    createTitle: "Nuevo producto",
    createSubtitle: "Cargá la información del producto. Sólo el bloque principal es obligatorio.",
    editTitle: "Editar producto",
    editSubtitle: "Los cambios se publican en el sitio al guardar.",
    back: "Volver al catálogo",
    save: "Guardar producto",
    saving: "Guardando…",
    saved: "Producto guardado.",
    localeEs: "Español",
    localeEn: "Inglés",
    localeFallbackHint: "Si dejás el inglés vacío se usa el texto en español.",
    onePerLine: "Un elemento por línea.",

    sections: {
      identity: { title: "Identificación", description: "Cómo se nombra y se enlaza el producto." },
      content: { title: "Textos", description: "Nombre y descripciones que se muestran en el sitio." },
      classification: {
        title: "Clasificación",
        description: "Determina en qué listados y filtros aparece el producto.",
      },
      commercial: {
        title: "Datos comerciales",
        description: "El precio sólo se muestra en el sitio si la visualización de precios está habilitada.",
      },
      images: { title: "Imágenes", description: "Sin imágenes el sitio muestra una silueta técnica." },
      specs: { title: "Especificaciones", description: "Los bloques vacíos se muestran como “pendiente” en el sitio." },
      certifications: {
        title: "Certificaciones",
        description: "Cargá una norma solo si contás con la documentación del fabricante.",
      },
      documents: {
        title: "Documentación",
        description: "Ficha técnica, certificados y guías de cuidado descargables.",
      },
      variants: {
        title: "Variantes (opcional)",
        description: "Referencia interna de SKU, color y stock por talle.",
      },
      publication: { title: "Publicación", description: "Visibilidad del producto en el sitio." },
    },

    fields: {
      id: "Identificador interno",
      idHint: "Se usa en el carrito y en los pedidos. No se puede repetir.",
      slug: "Slug (URL)",
      slugHint: "Define la dirección del producto: /productos/mi-slug",
      name: "Nombre",
      shortDescription: "Descripción corta",
      shortDescriptionHint: "Se muestra en el listado y en los resultados de búsqueda.",
      description: "Descripción completa",
      category: "Categoría",
      sectors: "Sectores",
      sectorsHint: "Seleccioná al menos uno.",
      protections: "Tipos de protección",
      price: "Precio",
      priceHint: "Dejalo vacío para mostrar “Precio a confirmar”.",
      currency: "Moneda",
      sizes: "Talles",
      sizesHint: "Separados por coma. Ejemplo: S, M, L, XL",
      benefits: "Beneficios",
      technicalFeatures: "Características técnicas",
      materials: "Materiales",
      recommendedUse: "Uso recomendado",
      care: "Cuidado y mantenimiento",
      featured: "Destacado en la portada",
      active: "Visible en el sitio",
      preliminary: "Contenido preliminar",
      preliminaryHint:
        "Mientras esté activo, el sitio aclara que las especificaciones están pendientes de confirmación.",
    },

    images: {
      add: "Agregar imagen",
      empty: "Sin imágenes cargadas.",
      src: "Archivo o URL",
      alt: "Texto alternativo",
      altHint: "Describe la imagen para lectores de pantalla.",
      kind: "Tipo de toma",
      kinds: {
        studio: "Estudio",
        "in-use": "En uso",
        detail: "Detalle",
        material: "Material",
      },
    },

    features: {
      add: "Agregar característica",
      empty: "Sin características técnicas.",
      label: "Característica",
      value: "Valor",
    },

    certifications: {
      add: "Agregar certificación",
      empty: "Sin certificaciones declaradas.",
      id: "Código",
      name: "Nombre de la norma",
      description: "Alcance",
      logo: "Logo (opcional)",
    },

    documents: {
      add: "Agregar documento",
      empty: "Sin documentos cargados.",
      id: "Identificador",
      label: "Título",
      type: "Tipo",
      url: "Archivo o URL",
      urlHint: "Si lo dejás vacío, el sitio lo muestra como “próximamente disponible”.",
      types: {
        "technical-sheet": "Ficha técnica",
        certificate: "Certificado",
        "care-guide": "Guía de cuidado",
        other: "Otro",
      },
    },

    variants: {
      add: "Agregar variante",
      empty: "Sin variantes cargadas.",
      sku: "SKU",
      size: "Talle",
      color: "Color",
      price: "Precio",
      stock: "Stock",
      available: "Disponible",
    },

    upload: {
      image: "Subir imagen",
      document: "Subir archivo",
      uploading: "Subiendo…",
      tooLarge: "El archivo supera el tamaño máximo permitido.",
      unsupported: "Formato no admitido. Usá JPG, PNG, WebP o AVIF para imágenes y PDF para documentos.",
      failed: "No se pudo subir el archivo.",
      readOnly:
        "El servidor no permite escribir archivos. Subí la imagen por otro medio y pegá su ruta.",
    },

    remove: "Quitar",
    errors: {
      validation: "Revisá los campos marcados.",
      duplicateId: "Ya existe un producto con este identificador.",
      duplicateSlug: "Ya existe un producto con este slug.",
      storage:
        "No se pudo escribir el catálogo en el disco. Verificá los permisos de escritura del servidor.",
      unauthorized: "La sesión expiró. Volvé a ingresar.",
      unexpected: "No se pudo guardar el producto. Reintentá en unos instantes.",
      notFound: "El producto ya no existe.",
    },
  },

  /** Zod messages and API error codes translated for the editor. */
  fieldErrors: {
    required: "Campo obligatorio",
    min_length: "Demasiado corto",
    max_length: "Demasiado largo",
    invalid_identifier: "Usá minúsculas, números y guiones",
    invalid_path: "Debe empezar con / o con http",
    min_one_sector: "Seleccioná al menos un sector",
    duplicate: "Ya está en uso",
    fallback: "Valor no válido",
  },
} as const;

export function translateFieldError(message: string | undefined): string | undefined {
  if (!message) return undefined;
  const known = adminCopy.fieldErrors as Record<string, string>;
  return known[message] ?? adminCopy.fieldErrors.fallback;
}

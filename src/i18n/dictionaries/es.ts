/**
 * Spanish dictionary — source of truth for the `Dictionary` type.
 * Every other language file must implement exactly the same shape.
 */
export const es = {
  common: {
    brandTagline: "Indumentaria técnica y ropa de trabajo",
    viewProducts: "Ver productos",
    viewProduct: "Ver producto",
    viewAll: "Ver todo",
    contactUs: "Contactarnos",
    requestInformation: "Solicitar información",
    talkToAdvisor: "Hablar con un asesor",
    learnMore: "Conocer nuestras soluciones",
    explore: "Explorar",
    back: "Volver",
    loading: "Cargando…",
    optional: "opcional",
    required: "obligatorio",
    skipToContent: "Ir al contenido principal",
    preliminaryContent: "Contenido preliminar",
    comingSoon: "Próximamente",
    quantity: "Cantidad",
    increase: "Aumentar cantidad",
    decrease: "Reducir cantidad",
    remove: "Eliminar",
    close: "Cerrar",
    previous: "Anterior",
    next: "Siguiente",
    sector: "Sector",
    sectors: "Sectores",
    protection: "Protección",
    protections: "Protecciones",
    category: "Categoría",
    downloadCatalog: "Descargar catálogo",
    catalogPending: "El catálogo en PDF estará disponible próximamente.",
  },

  nav: {
    home: "Inicio",
    mining: "Minería",
    oilGas: "Petróleo y Gas",
    work: "Trabajo",
    products: "Productos",
    protection: "Certificaciones",
    faq: "Preguntas frecuentes",
    faqShort: "Preguntas",
    about: "Nosotros",
    catalog: "Catálogo",
    contact: "Contacto",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    mainNavigation: "Navegación principal",
    cart: "Carrito",
    cartItems: "Artículos en el carrito",
    language: "Idioma",
    changeLanguage: "Cambiar idioma",
    solutions: "Soluciones",
  },

  home: {
    hero: {
      eyebrow: "Ropa de trabajo certificada",
      title: "Ropa de trabajo certificada para una verdadera protección.",
      titleLead: "Vendemos ropa de trabajo",
      titleAccent: "certificada para minería, petróleo e industria.",
      description:
        "Overoles, camisas, pantalones y camperas FR y antiestáticos, con normas internacionales —NFPA, UL, ASTM, EN ISO—. Diseño argentino, estándares globales.",
      imageAlt:
        "Ropa ignífuga certificada ESTEPA: operario industrial con indumentaria de trabajo FR y equipo de protección",
      scroll: "Descubrir más",
      productRail: "Prendas de la línea",
    },
    highlights: {
      certified: {
        title: "Enfoque en seguridad",
        description: "Cada solución se selecciona pensando en el riesgo real de la operación.",
      },
      industry: {
        title: "Diseñado para la industria",
        description: "Prendas pensadas para jornadas largas y ambientes exigentes.",
      },
      quality: {
        title: "Calidad y durabilidad",
        description: "Materiales orientados a la resistencia y al uso intensivo.",
      },
      support: {
        title: "Atención especializada",
        description: "Asesoramiento técnico antes y después de la compra.",
      },
    },
    industries: {
      eyebrow: "Sectores",
      title: "Soluciones para cada entorno de trabajo",
      description:
        "Cada industria enfrenta riesgos distintos. Nuestras líneas se organizan según las necesidades reales de cada operación.",
    },
    protections: {
      eyebrow: "Tipos de protección",
      title: "Protección para cada riesgo",
      description:
        "Identificar correctamente el riesgo es el primer paso para elegir la indumentaria adecuada.",
      cta: "Ver todas las protecciones",
    },
    featured: {
      eyebrow: "Ropa de trabajo",
      title: "El catálogo ESTEPA",
      description:
        "Overoles, camisas, pantalones y camperas para minería, petróleo y gas e industria.",
      cta: "Ver catálogo completo",
    },
    certifications: {
      eyebrow: "Ropa certificada",
      title: "¿Por qué certificada?",
      description:
        "Una certificación no es un logo: es la prueba de que la prenda fue ensayada por un laboratorio independiente y cumple un estándar de protección medible.",
      note: "Los certificados y reportes de ensayo se entregan en el proceso de homologación.",
      cta: "Ver certificaciones",
      placeholderTitle: "Normas internacionales",
      placeholderDescription:
        "NFPA 2112, UL Certified, ASTM F1506, EN ISO 11612, EN 1149 y más, según la línea.",
    },
    corporate: {
      eyebrow: "Nosotros",
      title: "Preparados para los entornos que exigen más.",
      description:
        "ESTEPA Workwear nace con un objetivo claro: acompañar la seguridad de quienes trabajan en entornos industriales exigentes. Trabajamos con foco en la especialización, la calidad de los materiales y la atención a las necesidades concretas de cada operación.",
      points: {
        specialization: {
          title: "Especialización",
          description:
            "Trabajamos exclusivamente en indumentaria orientada a entornos industriales.",
        },
        quality: {
          title: "Calidad",
          description:
            "Selección de materiales orientada a la durabilidad y al uso intensivo.",
        },
        safety: {
          title: "Enfoque en seguridad",
          description:
            "Cada decisión de producto parte del riesgo que enfrenta el operario.",
        },
        service: {
          title: "Atención industrial",
          description:
            "Acompañamiento técnico y comercial para empresas y contratistas.",
        },
      },
      cta: "Conocer ESTEPA",
    },
    faq: {
      eyebrow: "Ayuda",
      title: "Preguntas frecuentes",
      description: "Talles, lavado, certificaciones y cómo pedir una cotización.",
      cta: "Ver todas las preguntas",
    },
    cta: {
      title: "Encontrá la protección adecuada para tu operación.",
      description:
        "Contanos las características de tu operación y te ayudamos a definir la indumentaria más adecuada.",
    },
  },

  sectorPage: {
    eyebrow: "Sector",
    needsTitle: "Riesgos y necesidades",
    needsDescription:
      "Los puntos que consideramos al definir una solución de indumentaria para este sector.",
    environmentsTitle: "Entornos de aplicación",
    solutionsTitle: "Soluciones ESTEPA",
    solutionsDescription:
      "Tipos de protección que orientan el desarrollo de nuestra línea para este sector.",
    technicalTitle: "Características técnicas",
    technicalDescription:
      "Esta sección presentará los materiales, construcciones y especificaciones de cada solución una vez confirmada la documentación técnica del fabricante.",
    technicalPlaceholder: "Información técnica en preparación",
    frartex: {
      eyebrow: "Tejido de la línea",
      standards: "Normas de la línea FRARTEX",
      cta: "Ver productos de petróleo y gas",
    },
    productsTitle: "Productos recomendados",
    productsDescription: "Soluciones de nuestro catálogo asociadas a este sector.",
    ctaTitle: "¿Necesitás asesoramiento para tu operación?",
    ctaDescription:
      "Nuestro equipo puede ayudarte a definir la indumentaria adecuada según los riesgos de tu actividad.",
  },

  products: {
    title: "Productos",
    eyebrow: "Catálogo",
    description:
      "Catálogo de indumentaria técnica organizada por sector y por tipo de protección.",
    filters: {
      title: "Buscar prenda",
      openFilters: "Filtrar",
      closeFilters: "Cerrar menú",
      hideFilters: "Ocultar filtros",
      pillarsLead: "Elegí en este orden",
      sector: "Sector",
      sectorHint: "¿En qué entorno trabaja el equipo?",
      protection: "Tipo de protección",
      protectionHint: "¿Qué riesgo tiene que cubrir la prenda?",
      category: "Categoría",
      standard: "Normas",
      standardHint: "¿Qué norma pide tu operación?",
      step: "Paso {n}",
      all: "Todos",
      clear: "Limpiar filtros",
      apply: "Aplicar",
      activeFilters: "Filtros activos",
    },
    results: {
      one: "1 producto",
      many: "{count} productos",
      none: "Sin resultados",
    },
    empty: {
      title: "Nuevas soluciones en preparación.",
      description:
        "No encontramos productos con los filtros seleccionados. Probá ajustando la búsqueda o consultanos directamente.",
      cta: "Consultar disponibilidad",
    },
    categories: {
      coveralls: "Overoles",
      jackets: "Camperas",
      trousers: "Pantalones",
      shirts: "Camisas",
      vests: "Chalecos",
    },
  },

  product: {
    breadcrumbProducts: "Productos",
    gallery: "Galería del producto",
    thumbnail: "Ver imagen {index}",
    galleryPrevious: "Imagen anterior",
    galleryNext: "Imagen siguiente",
    galleryStatus: "Imagen {current} de {total}",
    priceOnRequest: "Precio a confirmar",
    priceNote: "Solicitá una cotización y te enviamos la información comercial.",
    selectSize: "Seleccionar talle",
    findMySize: "Encontrar mi talle",
    sizeRequired: "Elegí un talle para continuar.",
    sizesTitle: "Talles disponibles",
    sizeGuide: "Guía de talles",
    sizeGuideNote:
      "Las medidas de corte (A–D) están en la ficha técnica. Los centímetros definitivos se confirman con el fabricante.",
    addToCart: "Agregar al carrito",
    addToRequest: "Agregar a la solicitud",
    added: "Agregado al carrito",
    goToCart: "Ir al carrito",
    outOfStock: "Sin stock",
    stockAvailable: "Disponible",
    stockPending: "Disponibilidad a confirmar",
    overview: "Descripción",
    benefits: "Principales beneficios",
    technical: "Características técnicas",
    protectionAndCertifications: "Protección y certificaciones",
    materials: "Materiales",
    recommendedUse: "Uso recomendado",
    care: "Cuidado del producto",
    documents: "Documentación",
    documentsPending: "Documentación próximamente disponible",
    documentsPendingDescription:
      "Los certificados de ensayo se publicarán cuando el fabricante los proporcione.",
    related: "Productos relacionados",
    intendedApplication: "Aplicación prevista",
    solutionsLabel: "Solución",
    overlayCerts: "Certificaciones",
    technicalSheet: "Información técnica",
    standards: "Normas",
    colors: "Colores",
    frartexBadge: "Tejido {name}",
    preliminaryTitle: "Ficha técnica en preparación",
    preliminaryDescription:
      "Este producto forma parte de la línea inicial de ESTEPA. Las especificaciones técnicas, materiales y certificaciones se publicarán una vez completada la validación con el fabricante.",
    notFound: "No encontramos el producto que estás buscando.",
    datasheet: "Ficha técnica",
    datasheetTitle: "Ficha técnica — {name}",
    datasheetPrint: "Imprimir / guardar PDF",
    datasheetBack: "Volver al producto",
    datasheetLine: "Línea {name}",
    datasheetFeatures: "Características",
    datasheetCare: "Cuidados",
    datasheetSizeChart: "Tabla de talles",
    datasheetSizeUnit: "Talle · cm",
    datasheetCutTitle: "Medidas de corte",
    datasheetMeasurementsPending:
      "Las celdas quedan en blanco hasta que el fabricante entregue la tabla de corte en centímetros. No publicamos medidas estimadas.",
    datasheetDiagramCaption: "Croquis de la prenda con puntos de medida A, B, C y D.",
    datasheetCertificatesPending:
      "Los certificados de ensayo se entregan en el proceso de homologación.",
    datasheetOpen: "Ver ficha técnica",
    sizeMeasures: {
      shoulder: "Ancho de hombro",
      chest: "Ancho de pecho",
      sleeve: "Largo de manga",
      length: "Largo total",
      waist: "Cintura",
      hip: "Cadera",
      inseam: "Entrepierna",
      hem: "Ancho de bajo",
    },
    sizeSimulator: {
      title: "Asistente de talle",
      subtitle:
        "Ingresá tus medidas en centímetros. El asistente cruza pecho, cintura, cadera y largo de brazo con la tabla de talles de trabajo y te muestra los cuidados de lavado de esta prenda.",
      badge: "Asistente",
      howToTitle: "Cómo medir",
      howToNote: "Las tallas se refieren a medidas corporales, no a las dimensiones de la prenda.",
      unit: "cm",
      unitOnly: "Solo cm",
      chest: "Pecho",
      chestHelp: "Alrededor del pecho, justo debajo de los brazos y cruzando los omóplatos.",
      waist: "Cintura",
      waistHelp: "Alrededor de la parte más estrecha del torso.",
      hip: "Cadera",
      hipHelp: "Alrededor del punto más ancho de las caderas.",
      arm: "Largo de brazo",
      armHelp: "Desde el centro de la nuca, cruzando el hombro, hasta la muñeca.",
      analyze: "Recomendar talle",
      analyzing: "Analizando medidas…",
      resultTitle: "Talle recomendado",
      resultExact: "{size} cubre tus medidas con holgura de trabajo.",
      resultBetween:
        "Estás entre {a} y {b}. Para indumentaria de trabajo recomendamos {size}, con holgura para movimiento y capas.",
      resultOff: "El talle más cercano a tus medidas es {size}. Si trabajás con capas, consultanos.",
      resultNone: "No encontramos un talle con estas medidas. Escribinos y te ayudamos.",
      applySize: "Usar este talle",
      chartTitle: "Tabla de talles",
      chartCaption: "Medidas corporales de referencia en centímetros, no dimensiones de corte.",
      careTitle: "Cuidados de lavado",
      reset: "Volver a medir",
      missing: "Completá al menos pecho o cintura.",
      sizeCol: "Talle",
      confidenceHigh: "Ajuste preciso",
      confidenceMid: "Ajuste orientativo",
      confidenceLow: "Consultar asesor",
    },
  },

  protectionPage: {
    eyebrow: "Protección",
    title: "Certificaciones y tipos de protección",
    description:
      "Elegir la indumentaria adecuada empieza por entender el riesgo. En minería, petróleo y gas la ropa es equipo de protección personal (EPP): si falla, se pone en riesgo a una persona.",
    disclaimerTitle: "Documentación de ensayo",
    disclaimerDescription:
      "Los sellos indican las normas asociadas a cada línea. Los certificados y reportes de laboratorio se entregan en el proceso de homologación de operadoras y contratistas.",
    standardsTitle: "Normas aplicables",
    standardsPending: "Normas en proceso de validación",
    relatedProductsTitle: "Productos relacionados",
    noRelatedProducts: "Aún no hay productos publicados para esta categoría.",
    howWeWorkTitle: "Cómo seleccionamos cada solución",
    steps: {
      one: {
        title: "Análisis del riesgo",
        description:
          "Identificamos las condiciones reales de la operación y los riesgos a los que se expone el equipo.",
      },
      two: {
        title: "Definición del requerimiento",
        description:
          "Traducimos ese riesgo en requisitos concretos de material, construcción y protección.",
      },
      three: {
        title: "Validación con documentación",
        description:
          "Contrastamos cada requisito con la documentación técnica del fabricante antes de recomendar una solución.",
      },
    },
  },

  faqPage: {
    eyebrow: "Ayuda",
    title: "Preguntas frecuentes",
    description:
      "Respuestas sobre la ropa que vendemos, cómo elegir talle, cómo lavar las prendas y qué significan las certificaciones.",
    items: [
      {
        q: "¿Qué ropa vende ESTEPA?",
        a: "Ropa de trabajo técnica: overoles, camisas, pantalones, camperas y chalecos para minería, petróleo y gas e industria. El catálogo está organizado por sector, tipo de protección y norma.",
      },
      {
        q: "¿Qué significa que una prenda está certificada?",
        a: "Una certificación es el ensayo de un laboratorio independiente que verifica que el tejido cumple una norma medible (NFPA, UL, ASTM, EN ISO). No es un logo decorativo: es la prueba de que la prenda fue evaluada para un riesgo concreto.",
      },
      {
        q: "¿Cómo elijo el talle correcto?",
        a: "En cada ficha está el asistente de talle. Ingresás pecho, cintura, cadera y largo de brazo en centímetros —son medidas del cuerpo, no de la prenda— y te recomendamos el talle con holgura de trabajo. La tabla está solo en cm.",
      },
      {
        q: "¿Cómo se lava la ropa ignífuga?",
        a: "Del revés, en agua fría o a 30 °C, sin cloro ni suavizantes que dejen residuos. Secar al aire o a baja temperatura y no planchar sobre las cintas retrorreflectivas. Cada prenda muestra sus cuidados en la ficha y en el asistente de talle.",
      },
      {
        q: "¿Las normas aplican a todas las prendas?",
        a: "No. Cada línea y cada tejido tiene su propio set. Las prendas FRARTEX publican las normas asociadas; en el resto, las certificaciones se muestran cuando el fabricante entrega la documentación de ensayo.",
      },
      {
        q: "¿Cuál es la diferencia entre las tres líneas?",
        a: "Minería está pensada para visibilidad y abrasión en jornadas largas. Petróleo y gas se construye sobre FRARTEX, ignífugo y antiestático. Trabajo e industria cubre el uso diario en construcción, logística y mantenimiento.",
      },
      {
        q: "¿Cómo pido una cotización?",
        a: "Agregá prendas al carrito o escribinos desde Contacto. Un asesor confirma disponibilidad, plazos y precio. Las solicitudes del sitio no son una compra cerrada hasta esa confirmación.",
      },
      {
        q: "¿Hacen envíos a todo el país?",
        a: "Sí. Llegamos a todo el país, con foco en las cuencas mineras y energéticas. Si tu operación está en otra provincia, evaluamos el caso según el volumen y las necesidades del proyecto.",
      },
      {
        q: "¿Puedo personalizar las prendas con el logo de la empresa?",
        a: "Sí. Bordado o identificación corporativa se cotiza aparte y las condiciones se aclaran antes de confirmar el pedido.",
      },
    ],
  },

  about: {
    eyebrow: "Nosotros",
    title: "Una marca creada para acompañar la seguridad industrial.",
    intro:
      "ESTEPA Workwear es una marca de indumentaria técnica y ropa de trabajo orientada a sectores donde la seguridad del operario es determinante.",
    missionTitle: "Nuestra misión",
    missionDescription:
      "Proporcionar soluciones de indumentaria de trabajo orientadas a acompañar la seguridad en entornos industriales exigentes.",
    approachTitle: "Nuestro enfoque",
    approachDescription:
      "Trabajamos sobre cuatro ejes que definen cada decisión de producto.",
    approach: {
      safety: {
        title: "Seguridad",
        description: "El riesgo real de la operación es el punto de partida.",
      },
      quality: {
        title: "Calidad",
        description: "Materiales y construcción orientados al uso intensivo.",
      },
      specialization: {
        title: "Especialización",
        description: "Foco exclusivo en indumentaria para entornos industriales.",
      },
      service: {
        title: "Atención a la industria",
        description: "Acompañamiento a empresas, contratistas y equipos de seguridad.",
      },
    },
    sectorsTitle: "Sectores en los que trabajamos",
    coverageTitle: "Cobertura",
    coverageDescription:
      "Llegamos a todo el país, con foco en las cuencas mineras y energéticas.",
    coverageStatement:
      "Llegamos a todo el país, con foco en las cuencas mineras y energéticas.",
    coverageNote:
      "Consultanos por operaciones en otras provincias: evaluamos cada caso según el volumen y las necesidades del proyecto.",
    historyTitle: "Nuestra historia",
    historyPlaceholder:
      "Esta sección está reservada para el relato de origen de ESTEPA Workwear. El contenido lo completa el equipo comercial.",
    historyNote: "Texto y fotografías en preparación.",
    ctaTitle: "Trabajemos juntos en la seguridad de tu equipo.",
    ctaDescription:
      "Escribinos y coordinamos una conversación con un asesor técnico.",
  },

  catalogPage: {
    eyebrow: "Catálogo digital",
    title: "Catálogo ESTEPA Workwear",
    description:
      "Recorré nuestras líneas organizadas por sector, tipo de protección y categoría de producto.",
    downloadTitle: "Catálogo en PDF",
    downloadDescription:
      "Una versión descargable estará disponible cuando el contenido definitivo esté listo.",
    bySectorTitle: "Por sector",
    byProtectionTitle: "Por tipo de protección",
    byCategoryTitle: "Por categoría de producto",
    productsInSection: "Productos",
    viewSection: "Ver productos",
    updatingTitle: "Catálogo en actualización",
    updatingDescription:
      "Estamos incorporando nuevas soluciones. Si buscás un producto específico, escribinos.",
  },

  contact: {
    eyebrow: "Contacto",
    title: "Hablemos sobre tu operación",
    description:
      "Contanos qué necesitás y un asesor se pondrá en contacto para ayudarte a definir la indumentaria adecuada.",
    formTitle: "Solicitar información",
    infoTitle: "Datos de contacto",
    infoPending: "Los datos de contacto se publicarán próximamente.",
    responseTitle: "Tiempo de respuesta",
    responseDescription:
      "Respondemos las consultas comerciales dentro del horario laboral, de lunes a viernes.",
    fields: {
      name: "Nombre y apellido",
      company: "Empresa",
      role: "Cargo",
      email: "Email",
      phone: "Teléfono",
      region: "Provincia / Región",
      sector: "Sector",
      message: "Mensaje",
    },
    placeholders: {
      name: "Ej. Juan Pérez",
      company: "Ej. Minera del Sur S.A.",
      role: "Ej. Jefe de Seguridad e Higiene",
      email: "nombre@empresa.com",
      phone: "+54 ...",
      region: "Seleccioná una provincia",
      sector: "Seleccioná un sector",
      message: "Contanos sobre tu operación, cantidad estimada y necesidades de protección.",
    },
    sectorOptions: {
      mining: "Minería",
      oilGas: "Petróleo y Gas",
      industry: "Industria",
      other: "Otro",
    },
    submit: "Enviar consulta",
    submitting: "Enviando…",
    successTitle: "Consulta enviada",
    successDescription:
      "Recibimos tu mensaje. Un asesor se pondrá en contacto a la brevedad.",
    errorTitle: "No pudimos enviar la consulta",
    unavailable:
      "El servicio de envío todavía no está configurado. Escribinos por los canales de contacto publicados.",
  },

  cart: {
    title: "Carrito",
    titleRequest: "Solicitud de productos",
    empty: {
      title: "Tu carrito está vacío",
      description: "Explorá el catálogo y agregá los productos que necesitás.",
      cta: "Ver productos",
    },
    item: "artículo",
    items: "artículos",
    product: "Producto",
    size: "Talle",
    unitPrice: "Precio unitario",
    lineTotal: "Subtotal",
    subtotal: "Subtotal",
    shipping: "Envío",
    shippingNote: "A coordinar",
    total: "Total",
    totalPending: "A confirmar",
    priceNote:
      "Los precios se confirman junto con la cotización. Enviá tu solicitud y te respondemos con la información comercial.",
    continueShopping: "Seguir comprando",
    checkout: "Continuar",
    checkoutRequest: "Solicitar cotización",
    removeItem: "Eliminar {product} del carrito",
    miniCartTitle: "Tu carrito",
    viewCart: "Ver carrito",
    summary: "Resumen",
  },

  checkout: {
    title: "Finalizar solicitud",
    steps: {
      details: "Datos",
      delivery: "Entrega",
      review: "Revisión",
      confirmation: "Confirmación",
    },
    detailsTitle: "Datos de contacto",
    detailsDescription: "Necesitamos estos datos para enviarte la confirmación del pedido.",
    deliveryTitle: "Información de entrega",
    deliveryDescription:
      "Indicanos cómo preferís recibir los productos. Los costos y plazos se coordinan junto con la cotización.",
    reviewTitle: "Revisión del pedido",
    reviewDescription: "Revisá los datos antes de enviar la solicitud.",
    fields: {
      firstName: "Nombre",
      lastName: "Apellido",
      email: "Email",
      phone: "Teléfono",
      company: "Empresa",
      taxId: "CUIT / CUIL",
      method: "Modalidad de entrega",
      province: "Provincia",
      city: "Localidad",
      address: "Dirección",
      postalCode: "Código postal",
      notes: "Comentarios",
    },
    methods: {
      shipping: "Envío a domicilio",
      pickup: "Retiro acordado",
      toBeAgreed: "A coordinar con un asesor",
    },
    paymentTitle: "Pago",
    paymentPending:
      "La pasarela de pago todavía no está habilitada. Al enviar la solicitud, un asesor se contactará para confirmar disponibilidad, costos y la forma de pago.",
    continue: "Continuar",
    back: "Volver",
    submit: "Enviar solicitud",
    submitting: "Enviando…",
    errorTitle: "No pudimos registrar la solicitud",
    unavailable:
      "El servicio de pedidos todavía no está configurado. Podés enviarnos tu consulta desde la página de contacto.",
    emptyCart: "Tu carrito está vacío.",
    emptyCartCta: "Ver productos",
    orderSummary: "Resumen del pedido",
    editDetails: "Editar datos",
    editDelivery: "Editar entrega",
  },

  order: {
    title: "Solicitud registrada",
    thanks: "Gracias por tu solicitud.",
    description:
      "Registramos tu pedido correctamente. Un asesor revisará la disponibilidad y se pondrá en contacto para confirmar los detalles.",
    orderNumber: "Número de pedido",
    summary: "Resumen",
    nextStepsTitle: "Próximos pasos",
    nextSteps: {
      one: "Revisamos la disponibilidad de los productos solicitados.",
      two: "Te enviamos la confirmación comercial con precios y plazos.",
      three: "Coordinamos la forma de pago y la entrega.",
    },
    contactDetails: "Datos de contacto",
    deliveryDetails: "Entrega",
    backHome: "Volver al inicio",
    keepBrowsing: "Seguir explorando el catálogo",
    notFoundTitle: "No encontramos este pedido",
    notFoundDescription:
      "El número de pedido no existe o el enlace expiró. Si necesitás ayuda, escribinos.",
  },

  trust: {
    supportTitle: "Ropa ignífuga certificada para minería, petróleo y gas.",
    whyCta: "¿Por qué certificada?",
    whyEyebrow: "Diferencial ESTEPA",
    whyTitle: "¿Por qué certificada?",
    whySubtitle:
      "En minería, petróleo y gas la ropa es equipo de protección personal. Una norma verificable es lo que habilita el ingreso a planta y protege a quien la usa.",
    whyMatterTitle: "Por qué importan las certificaciones",
    whyMatterBody:
      "Una certificación no es un logo: es la prueba de que la prenda fue ensayada por un laboratorio independiente y cumple un estándar de protección medible. En minería, petróleo y gas la ropa es equipo de protección personal (EPP). Si falla, no se arruina una prenda: se pone en riesgo a una persona.",
    gainsTitle: "Para qué sirven y qué ganás",
    gainReal: "Protección real y verificable ante fuego repentino, arco eléctrico y calor.",
    gainAccess:
      "Habilitación para trabajar: las operadoras exigen normas específicas a sus contratistas; sin la norma, no se entra a la mina ni a la planta.",
    gainCompliance:
      "Respaldo de cumplimiento en seguridad e higiene, con menor exposición legal para la empresa.",
    gainDurability:
      "Durabilidad comprobada: los ensayos incluyen el desempeño tras lavados industriales.",
    catalogTitle: "Certificaciones internacionales que ofrecemos",
    catalogNorth: "Norteamérica: NFPA 2112 · NFPA 70E · ASTM F1506 · UL Certified.",
    catalogEurope: "Europa: EN ISO 11611 · EN ISO 11612 · EN 1149 · EN 61482.",
    catalogArc: "Protección contra arco: CAT 2.",
    catalogOther: "Otras según línea: ISO 20471 (alta visibilidad) · EN ISO 13688 · IRAM (norma local).",
    valueTitle: "El precio correcto no es el más bajo: es el que menos te cuesta.",
    valueBody:
      "Una prenda ESTEPA certificada resiste más lavados industriales y mantiene su protección FR con el uso. Menos reposición, menos órdenes de compra, menos logística para tu operación. Pagás un poco más por prenda y gastás menos por temporada.",
    valueReplacements: "Menos recambios de prenda por temporada.",
    valueLogistics: "Menos logística y gestión de compras.",
    valueProtection: "Protección certificada que no se degrada al primer lavado.",
    warrantyTitle: "Garantía de 1 año contra defectos de fábrica.",
    warrantyBody:
      "Cubre defectos de materiales y confección en prendas usadas en las condiciones de trabajo para las que fueron diseñadas. No cubre desgaste por uso indebido o fuera de especificación.",
    warrantyBadge: "Garantía 1 año contra defectos de fábrica",
    googleReviews: "Reviews",
    googleReviewsAria: "Google Reviews de ESTEPA Workwear",
    whatsappAria: "Escribinos por WhatsApp",
    whatsappPrefill: "Hola, quiero cotizar ropa certificada ESTEPA",
    composition: "Composición",
    certificatesNote:
      "Los certificados y reportes de ensayo se entregan en el proceso de homologación de operadoras y contratistas.",
    stripLabel: "Normas de referencia",
  },

  footer: {
    description:
      "Indumentaria FR y antiestática certificada para minería, petróleo y gas, e industria.",
    navigationTitle: "Navegación",
    contactTitle: "Contacto",
    legalTitle: "Legal",
    socialTitle: "Seguinos",
    rights: "Todos los derechos reservados.",
    privacy: "Política de privacidad",
    terms: "Términos y condiciones",
    returns: "Cambios y devoluciones",
    contactPending: "Datos de contacto próximamente.",
  },

  legal: {
    eyebrow: "Legal",
    lastUpdated: "Última actualización",
    reviewNote:
      "Este texto describe el funcionamiento actual del sitio. La versión legal definitiva será revisada y publicada por ESTEPA Workwear.",
    questions: "Si tenés dudas sobre este documento, escribinos.",
    privacy: {
      title: "Política de privacidad",
      description:
        "Cómo tratamos la información que nos enviás a través del sitio.",
      sections: [
        {
          title: "Información que recopilamos",
          body: "A través del formulario de contacto y del formulario de solicitud de productos podemos recibir tu nombre y apellido, empresa, cargo, email, teléfono, provincia, sector de actividad, el mensaje que escribís y los datos de entrega que indiques.",
        },
        {
          title: "Para qué usamos esa información",
          body: "Únicamente para responder tu consulta, preparar cotizaciones y gestionar la solicitud de productos. No la usamos con fines publicitarios sin tu consentimiento.",
        },
        {
          title: "Conservación y acceso",
          body: "Los datos se conservan mientras sean necesarios para la gestión comercial y sólo acceden a ellos las personas del equipo involucradas en tu consulta.",
        },
        {
          title: "Terceros",
          body: "No vendemos ni cedemos tus datos. Si más adelante se incorporan servicios de pago o de logística, esta política se actualizará antes de su puesta en funcionamiento.",
        },
        {
          title: "Cookies y analítica",
          body: "El sitio no utiliza cookies de seguimiento publicitario. Si se incorporan herramientas de analítica, se informará en esta sección.",
        },
        {
          title: "Tus derechos",
          body: "Podés solicitar el acceso, la rectificación o la eliminación de tus datos escribiéndonos por los canales de contacto publicados.",
        },
      ],
    },
    terms: {
      title: "Términos y condiciones",
      description: "Condiciones de uso del sitio y de las solicitudes de compra.",
      sections: [
        {
          title: "Alcance",
          body: "Estos términos regulan el uso del sitio de ESTEPA Workwear y el envío de solicitudes de productos a través del mismo.",
        },
        {
          title: "Solicitudes de compra",
          body: "Las solicitudes enviadas desde el sitio no constituyen una compra confirmada. Un asesor revisa la disponibilidad y confirma precios, plazos y forma de pago antes de cerrar la operación.",
        },
        {
          title: "Precios y disponibilidad",
          body: "Los precios y la disponibilidad publicados son informativos y pueden variar hasta la confirmación de la cotización.",
        },
        {
          title: "Información técnica",
          body: "Las especificaciones y certificaciones publicadas provienen de la documentación del fabricante. Cuando una especificación todavía no está validada, se indica explícitamente en la ficha del producto.",
        },
        {
          title: "Uso de los productos",
          body: "La selección final de la indumentaria de protección es responsabilidad del empleador, según la evaluación de riesgos de su operación. Nuestro asesoramiento es orientativo y no reemplaza esa evaluación.",
        },
        {
          title: "Propiedad intelectual",
          body: "La marca, los textos y las imágenes del sitio pertenecen a ESTEPA Workwear, salvo indicación contraria.",
        },
      ],
    },
    returns: {
      title: "Cambios y devoluciones",
      description: "Condiciones aplicables a cambios y devoluciones de productos.",
      sections: [
        {
          title: "Condiciones generales",
          body: "Las condiciones definitivas de cambio y devolución se publicarán en esta sección junto con la puesta en marcha de la venta online.",
        },
        {
          title: "Cómo iniciar un cambio",
          body: "Hasta entonces, cualquier solicitud de cambio o devolución se gestiona directamente con el asesor que atendió la operación.",
        },
        {
          title: "Prendas personalizadas",
          body: "Las prendas con bordado o personalización corporativa pueden tener condiciones distintas. Se aclaran en la cotización antes de confirmar el pedido.",
        },
      ],
    },
  },

  forms: {
    errorRequired: "Este campo es obligatorio.",
    errorEmail: "Ingresá un email válido.",
    errorPhone: "Ingresá un teléfono válido.",
    errorMinLength: "El texto es demasiado corto.",
    errorMaxLength: "El texto es demasiado largo.",
    errorGeneric: "Revisá los datos ingresados.",
    errorNetwork: "No pudimos conectar con el servidor. Intentá nuevamente.",
    errorSummary: "Hay errores en el formulario:",
    selectOption: "Seleccionar",
  },

  notFound: {
    title: "Página no encontrada",
    description: "La página que buscás no existe o fue movida.",
    cta: "Volver al inicio",
  },

  error: {
    title: "Algo salió mal",
    description: "Ocurrió un error inesperado. Podés intentar nuevamente.",
    retry: "Reintentar",
  },

  seo: {
    home: {
      title: "ESTEPA Workwear — Ropa de Trabajo Ignífuga Certificada | Minería y Petróleo Argentina",
      description:
        "Indumentaria FR y antiestática certificada (NFPA 2112, EN ISO 11612, EN 1149) para minería, petróleo y gas. Diseño argentino, estándares internacionales.",
    },
    mining: {
      title: "Ropa ignífuga certificada para minería",
      description:
        "Indumentaria de seguridad industrial certificada para minería. Ropa de trabajo FR y alta visibilidad para operaciones en Argentina.",
    },
    oilGas: {
      title: "Ropa antiestática y FR para petróleo y gas",
      description:
        "Ropa de trabajo NFPA 2112 y EN ISO para petróleo y gas. Indumentaria ignífuga y antiestática certificada para yacimiento y planta.",
    },
    work: {
      title: "Ropa de trabajo certificada para industria",
      description:
        "Indumentaria de seguridad industrial certificada para construcción, logística, operaciones y mantenimiento.",
    },
    products: {
      title: "Ropa de trabajo FR certificada",
      description:
        "Catálogo de ropa ignífuga certificada, antiestática y de alta visibilidad para minería, petróleo y gas.",
    },
    protection: {
      title: "Certificaciones de ropa de trabajo FR",
      description:
        "NFPA 2112, UL Certified, ASTM F1506, EN ISO 11612, EN 1149 y más. Por qué importa la ropa de trabajo certificada.",
    },
    faq: {
      title: "Preguntas frecuentes",
      description:
        "Talles, lavado, certificaciones y cómo pedir ropa de trabajo ESTEPA.",
    },
    about: {
      title: "Nosotros",
      description:
        "ESTEPA Workwear: indumentaria técnica orientada a la seguridad en entornos industriales.",
    },
    catalog: {
      title: "Catálogo digital",
      description:
        "Recorré el catálogo de ESTEPA Workwear por sector, protección y categoría.",
    },
    contact: {
      title: "Contacto",
      description:
        "Solicitá información sobre indumentaria técnica para tu operación industrial.",
    },
    cart: {
      title: "Carrito",
      description: "Revisá los productos seleccionados antes de enviar tu solicitud.",
    },
    checkout: {
      title: "Finalizar solicitud",
      description: "Completá tus datos para enviar la solicitud de productos.",
    },
  },
};

export type Dictionary = typeof es;

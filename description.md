# ESTEPA Workwear — Especificación Integral para Desarrollo Web

## 1. Propósito de este documento

Este documento define el alcance, arquitectura funcional, experiencia de usuario, diseño visual, estructura de contenidos y requisitos técnicos para desarrollar el nuevo sitio web de **ESTEPA Workwear**.

El objetivo es que un desarrollador o agente de programación pueda utilizar este documento como fuente principal de requisitos para implementar el proyecto.

La información final de los productos todavía no está disponible. Los samples llegarán aproximadamente 10 días después del inicio del proyecto. Por esta razón, el sistema debe desarrollarse de forma **completamente preparada para incorporar, editar o reemplazar productos posteriormente**, sin necesidad de modificar la arquitectura principal.

---

# 2. Contexto de negocio

ESTEPA Workwear es una nueva marca de indumentaria técnica y ropa de trabajo certificada.

La marca estará orientada principalmente a empresas y profesionales de sectores industriales donde la seguridad del operario es crítica, especialmente:

- Minería
- Petróleo y gas
- Industria y trabajo general

Las principales regiones objetivo de Argentina son:

- San Juan
- Río Negro
- Neuquén

La marca todavía no posee una trayectoria extensa en el mercado. Por ello, el sitio web debe compensar esa falta de historial mediante una presencia digital extremadamente profesional, sólida, técnica y confiable.

El visitante debe sentir que está frente a una empresa seria, especializada en protección industrial y preparada para trabajar con compañías exigentes.

---

# 3. Objetivos principales

El nuevo sitio debe cumplir simultáneamente cuatro objetivos:

1. **Construir confianza en una marca nueva.**
2. **Presentar claramente las líneas de productos para Minería, Petróleo y Trabajo/Industria.**
3. **Funcionar como catálogo digital profesional.**
4. **Permitir la venta online mediante un e-commerce básico de hasta aproximadamente 7 productos inicialmente.**

El sitio no debe parecer una tienda de ropa convencional.

Debe sentirse como una combinación de:

- Marca industrial premium
- Empresa especializada en seguridad
- Catálogo técnico
- Plataforma comercial B2B/B2C sencilla
- E-commerce moderno

---



# 5. Identidad visual

El cliente ya posee:

- Nuevo logo
- Tipografía corporativa

Estos recursos deberán integrarse al proyecto cuando sean proporcionados.

Hasta recibir los archivos definitivos, crear una estructura de estilos fácilmente configurable mediante variables o tokens.

## Dirección visual recomendada

La estética debe ser:

- Moderna
- Industrial
- Premium
- Técnica
- Corporativa
- Segura
- Minimalista
- Robusta

Evitar una apariencia genérica de plantilla de e-commerce.

Evitar también:

- Demasiados colores
- Gradientes excesivos
- Estilo infantil
- Diseño de "ropa de moda"
- Interfaces sobrecargadas
- Animaciones innecesarias

### Paleta

La paleta definitiva deberá basarse en el logo proporcionado por el cliente.

Mientras tanto, estructurar el diseño con variables como:

```css
--color-primary
--color-secondary
--color-accent
--color-background
--color-surface
--color-text
--color-text-muted
--color-border
--color-success
```

El diseño debe funcionar principalmente con:

- Fondos claros o neutros
- Tonos industriales
- Alto contraste
- Un color de acento fuerte para CTAs y elementos importantes

---

# 6. Idiomas

El sitio debe soportar:

- Español
- Inglés

El español debe ser el idioma predeterminado.

El sistema debe estar preparado para que todos los textos visibles puedan traducirse correctamente.

No mezclar idiomas dentro de una misma página.

## Selector de idioma

Incluir un selector visible y elegante en el header.

Ejemplo:

ES | EN

o un selector compacto con dropdown.

La experiencia debe conservar:

- La misma página al cambiar idioma cuando exista traducción.
- La selección de idioma del usuario.
- URLs o estructura compatible con internacionalización.

Para Next.js, implementar una arquitectura compatible con internacionalización.

---

# 7. Público objetivo

El sitio está dirigido principalmente a:

- Empresas mineras
- Empresas petroleras
- Empresas de petróleo y gas
- Responsables de seguridad e higiene
- Gerentes de compras
- Supervisores de planta
- Responsables de operaciones
- Contratistas industriales
- Empresas de servicios para minería y petróleo
- Operarios que necesitan indumentaria certificada

El lenguaje debe transmitir:

- Confianza
- Seguridad
- Conocimiento técnico
- Calidad
- Seriedad

No utilizar un tono excesivamente informal.

---

# 8. Estructura general del sitio

## Páginas principales

1. Inicio
2. Minería
3. Petróleo y Gas
4. Trabajo / Industria
5. Productos
6. Detalle de producto
7. Certificaciones / Protección
8. Nosotros
9. Catálogo digital
10. Contacto
11. Carrito
12. Checkout
13. Confirmación de pedido
14. Políticas / términos necesarios

---

# 9. Header y navegación

El header debe ser moderno, limpio y altamente usable.

## Elementos

- Logo ESTEPA
- Inicio
- Minería
- Petróleo y Gas
- Trabajo
- Productos
- Certificaciones
- Nosotros
- Contacto
- Selector ES/EN
- Icono de carrito

En desktop puede utilizarse navegación horizontal.

En mobile:

- Menú hamburguesa
- Logo visible
- Acceso rápido al carrito
- Selector de idioma accesible

El header puede ser sticky al hacer scroll.

---

# 10. Home Page

La página de inicio debe ser la experiencia más fuerte del sitio.

## 10.1 Hero principal

Utilizar una imagen o composición visual potente relacionada con trabajadores en ambientes industriales reales.

La imagen debe transmitir:

- Seguridad
- Profesionalismo
- Industria
- Protección
- Resistencia

### Contenido sugerido

Eyebrow:

**PROTECCIÓN QUE ACOMPAÑA CADA DESAFÍO**

Título principal:

**Indumentaria técnica diseñada para trabajar donde la seguridad no es negociable.**

Texto:

ESTEPA desarrolla soluciones de indumentaria de trabajo orientadas a entornos industriales exigentes, con prendas diseñadas para acompañar la protección, el rendimiento y la confianza de quienes trabajan todos los días.

CTAs:

- Ver productos
- Conocer nuestras soluciones

No utilizar un hero genérico de tienda online.

El hero debe parecer la portada de una marca industrial internacional.

---

## 10.2 Bloque de industrias

Presentar tres tarjetas grandes:

### Minería

Imagen relacionada con minería.

Texto breve sobre desafíos y protección para operaciones mineras.

CTA:

Explorar Minería →

### Petróleo y Gas

Imagen relacionada con petróleo, gas o industria energética.

CTA:

Explorar Petróleo y Gas →

### Trabajo e Industria

Imagen relacionada con entornos industriales.

CTA:

Explorar soluciones →

Cada tarjeta debe incluir hover moderno.

En desktop, crear una composición visual fuerte. No utilizar simples cajas genéricas.

---

## 10.3 Bloque "Protección para cada riesgo"

Esta sección debe comunicar claramente los principales tipos de protección.

Crear una grid con iconografía profesional.

### Protección frente a:

- Químicos
- Cortes profundos
- Descargas eléctricas
- Fuegos repentinos
- Alta visibilidad

Cada elemento debe tener:

- Icono
- Título
- Descripción breve

Ejemplo:

**Protección química**
Prendas diseñadas para acompañar operaciones donde la exposición a sustancias y agentes industriales requiere una protección adecuada.

IMPORTANTE:
No realizar afirmaciones específicas sobre niveles de certificación que todavía no hayan sido confirmados.

Usar contenido editable y posteriormente reemplazarlo por la información técnica real de cada producto.

---

## 10.4 Bloque de productos destacados

Mostrar inicialmente entre 3 y 6 productos destacados.

Cada producto debe tener:

- Imagen
- Nombre
- Categoría
- Principales características
- Badge opcional de certificación
- CTA "Ver producto"

Ejemplo de placeholders:

- Producto técnico 01
- Producto técnico 02
- Producto técnico 03

La estructura debe funcionar incluso antes de tener los productos definitivos.

---

## 10.5 Bloque de certificaciones

Sección visual enfocada en confianza.

Título sugerido:

**La seguridad necesita respaldo.**

Texto explicando que las especificaciones técnicas y certificaciones forman parte fundamental de la selección de cada solución.

Diseñar un área preparada para:

- Logos de normas
- Logos de certificaciones
- Información técnica

No inventar certificaciones.

Mientras no estén disponibles, utilizar placeholders claramente identificados como contenido temporal.

---

## 10.6 Bloque corporativo

Sección sobre la filosofía de ESTEPA.

Posible título:

**Preparados para los entornos que exigen más.**

Debe comunicar:

- Especialización
- Calidad
- Enfoque en seguridad
- Atención a necesidades industriales

Evitar inventar años de experiencia, clientes o números que el cliente no haya proporcionado.

---

## 10.7 CTA final

Fondo visual fuerte.

Título:

**Encontrá la protección adecuada para tu operación.**

Botones:

- Ver productos
- Contactarnos

---

# 11. Página Minería

Esta página debe estar dedicada a soluciones orientadas al sector minero.

## Hero

Imagen de entorno minero.

Título:

**Protección para los desafíos de la industria minera.**

Descripción enfocada en:

- Ambientes exigentes
- Operaciones prolongadas
- Seguridad
- Visibilidad
- Resistencia

## Secciones

### Riesgos y necesidades

Grid de riesgos relevantes.

### Soluciones ESTEPA

Productos asociados a minería.

### Características técnicas

Área para explicar materiales, capas, certificaciones y características.

### Productos recomendados

Listado dinámico de productos asociados a la categoría "minería".

### CTA

Solicitar información / Ver productos.

---

# 12. Página Petróleo y Gas

Debe comunicar un nivel alto de especialización.

## Hero

Imagen relacionada con:

- Plataformas
- Refinerías
- Campos petroleros
- Plantas industriales

Título sugerido:

**Indumentaria preparada para entornos energéticos exigentes.**

## Contenido

Destacar necesidades relacionadas con:

- Fuego repentino
- Electricidad
- Ambientes industriales
- Visibilidad
- Protección especializada

No afirmar especificaciones técnicas no confirmadas.

Mostrar productos relacionados dinámicamente.

---

# 13. Página Trabajo / Industria

Esta página representa soluciones para otros entornos laborales e industriales.

Debe incluir:

- Construcción
- Industria
- Logística
- Operaciones
- Mantenimiento

La sección debe ser flexible para agregar nuevos sectores posteriormente.

---

# 14. Página Productos

Crear una página de catálogo moderna.

## Requisitos

Grid responsive.

Cada tarjeta:

- Imagen
- Categoría
- Nombre
- Breve descripción
- Principales protecciones
- CTA

### Filtros

Preparar filtros, aunque inicialmente haya pocos productos.

Posibles filtros:

- Sector
- Tipo de protección
- Categoría

Ejemplo:

Todos | Minería | Petróleo y Gas | Trabajo

También:

Químicos | Corte | Electricidad | Fuego | Alta visibilidad

Los filtros deben funcionar correctamente mediante datos estructurados.

---

# 15. Página de detalle de producto

Esta es una de las páginas más importantes.

## Desktop

Layout con:

- Galería de imágenes
- Imagen principal grande
- Información técnica
- Selección de variantes si corresponde
- Precio
- Stock
- Cantidad
- Botón "Agregar al carrito"

## Información

### Nombre

### Categoría

### Descripción comercial

### Principales beneficios

### Características técnicas

### Protección y certificaciones

### Materiales

### Uso recomendado

### Talles disponibles

### Guía de talles

### Cuidado del producto

### Documentación

Preparar la posibilidad de adjuntar posteriormente:

- PDF técnico
- Fichas técnicas
- Certificados

### Productos relacionados

Mostrar productos similares.

---

# 16. E-commerce

El e-commerce será inicialmente sencillo.

Cantidad inicial estimada:

**Máximo 7 productos.**

La arquitectura debe permitir agregar más productos posteriormente.

## Funciones mínimas

- Catálogo
- Página de producto
- Variantes o talles
- Selección de cantidad
- Carrito
- Modificación de cantidades
- Eliminación de productos
- Checkout
- Datos del comprador
- Resumen del pedido
- Método de pago
- Confirmación

La integración de pagos debe desarrollarse de forma modular.

Si posteriormente se decide utilizar una plataforma específica, por ejemplo Mercado Pago u otra pasarela disponible para Argentina, debe ser fácil integrarla sin rediseñar el sistema.

No implementar funcionalidades empresariales complejas que no sean necesarias en esta primera versión.

---

# 17. Carrito

Crear un carrito simple y moderno.

Debe permitir:

- Ver productos
- Ver imagen
- Cambiar cantidad
- Eliminar producto
- Ver subtotal
- Continuar comprando
- Ir al checkout

En desktop puede existir:

- Página completa de carrito

Opcionalmente:

- Mini cart lateral

El diseño debe priorizar claridad.

---

# 18. Checkout

Proceso simple.

## Paso 1: Datos

- Nombre
- Apellido
- Email
- Teléfono

## Paso 2: Información de entrega

La estructura exacta puede ajustarse según el modelo comercial definido.

## Paso 3: Pago

Crear una arquitectura preparada para integrar una pasarela de pago.

## Paso 4: Confirmación

Página de éxito con:

- Número de pedido
- Resumen
- Información de próximos pasos
- CTA para volver al sitio

---

# 19. Catálogo digital

El catálogo digital debe estar integrado en el sitio.

No debe ser solamente un PDF incrustado.

Crear una página web navegable que presente:

- Categorías
- Productos
- Información técnica
- Protección
- Certificaciones

Además, preparar un CTA:

**Descargar catálogo**

El archivo PDF podrá incorporarse posteriormente cuando el contenido definitivo esté listo.

---

# 20. Página Certificaciones / Protección

Esta página es fundamental para generar confianza.

Debe explicar de forma visual los tipos de riesgos frente a los cuales se diseñan las soluciones de la marca.

## Categorías

- Protección química
- Protección contra cortes
- Protección frente a riesgos eléctricos
- Protección frente a fuego repentino
- Alta visibilidad

Para cada categoría:

- Icono
- Explicación clara
- Productos relacionados
- Área para normas/certificaciones

IMPORTANTE:

No inventar normas, certificaciones o niveles de protección.

Toda información técnica definitiva debe provenir de documentación proporcionada por el cliente o fabricante.

---

# 21. Página Nosotros

Objetivo: construir confianza sin inventar historia corporativa.

Evitar frases como:

- "Más de 20 años de experiencia" si no es verdad.
- "Líderes del mercado" sin evidencia.

En cambio, comunicar propósito.

## Posible estructura

### Nuestra misión

Proporcionar soluciones de indumentaria de trabajo orientadas a acompañar la seguridad en entornos industriales exigentes.

### Nuestro enfoque

- Seguridad
- Calidad
- Especialización
- Atención a sectores industriales

### Sectores

- Minería
- Petróleo y Gas
- Industria

### Cobertura

Destacar estratégicamente:

- San Juan
- Río Negro
- Neuquén

El contenido debe poder ampliarse posteriormente.

---

# 22. Página Contacto

Debe ser profesional y orientada a generación de leads.

## Formulario

Campos:

- Nombre
- Empresa
- Cargo
- Email
- Teléfono
- Provincia / Región
- Sector
- Mensaje

Opciones de sector:

- Minería
- Petróleo y Gas
- Industria
- Otro

CTAs posibles:

**Solicitar información**

**Hablar con un asesor**

Preparar integración futura con:

- Email
- CRM
- WhatsApp

No mostrar datos de contacto falsos.

Usar placeholders o configuración.

---

# 23. Footer

Debe incluir:

## Marca

Logo y breve descripción.

## Navegación

- Inicio
- Minería
- Petróleo y Gas
- Trabajo
- Productos
- Certificaciones
- Nosotros
- Contacto

## Contacto

Datos configurables.

## Redes sociales

Mostrar solamente las redes reales cuando sean proporcionadas.

## Legal

- Política de privacidad
- Términos y condiciones
- Política de cambios/devoluciones si aplica

---

# 24. Gestión de contenido

Aunque inicialmente existan pocos productos, no codificar los productos directamente dentro de componentes de UI.

Crear un modelo de datos.

Ejemplo conceptual:

```ts
type Product = {
  id: string
  slug: string

  name: {
    es: string
    en: string
  }

  shortDescription: {
    es: string
    en: string
  }

  description: {
    es: string
    en: string
  }

  category: string
  sectors: string[]
  protections: string[]

  images: string[]

  price?: number
  currency?: string

  sizes?: string[]
  variants?: ProductVariant[]

  certifications?: Certification[]

  technicalFeatures?: LocalizedContent[]
  materials?: LocalizedContent[]
  recommendedUse?: LocalizedContent[]

  documents?: ProductDocument[]

  featured: boolean
  active: boolean
}
```

La estructura exacta puede modificarse según la arquitectura final, pero el principio es obligatorio:

**Datos separados de la interfaz.**

---

# 25. Estado inicial de los productos

Actualmente los productos finales todavía no están definidos.

Por lo tanto:

- No utilizar información falsa.
- No inventar nombres técnicos.
- No inventar certificaciones.
- No inventar precios.
- No inventar materiales.

Durante la primera fase utilizar:

- Datos placeholder claramente organizados.
- Imágenes temporales.
- Contenido editable.

Cuando lleguen los samples, se deberá reemplazar la información.

---

# 26. Uso de fotografías y AI

El cliente podrá proporcionar fotografías de los productos.

Estas imágenes pueden necesitar mejoras antes de ser utilizadas en el catálogo.

Preparar el diseño para diferentes tipos de imágenes:

- Producto sobre fondo limpio
- Producto usado por un operario
- Detalles técnicos
- Primeros planos de materiales

Las imágenes finales pueden ser procesadas externamente mediante herramientas de AI para:

- Mejorar iluminación
- Limpiar fondos
- Aumentar resolución cuando sea apropiado
- Corregir imperfecciones
- Crear composiciones de catálogo

La representación visual no debe alterar de manera engañosa características de seguridad o certificaciones del producto.

---

# 27. Responsive design

El sitio debe ser completamente responsive.

Diseñar primero una experiencia mobile de alta calidad, no simplemente reducir el layout desktop.

## Breakpoints recomendados

La implementación puede utilizar breakpoints similares a:

- Mobile
- Tablet
- Desktop
- Large desktop

No depender exclusivamente de tamaños fijos.

## Mobile

Prioridades:

- Navegación sencilla
- CTAs visibles
- Cards cómodas
- Checkout simple
- Imágenes optimizadas
- Texto legible
- Targets táctiles adecuados

---

# 28. Accesibilidad

Implementar buenas prácticas de accesibilidad.

Como mínimo:

- HTML semántico
- Contraste suficiente
- Alt text para imágenes
- Navegación mediante teclado
- Focus states visibles
- Labels en formularios
- Mensajes de error accesibles
- Botones con nombres claros

---

# 29. SEO

El sitio debe desarrollarse con buenas prácticas SEO.

Cada página debe soportar:

- Title
- Meta description
- Open Graph
- URLs semánticas
- Sitemap
- Robots
- Canonical URLs cuando corresponda

Ejemplos de estructura:

/es
/es/mineria
/es/petroleo-y-gas
/es/trabajo
/es/productos
/es/productos/[slug]

/en
/en/mining
/en/oil-and-gas
/en/work
/en/products
/en/products/[slug]

La estructura exacta puede adaptarse a la solución de i18n elegida.

---

# 30. Rendimiento

El sitio debe sentirse rápido.

Prioridades:

- Optimización de imágenes
- Lazy loading cuando corresponda
- Evitar JavaScript innecesario
- Server Components cuando sea apropiado
- Code splitting
- Fuentes optimizadas
- Buen rendimiento móvil

No utilizar librerías pesadas únicamente para efectos visuales simples.

---

# 31. Stack tecnológico

El cliente aprobó la siguiente dirección tecnológica:

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

## Backend

- Node.js

## Base de datos

- PostgreSQL

La implementación concreta puede usar una arquitectura moderna compatible con este stack.

## Recomendaciones

- Next.js App Router
- TypeScript estricto
- Componentes reutilizables
- API estructurada
- ORM apropiado para PostgreSQL
- Variables de entorno
- Validación de datos
- Manejo de errores

---

# 32. Arquitectura de frontend

Organizar el proyecto de forma clara.

Ejemplo:

```text
src/
├── app/
│   ├── [locale]/
│   │   ├── page.tsx
│   │   ├── mineria/
│   │   ├── petroleo-y-gas/
│   │   ├── trabajo/
│   │   ├── productos/
│   │   ├── certificaciones/
│   │   ├── nosotros/
│   │   ├── contacto/
│   │   ├── carrito/
│   │   └── checkout/
│
├── components/
│   ├── layout/
│   ├── home/
│   ├── products/
│   ├── cart/
│   ├── checkout/
│   ├── ui/
│   └── shared/
│
├── lib/
├── data/
├── types/
├── hooks/
└── styles/
```

Esta estructura es orientativa.

La implementación debe priorizar mantenibilidad.

---

# 33. Sistema de componentes

Crear componentes reutilizables.

Ejemplos:

- Header
- MobileMenu
- Footer
- Button
- SectionHeading
- IndustryCard
- ProtectionCard
- ProductCard
- ProductGrid
- ProductGallery
- CertificationBadge
- LanguageSwitcher
- CartItem
- CartSummary
- QuantitySelector
- ContactForm
- CTASection

No duplicar grandes bloques de JSX cuando pueden convertirse en componentes reutilizables.

---

# 34. Animaciones y microinteracciones

Utilizar animaciones con moderación.

Ejemplos apropiados:

- Hover en tarjetas
- Fade/slide ligero al aparecer
- Transiciones de botones
- Cambio de imágenes
- Apertura del menú
- Mini cart

Evitar:

- Animaciones pesadas
- Scroll effects excesivos
- Elementos que distraigan del contenido técnico

La sensación debe ser premium y controlada.

---

# 35. Formularios

Todos los formularios deben tener:

- Validación
- Estados de loading
- Estados de éxito
- Estados de error
- Protección básica contra spam
- Mensajes traducidos

No simular envíos exitosos si no existe backend.

Si la integración real todavía no está definida, crear una implementación claramente separada para conectar posteriormente el servicio real.

---

# 36. Datos configurables

Centralizar toda información que probablemente cambie.

Ejemplo:

```ts
export const siteConfig = {
  companyName: "ESTEPA Workwear",
  defaultLocale: "es",
  locales: ["es", "en"],

  contact: {
    email: "",
    phone: "",
    whatsapp: "",
  },

  social: {
    instagram: "",
    linkedin: "",
  },
}
```

No dejar información falsa hardcodeada en componentes.

---

# 37. Estados vacíos y placeholders

El sitio debe verse profesional incluso mientras faltan productos.

Crear estados para:

- Sin productos
- Producto próximamente disponible
- Catálogo en actualización
- Documentación próximamente disponible

Ejemplo:

**Nuevas soluciones en preparación.**

Evitar páginas vacías o componentes rotos.

---

# 38. Prioridad de desarrollo

## Fase 1 — Base visual y estructura

1. Configuración del proyecto
2. Sistema de diseño
3. Header y footer
4. Home
5. Páginas de industrias
6. Página de productos
7. Página de detalle
8. Certificaciones
9. Nosotros
10. Contacto
11. Responsive design
12. Español/Inglés

## Fase 2 — E-commerce

1. Datos de productos
2. Carrito
3. Variantes
4. Checkout
5. Pedidos
6. Integración de pago definida por el cliente

## Fase 3 — Contenido final

Cuando lleguen los samples:

1. Procesamiento de imágenes
2. Carga de productos definitivos
3. Especificaciones técnicas
4. Certificaciones reales
5. Talles
6. Precios
7. Documentos técnicos

---

# 39. Requisitos críticos

El desarrollador/agente debe respetar los siguientes puntos:

1. No diseñar una tienda de ropa convencional.
2. La prioridad es transmitir confianza y profesionalismo.
3. El diseño debe sentirse industrial y premium.
4. Los productos iniciales son pocos, pero el sistema debe escalar.
5. No inventar certificaciones ni especificaciones técnicas.
6. Español como idioma predeterminado.
7. Inglés como segundo idioma completo.
8. Mobile responsive desde el inicio.
9. Separar contenido y datos de componentes UI.
10. No hardcodear información empresarial falsa.
11. Mantener una arquitectura limpia.
12. Preparar integración de pagos de forma modular.
13. Optimizar imágenes y rendimiento.
14. Priorizar UX clara para clientes corporativos.
15. Mantener la identidad visual preparada para recibir el logo y tipografía definitivos.

---

# 40. Resultado esperado

El resultado final debe ser un sitio web que haga que ESTEPA Workwear parezca una marca establecida, técnica y profesional desde su lanzamiento.

La experiencia debe comunicar:

**Seguridad. Protección. Confianza. Especialización.**

El visitante debe poder:

- Entender rápidamente qué hace la empresa.
- Identificar las soluciones para Minería, Petróleo y Trabajo/Industria.
- Conocer los tipos de protección ofrecidos.
- Explorar los productos.
- Consultar especificaciones.
- Agregar productos al carrito.
- Realizar un proceso de compra simple.
- Contactar a la empresa.
- Navegar cómodamente desde mobile.
- Cambiar entre español e inglés.

La interfaz debe ser visualmente sobresaliente, moderna y propia de una empresa industrial premium.

No crear un sitio genérico.

Cada decisión visual y funcional debe responder a esta idea central:

> **ESTEPA Workwear protege a las personas que trabajan en los entornos donde la seguridad es esencial.**

---

# 41. Instrucción final para Cursor

Utiliza este documento como especificación principal del proyecto.

Antes de crear componentes, analiza:

1. La arquitectura general.
2. El sistema de diseño.
3. La estrategia de internacionalización.
4. El modelo de datos de productos.
5. La arquitectura del e-commerce.

Luego implementa el proyecto de manera incremental.

Prioridad:

**Primero crear una experiencia visual excelente y completamente responsive.**

Después conectar:

- Datos
- Backend
- Base de datos
- Carrito
- Checkout
- Pagos

Mantener el código:

- Limpio
- Modular
- Tipado
- Reutilizable
- Escalable
- Fácil de mantener

No generar contenido técnico falso para productos o certificaciones.

Cuando falte información, utilizar placeholders estructurados y fácilmente reemplazables.

!!!
No implemente la página de pago en este momento.

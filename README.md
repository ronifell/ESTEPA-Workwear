# ESTEPA Workwear

Technical apparel and workwear for mining, oil & gas, and industry. Bilingual
(Spanish / English) catalogue site with a lightweight quotation-based commerce
flow, built to the specification in [`description.md`](./description.md).

- **Framework:** Next.js 16 (App Router, Turbopack, React 19, Server Components)
- **Language:** TypeScript in strict mode
- **Styling:** Tailwind CSS v4 with design tokens in `src/styles/globals.css`
- **Persistence:** file store by default, PostgreSQL via Prisma when configured

---

## Getting started

```bash
npm install          # also runs `prisma generate`
cp .env.example .env.local
npm run dev          # http://localhost:3000 → redirects to /es
```

Nothing in `.env.local` is required. Every variable that is left empty makes the
UI hide the corresponding element rather than render a fake placeholder.

### Scripts

| Script                | Purpose                                              |
| --------------------- | ---------------------------------------------------- |
| `npm run dev`         | Development server                                   |
| `npm run build`       | Production build                                     |
| `npm start`           | Serve the production build                           |
| `npm run lint`        | ESLint (flat config, `next/core-web-vitals`)          |
| `npm run typecheck`   | `tsc --noEmit`                                        |
| `npm run db:push`     | Create the PostgreSQL tables from the Prisma schema   |
| `npm run db:seed`     | Load the placeholder catalogue into PostgreSQL        |
| `npm run db:studio`   | Prisma Studio                                         |

---

## Guiding rule: nothing invented

The brand is new, so a large part of the real content does not exist yet. The
site never fabricates it. Instead, every unknown has an explicit, honest state:

| Unknown            | What the site shows                                            |
| ------------------ | -------------------------------------------------------------- |
| Price              | "Precio a confirmar" and a quotation request instead of a cart |
| Certifications     | "Normas en proceso de validación" — no norm codes or levels    |
| Technical sheet    | "Ficha técnica en preparación"                                 |
| Documents          | "Documentación próximamente disponible"                        |
| Contact / socials  | The block is hidden entirely                                   |
| Catalogue PDF      | The download CTA is disabled with an explanatory note          |

When the real data arrives, filling in the data files and environment variables
switches these states off automatically — no UI changes required.

---

## Project structure

```
src/
  app/                     App Router
    [locale]/              Every page lives under a locale segment
      productos/[slug]/    Product detail
      pedido/[id]/         Order confirmation
      legal/               Privacy, terms, returns
    api/contact/           Contact form endpoint
    api/orders/            Order (quotation request) endpoint
    sitemap.ts, robots.ts, global-error.tsx
  components/
    layout/  home/  sectors/  products/  cart/  checkout/  forms/  legal/
    shared/                Page hero, CTA section, protection icons
    ui/                    Button, Field, Notice, Section, Badge, icons…
    providers/             i18n and cart context
  config/site.ts           Every configurable business value
  data/                    Products, sectors, protections, provinces
  i18n/                    Dictionaries, localized route map, helpers
  lib/
    repositories/          Data access (swappable: static data → database)
    storage/               Lead and order persistence (file store / Prisma)
    validation/            Zod schemas shared by client and API routes
    seo.ts  format.ts  product-filters.ts  rate-limit.ts  utils.ts
  proxy.ts                 Locale detection and localized URL rewrites
prisma/schema.prisma       PostgreSQL schema
```

### Content and data live outside the UI

No component hardcodes business content. To change the site:

| To change…                        | Edit…                                       |
| --------------------------------- | ------------------------------------------- |
| Any visible text                  | `src/i18n/dictionaries/{es,en}.ts`          |
| Products                          | `src/data/products.ts`                      |
| Sector pages content              | `src/data/sectors.ts`                       |
| Protection categories             | `src/data/protections.ts`                   |
| Contact details, socials, regions | `src/config/site.ts` + environment variables |
| URLs (any language)               | `src/i18n/routes.ts`                        |

---

## Internationalisation

Spanish is the default language and its pathname doubles as the internal route.
English URLs are rewritten onto the same file-system routes by `src/proxy.ts`,
so both languages are fully localized without duplicating pages:

```
/es/productos/[slug]        /en/products/[slug]
/es/mineria                 /en/mining
/es/petroleo-y-gas          /en/oil-and-gas
/es/certificaciones         /en/protection
```

`src/i18n/routes.ts` is the single source of truth. Adding a language means
adding a locale to `src/config/site.ts`, a dictionary file, and one column to
the route map — no page changes.

The switcher preserves the current page and its query string, and every page
emits canonical plus `hreflang` alternates.

---

## Commerce flow

1. **Add to cart** — client state in `CartProvider`, persisted to
   `localStorage` and synchronised across tabs.
2. **Cart** — full page plus a mini-cart drawer: quantities, removal, subtotal.
3. **Checkout** — three steps (details → delivery → review) validated with the
   same Zod schema the API uses.
4. **Order** — `POST /api/orders` re-resolves every product from the catalogue
   (names and prices are never trusted from the browser), assigns a reference
   such as `EST-260821-AWTFGF8F`, and stores the order with status
   `pending_review`.
5. **Confirmation** — `/es/pedido/[reference]` shows the summary and next steps.

**Payment is intentionally not implemented.** The review step states clearly
that an advisor confirms availability, cost and payment method. The `Order`
model already carries `status`, `paymentProvider` and `paymentReference`, so a
gateway can be added without touching the rest of the flow.

Both API routes are rate limited per IP and protected by a honeypot field.

---

## Persistence

`src/lib/storage/index.ts` resolves the backend at runtime:

- **No `DATABASE_URL`** → newline-delimited JSON in `./.data/` (git-ignored).
  Useful locally and for a first deployment with no infrastructure.
- **`DATABASE_URL` set** → PostgreSQL through Prisma 7 and the `pg` driver
  adapter, loaded lazily so it is never bundled when unused.

```bash
# Enable PostgreSQL
echo 'DATABASE_URL=postgresql://user:password@localhost:5432/estepa' >> .env.local
npm run db:push
npm run db:seed     # optional: loads the placeholder catalogue
```

Product reads go through `src/lib/repositories/products.ts`, which is already
async. Pointing it at the `Product` table swaps the static catalogue for the
database without touching a single page or component.

---

## Images

`public/images/` holds the industrial photography used by the hero, sector
heroes and CTA bands, exported as optimized JPEGs and served through
`next/image` (AVIF/WebP, responsive sizes, lazy below the fold).

Products have no photography yet, so `PlaceholderImage` draws a schematic
silhouette per category instead of a broken or stock-looking image. Adding
entries to a product's `images` array replaces it automatically.

---

## Accessibility and SEO

Semantic landmarks, a skip link, labelled form fields with `aria-invalid` and
associated error messages, visible focus states, keyboard-operable menus with
focus trapping and Escape handling, and alt text on every meaningful image.

Per-page title and description, Open Graph with a generated OG image, canonical
and `hreflang` alternates, `sitemap.xml`, `robots.txt`, and Organization plus
Product JSON-LD that only emits fields backed by real data.

---

## Deployment

Standard Next.js deployment. Set `NEXT_PUBLIC_SITE_URL` to the production
origin so canonical URLs, the sitemap and Open Graph tags are absolute. Add
`DATABASE_URL` when the database is ready; the file store is only appropriate
for a single-instance host with a persistent disk.

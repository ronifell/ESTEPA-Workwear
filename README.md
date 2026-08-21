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
    admin/                 Admin panel (single language, not indexed)
      productos/           Product list, editor, creation
    api/contact/           Contact form endpoint
    api/orders/            Order (quotation request) endpoint
    api/admin/             Login, logout, product CRUD, media uploads
    sitemap.ts, robots.ts, global-error.tsx
  components/
    layout/  home/  sectors/  products/  cart/  checkout/  forms/  legal/
    admin/                 Login form, product table, product editor
    shared/                Page hero, CTA section, protection icons
    ui/                    Button, Field, Notice, Section, Badge, icons…
    providers/             i18n and cart context
  config/site.ts           Every configurable business value
  data/                    Products, sectors, protections, provinces
  i18n/                    Dictionaries, localized route map, helpers
  lib/
    admin/                 Credentials, session, panel copy and options
    repositories/          Data access (swappable: static data → database)
    storage/               Catalogue, lead and order persistence
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
| Products                          | `/admin` (or `src/data/products.ts` seed)   |
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

## Admin panel

`/admin` is a small internal panel for loading the catalogue. It needs no
database and no third-party service.

### Access

Accounts live in the environment file, nowhere else:

```bash
# One account
ADMIN_EMAIL=admin@estepaworkwear.com
ADMIN_PASSWORD=una-clave-larga

# Or several: "email:password", separated by commas or newlines
ADMIN_USERS=ana@estepaworkwear.com:clave-de-ana, luis@estepaworkwear.com:clave-de-luis

# Signs the session cookie (any long random string)
ADMIN_SESSION_SECRET=
```

While all of them are empty the login screen says so and nobody can get in.
`ADMIN_USERS` and the single-account pair can be combined; a password may
contain `:` but not `,`.

Signing in sets an HMAC-signed, HttpOnly session cookie that expires after
eight hours (`Secure` in production). Removing an account from the environment
invalidates its sessions on the next request. Every admin API route verifies
the session itself, so no mutation depends on the page guard. Login attempts
are rate limited per IP, the panel is `noindex` via both metadata and an
`X-Robots-Tag` header, and it is excluded from the locale proxy.

### Editing products

The editor covers the full `Product` model: identifiers, Spanish/English name
and descriptions, category, sectors, protections, images, price and currency,
sizes, benefits, technical features, materials, recommended use, care,
certifications, downloadable documents, size variants, and the featured /
visible / preliminary flags.

Two rules keep the data honest:

- **Spanish is the source language.** Leaving an English field empty reuses the
  Spanish text instead of publishing a blank string.
- **Empty blocks stay empty.** Sections with no content are not stored, so the
  storefront keeps showing its explicit "pending" state rather than inventing
  specifications.

Images and PDFs can be uploaded (`POST /api/admin/uploads`) or referenced by
path or URL. Uploads are identified by file signature — not by extension or
declared MIME type — and land in `public/uploads/`, which is git-ignored.

Saving revalidates the storefront, so prerendered pages (home, catalogue,
sector pages, product detail in both languages, sitemap) reflect the change on
the next request without a rebuild.

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

The catalogue has its own store (`src/lib/storage/product-store.ts`).
`src/data/products.ts` is the seed: while nobody has saved a change from the
panel there is no file on disk and the site renders that seed. The first save
writes `./.data/products.json`, which then becomes the source of truth —
deleting that file restores the seed.

All product reads go through `src/lib/repositories/products.ts`, which is
already async. Pointing it at the `Product` table swaps the file store for the
database without touching a single page or component.

---

## Images

`public/images/` holds the industrial photography used by the hero, sector
heroes and CTA bands, exported as optimized JPEGs and served through
`next/image` (AVIF/WebP, responsive sizes, lazy below the fold).

Products have no photography yet, so `PlaceholderImage` draws a schematic
silhouette per category instead of a broken or stock-looking image. Adding an
image from the admin panel (or to a product's `images` array) replaces it
automatically.

Photography uploaded from the panel goes to `public/uploads/`, separate from
the curated art in `public/images/` and git-ignored.

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

Set the admin credentials (`ADMIN_EMAIL` / `ADMIN_PASSWORD` or `ADMIN_USERS`)
and a random `ADMIN_SESSION_SECRET` in the host's environment. The panel writes
the catalogue to `./.data/` and uploads to `./public/uploads/`, so it needs a
writable, persistent disk: on read-only or ephemeral filesystems (serverless
platforms) the panel reports that it could not save instead of losing the
change silently, and moving the catalogue to PostgreSQL is the right answer.

### Behind a reverse proxy

`ecosystem.config.cjs` holds the PM2 configuration used on the VPS. Start the
server with `-H localhost`, never `-H 127.0.0.1`.

English URLs are served by rewriting them onto the Spanish filesystem routes,
and Next decides whether a rewrite is internal by comparing its origin against
the origin it built from the `-H` hostname. `-H 127.0.0.1` makes those two
disagree, so every English page is proxy-fetched over the public protocol
instead of being resolved internally and the whole `/en` site answers 500,
while Spanish keeps working because its URLs need no rewrite. Since `localhost`
resolves to `::1` first on modern Node, the config also sets
`NODE_OPTIONS=--dns-result-order=ipv4first` to keep the socket on
`127.0.0.1:3000` where nginx expects it.

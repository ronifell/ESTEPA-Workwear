/**
 * JSON-LD as a native `<script>` in a Server Component.
 *
 * `next/script` is a Client Component, and React 19 refuses to execute
 * `<script>` tags it renders on the client — which is what produced the
 * overlay. Crawlers only need the tag in the HTML, so a server-rendered
 * script is the right tool. `<` is escaped so a `</script>` inside a string
 * cannot close the tag early.
 */
export function JsonLd({ id, data }: { readonly id: string; readonly data: unknown }) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

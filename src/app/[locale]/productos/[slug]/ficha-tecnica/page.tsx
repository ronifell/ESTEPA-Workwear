import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { FichaTecnica } from "@/components/products/ficha-tecnica";
import { PrintDatasheetButton } from "@/components/products/print-datasheet-button";
import { ArrowLeftIcon } from "@/components/ui/icons";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { LocalizedLink } from "@/components/ui/localized-link";
import { locales } from "@/config/site";
import { format, getDictionary, resolveLocale } from "@/i18n";
import { getPath } from "@/i18n/routes";
import { getAllProductSlugs, getProductBySlug } from "@/lib/repositories/products";
import { buildPageMetadata } from "@/lib/seo";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllProductSlugs();
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = resolveLocale(rawLocale);
  const product = await getProductBySlug(slug);
  const dictionary = getDictionary(locale);

  if (!product) {
    return { title: dictionary.notFound.title, robots: { index: false } };
  }

  return buildPageMetadata({
    route: "productDatasheet",
    locale,
    params: { slug },
    title: format(dictionary.product.datasheetTitle, { name: product.name[locale] }),
    description: product.shortDescription[locale],
    ...(product.images[0] ? { image: product.images[0].src } : {}),
  });
}

export default async function ProductDatasheetPage({ params }: PageProps) {
  const { locale: rawLocale, slug } = await params;
  const locale = resolveLocale(rawLocale);
  const dictionary = getDictionary(locale);
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const copy = dictionary.product;

  return (
    <div className="bg-sand-200 py-8 print:bg-white print:py-0 sm:py-10">
      <div className="container-page print:max-w-none print:px-0">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <LocalizedLink
            route="productDetail"
            locale={locale}
            params={{ slug: product.slug }}
            className="inline-flex items-center gap-2 font-display text-[0.8125rem] font-semibold uppercase tracking-[0.1em] text-primary transition-colors hover:text-accent"
          >
            <ArrowLeftIcon className="size-4" />
            {copy.datasheetBack}
          </LocalizedLink>
          <PrintDatasheetButton label={copy.datasheetPrint} />
        </div>

        <Breadcrumbs
          className="mb-6 print:hidden"
          items={[
            { label: dictionary.nav.home, href: getPath("home", locale) },
            { label: copy.breadcrumbProducts, href: getPath("products", locale) },
            {
              label: product.name[locale],
              href: getPath("productDetail", locale, { slug: product.slug }),
            },
            { label: copy.datasheet },
          ]}
        />

        <FichaTecnica product={product} locale={locale} />
      </div>
    </div>
  );
}

import Image from "next/image";

import { ProductImageOverlay } from "@/components/products/product-image-overlay";
import { CertStrip } from "@/components/shared/cert-strip";
import { buttonStyles } from "@/components/ui/button";
import { ExploreHint } from "@/components/ui/explore-hint";
import {
  ArrowRightIcon,
  GearIcon,
  GemIcon,
  HeadsetIcon,
  ShieldCheckIcon,
  type IconProps,
} from "@/components/ui/icons";
import { LocalizedLink } from "@/components/ui/localized-link";
import { getDictionary } from "@/i18n";
import type { Dictionary } from "@/i18n";
import type { Locale, Product } from "@/types";

const highlightIcons: readonly {
  readonly key: keyof Dictionary["home"]["highlights"];
  readonly Icon: (props: IconProps) => React.JSX.Element;
}[] = [
  { key: "certified", Icon: ShieldCheckIcon },
  { key: "industry", Icon: GearIcon },
  { key: "quality", Icon: GemIcon },
  { key: "support", Icon: HeadsetIcon },
];

export function Hero({
  locale,
  products = [],
}: {
  readonly locale: Locale;
  readonly products?: readonly Product[];
}) {
  const dictionary = getDictionary(locale);
  const { hero, highlights } = dictionary.home;
  const rail = products.slice(0, 4);

  return (
    <section className="relative overflow-hidden bg-sand-100 industrial-texture">
      <div className="relative lg:grid lg:min-h-[32rem] lg:grid-cols-2 lg:items-stretch">
        <div className="order-2 relative h-64 w-full sm:h-80 lg:order-none lg:col-start-2 lg:h-auto lg:min-h-[32rem]">
          <div className="absolute inset-0 overflow-hidden lg:inset-3 lg:rounded-3xl">
            <Image
              src="/images/hero/home.jpg"
              alt={hero.imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-[60%_center]"
            />
          </div>
          <div
            aria-hidden
            className="absolute inset-0 hidden bg-gradient-to-r from-sand-100 via-sand-100/35 to-transparent lg:block"
          />
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-sand-100 to-transparent lg:hidden"
          />
        </div>

        <div className="relative order-1 lg:order-none lg:col-start-1 lg:row-start-1">
          <div className="container-page lg:pr-0">
            <div className="max-w-xl py-14 sm:py-20 lg:max-w-none lg:py-24 xl:py-28">
              <p className="eyebrow animate-rise text-accent">
                <span aria-hidden className="h-px w-10 bg-accent/60" />
                {hero.eyebrow}
              </p>

              <h1 className="animate-rise mt-6 text-balance-tight text-[2rem] leading-[1.06] text-navy-900 sm:text-[2.75rem] lg:text-[3.15rem] xl:text-[3.4rem] [animation-delay:80ms]">
                {hero.titleLead}{" "}
                <span className="text-accent">{hero.titleAccent}</span>
              </h1>

              <p className="animate-rise mt-6 max-w-lg text-base leading-relaxed text-text-muted sm:text-lg [animation-delay:160ms]">
                {hero.description}
              </p>

              <div className="animate-rise mt-8 [animation-delay:240ms]">
                <CertStrip locale={locale} />
              </div>

              <div className="animate-rise mt-8 flex flex-col gap-3 sm:flex-row [animation-delay:280ms]">
                <LocalizedLink
                  route="products"
                  locale={locale}
                  className={buttonStyles("primary", "lg")}
                >
                  {dictionary.common.viewProducts}
                  <ArrowRightIcon className="size-4" />
                </LocalizedLink>
                <LocalizedLink
                  route="contact"
                  locale={locale}
                  className={buttonStyles("outline", "lg")}
                >
                  {dictionary.common.requestInformation}
                </LocalizedLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      {rail.length > 0 ? (
        <div className="container-page pb-10 lg:pb-12">
          <p className="mb-4 font-display text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-accent">
            {hero.productRail}
          </p>
          <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {rail.map((product) => {
              const image = product.images[0];
              return (
                <li key={product.id}>
                  <LocalizedLink
                    route="productDetail"
                    locale={locale}
                    params={{ slug: product.slug }}
                    className="group/photo relative block aspect-4/5 overflow-hidden rounded-3xl border border-border bg-sand-200"
                  >
                    {image ? (
                      <Image
                        src={image.src}
                        alt={image.alt[locale]}
                        fill
                        sizes="(min-width: 1024px) 22vw, 50vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    ) : null}
                    <ProductImageOverlay product={product} locale={locale} compact />
                    <ExploreHint label={dictionary.common.explore} />
                  </LocalizedLink>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}

      <div className="relative border-y border-border bg-sand-200/70">
        <div className="container-page">
          <ul className="grid grid-cols-1 divide-y divide-border sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
            {highlightIcons.map(({ key, Icon }) => (
              <li
                key={key}
                className="flex items-start gap-4 py-6 sm:py-8 lg:border-l lg:border-border lg:px-6 lg:first:border-l-0 lg:first:pl-0 lg:last:pr-0"
              >
                <Icon className="mt-0.5 size-7 shrink-0 text-navy-700" strokeWidth={1.25} />
                <div>
                  <p className="font-display text-[0.8125rem] font-semibold uppercase leading-tight tracking-[0.08em] text-navy-900">
                    {highlights[key].title}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-text-muted">
                    {highlights[key].description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

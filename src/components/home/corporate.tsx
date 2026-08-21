import Image from "next/image";

import { buttonStyles } from "@/components/ui/button";
import {
  ArrowRightIcon,
  GemIcon,
  LayersIcon,
  ShieldCheckIcon,
  TargetIcon,
  type IconProps,
} from "@/components/ui/icons";
import { LocalizedLink } from "@/components/ui/localized-link";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { siteConfig } from "@/config/site";
import { getDictionary, type Dictionary } from "@/i18n";
import type { Locale } from "@/types";

const points: readonly {
  readonly key: keyof Dictionary["home"]["corporate"]["points"];
  readonly Icon: (props: IconProps) => React.JSX.Element;
}[] = [
  { key: "specialization", Icon: TargetIcon },
  { key: "quality", Icon: GemIcon },
  { key: "safety", Icon: ShieldCheckIcon },
  { key: "service", Icon: LayersIcon },
];

export function Corporate({ locale }: { readonly locale: Locale }) {
  const dictionary = getDictionary(locale);
  const { corporate } = dictionary.home;

  return (
    <Section tone="default">
      <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
        <Reveal className="lg:col-span-5">
          <div className="relative aspect-4/5 overflow-hidden bg-sand-200 sm:aspect-3/2 lg:aspect-4/5">
            <Image
              src="/images/hero/about-detail.jpg"
              alt=""
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>

          <ul className="mt-4 grid grid-cols-3 divide-x divide-border border border-border bg-surface">
            {siteConfig.regions.map((region) => (
              <li
                key={region}
                className="px-3 py-4 text-center font-display text-[0.625rem] font-semibold uppercase leading-tight tracking-[0.1em] text-text-muted"
              >
                {region}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="lg:col-span-7">
          <SectionHeading
            eyebrow={corporate.eyebrow}
            title={corporate.title}
            description={corporate.description}
          />

          <ul className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {points.map(({ key, Icon }, index) => (
              <Reveal as="li" key={key} delay={index * 80} className="flex gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center border border-border bg-surface text-navy-700">
                  <Icon className="size-5" strokeWidth={1.4} />
                </span>
                <div>
                  <h3 className="font-display text-sm font-semibold uppercase tracking-[0.06em] text-navy-900">
                    {corporate.points[key].title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-text-muted">
                    {corporate.points[key].description}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={140} className="mt-10">
            <LocalizedLink route="about" locale={locale} className={buttonStyles("outline", "md")}>
              {corporate.cta}
              <ArrowRightIcon className="size-4" />
            </LocalizedLink>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

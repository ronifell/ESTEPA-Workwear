import Image from "next/image";
import type { ReactNode } from "react";

import { Breadcrumbs, type Crumb } from "@/components/ui/breadcrumbs";
import { cn } from "@/lib/utils";

export interface PageHeroProps {
  readonly eyebrow?: string;
  readonly title: string;
  readonly description?: string;
  readonly image?: string;
  readonly imageAlt?: string;
  readonly breadcrumbs?: readonly Crumb[];
  readonly actions?: ReactNode;
  readonly aside?: ReactNode;
  readonly size?: "compact" | "regular";
}

/**
 * Inner-page header. Falls back to a dark blueprint panel when no photography
 * is available, so pages never look unfinished.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt = "",
  breadcrumbs,
  actions,
  aside,
  size = "regular",
}: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-900 text-text-inverse">
      {image ? (
        <>
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-950/80 to-navy-950/45"
          />
        </>
      ) : (
        <div aria-hidden className="blueprint-grid absolute inset-0 opacity-70" />
      )}

      <div aria-hidden className="hazard-stripes absolute inset-x-0 bottom-0 h-1 opacity-80" />

      <div
        className={cn(
          "container-page relative",
          size === "compact" ? "py-14 lg:py-20" : "py-20 lg:py-28",
        )}
      >
        {breadcrumbs?.length ? <Breadcrumbs items={breadcrumbs} inverse className="mb-8" /> : null}

        <div className={cn(aside && "grid gap-10 lg:grid-cols-12 lg:items-end")}>
          <div className={cn("max-w-3xl", aside && "lg:col-span-7")}>
            {eyebrow ? (
              <p className="eyebrow mb-5 text-bronze-300">
                <span aria-hidden className="h-px w-8 bg-bronze-300/60" />
                {eyebrow}
              </p>
            ) : null}

            <h1
              className={cn(
                "text-balance-tight text-text-inverse",
                size === "compact"
                  ? "text-3xl leading-[1.1] sm:text-4xl"
                  : "text-4xl leading-[1.05] sm:text-5xl lg:text-[3.5rem]",
              )}
            >
              {title}
            </h1>

            {description ? (
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-text-inverse-muted sm:text-lg">
                {description}
              </p>
            ) : null}

            {actions ? <div className="mt-9 flex flex-wrap gap-3">{actions}</div> : null}
          </div>

          {aside ? <div className="lg:col-span-5">{aside}</div> : null}
        </div>
      </div>
    </section>
  );
}

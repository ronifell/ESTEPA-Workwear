"use client";

import Image from "next/image";
import { useState } from "react";

import { useI18n } from "@/components/providers/i18n-provider";
import { Badge } from "@/components/ui/badge";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { format } from "@/i18n";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

export function ProductGallery({ product }: { readonly product: Product }) {
  const { locale, dictionary } = useI18n();
  const [activeIndex, setActiveIndex] = useState(0);
  const images = product.images;
  const active = images[activeIndex];

  return (
    <div className="flex flex-col gap-4">
      <div
        className="relative aspect-4/5 overflow-hidden border border-border bg-sand-200"
        role="group"
        aria-label={dictionary.product.gallery}
      >
        {active ? (
          <Image
            src={active.src}
            alt={active.alt[locale]}
            fill
            priority
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        ) : (
          <PlaceholderImage
            category={product.category}
            label={dictionary.common.comingSoon}
            iconClassName="size-28"
          />
        )}

        {product.preliminary ? (
          <div className="absolute left-4 top-4">
            <Badge tone="pending">{dictionary.common.preliminaryContent}</Badge>
          </div>
        ) : null}
      </div>

      {images.length > 1 ? (
        <ul className="grid grid-cols-4 gap-3">
          {images.map((image, index) => (
            <li key={image.src}>
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={format(dictionary.product.thumbnail, { index: index + 1 })}
                aria-current={index === activeIndex ? "true" : undefined}
                className={cn(
                  "relative block aspect-square w-full overflow-hidden border transition-colors",
                  index === activeIndex
                    ? "border-primary"
                    : "border-border hover:border-border-strong",
                )}
              >
                <Image
                  src={image.src}
                  alt=""
                  fill
                  sizes="120px"
                  className="object-cover"
                />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

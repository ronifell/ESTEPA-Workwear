"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from "react";

import { useI18n } from "@/components/providers/i18n-provider";
import { ProductImageOverlay } from "@/components/products/product-image-overlay";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/ui/icons";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { format } from "@/i18n";
import { isUploadedMedia } from "@/lib/product-media";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

const SWIPE_PX = 48;

export function ProductGallery({ product }: { readonly product: Product }) {
  const { locale, dictionary } = useI18n();
  const images = product.images;
  const count = images.length;
  const canSlide = count > 1;
  const [index, setIndex] = useState(0);
  const [dragPx, setDragPx] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const statusId = useId();
  const pointerStart = useRef<{ x: number; y: number; dragging: boolean } | null>(null);
  const thumbsRef = useRef<HTMLUListElement>(null);
  const imageKey = images.map((image) => image.src).join("|");

  const goPrev = useCallback(() => {
    if (!canSlide) return;
    setIndex((current) => (current - 1 + count) % count);
  }, [canSlide, count]);

  const goNext = useCallback(() => {
    if (!canSlide) return;
    setIndex((current) => (current + 1) % count);
  }, [canSlide, count]);

  const goTo = useCallback(
    (next: number) => {
      if (!canSlide) return;
      setIndex(next);
    },
    [canSlide],
  );

  useEffect(() => {
    setIndex(0);
  }, [imageKey]);

  useEffect(() => {
    const row = thumbsRef.current;
    const thumb = row?.children[index];
    if (!(thumb instanceof HTMLElement)) return;
    thumb.scrollIntoView({ behavior: "smooth", inline: "nearest", block: "nearest" });
  }, [index]);

  function finishDrag(deltaX: number) {
    setIsDragging(false);
    setDragPx(0);
    pointerStart.current = null;
    if (!canSlide) return;
    if (deltaX <= -SWIPE_PX) goNext();
    else if (deltaX >= SWIPE_PX) goPrev();
  }

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (!canSlide || event.button !== 0) return;
    pointerStart.current = { x: event.clientX, y: event.clientY, dragging: false };
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    const start = pointerStart.current;
    if (!start) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (!start.dragging) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
      if (Math.abs(dy) > Math.abs(dx)) {
        pointerStart.current = null;
        return;
      }
      start.dragging = true;
      setIsDragging(true);
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    setDragPx(dx);
  }

  function onPointerUp(event: PointerEvent<HTMLDivElement>) {
    const start = pointerStart.current;
    if (!start) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    finishDrag(event.clientX - start.x);
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (!canSlide) return;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrev();
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
    }
  }

  const active = images[index];

  return (
    <div className="flex flex-col gap-4">
      <div
        className={cn(
          "relative aspect-4/5 overflow-hidden rounded-3xl border border-border bg-sand-200 touch-pan-y select-none",
          canSlide && (isDragging ? "cursor-grabbing" : "cursor-grab"),
        )}
        role="group"
        aria-roledescription="carousel"
        aria-label={dictionary.product.gallery}
        aria-describedby={canSlide ? statusId : undefined}
        tabIndex={canSlide ? 0 : undefined}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {count > 0 ? (
          <div
            className={cn(
              "flex h-full",
              !isDragging && "transition-transform duration-300 ease-[var(--ease-out-industrial)]",
              "motion-reduce:transition-none",
            )}
            style={{
              width: `${count * 100}%`,
              transform: `translateX(calc(-${index} * (100% / ${count}) + ${dragPx}px))`,
            }}
          >
            {images.map((image, imageIndex) => (
              <div
                key={image.src}
                className="relative h-full shrink-0"
                style={{ width: `${100 / count}%` }}
              >
                <Image
                  src={image.src}
                  alt={imageIndex === index ? image.alt[locale] : ""}
                  fill
                  unoptimized={isUploadedMedia(image.src)}
                  priority={imageIndex === 0}
                  draggable={false}
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="pointer-events-none object-contain"
                />
              </div>
            ))}
          </div>
        ) : (
          <PlaceholderImage
            category={product.category}
            label={dictionary.common.comingSoon}
            iconClassName="size-28"
          />
        )}

        {canSlide ? (
          <>
            <p id={statusId} className="sr-only" aria-live="polite">
              {format(dictionary.product.galleryStatus, {
                current: index + 1,
                total: count,
              })}
            </p>

            <button
              type="button"
              onClick={goPrev}
              onPointerDown={(event) => event.stopPropagation()}
              aria-label={dictionary.product.galleryPrevious}
              className="absolute left-3 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-white/90 text-navy-900 shadow-card transition-colors hover:border-primary hover:bg-white"
            >
              <ArrowLeftIcon className="size-4" />
            </button>
            <button
              type="button"
              onClick={goNext}
              onPointerDown={(event) => event.stopPropagation()}
              aria-label={dictionary.product.galleryNext}
              className="absolute right-3 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-white/90 text-navy-900 shadow-card transition-colors hover:border-primary hover:bg-white"
            >
              <ArrowRightIcon className="size-4" />
            </button>
          </>
        ) : null}

        {product.preliminary ? (
          <div className="pointer-events-none absolute left-4 top-4 z-10">
            <Badge tone="pending">{dictionary.common.preliminaryContent}</Badge>
          </div>
        ) : null}

        {index === 0 ? (
          <ProductImageOverlay product={product} locale={locale} />
        ) : null}
      </div>

      {canSlide ? (
        <ul
          ref={thumbsRef}
          className="flex gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {images.map((image, imageIndex) => (
            <li key={image.src} className="w-[calc((100%-2.25rem)/4)] min-w-[4.5rem] shrink-0">
              <button
                type="button"
                onClick={() => goTo(imageIndex)}
                aria-label={format(dictionary.product.thumbnail, { index: imageIndex + 1 })}
                aria-current={imageIndex === index ? "true" : undefined}
                className={cn(
                  "relative block aspect-square w-full overflow-hidden rounded-2xl border transition-colors",
                  imageIndex === index
                    ? "border-primary"
                    : "border-border hover:border-border-strong",
                )}
              >
                <Image
                  src={image.src}
                  alt=""
                  fill
                  unoptimized={isUploadedMedia(image.src)}
                  draggable={false}
                  sizes="120px"
                  className="object-cover"
                />
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      {active ? <span className="sr-only">{active.alt[locale]}</span> : null}
    </div>
  );
}

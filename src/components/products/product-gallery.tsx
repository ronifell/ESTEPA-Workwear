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
import { cn } from "@/lib/utils";
import type { Product, ProductImage } from "@/types";

const SWIPE_PX = 48;

function loopSlides(images: readonly ProductImage[]): ProductImage[] {
  if (images.length < 2) return [...images];
  const first = images[0];
  const last = images[images.length - 1];
  if (!first || !last) return [...images];
  return [last, ...images, first];
}

export function ProductGallery({ product }: { readonly product: Product }) {
  const { locale, dictionary } = useI18n();
  const images = product.images;
  const count = images.length;
  const canSlide = count > 1;
  const slides = loopSlides(images);
  const [position, setPosition] = useState(canSlide ? 1 : 0);
  const [dragPx, setDragPx] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [instant, setInstant] = useState(false);
  const statusId = useId();
  const pointerStart = useRef<{ x: number; y: number; dragging: boolean } | null>(null);
  const thumbsRef = useRef<HTMLUListElement>(null);
  const busy = useRef(false);

  const activeIndex = canSlide ? (position - 1 + count) % count : 0;

  const goPrev = useCallback(() => {
    if (!canSlide || busy.current) return;
    busy.current = true;
    setPosition((current) => current - 1);
  }, [canSlide]);

  const goNext = useCallback(() => {
    if (!canSlide || busy.current) return;
    busy.current = true;
    setPosition((current) => current + 1);
  }, [canSlide]);

  const goTo = useCallback(
    (index: number) => {
      if (!canSlide) return;
      busy.current = true;
      setPosition(index + 1);
    },
    [canSlide],
  );

  useEffect(() => {
    const row = thumbsRef.current;
    const thumb = row?.children[activeIndex];
    if (!(thumb instanceof HTMLElement)) return;
    thumb.scrollIntoView({ behavior: "smooth", inline: "nearest", block: "nearest" });
  }, [activeIndex]);

  useEffect(() => {
    if (!instant) return;
    const frame = requestAnimationFrame(() => setInstant(false));
    return () => cancelAnimationFrame(frame);
  }, [instant, position]);

  useEffect(() => {
    if (!canSlide || isDragging) return;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const id = window.setTimeout(() => {
      if (position === 0) {
        setInstant(true);
        setPosition(count);
        busy.current = false;
        return;
      }
      if (position === count + 1) {
        setInstant(true);
        setPosition(1);
        busy.current = false;
        return;
      }
      busy.current = false;
    }, reduced ? 0 : 320);
    return () => window.clearTimeout(id);
  }, [position, count, canSlide, isDragging]);

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

  const active = images[activeIndex];

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
              !isDragging && !instant && "transition-transform duration-300 ease-[var(--ease-out-industrial)]",
              "motion-reduce:transition-none",
            )}
            style={{
              transform: `translateX(calc(${-position * 100}% + ${dragPx}px))`,
            }}
          >
            {slides.map((image, index) => (
              <div key={`${image.src}-${index}`} className="relative h-full w-full shrink-0">
                <Image
                  src={image.src}
                  alt={index === position ? image.alt[locale] : ""}
                  fill
                  priority={index === (canSlide ? 1 : 0)}
                  draggable={false}
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="pointer-events-none object-cover"
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
                current: activeIndex + 1,
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

        {activeIndex === 0 ? (
          <ProductImageOverlay product={product} locale={locale} />
        ) : null}
      </div>

      {canSlide ? (
        <ul
          ref={thumbsRef}
          className="flex gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {images.map((image, index) => (
            <li key={image.src} className="w-[calc((100%-2.25rem)/4)] min-w-[4.5rem] shrink-0">
              <button
                type="button"
                onClick={() => goTo(index)}
                aria-label={format(dictionary.product.thumbnail, { index: index + 1 })}
                aria-current={index === activeIndex ? "true" : undefined}
                className={cn(
                  "relative block aspect-square w-full overflow-hidden rounded-2xl border transition-colors",
                  index === activeIndex
                    ? "border-primary"
                    : "border-border hover:border-border-strong",
                )}
              >
                <Image
                  src={image.src}
                  alt=""
                  fill
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

"use client";

import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

import { cn } from "@/lib/utils";

const GAP = 10;
const VIEWPORT_PAD = 12;

function placeTooltip(trigger: DOMRect, width: number, height: number) {
  const maxLeft = Math.max(VIEWPORT_PAD, window.innerWidth - width - VIEWPORT_PAD);
  const left = Math.min(Math.max(trigger.left + trigger.width / 2 - width / 2, VIEWPORT_PAD), maxLeft);

  const aboveTop = trigger.top - GAP - height;
  const belowTop = trigger.bottom + GAP;
  const fitsAbove = aboveTop >= VIEWPORT_PAD;
  const fitsBelow = belowTop + height <= window.innerHeight - VIEWPORT_PAD;

  if (fitsAbove || (!fitsBelow && trigger.top > window.innerHeight - trigger.bottom)) {
    return { top: Math.max(VIEWPORT_PAD, aboveTop), left };
  }

  return { top: belowTop, left };
}

function sameCoords(
  current: { top: number; left: number } | null,
  next: { top: number; left: number },
) {
  return current?.top === next.top && current?.left === next.left;
}

/**
 * Hover tooltip on pointer devices; tap/click toggle on touch.
 * Always exposes `aria-label` on the trigger for accessibility and SEO.
 *
 * Rendered in a portal so overflow, transforms and later siblings cannot clip it.
 */
export function InfoTooltip({
  label,
  title,
  content,
  children,
  className,
}: {
  readonly label: string;
  readonly title?: string;
  readonly content: string;
  readonly children: ReactNode;
  readonly className?: string;
}) {
  const tooltipId = useId();
  const rootRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLSpanElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(null);

  if (!open && coords) setCoords(null);

  const show = useCallback(() => {
    clearTimeout(closeTimer.current);
    setOpen(true);
  }, []);

  const hide = useCallback(() => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 80);
  }, []);

  const updatePosition = useCallback(() => {
    const trigger = rootRef.current;
    const tooltip = tooltipRef.current;
    if (!trigger || !tooltip) return;

    const rect = trigger.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) {
      setOpen(false);
      return;
    }

    const next = placeTooltip(rect, tooltip.offsetWidth, tooltip.offsetHeight);
    setCoords((current) => (sameCoords(current, next) ? current : next));
  }, []);

  const setTooltipNode = useCallback(
    (node: HTMLSpanElement | null) => {
      tooltipRef.current = node;
      if (node) updatePosition();
    },
    [updatePosition],
  );

  useEffect(() => {
    if (!open) return;

    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open, updatePosition]);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: PointerEvent) {
      const target = event.target as Node;
      if (rootRef.current?.contains(target) || tooltipRef.current?.contains(target)) return;
      setOpen(false);
    }

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  const tooltip = open ? (
    <span
      ref={setTooltipNode}
      id={tooltipId}
      role="tooltip"
      style={{
        top: coords?.top ?? 0,
        left: coords?.left ?? 0,
        visibility: coords ? "visible" : "hidden",
      }}
      className="fixed z-[60] w-64 border border-navy-800 bg-navy-900 px-3 py-2.5 text-left shadow-card sm:w-72"
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      {title ? (
        <span className="block font-display text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-bronze-300">
          {title}
        </span>
      ) : null}
      <span className={cn("block text-xs leading-relaxed text-text-inverse", title && "mt-1.5")}>
        {content}
      </span>
    </span>
  ) : null;

  return (
    <span
      ref={rootRef}
      className={cn("relative inline-flex", className)}
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      <button
        type="button"
        aria-label={label}
        aria-describedby={open ? tooltipId : undefined}
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        onFocus={show}
        onBlur={(event) => {
          if (rootRef.current?.contains(event.relatedTarget as Node)) return;
          if (tooltipRef.current?.contains(event.relatedTarget as Node)) return;
          hide();
        }}
        className="inline-flex cursor-help rounded-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        {children}
      </button>
      {tooltip ? createPortal(tooltip, document.body) : null}
    </span>
  );
}

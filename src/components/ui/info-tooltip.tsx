"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Hover tooltip on pointer devices; tap/click toggle on touch.
 * Always exposes `aria-label` on the trigger for accessibility and SEO.
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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: PointerEvent) {
      if (rootRef.current?.contains(event.target as Node)) return;
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

  return (
    <span
      ref={rootRef}
      className={cn("relative inline-flex", className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-label={label}
        aria-describedby={open ? tooltipId : undefined}
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        onFocus={() => setOpen(true)}
        onBlur={(event) => {
          if (rootRef.current?.contains(event.relatedTarget as Node)) return;
          setOpen(false);
        }}
        className="inline-flex cursor-help rounded-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        {children}
      </button>

      {open ? (
        <span
          id={tooltipId}
          role="tooltip"
          className="absolute bottom-[calc(100%+0.55rem)] left-1/2 z-50 w-64 -translate-x-1/2 border border-navy-800 bg-navy-900 px-3 py-2.5 text-left shadow-card sm:w-72"
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
      ) : null}
    </span>
  );
}

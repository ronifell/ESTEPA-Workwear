"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Reveals content on scroll with a single shared IntersectionObserver, so a
 * page with dozens of animated blocks still creates one observer.
 */
let observer: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver | null {
  if (typeof window === "undefined" || !("IntersectionObserver" in window)) return null;

  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.setAttribute("data-visible", "true");
        observer?.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
  );

  return observer;
}

export interface RevealProps {
  readonly children: ReactNode;
  readonly as?: ElementType;
  readonly className?: string;
  /** Stagger in milliseconds. */
  readonly delay?: number;
}

export function Reveal({ children, as: Tag = "div", className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const instance = getObserver();
    if (!instance) {
      node.setAttribute("data-visible", "true");
      return;
    }

    instance.observe(node);
    return () => instance.unobserve(node);
  }, []);

  return (
    <Tag
      ref={ref}
      className={cn("reveal", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}

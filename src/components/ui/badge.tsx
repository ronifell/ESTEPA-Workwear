import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type BadgeTone = "neutral" | "accent" | "primary" | "pending" | "inverse";

const tones: Record<BadgeTone, string> = {
  neutral: "border-border bg-surface text-text-muted",
  accent: "border-accent/30 bg-accent-soft text-bronze-600",
  primary: "border-navy-200 bg-primary-soft text-primary",
  pending: "border-warning/25 bg-warning-soft text-warning",
  inverse: "border-white/20 bg-white/10 text-text-inverse",
};

export interface BadgeProps {
  readonly children: ReactNode;
  readonly tone?: BadgeTone;
  readonly className?: string;
  readonly icon?: ReactNode;
}

export function Badge({ children, tone = "neutral", className, icon }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-xs border px-2.5 py-1 font-display text-[0.625rem] font-semibold uppercase tracking-[0.12em] leading-none",
        tones[tone],
        className,
      )}
    >
      {icon}
      {children}
    </span>
  );
}

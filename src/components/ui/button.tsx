import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

export type ButtonVariant =
  | "primary"
  | "accent"
  | "outline"
  | "ghost"
  | "inverse"
  | "inverse-outline";

export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2.5 rounded-xs font-display text-[0.8125rem] font-semibold uppercase tracking-[0.1em] transition-all duration-200 ease-[var(--ease-out-industrial)] disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-primary-contrast hover:bg-primary-hover hover:shadow-[0_10px_24px_-12px_rgb(16_35_58/0.8)] active:translate-y-px",
  accent:
    "bg-accent text-accent-contrast hover:bg-accent-hover hover:shadow-[0_10px_24px_-12px_rgb(143_106_44/0.9)] active:translate-y-px",
  outline:
    "border border-border-strong bg-transparent text-primary hover:border-primary hover:bg-primary hover:text-primary-contrast active:translate-y-px",
  ghost: "bg-transparent text-primary hover:bg-primary-soft",
  inverse:
    "bg-surface text-primary hover:bg-sand-100 active:translate-y-px",
  "inverse-outline":
    "border border-white/30 bg-transparent text-text-inverse hover:border-white hover:bg-white hover:text-primary active:translate-y-px",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4",
  md: "h-11 px-6",
  lg: "h-13 px-8 text-sm",
};

export function buttonStyles(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className?: string,
): string {
  return cn(base, variants[variant], sizes[size], className);
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
  readonly children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  type = "button",
  children,
  ...props
}: ButtonProps) {
  return (
    <button type={type} className={buttonStyles(variant, size, className)} {...props}>
      {children}
    </button>
  );
}

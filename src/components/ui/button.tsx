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
  "relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full font-display text-[0.8125rem] font-semibold uppercase tracking-[0.12em] transition-all duration-300 ease-[var(--ease-out-industrial)] disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap before:pointer-events-none before:absolute before:inset-x-5 before:top-0 before:h-px before:bg-white/30";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-navy-800 text-primary-contrast shadow-[0_12px_28px_-14px_rgb(10_23_39/0.85)] hover:-translate-y-0.5 hover:bg-navy-900 hover:shadow-[0_16px_32px_-14px_rgb(10_23_39/0.9)] active:translate-y-0",
  accent:
    "bg-accent text-accent-contrast shadow-[0_12px_28px_-14px_rgb(143_106_44/0.85)] hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-[0_16px_32px_-14px_rgb(143_106_44/0.95)] active:translate-y-0",
  outline:
    "border-2 border-navy-800/80 bg-surface/70 text-primary shadow-[0_8px_20px_-16px_rgb(10_23_39/0.5)] backdrop-blur-sm before:bg-navy-900/10 hover:-translate-y-0.5 hover:border-navy-900 hover:bg-navy-900 hover:text-primary-contrast active:translate-y-0",
  ghost: "bg-transparent text-primary before:hidden hover:bg-primary-soft",
  inverse:
    "bg-surface text-primary shadow-[0_12px_28px_-16px_rgb(0_0_0/0.45)] hover:-translate-y-0.5 hover:bg-sand-100 active:translate-y-0",
  "inverse-outline":
    "border-2 border-white/45 bg-white/5 text-text-inverse backdrop-blur-sm hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-primary active:translate-y-0",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-10 px-5",
  md: "h-12 px-7",
  lg: "h-14 px-9 text-sm",
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

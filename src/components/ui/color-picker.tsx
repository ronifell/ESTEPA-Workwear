"use client";

import { cn } from "@/lib/utils";

const HEX_SIX = /^#([0-9a-fA-F]{6})$/;
const HEX_THREE = /^#([0-9a-fA-F]{3})$/;

/** Native `<input type="color">` only accepts `#rrggbb`. */
export function toPickerHex(value: string): string {
  const trimmed = value.trim();
  const six = HEX_SIX.exec(trimmed);
  if (six) return `#${six[1]!.toLowerCase()}`;

  const three = HEX_THREE.exec(trimmed);
  if (three) {
    const digits = three[1]!;
    return `#${digits[0]}${digits[0]}${digits[1]}${digits[1]}${digits[2]}${digits[2]}`.toLowerCase();
  }

  return "#000000";
}

export interface ColorPickerProps {
  readonly id: string;
  readonly value: string;
  readonly onChange: (hex: string) => void;
  readonly chooseLabel: string;
  readonly invalid?: boolean;
}

/** Clickable swatch that opens the browser color picker and stores `#RRGGBB`. */
export function ColorPicker({
  id,
  value,
  onChange,
  chooseLabel,
  invalid,
}: ColorPickerProps) {
  const pickerValue = toPickerHex(value);

  return (
    <div
      className={cn(
        "relative flex h-11 items-center gap-3 overflow-hidden rounded-2xl border bg-surface px-2 transition-colors",
        invalid ? "border-danger" : "border-border-strong",
        "focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15",
      )}
    >
      <span
        className="pointer-events-none size-8 shrink-0 rounded-xl border border-border"
        style={{ backgroundColor: pickerValue }}
        aria-hidden
      />
      <span className="pointer-events-none font-display text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-text-muted">
        {chooseLabel}
      </span>
      <input
        id={id}
        type="color"
        value={pickerValue}
        aria-invalid={invalid || undefined}
        aria-describedby={invalid ? `${id}-error` : undefined}
        onChange={(event) => onChange(event.target.value.toUpperCase())}
        className="absolute inset-0 h-full w-full cursor-pointer border-0 p-0 opacity-0 [&::-moz-color-swatch]:border-none [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:border-none"
      />
    </div>
  );
}

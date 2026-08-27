"use client";

import { useId } from "react";

import { MinusIcon, PlusIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { clamp } from "@/lib/utils";

export interface QuantitySelectorProps {
  readonly value: number;
  readonly onChange: (value: number) => void;
  readonly min?: number;
  readonly max?: number;
  readonly label: string;
  readonly decreaseLabel: string;
  readonly increaseLabel: string;
  readonly size?: "sm" | "md";
  readonly className?: string;
}

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
  label,
  decreaseLabel,
  increaseLabel,
  size = "md",
  className,
}: QuantitySelectorProps) {
  const id = useId();
  const buttonSize = size === "sm" ? "size-9" : "size-11";
  const inputSize = size === "sm" ? "h-9 w-10 text-sm" : "h-11 w-14 text-base";

  return (
    <div className={cn("inline-flex items-stretch overflow-hidden rounded-full border border-border-strong", className)}>
      <button
        type="button"
        aria-label={decreaseLabel}
        disabled={value <= min}
        onClick={() => onChange(clamp(value - 1, min, max))}
        className={cn(
          buttonSize,
          "flex items-center justify-center text-text-muted transition-colors hover:bg-sand-200 hover:text-text disabled:pointer-events-none disabled:opacity-35",
        )}
      >
        <MinusIcon className="size-4" />
      </button>

      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        type="number"
        inputMode="numeric"
        min={min}
        max={max}
        value={value}
        onChange={(event) => {
          const parsed = Number.parseInt(event.target.value, 10);
          onChange(Number.isNaN(parsed) ? min : clamp(parsed, min, max));
        }}
        className={cn(
          inputSize,
          "border-x border-border-strong bg-transparent text-center font-display font-semibold tabular-nums outline-none [appearance:textfield] focus-visible:bg-sand-50 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
        )}
      />

      <button
        type="button"
        aria-label={increaseLabel}
        disabled={value >= max}
        onClick={() => onChange(clamp(value + 1, min, max))}
        className={cn(
          buttonSize,
          "flex items-center justify-center text-text-muted transition-colors hover:bg-sand-200 hover:text-text disabled:pointer-events-none disabled:opacity-35",
        )}
      >
        <PlusIcon className="size-4" />
      </button>
    </div>
  );
}

import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

import { ChevronDownIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

const controlStyles =
  "w-full rounded-xs border bg-surface px-3.5 py-2.5 text-[0.9375rem] text-text transition-colors placeholder:text-text-subtle focus:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/15 disabled:cursor-not-allowed disabled:bg-sand-100";

export interface FieldProps {
  readonly id: string;
  readonly label: string;
  readonly children: ReactNode;
  readonly error?: string | undefined;
  readonly hint?: string;
  readonly required?: boolean;
  readonly optionalLabel?: string;
  readonly className?: string;
}

export function Field({
  id,
  label,
  children,
  error,
  hint,
  required = false,
  optionalLabel,
  className,
}: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label
        htmlFor={id}
        className="font-display text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-text-muted"
      >
        {label}
        {required ? (
          <span className="ml-1 text-accent" aria-hidden>
            *
          </span>
        ) : optionalLabel ? (
          <span className="ml-1.5 font-normal normal-case tracking-normal text-text-subtle">
            ({optionalLabel})
          </span>
        ) : null}
      </label>

      {children}

      {hint && !error ? <p className="text-xs text-text-subtle">{hint}</p> : null}
      {error ? (
        <p id={`${id}-error`} className="text-xs font-medium text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  readonly invalid?: boolean;
}

export function TextInput({ invalid, className, id, ...props }: TextInputProps) {
  return (
    <input
      id={id}
      aria-invalid={invalid || undefined}
      aria-describedby={invalid && id ? `${id}-error` : undefined}
      className={cn(
        controlStyles,
        invalid ? "border-danger" : "border-border-strong",
        className,
      )}
      {...props}
    />
  );
}

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  readonly invalid?: boolean;
}

export function TextArea({ invalid, className, id, rows = 5, ...props }: TextAreaProps) {
  return (
    <textarea
      id={id}
      rows={rows}
      aria-invalid={invalid || undefined}
      aria-describedby={invalid && id ? `${id}-error` : undefined}
      className={cn(
        controlStyles,
        "resize-y",
        invalid ? "border-danger" : "border-border-strong",
        className,
      )}
      {...props}
    />
  );
}

export interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  readonly invalid?: boolean;
  readonly children: ReactNode;
}

export function SelectField({
  invalid,
  className,
  id,
  children,
  ...props
}: SelectFieldProps) {
  return (
    <div className="relative">
      <select
        id={id}
        aria-invalid={invalid || undefined}
        aria-describedby={invalid && id ? `${id}-error` : undefined}
        className={cn(
          controlStyles,
          "appearance-none pr-10",
          invalid ? "border-danger" : "border-border-strong",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-text-subtle" />
    </div>
  );
}

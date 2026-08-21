"use client";

import { useRef, useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Field, SelectField, TextArea, TextInput } from "@/components/ui/field";
import { adminCopy, translateFieldError } from "@/lib/admin/copy";
import { cn } from "@/lib/utils";

export type Errors = Readonly<Record<string, string>>;

export interface LocalizedDraft {
  es: string;
  en: string;
}

/** Grouped block of related fields. */
export function AdminCard({
  title,
  description,
  children,
  className,
}: {
  readonly title: string;
  readonly description?: string;
  readonly children: ReactNode;
  readonly className?: string;
}) {
  return (
    <section className={cn("border border-border bg-surface", className)}>
      <header className="border-b border-border px-5 py-4 sm:px-6">
        <h2 className="font-display text-sm font-semibold uppercase tracking-[0.12em] text-navy-900">
          {title}
        </h2>
        {description ? (
          <p className="mt-1.5 text-sm leading-relaxed text-text-muted">{description}</p>
        ) : null}
      </header>
      <div className="space-y-5 px-5 py-5 sm:px-6 sm:py-6">{children}</div>
    </section>
  );
}

/** Spanish + English pair for a single string. */
export function LocalizedTextField({
  id,
  label,
  value,
  onChange,
  errors,
  errorKey,
  hint,
  required = false,
  multiline = false,
  rows = 4,
}: {
  readonly id: string;
  readonly label: string;
  readonly value: LocalizedDraft;
  readonly onChange: (next: LocalizedDraft) => void;
  readonly errors?: Errors;
  readonly errorKey?: string;
  readonly hint?: string;
  readonly required?: boolean;
  readonly multiline?: boolean;
  readonly rows?: number;
}) {
  const errorEs = errorKey ? translateFieldError(errors?.[`${errorKey}.es`]) : undefined;
  const errorEn = errorKey ? translateFieldError(errors?.[`${errorKey}.en`]) : undefined;

  return (
    <div className="space-y-3">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          id={`${id}-es`}
          label={`${label} · ${adminCopy.form.localeEs}`}
          required={required}
          error={errorEs}
        >
          {multiline ? (
            <TextArea
              id={`${id}-es`}
              rows={rows}
              value={value.es}
              invalid={Boolean(errorEs)}
              onChange={(event) => onChange({ ...value, es: event.target.value })}
            />
          ) : (
            <TextInput
              id={`${id}-es`}
              value={value.es}
              invalid={Boolean(errorEs)}
              onChange={(event) => onChange({ ...value, es: event.target.value })}
            />
          )}
        </Field>

        <Field
          id={`${id}-en`}
          label={`${label} · ${adminCopy.form.localeEn}`}
          error={errorEn}
        >
          {multiline ? (
            <TextArea
              id={`${id}-en`}
              rows={rows}
              value={value.en}
              invalid={Boolean(errorEn)}
              onChange={(event) => onChange({ ...value, en: event.target.value })}
            />
          ) : (
            <TextInput
              id={`${id}-en`}
              value={value.en}
              invalid={Boolean(errorEn)}
              onChange={(event) => onChange({ ...value, en: event.target.value })}
            />
          )}
        </Field>
      </div>

      <p className="text-xs text-text-subtle">
        {hint ? `${hint} ` : ""}
        {adminCopy.form.localeFallbackHint}
      </p>
    </div>
  );
}

/** Spanish + English lists, one item per line. */
export function LocalizedLinesField({
  id,
  label,
  value,
  onChange,
  rows = 4,
}: {
  readonly id: string;
  readonly label: string;
  readonly value: LocalizedDraft;
  readonly onChange: (next: LocalizedDraft) => void;
  readonly rows?: number;
}) {
  return (
    <LocalizedTextField
      id={id}
      label={label}
      value={value}
      onChange={onChange}
      hint={adminCopy.form.onePerLine}
      multiline
      rows={rows}
    />
  );
}

export function CheckboxGroup<T extends string>({
  legend,
  options,
  values,
  onChange,
  hint,
  error,
}: {
  readonly legend: string;
  readonly options: readonly { readonly value: T; readonly label: string }[];
  readonly values: readonly T[];
  readonly onChange: (next: T[]) => void;
  readonly hint?: string;
  readonly error?: string;
}) {
  function toggle(value: T): void {
    onChange(
      values.includes(value) ? values.filter((entry) => entry !== value) : [...values, value],
    );
  }

  return (
    <fieldset>
      <legend className="font-display text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-text-muted">
        {legend}
      </legend>

      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => {
          const checked = values.includes(option.value);
          return (
            <label
              key={option.value}
              className={cn(
                "inline-flex cursor-pointer items-center gap-2 rounded-xs border px-3 py-2 text-sm transition-colors",
                checked
                  ? "border-primary bg-primary-soft text-primary"
                  : "border-border-strong bg-surface text-text-muted hover:border-primary",
              )}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggle(option.value)}
                className="size-4 accent-[var(--color-primary)]"
              />
              {option.label}
            </label>
          );
        })}
      </div>

      {error ? (
        <p className="mt-2 text-xs font-medium text-danger">{error}</p>
      ) : hint ? (
        <p className="mt-2 text-xs text-text-subtle">{hint}</p>
      ) : null}
    </fieldset>
  );
}

export function ToggleField({
  id,
  label,
  description,
  checked,
  onChange,
}: {
  readonly id: string;
  readonly label: string;
  readonly description?: string;
  readonly checked: boolean;
  readonly onChange: (next: boolean) => void;
}) {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer items-start gap-3 rounded-xs border border-border-strong bg-surface px-4 py-3.5"
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-0.5 size-4 accent-[var(--color-primary)]"
      />
      <span className="min-w-0">
        <span className="block font-display text-sm font-semibold text-navy-900">{label}</span>
        {description ? (
          <span className="mt-1 block text-xs leading-relaxed text-text-muted">
            {description}
          </span>
        ) : null}
      </span>
    </label>
  );
}

/** Add / remove list of sub-records (images, documents, variants…). */
export function RepeatableList({
  title,
  addLabel,
  emptyLabel,
  count,
  onAdd,
  children,
}: {
  readonly title?: string;
  readonly addLabel: string;
  readonly emptyLabel: string;
  readonly count: number;
  readonly onAdd: () => void;
  readonly children: ReactNode;
}) {
  return (
    <div className="space-y-4">
      {title ? (
        <p className="font-display text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-text-muted">
          {title}
        </p>
      ) : null}

      {count === 0 ? (
        <p className="rounded-xs border border-dashed border-border-strong bg-surface-muted px-4 py-6 text-center text-sm text-text-subtle">
          {emptyLabel}
        </p>
      ) : (
        <div className="space-y-4">{children}</div>
      )}

      <Button variant="outline" size="sm" onClick={onAdd}>
        {addLabel}
      </Button>
    </div>
  );
}

export function RepeatableRow({
  index,
  onRemove,
  children,
}: {
  readonly index: number;
  readonly onRemove: () => void;
  readonly children: ReactNode;
}) {
  return (
    <div className="rounded-xs border border-border bg-surface-muted p-4">
      <div className="mb-4 flex items-center justify-between gap-4">
        <span className="font-display text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-text-subtle">
          #{index + 1}
        </span>
        <button
          type="button"
          onClick={onRemove}
          className="font-display text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-danger transition-opacity hover:opacity-70"
        >
          {adminCopy.form.remove}
        </button>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

export interface OptionItem {
  readonly value: string;
  readonly label: string;
}

export function SelectRow({
  id,
  label,
  value,
  options,
  onChange,
}: {
  readonly id: string;
  readonly label: string;
  readonly value: string;
  readonly options: readonly OptionItem[];
  readonly onChange: (next: string) => void;
}) {
  return (
    <Field id={id} label={label}>
      <SelectField id={id} value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </SelectField>
    </Field>
  );
}

/**
 * File input paired with a text field: the file is uploaded to
 * `/api/admin/uploads` and the resulting public path is written back, but a
 * path or an external URL can also be typed by hand.
 */
export function MediaField({
  id,
  label,
  value,
  onChange,
  kind,
  error,
  hint,
  required = false,
}: {
  readonly id: string;
  readonly label: string;
  readonly value: string;
  readonly onChange: (next: string) => void;
  readonly kind: "image" | "document";
  readonly error?: string;
  readonly hint?: string;
  readonly required?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  async function upload(file: File): Promise<void> {
    setIsUploading(true);
    setUploadError(null);

    const body = new FormData();
    body.append("file", file);
    body.append("kind", kind);

    try {
      const response = await fetch("/api/admin/uploads", { method: "POST", body });
      const data = (await response.json().catch(() => null)) as
        | { ok: boolean; path?: string; error?: string }
        | null;

      if (!response.ok || !data?.ok || !data.path) {
        setUploadError(uploadErrorMessage(data?.error));
        return;
      }

      onChange(data.path);
    } catch {
      setUploadError(adminCopy.form.upload.failed);
    } finally {
      setIsUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  const accept =
    kind === "image" ? "image/jpeg,image/png,image/webp,image/avif" : "application/pdf";

  return (
    <Field id={id} label={label} required={required} error={error ?? uploadError ?? undefined}>
      <div className="flex flex-col gap-2 sm:flex-row">
        <TextInput
          id={id}
          value={value}
          placeholder="/uploads/products/…"
          invalid={Boolean(error)}
          onChange={(event) => onChange(event.target.value)}
          className="sm:flex-1"
        />

        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="sr-only"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) void upload(file);
          }}
        />

        <Button
          variant="outline"
          size="sm"
          className="h-11 sm:w-auto"
          disabled={isUploading}
          onClick={() => inputRef.current?.click()}
        >
          {isUploading
            ? adminCopy.form.upload.uploading
            : kind === "image"
              ? adminCopy.form.upload.image
              : adminCopy.form.upload.document}
        </Button>
      </div>

      {hint && !error && !uploadError ? (
        <p className="text-xs text-text-subtle">{hint}</p>
      ) : null}

      {kind === "image" && value ? (
        // A plain <img> keeps the preview working for any pasted URL, which
        // next/image would reject unless the host is allow-listed.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={value}
          alt=""
          className="mt-1 h-24 w-24 border border-border bg-surface object-contain"
        />
      ) : null}
    </Field>
  );
}

function uploadErrorMessage(code: string | undefined): string {
  switch (code) {
    case "file_too_large":
      return adminCopy.form.upload.tooLarge;
    case "unsupported_format":
      return adminCopy.form.upload.unsupported;
    case "storage_unavailable":
      return adminCopy.form.upload.readOnly;
    case "unauthorized":
      return adminCopy.form.errors.unauthorized;
    default:
      return adminCopy.form.upload.failed;
  }
}

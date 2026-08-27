"use client";

import { useEffect, useId, useMemo, useState } from "react";

import { BodyMeasureDiagram } from "@/components/products/body-measure-diagram";
import { CareSymbols } from "@/components/products/care-symbols";
import { useI18n } from "@/components/providers/i18n-provider";
import { Button, buttonStyles } from "@/components/ui/button";
import { CloseIcon, SparkleIcon } from "@/components/ui/icons";
import { format } from "@/i18n";
import {
  bodySizeChart,
  formatRange,
  measuresForCategory,
  recommendSize,
  type BodyMeasureId,
  type BodyMeasurements,
  type SizeRecommendation,
} from "@/data/size-charts";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

const measureHelp: Record<BodyMeasureId, "chestHelp" | "waistHelp" | "hipHelp" | "armHelp"> = {
  chest: "chestHelp",
  waist: "waistHelp",
  hip: "hipHelp",
  arm: "armHelp",
};

export function SizeSimulator({
  product,
  onSelectSize,
}: {
  readonly product: Product;
  readonly onSelectSize: (size: string) => void;
}) {
  const { locale, dictionary } = useI18n();
  const copy = dictionary.product.sizeSimulator;
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<BodyMeasurements>({});
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SizeRecommendation | null>(null);

  const keys = measuresForCategory(product.category);
  const available = product.sizes ?? [];

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function close() {
    setOpen(false);
  }

  function update(key: BodyMeasureId, raw: string) {
    const parsed = raw.trim() === "" ? undefined : Number.parseFloat(raw.replace(",", "."));
    setValues((current) => ({
      ...current,
      [key]: parsed === undefined || Number.isNaN(parsed) ? undefined : parsed,
    }));
    setResult(null);
    setError(null);
  }

  function analyze() {
    const recommendation = recommendSize(values, product.category, available);
    if (!recommendation) {
      setError(copy.missing);
      setResult(null);
      return;
    }
    setBusy(true);
    setError(null);
    window.setTimeout(() => {
      setResult(recommendation);
      setBusy(false);
    }, 380);
  }

  const resultCopy = useMemo(() => {
    if (!result) return null;
    if (result.kind === "between" && result.neighbor) {
      return format(copy.resultBetween, {
        a: result.neighbor,
        b: result.size,
        size: result.size,
      });
    }
    if (result.kind === "off") return format(copy.resultOff, { size: result.size });
    return format(copy.resultExact, { size: result.size });
  }, [copy.resultBetween, copy.resultExact, copy.resultOff, result]);

  const confidenceLabel =
    result?.confidence === "high"
      ? copy.confidenceHigh
      : result?.confidence === "mid"
        ? copy.confidenceMid
        : copy.confidenceLow;

  return (
    <>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-1.5 font-display text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-primary underline-offset-4 transition-colors hover:text-accent hover:underline"
        >
          <SparkleIcon className="size-3.5" />
          {dictionary.product.findMySize}
        </button>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="font-display text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-primary underline-offset-4 transition-colors hover:text-accent hover:underline"
        >
          {dictionary.product.sizeGuide}
        </button>
      </div>

      <div
        className={cn(
          "fixed inset-0 z-70",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!open}
      >
        <div
          onClick={close}
          className={cn(
            "absolute inset-0 bg-navy-950/55 transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0",
          )}
        />

        <div
          role="dialog"
          aria-modal={open || undefined}
          aria-labelledby={titleId}
          className={cn(
            "absolute inset-y-0 right-0 flex w-full max-w-lg flex-col overflow-hidden rounded-l-3xl bg-sand-100 shadow-2xl transition-transform duration-300 ease-[var(--ease-out-industrial)]",
            open ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
            <div>
              <p className="inline-flex items-center gap-1.5 rounded-full bg-navy-900 px-2.5 py-1 font-display text-[0.5625rem] font-semibold uppercase tracking-[0.14em] text-bronze-300">
                <SparkleIcon className="size-3" />
                {copy.badge}
              </p>
              <h2 id={titleId} className="mt-2 text-xl text-navy-900 sm:text-2xl">
                {copy.title}
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-text-muted">{copy.subtitle}</p>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label={dictionary.common.close}
              className="flex size-10 shrink-0 items-center justify-center rounded-full text-navy-900 transition-colors hover:bg-sand-200"
            >
              <CloseIcon className="size-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6">
            <div className="rounded-3xl border border-border bg-surface p-4 sm:p-5">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-navy-900">
                  {copy.howToTitle}
                </h3>
                <span className="rounded-full bg-navy-900 px-2.5 py-1 font-display text-[0.5625rem] font-bold uppercase tracking-[0.12em] text-white">
                  {copy.unitOnly}
                </span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-text-muted">{copy.howToNote}</p>
              <div className="mt-4 flex justify-center">
                <BodyMeasureDiagram caption={copy.howToTitle} locale={locale} />
              </div>
            </div>

            <ul className="mt-4 space-y-3">
              {keys.map((key) => (
                <li key={key} className="rounded-2xl border border-border bg-surface p-4">
                  <label
                    htmlFor={`measure-${key}`}
                    className="flex items-baseline justify-between gap-3 font-display text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-navy-900"
                  >
                    {copy[key]}
                    <span className="text-text-subtle">{copy.unit}</span>
                  </label>
                  <p className="mt-1 text-xs leading-relaxed text-text-muted">{copy[measureHelp[key]]}</p>
                  <input
                    id={`measure-${key}`}
                    type="number"
                    inputMode="decimal"
                    min={40}
                    max={200}
                    step="0.5"
                    value={values[key] ?? ""}
                    onChange={(event) => update(key, event.target.value)}
                    className="mt-3 h-12 w-full rounded-full border-2 border-border-strong bg-sand-50 px-4 font-display text-base font-semibold tabular-nums outline-none transition-colors focus-visible:border-primary"
                  />
                </li>
              ))}
            </ul>

            <Button
              variant="primary"
              size="lg"
              className="mt-5 w-full"
              onClick={analyze}
              disabled={busy}
            >
              <SparkleIcon className="size-4" />
              {busy ? copy.analyzing : copy.analyze}
            </Button>

            {error ? (
              <p role="alert" className="mt-3 text-sm font-semibold text-danger">
                {error}
              </p>
            ) : null}

            {result ? (
              <div className="mt-6 rounded-3xl border border-navy-900 bg-navy-900 p-5 text-text-inverse">
                <p className="font-display text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-bronze-300">
                  {confidenceLabel}
                </p>
                <p className="mt-2 font-display text-4xl font-bold text-white">{result.size}</p>
                <p className="mt-2 text-sm leading-relaxed text-text-inverse-muted">{resultCopy}</p>
                <button
                  type="button"
                  className={buttonStyles("accent", "md", "mt-5")}
                  onClick={() => {
                    onSelectSize(result.size);
                    close();
                  }}
                >
                  {copy.applySize}
                </button>
              </div>
            ) : null}

            <div className="mt-8">
              <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-navy-900">
                {copy.chartTitle}
              </h3>
              <p className="mt-1 text-xs text-text-muted">{copy.chartCaption}</p>
              <div className="mt-3 overflow-x-auto rounded-2xl border border-border">
                <table className="w-full min-w-[22rem] border-collapse text-center text-xs">
                  <thead>
                    <tr className="bg-sand-200">
                      <th className="px-3 py-2.5 text-left font-display text-[0.625rem] font-bold uppercase tracking-[0.1em] text-navy-900">
                        {copy.sizeCol}
                      </th>
                      {keys.map((key) => (
                        <th
                          key={key}
                          className="px-3 py-2.5 font-display text-[0.625rem] font-bold uppercase tracking-[0.1em] text-navy-900"
                        >
                          {copy[key]}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {bodySizeChart
                      .filter((row) => available.length === 0 || available.includes(row.size))
                      .map((row, index) => (
                        <tr
                          key={row.size}
                          className={cn(
                            index % 2 === 0 ? "bg-surface" : "bg-sand-50",
                            result?.size === row.size && "bg-bronze-100",
                          )}
                        >
                          <th className="px-3 py-2.5 text-left font-display font-bold text-navy-900">
                            {row.size}
                          </th>
                          {keys.map((key) => (
                            <td key={key} className="px-3 py-2.5 tabular-nums text-text">
                              {key === "arm" ? `${row.arm}` : formatRange(row[key])}
                            </td>
                          ))}
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            {product.care?.[locale]?.length ? (
              <div className="mt-8 rounded-3xl border border-border bg-surface p-5">
                <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-navy-900">
                  {copy.careTitle}
                </h3>
                <div className="mt-4">
                  <CareSymbols locale={locale} />
                </div>
                <ul className="mt-4 list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-text">
                  {product.care[locale].map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

"use client";

import { useEffect } from "react";

import { useI18n } from "@/components/providers/i18n-provider";
import { Button } from "@/components/ui/button";

export default function LocaleError({
  error,
  reset,
}: {
  readonly error: Error & { digest?: string };
  readonly reset: () => void;
}) {
  const { dictionary } = useI18n();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="relative isolate overflow-hidden bg-navy-900 text-text-inverse">
      <div aria-hidden className="blueprint-grid absolute inset-0 opacity-70" />
      <div aria-hidden className="hazard-stripes absolute inset-x-0 bottom-0 h-1 opacity-80" />

      <div className="container-page relative flex min-h-[60vh] flex-col items-start justify-center py-24">
        <h1 className="max-w-2xl text-3xl leading-[1.1] text-text-inverse sm:text-4xl">
          {dictionary.error.title}
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-text-inverse-muted">
          {dictionary.error.description}
        </p>

        <Button variant="inverse" size="md" className="mt-9" onClick={reset}>
          {dictionary.error.retry}
        </Button>
      </div>
    </section>
  );
}

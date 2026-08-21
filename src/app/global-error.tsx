"use client";

import { useEffect } from "react";

import "@/styles/globals.css";

/** Last-resort boundary: must render its own document shell. */
export default function GlobalError({
  error,
  reset,
}: {
  readonly error: Error & { digest?: string };
  readonly reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="es">
      <body className="flex min-h-dvh flex-col items-center justify-center bg-background px-6 text-center font-sans text-text antialiased">
        <h1 className="text-3xl font-bold text-navy-900">Algo salió mal</h1>
        <p className="mt-3 max-w-md text-text-muted">
          Ocurrió un error inesperado. Podés intentar nuevamente.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-8 inline-flex h-11 items-center justify-center bg-primary px-6 font-display text-[0.8125rem] font-semibold uppercase tracking-[0.1em] text-primary-contrast transition-colors hover:bg-primary-hover"
        >
          Reintentar
        </button>
      </body>
    </html>
  );
}

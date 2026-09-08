import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { datasheetPdfHref } from "@/lib/datasheet";
import type { Locale } from "@/types";

export function DatasheetPdfLink({
  slug,
  locale,
  className,
  children,
  ...props
}: {
  readonly slug: string;
  readonly locale: Locale;
  readonly className?: string;
  readonly children: ReactNode;
} & Omit<ComponentPropsWithoutRef<"a">, "href" | "children" | "className">) {
  return (
    <a
      href={datasheetPdfHref(slug, locale)}
      target="_blank"
      rel="noreferrer"
      className={className}
      {...props}
    >
      {children}
    </a>
  );
}

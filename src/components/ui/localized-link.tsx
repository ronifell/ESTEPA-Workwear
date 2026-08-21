import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

import { getPath, type RouteKey, type RouteParams } from "@/i18n/routes";
import type { Locale } from "@/types";

type AnchorProps = Omit<ComponentPropsWithoutRef<typeof Link>, "href">;

export interface LocalizedLinkProps extends AnchorProps {
  readonly route: RouteKey;
  readonly locale: Locale;
  readonly params?: RouteParams;
  readonly query?: Record<string, string>;
  readonly hash?: string;
}

/**
 * Builds hrefs from route keys so localized URLs stay in one place
 * (`src/i18n/routes.ts`) instead of being spread across components.
 */
export function LocalizedLink({
  route,
  locale,
  params,
  query,
  hash,
  children,
  ...props
}: LocalizedLinkProps) {
  let href = getPath(route, locale, params);

  if (query && Object.keys(query).length > 0) {
    href += `?${new URLSearchParams(query).toString()}`;
  }
  if (hash) href += `#${hash}`;

  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
}

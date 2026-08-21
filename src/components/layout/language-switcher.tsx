"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";

import { useI18n } from "@/components/providers/i18n-provider";
import { locales } from "@/config/site";
import { localeLabels } from "@/i18n";
import { getAlternatePath } from "@/i18n/routes";
import { cn } from "@/lib/utils";

export interface LanguageSwitcherProps {
  readonly className?: string;
  readonly inverse?: boolean;
}

/**
 * Keeps the visitor on the equivalent page when switching language, using the
 * localized URL map instead of a hard redirect to the home page.
 *
 * `useSearchParams` opts the subtree out of prerendering, so the Suspense
 * boundary lives here and callers can drop the switcher anywhere.
 */
export function LanguageSwitcher(props: LanguageSwitcherProps) {
  return (
    <Suspense
      fallback={<span aria-hidden className={cn("block h-4 w-[3.25rem]", props.className)} />}
    >
      <LanguageSwitcherControls {...props} />
    </Suspense>
  );
}

function LanguageSwitcherControls({ className, inverse = false }: LanguageSwitcherProps) {
  const { locale, dictionary } = useI18n();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.toString();
  const suffix = query ? `?${query}` : "";

  return (
    <div
      className={cn("flex items-center gap-1", className)}
      role="group"
      aria-label={dictionary.nav.changeLanguage}
    >
      {locales.map((candidate, index) => {
        const isActive = candidate === locale;
        const href = `${getAlternatePath(pathname, candidate)}${suffix}`;

        return (
          <span key={candidate} className="flex items-center">
            {index > 0 ? (
              <span
                aria-hidden
                className={cn(
                  "mx-1 h-3 w-px",
                  inverse ? "bg-white/25" : "bg-border-strong",
                )}
              />
            ) : null}

            <Link
              href={href}
              hrefLang={candidate}
              aria-current={isActive ? "true" : undefined}
              title={localeLabels[candidate].full}
              className={cn(
                "rounded-xs px-1 font-display text-xs font-semibold uppercase tracking-[0.1em] transition-colors",
                isActive
                  ? inverse
                    ? "text-text-inverse"
                    : "text-primary"
                  : inverse
                    ? "text-text-inverse-muted hover:text-text-inverse"
                    : "text-text-subtle hover:text-primary",
              )}
            >
              {localeLabels[candidate].short}
            </Link>
          </span>
        );
      })}
    </div>
  );
}

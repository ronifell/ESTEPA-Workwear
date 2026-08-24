"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";

import { useI18n } from "@/components/providers/i18n-provider";
import { locales } from "@/config/site";
import { localeLabels } from "@/i18n";
import { getAlternatePath } from "@/i18n/routes";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types";

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
      fallback={<span aria-hidden className={cn("block h-4 w-[5.5rem]", props.className)} />}
    >
      <LanguageSwitcherControls {...props} />
    </Suspense>
  );
}

function ArgentinaFlag() {
  return (
    <svg viewBox="0 0 16 11" className="size-full" aria-hidden>
      <rect width="16" height="11" fill="#74ACDF" />
      <rect y="3.65" width="16" height="3.7" fill="#FFFFFF" />
      <circle cx="8" cy="5.5" r="1.15" fill="#F6B40E" />
    </svg>
  );
}

function UnitedKingdomFlag() {
  return (
    <svg viewBox="0 0 16 11" className="size-full" aria-hidden>
      <rect width="16" height="11" fill="#012169" />
      <path d="M0 0 16 11M16 0 0 11" stroke="#FFFFFF" strokeWidth="2.4" />
      <path d="M0 0 16 11M16 0 0 11" stroke="#C8102E" strokeWidth="1.15" />
      <path d="M8 0v11M0 5.5h16" stroke="#FFFFFF" strokeWidth="3.6" />
      <path d="M8 0v11M0 5.5h16" stroke="#C8102E" strokeWidth="2.1" />
    </svg>
  );
}

function LocaleFlag({ locale, inverse }: { readonly locale: Locale; readonly inverse: boolean }) {
  return (
    <span
      className={cn(
        "inline-block h-3.5 w-5 shrink-0 overflow-hidden rounded-[1px]",
        inverse ? "ring-1 ring-white/25" : "ring-1 ring-black/15",
      )}
    >
      {locale === "es" ? <ArgentinaFlag /> : <UnitedKingdomFlag />}
    </span>
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
              aria-label={localeLabels[candidate].full}
              title={localeLabels[candidate].full}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-xs px-1 font-display text-xs font-semibold uppercase tracking-[0.1em] transition-colors",
                isActive
                  ? inverse
                    ? "text-text-inverse"
                    : "text-primary"
                  : inverse
                    ? "text-text-inverse-muted hover:text-text-inverse"
                    : "text-text-subtle hover:text-primary",
              )}
            >
              <LocaleFlag locale={candidate} inverse={inverse} />
              {localeLabels[candidate].short}
            </Link>
          </span>
        );
      })}
    </div>
  );
}

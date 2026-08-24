import Image from "next/image";

import { LocalizedLink } from "@/components/ui/localized-link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types";

export interface LogoProps {
  readonly locale: Locale;
  readonly className?: string;
  /** Light wordmark for dark surfaces. The mark itself stays transparent. */
  readonly inverse?: boolean;
  readonly priority?: boolean;
}

/**
 * Brand lockup: the supplied mark plus the "Workwear" descriptor.
 */
export function Logo({
  locale,
  className,
  inverse = false,
  priority = false,
}: LogoProps) {
  return (
    <LocalizedLink
      route="home"
      locale={locale}
      className={cn(
        "group inline-flex items-center gap-3 rounded-xs transition-opacity hover:opacity-90",
        className,
      )}
      aria-label={`${siteConfig.companyName} — ${
        locale === "es" ? "Inicio" : "Home"
      }`}
    >
      <Image
        src="/logo.png"
        alt={siteConfig.companyName}
        width={1774}
        height={887}
        priority={priority}
        sizes="160px"
        className="h-8 w-auto sm:h-9"
      />

      <span
        aria-hidden
        className={cn(
          "hidden font-display text-[0.625rem] font-semibold uppercase leading-none tracking-[0.32em] sm:block",
          inverse ? "text-text-inverse-muted" : "text-text-muted",
        )}
      >
        Workwear
      </span>
    </LocalizedLink>
  );
}

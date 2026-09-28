import Image from "next/image";

import { LocalizedLink } from "@/components/ui/localized-link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types";

export interface LogoProps {
  readonly locale: Locale;
  readonly className?: string;
  /** Kept for callers; the lockup already works on light and dark surfaces. */
  readonly inverse?: boolean;
  readonly priority?: boolean;
}

/**
 * Brand lockup. The mark already includes the wordmark and descriptor.
 */
export function Logo({ locale, className, priority = false }: LogoProps) {
  return (
    <LocalizedLink
      route="home"
      locale={locale}
      className={cn("group relative z-10 inline-flex shrink-0 items-center", className)}
      aria-label={`${siteConfig.companyName} — ${locale === "es" ? "Inicio" : "Home"}`}
    >
      <Image
        src={siteConfig.logoSrc}
        alt={siteConfig.companyName}
        width={2082}
        height={534}
        priority={priority}
        sizes="196px"
        unoptimized
        className="h-10 w-auto sm:h-11"
      />
    </LocalizedLink>
  );
}

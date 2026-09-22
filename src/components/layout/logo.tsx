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
      className={cn("group inline-flex shrink-0 items-center rounded-xs transition-opacity hover:opacity-90", className)}
      aria-label={`${siteConfig.companyName} — ${locale === "es" ? "Inicio" : "Home"}`}
    >
      <Image
        src="/logo.png"
        alt={siteConfig.companyName}
        width={487}
        height={132}
        priority={priority}
        sizes="(min-width: 1024px) 200px, 168px"
        className="h-9 w-auto sm:h-10 lg:h-11"
      />
    </LocalizedLink>
  );
}

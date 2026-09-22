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
      className={cn(
        "group relative z-10 inline-flex h-8 w-[7.75rem] shrink-0 items-center sm:h-9 sm:w-[8.7rem]",
        className,
      )}
      aria-label={`${siteConfig.companyName} — ${locale === "es" ? "Inicio" : "Home"}`}
    >
      <Image
        src={siteConfig.logoSrc}
        alt={siteConfig.companyName}
        width={2026}
        height={527}
        priority={priority}
        sizes="140px"
        unoptimized
        className="h-full w-full object-contain object-left"
      />
    </LocalizedLink>
  );
}

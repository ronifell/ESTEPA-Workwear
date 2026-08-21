import Image from "next/image";

import { LocalizedLink } from "@/components/ui/localized-link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types";

export interface LogoProps {
  readonly locale: Locale;
  readonly className?: string;
  readonly variant?: "default" | "plate";
  readonly priority?: boolean;
}

/**
 * Brand lockup: the supplied mark plus the "Workwear" descriptor.
 * `plate` places the mark on a light tile so it keeps its contrast over the
 * dark sections of the site.
 */
export function Logo({
  locale,
  className,
  variant = "default",
  priority = false,
}: LogoProps) {
  const isPlate = variant === "plate";

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
      <span
        className={cn(
          "flex items-center justify-center",
          isPlate && "rounded-xs bg-sand-100 px-2.5 py-2",
        )}
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
      </span>

      <span
        aria-hidden
        className={cn(
          "hidden font-display text-[0.625rem] font-semibold uppercase leading-none tracking-[0.32em] sm:block",
          isPlate ? "text-text-inverse-muted" : "text-text-muted",
        )}
      >
        Workwear
      </span>
    </LocalizedLink>
  );
}

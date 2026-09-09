"use client";

import { usePathname } from "next/navigation";

import { useFavorites } from "@/components/providers/favorites-provider";
import { useI18n } from "@/components/providers/i18n-provider";
import { HeartIcon } from "@/components/ui/icons";
import { LocalizedLink } from "@/components/ui/localized-link";
import { getPath } from "@/i18n/routes";
import { cn } from "@/lib/utils";

export function FavoritesNavButton() {
  const pathname = usePathname();
  const { locale, dictionary } = useI18n();
  const { count, isHydrated } = useFavorites();
  const showCount = isHydrated && count > 0;
  const href = getPath("favorites", locale);

  return (
    <LocalizedLink
      route="favorites"
      locale={locale}
      className={cn(
        "relative flex size-10 items-center justify-center rounded-xs text-navy-900 transition-colors hover:text-accent",
        pathname === href && "text-accent",
      )}
      aria-label={
        showCount
          ? `${dictionary.nav.favorites} (${count} ${dictionary.nav.favoritesItems})`
          : dictionary.nav.favorites
      }
    >
      <HeartIcon className="size-5.5" filled={showCount} />
      {showCount ? (
        <span className="absolute right-0.5 top-1 flex min-w-4.5 items-center justify-center rounded-full bg-accent px-1 font-display text-[0.625rem] font-bold leading-4.5 text-white tabular-nums">
          {count > 99 ? "99+" : count}
        </span>
      ) : null}
    </LocalizedLink>
  );
}

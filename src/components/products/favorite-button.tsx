"use client";

import { useFavorites } from "@/components/providers/favorites-provider";
import { useI18n } from "@/components/providers/i18n-provider";
import { buttonStyles } from "@/components/ui/button";
import { HeartIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

export function FavoriteButton({
  productId,
  variant = "icon",
  className,
}: {
  readonly productId: string;
  readonly variant?: "icon" | "labeled";
  readonly className?: string;
}) {
  const { dictionary } = useI18n();
  const { isFavorite, toggle, isHydrated } = useFavorites();
  const saved = isHydrated && isFavorite(productId);
  const label = saved ? dictionary.favorites.remove : dictionary.favorites.add;

  return (
    <button
      type="button"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        toggle(productId);
      }}
      aria-pressed={saved}
      aria-label={label}
      className={
        variant === "labeled"
          ? buttonStyles("outline", "md", cn(saved && "border-accent text-accent", className))
          : cn(
              "flex size-10 items-center justify-center rounded-full border bg-surface/95 text-navy-900 shadow-card backdrop-blur-sm transition-colors hover:border-accent hover:text-accent",
              saved ? "border-accent text-accent" : "border-border",
              className,
            )
      }
    >
      <HeartIcon className="size-4" filled={saved} />
      {variant === "labeled" ? <span>{label}</span> : null}
    </button>
  );
}

import {
  CoverallsIcon,
  JacketIcon,
  ShirtIcon,
  TrousersIcon,
  VestIcon,
  type IconProps,
} from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import type { ProductCategoryId } from "@/types";

const categoryIcons: Record<ProductCategoryId, (props: IconProps) => React.JSX.Element> = {
  coveralls: CoverallsIcon,
  jackets: JacketIcon,
  trousers: TrousersIcon,
  shirts: ShirtIcon,
  vests: VestIcon,
};

export interface PlaceholderImageProps {
  readonly category?: ProductCategoryId;
  readonly label?: string;
  readonly className?: string;
  readonly iconClassName?: string;
}

/**
 * Artwork used while real photography is not available. It is deliberately
 * schematic — it must never be mistaken for a product photo.
 */
export function PlaceholderImage({
  category = "coveralls",
  label,
  className,
  iconClassName,
}: PlaceholderImageProps) {
  const Icon = categoryIcons[category];

  return (
    <div
      className={cn(
        "relative flex size-full flex-col items-center justify-center overflow-hidden bg-sand-200",
        className,
      )}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, rgb(176 160 129 / 0.28) 0 1px, transparent 1px 11px)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(120% 80% at 50% 0%, rgb(252 250 245 / 0.9) 0%, transparent 60%)",
        }}
      />

      <Icon
        className={cn(
          "relative z-10 size-16 text-navy-700/25 sm:size-20",
          iconClassName,
        )}
        strokeWidth={1}
      />

      {label ? (
        <span className="relative z-10 mt-4 max-w-[80%] text-center font-display text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-navy-700/45">
          {label}
        </span>
      ) : null}
    </div>
  );
}

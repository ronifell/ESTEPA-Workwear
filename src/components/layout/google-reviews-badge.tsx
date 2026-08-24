import { siteConfig } from "@/config/site";
import { getDictionary } from "@/i18n";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types";

function GoogleWordmark({ className }: { readonly className?: string }) {
  return (
    <span className={cn("font-display text-lg font-medium tracking-tight", className)} aria-hidden>
      <span className="text-[#4285F4]">G</span>
      <span className="text-[#EA4335]">o</span>
      <span className="text-[#FBBC05]">o</span>
      <span className="text-[#4285F4]">g</span>
      <span className="text-[#34A853]">l</span>
      <span className="text-[#EA4335]">e</span>
    </span>
  );
}

function Stars({ count = 5 }: { readonly count?: number }) {
  return (
    <span className="flex items-center gap-0.5" aria-hidden>
      {Array.from({ length: 5 }, (_, index) => (
        <svg
          key={index}
          viewBox="0 0 12 12"
          className={index < count ? "size-3 fill-[#F4B400]" : "size-3 fill-navy-200"}
        >
          <path d="M6 0.8 7.5 4.3 11.3 4.6 8.4 7.1 9.3 10.8 6 8.8 2.7 10.8 3.6 7.1 0.7 4.6 4.5 4.3Z" />
        </svg>
      ))}
    </span>
  );
}

export function GoogleReviewsBadge({
  locale,
  className,
}: {
  readonly locale: Locale;
  readonly className?: string;
}) {
  const dictionary = getDictionary(locale);
  const { reviewsUrl, rating, reviewCount } = siteConfig.google;
  const label = dictionary.trust.googleReviewsAria;
  const numericRating = rating ? Number.parseFloat(rating) : NaN;
  const filled = Number.isFinite(numericRating)
    ? Math.max(1, Math.min(5, Math.round(numericRating)))
    : 5;

  const inner = (
    <span className="flex flex-col items-center bg-white px-4 py-3 text-center">
      <GoogleWordmark />
      <span className="mt-0.5 font-display text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-navy-900">
        {dictionary.trust.googleReviews}
      </span>
      <span className="mt-1.5">
        <Stars count={filled} />
      </span>
      {rating ? (
        <span className="mt-1 font-display text-xs font-semibold text-navy-800">
          {rating}
          {reviewCount ? ` · ${reviewCount}` : null}
        </span>
      ) : null}
    </span>
  );

  if (!reviewsUrl) {
    return (
      <div className={cn("inline-flex", className)} aria-label={label} role="img">
        {inner}
      </div>
    );
  }

  return (
    <a
      href={reviewsUrl}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={label}
      className={cn("inline-flex transition-opacity hover:opacity-90", className)}
    >
      {inner}
    </a>
  );
}

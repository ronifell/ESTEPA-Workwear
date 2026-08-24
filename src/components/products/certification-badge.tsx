import { InfoTooltip } from "@/components/ui/info-tooltip";
import { resolveCertificationIcon } from "@/lib/certifications";
import { resolveStandard, standardAriaLabel } from "@/lib/standards";
import { cn } from "@/lib/utils";
import type { Certification, CertificationIcon, Locale } from "@/types";

function Pictogram({ icon }: { readonly icon: CertificationIcon }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    className: "size-full",
  };

  switch (icon) {
    case "weld":
      return (
        <svg {...common}>
          <path d="M12 3v6" />
          <path d="M9 7.5 12 9l3-1.5" />
          <path d="M7 13h10" />
          <path d="M8 16h8" />
          <path d="M10 19h4" />
        </svg>
      );
    case "flame":
      return (
        <svg {...common}>
          <path d="M12 3c1.8 2.4 2.8 4.1 2.8 5.6 0 1.1-.6 1.9-1.6 1.9s-1.6-.8-1.6-2c0-.5.1-1 .3-1.5C9.4 8.9 8 11 8 13.2A4 4 0 0 0 12 17.2 4 4 0 0 0 16 13.2c0-3.6-2.4-6.8-4-10.2Z" />
          <path d="M8 20h8" />
        </svg>
      );
    case "antistatic":
      return (
        <svg {...common}>
          <path d="M13 3 7 12h4.5L10.5 21 17 12h-4.5z" />
        </svg>
      );
    case "arc":
      return (
        <svg {...common}>
          <path d="M7 8c2.4-2.6 7.6-2.6 10 0" />
          <path d="M8.5 11c1.6-1.6 5.4-1.6 7 0" />
          <path d="M12 13v4" />
          <path d="M9 20h6" />
          <path d="M13 3 10.8 7" />
        </svg>
      );
    case "chemical":
      return (
        <svg {...common}>
          <path d="M9.5 3v5.2L5 16.4A2.4 2.4 0 0 0 7 20h10a2.4 2.4 0 0 0 2-3.6L14.5 8.2V3" />
          <path d="M8.5 3h7" />
        </svg>
      );
    case "rain":
      return (
        <svg {...common}>
          <path d="M7 11a5 5 0 0 1 9.6-1.8A3.6 3.6 0 0 1 18 16H7.4A3.4 3.4 0 0 1 7 11Z" />
          <path d="M9 18.5v2" />
          <path d="M12 18.5v2" />
          <path d="M15 18.5v2" />
        </svg>
      );
    case "cold":
      return (
        <svg {...common}>
          <path d="M12 3v18" />
          <path d="m7 6 5 4 5-4" />
          <path d="m7 18 5-4 5 4" />
          <path d="M4.5 12h15" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path d="M12 3 5 6.2V12c0 4.4 2.8 7.6 7 8.8 4.2-1.2 7-4.4 7-8.8V6.2L12 3Z" />
        </svg>
      );
  }
}

function BadgeFace({
  certification,
  compact,
}: {
  readonly certification: Certification;
  readonly compact: boolean;
}) {
  const icon = resolveCertificationIcon(certification);

  if (icon === "ul") {
    return (
      <span
        className={cn(
          "inline-flex flex-col items-center justify-center bg-navy-900 text-white",
          compact ? "h-12 min-w-12 px-1.5" : "h-16 min-w-[4.25rem] px-2.5",
        )}
      >
        <span className={cn("font-display font-bold leading-none", compact ? "text-xs" : "text-base")}>
          UL
        </span>
        <span
          className={cn(
            "mt-0.5 font-display uppercase leading-none tracking-[0.08em]",
            compact ? "text-[0.45rem]" : "text-[0.5625rem]",
          )}
        >
          Certified
        </span>
      </span>
    );
  }

  if (icon === "badge") {
    return (
      <span
        className={cn(
          "inline-flex items-center justify-center border-2 border-navy-900 bg-surface text-center font-display font-bold uppercase leading-tight tracking-[0.04em] text-navy-900",
          compact ? "h-12 min-w-12 px-1.5 text-[0.5625rem]" : "h-16 min-w-[4.25rem] px-2 text-[0.6875rem]",
        )}
      >
        {certification.name}
      </span>
    );
  }

  return (
    <span className={cn("inline-flex flex-col items-center", compact ? "w-12" : "w-16")}>
      <span
        className={cn(
          "flex items-center justify-center border-2 border-navy-900 bg-surface text-navy-900",
          compact ? "size-10" : "size-12",
        )}
        style={{
          clipPath: "polygon(50% 0, 100% 12%, 100% 68%, 50% 100%, 0 68%, 0 12%)",
        }}
      >
        <span className={compact ? "size-5" : "size-6"}>
          <Pictogram icon={icon} />
        </span>
      </span>
      <span
        className={cn(
          "mt-1.5 text-center font-display font-bold uppercase leading-none tracking-[0.04em] text-navy-900",
          compact ? "text-[0.5625rem]" : "text-[0.6875rem]",
        )}
      >
        {certification.name.replace(/\s+/g, "")}
      </span>
    </span>
  );
}

export function CertificationBadge({
  certification,
  locale,
  compact = false,
}: {
  readonly certification: Certification;
  readonly locale: Locale;
  readonly compact?: boolean;
}) {
  const resolved = resolveStandard(certification);
  const description = resolved.description?.[locale] ?? resolved.name;

  return (
    <InfoTooltip label={standardAriaLabel(resolved, locale)} title={resolved.name} content={description}>
      <BadgeFace certification={resolved} compact={compact} />
    </InfoTooltip>
  );
}

export function CertificationRow({
  certifications,
  locale,
  compact = false,
  className,
}: {
  readonly certifications: readonly Certification[];
  readonly locale: Locale;
  readonly compact?: boolean;
  readonly className?: string;
}) {
  if (certifications.length === 0) return null;

  return (
    <ul className={cn("flex flex-wrap items-end gap-2.5", compact ? "gap-2" : "gap-3", className)}>
      {certifications.map((certification) => (
        <li key={certification.id}>
          <CertificationBadge certification={certification} locale={locale} compact={compact} />
        </li>
      ))}
    </ul>
  );
}

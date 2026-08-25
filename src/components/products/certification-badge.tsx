import { InfoTooltip } from "@/components/ui/info-tooltip";
import { resolveCertificationIcon } from "@/lib/certifications";
import { resolveStandard, standardAriaLabel } from "@/lib/standards";
import { cn } from "@/lib/utils";
import type { Certification, CertificationIcon, Locale } from "@/types";

function Pictogram({ icon }: { readonly icon: CertificationIcon }) {
  const svg = {
    viewBox: "0 0 24 24",
    "aria-hidden": true,
    className: "size-full",
  };

  switch (icon) {
    case "weld":
      return (
        <svg {...svg} fill="currentColor">
          <path d="M8.2 4.2h7.6c.5 0 .9.4.9.9v2.2H7.3V5.1c0-.5.4-.9.9-.9Z" />
          <path d="M6.4 8.2h11.2v8.2c0 .7-.6 1.3-1.3 1.3H7.7c-.7 0-1.3-.6-1.3-1.3V8.2Z" />
          <path fill="#0a1727" d="M8.6 10.2h6.8v3.4H8.6z" />
          <path d="M10.2 19.2 9 22h1.6l.8-2.8H10.2Zm3.6 0L12.6 22h1.6l.8-2.8h-1.2Z" />
        </svg>
      );
    case "flame":
      return (
        <svg {...svg} fill="currentColor">
          <path d="M12 2.4c2.2 3.1 3.4 5.2 3.4 7.1 0 1.4-.7 2.5-1.8 2.5-1.2 0-1.8-1-1.8-2.3 0-.6.1-1.2.3-1.8-2.6 2.1-4 4.5-4 7.1A4.9 4.9 0 0 0 12 21.1a4.9 4.9 0 0 0 4.9-4.9c0-4.1-2.6-7.7-4.9-13.8Z" />
        </svg>
      );
    case "antistatic":
      return (
        <svg {...svg} fill="currentColor">
          <path d="M13.4 2.2 6.8 13.1h5.2L10.6 21.8l7.2-11.6h-5.2z" />
        </svg>
      );
    case "arc":
      return (
        <svg {...svg} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <path d="M6.2 8.2c2.8-3.1 8.8-3.1 11.6 0" />
          <path d="M7.8 11.2c2-2.2 6.4-2.2 8.4 0" />
          <path d="M12 13.2v4.4" />
          <path d="M8.8 20.2h6.4" />
          <path fill="currentColor" stroke="none" d="M12 2.2 10.4 7.2h3.2L12 2.2Z" />
        </svg>
      );
    case "chemical":
      return (
        <svg {...svg} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <path d="M9.4 3.2v5.2L4.8 16.6A2.5 2.5 0 0 0 7 20.2h10a2.5 2.5 0 0 0 2.2-3.6L14.6 8.4V3.2" />
          <path d="M8.4 3.2h7.2" />
        </svg>
      );
    case "rain":
      return (
        <svg {...svg} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <path d="M7 11a5 5 0 0 1 9.6-1.8A3.6 3.6 0 0 1 18 16H7.4A3.4 3.4 0 0 1 7 11Z" />
          <path d="M9 18.6v2M12 18.6v2M15 18.6v2" />
        </svg>
      );
    case "cold":
      return (
        <svg {...svg} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <path d="M12 3v18M7 6l5 4 5-4M7 18l5-4 5 4M4.5 12h15" />
        </svg>
      );
    default:
      return (
        <svg {...svg} fill="currentColor">
          <path d="M12 2.6 4.8 6v6.2c0 4.6 3 8 7.2 9.2 4.2-1.2 7.2-4.6 7.2-9.2V6L12 2.6Z" />
        </svg>
      );
  }
}

function splitName(name: string): { kicker: string | null; title: string } {
  const iso = name.match(/^(EN ISO)\s+(.+)$/i);
  if (iso?.[1] && iso[2]) return { kicker: iso[1], title: iso[2] };
  const en = name.match(/^(EN)\s+(\d[\dA-Z.]*)$/i);
  if (en?.[1] && en[2]) return { kicker: en[1], title: en[2] };
  const body = name.match(/^(NFPA|ASTM|CAT|UL)\s+(.+)$/i);
  if (body?.[1] && body[2]) return { kicker: body[1], title: body[2] };
  return { kicker: null, title: name };
}

function PictogramMark({
  icon,
  kicker,
  title,
  compact,
}: {
  readonly icon: CertificationIcon;
  readonly kicker: string | null;
  readonly title: string;
  readonly compact: boolean;
}) {
  return (
    <span className={cn("inline-flex flex-col items-center", compact ? "w-[3.75rem]" : "w-[4.5rem]")}>
      <span
        className={cn(
          "flex items-center justify-center bg-navy-900 text-bronze-300 shadow-[inset_0_-3px_0_0_var(--color-bronze-500)]",
          compact ? "size-11" : "size-14",
        )}
      >
        <span className={compact ? "size-6" : "size-7"}>
          <Pictogram icon={icon} />
        </span>
      </span>
      <span className="mt-1.5 flex flex-col items-center text-center leading-none">
        {kicker ? (
          <span className="font-display text-[0.5rem] font-bold uppercase tracking-[0.12em] text-text-muted">
            {kicker}
          </span>
        ) : null}
        <span
          className={cn(
            "font-display font-bold uppercase tracking-[0.04em] text-navy-900",
            compact ? "text-[0.625rem]" : "text-xs",
          )}
        >
          {title}
        </span>
      </span>
    </span>
  );
}

function StampMark({
  kicker,
  title,
  compact,
  variant,
}: {
  readonly kicker: string | null;
  readonly title: string;
  readonly compact: boolean;
  readonly variant: "ul" | "nfpa" | "astm" | "cat";
}) {
  const tones = {
    ul: "bg-navy-900 text-white shadow-[inset_0_3px_0_0_var(--color-bronze-500)]",
    nfpa: "bg-navy-800 text-white shadow-[inset_0_0_0_2px_var(--color-bronze-400)]",
    astm: "bg-[#3b2318] text-bronze-100 shadow-[inset_0_3px_0_0_var(--color-bronze-500)]",
    cat: "bg-bronze-500 text-navy-950 shadow-[inset_0_0_0_2px_rgb(10_23_39/0.25)]",
  } as const;

  return (
    <span
      className={cn(
        "inline-flex flex-col items-center justify-center text-center",
        compact ? "h-[3.25rem] min-w-[3.75rem] px-2" : "h-[4.25rem] min-w-[4.75rem] px-2.5",
        tones[variant],
      )}
    >
      {kicker ? (
        <span
          className={cn(
            "font-display font-bold uppercase leading-none tracking-[0.16em]",
            compact ? "text-[0.5rem]" : "text-[0.5625rem]",
            variant === "cat" ? "text-navy-900/70" : "text-bronze-300",
          )}
        >
          {kicker}
        </span>
      ) : null}
      <span
        className={cn(
          "font-display font-bold uppercase leading-none tracking-[0.04em]",
          compact ? "mt-0.5 text-[0.6875rem]" : "mt-1 text-sm",
        )}
      >
        {title}
      </span>
    </span>
  );
}

function stampVariant(id: string, icon: CertificationIcon): "ul" | "nfpa" | "astm" | "cat" {
  if (icon === "ul" || id === "ul" || id === "ul-certificate") return "ul";
  if (id === "cat-2") return "cat";
  if (id.startsWith("astm")) return "astm";
  return "nfpa";
}

function BadgeFace({
  certification,
  compact,
}: {
  readonly certification: Certification;
  readonly compact: boolean;
}) {
  const icon = resolveCertificationIcon(certification);
  const { kicker, title } = splitName(certification.name);

  if (icon === "ul" || icon === "badge") {
    return (
      <StampMark
        kicker={icon === "ul" ? "UL" : kicker}
        title={icon === "ul" ? "Certified" : title}
        compact={compact}
        variant={stampVariant(certification.id, icon)}
      />
    );
  }

  return <PictogramMark icon={icon} kicker={kicker} title={title} compact={compact} />;
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
    <ul className={cn("flex flex-wrap items-end gap-3", compact ? "gap-2.5" : "gap-3.5", className)}>
      {certifications.map((certification) => (
        <li key={certification.id}>
          <CertificationBadge certification={certification} locale={locale} compact={compact} />
        </li>
      ))}
    </ul>
  );
}

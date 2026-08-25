import type { ReactNode } from "react";

import { InfoTooltip } from "@/components/ui/info-tooltip";
import { resolveCertificationIcon } from "@/lib/certifications";
import { resolveStandard, standardAriaLabel } from "@/lib/standards";
import { cn } from "@/lib/utils";
import type { Certification, CertificationIcon, Locale } from "@/types";

const INK = "#0a1727";
const FLAME = "var(--color-cert-flame)";

function splitName(name: string): { kicker: string | null; title: string } {
  const iso = name.match(/^(EN ISO)\s+(.+)$/i);
  if (iso?.[1] && iso[2]) return { kicker: iso[1], title: iso[2] };
  const en = name.match(/^(EN)\s+(\d[\dA-Z.]*)$/i);
  if (en?.[1] && en[2]) return { kicker: en[1], title: en[2] };
  const body = name.match(/^(NFPA|ASTM|CAT|UL)\s+(.+)$/i);
  if (body?.[1] && body[2]) return { kicker: body[1], title: body[2] };
  return { kicker: null, title: name };
}

function plateSize(compact: boolean) {
  return compact ? "size-12" : "size-14";
}

function MarkCaption({
  kicker,
  title,
  compact,
}: {
  readonly kicker: string | null;
  readonly title: string;
  readonly compact: boolean;
}) {
  return (
    <span className="mt-1.5 flex min-h-[1.7rem] flex-col items-center justify-start text-center leading-[1.05]">
      {kicker ? (
        <span
          className={cn(
            "font-display font-bold uppercase tracking-[0.1em] text-navy-900",
            compact ? "text-[0.5rem]" : "text-[0.5625rem]",
          )}
        >
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
  );
}

function PlateFrame() {
  return (
    <rect
      x="2.2"
      y="2.2"
      width="43.6"
      height="43.6"
      rx="5"
      fill="#fff"
      stroke={INK}
      strokeWidth="2.2"
    />
  );
}

function GlyphFlame({ fill }: { readonly fill: string }) {
  return (
    <path
      fill={fill}
      d="M24 8.6c2.4 4.6 8.6 8.2 8 14.6-.3 2.8-2.8 4-5 2.4 3.2 4 5.4 8.6 1.4 13.6-1.6 2-3.6 2.8-5 2.6-1.4.2-3.4-.6-5-2.6-4-5-1.8-9.6 1.4-13.6-2.2 1.6-4.7.4-5-2.4C15.4 16.8 21.6 13.2 24 8.6Z"
    />
  );
}

function GlyphIsoFlame() {
  return (
    <g>
      <path
        fill={INK}
        d="M24 11.4c2.2 3.6 6.8 6.4 6.6 11.4 0 1.9-1.5 2.9-3.1 2.1 2 2.8 3.2 5.8.9 9.1-1.1 1.6-2.8 2.4-4.4 2.2-1.6.2-3.3-.6-4.4-2.2-2.3-3.3-1.1-6.3.9-9.1-1.6.8-3.1-.2-3.1-2.1 0-5 4.4-7.8 6.6-11.4Z"
      />
      <rect x="16.5" y="35.4" width="15" height="1.7" rx="0.4" fill={INK} />
    </g>
  );
}

function GlyphWeld() {
  return (
    <g fill={INK}>
      <path d="M16.2 15.6h15.6c.8 0 1.4.6 1.4 1.4v3.4H14.8v-3.4c0-.8.6-1.4 1.4-1.4Z" />
      <path d="M14.2 21.2h19.6v11.2c0 1-.8 1.8-1.8 1.8H16c-1 0-1.8-.8-1.8-1.8V21.2Z" />
      <path fill="#fff" d="M18.2 24h11.6v4.6H18.2z" />
      <path d="M20.4 35.4 18.6 40.2h2.4l1.2-4.8h-1.8Zm6.4 0-1.8 4.8h2.4l1.2-4.8h-1.8Z" />
    </g>
  );
}

function GlyphBolt() {
  return <path fill={INK} d="M22.6 11.6 16.8 26.4h5.6L19.6 38.6 33.2 22.2h-6.4z" />;
}

function GlyphBurst() {
  const rays = [0, 45, 90, 135, 180, 225, 270, 315] as const;
  return (
    <g stroke={INK} strokeWidth="1.55" strokeLinecap="round">
      {rays.map((deg) => {
        const angle = (deg * Math.PI) / 180;
        return (
          <line
            key={deg}
            x1={34.6}
            y1={23.4}
            x2={34.6 + Math.cos(angle) * 5.1}
            y2={23.4 + Math.sin(angle) * 5.1}
          />
        );
      })}
    </g>
  );
}

function GlyphArc() {
  return (
    <g>
      <GlyphBolt />
      <GlyphBurst />
    </g>
  );
}

function GlyphChemical() {
  return (
    <g fill="none" stroke={INK} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 13.8v6.2L15.2 30.4A3.1 3.1 0 0 0 17.9 35h12.2a3.1 3.1 0 0 0 2.7-4.6L25.8 20v-6.2" />
      <path d="M18.4 13.8h11.2" />
    </g>
  );
}

function GlyphRain() {
  return (
    <g fill="none" stroke={INK} strokeWidth="1.8" strokeLinecap="round">
      <path d="M17.4 24.2a5.8 5.8 0 0 1 11.2-2.1A4.1 4.1 0 0 1 30.4 30H17.8a3.9 3.9 0 0 1-.4-5.8Z" />
      <path d="M20.4 33.4v2.6M24 33.4v2.6M27.6 33.4v2.6" />
    </g>
  );
}

function GlyphCold() {
  return (
    <g fill="none" stroke={INK} strokeWidth="1.8" strokeLinecap="round">
      <path d="M24 13.6v20.8M18.6 17.6l5.4 4.4 5.4-4.4M18.6 30.4l5.4-4.4 5.4 4.4M16 24h16" />
    </g>
  );
}

function PlateSvg({ children }: { readonly children: ReactNode }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden className="size-full">
      <PlateFrame />
      {children}
    </svg>
  );
}

function UlPlate({ band }: { readonly band: "Certified" | "Certificate" }) {
  return (
    <span className="flex size-full flex-col overflow-hidden rounded-[0.36rem] border-[2.2px] border-navy-900 bg-white">
      <span className="flex flex-[1.15] items-center justify-center">
        <span className="flex size-[1.35rem] items-center justify-center rounded-full border-[1.6px] border-navy-900 font-display text-[0.55rem] font-black leading-none tracking-tight text-navy-900 sm:size-[1.45rem] sm:text-[0.6rem]">
          UL
        </span>
      </span>
      <span className="bg-navy-900 px-0.5 py-[0.14rem] text-center font-display text-[0.38rem] font-bold uppercase leading-none tracking-[0.08em] text-white">
        {band}
      </span>
      <span className="flex flex-1 items-center justify-center bg-navy-900 px-0.5 pb-0.5">
        <span className="font-display text-[0.32rem] font-semibold uppercase leading-none tracking-[0.12em] text-white/90">
          Safety US
        </span>
      </span>
    </span>
  );
}

function CertMark({
  compact,
  kicker,
  title,
  children,
}: {
  readonly compact: boolean;
  readonly kicker: string | null;
  readonly title: string;
  readonly children: ReactNode;
}) {
  return (
    <span className={cn("inline-flex flex-col items-center", compact ? "w-[3.35rem]" : "w-[4rem]")}>
      <span className={cn("shrink-0", plateSize(compact))}>{children}</span>
      <MarkCaption kicker={kicker} title={title} compact={compact} />
    </span>
  );
}

function glyphForIcon(icon: CertificationIcon) {
  switch (icon) {
    case "flame":
      return <GlyphIsoFlame />;
    case "arc":
      return <GlyphArc />;
    case "weld":
      return <GlyphWeld />;
    case "antistatic":
      return <GlyphBolt />;
    case "chemical":
      return <GlyphChemical />;
    case "rain":
      return <GlyphRain />;
    case "cold":
      return <GlyphCold />;
    default:
      return <GlyphIsoFlame />;
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
  const { kicker, title } = splitName(certification.name);
  const id = certification.id;

  if (id === "ul" || icon === "ul") {
    return (
      <CertMark compact={compact} kicker="UL" title="Certified">
        <UlPlate band="Certified" />
      </CertMark>
    );
  }
  if (id === "ul-certificate") {
    return (
      <CertMark compact={compact} kicker="UL" title="Certificate">
        <UlPlate band="Certificate" />
      </CertMark>
    );
  }
  if (id === "nfpa-2112" || id === "nfpa-70e") {
    return (
      <CertMark compact={compact} kicker="NFPA" title={id === "nfpa-2112" ? "2112" : "70E"}>
        <PlateSvg>
          <GlyphFlame fill={FLAME} />
        </PlateSvg>
      </CertMark>
    );
  }
  if (id === "astm-f1506") {
    return (
      <CertMark compact={compact} kicker="ASTM" title="F1506">
        <PlateSvg>
          <GlyphArc />
        </PlateSvg>
      </CertMark>
    );
  }
  if (id === "cat-2") {
    return (
      <CertMark compact={compact} kicker="CAT" title="2">
        <PlateSvg>
          <GlyphArc />
        </PlateSvg>
      </CertMark>
    );
  }

  return (
    <CertMark compact={compact} kicker={kicker} title={title}>
      <PlateSvg>{glyphForIcon(icon)}</PlateSvg>
    </CertMark>
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
    <ul className={cn("flex flex-wrap items-start", compact ? "gap-x-3 gap-y-3.5" : "gap-x-4 gap-y-4", className)}>
      {certifications.map((certification) => (
        <li key={certification.id}>
          <CertificationBadge certification={certification} locale={locale} compact={compact} />
        </li>
      ))}
    </ul>
  );
}

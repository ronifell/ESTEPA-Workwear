import type { ReactNode } from "react";

import { InfoTooltip } from "@/components/ui/info-tooltip";
import { resolveCertificationIcon } from "@/lib/certifications";
import { resolveStandard, standardAriaLabel } from "@/lib/standards";
import { cn } from "@/lib/utils";
import type { Certification, CertificationIcon, Locale } from "@/types";

const INK = "#0a1727";

function splitName(name: string): { kicker: string | null; title: string } {
  const iso = name.match(/^(EN ISO)\s+(.+)$/i);
  if (iso?.[1] && iso[2]) return { kicker: iso[1], title: iso[2] };
  const en = name.match(/^(EN)\s+(\d[\dA-Z.]*)$/i);
  if (en?.[1] && en[2]) return { kicker: en[1], title: en[2] };
  const body = name.match(/^(NFPA|ASTM|CAT|UL)\s+(.+)$/i);
  if (body?.[1] && body[2]) return { kicker: body[1], title: body[2] };
  return { kicker: null, title: name };
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

function Graphic({ className, children }: { readonly className?: string; readonly children: ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 drop-shadow-[0_1px_1.5px_rgb(10_23_39/0.16)]",
        className,
      )}
    >
      {children}
    </span>
  );
}

function MarkStack({
  compact,
  kicker,
  title,
  caption = true,
  children,
}: {
  readonly compact: boolean;
  readonly kicker: string | null;
  readonly title: string;
  readonly caption?: boolean;
  readonly children: ReactNode;
}) {
  return (
    <span className={cn("inline-flex flex-col items-center", compact ? "w-[3.35rem]" : "w-[4rem]")}>
      {children}
      {caption ? <MarkCaption kicker={kicker} title={title} compact={compact} /> : null}
    </span>
  );
}

/** Approved NFPA mark: five-tongue red flame. */
function NfpaFlameGlyph() {
  return (
    <g>
      <path
        fill="#e30613"
        d="M24.2 46.8C16.4 41.2 12.2 32.4 16.6 23.8C18.2 20.4 22.8 19.4 25.2 22.8C21.6 28.6 21.8 37.2 24.2 43.8Z"
      />
      <path
        fill="#e30613"
        d="M39.8 46.8C47.6 40.8 51.6 31.6 47.4 22.6C45.8 19.2 41.2 18.2 38.8 21.8C42.4 27.8 42.2 36.8 39.8 43.8Z"
      />
      <path
        fill="#e30613"
        d="M22.2 32.4C18.8 27.2 20.4 21.6 25.6 18.2C23.4 24.2 24.2 28.8 27.4 33.6C25.2 33.8 23.4 33.6 22.2 32.4Z"
      />
      <path
        fill="#e30613"
        d="M41.8 31.8C45.2 26.4 43.6 20.6 38.4 17.6C40.6 23.8 40 28.6 36.8 33.4C38.8 33.4 40.8 33 41.8 31.8Z"
      />
      <path
        fill="#e30613"
        d="M27.6 51.2C25.4 39.2 27.2 24.8 32 12.2C36.8 24.8 38.6 39.2 36.4 51.2C35.2 55.4 32 57.2 32 57.2C32 57.2 28.8 55.4 27.6 51.2Z"
      />
      <path fill="#ff4d3c" d="M31.2 20.4C28.6 28.6 28.4 38 31 47.2C29.2 38.4 29.2 29 31.2 20.4Z" />
      <path
        fill="#fff"
        opacity="0.38"
        d="M31.7 17.6C30.2 24.4 29.8 32.2 31 39.4C30.6 32 30.8 24.6 31.7 17.6Z"
      />
    </g>
  );
}

/** Layered ISO heat/flame pictogram (outer flame, inner cut, base bar). */
function IsoFlameGlyph() {
  return (
    <g fill={INK}>
      <path
        fillRule="evenodd"
        d="M32 18.2c3.6 5.4 11.2 9.6 10.4 18.2-.3 3-3.1 4.5-5.6 3 3.4 4.6 5.6 10 1.4 15.6-1.7 2.3-4.2 3.2-6.2 3-2 .2-4.5-.7-6.2-3-4.2-5.6-2-11 1.4-15.6-2.5 1.5-5.3 0-5.6-3C20.8 27.8 28.4 23.6 32 18.2Zm0 10.6c1.7 2.6 4.4 4.5 4.2 7.7-.1 1.5-1.3 2.2-2.5 1.7 1.3 2.1 2.1 4.4.6 6.8-.8 1.2-1.9 1.7-2.3 1.6-.4.1-1.5-.4-2.3-1.6-1.5-2.4-.7-4.7.6-6.8-1.2.5-2.4-.2-2.5-1.7-.2-3.2 2.5-5.1 4.2-7.7Z"
      />
      <rect x="22.5" y="57.2" width="19" height="2.1" rx="0.5" />
    </g>
  );
}

function BoltGlyph() {
  return <path fill={INK} d="M29.2 20.4 19.6 40.8h7.2L23.4 58.6l3.8.2 2.6 4.6-1.4-4.8h3.6L44.8 36.2h-8.4L41.2 20.4Z" />;
}

function ArcGlyph() {
  return (
    <g fill={INK}>
      <path d="M25.6 21.2 16.8 39.8h6.6L20.2 56.4l3.4.2 2.4 4.4-1.4-4.6h3.4L41 34.6h-7.6L37.6 21.2Z" />
      <polygon points="48.2,24.6 49.6,29.4 54.6,29.8 50.8,33.2 52.2,38.2 48.2,35.4 44.2,38.2 45.6,33.2 41.8,29.8 46.8,29.4" />
      <polygon points="50.4,31.2 51.2,34.2 54.4,34.6 52,36.8 52.8,40 50.4,38.2 48,40 48.8,36.8 46.4,34.6 49.6,34.2" />
    </g>
  );
}

function SquareArcGlyph() {
  return (
    <g fill={INK}>
      <path d="M24.8 14.8 16.2 33.6h6.8L19.6 51.2l3.6.2 2.6 4.8-1.5-5h3.6L41.6 29.8h-7.8L38.2 14.8Z" />
      <polygon points="47.6,20.8 49.2,25.8 54.4,26.2 50.6,29.8 52.2,35 47.6,32 43,35 44.6,29.8 40.8,26.2 46,25.8" />
    </g>
  );
}

function WeldGlyph() {
  return (
    <g fill={INK}>
      <path d="M21 20.8h22c1.2 0 2.2.8 2.2 2v3.4H18.8v-3.4c0-1.2 1-2 2.2-2Z" />
      <path d="M18.4 27h27.2v15.6c0 1.6-1.3 2.8-2.8 2.8H21.2c-1.5 0-2.8-1.2-2.8-2.8V27Z" />
      <rect x="23.2" y="30.4" width="17.6" height="7.2" fill="#fff" />
      <path d="M24.4 47.2 22.2 54.2h3l1.6-7h-2.4zm13.4 0-2.2 7h3l1.6-7h-2.4z" />
    </g>
  );
}

function ChemicalGlyph() {
  return (
    <g fill="none" stroke={INK} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M26 14.8v9.2L18.6 38.6A4.4 4.4 0 0 0 22.4 45h19.2a4.4 4.4 0 0 0 3.8-6.4L37.8 24V14.8" />
      <path d="M23.6 14.8h16.8" />
      <path d="M28.4 33.2h11.2" />
    </g>
  );
}

function RainGlyph() {
  return (
    <g fill="none" stroke={INK} strokeWidth="2.2" strokeLinecap="round">
      <path d="M21.6 30.2a8.4 8.4 0 0 1 16.4-3.2A6 6 0 0 1 40.6 39H22.2a5.6 5.6 0 0 1-.6-8.8Z" />
      <path d="M26.2 43.4v4.2M32 43.4v4.2M37.8 43.4v4.2" />
    </g>
  );
}

function ColdGlyph() {
  return (
    <g fill="none" stroke={INK} strokeWidth="2.2" strokeLinecap="round">
      <path d="M32 14.8v34.4M22.8 21.4 32 28.6l9.2-7.2M22.8 42.6 32 35.4l9.2 7.2M18.4 32h27.2" />
    </g>
  );
}

function SquareFrame() {
  return (
    <rect x="4.4" y="4.4" width="55.2" height="55.2" rx="8" fill="#fff" stroke={INK} strokeWidth="4.2" />
  );
}

function ShieldOutline() {
  return (
    <path
      d="M32 4.2 57.6 13.4v23.6c0 15.8-14.2 27.8-25.6 32.2C20.6 64.8 6.4 52.8 6.4 37V13.4L32 4.2Z"
      fill="#fff"
      stroke={INK}
      strokeWidth="3.4"
      strokeLinejoin="round"
    />
  );
}

function UlCertifiedMark({
  compact,
  band,
}: {
  readonly compact: boolean;
  readonly band: "Certified" | "Certificate";
}) {
  return (
    <Graphic
      className={cn(
        "overflow-hidden rounded-[0.55rem] border border-navy-950 bg-white shadow-[inset_0_1px_0_rgb(255_255_255/0.55)]",
        compact ? "h-[3.85rem] w-[2.7rem]" : "h-[4.75rem] w-[3.2rem]",
      )}
    >
      <span className="flex h-full w-full flex-col">
        <span className="flex flex-[1.15] items-center justify-center bg-white">
          <span
            className={cn(
              "flex items-center justify-center rounded-full bg-navy-950 font-display font-black leading-none tracking-tight text-white",
              compact ? "size-[1.5rem] text-[0.58rem]" : "size-[1.85rem] text-[0.74rem]",
            )}
          >
            UL
          </span>
        </span>
        <span className="bg-navy-950 px-0.5 py-[0.16rem] text-center font-display font-bold uppercase leading-none tracking-[0.1em] text-white">
          <span className={cn(compact ? "text-[0.38rem]" : "text-[0.44rem]")}>{band}</span>
        </span>
        <span className="flex flex-[0.9] items-center justify-center bg-navy-950 px-1 pb-1">
          <span
            className={cn(
              "font-display font-semibold uppercase leading-none tracking-[0.16em] text-white/85",
              compact ? "text-[0.3rem]" : "text-[0.36rem]",
            )}
          >
            Safety US
          </span>
        </span>
      </span>
    </Graphic>
  );
}

function NfpaPlate({ compact }: { readonly compact: boolean }) {
  return (
    <Graphic className={cn(compact ? "size-[2.85rem]" : "size-[3.5rem]")}>
      <svg viewBox="0 0 64 64" aria-hidden className="size-full">
        <SquareFrame />
        <g transform="translate(32 33) scale(1.06) translate(-32 -33)">
          <NfpaFlameGlyph />
        </g>
      </svg>
    </Graphic>
  );
}

function SquarePlate({
  compact,
  children,
}: {
  readonly compact: boolean;
  readonly children: ReactNode;
}) {
  return (
    <Graphic className={cn(compact ? "size-[2.85rem]" : "size-[3.5rem]")}>
      <svg viewBox="0 0 64 64" aria-hidden className="size-full">
        <SquareFrame />
        {children}
      </svg>
    </Graphic>
  );
}

function ShieldPlate({
  compact,
  children,
}: {
  readonly compact: boolean;
  readonly children: ReactNode;
}) {
  return (
    <Graphic className={cn(compact ? "h-[3.2rem] w-[2.65rem]" : "h-[3.9rem] w-[3.2rem]")}>
      <svg viewBox="0 0 64 78" aria-hidden className="size-full">
        <ShieldOutline />
        {children}
      </svg>
    </Graphic>
  );
}

function glyphForIcon(icon: CertificationIcon) {
  switch (icon) {
    case "flame":
      return <IsoFlameGlyph />;
    case "arc":
      return <ArcGlyph />;
    case "weld":
      return <WeldGlyph />;
    case "antistatic":
      return <BoltGlyph />;
    case "chemical":
      return <ChemicalGlyph />;
    case "rain":
      return <RainGlyph />;
    case "cold":
      return <ColdGlyph />;
    default:
      return <IsoFlameGlyph />;
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
      <MarkStack compact={compact} kicker="UL" title="Certified" caption={false}>
        <UlCertifiedMark compact={compact} band="Certified" />
      </MarkStack>
    );
  }
  if (id === "ul-certificate") {
    return (
      <MarkStack compact={compact} kicker="UL" title="Certificate" caption={false}>
        <UlCertifiedMark compact={compact} band="Certificate" />
      </MarkStack>
    );
  }
  if (id === "nfpa-2112" || id === "nfpa-70e") {
    return (
      <MarkStack compact={compact} kicker="NFPA" title={id === "nfpa-2112" ? "2112" : "70E"}>
        <NfpaPlate compact={compact} />
      </MarkStack>
    );
  }
  if (id === "astm-f1506") {
    return (
      <MarkStack compact={compact} kicker="ASTM" title="F1506">
        <SquarePlate compact={compact}>
          <SquareArcGlyph />
        </SquarePlate>
      </MarkStack>
    );
  }
  if (id === "cat-2") {
    return (
      <MarkStack compact={compact} kicker="CAT" title="2">
        <SquarePlate compact={compact}>
          <SquareArcGlyph />
        </SquarePlate>
      </MarkStack>
    );
  }

  return (
    <MarkStack compact={compact} kicker={kicker} title={title}>
      <ShieldPlate compact={compact}>{glyphForIcon(icon)}</ShieldPlate>
    </MarkStack>
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

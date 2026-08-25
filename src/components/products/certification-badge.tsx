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

/** NFPA 2112 / 70E mark: three-tongue red flame, not a single teardrop. */
function NfpaFlameGlyph() {
  return (
    <g>
      <path
        fill="#e30613"
        d="M30.4 49.2C20.6 43.2 14.2 33.4 17.8 23.2C19.2 19.4 24 18.6 26.4 22.4C22.8 28.6 24.6 38.4 30.4 45.6Z"
      />
      <path
        fill="#e30613"
        d="M33.6 49.2C43.4 42.6 49.6 32.2 46.2 21.6C44.8 17.8 40 16.8 37.6 20.8C41.2 27.2 39.4 37.4 33.6 45.6Z"
      />
      <path
        fill="#e30613"
        d="M27.2 50.4C25.4 38.2 27.2 24.6 32 12.4C36.8 24.6 38.6 38.2 36.8 50.4C35.4 54.8 32 56.8 32 56.8C32 56.8 28.6 54.8 27.2 50.4Z"
      />
      <path
        fill="#ff4d3c"
        d="M31.2 20.6C28.6 28.4 28.4 37.2 31 46C29.2 37.6 29.2 28.8 31.2 20.6Z"
      />
      <path
        fill="#fff"
        opacity="0.4"
        d="M31.6 17.8C30 24.2 29.6 31.4 30.8 38.2C30.4 31.2 30.6 24.4 31.6 17.8Z"
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
        d="M32 13.2c3.8 5.8 11.6 10.2 10.8 19.2-.3 3.2-3.2 4.8-5.8 3.2 3.6 4.8 5.8 10.4 1.4 16.2-1.8 2.4-4.4 3.4-6.4 3.2-2 .2-4.6-.8-6.4-3.2-4.4-5.8-2.2-11.4 1.4-16.2-2.6 1.6-5.5 0-5.8-3.2C20.4 23.4 28.2 19 32 13.2Zm0 11.4c1.8 2.8 4.6 4.8 4.4 8.2-.1 1.6-1.4 2.4-2.6 1.8 1.4 2.2 2.2 4.6.6 7.2-.8 1.2-2 1.8-2.4 1.7-.4.1-1.6-.5-2.4-1.7-1.6-2.6-.8-5 .6-7.2-1.2.6-2.5-.2-2.6-1.8-.2-3.4 2.6-5.4 4.4-8.2Z"
      />
      <rect x="22.5" y="54.2" width="19" height="2.2" rx="0.6" />
    </g>
  );
}

function BoltGlyph() {
  return (
    <path
      fill={INK}
      d="M27.2 12.4 18.6 32.8h7.4L21.4 54.2l4.2.2 2.8 5.2-1.6-5.4h3.8L43.2 28.6H34.6L39.8 12.4Z"
    />
  );
}

function BurstGlyph({ cx, cy }: { readonly cx: number; readonly cy: number }) {
  const radii = [8.4, 3.2, 7.6, 2.7, 9.2, 3.4, 6.9, 2.5, 8.8, 3.1, 7.2, 2.8, 8.1, 3.3, 6.6, 2.6];
  const points = radii
    .map((radius, index) => {
      const angle = (Math.PI * 2 * index) / radii.length - Math.PI / 2;
      return `${cx + radius * Math.cos(angle)},${cy + radius * Math.sin(angle)}`;
    })
    .join(" ");

  return <polygon fill={INK} points={points} />;
}

function ArcGlyph() {
  return (
    <g transform="translate(-4 0) scale(0.92)">
      <BoltGlyph />
      <BurstGlyph cx={48.5} cy={30} />
    </g>
  );
}

function WeldGlyph() {
  return (
    <g fill={INK}>
      <path d="M20.4 16.2h23.2c1.2 0 2.2.9 2.2 2.1v4.6H18.2v-4.6c0-1.2 1-2.1 2.2-2.1Z" />
      <path d="M17.2 23.8h29.6v16.4c0 1.5-1.2 2.7-2.7 2.7H19.9c-1.5 0-2.7-1.2-2.7-2.7V23.8Z" />
      <path fill="#fff" d="M23 27.6h18v7.2H23z" />
      <path d="M22.2 27.6h1.4v7.2h-1.4z" opacity="0.35" />
      <path d="M26.8 45.2 24.2 52.4h3.4l1.8-7.2h-2.6Zm10.2 0-2.6 7.2h3.4l1.8-7.2h-2.6Z" />
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
    <>
      <rect x="4.2" y="4.2" width="55.6" height="55.6" rx="8" fill="#fff" stroke={INK} strokeWidth="4.4" />
      <rect x="8.2" y="8.2" width="47.6" height="47.6" rx="5.2" fill="none" stroke="#fff" strokeWidth="1.1" opacity="0.55" />
    </>
  );
}

function ShieldOutline() {
  return (
    <>
      <path
        d="M32 3.6 58.4 13.2v24.2c0 16.4-14.6 28.8-26.4 33.2C20.2 66.2 5.6 53.8 5.6 37.4V13.2L32 3.6Z"
        fill="#fff"
        stroke={INK}
        strokeWidth="3.6"
        strokeLinejoin="round"
      />
      <path
        d="M32 8.2 53.6 16v20.4c0 13.6-12 24-21.6 27.8C22.4 60.4 10.4 50 10.4 36.4V16L32 8.2Z"
        fill="none"
        stroke="#fff"
        strokeWidth="1.15"
        opacity="0.5"
      />
    </>
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
              "flex items-center justify-center rounded-full bg-navy-950 font-display font-black leading-none tracking-tight text-white ring-[1.5px] ring-navy-950 ring-offset-1 ring-offset-white",
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
        <g transform="translate(32 34) scale(1.08) translate(-32 -34)">
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
      <svg viewBox="0 0 64 76" aria-hidden className="size-full">
        <ShieldOutline />
        <g transform="translate(0 2)">{children}</g>
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
      return (
        <g transform="translate(2 4) scale(0.92)">
          <BoltGlyph />
        </g>
      );
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
          <g transform="translate(2 2) scale(0.94)">
            <ArcGlyph />
          </g>
        </SquarePlate>
      </MarkStack>
    );
  }
  if (id === "cat-2") {
    return (
      <MarkStack compact={compact} kicker="CAT" title="2">
        <SquarePlate compact={compact}>
          <g transform="translate(2 2) scale(0.94)">
            <ArcGlyph />
          </g>
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

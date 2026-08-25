import type { ReactNode } from "react";

import { InfoTooltip } from "@/components/ui/info-tooltip";
import { resolveCertificationIcon } from "@/lib/certifications";
import { resolveStandard, standardAriaLabel } from "@/lib/standards";
import { cn } from "@/lib/utils";
import type { Certification, CertificationIcon, Locale } from "@/types";

const INK = "#0a1727";
const FLAME = "#d0121a";

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
    <span className="mt-2 flex min-h-[1.85rem] flex-col items-center justify-start text-center leading-[1.05]">
      {kicker ? (
        <span
          className={cn(
            "font-display font-bold uppercase tracking-[0.12em] text-navy-900",
            compact ? "text-[0.5rem]" : "text-[0.5625rem]",
          )}
        >
          {kicker}
        </span>
      ) : null}
      <span
        className={cn(
          "font-display font-bold uppercase tracking-[0.04em] text-navy-900",
          compact ? "text-[0.6875rem]" : "text-[0.8125rem]",
        )}
      >
        {title}
      </span>
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
    <span className={cn("inline-flex flex-col items-center", compact ? "w-[3.6rem]" : "w-[4.4rem]")}>
      <span className={cn("flex items-end justify-center", compact ? "h-12" : "h-16")}>{children}</span>
      {caption ? <MarkCaption kicker={kicker} title={title} compact={compact} /> : null}
    </span>
  );
}

/** Single candle flame — reads at small sizes. */
function FlameFill({ fill = INK }: { readonly fill?: string }) {
  return (
    <path
      fill={fill}
      d="M32 8.5c.6 7 12.8 12.2 13 24.6C45.2 45.8 39.4 53.2 32 53.2S18.8 45.8 19 33.1C19.2 20.7 31.4 15.5 32 8.5Z"
    />
  );
}

function FlameCore() {
  return (
    <path
      fill="#fff"
      d="M32 23.2c.4 4.6 5.8 7.4 6 13.6.2 5.2-2.6 8.4-6 8.4s-6.2-3.2-6-8.4c.2-6.2 5.6-9 6-13.6Z"
    />
  );
}

function BoltFill({ fill = "#fff" }: { readonly fill?: string }) {
  return (
    <path
      fill={fill}
      d="M34.6 12.4 20.2 35.8h9.2L24.8 55.6l19.2-25.2h-9.4L39.8 12.4Z"
    />
  );
}

function ArcBurst({ fill = "#fff" }: { readonly fill?: string }) {
  return (
    <path
      fill={fill}
      d="M44.2 16.2 46 21.4 51.4 22.2 47.4 25.8 48.8 31.2 44.2 28.2 39.6 31.2 41 25.8 37 22.2 42.4 21.4Z"
    />
  );
}

function WeldMask({ fill = "#fff" }: { readonly fill?: string }) {
  return (
    <g fill={fill}>
      <path d="M18.4 18.2h27.2c1.4 0 2.4.9 2.4 2.2v3.6H16V20.4c0-1.3 1-2.2 2.4-2.2Z" />
      <path d="M16.2 25.2h31.6v16.4c0 1.8-1.4 3.2-3.2 3.2H19.4c-1.8 0-3.2-1.4-3.2-3.2V25.2Z" />
      <rect x="22.4" y="29.2" width="19.2" height="7.2" fill={INK} />
      <path d="M23.6 46.4 21.2 54h3.2l1.8-7.6h-2.6zm14.8 0L36 54h3.2l1.8-7.6h-2.6z" />
    </g>
  );
}

function FlaskGlyph() {
  return (
    <g fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M26.4 14.4v9.4L18.6 39.2A5 5 0 0 0 22.8 46.6h18.4a5 5 0 0 0 4.2-7.4L37.6 23.8v-9.4" />
      <path d="M24 14.4h16" />
    </g>
  );
}

function CloudGlyph() {
  return (
    <g fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round">
      <path d="M21.4 31.2a8.6 8.6 0 0 1 16.8-3.2A6.2 6.2 0 0 1 41 40.2H22a5.8 5.8 0 0 1-.6-9Z" />
      <path d="M26 44.4v4.4M32 44.4v4.4M38 44.4v4.4" />
    </g>
  );
}

function SnowflakeGlyph() {
  return (
    <g fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round">
      <path d="M32 14.8v34.4M22.6 21.2 32 28.6l9.4-7.4M22.6 42.8 32 35.4l9.4 7.4M18.2 32h27.6" />
    </g>
  );
}

function ShieldBody() {
  return (
    <path
      d="M32 3.2 59.2 14v23.2C59.2 53.6 43.4 67.2 32 73.2 20.6 67.2 4.8 53.6 4.8 37.2V14L32 3.2Z"
      fill={INK}
    />
  );
}

function SquareBody() {
  return <rect x="3" y="3" width="58" height="58" rx="7" fill="#fff" stroke={INK} strokeWidth="3.6" />;
}

function UlCertifiedMark({
  compact,
  band,
}: {
  readonly compact: boolean;
  readonly band: "Certified" | "Certificate";
}) {
  return (
    <svg
      viewBox="0 0 48 72"
      aria-hidden
      className={cn(compact ? "h-12 w-[2.05rem]" : "h-16 w-[2.75rem]")}
    >
      <rect x="1.2" y="1.2" width="45.6" height="69.6" rx="7" fill={INK} />
      <circle cx="24" cy="20.2" r="11.4" fill="#fff" />
      <text
        x="24"
        y="24.4"
        textAnchor="middle"
        fill={INK}
        fontFamily="var(--font-heading), Archivo, ui-sans-serif, sans-serif"
        fontSize="11.4"
        fontWeight="800"
        letterSpacing="-0.04em"
      >
        UL
      </text>
      <rect x="1.2" y="34.2" width="45.6" height="12.4" fill="#fff" />
      <text
        x="24"
        y="43"
        textAnchor="middle"
        fill={INK}
        fontFamily="var(--font-heading), Archivo, ui-sans-serif, sans-serif"
        fontSize={band === "Certificate" ? "5.4" : "6.2"}
        fontWeight="800"
        letterSpacing="0.14em"
      >
        {band.toUpperCase()}
      </text>
      <text
        x="24"
        y="59.6"
        textAnchor="middle"
        fill="#fff"
        fontFamily="var(--font-heading), Archivo, ui-sans-serif, sans-serif"
        fontSize="5.6"
        fontWeight="700"
        letterSpacing="0.16em"
      >
        SAFETY US
      </text>
    </svg>
  );
}

function ShieldStamp({
  compact,
  children,
}: {
  readonly compact: boolean;
  readonly children: ReactNode;
}) {
  return (
    <svg
      viewBox="0 0 64 76"
      aria-hidden
      className={cn(compact ? "h-12 w-[2.55rem]" : "h-16 w-[3.4rem]")}
    >
      <ShieldBody />
      {children}
    </svg>
  );
}

function SquareStamp({
  compact,
  children,
}: {
  readonly compact: boolean;
  readonly children: ReactNode;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden
      className={cn(compact ? "size-12" : "size-16")}
    >
      <SquareBody />
      {children}
    </svg>
  );
}

function glyphOnShield(icon: CertificationIcon) {
  switch (icon) {
    case "flame":
      return (
        <g transform="translate(0 -2)">
          <FlameFill fill="#fff" />
          <path
            fill={INK}
            d="M32 24.4c.3 4 5 6.4 5.2 11.8.1 4.4-2.2 7.2-5.2 7.2s-5.3-2.8-5.2-7.2c.2-5.4 4.9-7.8 5.2-11.8Z"
          />
          <rect x="23" y="56.4" width="18" height="2.4" rx="0.4" fill="#fff" />
        </g>
      );
    case "arc":
      return (
        <g transform="translate(0 1)">
          <BoltFill />
          <ArcBurst />
        </g>
      );
    case "weld":
      return <WeldMask />;
    case "antistatic":
      return (
        <g transform="translate(0 2)">
          <BoltFill />
        </g>
      );
    case "chemical":
      return <FlaskGlyph />;
    case "rain":
      return <CloudGlyph />;
    case "cold":
      return <SnowflakeGlyph />;
    default:
      return <FlameFill fill="#fff" />;
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
  if (id === "nfpa-2112") {
    return (
      <MarkStack compact={compact} kicker="NFPA" title="2112">
        <SquareStamp compact={compact}>
          <g transform="translate(0 1)">
            <FlameFill fill={FLAME} />
            <FlameCore />
          </g>
        </SquareStamp>
      </MarkStack>
    );
  }
  if (id === "nfpa-70e") {
    return (
      <MarkStack compact={compact} kicker="NFPA" title="70E">
        <SquareStamp compact={compact}>
          <g transform="translate(-1 2)">
            <BoltFill fill={INK} />
            <ArcBurst fill={INK} />
          </g>
        </SquareStamp>
      </MarkStack>
    );
  }
  if (id === "astm-f1506") {
    return (
      <MarkStack compact={compact} kicker="ASTM" title="F1506">
        <SquareStamp compact={compact}>
          <g transform="translate(-1 1)">
            <BoltFill fill={INK} />
            <ArcBurst fill={INK} />
          </g>
        </SquareStamp>
      </MarkStack>
    );
  }
  if (id === "cat-2") {
    return (
      <MarkStack compact={compact} kicker="CAT" title="2">
        <SquareStamp compact={compact}>
          <text
            x="32"
            y="40"
            textAnchor="middle"
            fill={INK}
            fontFamily="var(--font-heading), Archivo, ui-sans-serif, sans-serif"
            fontSize="22"
            fontWeight="800"
          >
            2
          </text>
        </SquareStamp>
      </MarkStack>
    );
  }

  return (
    <MarkStack compact={compact} kicker={kicker} title={title}>
      <ShieldStamp compact={compact}>{glyphOnShield(icon)}</ShieldStamp>
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
    <ul
      className={cn(
        "flex flex-wrap items-start",
        compact ? "gap-x-3.5 gap-y-4" : "gap-x-5 gap-y-5",
        className,
      )}
    >
      {certifications.map((certification) => (
        <li key={certification.id}>
          <CertificationBadge certification={certification} locale={locale} compact={compact} />
        </li>
      ))}
    </ul>
  );
}

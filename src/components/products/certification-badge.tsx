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
    <span className="mt-2 flex min-h-[1.85rem] w-full min-w-0 flex-col items-center justify-start text-center leading-[1.05]">
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
    <span
      className={cn(
        "inline-flex min-w-0 max-w-full flex-col items-center",
        compact ? "w-[3.6rem]" : "w-[4.4rem]",
      )}
    >
      <span className={cn("flex items-end justify-center", compact ? "h-12" : "h-16")}>{children}</span>
      {caption ? <MarkCaption kicker={kicker} title={title} compact={compact} /> : null}
    </span>
  );
}

type PictogramTone = {
  readonly ink: string;
  readonly paper: string;
};

const ON_SHIELD: PictogramTone = { ink: "#fff", paper: INK };
const ON_PLATE: PictogramTone = { ink: INK, paper: "#fff" };

/** Five-tongue flame with inner core — NFPA garment-label style. */
function NfpaFlamePictogram() {
  return (
    <g>
      <path
        fill="#9a0c14"
        d="M18.2 31.4C14.6 26.2 16.4 19.6 22.2 16.8C19.4 24.2 19.8 29.6 23.2 34.8C21 34.4 19.2 33.2 18.2 31.4Z"
      />
      <path
        fill="#9a0c14"
        d="M45.8 31.4C49.4 26.2 47.6 19.6 41.8 16.8C44.6 24.2 44.2 29.6 40.8 34.8C43 34.4 44.8 33.2 45.8 31.4Z"
      />
      <path
        fill={FLAME}
        d="M21.4 36.2C16.8 29.8 19.2 22.4 25.6 18.6C22.8 26.4 23.6 31.8 27.6 37.2C25.2 37.6 23 37.2 21.4 36.2Z"
      />
      <path
        fill={FLAME}
        d="M42.6 36.2C47.2 29.8 44.8 22.4 38.4 18.6C41.2 26.4 40.4 31.8 36.4 37.2C38.8 37.6 41 37.2 42.6 36.2Z"
      />
      <path
        fill={FLAME}
        d="M27.2 52.6C24.4 38.6 26.6 22.8 32 8.4C37.4 22.8 39.6 38.6 36.8 52.6C35.6 57.4 32 59.6 32 59.6C32 59.6 28.4 57.4 27.2 52.6Z"
      />
      <path fill="#ff5a3c" d="M30.6 20.8C27.6 30.2 27.4 41.2 30.4 51.4C28.2 41.6 28.2 30.8 30.6 20.8Z" />
      <path fill="#ffd4c4" d="M32.2 17.2C30.4 25.6 30 35.2 31.4 44.2C31 35 31.2 25.8 32.2 17.2Z" />
      <path
        fill="#fff"
        opacity="0.55"
        d="M32.6 19.4C31.6 26.8 31.4 34.8 32 41.8C31.7 34.6 31.8 26.8 32.6 19.4Z"
      />
    </g>
  );
}

/** Layered ISO heat/flame: outer tongues, inner cut, hearth bar. */
function IsoFlamePictogram({ tone }: { readonly tone: PictogramTone }) {
  return (
    <g>
      <path
        fill={tone.ink}
        d="M32 9.2c.8 6.2 8.6 9.4 11.6 16.2 2.6-1.4 6.4 1.2 5.4 4.8 3.2 1.6 3.6 6.6 1.2 9.8 2.8 3.2.6 7.8-3.4 8.8.8 3.6-1.8 7.2-5.6 7.6C39.6 59.6 35 61 32 61s-7.6-1.4-9.2-4.6c-3.8-.4-6.4-4-5.6-7.6-4-1-6.2-5.6-3.4-8.8-2.4-3.2-2-8.2 1.2-9.8-1-3.6 2.8-6.2 5.4-4.8C23.4 18.6 31.2 15.4 32 9.2Z"
      />
      <path
        fill={tone.paper}
        d="M32 22.4c.4 4.2 5.2 6.4 6.4 11.2.8 3.4-.6 6.6-3.2 7.8.8 2.2.2 4.8-2 5.8-1 .4-2.4.6-3.2.6s-2.2-.2-3.2-.6c-2.2-1-2.8-3.6-2-5.8-2.6-1.2-4-4.4-3.2-7.8 1.2-4.8 6-7 6.4-11.2Z"
      />
      <path
        fill={tone.ink}
        d="M32 28.6c.3 2.8 3.2 4.2 3.6 7.2.2 2-.8 3.6-2.2 4.2.4 1.2 0 2.6-1.4 3.2-.6.2-1.4.3-2 .3s-1.4-.1-2-.3c-1.4-.6-1.8-2-1.4-3.2-1.4-.6-2.4-2.2-2.2-4.2.4-3 3.3-4.4 3.6-7.2Z"
      />
      <rect x="22.4" y="57.6" width="19.2" height="2.6" rx="0.5" fill={tone.ink} />
    </g>
  );
}

function Spark({
  cx,
  cy,
  r = 3.4,
  fill,
}: {
  readonly cx: number;
  readonly cy: number;
  readonly r?: number;
  readonly fill: string;
}) {
  const p = `${cx},${cy - r} ${cx + r * 0.28},${cy - r * 0.28} ${cx + r},${cy} ${cx + r * 0.28},${cy + r * 0.28} ${cx},${cy + r} ${cx - r * 0.28},${cy + r * 0.28} ${cx - r},${cy} ${cx - r * 0.28},${cy - r * 0.28}`;
  return <polygon fill={fill} points={p} />;
}

/** Jagged bolt, fork, concentric flash arcs and sparks. */
function ArcFlashPictogram({ tone }: { readonly tone: PictogramTone }) {
  return (
    <g>
      <path
        d="M42 15.2c6.4 4.8 10.2 12.4 10.2 20.6"
        fill="none"
        stroke={tone.ink}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M44.6 13c8.2 6 12.8 15.2 12.8 24.6"
        fill="none"
        stroke={tone.ink}
        strokeWidth="1.15"
        strokeLinecap="round"
        opacity="0.85"
      />
      <path
        d="M47.2 11.2c9.6 7 14.8 17.4 14.8 28"
        fill="none"
        stroke={tone.ink}
        strokeWidth="0.9"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        fill={tone.ink}
        d="M35.8 8.2 27.4 22.6h6.2L22.2 39.4h7.2L17.6 57.2l3.8.2 2.2 3.6-1.6-3.8h4.2L48.4 32.8h-8.2L47.2 16.4 44.6 8.6 41 11.2 38.8 8.6Z"
      />
      <path fill={tone.paper} d="M34.2 14.6 28.8 24.8h4.4L23.6 38.2h4.8L32.8 28.4h-4.2L37.6 16.2Z" />
      <path fill={tone.ink} d="M29.6 39.2 26.2 46.8l5.2-1.6-2.4 6.2 6.6-8.8h-4.2Z" />
      <Spark cx={46.4} cy={20.6} r={3.1} fill={tone.ink} />
      <Spark cx={50.8} cy={28.4} r={2.2} fill={tone.ink} />
      <circle cx={41.6} cy={24.8} r={1.05} fill={tone.ink} />
    </g>
  );
}

function BoltPictogram({ tone }: { readonly tone: PictogramTone }) {
  return (
    <g>
      <path
        fill={tone.ink}
        d="M36.4 9.4 26.2 24.8h7L21.6 42.2h7.4L17.8 57.8l4 .2 2.4 3.8-1.7-4h4.4L49.2 33.4h-8.6L47.6 17.2 44.8 9.6 41 12.4 38.6 9.6Z"
      />
      <path fill={tone.paper} d="M34.8 15.6 28.6 26.4h4.6L24.2 40.4h5.2L33.8 29.6h-4.4L38.4 17.2Z" />
      <path
        d="M22 50h20M24.8 53.4h14.4M27.6 56.6h8.8"
        fill="none"
        stroke={tone.ink}
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </g>
  );
}

function WeldHelmetPictogram({ tone }: { readonly tone: PictogramTone }) {
  return (
    <g>
      <path
        fill={tone.ink}
        d="M18.6 20.4c0-8.4 6-15.2 13.4-15.2h.01c7.4 0 13.4 6.8 13.4 15.2v2.2H18.6v-2.2Z"
      />
      <path
        fill={tone.ink}
        d="M14.8 22.2h34.4c1.6 0 2.8 1.2 2.8 2.8v16.6c0 2.2-1.8 4-4 4H16c-2.2 0-4-1.8-4-4V25c0-1.6 1.2-2.8 2.8-2.8Z"
      />
      <rect x="19.2" y="26.6" width="25.6" height="12.8" rx="1.2" fill={tone.paper} />
      <path fill={tone.ink} opacity="0.35" d="M19.2 26.6h25.6v4.2H19.2z" />
      <path
        fill={tone.ink}
        opacity="0.2"
        d="M21.2 28.2h8.4l-6.2 8.6H19.2v-1.2c0-4.1 1-7.4 2-7.4Z"
      />
      <path fill="#fff" opacity="0.45" d="M36.8 28.4h5.6v1.5H38.2z" />
      <path
        fill={tone.ink}
        d="M16.4 45.6h31.2l3.2 10.4c.4 1.2-.5 2.4-1.8 2.4H15c-1.3 0-2.2-1.2-1.8-2.4l3.2-10.4Z"
      />
      <path
        fill={tone.paper}
        opacity="0.25"
        d="M20.2 47.4h23.6l1.8 6.2H18.4z"
      />
      <circle cx={49.4} cy={30.6} r={2.35} fill={tone.ink} />
      <circle cx={49.4} cy={30.6} r={1.05} fill={tone.paper} />
      <Spark cx={44.6} cy={41.2} r={2.6} fill={tone.ink} />
      <Spark cx={48.2} cy={38.4} r={1.7} fill={tone.ink} />
    </g>
  );
}

function FlaskPictogram({ tone }: { readonly tone: PictogramTone }) {
  return (
    <g>
      <path
        fill={tone.ink}
        d="M26.2 12.6h11.6v2.4H37v8.2l8.8 16.4A7.2 7.2 0 0 1 39.4 50.8H24.6A7.2 7.2 0 0 1 18.2 39.6L27 23.2v-8.2h-.8v-2.4Z"
      />
      <path fill={tone.paper} d="M24.8 38.2c.8 5.6 4.2 8.8 7.2 8.8s6.4-3.2 7.2-8.8c-2.2 1.4-4.6 2-7.2 2s-5-.6-7.2-2Z" />
      <circle cx={28.6} cy={36.4} r={1.15} fill={tone.paper} />
      <circle cx={33.8} cy={34.6} r={0.85} fill={tone.paper} />
      <circle cx={31.2} cy={32.2} r={0.7} fill={tone.paper} />
    </g>
  );
}

function RainPictogram({ tone }: { readonly tone: PictogramTone }) {
  return (
    <g fill={tone.ink}>
      <path d="M23.2 32.4a9.2 9.2 0 0 1 17.6-3.6A6.8 6.8 0 0 1 43.4 42H24.2a6.2 6.2 0 0 1-1-9.6Z" />
      <path d="M24.6 45.2c0 2.2-1.8 3.2-2.6 4.8-.4.8.2 1.6 1 1.6.8 0 1.4-.8 1.8-1.6.8-1.6.2-2.6-.2-4.8h0Z" />
      <path d="M32.2 45.2c0 2.2-1.8 3.2-2.6 4.8-.4.8.2 1.6 1 1.6.8 0 1.4-.8 1.8-1.6.8-1.6.2-2.6-.2-4.8h0Z" />
      <path d="M39.8 45.2c0 2.2-1.8 3.2-2.6 4.8-.4.8.2 1.6 1 1.6.8 0 1.4-.8 1.8-1.6.8-1.6.2-2.6-.2-4.8h0Z" />
    </g>
  );
}

function SnowflakePictogram({ tone }: { readonly tone: PictogramTone }) {
  return (
    <g
      fill="none"
      stroke={tone.ink}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M32 12.8v38.4" />
      <path d="M14.8 32h34.4" />
      <path d="M19.6 19.6 44.4 44.4" />
      <path d="M44.4 19.6 19.6 44.4" />
      <path d="M27.4 16.4 32 20.2l4.6-3.8M27.4 47.6 32 43.8l4.6 3.8" />
      <path d="M16.4 27.4 20.2 32l-3.8 4.6M47.6 27.4 43.8 32l3.8 4.6" />
      <path d="M22.2 16.8 26 21.4 21.2 23.6M41.8 16.8 38 21.4 42.8 23.6" />
      <path d="M22.2 47.2 26 42.6 21.2 40.4M41.8 47.2 38 42.6 42.8 40.4" />
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
  return <rect x="3" y="3" width="58" height="58" rx="14" fill="#fff" stroke={INK} strokeWidth="3.6" />;
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
      <rect x="1.2" y="1.2" width="45.6" height="69.6" rx="12" fill={INK} />
      <circle cx={24} cy={20.2} r={11.4} fill="#fff" />
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
        <g transform="translate(0 -1)">
          <IsoFlamePictogram tone={ON_SHIELD} />
        </g>
      );
    case "arc":
      return (
        <g transform="translate(-2 1) scale(0.92)">
          <ArcFlashPictogram tone={ON_SHIELD} />
        </g>
      );
    case "weld":
      return (
        <g transform="translate(0 2) scale(0.92)">
          <WeldHelmetPictogram tone={ON_SHIELD} />
        </g>
      );
    case "antistatic":
      return (
        <g transform="translate(0 1) scale(0.94)">
          <BoltPictogram tone={ON_SHIELD} />
        </g>
      );
    case "chemical":
      return (
        <g transform="translate(0 4) scale(0.92)">
          <FlaskPictogram tone={ON_SHIELD} />
        </g>
      );
    case "rain":
      return (
        <g transform="translate(0 2)">
          <RainPictogram tone={ON_SHIELD} />
        </g>
      );
    case "cold":
      return (
        <g transform="translate(0 2) scale(0.94)">
          <SnowflakePictogram tone={ON_SHIELD} />
        </g>
      );
    default:
      return <IsoFlamePictogram tone={ON_SHIELD} />;
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
          <g transform="translate(0 1) scale(0.96)">
            <NfpaFlamePictogram />
          </g>
        </SquareStamp>
      </MarkStack>
    );
  }
  if (id === "nfpa-70e") {
    return (
      <MarkStack compact={compact} kicker="NFPA" title="70E">
        <SquareStamp compact={compact}>
          <g transform="translate(-3 0) scale(0.9)">
            <ArcFlashPictogram tone={ON_PLATE} />
          </g>
        </SquareStamp>
      </MarkStack>
    );
  }
  if (id === "astm-f1506") {
    return (
      <MarkStack compact={compact} kicker="ASTM" title="F1506">
        <SquareStamp compact={compact}>
          <g transform="translate(-3 0) scale(0.9)">
            <ArcFlashPictogram tone={ON_PLATE} />
          </g>
        </SquareStamp>
      </MarkStack>
    );
  }
  if (id === "cat-2") {
    return (
      <MarkStack compact={compact} kicker="CAT" title="2">
        <SquareStamp compact={compact}>
          <g transform="translate(-4 -1) scale(0.78)" opacity="0.22">
            <ArcFlashPictogram tone={ON_PLATE} />
          </g>
          <text
            x="32"
            y="41"
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
    <InfoTooltip
      label={standardAriaLabel(resolved, locale)}
      title={resolved.name}
      content={description}
      className="max-w-full"
    >
      <BadgeFace certification={resolved} compact={compact} />
    </InfoTooltip>
  );
}

export function CertificationRow({
  certifications,
  locale,
  compact = false,
  columns,
  className,
}: {
  readonly certifications: readonly Certification[];
  readonly locale: Locale;
  readonly compact?: boolean;
  readonly columns?: 3;
  readonly className?: string;
}) {
  if (certifications.length === 0) return null;

  const threeAcross = columns === 3;

  return (
    <ul
      className={cn(
        threeAcross
          ? "grid w-full grid-cols-3 justify-items-center gap-x-1 gap-y-3"
          : cn("flex flex-wrap items-start", compact ? "gap-x-3.5 gap-y-4" : "gap-x-5 gap-y-5"),
        className,
      )}
    >
      {certifications.map((certification) => (
        <li key={certification.id} className={threeAcross ? "flex min-w-0 w-full justify-center" : undefined}>
          <CertificationBadge certification={certification} locale={locale} compact={compact} />
        </li>
      ))}
    </ul>
  );
}

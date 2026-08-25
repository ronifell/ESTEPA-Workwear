import { InfoTooltip } from "@/components/ui/info-tooltip";
import { resolveCertificationIcon } from "@/lib/certifications";
import { resolveStandard, standardAriaLabel } from "@/lib/standards";
import { cn } from "@/lib/utils";
import type { Certification, CertificationIcon, Locale } from "@/types";

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
    <span className="mt-1 flex flex-col items-center text-center leading-[1.05]">
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

function ShieldPath() {
  return (
    <path
      d="M24 3.4 42.2 10v16.2c0 10.4-7.4 18.4-18.2 21.4C13.2 44.6 5.8 36.6 5.8 26.2V10L24 3.4Z"
      fill="#fff"
      stroke="#111"
      strokeWidth="2.4"
      strokeLinejoin="round"
    />
  );
}

function InnerFlame({ fill = "#111" }: { readonly fill?: string }) {
  return (
    <g fill={fill}>
      <path d="M24 15.2c2.8 4.2 6.6 7 6.4 11.4 0 3.4-2.8 5.6-6.4 5.6s-6.4-2.2-6.4-5.6c0-4.4 3.6-7.2 6.4-11.4Z" />
      <rect x="17.6" y="31.8" width="12.8" height="1.5" fill="#fff" />
    </g>
  );
}

function InnerArc() {
  return (
    <g fill="#111">
      <path d="M20.2 15.2 15.6 27.8h5.2L18.4 39.2 32 23.6h-6.2z" />
      <path d="M33.4 18.6 31.2 22.2l2.6.8-2 3.4 2.8-.4-1.2 3.2 2.8-2.2 1.6 2.6.4-3.4 2.8.4-2.2-2.8 2.2-1.6-2.8.2.2-3.2-2.8 1.4z" />
    </g>
  );
}

function InnerWeld() {
  return (
    <g fill="#111">
      <path d="M16.8 16.6h14.4c.7 0 1.2.5 1.2 1.2v3.2H15.6v-3.2c0-.7.5-1.2 1.2-1.2Z" />
      <path d="M14.8 21.8h18.4v10.6c0 .9-.8 1.6-1.6 1.6H16.4c-.9 0-1.6-.7-1.6-1.6V21.8Z" />
      <path fill="#fff" d="M18.4 24.4h11.2v4.2H18.4z" />
      <path d="M20.4 35.6 18.8 40h2.2l1.1-4.4h-1.7Zm6.2 0L25 40h2.2l1.1-4.4h-1.7Z" />
    </g>
  );
}

function InnerAntistatic() {
  return <path fill="#111" d="M26.2 13.4 16.6 27.6h7.4L21.8 40.6l10.2-15.4h-7.2z" />;
}

function InnerChemical() {
  return (
    <g fill="none" stroke="#111" strokeWidth="1.8" strokeLinecap="round">
      <path d="M20.2 14.4v6.4L15.2 30.6A3 3 0 0 0 17.8 35h12.4a3 3 0 0 0 2.6-4.4L25.8 20.8v-6.4" />
      <path d="M18.6 14.4h10.8" />
    </g>
  );
}

function InnerRain() {
  return (
    <g fill="none" stroke="#111" strokeWidth="1.8" strokeLinecap="round">
      <path d="M17.6 24.2a5.6 5.6 0 0 1 10.8-2A4 4 0 0 1 30.2 30H18a3.8 3.8 0 0 1-.4-5.8Z" />
      <path d="M20.4 33.2v2.4M24 33.2v2.4M27.6 33.2v2.4" />
    </g>
  );
}

function InnerCold() {
  return (
    <g fill="none" stroke="#111" strokeWidth="1.8" strokeLinecap="round">
      <path d="M24 14.4v19.2M18.8 18.2l5.2 4.2 5.2-4.2M18.8 30l5.2-4.2 5.2 4.2M16.2 24h15.6" />
    </g>
  );
}

function ShieldGlyph({ icon }: { readonly icon: CertificationIcon }) {
  return (
    <svg viewBox="0 0 48 56" aria-hidden className="size-full">
      <ShieldPath />
      {icon === "flame" ? <InnerFlame /> : null}
      {icon === "arc" ? <InnerArc /> : null}
      {icon === "weld" ? <InnerWeld /> : null}
      {icon === "antistatic" ? <InnerAntistatic /> : null}
      {icon === "chemical" ? <InnerChemical /> : null}
      {icon === "rain" ? <InnerRain /> : null}
      {icon === "cold" ? <InnerCold /> : null}
      {icon === "badge" || icon === "ul" ? <InnerFlame /> : null}
    </svg>
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
    <span
      className={cn(
        "inline-flex overflow-hidden rounded-[0.4rem] border-[1.5px] border-navy-950 bg-white shadow-[0_1px_2px_rgb(10_23_39/0.12)]",
        compact ? "h-[3.7rem] w-[2.75rem]" : "h-[4.6rem] w-[3.2rem]",
      )}
    >
      <span className="flex h-full w-full flex-col">
        <span className="flex flex-[1.15] items-center justify-center bg-white">
          <span
            className={cn(
              "flex items-center justify-center rounded-full border-[1.6px] border-navy-950 font-display font-black leading-none tracking-tight text-navy-950",
              compact ? "size-[1.45rem] text-[0.6rem]" : "size-[1.75rem] text-[0.72rem]",
            )}
          >
            UL
          </span>
        </span>
        <span className="bg-navy-950 px-0.5 py-[0.12rem] text-center font-display font-bold uppercase leading-none tracking-[0.08em] text-white">
          <span className={cn(compact ? "text-[0.4rem]" : "text-[0.45rem]", band === "Certificate" && "tracking-[0.01em]")}>
            {band}
          </span>
        </span>
        <span className="flex flex-[0.85] flex-col items-center justify-center bg-navy-950 px-0.5 pb-0.5">
          <span
            className={cn(
              "font-display font-semibold uppercase leading-none tracking-[0.14em] text-white/85",
              compact ? "text-[0.34rem]" : "text-[0.4rem]",
            )}
          >
            Safety US
          </span>
        </span>
      </span>
    </span>
  );
}

function NfpaFlameMark({
  compact,
  line2,
}: {
  readonly compact: boolean;
  readonly line2: string;
}) {
  return (
    <span className="inline-flex flex-col items-center">
      <span className={cn(compact ? "size-[2.85rem]" : "size-[3.5rem]")}>
        <svg viewBox="0 0 48 48" aria-hidden className="size-full">
          <rect x="2.4" y="2.4" width="43.2" height="43.2" rx="5.2" fill="#fff" stroke="#111" strokeWidth="2.8" />
          <g transform="translate(0 -1)">
            <path
              fill="var(--color-cert-flame)"
              d="M24 7c4.5 6 11 10.5 10.2 18-.4 3.4-3.6 5-6.4 3.2 3.6 4.4 5.8 9 1.6 14-1.8 2.2-4.2 2.8-5.4 2.6-1.2.2-3.6-.4-5.4-2.6-4.2-5-2-9.6 1.6-14-2.8 1.8-6 .2-6.4-3.2C13 17.5 19.5 13 24 7Z"
            />
          </g>
        </svg>
      </span>
      <MarkCaption kicker="NFPA" title={line2} compact={compact} />
    </span>
  );
}

function FramedMark({
  compact,
  kicker,
  title,
  variant,
}: {
  readonly compact: boolean;
  readonly kicker: string | null;
  readonly title: string;
  readonly variant: "arc" | "flame";
}) {
  return (
    <span className="inline-flex flex-col items-center">
      <span className={cn(compact ? "size-[2.85rem]" : "size-[3.5rem]")}>
        <svg viewBox="0 0 48 48" aria-hidden className="size-full">
          <rect x="2.4" y="2.4" width="43.2" height="43.2" rx="5.2" fill="#fff" stroke="#111" strokeWidth="2.8" />
          <g transform="translate(0 -2)">{variant === "flame" ? <InnerFlame fill="var(--color-cert-flame)" /> : <InnerArc />}</g>
        </svg>
      </span>
      <MarkCaption kicker={kicker} title={title} compact={compact} />
    </span>
  );
}

function ShieldMark({
  compact,
  icon,
  kicker,
  title,
}: {
  readonly compact: boolean;
  readonly icon: CertificationIcon;
  readonly kicker: string | null;
  readonly title: string;
}) {
  return (
    <span className="inline-flex flex-col items-center">
      <span className={cn(compact ? "h-[3.05rem] w-[2.6rem]" : "h-[3.75rem] w-[3.2rem]")}>
        <ShieldGlyph icon={icon} />
      </span>
      <MarkCaption kicker={kicker} title={title} compact={compact} />
    </span>
  );
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

  if (id === "ul") return <UlCertifiedMark compact={compact} band="Certified" />;
  if (id === "ul-certificate") return <UlCertifiedMark compact={compact} band="Certificate" />;
  if (id === "nfpa-2112") return <NfpaFlameMark compact={compact} line2="2112" />;
  if (id === "nfpa-70e") return <NfpaFlameMark compact={compact} line2="70E" />;
  if (id === "astm-f1506") {
    return <FramedMark compact={compact} kicker="ASTM" title="F1506" variant="arc" />;
  }
  if (id === "cat-2") {
    return <FramedMark compact={compact} kicker="CAT" title="2" variant="arc" />;
  }
  if (icon === "ul") return <UlCertifiedMark compact={compact} band="Certified" />;

  return <ShieldMark compact={compact} icon={icon} kicker={kicker} title={title} />;
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
    <ul className={cn("flex flex-wrap items-end", compact ? "gap-3" : "gap-4", className)}>
      {certifications.map((certification) => (
        <li key={certification.id}>
          <CertificationBadge certification={certification} locale={locale} compact={compact} />
        </li>
      ))}
    </ul>
  );
}

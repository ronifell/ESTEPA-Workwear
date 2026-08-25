import type { ReactNode } from "react";

const INK = "#0a1727";

function SymbolFrame({
  title,
  children,
}: {
  readonly title: string;
  readonly children: ReactNode;
}) {
  return (
    <li className="flex flex-col items-center gap-1">
      <svg
        viewBox="0 0 40 40"
        className="size-9"
        role="img"
        aria-label={title}
        fill="none"
        stroke={INK}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {children}
      </svg>
      <span className="max-w-[4.5rem] text-center font-display text-[0.5rem] font-medium uppercase leading-tight tracking-[0.06em] text-text-subtle">
        {title}
      </span>
    </li>
  );
}

export function CareSymbols({ locale }: { readonly locale: "es" | "en" }) {
  const labels =
    locale === "es"
      ? {
          wash: "Lavar 30 °C",
          bleach: "No cloro",
          dry: "Secar al aire",
          iron: "Plancha media",
        }
      : {
          wash: "Wash 30 °C",
          bleach: "No chlorine",
          dry: "Line dry",
          iron: "Medium iron",
        };

  return (
    <ul className="flex flex-wrap gap-3">
      <SymbolFrame title={labels.wash}>
        <path d="M6 14h28l-3 16H9z" />
        <circle cx="20" cy="23" r="2.2" fill={INK} stroke="none" />
      </SymbolFrame>
      <SymbolFrame title={labels.bleach}>
        <path d="M20 8 33 32H7z" />
        <path d="M14 28 26 16" />
      </SymbolFrame>
      <SymbolFrame title={labels.dry}>
        <path d="M8 28h24" />
        <path d="M12 28 V16 l8-6 8 6 v12" />
      </SymbolFrame>
      <SymbolFrame title={labels.iron}>
        <path d="M8 26h22l-3-10H18" />
        <path d="M8 26c0 4 4 6 10 6h12" />
        <circle cx="16" cy="22" r="1.2" fill={INK} stroke="none" />
        <circle cx="21" cy="22" r="1.2" fill={INK} stroke="none" />
      </SymbolFrame>
    </ul>
  );
}

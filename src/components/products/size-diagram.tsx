import type { ReactNode } from "react";

import type { ProductCategoryId } from "@/types";

const INK = "#0a1727";

export const sizeMeasureIds = ["A", "B", "C", "D"] as const;
export type SizeMeasureId = (typeof sizeMeasureIds)[number];

export const sizeMeasureKeys: Record<
  ProductCategoryId,
  Record<SizeMeasureId, "shoulder" | "chest" | "sleeve" | "length" | "waist" | "hip" | "inseam" | "hem">
> = {
  jackets: { A: "shoulder", B: "chest", C: "sleeve", D: "length" },
  shirts: { A: "shoulder", B: "chest", C: "sleeve", D: "length" },
  trousers: { A: "waist", B: "hip", C: "inseam", D: "length" },
  coveralls: { A: "chest", B: "waist", C: "inseam", D: "length" },
  vests: { A: "shoulder", B: "chest", C: "length", D: "hem" },
};

function Dim({
  x1,
  y1,
  x2,
  y2,
  letter,
  labelSide = "end",
}: {
  readonly x1: number;
  readonly y1: number;
  readonly x2: number;
  readonly y2: number;
  readonly letter: string;
  readonly labelSide?: "start" | "end" | "mid";
}) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const lx = labelSide === "start" ? x1 : labelSide === "mid" ? mx : x2;
  const ly = labelSide === "start" ? y1 : labelSide === "mid" ? my : y2;

  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={INK} strokeWidth="1.1" />
      <circle cx={x1} cy={y1} r="1.6" fill={INK} />
      <circle cx={x2} cy={y2} r="1.6" fill={INK} />
      <circle cx={lx} cy={ly} r="7.5" fill="#fff" stroke={INK} strokeWidth="1.2" />
      <text
        x={lx}
        y={ly + 3.4}
        textAnchor="middle"
        fontFamily="Archivo, ui-sans-serif, system-ui, sans-serif"
        fontSize="9"
        fontWeight="700"
        fill={INK}
      >
        {letter}
      </text>
    </g>
  );
}

function JacketDrawing() {
  return (
    <>
      <path
        d="M70 38 L100 28 L130 38 L158 52 L150 78 L140 74 L140 168 L60 168 L60 74 L50 78 L42 52 Z"
        fill="none"
        stroke={INK}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M100 28 L100 168" stroke={INK} strokeWidth="1.1" />
      <path d="M88 34 L100 48 L112 34" fill="none" stroke={INK} strokeWidth="1.1" />
      <path d="M60 92 H140" stroke={INK} strokeWidth="0.8" opacity="0.45" />
      <Dim x1={70} y1={22} x2={130} y2={22} letter="A" labelSide="mid" />
      <Dim x1={48} y1={88} x2={152} y2={88} letter="B" labelSide="end" />
      <Dim x1={158} y1={52} x2={150} y2={168} letter="C" labelSide="end" />
      <Dim x1={28} y1={28} x2={28} y2={168} letter="D" labelSide="mid" />
    </>
  );
}

function ShirtDrawing() {
  return (
    <>
      <path
        d="M68 36 L100 26 L132 36 L156 50 L146 78 L138 74 L138 172 L62 172 L62 74 L54 78 L44 50 Z"
        fill="none"
        stroke={INK}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M88 34 L100 48 L112 34" fill="none" stroke={INK} strokeWidth="1.1" />
      <path d="M100 48 V172" stroke={INK} strokeWidth="1.1" />
      <rect x="70" y="78" width="22" height="18" fill="none" stroke={INK} strokeWidth="0.9" />
      <rect x="108" y="78" width="22" height="18" fill="none" stroke={INK} strokeWidth="0.9" />
      <Dim x1={68} y1={20} x2={132} y2={20} letter="A" labelSide="mid" />
      <Dim x1={50} y1={96} x2={150} y2={96} letter="B" labelSide="end" />
      <Dim x1={156} y1={50} x2={146} y2={172} letter="C" labelSide="end" />
      <Dim x1={28} y1={26} x2={28} y2={172} letter="D" labelSide="mid" />
    </>
  );
}

function TrousersDrawing() {
  return (
    <>
      <path
        d="M62 28 H138 L146 188 H108 L100 92 L92 188 H54 Z"
        fill="none"
        stroke={INK}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M62 44 H138" stroke={INK} strokeWidth="1.1" />
      <path d="M70 28 V44 M100 28 V44 M130 28 V44" stroke={INK} strokeWidth="0.9" />
      <Dim x1={62} y1={18} x2={138} y2={18} letter="A" labelSide="mid" />
      <Dim x1={54} y1={70} x2={146} y2={70} letter="B" labelSide="end" />
      <Dim x1={108} y1={92} x2={108} y2={188} letter="C" labelSide="end" />
      <Dim x1={28} y1={28} x2={28} y2={188} letter="D" labelSide="mid" />
    </>
  );
}

function CoverallDrawing() {
  return (
    <>
      <path
        d="M72 36 L100 28 L128 36 L154 50 L146 74 L138 70 L138 96 L148 188 H110 L100 120 L90 188 H52 L62 96 L62 70 L54 74 L46 50 Z"
        fill="none"
        stroke={INK}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M100 28 V120" stroke={INK} strokeWidth="1.1" />
      <path d="M62 96 H138" stroke={INK} strokeWidth="0.9" opacity="0.55" />
      <Dim x1={50} y1={86} x2={150} y2={86} letter="A" labelSide="end" />
      <Dim x1={62} y1={108} x2={138} y2={108} letter="B" labelSide="mid" />
      <Dim x1={110} y1={120} x2={110} y2={188} letter="C" labelSide="end" />
      <Dim x1={28} y1={28} x2={28} y2={188} letter="D" labelSide="mid" />
    </>
  );
}

function VestDrawing() {
  return (
    <>
      <path
        d="M70 34 L100 48 L130 34 L148 50 L148 168 L52 168 L52 50 Z"
        fill="none"
        stroke={INK}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M70 34 L100 78 L130 34" fill="none" stroke={INK} strokeWidth="1.1" />
      <path d="M52 108 H148" stroke={INK} strokeWidth="0.9" opacity="0.5" />
      <Dim x1={70} y1={22} x2={130} y2={22} letter="A" labelSide="mid" />
      <Dim x1={44} y1={96} x2={156} y2={96} letter="B" labelSide="end" />
      <Dim x1={28} y1={48} x2={28} y2={168} letter="C" labelSide="mid" />
      <Dim x1={52} y1={180} x2={148} y2={180} letter="D" labelSide="mid" />
    </>
  );
}

const drawings: Record<ProductCategoryId, () => ReactNode> = {
  jackets: JacketDrawing,
  shirts: ShirtDrawing,
  trousers: TrousersDrawing,
  coveralls: CoverallDrawing,
  vests: VestDrawing,
};

export function SizeDiagram({
  category,
  caption,
  kicker,
}: {
  readonly category: ProductCategoryId;
  readonly caption: string;
  readonly kicker: string;
}) {
  const Drawing = drawings[category];

  return (
    <figure className="flex flex-col items-center">
      <svg
        viewBox="0 0 200 210"
        className="h-auto w-full max-w-[220px]"
        role="img"
        aria-label={caption}
      >
        <Drawing />
      </svg>
      <figcaption className="sr-only">{caption}</figcaption>
      <p className="mt-1 font-display text-[0.5625rem] font-semibold uppercase tracking-[0.12em] text-text-subtle">
        {kicker}
      </p>
    </figure>
  );
}

import { getDictionary } from "@/i18n";
import type { Locale } from "@/types";

const INK = "#0a1727";

export function BodyMeasureDiagram({
  caption,
  locale,
}: {
  readonly caption: string;
  readonly locale: Locale;
}) {
  const copy = getDictionary(locale).product.sizeSimulator;

  return (
    <svg viewBox="0 0 220 320" className="h-auto w-full max-w-[16rem]" role="img" aria-label={caption}>
      <path
        d="M110 28c12 0 22 10 22 22 0 8-4 15-10 19v8c18 6 30 22 32 42l2 18c1 10-6 16-14 16h-6v86c0 8-6 14-14 14h-24c-8 0-14-6-14-14v-86h-6c-8 0-15-6-14-16l2-18c2-20 14-36 32-42v-8c-6-4-10-11-10-19 0-12 10-22 22-22Z"
        fill="none"
        stroke={INK}
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <ellipse
        cx="110"
        cy="108"
        rx="48"
        ry="11"
        fill="none"
        stroke={INK}
        strokeWidth="1.2"
        strokeDasharray="4 3"
      />
      <ellipse
        cx="110"
        cy="148"
        rx="40"
        ry="9"
        fill="none"
        stroke={INK}
        strokeWidth="1.2"
        strokeDasharray="4 3"
      />
      <ellipse
        cx="110"
        cy="186"
        rx="46"
        ry="10"
        fill="none"
        stroke={INK}
        strokeWidth="1.2"
        strokeDasharray="4 3"
      />
      <path
        d="M110 50 C148 58 168 78 178 118"
        fill="none"
        stroke={INK}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path d="M174 114l6 2-4 6" fill="none" stroke={INK} strokeWidth="1.4" strokeLinecap="round" />
      <text x="168" y="104" fontFamily="Archivo, ui-sans-serif, sans-serif" fontSize="9" fontWeight="700" fill={INK}>
        {copy.chest}
      </text>
      <text x="158" y="152" fontFamily="Archivo, ui-sans-serif, sans-serif" fontSize="9" fontWeight="700" fill={INK}>
        {copy.waist}
      </text>
      <text x="164" y="190" fontFamily="Archivo, ui-sans-serif, sans-serif" fontSize="9" fontWeight="700" fill={INK}>
        {copy.hip}
      </text>
      <text x="182" y="78" fontFamily="Archivo, ui-sans-serif, sans-serif" fontSize="9" fontWeight="700" fill={INK}>
        {copy.arm}
      </text>
    </svg>
  );
}

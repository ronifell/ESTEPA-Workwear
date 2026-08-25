import type { SVGProps } from "react";

/**
 * Line-based icon set drawn on a 24×24 grid with a 1.5 stroke, matching the
 * technical tone of the brand. Icons are decorative by default; pass a `title`
 * only when the icon carries meaning on its own.
 */

export type IconProps = SVGProps<SVGSVGElement> & { title?: string };

function Svg({ title, children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      focusable="false"
      {...props}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Protection categories                                                       */
/* -------------------------------------------------------------------------- */

export function ChemicalIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M9.5 3v5.2L4.7 17a2.6 2.6 0 0 0 2.2 4h10.2a2.6 2.6 0 0 0 2.2-4l-4.8-8.8V3" />
      <path d="M8 3h8" />
      <path d="M6.9 14.2h10.2" />
      <circle cx="10.6" cy="17.4" r="0.9" />
      <circle cx="13.8" cy="18.4" r="0.6" />
    </Svg>
  );
}

export function CutIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M3.6 3.6 12 12" />
      <path d="M20.4 3.6 12 12l-3.4 3.4" />
      <circle cx="6.2" cy="18" r="2.6" />
      <circle cx="17.8" cy="18" r="2.6" />
      <path d="M8 16.1 12 12" />
    </Svg>
  );
}

export function ElectricalIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M13.2 2 5 13.4h5.4L9.8 22 18 10.6h-5.4z" />
    </Svg>
  );
}

export function FlashFireIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 2.5c2.4 3 3.6 5.2 3.6 6.7 0 1.3-.7 2.2-1.9 2.2-1.3 0-1.9-.9-1.9-2.4 0-.6.1-1.2.3-1.8-2.9 2.2-4.4 4.7-4.4 7.3A6.3 6.3 0 0 0 12 21a6.3 6.3 0 0 0 6.3-6.3c0-4.4-2.9-8.2-6.3-12.2Z" />
    </Svg>
  );
}

export function HighVisibilityIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M8.6 3 5 5.1V21h14V5.1L15.4 3" />
      <path d="M8.6 3 12 7l3.4-4" />
      <path d="M5 12.5h14" />
      <path d="M5 15.6h14" />
    </Svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Value propositions                                                          */
/* -------------------------------------------------------------------------- */

export function ShieldCheckIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 2.8 4.5 5.6v6c0 4.6 3.1 8.4 7.5 9.6 4.4-1.2 7.5-5 7.5-9.6v-6z" />
      <path d="m8.9 11.9 2.2 2.2 4-4.2" />
    </Svg>
  );
}

export function GearIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="3.1" />
      <path d="M12 2.6v2.6M12 18.8v2.6M21.4 12h-2.6M5.2 12H2.6M18.6 5.4l-1.9 1.9M7.3 16.7l-1.9 1.9M18.6 18.6l-1.9-1.9M7.3 7.3 5.4 5.4" />
    </Svg>
  );
}

export function GemIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M6.4 3.5h11.2L21.5 9 12 20.5 2.5 9z" />
      <path d="M2.5 9h19" />
      <path d="m9 9 3 11.5L15 9l-2.2-5.5h-1.6z" />
    </Svg>
  );
}

export function HeadsetIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
      <path d="M4 14h2.2a1 1 0 0 1 1 1v3.4a1 1 0 0 1-1 1H5.4A1.4 1.4 0 0 1 4 18v-4Z" />
      <path d="M20 14h-2.2a1 1 0 0 0-1 1v3.4a1 1 0 0 0 1 1h.8A1.4 1.4 0 0 0 20 18v-4Z" />
      <path d="M18.4 19.6c0 1.2-1.6 2-3.6 2" />
    </Svg>
  );
}

export function TargetIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="8.4" />
      <circle cx="12" cy="12" r="4.6" />
      <circle cx="12" cy="12" r="1" />
    </Svg>
  );
}

export function LayersIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m12 3 8.6 4.4L12 11.8 3.4 7.4z" />
      <path d="m3.4 12 8.6 4.4 8.6-4.4" />
      <path d="m3.4 16.6 8.6 4.4 8.6-4.4" />
    </Svg>
  );
}

export function ClipboardIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M9 4.5H7.4a1.6 1.6 0 0 0-1.6 1.6v13.3A1.6 1.6 0 0 0 7.4 21h9.2a1.6 1.6 0 0 0 1.6-1.6V6.1a1.6 1.6 0 0 0-1.6-1.6H15" />
      <rect x="9" y="2.9" width="6" height="3.2" rx="0.8" />
      <path d="M9 11.6h6M9 15.2h4" />
    </Svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Interface                                                                   */
/* -------------------------------------------------------------------------- */

export function ArrowRightIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4.5 12h15" />
      <path d="m13.4 5.9 6.1 6.1-6.1 6.1" />
    </Svg>
  );
}

export function ArrowLeftIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M19.5 12h-15" />
      <path d="M10.6 5.9 4.5 12l6.1 6.1" />
    </Svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m6 9.5 6 6 6-6" />
    </Svg>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m9.5 6 6 6-6 6" />
    </Svg>
  );
}

export function CartIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M2.8 3.4h2.4l2.2 11.1a1.7 1.7 0 0 0 1.7 1.4h8.3a1.7 1.7 0 0 0 1.7-1.3l1.6-6.7H6.1" />
      <circle cx="9.6" cy="20" r="1.4" />
      <circle cx="17.4" cy="20" r="1.4" />
    </Svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M3.5 6.5h17M3.5 12h17M3.5 17.5h17" />
    </Svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m5.5 5.5 13 13M18.5 5.5l-13 13" />
    </Svg>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 5v14M5 12h14" />
    </Svg>
  );
}

export function MinusIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M5 12h14" />
    </Svg>
  );
}

export function TrashIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 6.4h16" />
      <path d="M9.4 6.4V4.8a1.2 1.2 0 0 1 1.2-1.2h2.8a1.2 1.2 0 0 1 1.2 1.2v1.6" />
      <path d="M6.4 6.4 7.3 19a1.6 1.6 0 0 0 1.6 1.5h6.2a1.6 1.6 0 0 0 1.6-1.5l.9-12.6" />
      <path d="M10.4 10.2v6.4M13.6 10.2v6.4" />
    </Svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m4.8 12.6 4.6 4.6L19.2 7.4" />
    </Svg>
  );
}

export function DownloadIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 3.5v11.4" />
      <path d="m7.4 10.6 4.6 4.6 4.6-4.6" />
      <path d="M4.5 20.5h15" />
    </Svg>
  );
}

export function PrinterIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M7.2 9V3.8h9.6V9" />
      <path d="M7.2 16.2H4.6A1.6 1.6 0 0 1 3 14.6v-4A1.6 1.6 0 0 1 4.6 9h14.8A1.6 1.6 0 0 1 21 10.6v4a1.6 1.6 0 0 1-1.6 1.6h-2.6" />
      <path d="M7.2 13.4h9.6v6.8H7.2z" />
      <path d="M16.6 11.8h.02" />
    </Svg>
  );
}

export function DocumentIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M13.4 3H7.6A1.6 1.6 0 0 0 6 4.6v14.8A1.6 1.6 0 0 0 7.6 21h8.8a1.6 1.6 0 0 0 1.6-1.6V7.6z" />
      <path d="M13.4 3v4.6H18" />
      <path d="M9.2 12.8h5.6M9.2 16.2h4" />
    </Svg>
  );
}

export function InfoIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M12 11.2v5" />
      <circle cx="12" cy="8.1" r="0.8" fill="currentColor" stroke="none" />
    </Svg>
  );
}

export function AlertIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M10.6 3.9 2.9 17.4A1.6 1.6 0 0 0 4.3 19.8h15.4a1.6 1.6 0 0 0 1.4-2.4L13.4 3.9a1.6 1.6 0 0 0-2.8 0Z" />
      <path d="M12 9v4.2" />
      <circle cx="12" cy="16.4" r="0.85" fill="currentColor" stroke="none" />
    </Svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="2.8" y="5" width="18.4" height="14" rx="1.6" />
      <path d="m3.4 6.4 8.6 6 8.6-6" />
    </Svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M7.6 3.5H5.2a1.7 1.7 0 0 0-1.7 1.9c.6 5.7 5.3 10.4 11 11a1.7 1.7 0 0 0 1.9-1.7v-2.4a1.7 1.7 0 0 0-1.4-1.7l-2-.4a1.7 1.7 0 0 0-1.7.7l-.6.9a12.6 12.6 0 0 1-4.6-4.6l.9-.6a1.7 1.7 0 0 0 .7-1.7l-.4-2a1.7 1.7 0 0 0-1.7-1.4Z" />
    </Svg>
  );
}

export function WhatsappIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M3.2 20.8 4.6 16A8.4 8.4 0 1 1 8 19.4z" />
      <path d="M9 8.6c-.3 0-.6.1-.8.4-.3.3-.7.8-.7 1.8s.8 2 .9 2.2c.1.2 1.4 2.4 3.6 3.2 1.8.7 2.2.6 2.6.5.4 0 1.3-.5 1.5-1.1.2-.6.2-1 .1-1.1l-1.7-.8c-.2-.1-.4-.1-.6.1l-.6.8c-.1.2-.3.2-.5.1a5.9 5.9 0 0 1-2.6-2.3c-.1-.2 0-.4.1-.5l.4-.5c.1-.2.1-.3 0-.5l-.7-1.7c-.2-.4-.4-.4-.6-.4z" />
    </Svg>
  );
}

export function MapPinIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 21.2s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
      <circle cx="12" cy="10.1" r="2.6" />
    </Svg>
  );
}

export function LinkedinIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="2" />
      <path d="M7.6 10.4v6.2" />
      <circle cx="7.6" cy="7.6" r="0.9" fill="currentColor" stroke="none" />
      <path d="M11.4 16.6v-3.4a2.6 2.6 0 0 1 5.2 0v3.4" />
      <path d="M11.4 10.4v6.2" />
    </Svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="4.6" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="0.9" fill="currentColor" stroke="none" />
    </Svg>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M14.8 21.2v-8h2.7l.4-3.2h-3.1V8c0-.9.3-1.6 1.6-1.6h1.6V3.5A20 20 0 0 0 15.6 3c-2.4 0-4 1.5-4 4.2v2.8H8.8v3.2h2.8v8" />
    </Svg>
  );
}

export function SpinnerIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 3.5a8.5 8.5 0 1 0 8.5 8.5" />
    </Svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Product category silhouettes (used by the placeholder artwork)              */
/* -------------------------------------------------------------------------- */

export function CoverallsIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M8.8 3h6.4l3.3 2.2-1.3 4.2-1.4-.6V21H8.2V8.8l-1.4.6L5.5 5.2z" />
      <path d="M12 3v6" />
      <path d="M8.2 14.4h7.6" />
    </Svg>
  );
}

export function JacketIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M9 3h6l3.6 2.4L20 11l-2.4.9V21H6.4v-9.1L4 11l1.4-5.6z" />
      <path d="M12 3.6V21" />
      <path d="M9.6 8.2h1.2" />
    </Svg>
  );
}

export function TrousersIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M6.6 3h10.8l.9 18h-4.2L12 11.4 9.9 21H5.7z" />
      <path d="M6.6 6.4h10.8" />
    </Svg>
  );
}

export function ShirtIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M9.2 3 12 5.6 14.8 3l4.4 2.6-1.7 4.6-1.9-.8V21H8.4V9.4l-1.9.8L4.8 5.6z" />
      <path d="m9.2 3 2.8 2.6L14.8 3" />
    </Svg>
  );
}

export function VestIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M8.6 3 12 6.4 15.4 3l3.6 2.2V21h-4.2V9.6H9.2V21H5V5.2z" />
      <path d="M5 13.2h4.2M14.8 13.2H19" />
    </Svg>
  );
}

import type { Certification, CertificationIcon } from "@/types";

const ICON_BY_ID: Record<string, CertificationIcon> = {
  "en-11611": "weld",
  "en-11612": "flame",
  "en-1149": "antistatic",
  "en-61482": "arc",
  "en-13034": "chemical",
  "en-343": "rain",
  "en-342": "cold",
  ul: "ul",
};

export function resolveCertificationIcon(certification: Certification): CertificationIcon {
  if (certification.icon) return certification.icon;
  return ICON_BY_ID[certification.id] ?? "badge";
}

export const certificationIconIds = [
  "weld",
  "flame",
  "antistatic",
  "arc",
  "chemical",
  "rain",
  "cold",
  "ul",
  "badge",
] as const satisfies readonly CertificationIcon[];

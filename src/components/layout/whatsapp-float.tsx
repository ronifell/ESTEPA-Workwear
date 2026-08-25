"use client";

import { WhatsappIcon } from "@/components/ui/icons";
import { useI18n } from "@/components/providers/i18n-provider";
import { siteConfig } from "@/config/site";

export function WhatsappFloat() {
  const number = siteConfig.contact.whatsapp.replace(/\D/g, "");
  const { dictionary } = useI18n();

  if (!number) return null;

  const href = `https://wa.me/${number}?text=${encodeURIComponent(dictionary.trust.whatsappPrefill)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={dictionary.trust.whatsappAria}
      className="fixed right-4 z-40 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_24px_-8px_rgb(16_35_58/0.55)] transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent print:hidden max-lg:bottom-20 lg:bottom-6 lg:right-6"
    >
      <WhatsappIcon className="size-7" strokeWidth={1.6} />
    </a>
  );
}

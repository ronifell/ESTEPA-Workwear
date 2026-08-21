"use client";

import { useEffect, useRef } from "react";

import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { fullNav } from "@/components/layout/nav-config";
import { useI18n } from "@/components/providers/i18n-provider";
import { buttonStyles } from "@/components/ui/button";
import { ArrowRightIcon, CloseIcon } from "@/components/ui/icons";
import { LocalizedLink } from "@/components/ui/localized-link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export interface MobileMenuProps {
  readonly open: boolean;
  readonly onClose: () => void;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const { locale, dictionary } = useI18n();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;

      const items = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((item) => item.offsetParent !== null);
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-70 lg:hidden",
        open ? "pointer-events-auto" : "pointer-events-none",
      )}
      aria-hidden={!open}
    >
      <div
        onClick={onClose}
        className={cn(
          "absolute inset-0 bg-navy-950/60 transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0",
        )}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal={open || undefined}
        aria-label={dictionary.nav.mainNavigation}
        className={cn(
          "absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-sand-100 shadow-2xl transition-transform duration-300 ease-[var(--ease-out-industrial)]",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-5">
          <span className="font-display text-[0.625rem] font-semibold uppercase tracking-[0.28em] text-text-muted">
            {siteConfig.companyName}
          </span>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={dictionary.nav.closeMenu}
            className="-mr-2 flex size-10 items-center justify-center text-navy-900 transition-colors hover:text-accent"
          >
            <CloseIcon className="size-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-5 py-6" aria-label={dictionary.nav.mainNavigation}>
          <ul className="flex flex-col">
            {fullNav.map((item, index) => (
              <li key={item.route}>
                <LocalizedLink
                  route={item.route}
                  locale={locale}
                  onClick={onClose}
                  className="group flex items-center justify-between border-b border-border/70 py-4 font-display text-lg font-semibold text-navy-900 transition-colors hover:text-accent"
                >
                  <span className="flex items-baseline gap-3">
                    <span className="font-mono text-[0.625rem] tabular-nums text-text-subtle">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {dictionary.nav[item.labelKey]}
                  </span>
                  <ArrowRightIcon className="size-4 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                </LocalizedLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="shrink-0 space-y-4 border-t border-border bg-sand-200/60 px-5 py-5">
          <LocalizedLink
            route="contact"
            locale={locale}
            onClick={onClose}
            className={buttonStyles("primary", "md", "w-full")}
          >
            {dictionary.common.requestInformation}
          </LocalizedLink>

          <div className="flex items-center justify-between">
            <span className="font-display text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-text-muted">
              {dictionary.nav.language}
            </span>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </div>
  );
}

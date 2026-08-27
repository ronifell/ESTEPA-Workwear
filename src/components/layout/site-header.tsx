"use client";

import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

import { CartButton } from "@/components/cart/cart-button";
import { MiniCart } from "@/components/cart/mini-cart";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { Logo } from "@/components/layout/logo";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { primaryNav, sectorNav } from "@/components/layout/nav-config";
import { useI18n } from "@/components/providers/i18n-provider";
import { ChevronDownIcon, MenuIcon } from "@/components/ui/icons";
import { LocalizedLink } from "@/components/ui/localized-link";
import { sectors } from "@/data/sectors";
import { getPath } from "@/i18n/routes";
import { cn } from "@/lib/utils";

const linkStyles =
  "relative font-display text-[0.8125rem] font-semibold uppercase tracking-[0.09em] text-text-muted transition-colors hover:text-primary";

const activeUnderline =
  "after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-full after:bg-accent";

export function SiteHeader() {
  const { locale, dictionary } = useI18n();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSectorsOpen, setIsSectorsOpen] = useState(false);
  const [renderedPathname, setRenderedPathname] = useState(pathname);
  const sectorsRef = useRef<HTMLDivElement>(null);
  const sectorsPanelId = useId();

  // Navigating away closes every overlay.
  if (pathname !== renderedPathname) {
    setRenderedPathname(pathname);
    setIsMobileOpen(false);
    setIsSectorsOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isSectorsOpen) return;

    function onPointerDown(event: MouseEvent) {
      if (!sectorsRef.current?.contains(event.target as Node)) setIsSectorsOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsSectorsOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isSectorsOpen]);

  const isActive = (href: string, exact = false) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);

  const homeHref = getPath("home", locale);
  const isSectorActive = sectorNav.some((item) => isActive(getPath(item.route, locale)));

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-100 focus:rounded-xs focus:bg-primary focus:px-4 focus:py-2 focus:font-display focus:text-xs focus:font-semibold focus:uppercase focus:tracking-widest focus:text-primary-contrast"
      >
        {dictionary.common.skipToContent}
      </a>

      <header
        className={cn(
          "sticky top-0 z-50 border-b bg-sand-100/95 backdrop-blur-sm transition-shadow duration-300 print:hidden",
          isScrolled ? "border-border shadow-header" : "border-transparent",
        )}
      >
        <div className="container-page">
          <div className="flex h-16 items-center justify-between gap-4 lg:h-20">
            <Logo locale={locale} priority />

            <nav
              aria-label={dictionary.nav.mainNavigation}
              className="hidden items-center gap-7 lg:flex xl:gap-9"
            >
              <LocalizedLink
                route="home"
                locale={locale}
                className={cn(linkStyles, isActive(homeHref, true) && `text-primary ${activeUnderline}`)}
              >
                {dictionary.nav.home}
              </LocalizedLink>

              <div
                ref={sectorsRef}
                className="relative"
                onMouseEnter={() => setIsSectorsOpen(true)}
                onMouseLeave={() => setIsSectorsOpen(false)}
              >
                <button
                  type="button"
                  aria-expanded={isSectorsOpen}
                  aria-controls={sectorsPanelId}
                  onClick={() => setIsSectorsOpen((open) => !open)}
                  className={cn(
                    linkStyles,
                    "flex items-center gap-1.5",
                    (isSectorActive || isSectorsOpen) && `text-primary ${activeUnderline}`,
                  )}
                >
                  {dictionary.nav.solutions}
                  <ChevronDownIcon
                    className={cn(
                      "size-3.5 transition-transform duration-200",
                      isSectorsOpen && "rotate-180",
                    )}
                  />
                </button>

                <div
                  id={sectorsPanelId}
                  hidden={!isSectorsOpen}
                  className="absolute left-1/2 top-full z-50 w-[26rem] -translate-x-1/2 pt-4"
                >
                  <div className="animate-fade rounded-2xl border border-border bg-surface p-2 shadow-card-hover">
                    {sectors.map((sector) => (
                      <LocalizedLink
                        key={sector.id}
                        route={sector.routeKey}
                        locale={locale}
                        className="group flex items-start gap-3 rounded-2xl p-3 transition-colors hover:bg-sand-100"
                      >
                        <span
                          aria-hidden
                          className="mt-1.5 h-px w-5 shrink-0 bg-accent transition-all duration-200 group-hover:w-7"
                        />
                        <span className="min-w-0">
                          <span className="block font-display text-sm font-semibold text-navy-900">
                            {sector.name[locale]}
                          </span>
                          <span className="mt-0.5 block text-xs leading-relaxed text-text-muted">
                            {sector.tagline[locale]}
                          </span>
                        </span>
                      </LocalizedLink>
                    ))}
                  </div>
                </div>
              </div>

              {primaryNav.map((item) => (
                <LocalizedLink
                  key={item.route}
                  route={item.route}
                  locale={locale}
                  className={cn(
                    linkStyles,
                    isActive(getPath(item.route, locale)) && `text-primary ${activeUnderline}`,
                  )}
                >
                  {dictionary.nav[item.labelKey]}
                </LocalizedLink>
              ))}
            </nav>

            <div className="flex items-center gap-1 sm:gap-3">
              <LanguageSwitcher className="hidden sm:flex" />
              <span aria-hidden className="hidden h-4 w-px bg-border-strong sm:block" />
              <CartButton />
              <button
                type="button"
                onClick={() => setIsMobileOpen(true)}
                aria-label={dictionary.nav.openMenu}
                className="-mr-2 flex size-10 items-center justify-center text-navy-900 transition-colors hover:text-accent lg:hidden"
              >
                <MenuIcon className="size-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu open={isMobileOpen} onClose={() => setIsMobileOpen(false)} />
      <MiniCart />
    </>
  );
}

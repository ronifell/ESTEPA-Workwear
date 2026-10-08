"use client";

import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

import { CartButton } from "@/components/cart/cart-button";
import { MiniCart } from "@/components/cart/mini-cart";
import { FavoritesNavButton } from "@/components/favorites/favorites-nav-button";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { Logo } from "@/components/layout/logo";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { primaryNav, sectorNav } from "@/components/layout/nav-config";
import { useI18n } from "@/components/providers/i18n-provider";
import { ChevronDownIcon, MenuIcon } from "@/components/ui/icons";
import { LocalizedLink } from "@/components/ui/localized-link";
import { sectors } from "@/data/sectors";
import { getPath } from "@/i18n/routes";
import { categoryIds } from "@/lib/product-filters";
import { cn } from "@/lib/utils";

const linkStyles =
  "relative shrink-0 whitespace-nowrap font-display text-[0.6875rem] font-semibold uppercase tracking-[0.06em] text-text-muted transition-colors hover:text-primary xl:text-[0.75rem] xl:tracking-[0.08em] 2xl:text-[0.8125rem]";

const activeUnderline =
  "after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-full after:bg-accent";

export function SiteHeader() {
  const { locale, dictionary } = useI18n();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSectorsOpen, setIsSectorsOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [renderedPathname, setRenderedPathname] = useState(pathname);
  const sectorsRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const sectorsPanelId = useId();
  const productsPanelId = useId();

  // Navigating away closes every overlay.
  if (pathname !== renderedPathname) {
    setRenderedPathname(pathname);
    setIsMobileOpen(false);
    setIsSectorsOpen(false);
    setIsProductsOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isSectorsOpen && !isProductsOpen) return;

    function onPointerDown(event: MouseEvent) {
      const target = event.target as Node;
      if (isSectorsOpen && !sectorsRef.current?.contains(target)) setIsSectorsOpen(false);
      if (isProductsOpen && !productsRef.current?.contains(target)) setIsProductsOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsSectorsOpen(false);
        setIsProductsOpen(false);
      }
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isSectorsOpen, isProductsOpen]);

  const isActive = (href: string, exact = false) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);

  const isSectorActive = sectorNav.some((item) => isActive(getPath(item.route, locale)));
  const productsHref = getPath("products", locale);
  const isProductsActive = isActive(productsHref);

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
          <div className="flex h-16 items-center lg:h-[4.75rem]">
            <Logo locale={locale} priority className="-ml-4 mr-9 lg:mr-12" />

            <nav
              aria-label={dictionary.nav.mainNavigation}
              className="hidden min-w-0 flex-1 items-center justify-end gap-3 lg:flex xl:gap-5 2xl:gap-6"
            >
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

              <div
                ref={productsRef}
                className="relative"
                onMouseEnter={() => setIsProductsOpen(true)}
                onMouseLeave={() => setIsProductsOpen(false)}
              >
                <button
                  type="button"
                  aria-expanded={isProductsOpen}
                  aria-controls={productsPanelId}
                  onClick={() => setIsProductsOpen((open) => !open)}
                  className={cn(
                    linkStyles,
                    "flex items-center gap-1.5",
                    (isProductsActive || isProductsOpen) && `text-primary ${activeUnderline}`,
                  )}
                >
                  {dictionary.nav.products}
                  <ChevronDownIcon
                    className={cn(
                      "size-3.5 transition-transform duration-200",
                      isProductsOpen && "rotate-180",
                    )}
                  />
                </button>

                <div
                  id={productsPanelId}
                  hidden={!isProductsOpen}
                  className="absolute left-1/2 top-full z-50 w-60 -translate-x-1/2 pt-4"
                >
                  <div className="animate-fade rounded-2xl border border-border bg-surface p-2 shadow-card-hover">
                    <LocalizedLink
                      route="products"
                      locale={locale}
                      onClick={() => setIsProductsOpen(false)}
                      className="block rounded-xl px-3 py-2.5 font-display text-sm font-semibold text-navy-900 transition-colors hover:bg-sand-100"
                    >
                      {dictionary.products.filters.all}
                    </LocalizedLink>
                    {categoryIds.map((id) => (
                      <LocalizedLink
                        key={id}
                        route="products"
                        locale={locale}
                        query={{ category: id }}
                        onClick={() => setIsProductsOpen(false)}
                        className="block rounded-xl px-3 py-2.5 font-display text-sm font-semibold text-navy-900 transition-colors hover:bg-sand-100"
                      >
                        {dictionary.products.categories[id]}
                      </LocalizedLink>
                    ))}
                  </div>
                </div>
              </div>

              {primaryNav
                .filter((item) => item.route !== "products")
                .map((item) => (
                  <LocalizedLink
                    key={item.route}
                    route={item.route}
                    locale={locale}
                    className={cn(
                      linkStyles,
                      item.route === "faq" && "hidden xl:inline",
                      isActive(getPath(item.route, locale)) && `text-primary ${activeUnderline}`,
                    )}
                  >
                    {item.route === "faq" ? dictionary.nav.faqShort : dictionary.nav[item.labelKey]}
                  </LocalizedLink>
                ))}
            </nav>

            <div className="flex shrink-0 items-center gap-1 sm:gap-3">
              <LanguageSwitcher className="hidden sm:flex" />
              <span aria-hidden className="hidden h-4 w-px bg-border-strong sm:block" />
              <FavoritesNavButton />
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

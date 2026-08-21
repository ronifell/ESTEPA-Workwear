import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { Logo } from "@/components/layout/logo";
import { fullNav } from "@/components/layout/nav-config";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  WhatsappIcon,
} from "@/components/ui/icons";
import { LocalizedLink } from "@/components/ui/localized-link";
import { siteConfig } from "@/config/site";
import { getDictionary } from "@/i18n";
import type { RouteKey } from "@/i18n/routes";
import type { Locale } from "@/types";

const legalLinks: readonly { route: RouteKey; labelKey: "privacy" | "terms" | "returns" }[] = [
  { route: "privacy", labelKey: "privacy" },
  { route: "terms", labelKey: "terms" },
  { route: "returns", labelKey: "returns" },
];

export function SiteFooter({ locale }: { locale: Locale }) {
  const dictionary = getDictionary(locale);
  const { contact, social } = siteConfig;

  const socialLinks = [
    { href: social.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
    { href: social.instagram, label: "Instagram", Icon: InstagramIcon },
    { href: social.facebook, label: "Facebook", Icon: FacebookIcon },
  ].filter((entry) => entry.href.length > 0);

  const contactLinks = [
    contact.email
      ? { href: `mailto:${contact.email}`, label: contact.email, Icon: MailIcon }
      : null,
    contact.phone
      ? { href: `tel:${contact.phone.replace(/\s+/g, "")}`, label: contact.phone, Icon: PhoneIcon }
      : null,
    contact.whatsapp
      ? {
          href: `https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`,
          label: contact.whatsapp,
          Icon: WhatsappIcon,
        }
      : null,
  ].filter((entry): entry is { href: string; label: string; Icon: typeof MailIcon } => entry !== null);

  return (
    <footer className="relative overflow-hidden bg-navy-900 text-text-inverse">
      <div aria-hidden className="blueprint-grid absolute inset-0 opacity-60" />
      <div aria-hidden className="hazard-stripes absolute inset-x-0 top-0 h-1 opacity-70" />

      <div className="container-page relative py-14 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Logo locale={locale} variant="plate" />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-text-inverse-muted">
              {dictionary.footer.description}
            </p>

            {socialLinks.length > 0 ? (
              <div className="mt-8">
                <p className="eyebrow mb-3 text-bronze-300">{dictionary.footer.socialTitle}</p>
                <ul className="flex items-center gap-2">
                  {socialLinks.map(({ href, label, Icon }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={label}
                        className="flex size-10 items-center justify-center border border-border-inverse text-text-inverse-muted transition-colors hover:border-accent hover:text-accent"
                      >
                        <Icon className="size-4.5" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          <nav className="lg:col-span-3" aria-label={dictionary.footer.navigationTitle}>
            <p className="eyebrow mb-5 text-bronze-300">{dictionary.footer.navigationTitle}</p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3 lg:grid-cols-1">
              {fullNav.map((item) => (
                <li key={item.route}>
                  <LocalizedLink
                    route={item.route}
                    locale={locale}
                    className="text-sm text-text-inverse-muted transition-colors hover:text-text-inverse"
                  >
                    {dictionary.nav[item.labelKey]}
                  </LocalizedLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <p className="eyebrow mb-5 text-bronze-300">{dictionary.footer.contactTitle}</p>

            {contactLinks.length > 0 || contact.address ? (
              <ul className="space-y-3">
                {contactLinks.map(({ href, label, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="group flex items-start gap-2.5 text-sm text-text-inverse-muted transition-colors hover:text-text-inverse"
                    >
                      <Icon className="mt-0.5 size-4 shrink-0 text-bronze-300" />
                      <span className="break-all">{label}</span>
                    </a>
                  </li>
                ))}
                {contact.address ? (
                  <li className="flex items-start gap-2.5 text-sm text-text-inverse-muted">
                    <MapPinIcon className="mt-0.5 size-4 shrink-0 text-bronze-300" />
                    <span>{contact.address}</span>
                  </li>
                ) : null}
              </ul>
            ) : (
              <p className="text-sm text-text-inverse-muted/80">
                {dictionary.footer.contactPending}
              </p>
            )}

            <div className="mt-6">
              <p className="eyebrow mb-2.5 text-bronze-300">{dictionary.nav.language}</p>
              <LanguageSwitcher inverse />
            </div>
          </div>

          <div className="lg:col-span-2">
            <p className="eyebrow mb-5 text-bronze-300">{dictionary.footer.legalTitle}</p>
            <ul className="space-y-3">
              {legalLinks.map((item) => (
                <li key={item.route}>
                  <LocalizedLink
                    route={item.route}
                    locale={locale}
                    className="text-sm text-text-inverse-muted transition-colors hover:text-text-inverse"
                  >
                    {dictionary.footer[item.labelKey]}
                  </LocalizedLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-border-inverse pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-text-inverse-muted/70">
            © {new Date().getFullYear()} {siteConfig.companyName}. {dictionary.footer.rights}
          </p>
          <p className="font-display text-[0.625rem] uppercase tracking-[0.22em] text-text-inverse-muted/50">
            {siteConfig.regions.join(" · ")}
          </p>
        </div>
      </div>
    </footer>
  );
}

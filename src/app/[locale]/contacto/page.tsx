import type { Metadata } from "next";

import { ContactForm } from "@/components/forms/contact-form";
import { PageHero } from "@/components/shared/page-hero";
import {
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  WhatsappIcon,
  type IconProps,
} from "@/components/ui/icons";
import { Notice } from "@/components/ui/notice";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/config/site";
import { sectors } from "@/data/sectors";
import { getDictionary, resolveLocale } from "@/i18n";
import { getPath } from "@/i18n/routes";
import { buildMetadataFromDictionary } from "@/lib/seo";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadataFromDictionary("contact", resolveLocale(locale), "contact");
}

export default async function ContactPage({ params }: PageProps) {
  const locale = resolveLocale((await params).locale);
  const dictionary = getDictionary(locale);
  const copy = dictionary.contact;
  const { contact } = siteConfig;

  const channels: readonly {
    readonly href: string;
    readonly label: string;
    readonly Icon: (props: IconProps) => React.JSX.Element;
  }[] = [
    contact.email
      ? { href: `mailto:${contact.email}`, label: contact.email, Icon: MailIcon }
      : null,
    contact.phone
      ? {
          href: `tel:${contact.phone.replace(/\s+/g, "")}`,
          label: contact.phone,
          Icon: PhoneIcon,
        }
      : null,
    contact.whatsapp
      ? {
          href: `https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`,
          label: contact.whatsapp,
          Icon: WhatsappIcon,
        }
      : null,
  ].filter(
    (entry): entry is { href: string; label: string; Icon: (props: IconProps) => React.JSX.Element } =>
      entry !== null,
  );

  return (
    <>
      <PageHero
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
        size="compact"
        breadcrumbs={[
          { label: dictionary.nav.home, href: getPath("home", locale) },
          { label: dictionary.nav.contact },
        ]}
      />

      <Section tone="default">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-7">
            <ContactForm />
          </Reveal>

          <Reveal delay={120} className="space-y-5 lg:col-span-5">
            <div className="border border-border bg-surface p-6">
              <h2 className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-navy-900">
                {copy.infoTitle}
              </h2>

              {channels.length > 0 || contact.address ? (
                <ul className="mt-5 space-y-4">
                  {channels.map(({ href, label, Icon }) => (
                    <li key={label}>
                      <a
                        href={href}
                        className="group flex items-start gap-3 text-sm text-text transition-colors hover:text-primary"
                      >
                        <Icon className="mt-0.5 size-4.5 shrink-0 text-accent" />
                        <span className="break-all">{label}</span>
                      </a>
                    </li>
                  ))}
                  {contact.address ? (
                    <li className="flex items-start gap-3 text-sm text-text">
                      <MapPinIcon className="mt-0.5 size-4.5 shrink-0 text-accent" />
                      {contact.address}
                    </li>
                  ) : null}
                </ul>
              ) : (
                <Notice tone="pending" className="mt-5">
                  {copy.infoPending}
                </Notice>
              )}
            </div>

            <div className="border border-border bg-surface p-6">
              <h2 className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-navy-900">
                {dictionary.about.coverageTitle}
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {siteConfig.regions.map((region) => (
                  <li
                    key={region}
                    className="border border-border-strong px-3 py-1.5 font-display text-xs font-semibold text-text"
                  >
                    {region}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-border bg-surface p-6">
              <h2 className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-navy-900">
                {dictionary.common.sectors}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {sectors.map((sector) => (
                  <li key={sector.id} className="text-sm text-text-muted">
                    <span className="font-medium text-text">{sector.name[locale]}</span>
                    <span aria-hidden className="mx-1.5 text-text-subtle">
                      ·
                    </span>
                    {sector.tagline[locale]}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-border bg-surface-muted p-6">
              <h2 className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-navy-900">
                {copy.responseTitle}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">
                {copy.responseDescription}
              </p>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}

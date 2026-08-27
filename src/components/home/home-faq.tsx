import { FaqList } from "@/components/faq/faq-list";
import { buttonStyles } from "@/components/ui/button";
import { ArrowRightIcon } from "@/components/ui/icons";
import { LocalizedLink } from "@/components/ui/localized-link";
import { Section, SectionHeading } from "@/components/ui/section";
import { getDictionary } from "@/i18n";
import type { Locale } from "@/types";

export function HomeFaq({ locale }: { readonly locale: Locale }) {
  const dictionary = getDictionary(locale);
  const preview = dictionary.faqPage.items.slice(0, 4);

  return (
    <Section tone="surface">
      <SectionHeading
        eyebrow={dictionary.home.faq.eyebrow}
        title={dictionary.home.faq.title}
        description={dictionary.home.faq.description}
        action={
          <LocalizedLink route="faq" locale={locale} className={buttonStyles("outline", "md")}>
            {dictionary.home.faq.cta}
            <ArrowRightIcon className="size-4" />
          </LocalizedLink>
        }
      />
      <FaqList locale={locale} items={preview} className="mt-10 lg:mt-12" />
    </Section>
  );
}

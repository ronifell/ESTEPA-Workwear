import { CertificationRow } from "@/components/products/certification-badge";
import { LocalizedLink } from "@/components/ui/localized-link";
import { fabrics, frartexCertifications } from "@/data/fabrics";
import { getDictionary } from "@/i18n";
import type { Locale } from "@/types";

export function FrartexBlock({ locale }: { readonly locale: Locale }) {
  const dictionary = getDictionary(locale);
  const fabric = fabrics.frartex;
  const copy = dictionary.sectorPage.frartex;

  return (
    <div className="border border-border bg-surface p-6 lg:p-8">
      <p className="font-display text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-accent">
        {copy.eyebrow}
      </p>
      <h3 className="mt-3 font-display text-2xl font-semibold text-navy-900">{fabric.name}</h3>
      <p className="mt-2 font-display text-sm font-semibold tracking-[0.04em] text-navy-700">
        {fabric.code}
        <span className="mx-2 text-text-subtle">·</span>
        {fabric.composition[locale]}
        <span className="mx-2 text-text-subtle">·</span>
        {fabric.weight}
      </p>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-text-muted">
        {fabric.description[locale]}
      </p>

      <ul className="mt-6 grid gap-2 sm:grid-cols-2">
        {fabric.properties[locale].map((property) => (
          <li key={property} className="flex items-start gap-2 text-sm text-text">
            <span aria-hidden className="mt-2 size-1.5 shrink-0 bg-accent" />
            {property}
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <p className="mb-3 font-display text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-navy-900">
          {copy.standards}
        </p>
        <CertificationRow certifications={frartexCertifications} locale={locale} />
      </div>

      <LocalizedLink
        route="products"
        locale={locale}
        query={{ sector: "oil-gas" }}
        className="mt-8 inline-flex font-display text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-primary transition-colors hover:text-accent"
      >
        {copy.cta}
      </LocalizedLink>
    </div>
  );
}

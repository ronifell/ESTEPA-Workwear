import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { AdminShell } from "@/components/admin/admin-shell";
import { ProductTable, type ProductRow } from "@/components/admin/product-table";
import { buttonStyles } from "@/components/ui/button";
import { Notice } from "@/components/ui/notice";
import { siteConfig } from "@/config/site";
import { sectorsById } from "@/data/sectors";
import { getDictionary } from "@/i18n";
import { getAdminSession } from "@/lib/admin/auth";
import { adminCopy } from "@/lib/admin/copy";
import { formatPrice } from "@/lib/format";
import { getAllProductsForAdmin } from "@/lib/repositories/products";
import { isCatalogueOverridden } from "@/lib/storage/product-store";

export const metadata: Metadata = {
  title: adminCopy.list.title,
};

/** The catalogue can change at any moment, so the list is never cached. */
export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const dictionary = getDictionary("es");
  const [products, overridden] = await Promise.all([
    getAllProductsForAdmin(),
    isCatalogueOverridden(),
  ]);

  const rows: ProductRow[] = products.map((product) => ({
    id: product.id,
    slug: product.slug,
    name: product.name.es,
    category: dictionary.products.categories[product.category],
    sectors: product.sectors.map((sector) => sectorsById[sector].name.es),
    price:
      product.price === undefined
        ? adminCopy.list.noPrice
        : formatPrice(product.price, "es", product.currency ?? siteConfig.commerce.currency),
    active: product.active,
    featured: product.featured,
    preliminary: product.preliminary,
  }));

  return (
    <AdminShell
      email={session.email}
      title={adminCopy.list.title}
      subtitle={adminCopy.list.subtitle}
      action={
        <Link href="/admin/productos/nuevo" className={buttonStyles("primary", "md")}>
          {adminCopy.list.newProduct}
        </Link>
      }
    >
      <div className="space-y-6">
        {!overridden ? (
          <Notice tone="pending" title={adminCopy.list.seedNoticeTitle}>
            {adminCopy.list.seedNotice}
          </Notice>
        ) : null}

        <ProductTable rows={rows} />
      </div>
    </AdminShell>
  );
}

import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { AdminShell } from "@/components/admin/admin-shell";
import { ProductForm } from "@/components/admin/product-form";
import { siteConfig } from "@/config/site";
import { getAdminSession } from "@/lib/admin/auth";
import { adminCopy } from "@/lib/admin/copy";
import { buildAdminOptions } from "@/lib/admin/options";
import { findProductById } from "@/lib/storage/product-store";

interface PageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: adminCopy.form.editTitle,
};

/** Always reads the current catalogue instead of a build-time snapshot. */
export const dynamic = "force-dynamic";

export default async function EditProductPage({ params }: PageProps) {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const { id } = await params;
  const product = await findProductById(id);
  if (!product) notFound();

  return (
    <AdminShell
      email={session.email}
      title={product.name.es}
      subtitle={adminCopy.form.editSubtitle}
    >
      <ProductForm
        mode="edit"
        product={product}
        options={buildAdminOptions()}
        defaultCurrency={siteConfig.commerce.currency}
      />
    </AdminShell>
  );
}

import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { AdminShell } from "@/components/admin/admin-shell";
import { ProductForm } from "@/components/admin/product-form";
import { siteConfig } from "@/config/site";
import { getAdminSession } from "@/lib/admin/auth";
import { adminCopy } from "@/lib/admin/copy";
import { buildAdminOptions } from "@/lib/admin/options";

export const metadata: Metadata = {
  title: adminCopy.form.createTitle,
};

export default async function NewProductPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  return (
    <AdminShell
      email={session.email}
      title={adminCopy.form.createTitle}
      subtitle={adminCopy.form.createSubtitle}
    >
      <ProductForm
        mode="create"
        options={buildAdminOptions()}
        defaultCurrency={siteConfig.commerce.currency}
      />
    </AdminShell>
  );
}

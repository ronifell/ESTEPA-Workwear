import type { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";

import { LoginForm } from "@/components/admin/login-form";
import { Notice } from "@/components/ui/notice";
import { siteConfig } from "@/config/site";
import { getAdminSession, isAdminConfigured } from "@/lib/admin/auth";
import { adminCopy } from "@/lib/admin/copy";

export const metadata: Metadata = {
  title: adminCopy.login.title,
};

export default async function AdminLoginPage() {
  if (await getAdminSession()) redirect("/admin");

  const configured = isAdminConfigured();

  return (
    <div className="flex min-h-dvh items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center text-center">
          <Image
            src={siteConfig.logoSrc}
            alt={siteConfig.companyName}
            width={2026}
            height={527}
            priority
            sizes="180px"
            unoptimized
            className="h-10 w-auto"
          />
          <h1 className="mt-6 text-2xl text-navy-900">{adminCopy.login.title}</h1>
          <p className="mt-2 text-sm leading-relaxed text-text-muted">
            {adminCopy.login.subtitle}
          </p>
        </div>

        <div className="mt-8 border border-border bg-surface p-6 shadow-card sm:p-8">
          {configured ? (
            <LoginForm />
          ) : (
            <Notice tone="pending" title={adminCopy.login.notConfiguredTitle}>
              {adminCopy.login.notConfigured}
            </Notice>
          )}
        </div>
      </div>
    </div>
  );
}

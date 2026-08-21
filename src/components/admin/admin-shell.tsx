import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { LogoutButton } from "@/components/admin/logout-button";
import { siteConfig } from "@/config/site";
import { adminCopy } from "@/lib/admin/copy";

export interface AdminShellProps {
  readonly email: string;
  readonly title: string;
  readonly subtitle?: string;
  readonly action?: ReactNode;
  readonly children: ReactNode;
}

export function AdminShell({ email, title, subtitle, action, children }: AdminShellProps) {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="bg-navy-900">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-x-6 gap-y-3 px-4 py-4 sm:px-6">
          <Link href="/admin" className="flex items-center gap-3 rounded-xs">
            <span className="flex items-center justify-center rounded-xs bg-sand-100 px-2.5 py-2">
              <Image
                src="/logo.png"
                alt={siteConfig.companyName}
                width={1774}
                height={887}
                sizes="120px"
                className="h-6 w-auto"
              />
            </span>
            <span className="font-display text-[0.625rem] font-semibold uppercase leading-none tracking-[0.24em] text-text-inverse-muted">
              {adminCopy.brand}
            </span>
          </Link>

          <div className="ml-auto flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="text-xs text-text-inverse-muted">
              {adminCopy.signedInAs}: <span className="text-text-inverse">{email}</span>
            </span>
            <Link
              href="/"
              className="font-display text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-text-inverse-muted transition-colors hover:text-text-inverse"
            >
              {adminCopy.viewSite}
            </Link>
            <LogoutButton />
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl text-navy-900 sm:text-3xl">{title}</h1>
            {subtitle ? (
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-muted">{subtitle}</p>
            ) : null}
          </div>
          {action}
        </div>

        <div className="mt-8">{children}</div>
      </main>
    </div>
  );
}

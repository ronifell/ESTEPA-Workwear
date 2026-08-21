import Link from "next/link";

import { buttonStyles } from "@/components/ui/button";
import { adminCopy } from "@/lib/admin/copy";

/**
 * Not-found boundary for the panel. It lives inside the admin segment so the
 * page renders within the admin `<html>` shell instead of the storefront one.
 */
export default function AdminNotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      <p className="eyebrow text-accent">404</p>
      <h1 className="mt-4 text-2xl text-navy-900">{adminCopy.notFound.title}</h1>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-text-muted">
        {adminCopy.notFound.description}
      </p>
      <Link href="/admin" className={buttonStyles("primary", "md", "mt-8")}>
        {adminCopy.notFound.cta}
      </Link>
    </div>
  );
}

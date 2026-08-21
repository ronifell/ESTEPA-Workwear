"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { adminCopy } from "@/lib/admin/copy";

export function LogoutButton() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  async function logout(): Promise<void> {
    setIsPending(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } finally {
      router.replace("/admin/login");
      router.refresh();
    }
  }

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => void logout()}
      className="font-display text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-text-inverse-muted transition-colors hover:text-text-inverse disabled:opacity-50"
    >
      {adminCopy.logout}
    </button>
  );
}

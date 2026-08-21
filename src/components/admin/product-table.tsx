"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { Notice } from "@/components/ui/notice";
import { adminCopy } from "@/lib/admin/copy";

export interface ProductRow {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
  readonly category: string;
  readonly sectors: readonly string[];
  readonly price: string;
  readonly active: boolean;
  readonly featured: boolean;
  readonly preliminary: boolean;
}

export function ProductTable({ rows }: { readonly rows: readonly ProductRow[] }) {
  const router = useRouter();
  const copy = adminCopy.list;

  const [pendingId, setPendingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function remove(row: ProductRow): Promise<void> {
    if (!window.confirm(copy.deleteConfirm(row.name))) return;

    setPendingId(row.id);
    setError(null);

    try {
      const response = await fetch(`/api/admin/products/${row.id}`, { method: "DELETE" });
      if (!response.ok) {
        setError(copy.deleteError);
        return;
      }
      router.refresh();
    } catch {
      setError(copy.deleteError);
    } finally {
      setPendingId(null);
    }
  }

  if (rows.length === 0) {
    return (
      <p className="border border-dashed border-border-strong bg-surface px-6 py-12 text-center text-sm text-text-subtle">
        {copy.empty}
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {error ? (
        <Notice tone="error" role="alert">
          {error}
        </Notice>
      ) : null}

      <div className="overflow-x-auto border border-border bg-surface">
        <table className="w-full min-w-4xl border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-surface-muted">
              <Th>{copy.columns.product}</Th>
              <Th>{copy.columns.category}</Th>
              <Th>{copy.columns.sectors}</Th>
              <Th>{copy.columns.price}</Th>
              <Th>{copy.columns.state}</Th>
              <Th className="text-right">{copy.columns.actions}</Th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-border last:border-b-0">
                <td className="px-4 py-3.5 align-top">
                  <span className="block font-display font-semibold text-navy-900">
                    {row.name}
                  </span>
                  <span className="mt-0.5 block text-xs text-text-subtle">
                    {row.id} · /{row.slug}
                  </span>
                </td>

                <td className="px-4 py-3.5 align-top text-text-muted">{row.category}</td>

                <td className="px-4 py-3.5 align-top text-text-muted">
                  {row.sectors.join(", ")}
                </td>

                <td className="whitespace-nowrap px-4 py-3.5 align-top text-text-muted">
                  {row.price}
                </td>

                <td className="px-4 py-3.5 align-top">
                  <span className="flex flex-wrap gap-1.5">
                    <Badge tone={row.active ? "primary" : "neutral"}>
                      {row.active ? copy.states.active : copy.states.inactive}
                    </Badge>
                    {row.featured ? <Badge tone="accent">{copy.states.featured}</Badge> : null}
                    {row.preliminary ? (
                      <Badge tone="pending">{copy.states.preliminary}</Badge>
                    ) : null}
                  </span>
                </td>

                <td className="px-4 py-3.5 align-top">
                  <span className="flex items-center justify-end gap-4">
                    <Link
                      href={`/admin/productos/${row.id}`}
                      className="font-display text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-primary transition-opacity hover:opacity-70"
                    >
                      {copy.edit}
                    </Link>
                    <button
                      type="button"
                      disabled={pendingId === row.id}
                      onClick={() => void remove(row)}
                      className="font-display text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-danger transition-opacity hover:opacity-70 disabled:opacity-50"
                    >
                      {pendingId === row.id ? copy.deleting : copy.delete}
                    </button>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Th({
  children,
  className,
}: {
  readonly children: ReactNode;
  readonly className?: string;
}) {
  return (
    <th
      scope="col"
      className={`px-4 py-3 font-display text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-text-muted ${className ?? ""}`}
    >
      {children}
    </th>
  );
}

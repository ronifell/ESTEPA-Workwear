"use client";

import { Button } from "@/components/ui/button";
import { PrinterIcon } from "@/components/ui/icons";

export function PrintDatasheetButton({ label }: { readonly label: string }) {
  return (
    <Button type="button" variant="outline" size="sm" onClick={() => window.print()}>
      <PrinterIcon className="size-4" />
      {label}
    </Button>
  );
}

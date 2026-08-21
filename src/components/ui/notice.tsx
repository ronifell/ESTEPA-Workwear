import type { ReactNode } from "react";

import { AlertIcon, CheckIcon, InfoIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

type NoticeTone = "info" | "pending" | "success" | "error";

const tones: Record<NoticeTone, { wrapper: string; icon: string }> = {
  info: { wrapper: "border-navy-200 bg-primary-soft text-primary", icon: "text-primary" },
  pending: {
    wrapper: "border-border-strong bg-surface-muted text-text-muted",
    icon: "text-accent",
  },
  success: {
    wrapper: "border-success/25 bg-success-soft text-success",
    icon: "text-success",
  },
  error: { wrapper: "border-danger/25 bg-danger-soft text-danger", icon: "text-danger" },
};

const icons: Record<NoticeTone, typeof InfoIcon> = {
  info: InfoIcon,
  pending: InfoIcon,
  success: CheckIcon,
  error: AlertIcon,
};

export interface NoticeProps {
  readonly title?: string;
  readonly children?: ReactNode;
  readonly tone?: NoticeTone;
  readonly className?: string;
  readonly role?: "status" | "alert";
}

export function Notice({
  title,
  children,
  tone = "info",
  className,
  role,
}: NoticeProps) {
  const Icon = icons[tone];
  const style = tones[tone];

  return (
    <div
      role={role}
      className={cn("flex gap-3 rounded-xs border px-4 py-3.5", style.wrapper, className)}
    >
      <Icon className={cn("mt-0.5 size-4 shrink-0", style.icon)} />
      <div className="min-w-0 text-sm leading-relaxed">
        {title ? <p className="font-semibold text-current">{title}</p> : null}
        {children ? (
          <div className={cn("text-current/85", title && "mt-1")}>{children}</div>
        ) : null}
      </div>
    </div>
  );
}

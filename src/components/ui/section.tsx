import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";

type Tone = "default" | "muted" | "surface" | "inverse";

const toneStyles: Record<Tone, string> = {
  default: "bg-background text-text industrial-texture",
  muted: "bg-surface-alt text-text industrial-texture",
  surface: "bg-surface text-text",
  inverse: "bg-navy-900 text-text-inverse",
};

export interface SectionProps {
  readonly children: ReactNode;
  readonly id?: string;
  readonly tone?: Tone;
  readonly className?: string;
  readonly containerClassName?: string;
  /** Removes the default vertical rhythm when a section manages its own spacing. */
  readonly flush?: boolean;
}

export function Section({
  children,
  id,
  tone = "default",
  className,
  containerClassName,
  flush = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        toneStyles[tone],
        !flush && "py-16 sm:py-20 lg:py-28",
        "scroll-mt-24",
        className,
      )}
    >
      <div className={cn("container-page", containerClassName)}>{children}</div>
    </section>
  );
}

export interface SectionHeadingProps {
  readonly eyebrow?: string;
  readonly title: string;
  readonly description?: string;
  readonly align?: "start" | "center";
  readonly inverse?: boolean;
  readonly className?: string;
  readonly action?: ReactNode;
  readonly as?: "h1" | "h2" | "h3";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "start",
  inverse = false,
  className,
  action,
  as: Heading = "h2",
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <Reveal
      className={cn(
        "flex flex-col gap-6",
        action && "lg:flex-row lg:items-end lg:justify-between",
        className,
      )}
    >
      <div className={cn("max-w-3xl", centered && "mx-auto text-center")}>
        {eyebrow ? (
          <p
            className={cn(
              "eyebrow mb-5",
              inverse ? "text-bronze-300" : "text-accent",
              centered && "justify-center",
            )}
          >
            <span
              aria-hidden
              className={cn("h-px w-8", inverse ? "bg-bronze-300/60" : "bg-accent/50")}
            />
            {eyebrow}
          </p>
        ) : null}

        <Heading
          className={cn(
            "text-balance-tight text-3xl leading-[1.08] sm:text-4xl lg:text-[2.75rem]",
            inverse && "text-text-inverse",
          )}
        >
          {title}
        </Heading>

        {description ? (
          <p
            className={cn(
              "mt-5 text-base leading-relaxed sm:text-lg",
              inverse ? "text-text-inverse-muted" : "text-text-muted",
            )}
          >
            {description}
          </p>
        ) : null}
      </div>

      {action ? <div className="shrink-0">{action}</div> : null}
    </Reveal>
  );
}

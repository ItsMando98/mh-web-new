import type { ReactNode } from "react";
import { ScrollReveal } from "./ScrollReveal";

interface SectionProps {
  readonly id: string;
  /** Two-digit sheet number, e.g. "02". */
  readonly sheet: string;
  readonly eyebrow: string;
  readonly title: string;
  readonly lead?: string;
  readonly children: ReactNode;
}

export function Section({ id, sheet, eyebrow, title, lead, children }: SectionProps) {
  const titleId = `${id}-title`;

  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className="relative border-t border-white/10 px-6 py-24 md:px-12 md:py-36"
    >
      <div className="mx-auto max-w-[90rem]">
        <ScrollReveal className="mb-14 grid gap-6 md:mb-20 md:grid-cols-[1fr_minmax(0,34rem)] md:items-end">
          <div>
            <p className="font-mono text-xs tracking-[0.2em] text-muted">
              SHEET {sheet} · {eyebrow}
            </p>
            <h2
              id={titleId}
              className="mt-4 font-sans text-[clamp(2.5rem,7vw,5.5rem)] font-semibold leading-none tracking-[-0.04em]"
            >
              {title}
            </h2>
          </div>
          {lead && <p className="max-w-prose text-lg text-foreground/70">{lead}</p>}
        </ScrollReveal>
        {children}
      </div>
    </section>
  );
}

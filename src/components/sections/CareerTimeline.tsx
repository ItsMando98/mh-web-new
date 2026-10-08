import { Section } from "@/components/section/Section";
import { ScrollReveal } from "@/components/section/ScrollReveal";
import { career, type CareerEntry } from "@/content/career";

const formatPeriod = ({ startYear, endYear }: CareerEntry) =>
  `${startYear} — ${endYear === "now" ? "now" : endYear}`;

const formatLevel = (level: number) => `LVL ${String(level).padStart(2, "0")}`;

export function CareerTimeline() {
  return (
    <Section
      id="career"
      sheet="02"
      eyebrow="THE RECORD"
      title="Career"
      lead="Every station on the way here — what I did, what shipped, what I took with me."
    >
      <ScrollReveal>
        <ol className="border-t border-white/10">
          {career.map((entry, index) => (
            <li key={entry.id} className="border-b border-white/10">
              <details className="group" open={index === 0}>
                <summary className="grid cursor-pointer list-none grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-2 py-6 transition-colors hover:bg-white/[0.03] md:grid-cols-[16rem_1fr_auto] md:px-4 [&::-webkit-details-marker]:hidden">
                  <span className="flex gap-4 font-mono text-xs">
                    <span className="text-accent">{formatLevel(entry.level)}</span>
                    <span className="text-muted">{formatPeriod(entry)}</span>
                  </span>
                  <span className="col-span-2 row-start-2 md:col-span-1 md:col-start-2 md:row-start-1">
                    <span className="block font-sans text-2xl font-semibold tracking-tight md:text-3xl">
                      {entry.role}
                    </span>
                    <span className="block text-muted">{entry.organization}</span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="col-start-2 row-start-1 font-mono text-2xl text-muted transition-transform group-open:rotate-45 md:col-start-3"
                  >
                    +
                  </span>
                </summary>
                <div className="grid gap-x-6 pb-8 md:grid-cols-[16rem_1fr] md:px-4">
                  <div className="md:col-start-2">
                    <p className="max-w-2xl text-foreground/80">{entry.summary}</p>
                    <ul className="mt-4 space-y-2 font-mono text-sm text-muted">
                      {entry.highlights.map((highlight) => (
                        <li key={highlight} className="flex gap-3">
                          <span aria-hidden="true" className="text-accent">
                            ▸
                          </span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </details>
            </li>
          ))}
        </ol>
      </ScrollReveal>
    </Section>
  );
}

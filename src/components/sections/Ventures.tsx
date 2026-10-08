import { Section } from "@/components/section/Section";
import { ScrollReveal } from "@/components/section/ScrollReveal";
import { ventures, type VentureStatus } from "@/content/ventures";

const STATUS_LABEL: Record<VentureStatus, string> = {
  active: "Active",
  exited: "Exited",
  paused: "Paused",
};

const formatIndex = (index: number) => `V—${String(index + 1).padStart(2, "0")}`;

export function Ventures() {
  return (
    <Section
      id="ventures"
      sheet="03"
      eyebrow="SIDE QUESTS & MAIN QUESTS"
      title="Ventures"
      lead="Things I started — some still running, some finished, all of them taught me something."
    >
      <ScrollReveal>
        <ul className="grid border-l border-t border-white/10 md:grid-cols-2">
          {ventures.map((venture, index) => (
            <li
              key={venture.id}
              className="group flex min-h-[26rem] flex-col border-b border-r border-white/10 p-8 transition-colors hover:bg-white/[0.03] md:p-12"
            >
              <div className="flex items-start justify-between font-mono text-xs">
                <span className="text-muted">{formatIndex(index)}</span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 uppercase tracking-wider">
                  <span
                    aria-hidden="true"
                    className={`size-1.5 rounded-full ${venture.status === "active" ? "bg-accent shadow-[0_0_8px_var(--accent)]" : "bg-muted"}`}
                  />
                  {STATUS_LABEL[venture.status]}
                </span>
              </div>
              <div className="mt-auto pt-16">
                <h3 className="font-sans text-4xl font-semibold tracking-[-0.03em] md:text-6xl">
                  {venture.name}
                </h3>
                <p className="mt-3 font-mono text-sm text-muted">
                  {venture.role} · {venture.period}
                </p>
                <p className="mt-6 max-w-md text-foreground/75">{venture.summary}</p>
                {venture.href && (
                  <a
                    href={venture.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-block font-mono text-sm text-accent underline-offset-4 hover:underline"
                  >
                    Visit ↗
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </ScrollReveal>
    </Section>
  );
}

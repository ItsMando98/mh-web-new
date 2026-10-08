import type { ReactNode } from "react";
import { Section } from "@/components/section/Section";
import { ScrollReveal } from "@/components/section/ScrollReveal";
import { projects, type Project } from "@/content/projects";

const ROW_CLASS =
  "group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 py-8 transition-colors hover:bg-white/[0.03] md:grid-cols-[4rem_1fr_5rem_2rem] md:px-4";

const formatIndex = (index: number) => String(index + 1).padStart(2, "0");

function ProjectRow({ project, index }: { project: Project; index: number }): ReactNode {
  const content = (
    <>
      <span className="font-mono text-xs text-muted">{formatIndex(index)}</span>
      <span>
        <span className="block font-sans text-2xl font-semibold tracking-tight transition-colors group-hover:text-accent md:text-4xl">
          {project.title}
        </span>
        <span className="mt-2 block max-w-xl text-foreground/70">{project.summary}</span>
        <span className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/15 px-3 py-0.5 font-mono text-[0.7rem] text-muted"
            >
              {tag}
            </span>
          ))}
        </span>
      </span>
      <span className="font-mono text-xs text-muted md:text-right">{project.year}</span>
      <span
        aria-hidden="true"
        className="hidden font-mono text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent md:block"
      >
        {project.href ? "↗" : ""}
      </span>
    </>
  );

  if (!project.href) return <div className={ROW_CLASS}>{content}</div>;

  return (
    <a href={project.href} target="_blank" rel="noopener noreferrer" className={ROW_CLASS}>
      {content}
    </a>
  );
}

export function Projects() {
  return (
    <Section
      id="projects"
      sheet="04"
      eyebrow="SELECTED WORK"
      title="Projects"
      lead="A short list of things I made. Each one is a problem, a decision and something that shipped."
    >
      <ScrollReveal>
        <ul className="border-t border-white/10">
          {projects.map((project, index) => (
            <li key={project.id} className="border-b border-white/10">
              <ProjectRow project={project} index={index} />
            </li>
          ))}
        </ul>
      </ScrollReveal>
    </Section>
  );
}

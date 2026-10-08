/** PLACEHOLDER CONTENT — replace with the real projects. */
export interface Project {
  readonly id: string;
  readonly title: string;
  readonly year: number;
  readonly tags: readonly string[];
  readonly summary: string;
  /** Optional absolute URL (live site, repo, case study). */
  readonly href?: string;
}

export const projects: readonly Project[] = [
  {
    id: "project-1",
    title: "Project One",
    year: 2026,
    tags: ["Product", "Web"],
    summary: "A single sentence on the problem and the outcome.",
  },
  {
    id: "project-2",
    title: "Project Two",
    year: 2025,
    tags: ["Open Source", "Tooling"],
    summary: "A single sentence on the problem and the outcome.",
  },
  {
    id: "project-3",
    title: "Project Three",
    year: 2024,
    tags: ["Design", "Brand"],
    summary: "A single sentence on the problem and the outcome.",
  },
  {
    id: "project-4",
    title: "Project Four",
    year: 2023,
    tags: ["Experiment"],
    summary: "A single sentence on the problem and the outcome.",
  },
];

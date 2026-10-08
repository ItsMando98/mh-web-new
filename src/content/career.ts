/**
 * PLACEHOLDER CONTENT — replace with the real career stations.
 * Keep newest first; `level` counts up from the oldest station (1).
 */
export interface CareerEntry {
  readonly id: string;
  readonly level: number;
  readonly role: string;
  readonly organization: string;
  readonly startYear: number;
  readonly endYear: number | "now";
  readonly summary: string;
  readonly highlights: readonly string[];
}

export const career: readonly CareerEntry[] = [
  {
    id: "station-4",
    level: 4,
    role: "Role Title",
    organization: "Company Name",
    startYear: 2024,
    endYear: "now",
    summary: "One or two sentences on what you do here and what you are responsible for.",
    highlights: ["A concrete result or shipped thing", "Another measurable outcome"],
  },
  {
    id: "station-3",
    level: 3,
    role: "Role Title",
    organization: "Company Name",
    startYear: 2022,
    endYear: 2024,
    summary: "One or two sentences on the scope of this station.",
    highlights: ["A concrete result or shipped thing", "Another measurable outcome"],
  },
  {
    id: "station-2",
    level: 2,
    role: "Role Title",
    organization: "Company Name",
    startYear: 2020,
    endYear: 2022,
    summary: "One or two sentences on the scope of this station.",
    highlights: ["A concrete result or shipped thing"],
  },
  {
    id: "station-1",
    level: 1,
    role: "Role Title",
    organization: "Company Name",
    startYear: 2018,
    endYear: 2020,
    summary: "Where it started.",
    highlights: ["What you learned or built first"],
  },
];

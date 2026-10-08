/** PLACEHOLDER CONTENT — replace with the real ventures. */
export type VentureStatus = "active" | "exited" | "paused";

export interface Venture {
  readonly id: string;
  readonly name: string;
  readonly role: string;
  readonly period: string;
  readonly status: VentureStatus;
  readonly summary: string;
  /** Optional absolute URL. */
  readonly href?: string;
}

export const ventures: readonly Venture[] = [
  {
    id: "venture-1",
    name: "Venture One",
    role: "Founder",
    period: "2023 — now",
    status: "active",
    summary: "What it is, who it is for and why it exists, in two sentences.",
  },
  {
    id: "venture-2",
    name: "Venture Two",
    role: "Co-founder",
    period: "2021 — 2023",
    status: "exited",
    summary: "What it was and how it ended — the honest version is the interesting one.",
  },
];

export type BootLineKind = "title" | "meta" | "task";

export interface BootLineSpec {
  readonly id: string;
  readonly kind: BootLineKind;
  readonly text: string;
  readonly startMs: number;
  readonly msPerChar: number;
  /** Duration of the progress bar after the label is typed (task lines only). */
  readonly loadMs?: number;
}

export interface BootLineFrame {
  readonly id: string;
  readonly kind: BootLineKind;
  readonly visibleText: string;
  /** 0..1 for task lines, null for plain text lines. */
  readonly progress: number | null;
  readonly hasStarted: boolean;
  readonly isComplete: boolean;
}

export type BootPhase = "boot" | "transition" | "done";

export interface BootFrame {
  readonly phase: BootPhase;
  readonly lines: readonly BootLineFrame[];
}

const TASK_LOAD_MS = 400;
const TASK_MS_PER_CHAR = 22;
const HOLD_AFTER_LAST_LINE_MS = 300;
const TRANSITION_DURATION_MS = 1000;

export const BOOT_LINES: readonly BootLineSpec[] = [
  { id: "name", kind: "title", text: "MATHIS HOFFMANN", startMs: 500, msPerChar: 45 },
  { id: "location", kind: "meta", text: "Hamburg, Germany", startMs: 1300, msPerChar: 30 },
  { id: "career", kind: "task", text: "Loading career...", startMs: 1900, msPerChar: TASK_MS_PER_CHAR, loadMs: TASK_LOAD_MS },
  { id: "ventures", kind: "task", text: "Loading ventures...", startMs: 2350, msPerChar: TASK_MS_PER_CHAR, loadMs: TASK_LOAD_MS },
  { id: "projects", kind: "task", text: "Loading projects...", startMs: 2800, msPerChar: TASK_MS_PER_CHAR, loadMs: TASK_LOAD_MS },
];

const typingEndMs = (spec: BootLineSpec) =>
  spec.startMs + spec.text.length * spec.msPerChar;

const lineEndMs = (spec: BootLineSpec) => typingEndMs(spec) + (spec.loadMs ?? 0);

export const TRANSITION_START_MS =
  Math.max(...BOOT_LINES.map(lineEndMs)) + HOLD_AFTER_LAST_LINE_MS;

export const TRANSITION_DURATION = TRANSITION_DURATION_MS;

export const TOTAL_DURATION_MS = TRANSITION_START_MS + TRANSITION_DURATION;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const buildLineFrame = (spec: BootLineSpec, elapsedMs: number): BootLineFrame => {
  const visibleChars = clamp(
    Math.floor((elapsedMs - spec.startMs) / spec.msPerChar),
    0,
    spec.text.length,
  );
  const isTask = spec.kind === "task";
  const progress = isTask
    ? clamp((elapsedMs - typingEndMs(spec)) / (spec.loadMs ?? 1), 0, 1)
    : null;

  return {
    id: spec.id,
    kind: spec.kind,
    visibleText: spec.text.slice(0, visibleChars),
    progress,
    hasStarted: visibleChars > 0,
    isComplete: isTask ? progress === 1 : visibleChars === spec.text.length,
  };
};

const resolvePhase = (elapsedMs: number): BootPhase => {
  if (elapsedMs >= TOTAL_DURATION_MS) return "done";
  if (elapsedMs >= TRANSITION_START_MS) return "transition";
  return "boot";
};

/** Pure snapshot of the boot screen at `elapsedMs` — no timers, no DOM. */
export const getBootFrame = (elapsedMs: number): BootFrame => {
  const safeElapsedMs = Math.max(0, elapsedMs);

  return {
    phase: resolvePhase(safeElapsedMs),
    lines: BOOT_LINES.map((spec) => buildLineFrame(spec, safeElapsedMs)),
  };
};

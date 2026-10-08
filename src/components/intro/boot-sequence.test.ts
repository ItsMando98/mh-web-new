import { describe, expect, test } from "vitest";
import {
  BOOT_LINES,
  TOTAL_DURATION_MS,
  TRANSITION_START_MS,
  getBootFrame,
} from "./boot-sequence";

const lineById = (elapsedMs: number, id: string) => {
  const line = getBootFrame(elapsedMs).lines.find((l) => l.id === id);
  if (!line) throw new Error(`line ${id} missing`);
  return line;
};

describe("getBootFrame", () => {
  test("shows a black screen without any text at t=0", () => {
    const frame = getBootFrame(0);

    expect(frame.phase).toBe("boot");
    expect(frame.lines.every((l) => l.visibleText === "")).toBe(true);
  });

  test("types the name character by character", () => {
    const early = lineById(700, "name").visibleText;
    const later = lineById(900, "name").visibleText;

    expect(early.length).toBeGreaterThan(0);
    expect(later.length).toBeGreaterThan(early.length);
    expect("MATHIS HOFFMANN".startsWith(later)).toBe(true);
  });

  test("never shows more text than the line contains", () => {
    const frame = getBootFrame(TRANSITION_START_MS - 1);

    for (const spec of BOOT_LINES) {
      const line = frame.lines.find((l) => l.id === spec.id);
      expect(line?.visibleText).toBe(spec.text);
    }
  });

  test("starts task lines one after another", () => {
    const [first, second, third] = BOOT_LINES.filter((l) => l.kind === "task");

    expect(first.startMs).toBeLessThan(second.startMs);
    expect(second.startMs).toBeLessThan(third.startMs);
  });

  test("progress only grows and ends at 1 for every task line", () => {
    const tasks = BOOT_LINES.filter((l) => l.kind === "task");

    for (const task of tasks) {
      let previous = 0;
      for (let t = 0; t <= TRANSITION_START_MS; t += 50) {
        const progress = lineById(t, task.id).progress ?? 0;
        expect(progress).toBeGreaterThanOrEqual(previous);
        previous = progress;
      }
      expect(lineById(TRANSITION_START_MS, task.id).progress).toBe(1);
      expect(lineById(TRANSITION_START_MS, task.id).isComplete).toBe(true);
    }
  });

  test("non-task lines have no progress value", () => {
    expect(lineById(TRANSITION_START_MS, "name").progress).toBeNull();
    expect(lineById(TRANSITION_START_MS, "location").progress).toBeNull();
  });

  test("switches to the transition once every line is complete", () => {
    expect(getBootFrame(TRANSITION_START_MS - 1).phase).toBe("boot");
    expect(getBootFrame(TRANSITION_START_MS).phase).toBe("transition");
    expect(
      getBootFrame(TRANSITION_START_MS).lines.every((l) => l.isComplete),
    ).toBe(true);
  });

  test("is done after the total duration", () => {
    expect(getBootFrame(TOTAL_DURATION_MS - 1).phase).toBe("transition");
    expect(getBootFrame(TOTAL_DURATION_MS).phase).toBe("done");
  });

  test("treats negative time like t=0", () => {
    expect(getBootFrame(-500)).toEqual(getBootFrame(0));
  });
});

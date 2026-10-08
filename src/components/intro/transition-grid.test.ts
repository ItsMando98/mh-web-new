import { describe, expect, test } from "vitest";
import { buildDissolveCells, DISSOLVE_COLS, DISSOLVE_ROWS } from "./transition-grid";

describe("buildDissolveCells", () => {
  test("creates one cell per grid position", () => {
    expect(buildDissolveCells()).toHaveLength(DISSOLVE_COLS * DISSOLVE_ROWS);
  });

  test("keeps every delay within 0..1", () => {
    for (const cell of buildDissolveCells()) {
      expect(cell.delay).toBeGreaterThanOrEqual(0);
      expect(cell.delay).toBeLessThanOrEqual(1);
    }
  });

  test("is deterministic so server and client agree", () => {
    expect(buildDissolveCells()).toEqual(buildDissolveCells());
  });

  test("dissolves from the top-left towards the bottom-right on average", () => {
    const cells = buildDissolveCells();
    const first = cells.find((c) => c.col === 0 && c.row === 0);
    const last = cells.find(
      (c) => c.col === DISSOLVE_COLS - 1 && c.row === DISSOLVE_ROWS - 1,
    );

    expect(first && last && first.delay < last.delay).toBe(true);
  });

  test("uses unique keys", () => {
    const keys = buildDissolveCells().map((c) => c.key);

    expect(new Set(keys).size).toBe(keys.length);
  });
});

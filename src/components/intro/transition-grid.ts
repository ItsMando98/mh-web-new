export const DISSOLVE_COLS = 16;
export const DISSOLVE_ROWS = 10;

/** Share of each cell's delay that comes from the diagonal sweep (rest is noise). */
const DIAGONAL_WEIGHT = 0.65;

export interface DissolveCell {
  readonly key: string;
  readonly col: number;
  readonly row: number;
  /** 0..1 — fraction of the available transition time to wait before fading. */
  readonly delay: number;
}

/** Deterministic pseudo-noise in 0..1 so server and client render the same grid. */
const noise = (col: number, row: number) =>
  ((((col * 73856093) ^ (row * 19349663)) >>> 0) % 1000) / 1000;

const cellDelay = (col: number, row: number) => {
  const diagonal = (col / (DISSOLVE_COLS - 1) + row / (DISSOLVE_ROWS - 1)) / 2;

  return DIAGONAL_WEIGHT * diagonal + (1 - DIAGONAL_WEIGHT) * noise(col, row);
};

export const buildDissolveCells = (): readonly DissolveCell[] =>
  Array.from({ length: DISSOLVE_COLS * DISSOLVE_ROWS }, (_, index) => {
    const col = index % DISSOLVE_COLS;
    const row = Math.floor(index / DISSOLVE_COLS);

    return { key: `${col}-${row}`, col, row, delay: cellDelay(col, row) };
  });

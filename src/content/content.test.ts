import { describe, expect, test } from "vitest";
import { career } from "./career";
import { character } from "./character";
import { projects } from "./projects";
import { ventures } from "./ventures";

const hasUniqueIds = (items: readonly { id: string }[]) =>
  new Set(items.map((item) => item.id)).size === items.length;

describe("career", () => {
  test("has unique ids", () => {
    expect(hasUniqueIds(career)).toBe(true);
  });

  test("is sorted newest first", () => {
    const years = career.map((entry) => entry.startYear);

    expect(years).toEqual([...years].sort((a, b) => b - a));
  });

  test("never ends before it starts", () => {
    for (const entry of career) {
      if (entry.endYear !== "now") {
        expect(entry.endYear).toBeGreaterThanOrEqual(entry.startYear);
      }
    }
  });

  test("numbers levels from the oldest station upwards", () => {
    const levels = career.map((entry) => entry.level);

    expect(levels).toEqual([...levels].sort((a, b) => b - a));
    expect(Math.min(...levels)).toBe(1);
  });
});

describe("ventures and projects", () => {
  test("have unique ids", () => {
    expect(hasUniqueIds(ventures)).toBe(true);
    expect(hasUniqueIds(projects)).toBe(true);
  });

  test("only use valid absolute urls for links", () => {
    const links = [...ventures, ...projects]
      .map((item) => item.href)
      .filter((href): href is string => href !== undefined);

    for (const href of links) {
      expect(() => new URL(href)).not.toThrow();
    }
  });
});

describe("character sheet", () => {
  test("keeps every stat within 0..100", () => {
    for (const stat of character.stats) {
      expect(stat.value).toBeGreaterThanOrEqual(0);
      expect(stat.value).toBeLessThanOrEqual(100);
    }
  });

  test("has unique stat labels", () => {
    const labels = character.stats.map((stat) => stat.label);

    expect(new Set(labels).size).toBe(labels.length);
  });
});

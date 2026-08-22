import { describe, expect, it } from "vitest";
import {
  DAY_1_TASKS,
  DAY_2_TASKS,
  DAY_3_TASKS,
  MISSABLE_ACHIEVEMENTS,
  PUZZLES,
} from "@/content/guide-content";

describe("guide source material", () => {
  it("contains the official 24-task, three-day route", () => {
    expect(DAY_1_TASKS).toHaveLength(9);
    expect(DAY_2_TASKS).toHaveLength(8);
    expect(DAY_3_TASKS).toHaveLength(7);
    expect(DAY_1_TASKS.length + DAY_2_TASKS.length + DAY_3_TASKS.length).toBe(24);
  });

  it("contains all twenty-four missable day achievements", () => {
    expect(MISSABLE_ACHIEVEMENTS.day1).toHaveLength(9);
    expect(MISSABLE_ACHIEVEMENTS.day2).toHaveLength(8);
    expect(MISSABLE_ACHIEVEMENTS.day3).toHaveLength(7);
  });

  it("contains exactly five approved puzzle topics and three distinct suitcase codes", () => {
    expect(PUZZLES).toHaveLength(5);
    const suitcase = PUZZLES.find((puzzle) => puzzle.id === "suitcase-codes");
    expect(suitcase?.solution).toContain("374");
    expect(suitcase?.solution).toContain("281");
    expect(suitcase?.solution).toContain("6294");
  });
});

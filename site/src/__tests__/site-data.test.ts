import { describe, expect, it } from "vitest";
import { CORE_PAGES, TOP_NAV, getKeywordAssignments } from "@/content/site-data";

describe("site content contract", () => {
  it("defines exactly nine unique core pages", () => {
    expect(CORE_PAGES).toHaveLength(9);
    expect(new Set(CORE_PAGES.map((page) => page.path)).size).toBe(9);
  });

  it("defines exactly five unique top navigation destinations", () => {
    expect(TOP_NAV).toHaveLength(5);
    expect(new Set(TOP_NAV.map((item) => item.href)).size).toBe(5);
  });

  it("assigns all nineteen keywords exactly once", () => {
    const keywords = getKeywordAssignments();
    expect(keywords).toHaveLength(19);
    expect(new Set(keywords).size).toBe(19);
  });

  it("keeps core metadata within the approved limits", () => {
    for (const page of CORE_PAGES) {
      expect(page.title.length).toBeLessThanOrEqual(60);
      expect(page.description.length).toBeGreaterThanOrEqual(140);
      expect(page.description.length).toBeLessThanOrEqual(160);
    }
  });
});

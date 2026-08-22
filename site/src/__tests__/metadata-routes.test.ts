import { describe, expect, it } from "vitest";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";

describe("metadata routes", () => {
  it("lists exactly the nine core pages in the sitemap", () => {
    const entries = sitemap();
    expect(entries).toHaveLength(9);
    expect(new Set(entries.map((entry) => entry.url)).size).toBe(9);
  });

  it("allows the public site and points to the sitemap", () => {
    const value = robots();
    expect(value.rules).toEqual({ userAgent: "*", allow: "/" });
    expect(value.sitemap).toMatch(/\/sitemap\.xml$/);
  });
});

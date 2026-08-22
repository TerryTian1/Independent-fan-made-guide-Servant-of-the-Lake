import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SiteHeader } from "@/components/site-header";

describe("SiteHeader", () => {
  it("renders five distinct primary navigation links", () => {
    render(<SiteHeader />);
    const navigation = screen.getByRole("navigation", { name: "Primary" });
    const links = Array.from(navigation.querySelectorAll("a"));
    expect(links).toHaveLength(5);
    expect(new Set(links.map((link) => link.getAttribute("href"))).size).toBe(5);
  });
});

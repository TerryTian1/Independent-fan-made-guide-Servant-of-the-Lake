import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { GuidePage } from "@/components/guide-page";
import { getPage } from "@/content/site-data";

describe("GuidePage", () => {
  it("renders one page heading, quick answer, sections, and related links", () => {
    render(
      <GuidePage
        page={getPage("walkthrough")}
        quickAnswer="The story runs for three days and 24 official tasks."
        sections={[
          { id: "day-1", title: "Day 1", body: ["Nine tasks."] },
          { id: "day-2", title: "Day 2", body: ["Eight tasks."] },
        ]}
        related={[{ href: "/puzzles/", label: "Puzzle solutions" }]}
      />,
    );
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByText("Quick answer")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Day 1" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Puzzle solutions" })).toBeInTheDocument();
  });
});

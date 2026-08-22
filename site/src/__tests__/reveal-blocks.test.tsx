import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HintSteps, SpoilerBlock } from "@/components/reveal-blocks";

describe("reveal blocks", () => {
  it("presents a puzzle solution behind an explicit summary", () => {
    render(
      <HintSteps
        hints={["Count the stripes.", "Order the cups from one to five."]}
        solution="1 → 2 → 3 → 4 → 5"
      />,
    );
    expect(screen.getByText("Show full solution")).toBeInTheDocument();
    expect(screen.getByText("1 → 2 → 3 → 4 → 5")).toBeInTheDocument();
  });

  it("labels story spoilers before the hidden content", () => {
    render(<SpoilerBlock>Hidden identity</SpoilerBlock>);
    expect(screen.getByText("Reveal story spoiler")).toBeInTheDocument();
    expect(screen.getByText("Hidden identity")).toBeInTheDocument();
  });
});

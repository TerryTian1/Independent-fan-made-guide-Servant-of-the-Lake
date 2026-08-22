import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";

describe("home page", () => {
  it("introduces the game and links to the three main guide paths", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Servant of the Lake" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Start the walkthrough" })).toHaveAttribute(
      "href",
      "/walkthrough",
    );
    expect(screen.getByRole("link", { name: "Browse puzzle solutions" })).toHaveAttribute(
      "href",
      "/puzzles",
    );
    expect(screen.getByRole("link", { name: "Track all achievements" })).toHaveAttribute(
      "href",
      "/achievements",
    );
  });

  it("shows the four approved start-here cards", () => {
    render(<Home />);
    expect(screen.getAllByTestId("start-card")).toHaveLength(4);
  });
});

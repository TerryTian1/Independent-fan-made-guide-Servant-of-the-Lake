import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AchievementChecklist, PuzzleList, TaskList } from "@/components/content-lists";
import { DAY_1_TASKS, MISSABLE_ACHIEVEMENTS, PUZZLES } from "@/content/guide-content";

describe("guide content lists", () => {
  it("renders every task and its missable warning", () => {
    render(<TaskList tasks={DAY_1_TASKS} />);
    expect(screen.getAllByTestId("task-card")).toHaveLength(9);
    expect(screen.getByText(/Petting the Horse/)).toBeInTheDocument();
  });

  it("renders five puzzle answer blocks", () => {
    render(<PuzzleList puzzles={PUZZLES} />);
    expect(screen.getAllByTestId("puzzle-box")).toHaveLength(5);
    expect(screen.getAllByText("Show full solution")).toHaveLength(5);
  });

  it("renders grouped achievement checklists", () => {
    render(<AchievementChecklist title="Day 1" items={MISSABLE_ACHIEVEMENTS.day1} />);
    expect(screen.getAllByRole("listitem")).toHaveLength(9);
  });
});

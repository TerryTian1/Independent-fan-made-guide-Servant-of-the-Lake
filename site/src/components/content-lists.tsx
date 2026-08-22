import { HintSteps } from "@/components/reveal-blocks";
import type { Puzzle, Task } from "@/content/guide-content";

export function TaskList({ tasks }: { tasks: readonly Task[] }) {
  return (
    <div className="task-list">
      {tasks.map((task, index) => (
        <div className="task-card" data-testid="task-card" key={task.title}>
          <span className="task-card__number">{String(index + 1).padStart(2, "0")}</span>
          <div>
            <h3>{task.title}</h3>
            <p><strong>{task.time}</strong> · {task.summary}</p>
            {task.missable && <p className="callout"><strong>Missable:</strong> {task.missable}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}

export function PuzzleList({ puzzles }: { puzzles: readonly Puzzle[] }) {
  return (
    <div className="puzzle-grid">
      {puzzles.map((puzzle) => (
        <section className="puzzle-box" data-testid="puzzle-box" id={puzzle.id} key={puzzle.id}>
          <p className="eyebrow">{puzzle.chapter}</p>
          <h3>{puzzle.title}</h3>
          <p>{puzzle.intro}</p>
          <HintSteps hints={puzzle.hints} solution={<p>{puzzle.solution}</p>} />
        </section>
      ))}
    </div>
  );
}

export function AchievementChecklist({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <div>
      <h3>{title}</h3>
      <ul className="checklist">
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
}

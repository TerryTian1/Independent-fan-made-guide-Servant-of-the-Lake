import type { ReactNode } from "react";

export function HintSteps({
  hints,
  solution,
}: {
  hints: readonly string[];
  solution: ReactNode;
}) {
  return (
    <div className="reveal-stack">
      {hints.map((hint, index) => (
        <details className="reveal" key={hint}>
          <summary>Show hint {index + 1}</summary>
          <p>{hint}</p>
        </details>
      ))}
      <details className="reveal reveal--solution">
        <summary>Show full solution</summary>
        <div>{solution}</div>
      </details>
    </div>
  );
}

export function SpoilerBlock({ children }: { children: ReactNode }) {
  return (
    <details className="reveal reveal--spoiler">
      <summary>Reveal story spoiler</summary>
      <div>{children}</div>
    </details>
  );
}

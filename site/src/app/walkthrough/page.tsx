import type { Metadata } from "next";
import Link from "next/link";
import { GuidePage } from "@/components/guide-page";
import { TaskList } from "@/components/content-lists";
import { DAY_1_TASKS, DAY_2_TASKS, DAY_3_TASKS } from "@/content/guide-content";
import { getPage } from "@/content/site-data";

const page = getPage("walkthrough");
export const metadata: Metadata = { title: page.title, description: page.description, alternates: { canonical: page.path } };

export default function WalkthroughPage() {
  return (
    <GuidePage
      page={page}
      quickAnswer={<p>The full game spans <strong>three days and 24 official tasks</strong>: nine on Day 1, eight on Day 2, and seven on Day 3. Start with your current day; use the Puzzle page when you only need one answer.</p>}
      sections={[
        {
          id: "choose-your-day",
          title: "Choose your day",
          content: (
            <div className="related-grid">
              <Link href="/walkthrough/day-1/"><strong>Day 1</strong><span>Arrival, breakfast, reception, night watch, attic</span></Link>
              <Link href="/walkthrough/day-2/"><strong>Day 2</strong><span>Coffee, hunt, bathing, cellar</span></Link>
              <Link href="/walkthrough/day-3/"><strong>Day 3</strong><span>Alchemy, dinner, departure</span></Link>
            </div>
          ),
        },
        { id: "day-1", title: "Day 1 — 9 tasks", body: ["The first day teaches the room loop and contains five of the most searched puzzle sequences."], content: <TaskList tasks={DAY_1_TASKS} /> },
        { id: "day-2", title: "Day 2 — 8 tasks", body: ["The second day introduces coffee, hunting, washing, bathing, and the cellar."], content: <TaskList tasks={DAY_2_TASKS} /> },
        { id: "day-3", title: "Day 3 — 7 tasks", body: ["The final day covers the cat, alchemy, dinner preparations, and the main departure sequence."], content: <TaskList tasks={DAY_3_TASKS} /> },
        {
          id: "stuck",
          title: "I’m stuck",
          body: ["If you know the chapter and only need a direct answer, use the puzzle index. It hides full solutions behind a deliberate reveal."],
          bullets: ["Cup order", "Exercise directions", "Berry trap", "Flower combination", "Suitcase and hidden-box codes"],
        },
        {
          id: "versions",
          title: "Demo & Lite versions",
          body: ["The free preview covers only an early slice of Day 1. It is not the full three-day game and does not include the complete achievement route."],
          content: <p><Link className="button button--ghost" href="/walkthrough/versions/">Open Demo & Lite guide</Link></p>,
        },
      ]}
      related={[
        { href: "/puzzles/", label: "Puzzle solutions", description: "Reveal hints and exact answers" },
        { href: "/achievements/", label: "Achievement guide", description: "Track 49 achievements" },
        { href: "/secrets-endings/", label: "Secrets & endings", description: "Story help behind spoiler gates" },
      ]}
    />
  );
}

import type { Metadata } from "next";
import { GuidePage } from "@/components/guide-page";
import { TaskList } from "@/components/content-lists";
import { DAY_2_TASKS } from "@/content/guide-content";
import { getPage } from "@/content/site-data";

const page = getPage("day-2");
export const metadata: Metadata = { title: page.title, description: page.description, alternates: { canonical: page.path } };

export default function DayTwoPage() {
  return <GuidePage page={page} quickAnswer={<p>Day 2 contains <strong>eight tasks</strong>. The most common blockers are the perfect-hunt requirement, bathroom clues, briefcase code <strong>281</strong>, and the cellar mouse sequence.</p>} sections={[
    { id: "checklist", title: "Day 2 quick checklist", body: ["Finish each optional interaction before leaving its room. Several depend on temporary room states."], content: <TaskList tasks={DAY_2_TASKS} /> },
    { id: "briefcase", title: "Day 2 briefcase code", body: ["Use 281 for the Day 2 briefcase. Do not confuse it with the Day 1 suitcase code 374 or the final hidden-box code 6294."] },
    { id: "cellar", title: "Cellar reminder", body: ["Before entering the cellar, finish the balcony disposal interaction. In the cellar, use the magnet and key sequence before dealing with the mouse."] },
  ]} related={[
    { href: "/puzzles/#suitcase-codes", label: "All suitcase codes", description: "374, 281, and 6294 explained" },
    { href: "/achievements/", label: "Day 2 achievements", description: "Eight missable interactions" },
    { href: "/walkthrough/day-3/", label: "Continue to Day 3", description: "The final seven tasks" },
  ]} />;
}

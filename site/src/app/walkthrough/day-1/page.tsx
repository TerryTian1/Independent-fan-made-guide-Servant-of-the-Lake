import type { Metadata } from "next";
import { GuidePage } from "@/components/guide-page";
import { TaskList } from "@/components/content-lists";
import { DAY_1_TASKS } from "@/content/guide-content";
import { getPage } from "@/content/site-data";

const page = getPage("day-1");
export const metadata: Metadata = { title: page.title, description: page.description, alternates: { canonical: page.path } };

export default function DayOnePage() {
  return <GuidePage page={page} quickAnswer={<p>Day 1 contains <strong>nine tasks</strong>, beginning with The Arrival and ending in Searching the Attic. Complete each missable interaction before advancing its chapter.</p>} sections={[
    { id: "checklist", title: "Day 1 quick checklist", body: ["Work from top to bottom. Each task card includes the matching timestamp from the official walkthrough and its missable-achievement warning."], content: <TaskList tasks={DAY_1_TASKS} /> },
    { id: "puzzle-route", title: "Day 1 puzzle route", bullets: ["The Arrival: cup order and suitcase code 374", "Waking up Aldous: exercise directions and berry trap", "Welcoming the Guests: flower construction", "Searching the Attic: constellation work"] },
    { id: "before-day-2", title: "Before starting Day 2", body: ["Confirm that you completed Feeding the Cat and the other eight optional interactions. Chapter replay is available, but checking now reduces cleanup later."] },
  ]} related={[
    { href: "/puzzles/", label: "Day 1 puzzle answers", description: "Cups, exercise, berries, flowers, and 374" },
    { href: "/achievements/", label: "Day 1 achievements", description: "Nine missable interactions" },
    { href: "/walkthrough/day-2/", label: "Continue to Day 2", description: "Eight more tasks" },
  ]} />;
}

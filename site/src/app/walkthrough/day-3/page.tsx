import type { Metadata } from "next";
import { GuidePage } from "@/components/guide-page";
import { TaskList } from "@/components/content-lists";
import { SpoilerBlock } from "@/components/reveal-blocks";
import { DAY_3_TASKS } from "@/content/guide-content";
import { getPage } from "@/content/site-data";

const page = getPage("day-3");
export const metadata: Metadata = { title: page.title, description: page.description, alternates: { canonical: page.path } };

export default function DayThreePage() {
  return <GuidePage page={page} quickAnswer={<p>Day 3 contains <strong>seven tasks</strong>, from Looking for the Cat through The Departure. Finish the chandelier and first-aid interactions before allowing the final scenes to advance.</p>} sections={[
    { id: "checklist", title: "Day 3 quick checklist", body: ["The final day has one optional achievement per official task and several short-lived interaction windows."], content: <TaskList tasks={DAY_3_TASKS} /> },
    { id: "alchemy", title: "Alchemy and dinner", body: ["Check the parrot after producing the elixir, inspect furniture before the cat moves, and complete the soup, fish-pin, and chandelier interactions before serving dinner."] },
    { id: "ending", title: "The Departure", body: ["The normal ending follows the final service and departure sequence. The identity and larger timeline interpretation remain hidden below."], content: <SpoilerBlock><p>The ending reframes the servant’s role in the Vanderboom history and connects the three-day service to the wider Rusty Lake timeline. Use the dedicated Secrets & Endings page for the hidden-letter chain and interpretations.</p></SpoilerBlock> },
  ]} related={[
    { href: "/achievements/", label: "Day 3 achievements", description: "Seven missable interactions and the final chain" },
    { href: "/secrets-endings/", label: "Ending explained", description: "Spoiler-controlled story analysis" },
    { href: "/puzzles/#suitcase-codes", label: "Final hidden box", description: "Where code 6294 belongs" },
  ]} />;
}

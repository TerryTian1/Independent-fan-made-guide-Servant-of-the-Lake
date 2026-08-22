import type { Metadata } from "next";
import { PuzzleList } from "@/components/content-lists";
import { GuidePage } from "@/components/guide-page";
import { PUZZLES } from "@/content/guide-content";
import { getPage } from "@/content/site-data";

const page = getPage("puzzles");
export const metadata: Metadata = { title: page.title, description: page.description, alternates: { canonical: page.path } };

export default function PuzzlesPage() {
  return <GuidePage page={page} quickAnswer={<p>This page covers the five most searched blockers. Open <strong>Hint 1</strong>, then <strong>Hint 2</strong>, and reveal the exact solution only if you still need it.</p>} sections={[
    { id: "how-to-use", title: "How to use these answers", body: ["Each puzzle lists its chapter so you can return to the correct room. Suitcase code 374, briefcase code 281, and hidden-box code 6294 belong to different objects."] },
    { id: "all-puzzles", title: "All puzzle solutions", content: <PuzzleList puzzles={PUZZLES} /> },
  ]} related={[
    { href: "/walkthrough/day-1/", label: "Day 1 walkthrough", description: "Where four core puzzles appear" },
    { href: "/walkthrough/day-2/", label: "Day 2 walkthrough", description: "Briefcase and cellar help" },
    { href: "/achievements/", label: "Achievement guide", description: "Optional puzzle interactions" },
  ]} />;
}

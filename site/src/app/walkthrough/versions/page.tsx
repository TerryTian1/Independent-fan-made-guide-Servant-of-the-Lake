import type { Metadata } from "next";
import { GuidePage } from "@/components/guide-page";
import { HintSteps } from "@/components/reveal-blocks";
import { getPage } from "@/content/site-data";

const page = getPage("versions");
export const metadata: Metadata = { title: page.title, description: page.description, alternates: { canonical: page.path } };

export default function VersionsPage() {
  return <GuidePage page={page} quickAnswer={<p>The Demo and Lite releases are <strong>short previews</strong>, not the complete three-day game. Expect roughly 15–30 minutes depending on puzzle familiarity.</p>} sections={[
    { id: "differences", title: "Demo, Lite, and full game", bullets: ["Demo/Lite: early Day 1 preview and a limited puzzle set", "Full game: three days, 24 official tasks, 49 achievements, and the complete ending", "Do not assume preview progress transfers to every full-game platform"] },
    { id: "preview-route", title: "Preview walkthrough", bullets: ["Complete The Arrival and inspect every available room", "Prepare breakfast and use the milk interaction before advancing", "Wake Aldous and solve the exercise sequence", "Finish the cup and berry puzzles", "Follow the bird cue to close the preview"] },
    { id: "preview-puzzles", title: "Preview puzzle answers", content: <HintSteps hints={["The cup order follows stripe counts.", "The exercise uses six directional poses."]} solution={<p>Cups: 1 → 2 → 3 → 4 → 5. Exercise: Left → Right → Down → Right → Right → Down.</p>} /> },
  ]} related={[
    { href: "/walkthrough/day-1/", label: "Full Day 1 guide", description: "Continue beyond the preview" },
    { href: "/puzzles/", label: "All puzzle solutions", description: "Five focused answer sections" },
    { href: "/achievements/", label: "All achievements", description: "Full-game completion help" },
  ]} />;
}

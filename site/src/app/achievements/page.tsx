import type { Metadata } from "next";
import { AchievementChecklist } from "@/components/content-lists";
import { GuidePage } from "@/components/guide-page";
import { SpoilerBlock } from "@/components/reveal-blocks";
import { MISSABLE_ACHIEVEMENTS } from "@/content/guide-content";
import { getPage } from "@/content/site-data";

const page = getPage("achievements");
export const metadata: Metadata = { title: page.title, description: page.description, alternates: { canonical: page.path } };

export default function AchievementsPage() {
  return <GuidePage page={page} quickAnswer={<p>There are <strong>49 achievements</strong>: 24 tied to the official story tasks, 24 missable day interactions, and the cross-chapter <strong>You’ve Found Him!</strong> chain.</p>} sections={[
    { id: "overview", title: "How the 49 achievements work", body: ["Completing each of the 24 official tasks awards normal progress. The optional interactions below are easy to miss because most must happen before the room or character state changes."] },
    { id: "day-1", title: "Day 1 missable achievements", content: <AchievementChecklist title="9 optional interactions" items={MISSABLE_ACHIEVEMENTS.day1} /> },
    { id: "day-2", title: "Day 2 missable achievements", content: <AchievementChecklist title="8 optional interactions" items={MISSABLE_ACHIEVEMENTS.day2} /> },
    { id: "day-3", title: "Day 3 missable achievements", content: <AchievementChecklist title="7 optional interactions" items={MISSABLE_ACHIEVEMENTS.day3} /> },
    { id: "feeding-the-cat", title: "Feeding the Cat", body: ["During Day 1 → Preparing Breakfast, give the first fresh milk to the cat before using it in the breakfast recipe. Advancing the meal first closes the interaction window."] },
    { id: "locked-achievements", title: "Why achievements stay locked", bullets: ["Finish the matching story task for its automatic achievement", "Replay the exact chapter for a missed optional interaction", "Complete the hidden cross-chapter chain for the final achievement", "Check that the platform client is online before repeating a completed action"] },
    { id: "youve-found-him", title: "You’ve Found Him!", body: ["This is a cross-chapter replay chain, not a single-room pickup. The first clock clue currently conflicts between published sources, so the local guide does not present one time as universally correct."], content: <SpoilerBlock><ol><li>Read Kate’s post-game letter.</li><li>Return to Waking up Aldous and test the clock clue for your platform/version.</li><li>Use the bathroom tile clue, then follow maze sequence RRRLRLRRL.</li><li>Revisit alchemy, attic constellations, and the dinner cellar clues.</li><li>Use 6294 on the final hidden box and inspect the distant building with the telescope.</li></ol><p><strong>Version note:</strong> current guides disagree between 3:05 and 4:05 for the first clock. Verify against your current build.</p></SpoilerBlock> },
  ]} related={[
    { href: "/walkthrough/", label: "Complete walkthrough", description: "All 24 story tasks" },
    { href: "/puzzles/", label: "Puzzle solutions", description: "Codes and sequences" },
    { href: "/secrets-endings/", label: "Hidden story chain", description: "Letters, reveal, and ending" },
  ]} />;
}

import type { Metadata } from "next";
import { GuidePage } from "@/components/guide-page";
import { SpoilerBlock } from "@/components/reveal-blocks";
import { getPage } from "@/content/site-data";

const page = getPage("secrets-endings");
export const metadata: Metadata = { title: page.title, description: page.description, alternates: { canonical: page.path } };

export default function SecretsEndingsPage() {
  return <GuidePage page={page} quickAnswer={<p>Complete the three-day route for the normal ending. The commonly searched “secret ending” is better understood as a <strong>hidden achievement and extra story chain</strong>, not a wholly separate campaign.</p>} sections={[
    { id: "spoiler-policy", title: "Before you read", body: ["This page separates events directly shown in the game from community interpretation. Major identity, letter, and final-box details remain behind spoiler controls."] },
    { id: "normal-ending", title: "Normal ending", body: ["The main ending triggers after completing The Departure on Day 3. It resolves the servant’s immediate three-day assignment while deliberately leaving the wider Rusty Lake timeline open to interpretation."], content: <SpoilerBlock><p>The final sequence reframes the servant’s place in the Vanderboom family history and ties ordinary domestic work to the estate’s alchemical experiments.</p></SpoilerBlock> },
    { id: "hidden-reveal", title: "Hidden reveal", body: ["After the main route, a chain of letters sends you back through multiple chapters. It leads to the final hidden box, telescope, and You’ve Found Him! achievement."], content: <SpoilerBlock><p>Follow the letters across Aldous’ clock, the bathroom tiles, maze sequence <strong>RRRLRLRRL</strong>, the alchemy box, attic constellations, and the dinner cellar. Open the last box with <strong>6294</strong>, then use the telescope at the window.</p></SpoilerBlock> },
    { id: "secret-letters", title: "Secret letters", body: ["Treat every letter as both a narrative fragment and a route instruction. Photograph or write down symbols before leaving a chapter; later steps reuse structures, directions, moon imagery, water imagery, and bottle positions."] },
    { id: "mr-owl", title: "Mr. Owl Easter egg", body: ["Mr. Owl references and distant-building imagery connect this story to the larger Rusty Lake world. The page labels those appearances as confirmed visual references while keeping exact chronology in the interpretation section."] },
    { id: "theories", title: "Confirmed facts vs. community theories", bullets: ["Confirmed: the three-day task structure, letters, direction sequence, 6294 box, telescope, and hidden achievement", "Version-conflicted: the first hidden clock time, currently reported as 3:05 or 4:05", "Interpretation: the precise wider timeline placement and every character’s long-term motive"] },
  ]} related={[
    { href: "/walkthrough/day-3/", label: "Day 3 walkthrough", description: "Finish the normal route" },
    { href: "/achievements/#youve-found-him", label: "You’ve Found Him!", description: "Achievement-focused instructions" },
    { href: "/puzzles/#suitcase-codes", label: "Hidden box code", description: "Keep 6294 separate from the suitcases" },
  ]} />;
}

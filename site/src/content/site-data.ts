export type PageKey =
  | "home"
  | "walkthrough"
  | "day-1"
  | "day-2"
  | "day-3"
  | "versions"
  | "achievements"
  | "puzzles"
  | "secrets-endings";

export type CorePage = {
  key: PageKey;
  path: string;
  title: string;
  description: string;
  eyebrow: string;
  heading: string;
  keywords: readonly string[];
};

export const TOP_NAV = [
  { label: "Home", href: "/" },
  { label: "Walkthrough", href: "/walkthrough/" },
  { label: "Achievements", href: "/achievements/" },
  { label: "Puzzles", href: "/puzzles/" },
  { label: "Secrets & Endings", href: "/secrets-endings/" },
] as const;

export const CORE_PAGES: readonly CorePage[] = [
  {
    key: "home",
    path: "/",
    title: "Servant of the Lake Wiki — Walkthrough & Achievements",
    description:
      "Explore the Servant of the Lake wiki for a complete walkthrough, puzzle solutions, 49 achievements, hidden secrets, endings, and spoiler-aware help.",
    eyebrow: "Independent fan-made guide",
    heading: "Servant of the Lake",
    keywords: [],
  },
  {
    key: "walkthrough",
    path: "/walkthrough/",
    title: "Servant of the Lake Walkthrough Guide — All 3 Days",
    description:
      "Follow the complete Servant of the Lake walkthrough for Day 1, Day 2, and Day 3, with spoiler-light hints, task checklists, puzzles, and video times.",
    eyebrow: "Complete route",
    heading: "Servant of the Lake Walkthrough",
    keywords: ["servant of the lake walkthrough", "servant of the lake hint"],
  },
  {
    key: "day-1",
    path: "/walkthrough/day-1/",
    title: "Servant of the Lake Day 1 Walkthrough & Puzzles",
    description:
      "Complete all nine Day 1 tasks in Servant of the Lake, from The Arrival to Searching the Attic, with puzzle answers and missable achievement warnings.",
    eyebrow: "Walkthrough · Day 1",
    heading: "Day 1 Walkthrough",
    keywords: ["servant of the lake day 1"],
  },
  {
    key: "day-2",
    path: "/walkthrough/day-2/",
    title: "Servant of the Lake Day 2 Walkthrough & Puzzles",
    description:
      "Complete all eight Day 2 tasks in Servant of the Lake, including coffee, hunting, bathing, the cellar, suitcase code, and hidden achievements.",
    eyebrow: "Walkthrough · Day 2",
    heading: "Day 2 Walkthrough",
    keywords: ["servant of the lake day 2"],
  },
  {
    key: "day-3",
    path: "/walkthrough/day-3/",
    title: "Servant of the Lake Day 3 Walkthrough & Ending",
    description:
      "Finish all seven Day 3 tasks in Servant of the Lake, solve the alchemy and dinner puzzles, find missable achievements, and reach The Departure.",
    eyebrow: "Walkthrough · Day 3",
    heading: "Day 3 Walkthrough",
    keywords: ["servant of the lake day 3"],
  },
  {
    key: "versions",
    path: "/walkthrough/versions/",
    title: "Servant of the Lake Demo & Lite Walkthrough Guide",
    description:
      "Finish the free Servant of the Lake Demo and Lite preview with solutions for the cup, breakfast, berry, and exercise puzzles, plus version differences.",
    eyebrow: "Version guide",
    heading: "Demo & Lite Walkthrough",
    keywords: [
      "servant of the lake lite walkthrough",
      "servant of the lake demo walkthrough",
    ],
  },
  {
    key: "achievements",
    path: "/achievements/",
    title: "Servant of the Lake Achievements — Complete Guide",
    description:
      "Unlock all 49 Servant of the Lake achievements with day-by-day missable checklists, Feeding the Cat help, locked achievement fixes, and secret clues.",
    eyebrow: "Completion guide",
    heading: "All 49 Achievements",
    keywords: [
      "servant of the lake achievements",
      "servant of the lake locked achievements",
      "servant of the lake you found him achievement",
      "servant of the lake feeding the cat achievement",
    ],
  },
  {
    key: "puzzles",
    path: "/puzzles/",
    title: "Servant of the Lake Puzzle Solutions, Hints & Codes",
    description:
      "Solve the Servant of the Lake cup, exercise, berry, flowers, and suitcase puzzles with spoiler-light hints, full answers, and the correct codes.",
    eyebrow: "Spoiler-light answers",
    heading: "Puzzle Solutions & Codes",
    keywords: [
      "servant of the lake flowers",
      "servant of the lake cup puzzle",
      "servant of the lake exercise puzzle",
      "servant of the lake berry puzzle",
      "servant of the lake suitcase code",
    ],
  },
  {
    key: "secrets-endings",
    path: "/secrets-endings/",
    title: "Servant of the Lake Endings, Secrets & Easter Eggs",
    description:
      "Understand the Servant of the Lake ending, unlock the hidden reveal, follow every secret letter, and find the Mr. Owl Easter egg with spoiler controls.",
    eyebrow: "Story archive",
    heading: "Secrets & Endings",
    keywords: [
      "servant of the lake secret ending",
      "servant of the lake endings",
      "servant of the lake secrets",
    ],
  },
] as const;

export function getPage(key: PageKey) {
  const page = CORE_PAGES.find((item) => item.key === key);
  if (!page) throw new Error(`Unknown page: ${key}`);
  return page;
}

export function getKeywordAssignments() {
  return CORE_PAGES.flatMap((page) => [...page.keywords]);
}

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

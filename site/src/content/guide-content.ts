export type Task = {
  time: string;
  title: string;
  summary: string;
  missable?: string;
};

export const DAY_1_TASKS: readonly Task[] = [
  { time: "00:00", title: "The Arrival", summary: "Enter the estate, meet the household, collect the first tools, and learn the room-to-room interaction loop.", missable: "Petting the Horse — interact near the horse’s eye repeatedly before feeding it the carrot." },
  { time: "04:11", title: "Preparing Breakfast", summary: "Milk the cow, use the kitchen equipment, and prepare the first meal in the correct order.", missable: "Feeding the Cat — give the fresh milk to the cat before using it in breakfast." },
  { time: "05:34", title: "Waking up Aldous", summary: "Wake Aldous and copy the exercise poses before continuing the morning routine.", missable: "Exercising with Mr. Aldous — intentionally make a pose wrong, then correct him." },
  { time: "09:46", title: "Preparing the Reception", summary: "Clean the servant room, repair the environment, and gather what the family reception needs.", missable: "Small Repairs — keep cleaning the small portrait until it falls, then repair it." },
  { time: "12:23", title: "Welcoming the Guests", summary: "Receive the family, arrange the flowers, and finish the goat-milk sequence.", missable: "Ruining the Bouquet — feed the bouquet to the goat before giving the remains to Alexandra." },
  { time: "16:42", title: "Serving Tea", summary: "Prepare the requested drinks and complete the tea-table interactions.", missable: "Serving Matcha Latte — obtain the green powder from the cat interaction and add it to the tea." },
  { time: "18:45", title: "Opening the Reunion", summary: "Prepare the room, handle the guests’ requests, and advance the family gathering.", missable: "Soothing the Baby — give baby James champagne before advancing the other event." },
  { time: "26:19", title: "The Night Watch", summary: "Patrol the dark estate, track changes between rooms, and respond to the night event.", missable: "Checking for Intruders — inspect the window repeatedly until the masked figure appears." },
  { time: "29:15", title: "Searching the Attic", summary: "Explore the attic, complete the constellation work, and close the first day.", missable: "Chase Away the Crow — interact with the crow at the window during the constellation puzzle." },
];

export const DAY_2_TASKS: readonly Task[] = [
  { time: "33:08", title: "Preparing Coffee", summary: "Roast, grind, and brew the beans before serving the morning coffee.", missable: "Serving Mr. Aldous His Favorite Coffee — roast the beans on the stove before grinding them." },
  { time: "35:56", title: "Waking up William", summary: "Use the feather and room clues to wake William and prepare him for the day.", missable: "Tickling Mr. William — use the feather on William again after obtaining it." },
  { time: "41:28", title: "Cleaning the Floors", summary: "Remove the stains and reveal the faint family pattern while cleaning.", missable: "Deep Cleaning — polish the faint Vanderboom pattern in the upper-left area." },
  { time: "43:23", title: "Going Hunting", summary: "Follow the hunting instructions carefully and avoid missing the required targets.", missable: "A Perfect Hunt — hit every designated target without a miss." },
  { time: "47:40", title: "Doing the Washing", summary: "Sort and clean the laundry while watching for changes outside the room.", missable: "Cleaning the Windows — clear every fogged pane, then inspect the figure outside." },
  { time: "49:44", title: "Helping with Bathing", summary: "Prepare the bath, inspect the wall clues, and use the briefcase code 281 when needed.", missable: "Close Inspections — look through the bathroom keyhole to see the masked figure." },
  { time: "54:24", title: "Night Time Duties", summary: "Finish the balcony work and dispose of the remaining animal parts before going below.", missable: "Garbage Disposal — throw the animal parts from the balcony before entering the cellar." },
  { time: "55:44", title: "Inspecting the Cellar", summary: "Search the cellar, use the magnet, and complete the wall-hole sequence.", missable: "Pest Control — use the magnet and key, then deal with the mouse using the hammer." },
];

export const DAY_3_TASKS: readonly Task[] = [
  { time: "1:00:11", title: "Looking for the Cat", summary: "Search the estate, return the cat, and complete the final morning interaction.", missable: "Petting the Cat — keep petting the cat while it sits with the servant until it jumps away." },
  { time: "1:03:07", title: "Assisting in Alchemy", summary: "Gather ingredients, operate the laboratory, and finish the elixir sequence.", missable: "Animal Testing — pour the finished elixir into the parrot’s bowl." },
  { time: "1:10:19", title: "Unforeseen Maintenance", summary: "Repair the affected area and inspect nearby furniture before the room state changes.", missable: "Checking the Furniture — open the table-leg compartment while the cat is still nearby." },
  { time: "1:12:37", title: "Preparing Dinner", summary: "Gather ingredients, prepare the soup, and handle the fly interaction.", missable: "Seasoning the Soup — use the knife to obtain the fly and add it to the soup." },
  { time: "1:19:49", title: "Dressing up for Dinner", summary: "Prepare William, inspect the house painting, and complete the clothing sequence.", missable: "Finishing Touch — take the fish pin from the painting and attach it to William." },
  { time: "1:24:44", title: "Serving Dinner", summary: "Set the table, serve each course, and watch the chandelier before advancing.", missable: "Safety Test — inspect the chandelier rope repeatedly at the start of the task." },
  { time: "1:31:57", title: "The Departure", summary: "Complete the last service, handle Aldous’ injury, and leave the estate.", missable: "First Aid — use the fork to remove the object from Aldous’ leg and treat the wound." },
];

export const MISSABLE_ACHIEVEMENTS = {
  day1: DAY_1_TASKS.map((task) => task.missable as string),
  day2: DAY_2_TASKS.map((task) => task.missable as string),
  day3: DAY_3_TASKS.map((task) => task.missable as string),
} as const;

export type Puzzle = {
  id: string;
  title: string;
  chapter: string;
  intro: string;
  hints: readonly string[];
  solution: string;
};

export const PUZZLES: readonly Puzzle[] = [
  {
    id: "cup-puzzle",
    title: "Cup Puzzle",
    chapter: "Day 1 · The Arrival",
    intro: "Five cups show different stripe counts. The markings define their order.",
    hints: ["Count the visible stripes on every cup.", "Place the cups from the smallest count to the largest."],
    solution: "Arrange the cups in stripe-count order: 1 → 2 → 3 → 4 → 5.",
  },
  {
    id: "exercise-puzzle",
    title: "Exercise Puzzle",
    chapter: "Day 1 · Waking up Aldous",
    intro: "Move Aldous through the pose sequence shown by the directional clues.",
    hints: ["Read each pose as a direction.", "The sequence contains six moves and repeats Right."],
    solution: "Use: Left → Right → Down → Right → Right → Down.",
  },
  {
    id: "berry-puzzle",
    title: "Berry Puzzle",
    chapter: "Day 1 · Waking up Aldous",
    intro: "The bug moves between holes while you try to trap it.",
    hints: ["Watch which hole the bug enters.", "Block its exit rather than chasing its current position."],
    solution: "Cover the hole the bug enters and keep narrowing its exits until it is trapped.",
  },
  {
    id: "flowers-puzzle",
    title: "Flowers Puzzle",
    chapter: "Day 1 · Welcoming the Guests",
    intro: "Build the final flower by combining compatible neighboring base elements upward.",
    hints: ["Start with adjacent elements on the bottom row.", "Each correct merge creates the ingredient for the row above."],
    solution: "Combine adjacent base elements upward until the top flower contains all four required parts.",
  },
  {
    id: "suitcase-codes",
    title: "Suitcase & Hidden Box Codes",
    chapter: "Days 1–3",
    intro: "Three similar containers use different codes. Match the code to the chapter and object.",
    hints: ["Day 1 and Day 2 suitcases do not share a code.", "The four-digit code belongs to the final hidden box."],
    solution: "Day 1 suitcase: 374. Day 2 briefcase: 281. Final hidden box: 6294.",
  },
];

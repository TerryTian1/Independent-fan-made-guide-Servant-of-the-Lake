import type { Metadata } from "next";
import Link from "next/link";
import { getPage } from "@/content/site-data";

const page = getPage("home");

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: "/" },
};

const startCards = [
  {
    number: "01",
    title: "Beginner Guide",
    description:
      "Learn the inventory, room interactions, saving behavior, and spoiler-light basics before your first shift.",
    href: "/walkthrough/",
  },
  {
    number: "02",
    title: "Day 1 Walkthrough",
    description:
      "Complete the arrival, breakfast, chores, Aldous sequence, reception, night watch, and attic.",
    href: "/walkthrough/day-1/",
  },
  {
    number: "03",
    title: "Puzzle Solutions",
    description:
      "Reveal hints before answers for the cups, exercise, berries, flowers, suitcases, and hidden box.",
    href: "/puzzles/",
  },
  {
    number: "04",
    title: "Achievement Guide",
    description:
      "Track all 49 achievements, including 24 story unlocks, missable interactions, and the final chain.",
    href: "/achievements/",
  },
] as const;

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="container hero__grid">
          <div>
            <p className="eyebrow">Independent fan-made guide</p>
            <h1>Servant of the Lake</h1>
            <p className="hero__lede">
              Take a job inside the Vanderboom estate and survive three unsettling days of
              chores, surreal puzzles, and alchemical secrets. Use spoiler-aware help whenever
              the house stops making sense.
            </p>
            <div className="button-row">
              <Link className="button button--primary" href="/walkthrough/">
                Start the walkthrough
              </Link>
              <Link className="button button--ghost" href="/puzzles/">
                Browse puzzle solutions
              </Link>
              <Link className="button button--text" href="/achievements/">
                Track all achievements
              </Link>
            </div>
            <ul className="stat-row" aria-label="Game facts">
              <li><strong>Aug 13, 2026</strong><span>Release date</span></li>
              <li><strong>3 days</strong><span>Main story</span></li>
              <li><strong>24 tasks</strong><span>Official chapters</span></li>
              <li><strong>49</strong><span>Achievements</span></li>
            </ul>
          </div>
          <div className="hero-art" aria-label="A stylized lake and manor illustration">
            <span className="hero-art__moon" />
            <span className="hero-art__house">V</span>
            <span className="hero-art__lake" />
            <p>THE VANDERBOOM ESTATE</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="eyebrow">Start here</p>
          <div className="section-heading">
            <h2>Your first route through the estate</h2>
            <p>Choose the kind of help you need. The main story remains hidden until you open it.</p>
          </div>
          <div className="card-grid card-grid--four">
            {startCards.map((card) => (
              <Link className="guide-card" data-testid="start-card" href={card.href} key={card.title}>
                <span className="guide-card__number">{card.number}</span>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <span className="guide-card__link">Open guide →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--panel">
        <div className="container split">
          <div>
            <p className="eyebrow">About the game</p>
            <h2>What is Servant of the Lake?</h2>
            <p>
              Servant of the Lake is a premium single-player point-and-click puzzle adventure
              developed by Rusty Lake. You work inside the Vanderboom estate, completing daily
              chores that gradually turn into surreal and unsettling challenges.
            </p>
            <p>
              Set decades before Rusty Lake: Roots, it combines room exploration, observation
              puzzles, hidden achievements, dark humor, and alchemical experiments across a
              three-day stay.
            </p>
          </div>
          <dl className="fact-list">
            <div><dt>Developer</dt><dd>Rusty Lake</dd></div>
            <div><dt>Platforms</dt><dd>Steam, itch.io, iOS, Android</dd></div>
            <div><dt>Genre</dt><dd>Point-and-click puzzle adventure</dd></div>
            <div><dt>Languages</dt><dd>23 supported</dd></div>
          </dl>
        </div>
      </section>

      <section className="final-cta">
        <div className="container final-cta__inner">
          <div>
            <p className="eyebrow">Your shift starts now</p>
            <h2>Ready to serve the Vanderbooms?</h2>
            <p>Follow the full route, or jump straight to the puzzle blocking your progress.</p>
          </div>
          <Link className="button button--primary" href="/walkthrough/">
            Read the complete guide
          </Link>
        </div>
      </section>
    </main>
  );
}

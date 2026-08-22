import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div>
          <p className="site-footer__title">Servant of the Lake Guide</p>
          <p>
            An independent fan-made guide covering walkthroughs, puzzles, achievements, secrets,
            and endings. Not affiliated with or endorsed by Rusty Lake.
          </p>
        </div>
        <div>
          <p className="site-footer__title">Explore</p>
          <Link href="/walkthrough/">Walkthrough</Link>
          <Link href="/achievements/">Achievements</Link>
          <Link href="/puzzles/">Puzzles</Link>
        </div>
        <div>
          <p className="site-footer__title">Official</p>
          <a href="https://store.steampowered.com/" rel="noreferrer" target="_blank">Play on Steam</a>
          <a href="https://www.youtube.com/@RustyLake" rel="noreferrer" target="_blank">Rusty Lake YouTube</a>
        </div>
      </div>
      <div className="container site-footer__bottom">
        <span>© 2026 Independent fan guide</span>
        <span>Built for clear, spoiler-aware help.</span>
      </div>
    </footer>
  );
}

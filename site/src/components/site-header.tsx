import Link from "next/link";
import { TOP_NAV } from "@/content/site-data";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="brand" href="/" aria-label="Servant of the Lake Guide home">
          <span className="brand__mark" aria-hidden="true">S</span>
          <span>Servant of the Lake Guide</span>
        </Link>
        <nav className="primary-nav" aria-label="Primary">
          {TOP_NAV.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

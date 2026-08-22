import Link from "next/link";
import type { ReactNode } from "react";
import type { CorePage } from "@/content/site-data";

export type GuideSection = {
  id: string;
  title: string;
  body?: readonly string[];
  bullets?: readonly string[];
  content?: ReactNode;
};

export function GuidePage({
  page,
  quickAnswer,
  sections,
  related,
}: {
  page: CorePage;
  quickAnswer: ReactNode;
  sections: readonly GuideSection[];
  related: readonly { href: string; label: string; description?: string }[];
}) {
  return (
    <main className="guide-main">
      <div className="container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span>{page.heading}</span>
        </nav>

        <header className="guide-hero">
          <p className="eyebrow">{page.eyebrow}</p>
          <h1>{page.heading}</h1>
          <p>{page.description}</p>
          <div className="guide-meta">
            <span>Updated Aug 22, 2026</span>
            <span>{sections.length} sections</span>
            <span>Spoiler-aware</span>
          </div>
        </header>

        <div className="quick-answer">
          <p className="quick-answer__label">Quick answer</p>
          <div>{quickAnswer}</div>
        </div>

        <div className="guide-layout">
          <aside className="toc" aria-label="On this page">
            <p>On this page</p>
            {sections.map((section) => (
              <a href={`#${section.id}`} key={section.id}>{section.title}</a>
            ))}
          </aside>

          <article className="guide-content">
            {sections.map((section) => (
              <section id={section.id} key={section.id}>
                <h2>{section.title}</h2>
                {section.body?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.bullets && (
                  <ul>
                    {section.bullets.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                )}
                {section.content}
              </section>
            ))}
          </article>
        </div>

        <section className="related-guides" aria-labelledby="related-title">
          <p className="eyebrow">Continue exploring</p>
          <h2 id="related-title">Related guides</h2>
          <div className="related-grid">
            {related.map((item) => (
              <Link href={item.href} key={item.href}>
                <strong>{item.label}</strong>
                {item.description && <span>{item.description}</span>}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

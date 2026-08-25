import type { Metadata } from "next";
import { SiteAnalytics } from "@/components/site-analytics";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SITE_URL } from "@/content/site-data";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Servant of the Lake Guide",
    template: "%s",
  },
  description:
    "A spoiler-aware fan-made guide to Servant of the Lake walkthroughs, puzzles, achievements, secrets, and endings.",
  applicationName: "Servant of the Lake Guide",
  openGraph: {
    type: "website",
    siteName: "Servant of the Lake Guide",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteHeader />
        <div id="main-content">{children}</div>
        <SiteFooter />
      </body>
      <SiteAnalytics measurementId={process.env.NEXT_PUBLIC_GA_ID} />
    </html>
  );
}

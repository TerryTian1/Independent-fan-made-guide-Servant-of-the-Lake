import type { MetadataRoute } from "next";
import { CORE_PAGES, SITE_URL } from "@/content/site-data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return CORE_PAGES.map((page) => ({
    url: new URL(page.path, SITE_URL).toString(),
    lastModified: "2026-08-22",
    changeFrequency: page.key === "home" ? "weekly" : "monthly",
    priority: page.key === "home" ? 1 : page.key === "walkthrough" ? 0.9 : 0.8,
  }));
}

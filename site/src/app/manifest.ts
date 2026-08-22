import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Servant of the Lake Guide",
    short_name: "Lake Guide",
    description: "Spoiler-aware walkthroughs, puzzles, achievements, secrets, and endings.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0f0e",
    theme_color: "#31c47b",
    icons: [
      { src: "/favicon/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { src: "/favicon/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}

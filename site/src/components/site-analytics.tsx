import { GoogleAnalytics } from "@next/third-parties/google";

type SiteAnalyticsProps = {
  measurementId?: string;
};

export function SiteAnalytics({ measurementId }: SiteAnalyticsProps) {
  return measurementId ? <GoogleAnalytics gaId={measurementId} /> : null;
}

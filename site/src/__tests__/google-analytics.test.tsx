import { Children, isValidElement, type ReactNode } from "react";
import { describe, expect, it } from "vitest";
import RootLayout from "@/app/layout";
import { SiteAnalytics } from "@/components/site-analytics";

function findSiteAnalytics(node: ReactNode): React.ReactElement | null {
  for (const child of Children.toArray(node)) {
    if (!isValidElement(child)) continue;
    if (child.type === SiteAnalytics) return child;

    const nested = findSiteAnalytics(
      (child.props as { children?: ReactNode }).children,
    );
    if (nested) return nested;
  }

  return null;
}

describe("SiteAnalytics", () => {
  it("renders nothing when no Google Analytics measurement ID is configured", () => {
    expect(SiteAnalytics({})).toBeNull();
  });

  it("loads Google Analytics with the configured measurement ID", () => {
    const analytics = SiteAnalytics({ measurementId: "G-VCX6KHCMFP" });

    expect(analytics).toMatchObject({
      props: { gaId: "G-VCX6KHCMFP" },
    });
  });

  it("passes the configured environment value from the root layout", () => {
    const previousMeasurementId = process.env.NEXT_PUBLIC_GA_ID;
    process.env.NEXT_PUBLIC_GA_ID = "G-VCX6KHCMFP";

    try {
      const layout = RootLayout({
        children: <main />,
        params: Promise.resolve({}),
      });
      const analytics = findSiteAnalytics(layout);

      expect(analytics).toMatchObject({
        props: { measurementId: "G-VCX6KHCMFP" },
      });
    } finally {
      if (previousMeasurementId === undefined) {
        delete process.env.NEXT_PUBLIC_GA_ID;
      } else {
        process.env.NEXT_PUBLIC_GA_ID = previousMeasurementId;
      }
    }
  });
});

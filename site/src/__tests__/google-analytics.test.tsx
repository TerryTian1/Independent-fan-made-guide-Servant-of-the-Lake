import { Children, isValidElement, type ReactNode } from "react";
import { describe, expect, it } from "vitest";
import RootLayout from "@/app/layout";
import { SiteAnalytics } from "@/components/site-analytics";

function findSiteAnalytics(node: ReactNode): React.ReactElement[] {
  const matches: React.ReactElement[] = [];

  for (const child of Children.toArray(node)) {
    if (!isValidElement(child)) continue;
    if (child.type === SiteAnalytics) matches.push(child);

    matches.push(
      ...findSiteAnalytics(
        (child.props as { children?: ReactNode }).children,
      ),
    );
  }

  return matches;
}

function withMeasurementId<T>(
  measurementId: string | undefined,
  run: () => T,
) {
  const previousMeasurementId = process.env.NEXT_PUBLIC_GA_ID;

  if (measurementId === undefined) {
    delete process.env.NEXT_PUBLIC_GA_ID;
  } else {
    process.env.NEXT_PUBLIC_GA_ID = measurementId;
  }

  try {
    return run();
  } finally {
    if (previousMeasurementId === undefined) {
      delete process.env.NEXT_PUBLIC_GA_ID;
    } else {
      process.env.NEXT_PUBLIC_GA_ID = previousMeasurementId;
    }
  }
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
    withMeasurementId("G-VCX6KHCMFP", () => {
      const layout = RootLayout({
        children: <main />,
        params: Promise.resolve({}),
      });
      const analytics = findSiteAnalytics(layout);

      expect(analytics).toHaveLength(1);
      expect(analytics[0]).toMatchObject({
        props: { measurementId: "G-VCX6KHCMFP" },
      });
    });
  });

  it("keeps analytics disabled from the root layout when the ID is unset", () => {
    withMeasurementId(undefined, () => {
      const layout = RootLayout({
        children: <main />,
        params: Promise.resolve({}),
      });
      const analytics = findSiteAnalytics(layout);

      expect(analytics).toHaveLength(1);
      expect(
        SiteAnalytics(analytics[0].props as { measurementId?: string }),
      ).toBeNull();
    });
  });
});

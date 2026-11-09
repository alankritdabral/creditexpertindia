import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/config";

export const alt = `${siteConfig.name} — Debt Consolidation & Personal Loans`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The site-wide default share image — replaces the previous default (a
 * 662 KB PNG of the full logo wordmark, forced onto every page's metadata
 * via lib/seo.ts's buildMetadata) with something generated at build time,
 * much smaller, and consistent with the brand colour used everywhere else
 * on the site. Any route with its own opengraph-image.tsx (the
 * learning-center articles) gets that one instead — see buildMetadata's own
 * comment for why no page sets an explicit `images` any more.
 */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#0052CC",
          backgroundImage: "linear-gradient(135deg, #0052CC 0%, #0A2540 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 72,
            height: 72,
            borderRadius: 16,
            backgroundColor: "#ffffff",
            fontSize: 36,
            fontWeight: 700,
            color: "#0052CC",
          }}
        >
          CE
        </div>
        <div style={{ display: "flex", marginTop: 48, fontSize: 56, fontWeight: 700, color: "#ffffff", lineHeight: 1.15, maxWidth: 1000 }}>
          Debt Consolidation & Personal Loans for Salaried Professionals
        </div>
        <div style={{ display: "flex", marginTop: 32, fontSize: 28, color: "#BFDBFE" }}>
          {siteConfig.name}
        </div>
      </div>
    ),
    { ...size }
  );
}

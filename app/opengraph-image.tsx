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
          backgroundColor: "#FF5A00",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 96,
            height: 96,
            borderRadius: 20,
            backgroundColor: "#2E2E2E",
          }}
        >
          <svg width="64" height="40" viewBox="56 36 734 458" fill="none">
            <path
              d="M262 378 C215 455 116 462 98 376 C90 304 155 260 228 262 C335 280 450 425 644 437 C752 442 756 345 711 267 C676 199 627 66 543 77 C488 86 452 145 386 238"
              stroke="#FF5A00"
              strokeWidth="64"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div style={{ display: "flex", marginTop: 48, fontSize: 64, fontWeight: 700, color: "#ffffff", lineHeight: 1.15, maxWidth: 1000 }}>
          Debt Consolidation & Personal Loans for Salaried Professionals
        </div>
        <div style={{ display: "flex", marginTop: 32, fontSize: 32, fontWeight: 700, color: "#2E2E2E" }}>
          {siteConfig.name}
        </div>
      </div>
    ),
    { ...size }
  );
}

import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/config";
import { articles } from "@/content/articles";

// A single static `alt` (not per-article): Next's per-image dynamic alt
// text needs generateImageMetadata, which is for generating several images
// from ONE file — overkill for the one image per slug this route already
// produces naturally through the [slug] segment itself.
export const alt = `${siteConfig.name} — Learning Center article`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  const title = article?.title ?? siteConfig.name;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          backgroundColor: "#0052CC",
          backgroundImage: "linear-gradient(135deg, #0052CC 0%, #0A2540 100%)",
        }}
      >
        <div style={{ display: "flex", fontSize: 24, fontWeight: 600, color: "#BFDBFE" }}>
          {siteConfig.name} — Learning Center
        </div>
        <div style={{ display: "flex", fontSize: 54, fontWeight: 700, color: "#ffffff", lineHeight: 1.15, maxWidth: 1000 }}>
          {title}
        </div>
      </div>
    ),
    { ...size }
  );
}

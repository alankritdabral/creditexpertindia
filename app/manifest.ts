import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} — Debt Consolidation & Personal Loans`,
    short_name: siteConfig.name,
    description: "Explore debt consolidation, balance transfer and personal loan options for salaried professionals in India.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0052CC",
    // Static copies under public/ — app/icon.png and app/apple-icon.png are
    // Next's own file-convention icons (auto-served at a generated, hashed
    // path for <link rel="icon">), not guaranteed to be reachable at a
    // stable literal URL a manifest can reference.
    icons: [
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon-180.png", sizes: "180x180", type: "image/png" },
    ],
  };
}

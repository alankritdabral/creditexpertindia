import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";

// The previous default share image (a 662 KB PNG of the full logo wordmark,
// forced onto every page's metadata) is gone. app/opengraph-image.tsx is
// the new, much smaller, generated default.
//
// Every page here sets an explicit `images` field, built from `image` below
// or defaulting to that root image's own URL — rather than leaving it out
// and relying on Next inheriting the nearest parent segment's file-
// convention image. That inheritance turned out NOT to apply once a page
// defines its own (even partial) `openGraph` object, as this one does for
// title/description/url: testing showed pages using buildMetadata() lost
// their og:image entirely when `images` was left unset, while only the
// homepage (whose metadata comes solely from the root layout, with no
// page-level `openGraph` of its own) still picked up the root image.
const DEFAULT_OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${siteConfig.name} — Debt Consolidation & Personal Loans`,
};

type OgImage = { url: string; width: number; height: number; alt: string };

type PageSeo = {
  /** Page title without the site name; the root layout title template appends it. */
  title: string;
  description: string;
  /** Route path starting with "/", used for canonical and og:url. */
  path: string;
  keywords?: string[];
  type?: "website" | "article";
  /** Defaults to the site-wide generated image (app/opengraph-image.tsx).
   * Pass this for a route with its own opengraph-image.tsx, e.g. an
   * article: `${siteConfig.url}${path}/opengraph-image`. */
  image?: OgImage;
  /** Set true for a page kept reachable for visitors but excluded from
   * search results — e.g. the templated city pages not yet rewritten with
   * real local content (plan decision D5). Still crawlable (follow: true),
   * so links from it still pass through; pair with leaving it out of
   * app/sitemap.ts. */
  noindex?: boolean;
};

export function buildMetadata({ title, description, path, keywords, type = "website", image, noindex }: PageSeo): Metadata {
  const socialTitle = `${title} | ${siteConfig.name}`;
  const resolvedImage = image ?? DEFAULT_OG_IMAGE;
  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      title: socialTitle,
      description,
      url: path,
      siteName: siteConfig.name,
      type,
      locale: "en_IN",
      images: [resolvedImage],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [resolvedImage.url],
    },
  };
}

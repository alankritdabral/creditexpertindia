import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";

export const defaultOgImage = {
  url: "/img/logo_with_name.png",
  width: 1569,
  height: 1002,
  alt: siteConfig.name,
};

type PageSeo = {
  /** Page title without the site name; the root layout title template appends it. */
  title: string;
  description: string;
  /** Route path starting with "/", used for canonical and og:url. */
  path: string;
  keywords?: string[];
  type?: "website" | "article";
};

export function buildMetadata({ title, description, path, keywords, type = "website" }: PageSeo): Metadata {
  const socialTitle = `${title} | ${siteConfig.name}`;
  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      title: socialTitle,
      description,
      url: path,
      siteName: siteConfig.name,
      type,
      locale: "en_IN",
      images: [defaultOgImage],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [defaultOgImage.url],
    },
  };
}

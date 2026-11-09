import { siteConfig, contact } from "@/lib/config";
import type { Article } from "@/content/articles";
import type { Faq } from "@/lib/pageContent";

/**
 * Serialises a JSON-LD object the way Next's own docs recommend
 * (node_modules/next/dist/docs/01-app/02-guides/json-ld.md): escape `<` so
 * a value like a title containing "</script>" can't break out of the tag.
 * Render the result with a native <script>, not next/script.
 */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/**
 * Organization schema (feeds Google's knowledge panel / logo). Google says
 * this belongs on the home page, or a single page describing the
 * organization — not on every page (developers.google.com/search/docs/
 * appearance/structured-data/organization).
 */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    legalName: contact.legalName,
    url: siteConfig.url,
    logo: `${siteConfig.url}/icon-512.png`,
    sameAs: [
      "https://www.facebook.com/people/Credit-Expert-India/100095328945231/",
      "https://www.instagram.com/creditexpertindia/",
      "https://www.linkedin.com/company/credit-expert-india/home/",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: contact.whatsapp,
      email: contact.email,
      contactType: "customer support",
      areaServed: "IN",
      availableLanguage: ["en", "hi"],
    },
  };
}

/** Feeds Google's "site name" display, not the sitelinks search box (that
 * feature was removed November 2024 — see Phase 0 research). */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
  };
}

export type BreadcrumbItem = { name: string; path?: string };

/** `path` is omitted on the last (current) item — Google's own example
 * omits `item` for the final crumb. */
export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.path ? { item: `${siteConfig.url}${item.path}` } : {}),
    })),
  };
}

/**
 * Built from the exact same `faqs` array components/page-sections/
 * PageSections.tsx's PageFAQ renders, so this can't drift from the visible
 * page the way /debt-consolidation's hand-written copy had (it showed 4
 * questions that didn't match any of the 4+3 actually on the page).
 */
export function pageFaqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function articleSchema(article: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.summary,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: { "@type": "ImageObject", url: `${siteConfig.url}/icon-512.png` },
    },
    image: `${siteConfig.url}/learning-center/${article.slug}/opengraph-image`,
    mainEntityOfPage: `${siteConfig.url}/learning-center/${article.slug}`,
  };
}

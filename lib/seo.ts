import type { Metadata } from "next";
import { siteConfig, contact, identity } from "@/lib/config";

/** Metadata for a public page: unique title and description, canonical, Open Graph and Twitter. */
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: `${siteConfig.url}${path}`, siteName: siteConfig.name, type: "website", locale: "en_IN" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export function faqJsonLd(items: readonly { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
  };
}

export function breadcrumbJsonLd(trail: readonly { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({ "@type": "ListItem", position: i + 1, name: t.name, item: `${siteConfig.url}${t.path}` })),
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    name: identity.registeredName || contact.legalName,
    url: siteConfig.url,
    logo: `${siteConfig.url}/img/logo.png`,
    description: "Helps salaried borrowers explore debt consolidation, loan balance transfer and personal loan options. A loan facilitator, not a bank or NBFC.",
    areaServed: "IN",
    email: contact.email,
    ...(identity.phone ? { telephone: identity.phone } : {}),
    address: contact.addresses.map((a) => ({ "@type": "PostalAddress", addressLocality: a.city, streetAddress: a.fullAddress, addressCountry: "IN" })),
    sameAs: [
      "https://www.facebook.com/people/Credit-Expert-India/100095328945231/",
      "https://www.instagram.com/creditexpertindia/",
      "https://www.linkedin.com/company/credit-expert-india/home/",
    ],
  };
}

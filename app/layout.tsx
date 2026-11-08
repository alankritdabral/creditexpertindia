import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ConsentBanner } from "@/components/consent/ConsentBanner";
import { siteConfig } from "@/lib/config";
import { defaultOgImage } from "@/lib/seo";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-VNY6TW0ZW0";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  // Rendered as-is on the homepage (the title template only applies to child
  // segments), so this must itself be ≤60 chars for Google not to truncate it.
  title: {
    default: `${siteConfig.name} — Debt Consolidation & Personal Loans`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Paying too much interest on loans or card dues? Explore debt consolidation, balance transfer and personal loans from 9.95% p.a.*, for eligible applicants.",
  // No `keywords`: Google has ignored the meta keywords tag since 2009
  // (developers.google.com/search/blog/2009/09/google-does-not-use-keywords-meta-tag).
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: `${siteConfig.name} — Paying Too Much Interest?`,
    description: "Explore debt consolidation, balance transfer and personal loans through our lending network. Check your options.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
    locale: "en_IN",
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Debt Consolidation & Personal Loans`,
    description: "Explore debt consolidation, balance transfer and personal loans through our lending network. Check your options.",
    images: [defaultOgImage.url],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon", sizes: "any" },
      { url: "/favicon.ico", type: "image/x-icon", sizes: "48x48" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  robots: { 
    index: true, 
    follow: true, 
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    name: siteConfig.name,
    url: siteConfig.url,
    description: "Helps borrowers explore debt consolidation, balance transfer and personal loan options.",
    areaServed: "IN",
  };

  return (
    <html lang="en-IN" className={`${inter.variable} ${manrope.variable} h-full antialiased font-sans scroll-smooth`}>
      <body className="min-h-full flex flex-col bg-background text-brand-black [font-feature-settings:'ss01'] overflow-x-hidden">
        {/*
          Consent Mode v2 ordering (developers.google.com/tag-platform/security/guides/consent):
          the default must be set, and any already-stored choice applied,
          BEFORE any `config` or `event` command. This runs `beforeInteractive`
          (in <head>, before hydration — Next's docs list "Cookie consent
          managers" as a supported use of this strategy) so it always wins
          the race against the gtag.js loader below, which is `afterInteractive`.
          lib/consent.ts's ANALYTICS_DEFAULT and STORAGE_KEY are duplicated
          here as literals: this has to be plain inline JS, not a module
          import, since it must run before any bundle is hydrated.
        */}
        <Script id="gtag-consent-init" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;

            var consentDefault = {
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              analytics_storage: 'denied', // must match lib/consent.ts's ANALYTICS_DEFAULT
              wait_for_update: 500
            };
            gtag('consent', 'default', consentDefault);

            try {
              var stored = JSON.parse(window.localStorage.getItem('cei_consent'));
              if (stored && (stored.analytics === 'granted' || stored.analytics === 'denied')) {
                gtag('consent', 'update', { analytics_storage: stored.analytics });
              }
            } catch (e) {}

            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <ScrollProgress />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <ConsentBanner />
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ConsentBanner } from "@/components/consent/ConsentBanner";
import { ClickTracker } from "@/components/analytics/ClickTracker";
import { WebVitals } from "@/components/analytics/WebVitals";
import { ClarityLoader } from "@/components/analytics/Clarity";
import { siteConfig } from "@/lib/config";
import { GA_ID } from "@/lib/analytics/gaId";
import { jsonLd, organizationSchema, websiteSchema } from "@/lib/structuredData";

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
    // No explicit `images`: app/opengraph-image.tsx (file convention) is the
    // site-wide default; a route with its own opengraph-image.tsx (the
    // learning-center articles) gets that one instead.
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Debt Consolidation & Personal Loans`,
    description: "Explore debt consolidation, balance transfer and personal loans through our lending network. Check your options.",
  },
  // No manual `icons` here: app/favicon.ico, app/icon.png and
  // app/apple-icon.png are Next's file-convention icons and are picked up
  // automatically (and take precedence over a metadata `icons` object) —
  // see node_modules/next/dist/docs/.../app-icons.md. The previous object
  // pointed `apple` at a .ico file, which the apple-icon convention doesn't
  // even accept (only .jpg/.jpeg/.png).
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
  // Organization + WebSite, not the old bare FinancialService (it had no
  // address, logo or sameAs — Google's LocalBusiness/FinancialService
  // feature needs a real PostalAddress; that now lives on /contact's
  // per-branch schema instead). Rendered site-wide: cheap, and Google's own
  // guidance just says this doesn't need to be on EVERY page, not that it
  // mustn't be. Two separate documents, each with its own @context, rather
  // than one @graph — simpler than stripping the nested @context keys.
  const organization = organizationSchema();
  const website = websiteSchema();

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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(organization) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(website) }} />
        <ScrollProgress />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <ConsentBanner />
        <ClickTracker />
        <WebVitals />
        <ClarityLoader />
      </body>
    </html>
  );
}

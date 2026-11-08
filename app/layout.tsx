import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { siteConfig } from "@/lib/config";
import { defaultOgImage } from "@/lib/seo";

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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-VNY6TW0ZW0"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-VNY6TW0ZW0');
          `}
        </Script>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <ScrollProgress />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

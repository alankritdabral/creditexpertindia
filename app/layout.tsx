import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { SiteFrame } from "@/components/site/SiteFrame";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { StickyActionBar } from "@/components/site/StickyActionBar";
import { siteConfig } from "@/lib/config";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — Debt Consolidation & Personal Loans for Salaried Professionals`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Paying too much interest on loans, credit-card dues or multiple EMIs? Credit Expert India helps you explore debt consolidation, balance transfer and personal loan options starting from 9.95% p.a.* for eligible salaried applicants.",
  keywords: [
    "debt consolidation India",
    "debt consolidation loan",
    "personal loan",
    "personal loan for salaried",
    "loan balance transfer",
    "reduce loan interest",
    "credit card debt consolidation",
  ],
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: `${siteConfig.name} — Paying Too Much Interest?`,
    description: "Explore debt consolidation, balance transfer and personal loans through our lending network. Check your options.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Debt Consolidation & Personal Loans`,
    description: "Explore debt consolidation, balance transfer and personal loans through our lending network. Check your options.",
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
    <html lang="en" className={`${inter.variable} ${manrope.variable} h-full antialiased font-sans scroll-smooth`}>
      <body className="min-h-full flex flex-col bg-page text-ink">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-VNY6TW0ZW0"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-VNY6TW0ZW0');
          `}
        </Script>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <SiteFrame header={<SiteHeader />} footer={<SiteFooter />} bar={<StickyActionBar />}>
          {children}
        </SiteFrame>
      </body>
    </html>
  );
}

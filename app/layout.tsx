import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileStickyCTA } from "@/components/MobileStickyCTA";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ScrollProgress } from "@/components/ScrollProgress";
import { siteConfig } from "@/lib/config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
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

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "What is debt consolidation?", acceptedAnswer: { "@type": "Answer", text: "Combining eligible existing debts into a single loan structure with one repayment, where eligible." } },
      { "@type": "Question", name: "Is loan approval guaranteed?", acceptedAnswer: { "@type": "Answer", text: "No. Loan approval is not guaranteed. The lender makes the final decision." } },
    ],
  };

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased font-sans scroll-smooth`}>
      <body className="min-h-full flex flex-col bg-white text-ink [font-feature-settings:'ss01']">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
        <Navbar />
        <main className="flex-1 pb-[72px] lg:pb-0">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

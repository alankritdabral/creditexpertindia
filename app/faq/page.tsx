import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { FAQ } from "@/components/FAQ";
import { LeadForm } from "@/components/LeadForm";
import { ProductHero } from "@/components/ProductHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { siteFaqs } from "@/content/faq";
import { jsonLd } from "@/lib/structuredData";

export const metadata: Metadata = buildMetadata({
  title: "Frequently Asked Questions",
  description:
    "Find answers to all common questions about debt consolidation, personal loans, interest rates, CIBIL score impact, and lender approval.",
  path: "/faq",
});

// Built from content/faq.ts — the exact same data components/FAQ.tsx
// renders — so this can never show Google a question or answer that isn't
// actually on the page (unlike the two hand-written copies this phase
// removed from /debt-consolidation and the calculator page).
const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: siteFaqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(faqPageSchema) }}
      />
      <div className="h-[84px]" aria-hidden="true" />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "FAQ" }]} />
      <ProductHero
        title="Questions? Good. Ask away."
        body="Clear, honest answers about loan options and how we help. If yours isn't here, just ask us directly."
        cta="Ask us directly"
        image="/Misty India Skyline with Orbital Arcs.webp"
        imageAlt="An Indian city skyline, representing Credit Expert India's nationwide service"
        points={["Straight answers, no jargon", "Free to ask", "A real person replies"]}
      />

      <section className="bg-white">
        <div className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24">
          <FAQ />
        </div>
      </section>
      <LeadForm />
    </div>
  );
}

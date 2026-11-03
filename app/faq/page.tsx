import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { FAQ } from "@/components/FAQ";
import { LeadForm } from "@/components/LeadForm";
import { ProductHero } from "@/components/ProductHero";

export const metadata: Metadata = buildMetadata({
  title: "Frequently Asked Questions",
  description:
    "Find answers to all common questions about debt consolidation, personal loans, interest rates, CIBIL score impact, and lender approval.",
  path: "/faq",
});

const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does Credit Expert India do?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We help customers understand their existing debt or borrowing requirements and explore suitable loan, consolidation or repayment options based on their situation."
      }
    },
    {
      "@type": "Question",
      name: "Can you help with multiple loans?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We can review multiple loans and EMIs together and help you understand whether consolidation or another option may be suitable."
      }
    },
    {
      "@type": "Question",
      name: "Can you help with credit-card debt?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We can review your credit-card dues and help you understand potential repayment or consolidation options available based on your situation."
      }
    },
    {
      "@type": "Question",
      name: "Do you guarantee loan approval?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Final approval, interest rate, loan amount and tenure are decided by the respective lender based on its eligibility criteria."
      }
    },
    {
      "@type": "Question",
      name: "Do you guarantee lower interest rates?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Rates depend on your profile, lender policies and prevailing terms. We help you explore suitable options."
      }
    },
    {
      "@type": "Question",
      name: "Is the assessment free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The initial assessment can be offered without obligation. Any applicable charges, if any, should always be communicated clearly before proceeding."
      }
    },
    {
      "@type": "Question",
      name: "Will taking another loan always help?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. A new loan isn't always the right solution. We first look at the existing situation and then discuss relevant options."
      }
    }
  ]
};

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
      />
      
      <ProductHero
        title="Questions? Good. Ask away."
        body="Clear, honest answers about loan options and how we help. If yours isn't here, just ask us directly."
        cta="Ask us directly"
        image="/Misty India Skyline with Orbital Arcs.webp"
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

import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { DebtConsolidation } from "@/components/DebtConsolidation";
import { LoanCalculator } from "@/components/LoanCalculator";
import { LeadForm } from "@/components/LeadForm";
import { ProductHero } from "@/components/ProductHero";
import { PageIntro, PageProof } from "@/components/page-sections/PageSections";

export const metadata: Metadata = buildMetadata({
  title: "Debt Consolidation Loans for Salaried Professionals",
  description:
    "Combine multiple personal loans, credit card dues, and app loans into one single lower-rate EMI plan. Explore debt consolidation options with bank partners.",
  path: "/debt-consolidation",
});

const debtConsolidationFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
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
      name: "Do you guarantee loan approval or lower interest rates?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Final approval, interest rate, loan amount and tenure are decided by the respective lender based on its eligibility criteria."
      }
    },
    {
      "@type": "Question",
      name: "Is the loan assessment free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The initial assessment can be offered without obligation. Any applicable lender charges are always communicated clearly before proceeding."
      }
    }
  ]
};

export default function DebtConsolidationPage() {
  return (
    <div className="min-h-screen bg-white">
      <ProductHero
        title="Too many EMIs? Let's turn them into one."
        body="Stop juggling due dates and high card interest. See whether combining your loans and cards into one plan could lower what you pay each month."
        cta="Check my options"
        image="/img/multipleloans.webp"
        points={["Free assessment", "One due date, one payment", "Honest answer, even if it isn't worth it"]}
      />

      <PageIntro page="debt-consolidation" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(debtConsolidationFaqSchema) }}
      />
      <DebtConsolidation />
      <LoanCalculator />
      <PageProof page="debt-consolidation" />
      <LeadForm />
    </div>
  );
}

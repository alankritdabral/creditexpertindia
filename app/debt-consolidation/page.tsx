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

      <DebtConsolidation />
      <LoanCalculator />
      <PageProof page="debt-consolidation" />
      <LeadForm />
    </div>
  );
}

import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { LoanCalculator } from "@/components/LoanCalculator";
import { LeadForm } from "@/components/LeadForm";
import { ProductHero } from "@/components/ProductHero";

export const metadata: Metadata = buildMetadata({
  title: "High-Interest Loan Refinancing & Advisory",
  description:
    "Explore options to refinance high-rate personal loans and reduce monthly EMI burden with partner banks.",
  path: "/high-interest-loan",
});

export default function HighInterestLoanPage() {
  return (
    <div className="min-h-screen bg-white">
      
      <ProductHero
        title="Is your loan costing more than it should?"
        body="If you're paying above 16% a year, refinancing or consolidating with a partner bank might lower your monthly burden. We'll tell you honestly."
        cta="Check my options"
        image="/img/od.webp"
        points={["Free assessment", "Honest answer, even if switching isn't worth it", "You stay in control"]}
      />

      <LoanCalculator />
      <LeadForm />
    </div>
  );
}

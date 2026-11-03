import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { LoanCalculator } from "@/components/LoanCalculator";
import { LeadForm } from "@/components/LeadForm";
import { ProductHero } from "@/components/ProductHero";
import { PageIntro, PageProof } from "@/components/page-sections/PageSections";

export const metadata: Metadata = buildMetadata({
  title: "App Loan & Fintech Loan Consolidation",
  description:
    "Consolidate multiple short-term app loans and digital credit line EMIs into one single lower-cost bank loan.",
  path: "/app-loan",
});

export default function AppLoanPage() {
  return (
    <div className="min-h-screen bg-white">
      
      <ProductHero
        title="Too many app loans? Let's make it one."
        body="App loans often come with steep fees and high interest. Roll them into one bank loan with a single EMI."
        cta="Combine my app loans"
        image="/img/teenager.webp"
        points={["Free to check", "One EMI, one due date", "No pressure, no upfront fees"]}
      />

      <PageIntro page="app-loan" />

      <LoanCalculator />
      <PageProof page="app-loan" />
      <LeadForm />
    </div>
  );
}

import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { LoanCalculator } from "@/components/LoanCalculator";
import { Eligibility } from "@/components/Eligibility";
import { LeadForm } from "@/components/LeadForm";
import { ProductHero } from "@/components/ProductHero";
import { PageIntro, PageProof } from "@/components/page-sections/PageSections";

export const metadata: Metadata = buildMetadata({
  title: "Personal Loans for Salaried Staff from 9.95% p.a.*",
  description:
    "Check personal loan options for salaried professionals. Rates starting from 9.95% p.a.* with soft profile eligibility checks and partner bank network.",
  path: "/personal-loan",
});

export default function PersonalLoanPage() {
  return (
    <div className="min-h-screen bg-white">
      
      <ProductHero
        title="Need a personal loan? Let's see what you qualify for."
        body="Rates start from 9.95% p.a.* for salaried applicants. We check your options with partner banks, based on your income, employer and credit score."
        cta="Check my eligibility"
        image="/img/marraige.webp"
        points={["Free to check, no obligation", "Soft profile check, no impact on your score*", "You decide if you go ahead"]}
      />

      <PageIntro page="personal-loan" />

      <Eligibility />
      <LoanCalculator />
      <PageProof page="personal-loan" />
      <LeadForm />
    </div>
  );
}

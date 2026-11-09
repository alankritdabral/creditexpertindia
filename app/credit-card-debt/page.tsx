import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { LoanCalculator } from "@/components/LoanCalculator";
import { LeadForm } from "@/components/LeadForm";
import { ProductHero } from "@/components/ProductHero";
import { PageIntro, PageProof } from "@/components/page-sections/PageSections";

export const metadata: Metadata = buildMetadata({
  title: "Credit Card Debt Relief Options",
  description:
    "Replace expensive 36%-42% p.a. revolving credit card interest with a structured lower-rate personal loan. Explore credit card debt payoff options.",
  path: "/credit-card-debt",
});

export default function CreditCardDebtPage() {
  return (
    <div className="min-h-screen bg-white">
      
      <ProductHero
        title="Your credit-card bill shouldn't take years to clear."
        body="Cards charge 36–42% a year, and minimum dues keep you stuck. Moving that balance to a lower-rate loan can change that."
        cta="See my card options"
        image="/img/creditcard.webp"
        imageAlt="A credit card next to a calculator, representing card-debt repayment planning"
        points={["Free assessment", "We never ask for money upfront", "Your final lender makes the decision"]}
      />

      <PageIntro page="credit-card-debt" />

      <LoanCalculator />
      <PageProof page="credit-card-debt" />
      <LeadForm />
    </div>
  );
}

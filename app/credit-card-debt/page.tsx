import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { LoanCalculator } from "@/components/LoanCalculator";
import { LeadForm } from "@/components/LeadForm";
import { FAQ } from "@/components/FAQ";
import { ProductHero } from "@/components/ProductHero";

export const metadata: Metadata = buildMetadata({
  title: "Credit Card Debt Relief & Payoff Options",
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
        points={["Free assessment", "We never ask for money upfront", "Your final lender makes the decision"]}
      />

      <LoanCalculator />
      <LeadForm />
      <section className="bg-white">
        <div className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24">
          <FAQ />
        </div>
      </section>
    </div>
  );
}

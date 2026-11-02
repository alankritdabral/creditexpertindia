import { Metadata } from "next";
import { ProductHero } from "@/components/ProductHero";
import { LoanCalculator } from "@/components/LoanCalculator";
import { LeadForm } from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "EMI Savings Calculator for Salaried Borrowers",
  description: "See how much you could save every month by combining your loans and card dues into one lower-rate loan. Free estimate.",
  alternates: { canonical: "/emi-savings-calculator" },
};

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <ProductHero
        title="How much could you save on your EMIs?"
        body="Add up what you pay today and see what it might look like as one loan at a lower rate. It's a quick estimate to start the conversation."
        cta="Get my free assessment"
        image="/img/multipleloans.webp"
        points={["Free and instant", "Built for salaried borrowers", "Honest, even if the saving is small"]}
      />
      <LoanCalculator />
      <LeadForm />
    </div>
  );
}

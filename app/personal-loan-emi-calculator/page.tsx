import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { ProductHero } from "@/components/ProductHero";
import { SmartCalculator } from "@/components/SmartCalculator";
import { LeadForm } from "@/components/LeadForm";

export const metadata: Metadata = buildMetadata({
  title: "Personal Loan EMI Calculator",
  description:
    "Work out the monthly EMI, total interest and total payable on a personal loan. Free and instant, made for salaried borrowers.",
  path: "/personal-loan-emi-calculator",
});

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <ProductHero
        title="Work out your personal-loan EMI in seconds."
        body="Set the amount, the rate and the tenure, and see your monthly EMI, the total interest and the total you'd repay."
        cta="Talk to us about my loan"
        image="/img/marraige.webp"
        points={["Free and instant", "No sign-up needed", "Compare with a lower rate"]}
      />
      <SmartCalculator />
      <section className="bg-white text-[#0A2540]">
        <div className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24 grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-20">
          <h2 className="text-[40px] sm:text-[56px] leading-[1.02] tracking-[-0.04em] font-bold">
            How the EMI is worked out.
          </h2>
          <div className="space-y-5 text-lg leading-relaxed text-[#3C4F69] max-w-xl">
            <p>
              EMI = P × r × (1 + r)<sup>n</sup> ÷ ((1 + r)<sup>n</sup> − 1), where P is the loan amount, r is the
              monthly interest rate (annual rate ÷ 12 ÷ 100) and n is the number of months.
            </p>
            <p>
              A longer tenure lowers each EMI but raises the total interest. A lower rate reduces both. Try
              a few combinations above to see the effect.
            </p>
            <p className="text-sm">
              Results are estimates. Your actual EMI depends on the lender, your eligibility and any fees.
            </p>
          </div>
        </div>
      </section>
      <LeadForm />
    </div>
  );
}

import { Metadata } from "next";
import { LoanCalculator } from "@/components/LoanCalculator";
import { LeadForm } from "@/components/LeadForm";
import { ProductHero } from "@/components/ProductHero";

export const metadata: Metadata = {
  title: "Personal Loan Balance Transfer | Credit Expert India",
  description: "Transfer your high-interest personal loan to partner banks with lower interest rates. Calculate monthly EMI savings and apply for balance transfer.",
};

export default function BalanceTransferPage() {
  return (
    <div className="min-h-screen bg-white">
      
      <ProductHero
        title="Paying 16–24% on a loan? Let's move it somewhere cheaper."
        body="If you qualify, you could transfer your existing loan to a partner bank at rates starting from 9.95% p.a.*"
        cta="Check my transfer rate"
        image="/img/multipleloans.webp"
        points={["Free to check", "We compare partner banks for you", "No pressure to switch"]}
      />

      <LoanCalculator />
      <LeadForm />
    </div>
  );
}

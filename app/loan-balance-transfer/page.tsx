import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { LoanCalculator } from "@/components/LoanCalculator";
import { LeadForm } from "@/components/LeadForm";
import { ProductHero } from "@/components/ProductHero";
import { PageIntro, PageProof } from "@/components/page-sections/PageSections";

export const metadata: Metadata = buildMetadata({
  title: "Personal Loan Balance Transfer",
  description:
    "Transfer your high-interest personal loan to partner banks with lower interest rates. Calculate monthly EMI savings and apply for balance transfer.",
  path: "/loan-balance-transfer",
});

export default function BalanceTransferPage() {
  return (
    <div className="min-h-screen bg-white">
      
      <ProductHero
        title="Paying 16–24% on a loan? Let's move it somewhere cheaper."
        body="If you qualify, you could transfer your existing loan to a partner bank at rates starting from 9.95% p.a.*"
        cta="Check my transfer rate"
        image="/img/multipleloans.webp"
        imageAlt="Several loan documents being consolidated into a single lower-rate loan"
        points={["Free to check", "We compare partner banks for you", "No pressure to switch"]}
      />

      <PageIntro page="balance-transfer" />

      <LoanCalculator />
      <PageProof page="balance-transfer" />
      <LeadForm />
    </div>
  );
}

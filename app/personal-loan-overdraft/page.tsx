import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { ProductHero } from "@/components/ProductHero";
import { Eligibility } from "@/components/Eligibility";
import { LoanCalculator } from "@/components/LoanCalculator";
import { LeadForm } from "@/components/LeadForm";
import { PageIntro, PageProof } from "@/components/page-sections/PageSections";

export const metadata: Metadata = buildMetadata({
  title: "Overdraft Options for Salaried Staff",
  description:
    "Explore overdraft and credit-line options for salaried professionals, and see whether a personal loan or consolidation would cost you less.",
  path: "/personal-loan-overdraft",
});

const points = [
  { t: "A limit you can draw from", d: "Instead of one lump sum, you get a limit and use what you need, when you need it." },
  { t: "Interest on what you use", d: "With many overdraft and credit-line products, interest is charged on the amount drawn, not the whole limit. Terms vary by lender." },
  { t: "Not always the cheapest", d: "If you stay in overdraft for long, the cost can add up. We'll tell you if a personal loan would work out better." },
];

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <ProductHero
        title="Need flexible cash? Let's look at overdraft options."
        body="If your salary doesn't always stretch to month-end, an overdraft or credit line can help. We'll also check if another route would cost you less."
        cta="Check my overdraft options"
        image="/img/od.webp"
        points={["Free assessment", "For salaried professionals", "No pressure to go ahead"]}
      />

      <PageIntro page="overdraft" />

      <section className="bg-white text-[#0A2540]">
        <div className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24 grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-20">
          <h2 className="text-[40px] sm:text-[56px] leading-[1.02] tracking-[-0.04em] font-bold">
            How an overdraft works.
          </h2>
          <div>
            {points.map((i, n) => (
              <div key={i.t} className={`px-5 md:px-7 py-7 ${n % 2 === 0 ? "bg-[#EAF3FF]" : ""}`}>
                <h3 className="text-2xl md:text-[32px] leading-tight tracking-[-0.02em] font-bold">{i.t}</h3>
                <p className="mt-2 text-lg text-[#3C4F69] leading-relaxed max-w-lg">{i.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Eligibility />
      <LoanCalculator />
      <PageProof page="overdraft" />
      <LeadForm />
    </div>
  );
}

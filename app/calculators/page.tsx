import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calculator } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LeadForm } from "@/components/LeadForm";

export const metadata: Metadata = buildMetadata({
  title: "Loan & EMI Calculators",
  description: "Free calculators for Indian borrowers: work out a personal loan EMI, estimate EMI savings, or see what debt consolidation could look like.",
  path: "/calculators",
});

const calculators = [
  {
    title: "Debt Consolidation Calculator",
    description: "Combine multiple personal loans, credit card dues and app loans into one single lower EMI.",
    href: "/calculators/debt-consolidation-calculator",
  },
  {
    title: "Personal Loan EMI Calculator",
    description: "Work out the monthly EMI, total interest and total payable on a personal loan.",
    href: "/personal-loan-emi-calculator",
  },
  {
    title: "EMI Savings Calculator",
    description: "See how much you could save every month by combining your loans and card dues into one lower-rate loan.",
    href: "/emi-savings-calculator",
  },
];

export default function CalculatorsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="h-[84px]" aria-hidden="true" />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Calculators" }]} />
      <section className="bg-white">
        <div className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-14 md:py-20">
          <h1 className="text-[40px] sm:text-[56px] leading-[1.02] tracking-[-0.04em] font-bold text-[#0A2540] max-w-2xl">
            Loan and EMI calculators.
          </h1>
          <p className="mt-5 text-lg md:text-xl leading-relaxed text-[#3C4F69] max-w-xl">
            Free to use, no sign-up, no impact on your credit score. Pick the one that matches what you're trying to work out.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {calculators.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                data-analytics-cta={`calculators_hub_${c.href.split("/").pop()}`}
                data-analytics-location="calculators_hub"
                className="group flex flex-col rounded-2xl border border-[#0052CC]/10 bg-[#EAF3FF] p-6 hover:border-[#0052CC]/30 transition-colors"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0052CC] text-white">
                  <Calculator className="h-6 w-6" />
                </div>
                <h2 className="mt-5 text-xl font-bold tracking-[-0.02em] text-[#0A2540]">{c.title}</h2>
                <p className="mt-2 text-base leading-relaxed text-[#3C4F69] flex-1">{c.description}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0052CC] group-hover:underline">
                  Open calculator <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <LeadForm />
    </div>
  );
}

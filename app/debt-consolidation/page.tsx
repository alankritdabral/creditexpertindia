import { Metadata } from "next";
import { DebtConsolidation } from "@/components/DebtConsolidation";
import { LoanCalculator } from "@/components/LoanCalculator";
import { LeadForm } from "@/components/LeadForm";
import { FAQ } from "@/components/FAQ";
import { AnimatedMeshBackground } from "@/components/AnimatedMeshBackground";

export const metadata: Metadata = {
  title: "Debt Consolidation Loans for Salaried Professionals | Credit Expert India",
  description: "Combine multiple personal loans, credit card dues, and app loans into one single lower-rate EMI plan. Explore debt consolidation options with bank partners.",
};

export default function DebtConsolidationPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Dedicated Subpage Hero */}
      
      <section className="relative w-full pt-32 pb-24 lg:pt-40 lg:pb-32 bg-background overflow-hidden border-b border-icy-blue">
        <div className="absolute inset-0 -z-10 h-full w-full">
          <AnimatedMeshBackground />
          <div className="absolute top-0 right-0 w-full h-full max-w-[60%] transform origin-top-right -skew-y-12 bg-gradient-to-bl from-[#E2D6CC]/40 to-transparent pointer-events-none" />
        </div>
        <div className="container-narrow text-center relative z-10">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-black/80">
            SALARIED DEBT CONSOLIDATION ADVISORY
          </span>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-5xl leading-tight text-brand-black">
            Consolidate Multiple EMIs Into <br className="hidden sm:inline" />
            <span className="text-brand-black/80">One Simpler Repayment Plan</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-base text-brand-black/80 font-medium leading-7">
            Stop juggling multiple due dates and high revolving interest rates. Explore whether consolidating your active personal loans and credit cards can reduce your monthly outflow.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#lead-form"
              className="inline-flex h-12 items-center justify-center rounded-full bg-slate-900 px-8 text-sm font-semibold text-white hover:bg-slate-800 transition-colors shadow-lg"
            >
              Check My Options
            </a>
            <a
              href="#calculator"
              className="inline-flex h-12 items-center justify-center rounded-full border border-icy-blue bg-white px-8 text-sm font-semibold text-brand-black hover:bg-slate-50 transition-colors shadow-sm"
            >
              Calculate Savings
            </a>
          </div>
        </div>
      </section>

      <DebtConsolidation />
      <LoanCalculator />
      <LeadForm />
      <FAQ />
    </div>
  );
}

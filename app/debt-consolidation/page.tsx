import { Metadata } from "next";
import { DebtConsolidation } from "@/components/DebtConsolidation";
import { LoanCalculator } from "@/components/LoanCalculator";
import { LeadForm } from "@/components/LeadForm";
import { FAQ } from "@/components/FAQ";

export const metadata: Metadata = {
  title: "Debt Consolidation Loans for Salaried Professionals | Credit Expert India",
  description: "Combine multiple personal loans, credit card dues, and app loans into one single lower-rate EMI plan. Explore debt consolidation options with bank partners.",
};

export default function DebtConsolidationPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Dedicated Subpage Hero */}
      <section className="bg-[#091328] py-16 text-white sm:py-24">
        <div className="container-narrow text-center">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400">
            SALARIED DEBT CONSOLIDATION ADVISORY
          </span>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-5xl leading-tight">
            Consolidate Multiple EMIs Into <br className="hidden sm:inline" />
            <span className="text-emerald-400">One Simpler Repayment Plan</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-base text-slate-300 leading-7">
            Stop juggling multiple due dates and high revolving interest rates. Explore whether consolidating your active personal loans and credit cards can reduce your monthly outflow.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#lead-form"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-emerald-500 px-8 text-xs font-extrabold text-slate-950 uppercase tracking-wider hover:bg-emerald-400 transition-colors shadow-lg"
            >
              Check My Options
            </a>
            <a
              href="#calculator"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-700 bg-slate-800/80 px-8 text-xs font-bold text-white hover:bg-slate-800 transition-colors"
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
    </main>
  );
}

import { Metadata } from "next";
import { LoanCalculator } from "@/components/LoanCalculator";
import { LeadForm } from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "App Loan & Fintech Loan Consolidation | Credit Expert India",
  description: "Consolidate multiple short-term app loans and digital credit line EMIs into one single lower-cost bank loan.",
};

export default function AppLoanPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-[#091328] py-16 text-white sm:py-24">
        <div className="container-narrow text-center">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400">
            APP LOAN CONSOLIDATION
          </span>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-5xl leading-tight">
            Consolidate Multiple Short-Term <br className="hidden sm:inline" />
            <span className="text-emerald-400">Digital App Loans Into One Bank Loan</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-base text-slate-300 leading-7">
            Fintech app loans often carry steep processing fees and high interest rates. Explore consolidating app loans into a structured personal loan with single monthly EMI.
          </p>
          <div className="mt-8 flex justify-center">
            <a
              href="#lead-form"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-emerald-500 px-8 text-xs font-extrabold text-slate-950 uppercase tracking-wider hover:bg-emerald-400 transition-colors shadow-lg"
            >
              Explore App Loan Relief
            </a>
          </div>
        </div>
      </section>

      <LoanCalculator />
      <LeadForm />
    </main>
  );
}

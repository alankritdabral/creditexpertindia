import { Metadata } from "next";
import { LoanCalculator } from "@/components/LoanCalculator";
import { LeadForm } from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "High-Interest Loan Refinancing & Advisory | Credit Expert India",
  description: "Explore options to refinance high-rate personal loans and reduce monthly EMI burden with partner banks.",
};

export default function HighInterestLoanPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-[#091328] py-16 text-white sm:py-24">
        <div className="container-narrow text-center">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400">
            HIGH INTEREST REFINANCING
          </span>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-5xl leading-tight">
            Lower Expensive Interest Rates <br className="hidden sm:inline" />
            <span className="text-emerald-400">On Active Personal Loans</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-base text-slate-300 leading-7">
            If your active loan rates exceed 16% p.a., evaluate whether refinancing or debt consolidation options across our partner banks can lower your monthly interest burden.
          </p>
          <div className="mt-8 flex justify-center">
            <a
              href="#lead-form"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-emerald-500 px-8 text-xs font-extrabold text-slate-950 uppercase tracking-wider hover:bg-emerald-400 transition-colors shadow-lg"
            >
              Explore Lower Rates
            </a>
          </div>
        </div>
      </section>

      <LoanCalculator />
      <LeadForm />
    </main>
  );
}

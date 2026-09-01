import { Metadata } from "next";
import { LoanCalculator } from "@/components/LoanCalculator";
import { Eligibility } from "@/components/Eligibility";
import { LeadForm } from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Personal Loans for Salaried Staff from 9.95% p.a.* | Credit Expert India",
  description: "Check personal loan options for salaried professionals. Rates starting from 9.95% p.a.* with soft profile eligibility checks and partner bank network.",
};

export default function PersonalLoanPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-[#091328] py-16 text-white sm:py-24">
        <div className="container-narrow text-center">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400">
            SALARIED PERSONAL LOAN ADVISORY
          </span>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-5xl leading-tight">
            Personal Loans Starting From <br className="hidden sm:inline" />
            <span className="text-emerald-400">9.95% p.a.* For Salaried Staff</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-base text-slate-300 leading-7">
            Explore fresh personal loan options based on your monthly income, corporate employer category, and credit score.
          </p>
          <div className="mt-8 flex justify-center">
            <a
              href="#lead-form"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-emerald-500 px-8 text-xs font-extrabold text-slate-950 uppercase tracking-wider hover:bg-emerald-400 transition-colors shadow-lg"
            >
              Check Eligibility
            </a>
          </div>
        </div>
      </section>

      <Eligibility />
      <LoanCalculator />
      <LeadForm />
    </main>
  );
}

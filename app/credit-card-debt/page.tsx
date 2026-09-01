import { Metadata } from "next";
import { LoanCalculator } from "@/components/LoanCalculator";
import { LeadForm } from "@/components/LeadForm";
import { FAQ } from "@/components/FAQ";

export const metadata: Metadata = {
  title: "Credit Card Debt Relief & Payoff Options | Credit Expert India",
  description: "Replace expensive 36%-42% p.a. revolving credit card interest with a structured lower-rate personal loan. Explore credit card debt payoff options.",
};

export default function CreditCardDebtPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-[#091328] py-16 text-white sm:py-24">
        <div className="container-narrow text-center">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400">
            CREDIT CARD PAYOFF ADVISORY
          </span>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-5xl leading-tight">
            Stop Paying 36%+ Revolving <br className="hidden sm:inline" />
            <span className="text-emerald-400">Credit Card Interest</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-base text-slate-300 leading-7">
            Revolving credit card minimum dues trap borrowers in debt. Replace high-cost card outstanding with a structured, lower-rate personal loan option.
          </p>
          <div className="mt-8 flex justify-center">
            <a
              href="#lead-form"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-emerald-500 px-8 text-xs font-extrabold text-slate-950 uppercase tracking-wider hover:bg-emerald-400 transition-colors shadow-lg"
            >
              Explore Payoff Options
            </a>
          </div>
        </div>
      </section>

      <LoanCalculator />
      <LeadForm />
      <FAQ />
    </main>
  );
}

import { Metadata } from "next";
import { LoanCalculator } from "@/components/LoanCalculator";
import { LeadForm } from "@/components/LeadForm";
import { FAQ } from "@/components/FAQ";
import { AnimatedMeshBackground } from "@/components/AnimatedMeshBackground";

export const metadata: Metadata = {
  title: "Credit Card Debt Relief & Payoff Options | Credit Expert India",
  description: "Replace expensive 36%-42% p.a. revolving credit card interest with a structured lower-rate personal loan. Explore credit card debt payoff options.",
};

export default function CreditCardDebtPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      
      <section className="relative w-full pt-32 pb-24 lg:pt-40 lg:pb-32 bg-background overflow-hidden border-b border-icy-blue">
        <div className="absolute inset-0 -z-10 h-full w-full">
          <AnimatedMeshBackground />
          <div className="absolute top-0 right-0 w-full h-full max-w-[60%] transform origin-top-right -skew-y-12 bg-gradient-to-bl from-[#E2D6CC]/40 to-transparent pointer-events-none" />
        </div>
        <div className="container-narrow text-center relative z-10">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-black/80">
            CREDIT CARD PAYOFF ADVISORY
          </span>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-5xl leading-tight text-brand-black">
            Stop Paying 36%+ Revolving <br className="hidden sm:inline" />
            <span className="text-brand-black/80">Credit Card Interest</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-base text-brand-black/80 font-medium leading-7">
            Revolving credit card minimum dues trap borrowers in debt. Replace high-cost card outstanding with a structured, lower-rate personal loan option.
          </p>
          <div className="mt-8 flex justify-center">
            <a
              href="#lead-form"
              className="inline-flex h-12 items-center justify-center rounded-full bg-slate-900 px-8 text-sm font-semibold text-white hover:bg-slate-800 transition-colors shadow-lg"
            >
              Explore Payoff Options
            </a>
          </div>
        </div>
      </section>

      <LoanCalculator />
      <LeadForm />
      <FAQ />
    </div>
  );
}

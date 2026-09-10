import { Metadata } from "next";
import { LoanCalculator } from "@/components/LoanCalculator";
import { Eligibility } from "@/components/Eligibility";
import { LeadForm } from "@/components/LeadForm";
import { AnimatedMeshBackground } from "@/components/AnimatedMeshBackground";

export const metadata: Metadata = {
  title: "Personal Loans for Salaried Staff from 9.95% p.a.* | Credit Expert India",
  description: "Check personal loan options for salaried professionals. Rates starting from 9.95% p.a.* with soft profile eligibility checks and partner bank network.",
};

export default function PersonalLoanPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      
      <section className="relative w-full pt-32 pb-24 lg:pt-40 lg:pb-32 bg-background overflow-hidden border-b border-slate-200">
        <div className="absolute inset-0 -z-10 h-full w-full">
          <AnimatedMeshBackground />
          <div className="absolute top-0 right-0 w-full h-full max-w-[60%] transform origin-top-right -skew-y-12 bg-gradient-to-bl from-[#E2D6CC]/40 to-transparent pointer-events-none" />
        </div>
        <div className="container-narrow text-center relative z-10">
          <span className="text-xs font-extrabold uppercase tracking-widest text-slate-600">
            SALARIED PERSONAL LOAN ADVISORY
          </span>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-5xl leading-tight text-slate-900">
            Personal Loans Starting From <br className="hidden sm:inline" />
            <span className="text-slate-600">9.95% p.a.* For Salaried Staff</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-base text-slate-600 font-medium leading-7">
            Explore fresh personal loan options based on your monthly income, corporate employer category, and credit score.
          </p>
          <div className="mt-8 flex justify-center">
            <a
              href="#lead-form"
              className="inline-flex h-12 items-center justify-center rounded-full bg-slate-900 px-8 text-sm font-semibold text-white hover:bg-slate-800 transition-colors shadow-lg"
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

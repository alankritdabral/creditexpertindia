import { Metadata } from "next";
import { LoanCalculator } from "@/components/LoanCalculator";
import { LeadForm } from "@/components/LeadForm";
import { AnimatedMeshBackground } from "@/components/AnimatedMeshBackground";

export const metadata: Metadata = {
  title: "High-Interest Loan Refinancing & Advisory | Credit Expert India",
  description: "Explore options to refinance high-rate personal loans and reduce monthly EMI burden with partner banks.",
};

export default function HighInterestLoanPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      
      <section className="relative w-full pt-32 pb-24 lg:pt-40 lg:pb-32 bg-background overflow-hidden border-b border-icy-blue">
        <div className="absolute inset-0 -z-10 h-full w-full">
          <AnimatedMeshBackground />
          <div className="absolute top-0 right-0 w-full h-full max-w-[60%] transform origin-top-right -skew-y-12 bg-gradient-to-bl from-[#E2D6CC]/40 to-transparent pointer-events-none" />
        </div>
        <div className="container-narrow text-center relative z-10">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-black/80">
            HIGH INTEREST REFINANCING
          </span>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-5xl leading-tight text-brand-black">
            Lower Expensive Interest Rates <br className="hidden sm:inline" />
            <span className="text-brand-black/80">On Active Personal Loans</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-base text-brand-black/80 font-medium leading-7">
            If your active loan rates exceed 16% p.a., evaluate whether refinancing or debt consolidation options across our partner banks can lower your monthly interest burden.
          </p>
          <div className="mt-8 flex justify-center">
            <a
              href="#lead-form"
              className="inline-flex h-12 items-center justify-center rounded-full bg-slate-900 px-8 text-sm font-semibold text-white hover:bg-slate-800 transition-colors shadow-lg"
            >
              Explore Lower Rates
            </a>
          </div>
        </div>
      </section>

      <LoanCalculator />
      <LeadForm />
    </div>
  );
}

import { Metadata } from "next";
import { FAQ } from "@/components/FAQ";
import { LeadForm } from "@/components/LeadForm";
import { AnimatedMeshBackground } from "@/components/AnimatedMeshBackground";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Credit Expert India",
  description: "Find answers to all common questions about debt consolidation, personal loans, interest rates, CIBIL score impact, and lender approval.",
};

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      
      <section className="relative w-full pt-32 pb-24 lg:pt-40 lg:pb-32 bg-background overflow-hidden border-b border-slate-200">
        <div className="absolute inset-0 -z-10 h-full w-full">
          <AnimatedMeshBackground />
          <div className="absolute top-0 right-0 w-full h-full max-w-[60%] transform origin-top-right -skew-y-12 bg-gradient-to-bl from-[#E2D6CC]/40 to-transparent pointer-events-none" />
        </div>
        <div className="container-narrow text-center relative z-10">
          <span className="text-xs font-extrabold uppercase tracking-widest text-slate-600">
            HELP CENTER
          </span>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl text-slate-900">
            Frequently Asked Questions
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-sm text-slate-600 font-medium">
            Clear, honest answers to the most common questions regarding loan options and debt advisory.
          </p>
        </div>
      </section>

      <FAQ />
      <LeadForm />
    </main>
  );
}

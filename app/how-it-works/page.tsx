import { Metadata } from "next";
import { HowItWorks } from "@/components/HowItWorks";
import { LeadForm } from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "How It Works | Credit Expert India Workflow",
  description: "Understand our 5-step process from soft profile assessment to lender evaluation and decision.",
};

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-[#091328] py-16 text-white sm:py-20">
        <div className="container-narrow text-center">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400">
            TRANSPARENT PROCESS
          </span>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            How Credit Expert India Works
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-sm text-slate-300">
            A step-by-step overview of how we assess your debt profile and facilitate applications with RBI-regulated lenders.
          </p>
        </div>
      </section>

      <HowItWorks />
      <LeadForm />
    </main>
  );
}

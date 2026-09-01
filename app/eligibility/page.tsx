import { Metadata } from "next";
import { Eligibility } from "@/components/Eligibility";
import { WhoWeHelp } from "@/components/WhoWeHelp";
import { LeadForm } from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Loan Eligibility Criteria & Document Requirements | Credit Expert India",
  description: "Check eligibility criteria and document requirements for salaried debt consolidation and personal loans.",
};

export default function EligibilityPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-[#091328] py-16 text-white sm:py-20">
        <div className="container-narrow text-center">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400">
            TRANSPARENT ADVISORY
          </span>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Loan Eligibility & Criteria Guidelines
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-sm text-slate-300">
            Clear guidelines on age, income, employment profile, and documentation required for salaried loan assessments.
          </p>
        </div>
      </section>

      <Eligibility />
      <WhoWeHelp />
      <LeadForm />
    </main>
  );
}

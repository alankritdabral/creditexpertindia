import { Metadata } from "next";
import { FAQ } from "@/components/FAQ";
import { LeadForm } from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Credit Expert India",
  description: "Find answers to all common questions about debt consolidation, personal loans, interest rates, CIBIL score impact, and lender approval.",
};

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-[#091328] py-16 text-white sm:py-20">
        <div className="container-narrow text-center">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400">
            HELP CENTER
          </span>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-sm text-slate-300">
            Clear, honest answers to the most common questions regarding loan options and debt advisory.
          </p>
        </div>
      </section>

      <FAQ />
      <LeadForm />
    </main>
  );
}

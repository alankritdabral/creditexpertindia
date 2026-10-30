import { Metadata } from "next";
import Image from "next/image";
import { Eligibility } from "@/components/Eligibility";
import { WhoWeHelp } from "@/components/WhoWeHelp";
import { EligibilityForm } from "@/components/EligibilityForm";

export const metadata: Metadata = {
  title: "Check Loan Eligibility & Required Documents",
  description: "Check eligibility criteria and document requirements for salaried debt consolidation and personal loans.",
  alternates: { canonical: "/eligibility" },
};

export default function EligibilityPage() {
  return (
    <div className="min-h-screen bg-slate-50">

      <section className="relative isolate w-full pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden border-b border-icy-blue">
        <div className="absolute inset-0 pointer-events-none z-0">
          <Image
            src="/eligibility.png"
            alt="Eligibility Hero Background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-right sm:object-[75%_center] opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/30 to-transparent" />
        </div>
        <div className="container-narrow text-center relative z-10">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-black/80">
            TRANSPARENT ADVISORY
          </span>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl text-brand-black">
            Loan Eligibility & Criteria Guidelines
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-sm text-brand-black/80 font-medium">
            Clear guidelines on age, income, employment profile, and documentation required for salaried loan assessments.
          </p>
          <div className="mt-8 flex justify-center">
            <a
              href="#credit-profile"
              className="inline-flex h-12 items-center justify-center rounded-full bg-slate-900 px-8 text-sm font-semibold text-white hover:bg-slate-800 transition-colors shadow-lg"
            >
              Check My Eligibility
            </a>
          </div>
        </div>
      </section>

      <Eligibility />
      <WhoWeHelp />
      <section id="credit-profile" className="py-16 sm:py-24 bg-white border-t border-icy-blue scroll-mt-20">
        <div className="container-narrow">
          <EligibilityForm />
        </div>
      </section>
    </div>
  );
}

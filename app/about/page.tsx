import { Metadata } from "next";
import { WhyUs } from "@/components/WhyUs";
import { LeadForm } from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "About Us | Credit Expert India",
  description: "Learn about Credit Expert India's mission to provide transparent debt advisory and consolidation assistance for salaried Indian professionals.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-[#091328] py-16 text-white sm:py-24">
        <div className="container-narrow text-center">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400">
            OUR MISSION
          </span>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-5xl leading-tight">
            Empowering Salaried Indians <br className="hidden sm:inline" />
            <span className="text-emerald-400">To Overcome Debt Traps</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-base text-slate-300 leading-7">
            Credit Expert India is a financial service platform facilitating debt consolidation and personal loan inquiries. We focus on conservative claims, transparent communication, and human guidance.
          </p>
        </div>
      </section>

      <WhyUs />
      <LeadForm />
    </main>
  );
}

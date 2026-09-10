import { Metadata } from "next";
import { WhyUs } from "@/components/WhyUs";
import { LeadForm } from "@/components/LeadForm";
import { AnimatedMeshBackground } from "@/components/AnimatedMeshBackground";

export const metadata: Metadata = {
  title: "About Us | Credit Expert India",
  description: "Learn about Credit Expert India's mission to provide transparent debt advisory and consolidation assistance for salaried Indian professionals.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      
      <section className="relative w-full pt-32 pb-24 lg:pt-40 lg:pb-32 bg-background overflow-hidden border-b border-slate-200">
        <div className="absolute inset-0 -z-10 h-full w-full">
          <AnimatedMeshBackground />
          <div className="absolute top-0 right-0 w-full h-full max-w-[60%] transform origin-top-right -skew-y-12 bg-gradient-to-bl from-[#E2D6CC]/40 to-transparent pointer-events-none" />
        </div>
        <div className="container-narrow text-center relative z-10">
          <span className="text-xs font-extrabold uppercase tracking-widest text-slate-600">
            OUR MISSION
          </span>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-5xl leading-tight text-slate-900">
            Empowering Salaried Indians <br className="hidden sm:inline" />
            <span className="text-slate-600">To Overcome Debt Traps</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-base text-slate-600 font-medium leading-7">
            Credit Expert India is a financial service platform facilitating debt consolidation and personal loan inquiries. We focus on conservative claims, transparent communication, and human guidance.
          </p>
        </div>
      </section>

      <WhyUs />
      <LeadForm />
    </main>
  );
}

import { Hero } from "@/components/Hero";
import { DebtCalculator } from "@/components/DebtCalculator";
import { TheProblem } from "@/components/TheProblem";
import { BeforeAfter } from "@/components/BeforeAfter";
import { DifferentApproach } from "@/components/DifferentApproach";
import { HowItWorks } from "@/components/HowItWorks";
import { CaseStudies } from "@/components/CaseStudies";
import { Partners } from "@/components/Partners";
import { ScamProtection } from "@/components/ScamProtection";
import { FAQ } from "@/components/FAQ";
import { LeadForm } from "@/components/LeadForm";

export default function Home() {
  return (
    <>
      <Hero />
      <Partners />
      <DebtCalculator />
      <TheProblem />
      <BeforeAfter />
      <DifferentApproach />
      <HowItWorks />
      <CaseStudies />
      <ScamProtection />
      <FAQ />
      <LeadForm />
    </>
  );
}

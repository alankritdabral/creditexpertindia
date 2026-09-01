import { Hero } from "@/components/Hero";
import { DebtCalculator } from "@/components/DebtCalculator";
import { TheProblem } from "@/components/TheProblem";
import { DifferentApproach } from "@/components/DifferentApproach";
import { HowItWorks } from "@/components/HowItWorks";
import { BeforeAfter } from "@/components/BeforeAfter";
import { Partners } from "@/components/Partners";
import { WhyUs } from "@/components/WhyUs";
import { FAQ } from "@/components/FAQ";
import { LeadForm } from "@/components/LeadForm";
import { ScamProtection } from "@/components/ScamProtection";

export default function Home() {
  return (
    <>
      <Hero />
      <Partners />
      <DebtCalculator />
      <TheProblem />
      <DifferentApproach />
      <HowItWorks />
      <BeforeAfter />
      <WhyUs />
      <ScamProtection />
      <FAQ />
      <LeadForm />
    </>
  );
}

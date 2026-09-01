import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { ProblemSection } from "@/components/ProblemSection";
import { Services } from "@/components/Services";
import { DebtConsolidation } from "@/components/DebtConsolidation";
import { LoanCalculator } from "@/components/LoanCalculator";
import { HowItWorks } from "@/components/HowItWorks";
import { WhyUs } from "@/components/WhyUs";
import { WhoWeHelp } from "@/components/WhoWeHelp";
import { Eligibility } from "@/components/Eligibility";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { LeadForm } from "@/components/LeadForm";
import { FinalCTA } from "@/components/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ProblemSection />
      <Services />
      <DebtConsolidation />
      <LoanCalculator />
      <HowItWorks />
      <WhyUs />
      <WhoWeHelp />
      <Eligibility />
      <LeadForm />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </>
  );
}

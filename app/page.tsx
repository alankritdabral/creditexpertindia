import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { WhatBringsYouHere } from "@/components/WhatBringsYouHere";
import { LoanCalculator } from "@/components/LoanCalculator";
import { DebtConsolidation } from "@/components/DebtConsolidation";
import { Services } from "@/components/Services";
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
      <WhatBringsYouHere />
      <LoanCalculator />
      <DebtConsolidation />
      <Services />
      <HowItWorks />
      <WhyUs />
      <WhoWeHelp />
      <Eligibility />
      <Testimonials />
      <FAQ />
      <LeadForm />
      <FinalCTA />
    </>
  );
}

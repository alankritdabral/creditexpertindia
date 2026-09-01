import { Hero } from "@/components/Hero";
import { DebtHealthCheck } from "@/components/DebtHealthCheck";
import { Partners } from "@/components/Partners";
import { TheProblem } from "@/components/TheProblem";
import { WhatWeHelpWith } from "@/components/WhatWeHelpWith";
import { WhatBringsYouHere } from "@/components/WhatBringsYouHere";
import { HowItWorks } from "@/components/HowItWorks";
import { DebtCalculator } from "@/components/DebtCalculator";
import { DifferentApproach } from "@/components/DifferentApproach";
import { BeforeAfter } from "@/components/BeforeAfter";
import { WhyUs } from "@/components/WhyUs";
import { CaseStudies } from "@/components/CaseStudies";
import { TrustBar } from "@/components/TrustBar";
import { FAQ } from "@/components/FAQ";
import { LeadForm } from "@/components/LeadForm";

export default function Home() {
  return (
    <>
      <Hero />
      <Partners />
      <DebtHealthCheck />
      <DifferentApproach />
      <DebtCalculator />
      <BeforeAfter />
      <WhyUs />
      <HowItWorks />
      <CaseStudies />
      <TrustBar />
      <FAQ />
      <LeadForm />
    </>
  );
}

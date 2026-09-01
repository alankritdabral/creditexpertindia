import { Hero } from "@/components/Hero";
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
      <TheProblem />
      <WhatWeHelpWith />
      <WhatBringsYouHere />
      <HowItWorks />
      <DebtCalculator />
      <DifferentApproach />
      <BeforeAfter />
      <WhyUs />
      <CaseStudies />
      <TrustBar />
      <FAQ />
      <LeadForm />
    </>
  );
}

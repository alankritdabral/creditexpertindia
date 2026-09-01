import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { WhatBringsYouHere } from "@/components/WhatBringsYouHere";
import { LoanCalculator } from "@/components/LoanCalculator";
import { HowItWorks } from "@/components/HowItWorks";
import { WhyUs } from "@/components/WhyUs";
import { FAQ } from "@/components/FAQ";
import { LeadForm } from "@/components/LeadForm";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <WhatBringsYouHere />
      <HowItWorks />
      <WhyUs />
      <LoanCalculator />
      <FAQ />
      <LeadForm />
    </>
  );
}

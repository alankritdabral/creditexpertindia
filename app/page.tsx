import type { Metadata } from "next";
import { HomeHero } from "@/components/sections/HomeHero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { IntentCards } from "@/components/sections/IntentCards";
import { Section, SectionHeader } from "@/components/ui/Section";
import { SavingsCalculator } from "@/components/sections/SavingsCalculator";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { SolutionsGrid } from "@/components/sections/SolutionsGrid";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { WhyUsSection } from "@/components/sections/WhyUsSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { LeadSection } from "@/components/sections/LeadSection";

export const metadata: Metadata = {
  title: { absolute: "Debt Consolidation & Personal Loans for Salaried Staff | Credit Expert India" },
  description:
    "Too many EMIs or high-interest dues? Explore debt consolidation, balance transfer and personal loan options for salaried applicants. Free initial assessment; the lender makes the final decision.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <HomeHero />
      <TrustStrip />
      <IntentCards />
      <Section bg="surface" id="calculator">
        <SectionHeader title="See how much you could save" lead="Enter what you owe and compare today's rate with a lower one. The result is an estimate, not an offer." />
        <div className="mt-10"><SavingsCalculator /></div>
      </Section>
      <BeforeAfter bg="page" />
      <SolutionsGrid bg="surface" />
      <ProcessSteps bg="page" />
      <WhyUsSection bg="surface" />
      <FaqSection bg="page" />
      <LeadSection source="home" />
    </>
  );
}

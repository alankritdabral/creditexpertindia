import { Metadata } from "next";
import { HowItWorks } from "@/components/HowItWorks";
import { LeadForm } from "@/components/LeadForm";
import { ProductHero } from "@/components/ProductHero";

export const metadata: Metadata = {
  title: "How It Works | Credit Expert India Workflow",
  description: "Understand our 5-step process from soft profile assessment to lender evaluation and decision.",
};

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-white">
      
      <ProductHero
        title="How we work, in plain words."
        body="A step-by-step look at how we go through your debt profile and help you apply with RBI-regulated lenders."
        cta="Start my free assessment"
        image="/Misty India Skyline with Orbital Arcs.webp"
        points={["Four simple steps", "You can stop at any point", "Nothing is pushed on you"]}
      />

      <HowItWorks />
      <LeadForm />
    </div>
  );
}

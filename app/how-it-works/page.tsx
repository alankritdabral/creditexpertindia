import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { HowItWorks } from "@/components/HowItWorks";
import { LeadForm } from "@/components/LeadForm";
import { ProductHero } from "@/components/ProductHero";
import { PageIntro, PageProof } from "@/components/page-sections/PageSections";

export const metadata: Metadata = buildMetadata({
  title: "How It Works",
  description:
    "Understand our 4-step process from soft profile assessment to lender evaluation and decision.",
  path: "/how-it-works",
});

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

      <PageIntro page="how-it-works" />

      <HowItWorks />
      <PageProof page="how-it-works" />
      <LeadForm />
    </div>
  );
}

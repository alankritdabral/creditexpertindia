import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { WhyUs } from "@/components/WhyUs";
import { LeadForm } from "@/components/LeadForm";
import { ProductHero } from "@/components/ProductHero";
import { PageIntro, PageProof } from "@/components/page-sections/PageSections";

export const metadata: Metadata = buildMetadata({
  title: "About Us",
  description:
    "Learn about Credit Expert India's mission to provide transparent debt advisory and consolidation assistance for salaried Indian professionals.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      
      <ProductHero
        title="We help salaried Indians out of debt traps."
        body="Credit Expert India helps people review their loans and explore consolidation and personal-loan options. We keep our claims modest and our communication honest, and there's always a human to talk to."
        cta="Talk to us"
        image="/Misty India Skyline with Orbital Arcs.webp"
        imageAlt="An Indian city skyline, representing Credit Expert India's nationwide service"
        points={["Human guidance", "Clear, jargon-free advice", "Your information handled responsibly"]}
      />

      <PageIntro page="about" />

      <WhyUs />
      <PageProof page="about" />
      <LeadForm />
    </div>
  );
}

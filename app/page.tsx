import { HeroGridBlock, HeroVisualBlock } from "@/components/HeroGridBlock";
import { SmartCalculator } from "@/components/SmartCalculator";
import { EligibilityForm } from "@/components/EligibilityForm";
import { HowItWorks } from "@/components/HowItWorks";
import { StoriesSection } from "@/components/StoriesSection";
import { ScamProtection } from "@/components/ScamProtection";
import { FAQ } from "@/components/FAQ";
import { AnimatedSection } from "@/components/AnimatedSection";

export default function Home() {
  return (
    <div className="w-full pt-[76px]">
      
      {/* Row 1: Hero & Visual/Video Block */}
      <section className="w-full bg-white border-t border-b border-icy-blue">
        <div className="max-w-[1220px] mx-auto grid grid-cols-1 lg:grid-cols-12 border-x border-icy-blue">
          <div className="lg:col-span-8">
            <HeroGridBlock />
          </div>
          <div className="hidden lg:block lg:col-span-4 bg-icy-blue">
            <HeroVisualBlock />
          </div>
        </div>
      </section>

      {/* Row 2: Stories Section */}
      <section className="w-full bg-white border-b border-icy-blue">
        <div className="max-w-[1220px] mx-auto p-8 md:py-16 md:px-12 border-x border-icy-blue">
          <StoriesSection />
        </div>
      </section>

      {/* Row 3: How it Works & Scam Protection */}
      <section className="w-full bg-white border-b border-icy-blue">
        <div className="max-w-[1220px] mx-auto grid grid-cols-1 lg:grid-cols-2 border-x border-icy-blue">
          <AnimatedSection className="p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-icy-blue">
            <HowItWorks />
          </AnimatedSection>
          <AnimatedSection className="p-8 md:p-12" delay={0.15}>
            <ScamProtection />
          </AnimatedSection>
        </div>
      </section>

      {/* Row 4: Calculator */}
      <section className="w-full bg-icy-blue border-b border-icy-blue">
        <div className="max-w-[1220px] mx-auto p-8 md:p-12 border-x border-icy-blue">
          <AnimatedSection>
            <SmartCalculator />
          </AnimatedSection>
        </div>
      </section>

      {/* Row 5: FAQ */}
      <section className="w-full bg-white border-b border-icy-blue">
        <div className="max-w-[1220px] mx-auto p-8 md:p-12 border-x border-icy-blue">
          <AnimatedSection>
            <div className="max-w-4xl mx-auto">
              <FAQ />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Row 6: Eligibility Form */}
      <section id="lead-form" className="w-full bg-icy-blue border-b border-icy-blue">
        <div className="max-w-[1220px] mx-auto p-8 md:p-12 border-x border-icy-blue">
          <AnimatedSection>
            <EligibilityForm />
          </AnimatedSection>
        </div>
      </section>

    </div>
  );
}

import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import { HeroGridBlock, HeroVisualBlock, HeroLogos } from "@/components/HeroGridBlock";
import { AnimatedSection } from "@/components/AnimatedSection";
import { LoanSolutionsSection } from "@/components/LoanSolutionsSection";
import { SectionRules, SectionDivider } from "@/components/SectionRules";

// Lazy load below-the-fold components
const SmartCalculator = dynamic(() => import("@/components/SmartCalculator").then(mod => mod.SmartCalculator));
const EligibilityForm = dynamic(() => import("@/components/EligibilityForm").then(mod => mod.EligibilityForm));
const HowItWorks = dynamic(() => import("@/components/HowItWorks").then(mod => mod.HowItWorks));
const ScamProtection = dynamic(() => import("@/components/ScamProtection").then(mod => mod.ScamProtection));
const FAQ = dynamic(() => import("@/components/FAQ").then(mod => mod.FAQ));
const NetworkStats = dynamic(() => import("@/components/NetworkStats").then(mod => mod.NetworkStats));
const EligibleLoansSlider = dynamic(() => import("@/components/EligibleLoansSlider").then(mod => mod.EligibleLoansSlider));
const ContactForm = dynamic(() => import("@/components/ContactForm").then(mod => mod.ContactForm));

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <SectionRules>

      {/* Row 1: Hero & Visual/Video Block */}
      <section className="relative w-full overflow-hidden pt-[40px] sm:pt-[76px] min-h-[400px] sm:h-auto sm:min-h-0 flex flex-col">
        {/* Background Image */}
        <div className="hero-skyline pointer-events-none">
          <Image
            src="/Misty India Skyline with Orbital Arcs.webp"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-bottom sm:object-center opacity-80"
            priority
          />
        </div>

        {/* Navbar / hero separator */}
        <div className="absolute inset-x-0 top-[60px] lg:top-[76px]">
          <SectionDivider />
        </div>

        <div className="relative max-w-[1220px] mx-auto grid grid-cols-1 lg:grid-cols-12 z-10">
          <div className="lg:col-span-6">
            <HeroGridBlock />
          </div>
          <div className="hidden lg:block lg:col-span-6 relative">
            <HeroVisualBlock />
          </div>
        </div>
        
        {/* Full width logos - Inside hero section to overlay on the background image */}
        <div className="relative z-20 mt-auto">
          <HeroLogos />
        </div>
      </section>

      <SectionDivider />
      {/* Row 1.5: Loan Solutions Section (New) */}
      <LoanSolutionsSection />

      <SectionDivider />
      {/* Row 1.6: Contact Form */}
      <section className="w-full bg-[#EAF3FF] py-16 md:py-24">
        <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <ContactForm />
          </AnimatedSection>
        </div>
      </section>


      <SectionDivider />
      {/* Row 2: Eligible Loans Slider (Redesigned) */}
      <div className="w-full bg-white">
        <EligibleLoansSlider />
      </div>

      <SectionDivider />
      {/* Row 2.5: Backbone stats */}
      <NetworkStats />

      <SectionDivider />
      {/* Row 3: How it Works & Scam Protection */}
      <AnimatedSection>
        <HowItWorks />
      </AnimatedSection>
      <AnimatedSection>
        <ScamProtection />
      </AnimatedSection>

      <SectionDivider />
      {/* Row 4: Calculator */}
      <section className="w-full">
        <AnimatedSection>
          <SmartCalculator />
        </AnimatedSection>
      </section>

      <SectionDivider />
      {/* Row 5: FAQ */}
      <section className="w-full bg-white">
        <div className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24">
          <AnimatedSection>
            <FAQ />
          </AnimatedSection>
        </div>
      </section>

      <SectionDivider />
      {/* Row 6: Eligibility Form */}
      <section id="lead-form" className="w-full bg-[#EAF3FF]">
        <div className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24">
          <AnimatedSection>
            <EligibilityForm />
          </AnimatedSection>
        </div>
      </section>

    </SectionRules>
  );
}

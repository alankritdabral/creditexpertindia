import dynamic from "next/dynamic";
import Image from "next/image";
import { HeroGridBlock, HeroVisualBlock, HeroLogos } from "@/components/HeroGridBlock";
import { AnimatedSection } from "@/components/AnimatedSection";
import { LoanSolutionsSection } from "@/components/LoanSolutionsSection";
import { DebtTypes } from "@/components/DebtTypes";

// Lazy load below-the-fold components
const SmartCalculator = dynamic(() => import("@/components/SmartCalculator").then(mod => mod.SmartCalculator));
const EligibilityForm = dynamic(() => import("@/components/EligibilityForm").then(mod => mod.EligibilityForm));
const HowItWorks = dynamic(() => import("@/components/HowItWorks").then(mod => mod.HowItWorks));
const ScamProtection = dynamic(() => import("@/components/ScamProtection").then(mod => mod.ScamProtection));
const FAQ = dynamic(() => import("@/components/FAQ").then(mod => mod.FAQ));
const EligibleLoansSlider = dynamic(() => import("@/components/EligibleLoansSlider").then(mod => mod.EligibleLoansSlider));
const ContactForm = dynamic(() => import("@/components/ContactForm").then(mod => mod.ContactForm));

export default function Home() {
  return (
    <div className="w-full">

      {/* Row 1: Hero & Visual/Video Block */}
      <section className="relative w-full border-t border-b border-slate-300 overflow-hidden pt-[40px] sm:pt-[76px] min-h-[400px] sm:h-auto sm:min-h-0 flex flex-col">
        {/* Background Image */}
        <div className="hero-skyline pointer-events-none">
          <Image
            src="/Misty India Skyline with Orbital Arcs.png"
            alt="Hero Background"
            fill
            sizes="100vw"
            className="object-cover object-bottom sm:object-center opacity-80"
            priority
          />
        </div>

        <div className="relative max-w-[1220px] mx-auto grid grid-cols-1 lg:grid-cols-12 border-x border-slate-300 z-10">
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

      {/* Row 1.5: Loan Solutions Section (New) */}
      <LoanSolutionsSection />

      {/* Row 1.6: Contact Form */}
      <section className="w-full bg-slate-50 border-b border-slate-300 py-12 md:py-20">
        <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <ContactForm />
          </AnimatedSection>
        </div>
      </section>

      {/* Row 1.6: Debt Types Image Section */}
      <DebtTypes />

      {/* Row 2: Eligible Loans Slider (Redesigned) */}
      <div className="w-full bg-white border-b border-slate-300">
        <EligibleLoansSlider />
      </div>

      {/* Row 3: How it Works & Scam Protection */}
      <section className="w-full bg-white border-b border-slate-300">
        <div className="max-w-[1220px] mx-auto grid grid-cols-1 lg:grid-cols-2 border-x border-slate-300">
          <AnimatedSection className="p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-slate-300">
            <HowItWorks />
          </AnimatedSection>
          <AnimatedSection className="p-8 md:p-12" delay={0.15}>
            <ScamProtection />
          </AnimatedSection>
        </div>
      </section>

      {/* Row 4: Calculator */}
      <section className="w-full bg-icy-blue border-b border-slate-300">
        <div className="max-w-[1220px] mx-auto p-8 md:p-12 border-x border-slate-300">
          <AnimatedSection>
            <SmartCalculator />
          </AnimatedSection>
        </div>
      </section>

      {/* Row 5: FAQ */}
      <section className="w-full bg-white border-b border-slate-300">
        <div className="max-w-[1220px] mx-auto p-8 md:p-12 border-x border-slate-300">
          <AnimatedSection>
            <div className="max-w-4xl mx-auto">
              <FAQ />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Row 6: Eligibility Form */}
      <section id="lead-form" className="w-full bg-icy-blue border-b border-slate-300">
        <div className="max-w-[1220px] mx-auto p-8 md:p-12 border-x border-slate-300">
          <AnimatedSection>
            <EligibilityForm />
          </AnimatedSection>
        </div>
      </section>

    </div>
  );
}

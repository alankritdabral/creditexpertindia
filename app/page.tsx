import { HeroGridBlock, HeroVisualBlock } from "@/components/HeroGridBlock";
import { DebtTypes } from "@/components/DebtTypes";
import { SmartCalculator } from "@/components/SmartCalculator";
import { EligibilityForm } from "@/components/EligibilityForm";
import { HowItWorks } from "@/components/HowItWorks";
import { CaseStudies } from "@/components/CaseStudies";
import { ScamProtection } from "@/components/ScamProtection";
import { FAQ } from "@/components/FAQ";

export default function Home() {
  return (
    <main className="w-full pt-[76px]">
      
      {/* Row 1: Hero & Visual/Video Block */}
      <section className="w-full bg-white border-t border-b border-slate-200">
        <div className="max-w-[1220px] mx-auto grid grid-cols-1 lg:grid-cols-12 border-x border-slate-200">
          <div className="lg:col-span-8 border-b lg:border-b-0 lg:border-r border-slate-200">
            <HeroGridBlock />
          </div>
          <div className="lg:col-span-4 bg-warm-bg">
            <HeroVisualBlock />
          </div>
        </div>
      </section>

      {/* Row 2: Debt Types */}
      <section className="w-full bg-warm-bg border-b border-slate-200">
        <div className="max-w-[1220px] mx-auto p-8 md:p-12 border-x border-slate-200">
          <DebtTypes />
        </div>
      </section>

      {/* Row 3: How it Works & Scam Protection */}
      <section className="w-full bg-white border-b border-slate-200">
        <div className="max-w-[1220px] mx-auto grid grid-cols-1 lg:grid-cols-2 border-x border-slate-200">
          <div className="p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-slate-200">
            <HowItWorks />
          </div>
          <div className="p-8 md:p-12">
            <ScamProtection />
          </div>
        </div>
      </section>

      {/* Row 4: Calculator */}
      <section className="w-full bg-warm-bg border-b border-slate-200">
        <div className="max-w-[1220px] mx-auto p-8 md:p-12 border-x border-slate-200">
          <SmartCalculator />
        </div>
      </section>

      {/* Row 5: FAQ & Case Studies */}
      <section className="w-full bg-white border-b border-slate-200">
        <div className="max-w-[1220px] mx-auto grid grid-cols-1 lg:grid-cols-12 border-x border-slate-200">
          <div className="lg:col-span-7 p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-slate-200">
            <FAQ />
          </div>
          <div className="lg:col-span-5 p-8 md:p-12">
            <CaseStudies />
          </div>
        </div>
      </section>

      {/* Row 6: Eligibility Form */}
      <section className="w-full bg-warm-bg border-b border-slate-200">
        <div className="max-w-[1220px] mx-auto p-8 md:p-12 border-x border-slate-200">
          <EligibilityForm />
        </div>
      </section>

    </main>
  );
}

import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { ProductHero } from "@/components/ProductHero";
import { Eligibility } from "@/components/Eligibility";
import { WhoWeHelp } from "@/components/WhoWeHelp";
import { EligibilityForm } from "@/components/EligibilityForm";

export const metadata: Metadata = buildMetadata({
  title: "Loan Eligibility Criteria & Documents",
  description:
    "Check eligibility criteria and document requirements for salaried debt consolidation and personal loans.",
  path: "/eligibility",
});

export default function EligibilityPage() {
  return (
    <div className="min-h-screen bg-white">

      <ProductHero
        title="Not sure if you qualify? Let's find out."
        body="Here's what lenders usually look at: age, income, employment and documents. Then check your own profile in a couple of minutes."
        cta="Check my eligibility"
        image="/eligibility.png"
        points={["Free to check", "No upload needed to start", "You decide what happens next"]}
        href="#credit-profile"
      />

      <Eligibility />
      <WhoWeHelp />
      <section id="credit-profile" className="py-16 md:py-24 bg-[#EAF3FF] scroll-mt-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <EligibilityForm />
        </div>
      </section>
    </div>
  );
}

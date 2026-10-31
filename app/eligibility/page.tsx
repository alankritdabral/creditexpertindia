import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { EligibilityForm } from "@/components/EligibilityForm";
import { eligibility, documents, whoWeHelp } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Check Loan Eligibility and Documents",
  description: "See typical eligibility criteria and documents for salaried personal loans and debt consolidation, then check your credit profile with your consent.",
  path: "/eligibility",
});

export default function EligibilityPage() {
  return (
    <>
      <PageHero title="Check your eligibility" lead="See the typical criteria and documents first. Then, if you choose, check your credit profile with your consent.">
        <ButtonLink href="#credit-profile" size="lg" className="mt-8">Check my credit profile</ButtonLink>
      </PageHero>
      <Section bg="page">
        <div className="grid gap-6 lg:grid-cols-3">
          <Card>
            <h2 className="text-xl font-bold">Typical criteria</h2>
            <ul className="mt-4 space-y-2.5">{eligibility.map((e) => (<li key={e} className="text-[15px] leading-6">{e}</li>))}</ul>
          </Card>
          <Card>
            <h2 className="text-xl font-bold">Documents you may need</h2>
            <ul className="mt-4 space-y-2.5">{documents.map((d) => (<li key={d} className="text-[15px] leading-6">{d}</li>))}</ul>
          </Card>
          <Card>
            <h2 className="text-xl font-bold">Who we help</h2>
            <ul className="mt-4 space-y-2.5">{whoWeHelp.map((w) => (<li key={w} className="text-[15px] leading-6">{w}</li>))}</ul>
          </Card>
        </div>
        <Disclaimer className="mt-6">Each lender sets its own criteria. Meeting these does not guarantee approval.</Disclaimer>
      </Section>
      <section id="credit-profile" className="scroll-mt-20 border-t border-line bg-surface py-12 lg:py-16">
        <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <EligibilityForm />
        </div>
      </section>
    </>
  );
}

import { PageHero } from "@/components/sections/PageHero";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { LeadSection } from "@/components/sections/LeadSection";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "How It Works",
  description: "Five clear steps from telling us your situation to the lender's decision. See what we do, what you do, and what the lender decides.",
  path: "/how-it-works",
});

export default function HowItWorksPage() {
  return (
    <>
      <PageHero title="How Credit Expert India works" lead="Five steps. You share your situation, we review your options, and the lender makes the final decision." />
      <ProcessSteps bg="page" title="The five steps" />
      <Section bg="surface">
        <div className="grid gap-6 md:grid-cols-3">
          <Card><h2 className="text-lg font-bold">What we do</h2><p className="mt-2 text-[15px] leading-6 text-ink-muted">Review your income and loans, explain your options in plain language, and help you prepare an application.</p></Card>
          <Card><h2 className="text-lg font-bold">What you do</h2><p className="mt-2 text-[15px] leading-6 text-ink-muted">Share accurate details, choose whether to go ahead, and read the lender's terms before you accept anything.</p></Card>
          <Card><h2 className="text-lg font-bold">What the lender decides</h2><p className="mt-2 text-[15px] leading-6 text-ink-muted">Whether to approve, at what rate, for what amount and for how long. We cannot promise any of these.</p></Card>
        </div>
      </Section>
      <LeadSection source="how-it-works" />
    </>
  );
}

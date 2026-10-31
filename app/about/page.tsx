import { Check } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { WhyUsSection } from "@/components/sections/WhyUsSection";
import { LeadSection } from "@/components/sections/LeadSection";
import { contact, facilitatorStatement, identity } from "@/lib/config";
import { pageMetadata } from "@/lib/seo";
import { whoWeHelp } from "@/content/site";

export const metadata = pageMetadata({
  title: "About Credit Expert India",
  description: "Who we are, who we help and how we work. A loan facilitator for salaried borrowers, with plain explanations and a person to talk to.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="Helping salaried Indians understand their borrowing options"
        lead="Credit Expert India helps people with several EMIs, high-interest dues or a new borrowing need explore their options. We keep claims conservative, explain costs plainly, and leave the final decision to the lender and to you."
      />
      <Section bg="page">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <h2 className="text-xl font-bold">Who we help</h2>
            <ul className="mt-4 space-y-3">
              {whoWeHelp.map((w) => (<li key={w} className="flex items-start gap-3 text-[15px] leading-6"><Check className="mt-0.5 h-5 w-5 shrink-0 text-success" aria-hidden="true" />{w}</li>))}
            </ul>
          </Card>
          <Card>
            <h2 className="text-xl font-bold">Who we are</h2>
            <dl className="mt-4 space-y-3 text-[15px] leading-6">
              <div><dt className="font-semibold">Name</dt><dd className="text-ink-muted">{identity.registeredName || contact.legalName}</dd></div>
              {identity.cin ? <div><dt className="font-semibold">CIN</dt><dd className="text-ink-muted">{identity.cin}</dd></div> : null}
              {identity.registeredAddress ? <div><dt className="font-semibold">Registered office</dt><dd className="text-ink-muted">{identity.registeredAddress}</dd></div> : null}
              <div><dt className="font-semibold">Offices</dt><dd className="space-y-1 text-ink-muted">{contact.addresses.map((a) => (<p key={a.city}>{a.city}: {a.fullAddress}</p>))}</dd></div>
            </dl>
            <p className="mt-4 border-t border-line pt-4 text-sm leading-[22px] text-ink-muted">{facilitatorStatement}</p>
          </Card>
        </div>
      </Section>
      <WhyUsSection bg="surface" />
      <LeadSection source="about" />
    </>
  );
}

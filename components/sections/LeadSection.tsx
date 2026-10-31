import { Check } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { ShortLeadForm } from "@/components/sections/ShortLeadForm";
import { trustBullets } from "@/content/site";

export function LeadSection({ source, title = "Ready to take control of your EMIs?", lead = "Tell us about your current loans or borrowing needs. We'll help you understand the options available for your profile.", defaultNeed }: { source: string; title?: string; lead?: string; defaultNeed?: string }) {
  return (
    <Section bg="tint" id="get-started">
      <div className="grid items-start gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div>
          <h2 className="text-[28px] font-bold leading-[34px] tracking-tight sm:text-4xl sm:leading-[42px]">{title}</h2>
          <p className="mt-4 text-base leading-7 text-ink-muted">{lead}</p>
          <ul className="mt-6 space-y-3">
            {trustBullets.map((b) => (
              <li key={b} className="flex items-center gap-2 text-[15px]"><Check className="h-5 w-5 text-success" aria-hidden="true" />{b}</li>
            ))}
          </ul>
          <div className="mt-8"><WhatsAppButton location={`lead-section-${source}`} size="lg" /></div>
        </div>
        <Card className="p-6 sm:p-8">
          <h3 className="mb-5 text-xl font-bold">Tell us what you need</h3>
          <ShortLeadForm source={source} defaultNeed={defaultNeed} />
        </Card>
      </div>
    </Section>
  );
}

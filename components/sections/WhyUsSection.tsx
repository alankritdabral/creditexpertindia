import { Building2, Eye, Headphones, Lock, X, type LucideIcon } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { whyUs } from "@/content/site";

const ICONS: Record<string, LucideIcon> = { building: Building2, lock: Lock, headphones: Headphones, eye: Eye };

const NEVER = [
  "Ask you to send money to a personal UPI ID",
  "Guarantee loan approval",
  "Guarantee a particular interest rate",
  "Present ourselves as a bank",
];

export function WhyUsSection({ bg = "page" }: { bg?: "page" | "surface" }) {
  return (
    <Section bg={bg} id="why-us">
      <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <SectionHeader title="Your finances deserve transparency." lead="Plain explanations, clear terms and a person to talk to." />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {whyUs.map((w) => {
              const Icon = ICONS[w.icon] || Building2;
              return (
                <li key={w.title}>
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary-soft text-primary"><Icon className="h-6 w-6" aria-hidden="true" /></span>
                  <h3 className="mt-4 text-lg font-bold">{w.title}</h3>
                  <p className="mt-1.5 text-[15px] leading-6 text-ink-muted">{w.desc}</p>
                </li>
              );
            })}
          </ul>
        </div>
        <Card tone="tint" className="self-start p-6 sm:p-8" aria-labelledby="scam-heading" as="section">
          <h3 id="scam-heading" className="text-xl font-bold">Before you share any documents</h3>
          <p className="mt-2 text-[15px] text-ink-muted">We will never:</p>
          <ul className="mt-4 space-y-3">
            {NEVER.map((n) => (
              <li key={n} className="flex items-start gap-3 text-[15px] font-medium leading-6">
                <X className="mt-0.5 h-5 w-5 shrink-0 text-danger" aria-hidden="true" />{n}
              </li>
            ))}
          </ul>
          <p className="mt-6 border-t border-line pt-4 font-semibold">Your final lender always makes the credit decision.</p>
        </Card>
      </div>
    </Section>
  );
}

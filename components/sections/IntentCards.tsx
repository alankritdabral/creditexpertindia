import { ArrowRight, Check } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { whatsBringsYouHere as w } from "@/content/site";

function Intent({ badge, title, desc, points, cta, href, primary }: { badge: string; title: string; desc: string; points: readonly string[]; cta: string; href: string; primary?: boolean }) {
  return (
    <Card tone={primary ? "highlight" : "plain"} className="flex flex-col p-6 sm:p-8">
      <Badge tone={primary ? "neutral" : "success"} className="self-start">{badge}</Badge>
      <h3 className="mt-4 text-2xl font-bold">{title}</h3>
      <p className="mt-2 text-base leading-7 text-ink-muted">{desc}</p>
      <ul className="mt-5 space-y-2.5">
        {points.map((p) => (
          <li key={p} className="flex items-start gap-2 text-[15px] leading-6">
            <Check className="mt-0.5 h-5 w-5 shrink-0 text-success" aria-hidden="true" />{p}
          </li>
        ))}
      </ul>
      <ButtonLink href={href} variant={primary ? "primary" : "secondary"} size="lg" className="mt-8 self-start">
        {cta}<ArrowRight className="h-5 w-5" aria-hidden="true" />
      </ButtonLink>
    </Card>
  );
}

export function IntentCards() {
  return (
    <Section bg="page" id="intent">
      <SectionHeader title={w.heading} lead={w.subheading} align="center" />
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <Intent badge="Existing debt" title={w.existingDebt.title} desc={w.existingDebt.desc} points={w.existingDebt.points} cta={w.existingDebt.cta} href={w.existingDebt.href} primary />
        <Intent badge="New borrowing" title={w.newLoan.title} desc={w.newLoan.desc} points={w.newLoan.points} cta={w.newLoan.cta} href={w.newLoan.href} />
      </div>
    </Section>
  );
}

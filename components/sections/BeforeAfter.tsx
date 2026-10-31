import { ArrowRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { formatINR } from "@/lib/utils";
import { getExampleScenario } from "@/lib/exampleScenario";
import { ctas } from "@/content/site";

export function BeforeAfter({ bg = "surface" }: { bg?: "surface" | "page" }) {
  const s = getExampleScenario();
  return (
    <Section bg={bg} id="example">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeader title="From several EMIs to one" lead="A worked example, calculated with the same formula as our calculator." />
        <Badge>Example, not an offer</Badge>
      </div>
      <div className="mt-10 grid items-stretch gap-4 lg:grid-cols-[1fr_auto_1fr]">
        <Card className="border-danger/30">
          <h3 className="text-lg font-bold text-danger">Before: {s.debts.length} EMIs</h3>
          <ul className="mt-4 divide-y divide-line">
            {s.debts.map((d) => (
              <li key={d.name} className="flex items-baseline justify-between gap-4 py-3">
                <span>
                  <span className="block font-semibold">{d.name}</span>
                  <span className="text-sm text-ink-muted">{formatINR(d.balance)} at {d.ratePercent}% a year</span>
                </span>
                <span className="num font-bold">{formatINR(Math.round(d.emi))}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 flex items-baseline justify-between border-t border-line pt-4">
            <span className="font-semibold">Total each month</span>
            <span className="num text-2xl font-bold text-danger">{formatINR(Math.round(s.currentEmi))}</span>
          </p>
        </Card>
        <div className="flex items-center justify-center" aria-hidden="true"><ArrowRight className="h-8 w-8 rotate-90 text-ink-muted lg:rotate-0" /></div>
        <Card className="border-success/30">
          <h3 className="text-lg font-bold text-success">After: 1 EMI</h3>
          <p className="mt-4 text-[15px] leading-6 text-ink-muted">
            One loan of {formatINR(s.balance)} at an assumed {s.newRatePercent}% a year over {s.newMonths} months.
          </p>
          <p className="mt-4 flex items-baseline justify-between border-t border-line pt-4">
            <span className="font-semibold">EMI each month</span>
            <span className="num text-2xl font-bold text-success">{formatINR(Math.round(s.newEmi))}</span>
          </p>
          <p className="mt-3 flex items-baseline justify-between">
            <span className="text-[15px] text-ink-muted">Possible difference each month</span>
            <span className="num font-bold">{formatINR(Math.round(s.monthlyDifference))}</span>
          </p>
          <p className="mt-2 flex items-baseline justify-between">
            <span className="text-[15px] text-ink-muted">Less interest over {s.newMonths} months</span>
            <span className="num font-bold">{formatINR(Math.round(s.interestSaved))}</span>
          </p>
        </Card>
      </div>
      <Disclaimer className="mt-6 max-w-3xl">
        Illustration only. It assumes all three debts have {s.newMonths} months left and excludes processing fees and taxes. The rate on a new loan depends on the lender, your income and your credit profile, and may be higher or lower.
      </Disclaimer>
      <ButtonLink href="#get-started" size="lg" className="mt-6">{ctas.primary}</ButtonLink>
    </Section>
  );
}

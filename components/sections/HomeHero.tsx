import { ArrowRight, Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { claims } from "@/lib/config";
import { formatINR } from "@/lib/utils";
import { getExampleScenario } from "@/lib/exampleScenario";
import { hero, ctas } from "@/content/site";

function ExampleCard() {
  const s = getExampleScenario();
  return (
    <div className="rounded-2xl border border-line bg-surface p-6 shadow-md sm:p-8">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-bold">How one EMI can look</h2>
        <Badge>Example</Badge>
      </div>
      <div className="mt-6 grid items-center gap-4 sm:grid-cols-[1fr_auto_1fr]">
        <div className="rounded-xl bg-danger-soft p-4">
          <p className="text-sm font-semibold text-danger">Today: {s.debts.length} EMIs</p>
          <p className="num mt-1 text-2xl font-bold text-ink">{formatINR(Math.round(s.currentEmi))}</p>
          <p className="text-sm text-ink-muted">a month</p>
        </div>
        <ArrowRight className="mx-auto h-6 w-6 rotate-90 text-ink-muted sm:rotate-0" aria-hidden="true" />
        <div className="rounded-xl bg-success-soft p-4">
          <p className="text-sm font-semibold text-success">After: 1 EMI</p>
          <p className="num mt-1 text-2xl font-bold text-ink">{formatINR(Math.round(s.newEmi))}</p>
          <p className="text-sm text-ink-muted">a month</p>
        </div>
      </div>
      <p className="mt-5 text-sm leading-6 text-ink-muted">
        {formatINR(s.balance)} owed across a card, a personal loan and an app loan, compared with one loan at an assumed {s.newRatePercent}% a year over {s.newMonths} months. Not an offer: your rate depends on the lender and your profile.
      </p>
    </div>
  );
}

export function HomeHero() {
  return (
    <section className="bg-surface">
      <div className="mx-auto grid w-full max-w-[1200px] items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:px-8 lg:py-20">
        <div>
          <h1 className="text-[40px] font-bold leading-[44px] tracking-tight sm:text-5xl sm:leading-[56px] lg:text-[56px] lg:leading-[60px]">
            {hero.headline}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-ink-muted">{hero.subheadline}</p>
          <p className="mt-4 text-base font-semibold text-success">{hero.highlight}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#get-started" size="lg">{ctas.primary}<ArrowRight className="h-5 w-5" aria-hidden="true" /></ButtonLink>
            <ButtonLink href="#calculator" variant="secondary" size="lg">{ctas.tertiary}</ButtonLink>
          </div>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {hero.bullets.map((b) => (
              <li key={b} className="flex items-center gap-2 text-[15px] text-ink">
                <Check className="h-5 w-5 shrink-0 text-success" aria-hidden="true" />
                {b}
              </li>
            ))}
          </ul>
          <div className="mt-6"><WhatsAppButton location="hero" variant="tertiary" label={ctas.secondary} /></div>
          <Disclaimer className="mt-6 max-w-xl">{claims.disclaimerShort}</Disclaimer>
        </div>
        <ExampleCard />
      </div>
    </section>
  );
}

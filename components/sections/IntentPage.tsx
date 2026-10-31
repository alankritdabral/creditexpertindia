import Link from "next/link";
import { Check, Minus } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { JsonLd } from "@/components/seo/JsonLd";
import { SavingsCalculator } from "@/components/sections/SavingsCalculator";
import { EmiCalculator } from "@/components/sections/EmiCalculator";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { FaqSection } from "@/components/sections/FaqSection";
import { LeadSection } from "@/components/sections/LeadSection";
import { claims } from "@/lib/config";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { ctas, documents, eligibility } from "@/content/site";
import { intentPages, type IntentPageContent } from "@/content/pages";

export function IntentPage({ page }: { page: IntentPageContent }) {
  const related = intentPages.filter((p) => p.slug !== page.slug).slice(0, 3);
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: page.name, path: page.path }])} />
      <JsonLd data={faqJsonLd(page.faqs)} />

      <section className="bg-surface">
        <div className="mx-auto w-full max-w-[1200px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <nav aria-label="Breadcrumb" className="text-sm text-ink-muted">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="hover:text-primary">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-ink">{page.name}</li>
            </ol>
          </nav>
          <h1 className="mt-6 max-w-3xl text-[36px] font-bold leading-[42px] tracking-tight sm:text-5xl sm:leading-[56px]">{page.h1}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-ink-muted">{page.lead}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#get-started" size="lg">{ctas.primary}</ButtonLink>
            <ButtonLink href="#calculator" variant="secondary" size="lg">{ctas.tertiary}</ButtonLink>
          </div>
          <Disclaimer className="mt-6 max-w-2xl">{claims.disclaimerShort}</Disclaimer>
        </div>
      </section>

      <Section bg="page">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <h2 className="text-xl font-bold">It may suit you if</h2>
            <ul className="mt-4 space-y-3">
              {page.suits.map((s) => (<li key={s} className="flex items-start gap-3 text-[15px] leading-6"><Check className="mt-0.5 h-5 w-5 shrink-0 text-success" aria-hidden="true" />{s}</li>))}
            </ul>
          </Card>
          <Card>
            <h2 className="text-xl font-bold">It may not make sense if</h2>
            <ul className="mt-4 space-y-3">
              {page.notSuits.map((s) => (<li key={s} className="flex items-start gap-3 text-[15px] leading-6"><Minus className="mt-0.5 h-5 w-5 shrink-0 text-danger" aria-hidden="true" />{s}</li>))}
            </ul>
          </Card>
        </div>
      </Section>

      <Section bg="surface" id="calculator">
        <SectionHeader title={page.tool === "emi" ? "Estimate your EMI" : "Estimate the difference"} lead={page.tool === "emi" ? "Change the amount, rate and tenure to see the monthly EMI. The rate is an example." : "Compare what you pay today with a lower rate. The result is an estimate, not an offer."} />
        <div className="mt-10">{page.tool === "emi" ? <EmiCalculator /> : <SavingsCalculator />}</div>
      </Section>

      {page.showExample ? <BeforeAfter bg="page" /> : null}

      <Section bg={page.showExample ? "surface" : "page"}>
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <h2 className="text-xl font-bold">Typical criteria</h2>
            <ul className="mt-4 space-y-2.5">{eligibility.map((e) => (<li key={e} className="text-[15px] leading-6">{e}</li>))}</ul>
            <Disclaimer className="mt-4">Every lender sets its own criteria. Meeting these does not guarantee approval.</Disclaimer>
          </Card>
          <Card>
            <h2 className="text-xl font-bold">Documents you may need</h2>
            <ul className="mt-4 space-y-2.5">{documents.map((d) => (<li key={d} className="text-[15px] leading-6">{d}</li>))}</ul>
            <Disclaimer className="mt-4">The lender confirms the exact list when you apply. We never ask you to send money.</Disclaimer>
          </Card>
        </div>
      </Section>

      <ProcessSteps bg={page.showExample ? "page" : "surface"} />
      <FaqSection items={page.faqs} bg={page.showExample ? "surface" : "page"} />

      <Section bg="page">
        <h2 className="text-xl font-bold">Also explore</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-3">
          {related.map((r) => (
            <li key={r.slug}><Link href={r.path} className="flex min-h-[44px] items-center rounded-lg border border-line bg-surface px-4 font-semibold text-primary hover:bg-primary-soft">{r.name}</Link></li>
          ))}
        </ul>
      </Section>

      <LeadSection source={page.slug} defaultNeed={page.defaultNeed} />
    </>
  );
}

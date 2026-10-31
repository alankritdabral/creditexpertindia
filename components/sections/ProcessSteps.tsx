import { Section, SectionHeader } from "@/components/ui/Section";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { howItWorks } from "@/content/site";

export function ProcessSteps({ bg = "surface", title = "How it works" }: { bg?: "surface" | "page"; title?: string }) {
  return (
    <Section bg={bg} id="how-it-works">
      <SectionHeader title={title} lead="Five steps, and you stay in control. The lender makes the final decision." />
      <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
        {howItWorks.map((s) => (
          <li key={s.step} className="relative rounded-xl border border-line bg-surface p-5">
            <span className="num flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">{s.step}</span>
            <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
            <p className="mt-2 text-[15px] leading-6 text-ink-muted">{s.desc}</p>
          </li>
        ))}
      </ol>
      <Disclaimer className="mt-6">Credit Expert India does not approve loans and cannot guarantee approval, a rate or a loan amount.</Disclaimer>
    </Section>
  );
}

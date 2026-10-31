import Link from "next/link";
import { ArrowLeftRight, ArrowRight, CreditCard, IndianRupee, Layers, Smartphone, TrendingDown, type LucideIcon } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { services } from "@/content/site";

const ICONS: Record<string, LucideIcon> = {
  "credit-card": CreditCard,
  consolidation: Layers,
  "high-interest": TrendingDown,
  "app-loans": Smartphone,
  "personal-loan": IndianRupee,
  "balance-transfer": ArrowLeftRight,
};

export function SolutionsGrid({ bg = "page", title = "How can we help?" }: { bg?: "page" | "surface"; title?: string }) {
  return (
    <Section bg={bg} id="solutions">
      <SectionHeader title={title} lead="Six ways we help you explore your options. Each page explains who may qualify and what to expect." />
      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => {
          const Icon = ICONS[s.id] || Layers;
          return (
            <li key={s.id}>
              <Link href={s.href} className="block h-full rounded-xl">
                <Card interactive className="flex h-full flex-col">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary-soft text-primary"><Icon className="h-6 w-6" aria-hidden="true" /></span>
                  <h3 className="mt-4 text-xl font-bold">{s.title}</h3>
                  <p className="mt-2 flex-1 text-[15px] leading-6 text-ink-muted">{s.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1 font-semibold text-primary">Learn more<ArrowRight className="h-4 w-4" aria-hidden="true" /><span className="sr-only"> about {s.title}</span></span>
                </Card>
              </Link>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}

"use client";

import { Section, SectionHeader } from "@/components/ui/Section";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqs } from "@/content/site";

type Item = { q: string; a: string };

export function FaqSection({ items = faqs, bg = "surface", title = "Questions people ask us" }: { items?: readonly Item[]; bg?: "surface" | "page"; title?: string }) {
  return (
    <Section bg={bg} id="faq">
      <SectionHeader title={title} />
      <Accordion type="single" collapsible className="mt-10 max-w-3xl">
        {items.map((f, i) => (
          <AccordionItem key={f.q} value={`q-${i}`}>
            <AccordionTrigger className="min-h-[44px] text-base text-ink">{f.q}</AccordionTrigger>
            <AccordionContent>{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  );
}

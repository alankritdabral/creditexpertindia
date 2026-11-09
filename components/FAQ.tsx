'use client';
import { usePathname } from "next/navigation";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TrackedAccordion } from "@/components/analytics/TrackedAccordion";
import { siteFaqs as faqs } from "@/content/faq";

export function FAQ() {
  const pathname = usePathname();
  const faqSet = pathname === "/faq" ? "faq" : "home";
  return (
    <div id="faq" className="@container w-full text-[#0A2540]">
      <div className="grid grid-cols-1 @3xl:grid-cols-[5fr_7fr] gap-8 @3xl:gap-16">
        <div className="@3xl:sticky @3xl:top-28 self-start">
          <h2 className="text-[48px] sm:text-[56px] @3xl:text-[56px] leading-[1.0] tracking-[-0.04em] font-bold">
            You&apos;re probably wondering&hellip;
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-[#0A2540] max-w-sm">
            These are the questions people ask us before anything else. We&apos;ve answered them
            straight.
          </p>
        </div>

        <TrackedAccordion faqSet={faqSet} type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem
              value={`item-${index}`}
              key={index}
              className="border-b-0 mb-2 px-4 md:px-6 data-[state=open]:bg-[#e6eefb] transition-colors"
            >
              <AccordionTrigger className="hover:no-underline text-left gap-6 py-5 group">
                <span className="text-[21px] md:text-[26px] leading-snug font-semibold tracking-[-0.015em] text-[#0A2540] group-hover:text-[#0052CC] transition-colors">
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-6 pr-8">
                <p className="text-base md:text-lg leading-relaxed text-[#0A2540] max-w-xl">
                  {faq.answer}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </TrackedAccordion>
      </div>
    </div>
  );
}

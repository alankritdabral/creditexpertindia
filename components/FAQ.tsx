'use client';
import { usePathname } from "next/navigation";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TrackedAccordion } from "@/components/analytics/TrackedAccordion";
import { siteFaqs as faqs } from "@/content/faq";
import { contact } from "@/lib/config";

export function FAQ() {
  const pathname = usePathname();
  const faqSet = pathname === "/faq" ? "faq" : "home";
  return (
    <div id="faq" className="@container w-full text-[#2E2E2E]">
      <div className="grid grid-cols-1 @3xl:grid-cols-[5fr_7fr] gap-8 @3xl:gap-16">
        <div className="@3xl:sticky @3xl:top-28 self-start">
          <h2 className="text-[48px] sm:text-[56px] @3xl:text-[56px] leading-[1.0] tracking-[-0.04em] font-bold">
            You&apos;re probably wondering&hellip;
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-[#2E2E2E] max-w-sm">
            These are the questions people ask us before anything else. We&apos;ve answered them
            straight.
          </p>
          <div className="mt-8 max-w-sm bg-[#2E2E2E] text-white p-6 rounded-xl border-2 border-[#2E2E2E] shadow-[6px_6px_0_0_#FF5A00]">
            <p className="text-xl font-extrabold tracking-[-0.02em]">Still have a question?</p>
            <p className="mt-2 text-base text-[#D4D4D4]">Talk to a credit specialist. It&apos;s free, and there&apos;s no pressure.</p>
            <a href={`tel:${contact.whatsapp.replace(/[^+0-9]/g, "")}`} className="mt-4 inline-flex items-center h-11 px-5 bg-[#FF5A00] text-[#2E2E2E] font-bold rounded">
              {contact.whatsapp}
            </a>
          </div>
        </div>

        <TrackedAccordion faqSet={faqSet} type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem
              value={`item-${index}`}
              key={index}
              className="border-2 border-[#2E2E2E] bg-white rounded-xl mb-3 px-4 md:px-6 data-[state=open]:bg-[#F7E0D4] transition-colors"
            >
              <AccordionTrigger className="hover:no-underline text-left gap-6 py-5 group">
                <span className="text-[21px] md:text-[26px] leading-snug font-semibold tracking-[-0.015em] text-[#2E2E2E] group-hover:text-[#E04F00] transition-colors">
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-6 pr-8">
                <p className="text-base md:text-lg leading-relaxed text-[#2E2E2E] max-w-xl">
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

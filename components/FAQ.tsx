'use client';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What does Credit Expert India do?",
    answer: "We help customers understand their existing debt or borrowing requirements and explore suitable loan, consolidation or repayment options based on their situation."
  },
  {
    question: "Can you help with multiple loans?",
    answer: "Yes. We can review multiple loans and EMIs together and help you understand whether consolidation or another option may be suitable."
  },
  {
    question: "Can you help with credit-card debt?",
    answer: "We can review your credit-card dues and help you understand potential repayment or consolidation options available based on your situation."
  },
  {
    question: "Do you guarantee loan approval?",
    answer: "No. Final approval, interest rate, loan amount and tenure are decided by the respective lender based on its eligibility criteria."
  },
  {
    question: "Do you guarantee lower interest rates?",
    answer: "No. Rates depend on your profile, lender policies and prevailing terms. We help you explore suitable options."
  },
  {
    question: "Is the assessment free?",
    answer: "The initial assessment can be offered without obligation. Any applicable charges, if any, should always be communicated clearly before proceeding."
  },
  {
    question: "Will taking another loan always help?",
    answer: "No. A new loan isn't always the right solution. We first look at the existing situation and then discuss relevant options."
  }
];

export function FAQ() {
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

        <Accordion type="single" collapsible className="w-full">
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
        </Accordion>
      </div>
    </div>
  );
}

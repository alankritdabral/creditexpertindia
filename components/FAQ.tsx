'use client';
import { motion, Variants } from 'framer-motion';
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

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export function FAQ() {
  return (
    <div id="faq" className="w-full h-full flex flex-col">
      <div className="mb-10 text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-brand-black mb-2">
          Questions, answered.
        </h2>
        <p className="text-sm text-brand-black/70">Common questions about loan consolidation and how we help.</p>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        <Accordion type="single" collapsible className="w-full divide-y divide-slate-100">
          {faqs.map((faq, index) => (
            <motion.div variants={itemVariants} key={index}>
              <AccordionItem value={`item-${index}`} className="border-b-0 py-2">
                <AccordionTrigger className="hover:no-underline [&[data-state=open]>span]:text-blue-energy group text-brand-black">
                  <div className="flex-1 px-4 text-center">
                    <span className="text-base font-bold leading-7 group-hover:text-blue-energy transition-colors">{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="mt-2 text-center px-8">
                  <p className="text-sm leading-relaxed text-brand-black/70 font-medium py-1 max-w-2xl mx-auto bg-slate-50 rounded-lg p-4">
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </motion.div>
    </div>
  );
}

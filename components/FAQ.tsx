'use client';
import { Disclosure, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

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
    <div id="faq" className="w-full h-full flex flex-col">
      <div className="mb-10 text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-text-main mb-2">
          Questions, answered.
        </h2>
        <p className="text-sm text-text-muted">Common questions about loan consolidation and how we help.</p>
      </div>

      <div className="divide-y divide-slate-100">
        {faqs.map((faq, index) => (
          <Disclosure as="div" key={index} className="py-5">
            {({ open }: { open: boolean }) => (
              <>
                <dt>
                  <Disclosure.Button className="flex w-full items-center justify-between text-text-main group">
                    <div className="flex-1 px-4 text-center">
                      <span className="text-base font-bold leading-7 group-hover:text-brand-blue transition-colors">{faq.question}</span>
                    </div>
                    <span className="flex h-7 items-center shrink-0">
                      <ChevronDownIcon
                        className={`${open ? '-rotate-180 text-brand-blue' : 'rotate-0 text-slate-400'} h-5 w-5 transform transition duration-200 ease-in-out`}
                        aria-hidden="true"
                      />
                    </span>
                  </Disclosure.Button>
                </dt>
                <Transition
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Disclosure.Panel as="dd" className="mt-4 text-center px-8">
                    <p className="text-sm leading-relaxed text-text-muted font-medium py-1 max-w-2xl mx-auto bg-slate-50 rounded-lg p-4">{faq.answer}</p>
                  </Disclosure.Panel>
                </Transition>
              </>
            )}
          </Disclosure>
        ))}
      </div>
    </div>
  );
}

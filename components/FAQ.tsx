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
    <section id="faq" className="py-24 sm:py-32 bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Questions, answered simply.
          </h2>
        </div>

        <div className="mx-auto max-w-3xl divide-y divide-slate-200">
          {faqs.map((faq, index) => (
            <Disclosure as="div" key={index} className="py-6">
              {({ open }: { open: boolean }) => (
                <>
                  <dt>
                    <Disclosure.Button className="flex w-full items-start justify-between text-left text-slate-900">
                      <span className="text-lg font-semibold leading-7">{faq.question}</span>
                      <span className="ml-6 flex h-7 items-center">
                        <ChevronDownIcon
                          className={`${open ? '-rotate-180' : 'rotate-0'} h-6 w-6 transform transition duration-200 ease-in-out text-slate-400`}
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
                    <Disclosure.Panel as="dd" className="mt-4 pr-12">
                      <p className="text-base leading-7 text-slate-600 font-light border-l-2 border-slate-200 pl-4 py-1">{faq.answer}</p>
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

const SCENARIOS = [
  {
    id: "cards-pl",
    name: "Credit Cards + Personal Loan",
    before: [
      { name: "HDFC Credit Card Dues", emi: "₹14,500", rate: "42% p.a." },
      { name: "Personal Loan EMI", emi: "₹12,000", rate: "16% p.a." },
      { name: "SBI Card Min Due", emi: "₹8,500", rate: "40% p.a." },
    ],
    beforeTotal: "₹35,000",
    beforeDates: "3 Scattered Due Dates",
    afterEmi: "₹21,800",
    savingsMo: "₹13,200",
    afterRate: "10.5% p.a.*",
  },
  {
    id: "apps",
    name: "Fintech & Instant Loans",
    before: [
      { name: "Short Term App Loan A", emi: "₹11,000", rate: "36% p.a." },
      { name: "App Loan B", emi: "₹9,500", rate: "45% p.a." },
      { name: "Salary Advance Dues", emi: "₹8,000", rate: "30% p.a." },
    ],
    beforeTotal: "₹28,500",
    beforeDates: "Multiple Weekly/Monthly Deadlines",
    afterEmi: "₹17,200",
    savingsMo: "₹11,300",
    afterRate: "11.0% p.a.*",
  },
  {
    id: "multiple-emis",
    name: "4 High-Rate EMIs",
    before: [
      { name: "Personal Loan 1", emi: "₹16,000", rate: "18% p.a." },
      { name: "Consumer Durable EMI", emi: "₹6,500", rate: "24% p.a." },
      { name: "Personal Loan 2", emi: "₹12,500", rate: "19% p.a." },
      { name: "Credit Card Dues", emi: "₹10,000", rate: "42% p.a." },
    ],
    beforeTotal: "₹45,000",
    beforeDates: "4 Scattered Due Dates",
    afterEmi: "₹28,900",
    savingsMo: "₹16,100",
    afterRate: "10.25% p.a.*",
  },
];

export function DebtConsolidation() {
  const [activeScenario, setActiveScenario] = useState(SCENARIOS[0]);

  return (
    <section id="debt-consolidation" className="bg-white text-[#0A2540]">
      <div className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24">
        <h2 className="text-[40px] sm:text-[56px] leading-[1.02] tracking-[-0.04em] font-bold max-w-3xl">
          Here&apos;s what it could look like.
        </h2>
        <p className="mt-5 text-lg md:text-xl leading-relaxed text-[#3C4F69] max-w-2xl">
          Pick the situation closest to yours. These are examples, not offers, but they show how
          scattered payments can become one.
        </p>

        <div className="mt-8 flex flex-wrap gap-2" role="tablist">
          {SCENARIOS.map((s) => (
            <button
              key={s.id}
              role="tab"
              aria-selected={activeScenario.id === s.id}
              onClick={() => setActiveScenario(s)}
              className={`rounded px-5 py-3 text-base font-semibold transition-colors cursor-pointer ${
                activeScenario.id === s.id
                  ? "bg-[#0052CC] text-white"
                  : "bg-[#EAF3FF] text-[#0A2540] hover:bg-[#d6e4fa]"
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="bg-[#EAF3FF] p-7 md:p-9">
            <h3 className="text-2xl md:text-[32px] font-bold tracking-[-0.02em]">Today, you juggle:</h3>
            <ul className="mt-6 divide-y divide-[#E2E8F0]">
              {activeScenario.before.map((item) => (
                <li key={item.name} className="flex items-baseline justify-between gap-4 py-3.5">
                  <span className="text-lg">
                    {item.name} <span className="text-[#3C4F69]">({item.rate})</span>
                  </span>
                  <span className="text-lg font-bold">{item.emi}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-lg">
              That&apos;s <b>{activeScenario.beforeTotal}</b> a month, with {activeScenario.beforeDates.toLowerCase()}.
            </p>
          </div>

          <div className="bg-[#0A2540] text-white p-7 md:p-9">
            <h3 className="text-2xl md:text-[32px] font-bold tracking-[-0.02em]">As one loan, maybe:</h3>
            <p className="mt-6 text-[56px] md:text-[56px] font-bold tracking-[-0.04em] leading-none">
              {activeScenario.afterEmi}
              <span className="text-xl font-medium text-[#BFDBFE] tracking-normal"> a month*</span>
            </p>
            <p className="mt-4 text-lg text-[#BFDBFE]">
              That&apos;s about <b className="text-[#BFDBFE]">{activeScenario.savingsMo}</b> less every month, at a rate around {activeScenario.afterRate}
            </p>
            <ul className="mt-6 space-y-2 text-lg text-[#BFDBFE]">
              <li>One due date every month, easy to track.</li>
              <li>A lower yearly interest rate.</li>
              <li>Less pressure on your credit score from high card balances.</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-6 justify-between">
          <p className="text-sm text-[#3C4F69] max-w-xl">
            Illustrative examples only. Final terms are set by partner lenders after checking your profile.
          </p>
          <a
            href="#lead-form"
            data-analytics-cta="debt_consolidation_check_options"
            data-analytics-location="debt_consolidation_scenarios"
            className="inline-flex items-center justify-center gap-2 rounded bg-[#0052CC] hover:bg-[#0A2540] transition-colors text-white font-bold text-lg px-7 py-4"
          >
            Check my options <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
}

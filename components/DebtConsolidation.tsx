"use client";
import { useState } from "react";
import { ArrowRight, Check, Info, TrendingDown, ArrowDown } from "lucide-react";
import { claims } from "@/lib/config";

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
    <section id="debt-consolidation" className="bg-slate-50 py-16 sm:py-20 border-b border-slate-200">
      <div className="container-narrow">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
            DEBT CONSOLIDATION ADVISORY
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900">
            Consolidate Multiple Scattered EMIs Into One Structured Repayment
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-6 max-w-2xl mx-auto">
            Compare representative borrowing scenarios below to see how consolidating high-cost liabilities can reduce total monthly outgo.
          </p>
        </div>

        {/* Scenario Tabs */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {SCENARIOS.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveScenario(s)}
              className={`rounded-lg px-4 py-2 text-xs font-bold transition-all ${
                activeScenario.id === s.id
                  ? "bg-[#091328] text-white shadow-sm"
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>

        {/* Comparison Table Grid */}
        <div className="mx-auto mt-8 grid max-w-5xl gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
          {/* Current Status Box */}
          <div className="rounded-xl border border-slate-300 bg-white p-6 shadow-2xs">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <span className="text-[11px] font-bold text-red-600 uppercase tracking-wider">BEFORE CONSOLIDATION</span>
                <p className="text-sm font-bold text-slate-900">Scattered High-Cost Obligations</p>
              </div>
              <span className="rounded bg-red-50 px-2.5 py-1 text-[10px] font-bold text-red-700 border border-red-200">
                HIGH INTEREST
              </span>
            </div>

            <div className="mt-4 space-y-2.5">
              {activeScenario.before.map((item) => (
                <div key={item.name} className="flex items-center justify-between rounded-lg bg-slate-50 p-3 border border-slate-200">
                  <div>
                    <div className="text-xs font-bold text-slate-900">{item.name}</div>
                    <div className="text-[10px] text-red-600 font-semibold">{item.rate}</div>
                  </div>
                  <span className="text-xs font-bold text-slate-900">{item.emi}</span>
                </div>
              ))}

              <div className="mt-4 rounded-lg bg-slate-900 p-4 text-white">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-300">Total Monthly Outflow</span>
                  <span className="text-base font-extrabold text-red-400">{activeScenario.beforeTotal}</span>
                </div>
                <div className="mt-1 text-[10px] text-slate-400 font-medium">
                  • {activeScenario.beforeDates}
                </div>
              </div>
            </div>
          </div>

          {/* Conversion Indicator */}
          <div className="flex flex-col items-center justify-center gap-1.5 py-2 lg:py-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#091328] text-emerald-400 shadow-md">
              <ArrowRight className="hidden lg:block h-5 w-5" />
              <ArrowDown className="lg:hidden h-5 w-5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              OPTIMIZE
            </span>
          </div>

          {/* Optimized Consolidated Box */}
          <div className="rounded-xl border-2 border-emerald-500 bg-white p-6 shadow-md">
            <div className="flex items-center justify-between border-b border-emerald-100 pb-3">
              <div>
                <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">AFTER CONSOLIDATION</span>
                <p className="text-sm font-bold text-slate-900">Single Low-Rate Plan</p>
              </div>
              <span className="rounded bg-emerald-600 px-2.5 py-1 text-[10px] font-bold text-white">
                1 EASY EMI
              </span>
            </div>

            <div className="mt-4 space-y-4">
              <div className="rounded-lg bg-emerald-50/70 p-4 text-center border border-emerald-200">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                  ESTIMATED CONSOLIDATED EMI
                </span>
                <div className="mt-1 text-2xl font-extrabold text-emerald-700">
                  {activeScenario.afterEmi} <span className="text-xs font-normal text-slate-600">/ month*</span>
                </div>
                <div className="mt-1.5 inline-flex items-center gap-1 text-xs font-bold text-emerald-800">
                  <TrendingDown className="h-3.5 w-3.5" /> Save ~{activeScenario.savingsMo} per month*
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-700 font-medium">
                {[
                  "One single due date every month — simplified tracking",
                  `Interest rate optimization down to ~${activeScenario.afterRate}`,
                  "Help protect credit score by eliminating high revolving credit card balances",
                ].map((benefit) => (
                  <div key={benefit} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mx-auto mt-6 flex max-w-3xl items-start gap-2.5 rounded-lg bg-white p-3.5 border border-slate-200 text-slate-600">
          <Info className="h-4 w-4 shrink-0 text-slate-500 mt-0.5" />
          <p className="text-xs leading-5">
            <span className="font-semibold text-slate-900">Disclosure:</span> {claims.disclaimerFull} Figures above are illustrative scenario estimates for salaried profiles. Final terms are set by partner lenders.
          </p>
        </div>

        <div className="mt-8 text-center">
          <a
            href="#lead-form"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#091328] px-7 text-xs font-bold uppercase tracking-wider text-white shadow-md hover:bg-slate-800 transition-all"
          >
            <span>Check My Consolidation Options</span>
            <ArrowRight className="h-4 w-4 text-emerald-400" />
          </a>
        </div>
      </div>
    </section>
  );
}

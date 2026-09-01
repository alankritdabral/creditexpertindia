"use client";
import { useMemo, useState } from "react";
import { Info, Calculator, TrendingDown, ArrowRight, ShieldCheck, PieChart } from "lucide-react";
import { claims } from "@/lib/config";
import { formatINR } from "@/lib/utils";
import { calculateEMI } from "@/lib/calculator";

export function LoanCalculator() {
  const [existingLoan, setExistingLoan] = useState(500000);
  const [cc, setCC] = useState(150000);
  const [currentEMI, setCurrentEMI] = useState(35000);
  const [currentRate, setCurrentRate] = useState(18);
  const [tenure, setTenure] = useState(60);
  const [illustrativeRate, setIllustrativeRate] = useState(10.5);

  const totalPrincipal = existingLoan + cc;
  const illustrativeEMI = useMemo(
    () => calculateEMI(totalPrincipal, illustrativeRate, tenure),
    [totalPrincipal, illustrativeRate, tenure]
  );
  const diff = currentEMI - illustrativeEMI;
  const totalCurrent = currentEMI * tenure;
  const totalNew = illustrativeEMI * tenure;
  const totalSavedOverTenure = Math.max(0, totalCurrent - totalNew);

  return (
    <section id="calculator" className="bg-[#F8FAFC] py-16 sm:py-24 border-b border-slate-200">
      <div className="container-narrow">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
            DATA-DRIVEN INSIGHTS
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
            Smarter decisions start with <span className="text-blue-600">clear data.</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-7 max-w-2xl mx-auto font-medium">
            Estimate your potential monthly EMI reduction and tenure savings by consolidating high-cost loans into a structured personal loan.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-8 lg:grid-cols-2 lg:items-start">
          {/* Controls Panel */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Input Your Current Obligations
              </h3>
              <span className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
                Total Debt: {formatINR(totalPrincipal)}
              </span>
            </div>

            <div className="space-y-5">
              <Slider
                label="Total Outstanding Loan Amount"
                value={existingLoan}
                min={50000}
                max={2000000}
                step={10000}
                onChange={setExistingLoan}
                display={formatINR(existingLoan)}
              />
              <Slider
                label="Credit Card Dues / App Loans"
                value={cc}
                min={0}
                max={1000000}
                step={5000}
                onChange={setCC}
                display={formatINR(cc)}
              />
              <Slider
                label="Current Monthly EMI Outflow"
                value={currentEMI}
                min={5000}
                max={120000}
                step={1000}
                onChange={setCurrentEMI}
                display={formatINR(currentEMI)}
              />
              <Slider
                label="Current Interest Rate (% p.a.)"
                value={currentRate}
                min={8}
                max={36}
                step={0.5}
                onChange={setCurrentRate}
                display={`${currentRate}%`}
              />
              <Slider
                label="Remaining Tenure (Months)"
                value={tenure}
                min={12}
                max={84}
                step={12}
                onChange={setTenure}
                display={`${tenure} Months (${tenure / 12} Yrs)`}
              />

              <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-5 mt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-900">
                    Target Consolidated Rate
                  </span>
                  <span className="text-xs font-bold text-blue-800 bg-white px-3 py-1 rounded-md border border-blue-200 shadow-sm">
                    {illustrativeRate}% p.a.*
                  </span>
                </div>
                <input
                  type="range"
                  min={9.5}
                  max={16}
                  step={0.25}
                  value={illustrativeRate}
                  onChange={(e) => setIllustrativeRate(parseFloat(e.target.value))}
                  className="mt-3 w-full h-2 appearance-none rounded-full bg-slate-200 accent-blue-600 cursor-pointer"
                />
                <p className="mt-2 text-[11px] text-slate-500 font-medium">
                  Indicative rate based on partner bank salaried eligibility (starting from 9.95% p.a.*).
                </p>
              </div>
            </div>
          </div>

          {/* Output Panel */}
          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Illustrative Savings Summary
                </h3>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold text-slate-500">
                  ESTIMATE ONLY
                </span>
              </div>

              {/* Side by side EMI */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-slate-50 p-5 text-center border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">CURRENT EMI</span>
                  <div className="mt-2 text-2xl font-black text-slate-900 line-through decoration-red-500">
                    {formatINR(currentEMI)}
                  </div>
                  <span className="mt-1 block text-[10px] text-slate-400 font-medium">Scattered due dates</span>
                </div>

                <div className="rounded-2xl bg-slate-900 p-5 text-center text-white shadow-lg">
                  <span className="text-[10px] font-bold text-blue-400 uppercase block">POTENTIAL EMI</span>
                  <div className="mt-2 text-2xl font-black text-white">
                    {formatINR(Math.round(illustrativeEMI))}
                  </div>
                  <span className="mt-1 block text-[10px] text-slate-400 font-medium">1 Consolidated EMI*</span>
                </div>
              </div>

              {/* Monthly Savings Highlight */}
              <div className="mt-4 rounded-2xl bg-blue-600 p-6 text-white text-center shadow-lg shadow-blue-600/20">
                <span className="text-[11px] font-bold uppercase tracking-widest text-blue-100 block">
                  Potential Monthly Difference
                </span>
                <div className="mt-2 text-4xl font-black">
                  ~{formatINR(Math.round(diff))} <span className="text-sm font-medium opacity-80">/ month*</span>
                </div>
                <div className="mt-4 text-xs text-blue-100 font-medium border-t border-blue-500/50 pt-3">
                  Potential cumulative savings over {tenure} months: <span className="font-bold text-white">{formatINR(Math.round(totalSavedOverTenure))}</span>*
                </div>
              </div>

              {/* Action Call */}
              <a
                href="#lead-form"
                className="mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-slate-900 text-sm font-bold uppercase tracking-wider text-white hover:bg-slate-800 transition-all shadow-md"
              >
                <span>Get My Free Assessment</span>
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                  <ArrowRight className="h-3 w-3" />
                </div>
              </a>

              <p className="mt-5 text-center text-[10px] text-slate-400 leading-relaxed font-medium">
                *Results shown above are illustrative estimates for guidance only. Actual savings, approval, rates and tenure are determined by respective lending partners based on borrower credit verification.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  display,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  display: string;
}) {
  return (
    <label className="block">
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold text-slate-700">{label}</span>
        <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-900">
          {display}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="mt-1.5 w-full h-2 appearance-none rounded bg-slate-200 accent-emerald-600 cursor-pointer"
      />
    </label>
  );
}

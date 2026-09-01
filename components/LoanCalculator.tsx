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
    <section id="calculator" className="bg-white py-16 sm:py-24 border-b border-slate-200">
      <div className="container-narrow">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">
            EMI SAVINGS CALCULATOR
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            See How Much You Could Save
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-7 max-w-2xl mx-auto">
            Estimate your potential monthly EMI reduction and tenure savings by consolidating high-cost loans into a structured personal loan.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-8 lg:grid-cols-2 lg:items-start">
          {/* Controls Panel */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-md space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                1. Input Your Current Obligations
              </h3>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                Total Debt: {formatINR(totalPrincipal)}
              </span>
            </div>

            <div className="space-y-4">
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

              <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-900">
                    TARGET CONSOLIDATED RATE
                  </span>
                  <span className="text-xs font-extrabold text-emerald-800 bg-white px-2.5 py-1 rounded border border-emerald-300">
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
                  className="mt-2.5 w-full h-2 appearance-none rounded bg-slate-200 accent-emerald-600 cursor-pointer"
                />
                <p className="mt-1.5 text-[11px] text-slate-600 font-medium">
                  Indicative rate based on partner bank salaried eligibility (starting from 9.95% p.a.*).
                </p>
              </div>
            </div>
          </div>

          {/* Output Panel */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-md">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  2. Illustrative Savings Summary
                </h3>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-extrabold text-slate-600">
                  ESTIMATE ONLY
                </span>
              </div>

              {/* Side by side EMI */}
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-slate-100 p-4 text-center border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-600 uppercase block">CURRENT EMI</span>
                  <div className="mt-1 text-xl font-extrabold text-slate-900 line-through decoration-red-500">
                    {formatINR(currentEMI)}
                  </div>
                  <span className="text-[10px] text-slate-500">Scattered due dates</span>
                </div>

                <div className="rounded-xl bg-[#091328] p-4 text-center text-white">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase block">POTENTIAL EMI</span>
                  <div className="mt-1 text-xl font-black text-white">
                    {formatINR(Math.round(illustrativeEMI))}
                  </div>
                  <span className="text-[10px] text-slate-300">1 Consolidated EMI*</span>
                </div>
              </div>

              {/* Monthly Savings Highlight */}
              <div className="mt-4 rounded-xl bg-emerald-600 p-5 text-white text-center shadow-md">
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-100 block">
                  POTENTIAL MONTHLY DIFFERENCE
                </span>
                <div className="mt-1 text-3xl font-black">
                  ~{formatINR(Math.round(diff))} <span className="text-sm font-normal">/ month*</span>
                </div>
                <div className="mt-2 text-xs text-emerald-100 font-medium border-t border-emerald-500/60 pt-2">
                  Potential cumulative savings over {tenure} months: <span className="font-bold underline">{formatINR(Math.round(totalSavedOverTenure))}</span>*
                </div>
              </div>

              {/* Action Call */}
              <a
                href="#lead-form"
                className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#091328] text-xs font-extrabold uppercase tracking-wider text-white hover:bg-slate-800 transition-all shadow-md"
              >
                <span>GET MY FREE ASSESSMENT →</span>
              </a>

              <p className="mt-4 text-center text-[10px] text-slate-500 leading-4">
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

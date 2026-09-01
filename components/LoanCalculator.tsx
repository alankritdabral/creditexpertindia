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

  const totalInterestNew = Math.max(0, totalNew - totalPrincipal);
  const principalPercent = Math.round((totalPrincipal / totalNew) * 100) || 50;

  return (
    <section id="calculator" className="bg-white py-16 sm:py-20 border-b border-slate-200">
      <div className="container-narrow">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
            FINANCIAL MODELING
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900">
            Interactive EMI Savings Simulator
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-6 max-w-2xl mx-auto">
            Calculate your estimated monthly EMI savings and total tenure interest reduction.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-8 lg:grid-cols-2 lg:items-start">
          {/* Controls Panel */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-2xs space-y-5">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                1. Input Existing Liabilities
              </h3>
              <span className="text-xs font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded">
                Total: {formatINR(totalPrincipal)}
              </span>
            </div>

            <div className="space-y-4">
              <Slider
                label="Existing Personal Loans"
                value={existingLoan}
                min={50000}
                max={2000000}
                step={10000}
                onChange={setExistingLoan}
                display={formatINR(existingLoan)}
              />
              <Slider
                label="Credit Card Outstandings"
                value={cc}
                min={0}
                max={1000000}
                step={5000}
                onChange={setCC}
                display={formatINR(cc)}
              />
              <Slider
                label="Total Current Monthly EMI"
                value={currentEMI}
                min={5000}
                max={120000}
                step={1000}
                onChange={setCurrentEMI}
                display={formatINR(currentEMI)}
              />
              <Slider
                label="Current Interest Rate (%)"
                value={currentRate}
                min={8}
                max={36}
                step={0.5}
                onChange={setCurrentRate}
                display={`${currentRate}%`}
              />
              <Slider
                label="Loan Tenure (Months)"
                value={tenure}
                min={12}
                max={84}
                step={12}
                onChange={setTenure}
                display={`${tenure} Months (${tenure / 12} Yrs)`}
              />

              <div className="rounded-lg border border-emerald-200 bg-emerald-50/60 p-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                    TARGET CONSOLIDATED RATE
                  </span>
                  <span className="text-xs font-extrabold text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-200">
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
                  className="mt-2 w-full h-2 appearance-none rounded bg-slate-200 accent-emerald-600 cursor-pointer"
                />
                <p className="mt-1 text-[11px] text-slate-600 font-medium">
                  Starting from 9.95% p.a.* for eligible salaried profiles.
                </p>
              </div>
            </div>
          </div>

          {/* Output Panel */}
          <div className="space-y-6">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-2xs">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  2. Estimated Savings Analysis
                </h3>
                <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700">
                  INDICATIVE
                </span>
              </div>

              {/* Side by side EMI */}
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-slate-100 p-3.5 text-center border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-600 uppercase block">Current Outflow</span>
                  <div className="mt-1 text-lg font-bold text-slate-900 line-through decoration-red-500">
                    {formatINR(currentEMI)}
                  </div>
                  <span className="text-[10px] text-slate-500">@ {currentRate}% avg</span>
                </div>

                <div className="rounded-lg bg-[#091328] p-3.5 text-center text-white">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase block">New Outflow</span>
                  <div className="mt-1 text-lg font-extrabold text-white">
                    {formatINR(Math.round(illustrativeEMI))}
                  </div>
                  <span className="text-[10px] text-slate-300">@ {illustrativeRate}% rate*</span>
                </div>
              </div>

              {/* Monthly Savings Highlight */}
              <div className="mt-4 rounded-lg bg-emerald-600 p-4 text-white text-center shadow">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-100 block">
                  ESTIMATED MONTHLY SAVINGS
                </span>
                <div className="mt-0.5 text-2xl font-black">
                  ~{formatINR(Math.round(diff))} <span className="text-xs font-normal">/ month*</span>
                </div>
                <div className="mt-1 text-xs text-emerald-100">
                  Cumulative savings over {tenure} months: <span className="font-bold underline">{formatINR(Math.round(totalSavedOverTenure))}</span>*
                </div>
              </div>

              {/* Action Call */}
              <a
                href="#lead-form"
                className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#091328] text-xs font-bold uppercase tracking-wider text-white hover:bg-slate-800 transition-all shadow"
              >
                <span>GET MY DETAILED ANALYSIS</span>
                <ArrowRight className="h-4 w-4 text-emerald-400" />
              </a>

              <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                <span>100% Confidential • Soft Eligibility Assessment</span>
              </div>
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

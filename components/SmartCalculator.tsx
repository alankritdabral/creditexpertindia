"use client";

import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Slider } from "@/components/ui/slider";

export function SmartCalculator() {
  const [principal, setPrincipal] = useState(500000);
  const [rate, setRate] = useState(10.5);
  const [tenure, setTenure] = useState(60); // months

  // Calculate EMI
  const monthlyRate = (rate / 12) / 100;
  let emi = 0;
  if (rate === 0) {
    emi = tenure > 0 ? Math.round(principal / tenure) : 0;
  } else {
    emi = tenure > 0 
      ? Math.round((principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / (Math.pow(1 + monthlyRate, tenure) - 1))
      : 0;
  }
  
  const totalPayment = emi * tenure;
  const totalInterest = Math.max(0, totalPayment - principal);

  // Calculate potential savings if rate > 9.99
  const baseRate = 9.99;
  let savings = 0;
  let baseEmi = 0;
  if (rate > baseRate) {
    const baseMonthlyRate = (baseRate / 12) / 100;
    baseEmi = tenure > 0 
      ? Math.round((principal * baseMonthlyRate * Math.pow(1 + baseMonthlyRate, tenure)) / (Math.pow(1 + baseMonthlyRate, tenure) - 1))
      : 0;
    const baseTotalPayment = baseEmi * tenure;
    savings = Math.max(0, totalPayment - baseTotalPayment);
  }

  const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

  const field = (
    label: string,
    display: string,
    slider: React.ReactNode,
    min: string,
    max: string
  ) => (
    <div className="mb-9">
      <div className="flex items-baseline justify-between gap-4 mb-4">
        <label className="text-lg font-medium text-[#0A2540]">{label}</label>
        <span className="text-[32px] md:text-[32px] font-bold tracking-[-0.03em] text-[#0A2540]">{display}</span>
      </div>
      {slider}
      <div className="flex justify-between text-sm text-[#3C4F69] mt-2">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );

  return (
    <div id="calculator" className="w-full grid grid-cols-1 lg:grid-cols-[5fr_7fr] text-[#0A2540]">
      {/* Left: the human part */}
      <div className="bg-[#0052CC] text-white px-4 md:px-10 lg:pl-[max(2rem,calc((100vw-1220px)/2+2rem))] lg:pr-14 py-14 md:py-20">
        <h2 className="text-[40px] sm:text-[56px] lg:text-[56px] leading-[1.02] tracking-[-0.04em] font-bold">
          What would your EMI look like?
        </h2>
        <p className="mt-6 text-lg md:text-xl leading-relaxed text-[#BFDBFE] max-w-md">
          Move the sliders until it matches your loan. This is the same quick maths we do ourselves
          before we ever pick up the phone.
        </p>
        <a
          href="#lead-form"
          className="mt-9 inline-flex items-center gap-2 rounded bg-white text-[#0052CC] font-bold text-lg px-7 py-4 hover:bg-[#0A2540] hover:text-white transition-colors"
        >
          Talk to us instead <ArrowRight className="w-5 h-5" />
        </a>
        <p className="mt-10 text-sm text-[#b8ccff] max-w-sm leading-relaxed">
          These are estimates only. Your actual EMI and rate depend on the lender and on your
          eligibility.
        </p>
      </div>

      {/* Right: sliders and the answer */}
      <div className="bg-[#f3f7fd] px-4 md:px-10 lg:pr-[max(2rem,calc((100vw-1220px)/2+2rem))] lg:pl-14 py-14 md:py-20">
        {field(
          "How much is the loan?",
          inr(principal),
          <Slider
            min={50000} max={10000000} step={50000}
            value={[principal]} onValueChange={(val) => setPrincipal(val[0])}
            className="py-2 cursor-pointer"
            showTooltip
            tooltipContent={(val) => inr(val)}
          />,
          "₹50K",
          "₹1Cr+"
        )}
        {field(
          "What interest are you paying?",
          `${rate.toFixed(1)}%`,
          <Slider
            min={5} max={30} step={0.1}
            value={[rate]} onValueChange={(val) => setRate(val[0])}
            className="py-2 cursor-pointer"
            showTooltip
            tooltipContent={(val) => `${val}%`}
          />,
          "5%",
          "30%"
        )}
        {field(
          "Over how long?",
          tenure >= 24 && tenure % 12 === 0 ? `${tenure / 12} years` : `${tenure} months`,
          <Slider
            min={6} max={360} step={1}
            value={[tenure]} onValueChange={(val) => setTenure(val[0])}
            className="py-2 cursor-pointer"
            showTooltip
            tooltipContent={(val) => `${val} mo`}
          />,
          "6 months",
          "30 years"
        )}

        <div className="bg-[#0A2540] text-white p-7 md:p-9 mt-2" aria-live="polite">
          <p className="text-[#BFDBFE] text-base">You&apos;d pay about</p>
          <p className="text-[48px] md:text-[56px] font-bold tracking-[-0.04em] leading-none mt-1">
            {inr(emi)}
            <span className="text-xl font-medium text-[#BFDBFE] tracking-normal"> a month</span>
          </p>
          <p className="mt-5 text-base md:text-lg leading-relaxed text-[#BFDBFE]">
            That&apos;s {inr(totalPayment)} over the whole loan, and {inr(totalInterest)} of it is
            interest.
          </p>
          {savings > 0 ? (
            <p className="mt-5 pt-5 border-t border-white/15 text-base md:text-lg leading-relaxed">
              At 9.99%*, your EMI could be around{" "}
              <b className="text-[#BFDBFE]">{inr(baseEmi)}</b>. That&apos;s roughly{" "}
              <b className="text-[#BFDBFE]">{inr(savings)}</b> saved overall.
            </p>
          ) : (
            <p className="mt-5 pt-5 border-t border-white/15 text-base md:text-lg leading-relaxed">
              Your rate is already close to the lowest we usually see. Nice.
            </p>
          )}
        </div>
        <p className="mt-4 text-sm text-[#3C4F69]">*Indicative only, subject to lender approval.</p>
      </div>
    </div>
  );
}

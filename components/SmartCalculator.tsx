"use client";

import React, { useState } from "react";
import { ArrowRight, AlertCircle, PieChart } from "lucide-react";
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

  return (
    <div id="calculator" className="w-full h-full flex flex-col justify-between">
      <div className="mb-10 text-center md:text-left">
        <h2 className="section-title text-brand-black mb-4">EMI Calculator</h2>
        <p className="text-lg text-brand-black/70 max-w-2xl mx-auto md:mx-0">
          Calculate your monthly EMI, total interest, and total amount payable.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 w-full">
        {/* Inputs */}
        <div className="lg:col-span-7 bg-icy-blue rounded-3xl p-6 md:p-8 border border-icy-blue/60 flex flex-col justify-center">
          
          <div className="space-y-8">
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-semibold text-brand-black/70">Loan Amount</label>
                <div className="relative flex items-center shadow-sm">
                  <span className="absolute left-3 font-bold text-slate-400">₹</span>
                  <input 
                    type="number" 
                    value={principal}
                    onChange={(e) => setPrincipal(Number(e.target.value))}
                    className="w-[140px] bg-white border border-icy-blue rounded-lg py-1.5 pl-7 pr-3 font-bold text-blue-energy focus:ring-2 focus:ring-blue-energy outline-none transition-shadow text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
              </div>
              <Slider 
                min={50000} max={10000000} step={50000}
                value={[principal]} onValueChange={(val) => setPrincipal(val[0])}
                className="py-2"
                showTooltip
                tooltipContent={(val) => `₹${val.toLocaleString('en-IN')}`}
              />
              <div className="flex justify-between text-xs text-brand-black/50 mt-1 font-medium">
                <span>₹50K</span>
                <span>₹1Cr+</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-semibold text-brand-black/70">Interest Rate (p.a.)</label>
                <div className="relative flex items-center shadow-sm">
                  <input 
                    type="number" 
                    value={rate}
                    step="0.1"
                    onChange={(e) => setRate(Number(e.target.value))}
                    className="w-[100px] bg-white border border-icy-blue rounded-lg py-1.5 pl-3 pr-8 font-bold text-blue-energy focus:ring-2 focus:ring-blue-energy outline-none transition-shadow text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <span className="absolute right-3 font-bold text-slate-400">%</span>
                </div>
              </div>
              <Slider 
                min={5} max={30} step={0.1}
                value={[rate]} onValueChange={(val) => setRate(val[0])}
                className="py-2"
                showTooltip
                tooltipContent={(val) => `${val}%`}
              />
               <div className="flex justify-between text-xs text-brand-black/50 mt-1 font-medium">
                <span>5%</span>
                <span>30%</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-semibold text-brand-black/70">Loan Tenure</label>
                <div className="relative flex items-center shadow-sm">
                  <input 
                    type="number" 
                    value={tenure}
                    onChange={(e) => setTenure(Number(e.target.value))}
                    className="w-[100px] bg-white border border-icy-blue rounded-lg py-1.5 pl-3 pr-10 font-bold text-blue-energy focus:ring-2 focus:ring-blue-energy outline-none transition-shadow text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <span className="absolute right-3 font-bold text-slate-400">mo</span>
                </div>
              </div>
              <Slider 
                min={6} max={360} step={1}
                value={[tenure]} onValueChange={(val) => setTenure(val[0])}
                className="py-2"
                showTooltip
                tooltipContent={(val) => `${val} mo`}
              />
               <div className="flex justify-between text-xs text-brand-black/50 mt-1 font-medium">
                <span>6 Months</span>
                <span>30 Years</span>
              </div>
            </div>

          </div>
        </div>

        {/* Outputs */}
        <div className="lg:col-span-5 bg-[#0A2540] rounded-3xl p-6 md:p-8 text-white flex flex-col justify-between shadow-2xl relative overflow-hidden">
          {/* Decorative BG */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-energy/30 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-8">Your EMI Details</h3>
            
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                <p className="text-blue-200 text-sm font-semibold uppercase tracking-widest mb-2">Monthly EMI</p>
                <p className="text-4xl md:text-5xl font-extrabold tracking-tight">₹{emi.toLocaleString('en-IN')}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-xl p-5 border border-white/10 backdrop-blur-sm">
                  <p className="text-blue-200 text-xs font-semibold uppercase tracking-widest mb-2">Total Interest</p>
                  <p className="text-xl font-bold">₹{totalInterest.toLocaleString('en-IN')}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-5 border border-white/10 backdrop-blur-sm">
                  <p className="text-blue-200 text-xs font-semibold uppercase tracking-widest mb-2">Total Payable</p>
                  <p className="text-xl font-bold">₹{totalPayment.toLocaleString('en-IN')}</p>
                </div>
              </div>

              {savings > 0 && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-5 text-emerald-400 font-semibold text-center backdrop-blur-sm shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                  Potential Savings at 9.99%: <br className="sm:hidden"/> 
                  <span className="text-emerald-300 font-bold text-2xl">₹{savings.toLocaleString('en-IN')}</span>
                  <div className="mt-3 pt-3 border-t border-emerald-500/20 text-sm">
                    New EMI at 9.99%: <span className="text-emerald-300 font-bold text-lg">₹{baseEmi.toLocaleString('en-IN')}</span>/mo
                  </div>
                </div>
              )}
              
              <div className="flex items-center gap-3 bg-blue-energy/20 border border-blue-energy/30 rounded-xl p-4 mt-4">
                 <PieChart className="w-8 h-8 text-blue-400 flex-shrink-0" />
                 <div className="text-sm font-medium text-blue-100">
                    Principal is <span className="font-bold text-white">{((principal/totalPayment)*100 || 0).toFixed(1)}%</span> and Interest is <span className="font-bold text-white">{((totalInterest/totalPayment)*100 || 0).toFixed(1)}%</span> of total amount payable.
                 </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-8 pt-6 border-t border-white/10">
            <button className="w-full py-4 bg-blue-energy text-white rounded-xl font-bold hover:bg-[#524BFF] transition-colors flex items-center justify-center gap-2 group">
              Apply Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <div className="flex items-start gap-2 mt-5 text-slate-400 text-xs leading-relaxed">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <p>
                Calculations are estimates for illustration purposes only. 
                Actual EMI, tenure, and interest rate depend on lender policies and customer eligibility.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

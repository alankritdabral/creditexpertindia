"use client";

import React, { useState } from "react";
import { ArrowRight, Info, AlertCircle } from "lucide-react";

export function SmartCalculator() {
  const [outstanding, setOutstanding] = useState(500000);
  const [currentEMI, setCurrentEMI] = useState(15000);
  const [currentRate, setCurrentRate] = useState(18);
  const [currentTenure, setCurrentTenure] = useState(48); // months

  const [newRate, setNewRate] = useState(12); // Expected rate
  const [newTenure, setNewTenure] = useState(60); // New tenure months

  React.useEffect(() => {
    const currentMonthlyRate = (currentRate / 12) / 100;
    const calculatedEMI = currentRate === 0 
      ? Math.round(outstanding / currentTenure)
      : Math.round(
          outstanding * currentMonthlyRate * Math.pow(1 + currentMonthlyRate, currentTenure) / 
          (Math.pow(1 + currentMonthlyRate, currentTenure) - 1)
        );
    
    if (!isNaN(calculatedEMI) && isFinite(calculatedEMI) && calculatedEMI > 0) {
      setCurrentEMI(calculatedEMI);
    }
  }, [outstanding, currentRate, currentTenure]);

  // Calculate current estimated remaining interest roughly
  // This is a simplified calculation for illustrative purposes
  const currentTotalPayment = currentEMI * currentTenure;
  const currentEstInterest = Math.max(0, currentTotalPayment - outstanding);

  // Calculate new EMI
  // Formula: E = P * r * (1 + r)^n / ((1 + r)^n - 1)
  const monthlyRate = (newRate / 12) / 100;
  const newEMI = Math.round(
    outstanding * monthlyRate * Math.pow(1 + monthlyRate, newTenure) / 
    (Math.pow(1 + monthlyRate, newTenure) - 1)
  );
  const newTotalPayment = newEMI * newTenure;
  const newEstInterest = Math.max(0, newTotalPayment - outstanding);

  const monthlyDifference = currentEMI - newEMI;
  const interestDifference = currentEstInterest - newEstInterest;

  return (
    <div id="calculator" className="w-full h-full flex flex-col justify-between">
      <div className="mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-text-main tracking-tight mb-4">Calculate Potential Savings</h2>
        <p className="text-lg text-text-muted max-w-2xl">
          See how much you could potentially save by consolidating your loans at a lower interest rate.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full">
        {/* Inputs */}
        <div className="bg-warm-bg rounded-3xl p-6 md:p-8 border border-slate-200/60">
          <h3 className="text-xl font-bold text-text-main mb-6 flex items-center gap-2">
            Your Current Situation
          </h3>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-semibold text-text-muted">Total Outstanding</label>
                <div className="relative flex items-center shadow-sm">
                  <span className="absolute left-3 font-bold text-slate-400">₹</span>
                  <input 
                    type="number" 
                    value={outstanding}
                    onChange={(e) => setOutstanding(Number(e.target.value))}
                    className="w-[140px] bg-white border border-slate-200 rounded-lg py-1.5 pl-7 pr-3 font-bold text-brand-blue focus:ring-2 focus:ring-brand-blue outline-none transition-shadow text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
              </div>
              <input 
                type="range" min="50000" max="2500000" step="50000"
                value={outstanding} onChange={(e) => setOutstanding(Number(e.target.value))}
                className="w-full accent-brand-blue"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-semibold text-text-muted">Current Total EMI</label>
                <div className="relative flex items-center shadow-sm">
                  <span className="absolute left-3 font-bold text-slate-400">₹</span>
                  <input 
                    type="number" 
                    value={currentEMI}
                    onChange={(e) => setCurrentEMI(Number(e.target.value))}
                    className="w-[140px] bg-white border border-slate-200 rounded-lg py-1.5 pl-7 pr-3 font-bold text-brand-blue focus:ring-2 focus:ring-brand-blue outline-none transition-shadow text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
              </div>
              <input 
                type="range" min="5000" max="100000" step="1000"
                value={currentEMI} onChange={(e) => setCurrentEMI(Number(e.target.value))}
                className="w-full accent-brand-blue"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-text-muted mb-2">Avg. Interest Rate</label>
                <div className="relative">
                  <input 
                    type="number" value={currentRate} onChange={(e) => setCurrentRate(Number(e.target.value))}
                    className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-brand-blue outline-none transition-shadow [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <span className="absolute right-4 top-2.5 text-text-muted">%</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-text-muted mb-2">Remaining Tenure</label>
                <div className="relative">
                  <input 
                    type="number" value={currentTenure} onChange={(e) => setCurrentTenure(Number(e.target.value))}
                    className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-brand-blue outline-none transition-shadow [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <span className="absolute right-4 top-2.5 text-text-muted">mo</span>
                </div>
              </div>
            </div>

            <hr className="border-slate-200" />

            <h3 className="text-xl font-bold text-text-main mb-4">Proposed New Loan</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-text-muted mb-2">Expected Rate</label>
                <div className="relative">
                  <input 
                    type="number" value={newRate} onChange={(e) => setNewRate(Number(e.target.value))}
                    className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-emerald-500 outline-none transition-shadow [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <span className="absolute right-4 top-2.5 text-text-muted">%</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-text-muted mb-2">New Tenure</label>
                <div className="relative">
                  <input 
                    type="number" value={newTenure} onChange={(e) => setNewTenure(Number(e.target.value))}
                    className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-emerald-500 outline-none transition-shadow [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <span className="absolute right-4 top-2.5 text-text-muted">mo</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Outputs */}
        <div className="bg-[#0A2540] rounded-3xl p-6 md:p-8 text-white flex flex-col justify-between shadow-2xl relative overflow-hidden">
          {/* Decorative BG */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-blue/30 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-8">Potential Consolidation</h3>
            
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                <p className="text-blue-200 text-sm font-semibold uppercase tracking-widest mb-2">New Estimated EMI</p>
                <p className="text-4xl md:text-5xl font-extrabold tracking-tight">₹{newEMI.toLocaleString('en-IN')}</p>
                {monthlyDifference > 0 && (
                  <p className="text-emerald-400 font-semibold mt-3 flex items-center gap-1">
                    ↓ ₹{monthlyDifference.toLocaleString('en-IN')} less per month
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-xl p-5 border border-white/10 backdrop-blur-sm">
                  <p className="text-blue-200 text-xs font-semibold uppercase tracking-widest mb-2">Old Interest</p>
                  <p className="text-xl font-bold">₹{currentEstInterest.toLocaleString('en-IN')}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-5 border border-white/10 backdrop-blur-sm">
                  <p className="text-blue-200 text-xs font-semibold uppercase tracking-widest mb-2">New Interest</p>
                  <p className="text-xl font-bold">₹{newEstInterest.toLocaleString('en-IN')}</p>
                </div>
              </div>

              {interestDifference > 0 && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-5 text-emerald-400 font-semibold text-center backdrop-blur-sm">
                  Total Potential Interest Savings: <br className="sm:hidden"/> 
                  <span className="text-emerald-300 font-bold">₹{interestDifference.toLocaleString('en-IN')}</span>
                </div>
              )}
            </div>
          </div>

          <div className="relative z-10 mt-8 pt-6 border-t border-white/10">
            <button className="w-full py-4 bg-brand-blue text-white rounded-xl font-bold hover:bg-[#524BFF] transition-colors flex items-center justify-center gap-2 group">
              Check My Eligibility
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <div className="flex items-start gap-2 mt-5 text-slate-400 text-xs leading-relaxed">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <p>
                Calculations are estimates for illustration purposes only and do not constitute an offer or guarantee of savings. 
                Actual EMI, tenure, and interest rate depend on lender policies and customer eligibility.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

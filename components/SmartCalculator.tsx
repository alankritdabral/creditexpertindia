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
    <div id="calculator" className="w-full max-w-6xl mx-auto border border-[#D8E5F5] rounded-[32px] bg-white p-6 md:p-10 shadow-sm font-sans text-[#111827]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 w-full mb-8">
        
        {/* Left Inputs Section */}
        <div className="flex flex-col justify-center space-y-8">
          {/* Loan Amount */}
          <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
              <label className="text-[16px] font-semibold text-[#111827]">Loan Amount</label>
              <div className="bg-[#EAF3FF] rounded-xl px-4 py-2 flex items-center font-bold text-[18px] text-[#2684FF]">
                <span>₹</span>
                <input 
                  type="number" 
                  value={principal}
                  onChange={(e) => setPrincipal(Number(e.target.value))}
                  className="w-[120px] bg-transparent outline-none text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
            </div>
            <Slider 
              min={50000} max={10000000} step={50000}
              value={[principal]} onValueChange={(val) => setPrincipal(val[0])}
              className="py-2 cursor-pointer"
              showTooltip
              tooltipContent={(val) => `₹${val.toLocaleString('en-IN')}`}
            />
            <div className="flex justify-between text-[13px] text-[#64748B] mt-2 font-medium">
              <span>₹50K</span>
              <span>₹1Cr+</span>
            </div>
          </div>

          {/* Interest Rate */}
          <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
              <label className="text-[16px] font-semibold text-[#111827]">Interest Rate (p.a.)</label>
              <div className="bg-[#EAF3FF] rounded-xl px-4 py-2 flex items-center font-bold text-[18px] text-[#2684FF]">
                <input 
                  type="number" 
                  value={rate}
                  step="0.1"
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-[70px] bg-transparent outline-none text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <span className="ml-1">%</span>
              </div>
            </div>
            <Slider 
              min={5} max={30} step={0.1}
              value={[rate]} onValueChange={(val) => setRate(val[0])}
              className="py-2 cursor-pointer"
              showTooltip
              tooltipContent={(val) => `${val}%`}
            />
             <div className="flex justify-between text-[13px] text-[#64748B] mt-2 font-medium">
              <span>5%</span>
              <span>30%</span>
            </div>
          </div>

          {/* Loan Tenure */}
          <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
              <label className="text-[16px] font-semibold text-[#111827]">Loan Tenure</label>
              <div className="bg-[#EAF3FF] rounded-xl px-4 py-2 flex items-center font-bold text-[18px] text-[#2684FF]">
                <input 
                  type="number" 
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  className="w-[70px] bg-transparent outline-none text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <span className="ml-1">mo</span>
              </div>
            </div>
            <Slider 
              min={6} max={360} step={1}
              value={[tenure]} onValueChange={(val) => setTenure(val[0])}
              className="py-2 cursor-pointer"
              showTooltip
              tooltipContent={(val) => `${val} mo`}
            />
             <div className="flex justify-between text-[13px] text-[#64748B] mt-2 font-medium">
              <span>6 Months</span>
              <span>30 Years</span>
            </div>
          </div>
        </div>

        {/* Right Results / Chart Section */}
        <div className="bg-white rounded-[24px] p-6 md:p-8 border border-[#D8E5F5] shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col items-center h-full">
          <h3 className="text-[20px] font-bold mb-8 text-[#111827] w-full text-center md:text-left">Your EMI Details</h3>
          
          <div className="flex-1 flex flex-col items-center justify-end w-full max-w-[400px] relative min-h-[220px]">
             {/* Chart Visualization (Bars) */}
             <div className="flex items-end justify-center h-[180px] w-full gap-4 sm:gap-8">
               {/* Total Interest Bar */}
               <div className="flex flex-col items-center justify-end h-full w-[45px] sm:w-[50px] relative group">
                 <span className="text-[11px] font-semibold text-[#64748B] mb-2 whitespace-nowrap opacity-100 transition-opacity">₹{totalInterest.toLocaleString('en-IN')}</span>
                 <div 
                   className="w-full bg-[#E2E8F0] rounded-t-xl transition-all duration-700 ease-out" 
                   style={{ height: `${Math.max(15, (totalInterest / (totalPayment || 1)) * 100)}%` }}
                 ></div>
               </div>
               
               {/* Total Payable Bar */}
               <div className="flex flex-col items-center justify-end h-full w-[45px] sm:w-[50px] relative group">
                 <span className="text-[11px] font-semibold text-[#B8B1FF] mb-2 whitespace-nowrap opacity-100 transition-opacity">₹{totalPayment.toLocaleString('en-IN')}</span>
                 <div 
                   className="w-full bg-[#B8B1FF] rounded-t-xl transition-all duration-700 ease-out" 
                   style={{ height: '100%' }}
                 ></div>
               </div>

               {/* Divider Line to separate scales */}
               <div className="h-[120px] w-px bg-[#F0F4F8] mx-2 hidden sm:block"></div>

               {/* Current EMI Bar */}
               <div className="flex flex-col items-center justify-end h-full w-[45px] sm:w-[50px] relative group">
                 <span className="text-[11px] font-semibold text-[#2684FF] mb-2 whitespace-nowrap opacity-100 transition-opacity">₹{emi.toLocaleString('en-IN')}</span>
                 <div 
                   className="w-full bg-[#2684FF] rounded-t-xl transition-all duration-700 ease-out" 
                   style={{ height: '100%' }}
                 ></div>
               </div>

               {/* New EMI Bar */}
               {savings > 0 && (
                 <div className="flex flex-col items-center justify-end h-full w-[45px] sm:w-[50px] relative group">
                   <span className="text-[11px] font-semibold text-[#72C900] mb-2 whitespace-nowrap opacity-100 transition-opacity">₹{baseEmi.toLocaleString('en-IN')}</span>
                   <div 
                     className="w-full bg-[#72C900] rounded-t-xl transition-all duration-700 ease-out" 
                     style={{ 
                       height: `${Math.max(5, ((baseEmi - (baseEmi * 0.95)) / ((emi || 1) - (baseEmi * 0.95))) * 100)}%` 
                     }}
                   ></div>
                 </div>
               )}
             </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mt-8 w-full pt-6 border-t border-[#F0F4F8]">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#E2E8F0]"></div>
              <span className="text-[12px] text-[#64748B] font-medium">Total Interest</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#B8B1FF]"></div>
              <span className="text-[12px] text-[#64748B] font-medium">Total Payable</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#2684FF]"></div>
              <span className="text-[12px] text-[#64748B] font-medium">EMI</span>
            </div>
            {savings > 0 && (
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#72C900]"></div>
                <span className="text-[12px] text-[#64748B] font-medium">New EMI</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Result Cards */}
      <div className="flex flex-col lg:flex-row flex-wrap xl:flex-nowrap gap-4 mt-8 pt-8 border-t border-[#EEF1F5] items-stretch">
        
        {/* Monthly EMI Card */}
        <div className="flex-1 min-w-[200px] bg-[#EAF3FF] rounded-2xl p-5 flex flex-col justify-center items-start">
          <p className="text-[#2684FF] text-[14px] font-semibold mb-1">Monthly EMI</p>
          <p className="text-[#2684FF] text-[32px] md:text-[36px] font-bold leading-none">₹{emi.toLocaleString('en-IN')}</p>
        </div>

        {/* Savings Card */}
        {savings > 0 && (
          <div className="flex-1 min-w-[220px] bg-[#F3FCE5] border border-[#72C900] rounded-2xl p-5 flex flex-col justify-center items-start text-[#72C900]">
            <p className="text-[13px] font-semibold mb-1">Potential Savings at 9.99%</p>
            <p className="text-[22px] font-bold mb-1">₹{savings.toLocaleString('en-IN')}</p>
            <p className="text-[12px] opacity-90 font-medium">New EMI at 9.99%: ₹{baseEmi.toLocaleString('en-IN')}/mo</p>
          </div>
        )}

        {/* Principal/Interest Card */}
        <div className="flex-1 min-w-[220px] bg-[#EAF3FF] border border-[#2684FF]/20 rounded-2xl p-5 flex items-center gap-4">
          <div className="p-2 bg-[#2684FF]/10 rounded-full flex-shrink-0">
            <PieChart className="w-6 h-6 text-[#2684FF]" />
          </div>
          <p className="text-[13px] text-[#111827] font-medium leading-relaxed">
            Principal is <span className="font-bold text-[#2684FF]">{((principal/totalPayment)*100 || 0).toFixed(1)}%</span> and Interest is <span className="font-bold text-[#2684FF]">{((totalInterest/totalPayment)*100 || 0).toFixed(1)}%</span> of total amount payable.
          </p>
        </div>

        {/* Apply Now Button */}
        <div className="flex-1 min-w-[200px] flex">
          <button className="w-full h-full min-h-[60px] py-4 bg-[#2684FF] text-white rounded-full font-bold hover:bg-[#1C6DD0] transition-colors flex items-center justify-center gap-2 group text-[18px] shadow-sm">
            Apply Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
      
      <div className="flex items-start justify-center gap-2 mt-8 text-[#64748B] text-[13px] leading-relaxed max-w-3xl mx-auto text-center">
        <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
        <p>
          Calculations are estimates for illustration purposes only. 
          Actual EMI, tenure, and interest rate depend on lender policies and customer eligibility.
        </p>
      </div>
    </div>
  );
}

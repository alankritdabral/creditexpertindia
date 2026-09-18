'use client';
import { useState } from 'react';

export function DebtCalculator() {
  const [income, setIncome] = useState<string>('');
  const [totalDebt, setTotalDebt] = useState<string>('');
  const [emi, setEmi] = useState<string>('');
  const [activeLoans, setActiveLoans] = useState<string>('');

  const incomeNum = Number(income) || 0;
  const emiNum = Number(emi) || 0;
  
  const debtBurden = incomeNum > 0 ? Math.min(Math.round((emiNum / incomeNum) * 100), 100) : 0;
  const isFilled = income && totalDebt && emi && activeLoans;

  return (
    <section className="py-24 sm:py-32 bg-slate-50" id="debt-health-check">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        
        <h2 className="text-[32px] sm:text-[40px] font-bold tracking-tighter text-brand-black leading-[1.1] mb-12 max-w-2xl">
          YOUR DEBT X-RAY
        </h2>

        <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-icy-blue overflow-hidden text-left">
          <div className="p-8 sm:p-10 space-y-6">
            
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <label className="text-[15px] font-medium text-brand-black/80">Monthly income</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">₹</span>
                <input
                  type="number"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                  className="w-32 sm:w-40 bg-slate-50 rounded-lg py-2 pl-7 pr-3 text-right text-brand-black font-semibold outline-none focus:ring-2 focus:ring-slate-900 border border-transparent focus:border-slate-900 transition-all"
                  placeholder="75000"
                />
              </div>
            </div>

            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <label className="text-[15px] font-medium text-brand-black/80">Total debt</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">₹</span>
                <input
                  type="number"
                  value={totalDebt}
                  onChange={(e) => setTotalDebt(e.target.value)}
                  className="w-32 sm:w-40 bg-slate-50 rounded-lg py-2 pl-7 pr-3 text-right text-brand-black font-semibold outline-none focus:ring-2 focus:ring-slate-900 border border-transparent focus:border-slate-900 transition-all"
                  placeholder="820000"
                />
              </div>
            </div>

            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <label className="text-[15px] font-medium text-brand-black/80">Monthly EMI</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">₹</span>
                <input
                  type="number"
                  value={emi}
                  onChange={(e) => setEmi(e.target.value)}
                  className="w-32 sm:w-40 bg-slate-50 rounded-lg py-2 pl-7 pr-3 text-right text-brand-black font-semibold outline-none focus:ring-2 focus:ring-slate-900 border border-transparent focus:border-slate-900 transition-all"
                  placeholder="38500"
                />
              </div>
            </div>

            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <label className="text-[15px] font-medium text-brand-black/80">Active loans</label>
              <input
                type="number"
                value={activeLoans}
                onChange={(e) => setActiveLoans(e.target.value)}
                className="w-20 bg-slate-50 rounded-lg py-2 px-3 text-right text-brand-black font-semibold outline-none focus:ring-2 focus:ring-slate-900 border border-transparent focus:border-slate-900 transition-all"
                placeholder="5"
              />
            </div>
          </div>
          
          <div className="bg-slate-50 p-8 sm:p-10 border-t border-icy-blue">
            <h3 className="text-[11px] font-bold tracking-wider text-brand-black/70 uppercase mb-4">
              DEBT BURDEN
            </h3>
            
            <div className="flex items-end gap-3 mb-4">
              <span className={`text-5xl font-bold tracking-tight ${debtBurden > 50 ? 'text-red-500' : 'text-brand-black'}`}>
                {debtBurden}%
              </span>
            </div>
            
            <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden mb-6">
              <div 
                className={`h-full rounded-full transition-all duration-500 ease-out ${debtBurden > 50 ? 'bg-red-500' : 'bg-slate-900'}`}
                style={{ width: `${Math.max(debtBurden, 5)}%` }}
              />
            </div>

            <p className="text-[15px] text-brand-black/90 mb-8 font-medium">
              You're putting <span className="font-bold text-brand-black">₹{emiNum > 0 ? emiNum.toLocaleString('en-IN') : '0'}</span>/month toward debt.
            </p>

            <button className="w-full rounded-full bg-slate-900 px-6 py-4 text-[15px] font-semibold text-white hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20">
              Explore Possible Options
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

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
    <section className="py-24 sm:py-32 bg-soft-blue" id="debt-health-check">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col items-center text-center">
        
        <h2 className="text-3xl font-medium tracking-tight text-text-main sm:text-5xl mb-12 max-w-2xl">
          YOUR DEBT X-RAY
        </h2>

        <div className="w-full max-w-lg bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden text-left">
          <div className="p-8 sm:p-10 space-y-6">
            
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <label className="text-sm font-medium text-text-muted">Monthly income</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted font-medium">₹</span>
                <input
                  type="number"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                  className="w-32 sm:w-40 bg-gray-50 rounded-lg py-2 pl-7 pr-3 text-right text-text-main font-semibold outline-none focus:ring-2 focus:ring-brand-blue/50"
                  placeholder="75000"
                />
              </div>
            </div>

            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <label className="text-sm font-medium text-text-muted">Total debt</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted font-medium">₹</span>
                <input
                  type="number"
                  value={totalDebt}
                  onChange={(e) => setTotalDebt(e.target.value)}
                  className="w-32 sm:w-40 bg-gray-50 rounded-lg py-2 pl-7 pr-3 text-right text-text-main font-semibold outline-none focus:ring-2 focus:ring-brand-blue/50"
                  placeholder="820000"
                />
              </div>
            </div>

            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <label className="text-sm font-medium text-text-muted">Monthly EMI</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted font-medium">₹</span>
                <input
                  type="number"
                  value={emi}
                  onChange={(e) => setEmi(e.target.value)}
                  className="w-32 sm:w-40 bg-gray-50 rounded-lg py-2 pl-7 pr-3 text-right text-text-main font-semibold outline-none focus:ring-2 focus:ring-brand-blue/50"
                  placeholder="38500"
                />
              </div>
            </div>

            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <label className="text-sm font-medium text-text-muted">Active loans</label>
              <input
                type="number"
                value={activeLoans}
                onChange={(e) => setActiveLoans(e.target.value)}
                className="w-20 bg-gray-50 rounded-lg py-2 px-3 text-right text-text-main font-semibold outline-none focus:ring-2 focus:ring-brand-blue/50"
                placeholder="5"
              />
            </div>
          </div>
          
          <div className="bg-gray-50 p-8 sm:p-10 border-t border-gray-100">
            <h3 className="text-sm font-bold tracking-wider text-text-muted uppercase mb-4">
              DEBT BURDEN
            </h3>
            
            <div className="flex items-end gap-3 mb-4">
              <span className={`text-5xl font-bold tracking-tight ${debtBurden > 50 ? 'text-warning-red' : 'text-text-main'}`}>
                {debtBurden}%
              </span>
            </div>
            
            <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden mb-6">
              <div 
                className={`h-full rounded-full transition-all duration-500 ease-out ${debtBurden > 50 ? 'bg-warning-red' : 'bg-brand-blue'}`}
                style={{ width: `${Math.max(debtBurden, 5)}%` }}
              />
            </div>

            <p className="text-text-main text-lg mb-8">
              You're putting <span className="font-semibold">₹{emiNum > 0 ? emiNum.toLocaleString('en-IN') : '0'}</span>/month toward debt.
            </p>

            <button className="w-full rounded-xl bg-brand-blue px-6 py-4 text-base font-medium text-white hover:bg-blue-700 transition-colors shadow-lg shadow-brand-blue/20">
              Explore Possible Options
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

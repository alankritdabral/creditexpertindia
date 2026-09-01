'use client';
import { useState } from 'react';

export function DebtCalculator() {
  const [amount, setAmount] = useState<string>('');
  const [rate, setRate] = useState<string>('');
  const [emi, setEmi] = useState<string>('');
  const [tenure, setTenure] = useState<string>('');

  const isFilled = amount && rate && emi;
  
  // Illustrative calculation: assuming a 5 year tenure at 10.5% (optimistic) for potential EMI
  const outstandingNum = Number(amount) || 0;
  const currentEmiNum = Number(emi) || 0;
  
  const r = 10.5 / (12 * 100);
  const n = 60; // 5 years
  const potentialEmiNum = outstandingNum > 0 ? (outstandingNum * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : 0;
  const potentialDifferenceNum = currentEmiNum > potentialEmiNum ? currentEmiNum - potentialEmiNum : 0;

  const currentEmiStr = currentEmiNum ? `₹${currentEmiNum.toLocaleString('en-IN', {maximumFractionDigits: 0})}` : "₹0";
  const potentialEmiStr = potentialEmiNum ? `₹${potentialEmiNum.toLocaleString('en-IN', {maximumFractionDigits: 0})}` : "₹0";
  const potentialDifferenceStr = potentialDifferenceNum ? `₹${potentialDifferenceNum.toLocaleString('en-IN', {maximumFractionDigits: 0})}` : "₹0";

  return (
    <section className="py-24 sm:py-32 bg-white" id="debt-health-check">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <p className="text-base font-semibold leading-7 text-primary tracking-wide uppercase">
            DEBT X-RAY
          </p>
          <h2 className="mt-2 text-4xl font-medium tracking-[-1px] text-ink sm:text-5xl">
            Let's see where your money is going.
          </h2>
          <p className="mt-6 text-lg leading-[1.5] text-ink-mute font-light">
            Enter your current debt details to see if a better repayment path exists.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-4xl bg-canvas-soft border border-hairline rounded-[12px] p-8 sm:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <div>
              <label className="block text-[15px] font-light leading-6 text-ink">
                Total Outstanding Debt
              </label>
              <div className="mt-2 relative rounded-[6px] shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-ink-mute sm:text-sm">₹</span>
                </div>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="block w-full rounded-[6px] border border-hairline py-2 pl-10 text-ink placeholder:text-ink-mute focus:ring-2 focus:ring-inset focus:ring-primary focus:border-primary sm:text-[15px] sm:leading-6 [font-feature-settings:'tnum']"
                  placeholder="650000"
                />
              </div>
            </div>

            <div>
              <label className="block text-[15px] font-light leading-6 text-ink">
                Total Current EMI
              </label>
              <div className="mt-2 relative rounded-[6px] shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-ink-mute sm:text-sm">₹</span>
                </div>
                <input
                  type="number"
                  value={emi}
                  onChange={(e) => setEmi(e.target.value)}
                  className="block w-full rounded-[6px] border border-hairline py-2 pl-10 text-ink placeholder:text-ink-mute focus:ring-2 focus:ring-inset focus:ring-primary focus:border-primary sm:text-[15px] sm:leading-6 [font-feature-settings:'tnum']"
                  placeholder="35000"
                />
              </div>
            </div>

            <div>
              <label className="block text-[15px] font-light leading-6 text-ink">
                Average Interest Rate
              </label>
              <div className="mt-2 relative rounded-[6px] shadow-sm">
                <input
                  type="number"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  className="block w-full rounded-[6px] border border-hairline py-2 pr-10 text-ink placeholder:text-ink-mute focus:ring-2 focus:ring-inset focus:ring-primary focus:border-primary sm:text-[15px] sm:leading-6 [font-feature-settings:'tnum']"
                  placeholder="18"
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <span className="text-ink-mute sm:text-sm">%</span>
                </div>
              </div>
            </div>
            
            <button className="w-full rounded-full bg-primary px-6 py-4 text-base font-medium leading-none text-white shadow-sm hover:bg-primary-press transition-colors">
              Get My Personalised Analysis
            </button>
          </div>

          <div className="bg-ink rounded-[12px] p-8 border border-ink shadow-lg h-full flex flex-col justify-between text-white">
            <div className="space-y-6">
              <div className="flex justify-between items-end border-b border-white/10 pb-4">
                <div>
                  <p className="text-[10px] font-normal tracking-[0.1px] text-white/50 uppercase mb-1">CURRENT EMI</p>
                  <p className="text-2xl font-light">{isFilled ? currentEmiStr : '—'} <span className="text-sm text-white/50">/ month</span></p>
                </div>
              </div>

              <div className="flex justify-between items-end border-b border-white/10 pb-4">
                <div>
                  <p className="text-[10px] font-normal tracking-[0.1px] text-white/50 uppercase mb-1">CURRENT INTEREST</p>
                  <p className="text-2xl font-light">{isFilled ? `${rate}%` : '—'}</p>
                </div>
              </div>
              
              <div className="flex justify-between items-end border-b border-white/10 pb-4">
                <div>
                  <p className="text-[10px] font-normal tracking-[0.1px] text-white/50 uppercase mb-1">OUTSTANDING</p>
                  <p className="text-2xl font-light">{isFilled ? `₹${outstandingNum.toLocaleString('en-IN')}` : '—'}</p>
                </div>
              </div>

              <div className="pt-4">
                <p className="text-[10px] font-normal tracking-[0.1px] text-green-400 uppercase mb-1">POTENTIAL EMI*</p>
                <p className="text-3xl font-medium text-white">{isFilled ? potentialEmiStr : '—'} {isFilled && <span className="text-sm text-white/50 font-light">/ month</span>}</p>
              </div>
              
              <div>
                <p className="text-[10px] font-normal tracking-[0.1px] text-green-400 uppercase mb-1">POTENTIAL DIFFERENCE</p>
                <p className="text-xl font-medium text-green-400">{isFilled ? potentialDifferenceStr : '—'} {isFilled && <span className="text-sm text-green-400/70 font-light">/ month</span>}</p>
              </div>
            </div>
            
            <div className="mt-8">
              <p className="text-[11px] leading-[1.4] text-white/50 font-light">
                *Estimates are illustrative assuming a hypothetical 5-year tenure at a lower rate. Actual rates, eligibility and approval depend on the respective lender and borrower profile.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

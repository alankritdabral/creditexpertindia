'use client';
import { useState } from 'react';

export function DebtCalculator() {
  const [amount, setAmount] = useState<string>('');
  const [rate, setRate] = useState<string>('');
  const [emi, setEmi] = useState<string>('');
  const [tenure, setTenure] = useState<string>('');

  const isFilled = amount && rate && emi && tenure;
  
  // Illustrative alternative calculation
  // Let's just output a hardcoded "illustrative" value if filled, or null if not.
  const illustrativeEmi = isFilled ? "₹13,971" : null;
  const currentEmi = emi ? `₹${Number(emi).toLocaleString()}` : "₹0";

  return (
    <section className="py-24 sm:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <p className="text-base font-semibold leading-7 text-blue-600 tracking-wide uppercase">
            DEBT CHECK
          </p>
          <h2 className="mt-2 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Understand your current debt.
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Enter a few numbers to get a clearer picture of your current repayment burden.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-4xl bg-canvas-soft border border-slate-100 rounded-[12px] p-8 sm:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <div>
              <label className="block text-[15px] font-light leading-6 text-ink">
                Outstanding Loan Amount
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
                  placeholder="0.00"
                />
              </div>
            </div>

            <div>
              <label className="block text-[15px] font-light leading-6 text-ink">
                Current Interest Rate
              </label>
              <div className="mt-2 relative rounded-[6px] shadow-sm">
                <input
                  type="number"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  className="block w-full rounded-[6px] border border-hairline py-2 pr-10 text-ink placeholder:text-ink-mute focus:ring-2 focus:ring-inset focus:ring-primary focus:border-primary sm:text-[15px] sm:leading-6 [font-feature-settings:'tnum']"
                  placeholder="0.00"
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <span className="text-ink-mute sm:text-sm">%</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[15px] font-light leading-6 text-ink">
                Current EMI
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
                  placeholder="0.00"
                />
              </div>
            </div>

            <div>
              <label className="block text-[15px] font-light leading-6 text-ink">
                Remaining Tenure
              </label>
              <div className="mt-2 relative rounded-[6px] shadow-sm">
                <input
                  type="number"
                  value={tenure}
                  onChange={(e) => setTenure(e.target.value)}
                  className="block w-full rounded-[6px] border border-hairline py-2 pr-20 text-ink placeholder:text-ink-mute focus:ring-2 focus:ring-inset focus:ring-primary focus:border-primary sm:text-[15px] sm:leading-6 [font-feature-settings:'tnum']"
                  placeholder="0"
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <span className="text-ink-mute sm:text-sm">months</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-brand-dark-900 rounded-[12px] p-8 border border-slate-700 shadow-[0_8px_24px_rgba(0,55,112,0.08)] h-full flex flex-col justify-between text-white">
            <div className="space-y-8">
              <div>
                <p className="text-[10px] font-normal tracking-[0.1px] text-primary-bg-subdued-hover uppercase mb-2">CURRENT EMI</p>
                <p className="text-[26px] font-light tracking-[-0.26px]">{isFilled ? currentEmi : '—'} <span className="text-[15px] text-ink-mute-2 font-light">/ month</span></p>
              </div>

              <div>
                <p className="text-[10px] font-normal tracking-[0.1px] text-primary-bg-subdued-hover uppercase mb-2">CURRENT INTEREST</p>
                <p className="text-[26px] font-light tracking-[-0.26px]">{isFilled ? `${rate}%` : '—'}</p>
              </div>

              <div className="pt-8 border-t border-slate-700">
                <p className="text-[10px] font-normal tracking-[0.1px] text-primary-soft uppercase mb-2">ILLUSTRATIVE ALTERNATIVE</p>
                <p className="text-[32px] font-light tracking-[-0.64px] text-white">{isFilled ? illustrativeEmi : '—'} {isFilled && <span className="text-[15px] text-ink-mute-2 font-light">/ month</span>}</p>
              </div>
            </div>
            
            <div className="mt-8">
              <p className="text-[14px] text-white font-light bg-primary/20 p-4 rounded-[8px] [font-feature-settings:'tnum']">
                A different loan structure may reduce your monthly repayment — if you qualify and the numbers make sense.
              </p>
              <p className="mt-4 text-[11px] leading-[1.4] text-ink-mute-2 font-light">
                This calculator provides an illustration only. Actual interest rates, EMI, tenure, approval and savings depend on your profile and lender assessment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

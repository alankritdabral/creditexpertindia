'use client';
import { useState } from 'react';

export function LeadForm() {
  const [step, setStep] = useState(1);

  const handleNext = () => setStep((s) => Math.min(s + 1, 4));
  const handlePrev = () => setStep((s) => Math.max(s - 1, 1));

  return (
    <section id="lead-form" className="py-24 sm:py-32 bg-slate-50 relative z-0 overflow-hidden">
      {/* Background slash / clip path element */}
      <div className="absolute inset-0 -z-10 bg-slate-50" style={{ clipPath: 'polygon(0 5%, 100% 0, 100% 100%, 0 100%)' }} />
      <div className="absolute top-0 right-0 -z-10 w-full h-[150%] max-w-[50%] transform origin-top-right -skew-y-12 bg-gradient-to-bl from-icy-blue/30 to-transparent pointer-events-none" />
      
      {/* Subtle mesh behind the form */}
      <div className="absolute inset-0 w-full h-full opacity-40 mix-blend-multiply pointer-events-none -z-20" style={{
        background: `
          radial-gradient(circle at 85% 15%, #F7DCCB 0%, transparent 40%),
          radial-gradient(circle at 15% 85%, #E8F5DF 0%, transparent 40%)
        `
      }} />

      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="text-[32px] sm:text-[40px] font-bold tracking-tighter text-brand-black leading-[1.1]">
            Check your options
          </h2>
          <p className="mt-4 text-[17px] text-brand-black/80 font-medium">
            Find out how much you could save with our expert guidance.
          </p>
        </div>

        <div className="mx-auto max-w-xl bg-white border border-icy-blue rounded-2xl p-8 shadow-xl relative z-10">
          {step === 1 && (
            <div className="animate-fade-in">
              <h3 className="text-[19px] font-bold mb-6 text-brand-black text-center">What's troubling you?</h3>
              <div className="space-y-3">
                {['High-interest loan', 'Credit-card debt', 'Multiple EMIs', 'Need a fresh loan'].map((opt) => (
                  <button key={opt} onClick={handleNext} className="w-full text-left px-6 py-4 rounded-xl border border-icy-blue hover:border-slate-900 hover:bg-slate-50 transition-all text-[15px] font-medium text-brand-black shadow-sm">
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in">
              <h3 className="text-[19px] font-bold mb-6 text-brand-black text-center">Approximately how much do you earn?</h3>
              <div className="space-y-4">
                <input type="number" placeholder="Monthly Salary (₹)" className="w-full px-6 py-4 rounded-xl border border-icy-blue focus:ring-2 focus:ring-blue-energy focus:border-blue-energy text-[15px] text-brand-black shadow-sm outline-none transition-all" />
                <div className="flex gap-4 pt-2">
                  <button onClick={handlePrev} className="flex-1 py-4 font-medium text-brand-black/70 hover:text-brand-black transition-colors">Back</button>
                  <button onClick={handleNext} className="flex-1 bg-slate-900 text-white rounded-xl py-4 font-semibold hover:bg-slate-800 shadow-md transition-colors">Continue</button>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-fade-in">
              <h3 className="text-[19px] font-bold mb-6 text-brand-black text-center">How much do you currently owe?</h3>
              <div className="space-y-4">
                <input type="number" placeholder="Total Outstanding (₹)" className="w-full px-6 py-4 rounded-xl border border-icy-blue focus:ring-2 focus:ring-blue-energy focus:border-blue-energy text-[15px] text-brand-black shadow-sm outline-none transition-all" />
                <div className="flex gap-4 pt-2">
                  <button onClick={handlePrev} className="flex-1 py-4 font-medium text-brand-black/70 hover:text-brand-black transition-colors">Back</button>
                  <button onClick={handleNext} className="flex-1 bg-slate-900 text-white rounded-xl py-4 font-semibold hover:bg-slate-800 shadow-md transition-colors">Continue</button>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="animate-fade-in">
              <h3 className="text-[19px] font-bold mb-6 text-brand-black text-center">Where should we reach you?</h3>
              <div className="space-y-4">
                <input type="text" placeholder="Your Name" className="w-full px-6 py-4 rounded-xl border border-icy-blue focus:ring-2 focus:ring-blue-energy focus:border-blue-energy text-[15px] text-brand-black shadow-sm outline-none transition-all" />
                <input type="tel" placeholder="Mobile Number" className="w-full px-6 py-4 rounded-xl border border-icy-blue focus:ring-2 focus:ring-blue-energy focus:border-blue-energy text-[15px] text-brand-black shadow-sm outline-none transition-all" />
                <div className="flex gap-4 pt-2">
                  <button onClick={handlePrev} className="flex-1 py-4 font-medium text-brand-black/70 hover:text-brand-black transition-colors">Back</button>
                  <button onClick={() => alert('Assessment submitted')} className="flex-1 bg-slate-900 text-white rounded-xl py-4 font-semibold hover:bg-slate-800 shadow-md transition-colors">Show My Options</button>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-center gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={`h-1.5 rounded-full ${step >= i ? 'w-8 bg-slate-900' : 'w-4 bg-slate-200'} transition-all`}></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

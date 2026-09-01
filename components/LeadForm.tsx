'use client';
import { useState } from 'react';

export function LeadForm() {
  const [step, setStep] = useState(1);

  const handleNext = () => setStep((s) => Math.min(s + 1, 4));
  const handlePrev = () => setStep((s) => Math.max(s - 1, 1));

  return (
    <section id="lead-form" className="py-24 sm:py-32 bg-canvas">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="text-3xl font-medium tracking-[-1px] text-ink sm:text-4xl">
            Check your options
          </h2>
        </div>

        <div className="mx-auto max-w-xl bg-white border border-hairline rounded-[20px] p-8 shadow-sm">
          {step === 1 && (
            <div className="animate-fade-in">
              <h3 className="text-xl font-medium mb-6 text-ink text-center">What's troubling you?</h3>
              <div className="space-y-3">
                {['High-interest loan', 'Credit-card debt', 'Multiple EMIs', 'Need a fresh loan'].map((opt) => (
                  <button key={opt} onClick={handleNext} className="w-full text-left px-6 py-4 rounded-xl border border-hairline hover:border-primary hover:bg-primary/5 transition-colors text-ink">
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in">
              <h3 className="text-xl font-medium mb-6 text-ink text-center">Approximately how much do you earn?</h3>
              <div className="space-y-4">
                <input type="number" placeholder="Monthly Salary (₹)" className="w-full px-6 py-4 rounded-xl border border-hairline focus:ring-2 focus:ring-primary focus:border-primary text-ink" />
                <div className="flex gap-4">
                  <button onClick={handlePrev} className="flex-1 py-4 text-ink-mute hover:text-ink">Back</button>
                  <button onClick={handleNext} className="flex-1 bg-primary text-white rounded-xl py-4 font-medium hover:bg-primary-press">Continue</button>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-fade-in">
              <h3 className="text-xl font-medium mb-6 text-ink text-center">How much do you currently owe?</h3>
              <div className="space-y-4">
                <input type="number" placeholder="Total Outstanding (₹)" className="w-full px-6 py-4 rounded-xl border border-hairline focus:ring-2 focus:ring-primary focus:border-primary text-ink" />
                <div className="flex gap-4">
                  <button onClick={handlePrev} className="flex-1 py-4 text-ink-mute hover:text-ink">Back</button>
                  <button onClick={handleNext} className="flex-1 bg-primary text-white rounded-xl py-4 font-medium hover:bg-primary-press">Continue</button>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="animate-fade-in">
              <h3 className="text-xl font-medium mb-6 text-ink text-center">Where should we reach you?</h3>
              <div className="space-y-4">
                <input type="text" placeholder="Your Name" className="w-full px-6 py-4 rounded-xl border border-hairline focus:ring-2 focus:ring-primary focus:border-primary text-ink" />
                <input type="tel" placeholder="Mobile Number" className="w-full px-6 py-4 rounded-xl border border-hairline focus:ring-2 focus:ring-primary focus:border-primary text-ink" />
                <div className="flex gap-4">
                  <button onClick={handlePrev} className="flex-1 py-4 text-ink-mute hover:text-ink">Back</button>
                  <button onClick={() => alert('Assessment submitted')} className="flex-1 bg-primary text-white rounded-xl py-4 font-medium hover:bg-primary-press">Show My Options</button>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-center gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={`h-1.5 rounded-full ${step >= i ? 'w-8 bg-primary' : 'w-4 bg-hairline'} transition-all`}></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

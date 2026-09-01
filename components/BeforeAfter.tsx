import { ArrowDownIcon } from '@heroicons/react/24/outline';

export function BeforeAfter() {
  return (
    <section className="py-24 sm:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-4xl font-medium tracking-[-1px] text-ink sm:text-5xl">
            See the difference.
          </h2>
        </div>

        <div className="mx-auto max-w-4xl relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            
            {/* BEFORE */}
            <div className="bg-canvas p-8 sm:p-10 rounded-[20px] border border-hairline shadow-sm relative">
              <h3 className="text-sm font-bold tracking-[0.1em] text-ink-mute uppercase mb-8">YOUR CURRENT DEBT</h3>
              <div className="space-y-4 mb-8 text-lg font-light text-ink">
                <div className="flex justify-between items-center border-b border-hairline pb-4">
                  <span className="text-ink-mute">Credit Card</span>
                  <span>₹14,500</span>
                </div>
                <div className="flex justify-between items-center border-b border-hairline pb-4">
                  <span className="text-ink-mute">Personal Loan</span>
                  <span>₹12,000</span>
                </div>
                <div className="flex justify-between items-center border-b border-hairline pb-4">
                  <span className="text-ink-mute">Credit Card</span>
                  <span>₹8,500</span>
                </div>
              </div>
              
              <div className="flex justify-between text-sm text-ink-mute mb-8 font-light">
                <div className="flex flex-col items-center">
                  <span className="font-semibold text-ink">3</span> lenders
                </div>
                <div className="flex flex-col items-center border-l border-r border-hairline px-6 mx-2">
                  <span className="font-semibold text-ink">3</span> due dates
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-semibold text-ink">3</span> interest rates
                </div>
              </div>
              
              <div className="pt-8 border-t border-hairline bg-red-50 -mx-8 sm:-mx-10 -mb-8 sm:-mb-10 p-8 sm:p-10 rounded-b-[20px]">
                <div className="flex justify-between items-end text-red-700">
                  <span className="font-medium">Total Outflow</span>
                  <span className="text-3xl font-semibold">₹35,000 <span className="text-sm font-light">/ month</span></span>
                </div>
              </div>
            </div>

            {/* AFTER */}
            <div className="bg-primary p-8 sm:p-10 rounded-[20px] shadow-[0_8px_30px_rgba(29,111,242,0.2)] text-white relative flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold tracking-[0.1em] text-white/70 uppercase mb-8">CREDIT EXPERT INDIA</h3>
                <p className="text-2xl font-light mb-8">ONE STRUCTURED PLAN</p>
                <div className="space-y-4 text-lg text-white/90 font-light border-l-2 border-white/20 pl-6">
                  <p>One lender</p>
                  <p>One due date</p>
                  <p>One interest rate</p>
                </div>
              </div>
              
              <div className="mt-12 pt-8 border-t border-white/20">
                <div className="flex justify-between items-end text-white">
                  <span className="font-medium text-white/80">Potential EMI*</span>
                  <span className="text-4xl font-semibold tracking-[-1px]">₹21,800 <span className="text-sm font-light text-white/80">/ month</span></span>
                </div>
              </div>
            </div>
            
          </div>
          
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-4 shadow-lg border border-hairline hidden md:block z-10">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </div>
          
          <div className="mt-16 text-center max-w-2xl mx-auto">
            <h3 className="text-3xl font-medium tracking-[-1px] text-green-600 mb-4">
              ₹13,200 potential monthly difference
            </h3>
            <p className="text-sm text-ink-mute font-light leading-[1.5]">
              *Estimates are illustrative. Actual rates, eligibility and approval depend on the respective lender and borrower profile. Restructuring debt may lead to paying more interest over the life of the loan depending on the term.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

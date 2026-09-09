export function DifferentApproach() {
  return (
    <section className="py-24 sm:py-32 bg-slate-900 text-white relative z-0 overflow-hidden">
      {/* Abstract Background Element (Stripe dark mode angled slice) */}
      <div className="absolute inset-0 bg-slate-900 -z-20" style={{ clipPath: 'polygon(0 0, 100% 5%, 100% 100%, 0 95%)' }} />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 transform -skew-y-6 scale-110 -z-10" />
      
      {/* Subtle glowing orbs in the background */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-[32px] sm:text-[48px] font-bold tracking-tighter text-white leading-[1.1] mb-6">
            We don't start with the loan.
          </h2>
          <h3 className="text-[24px] sm:text-[36px] font-bold tracking-tight text-blue-400">
            We start with your debt.
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* Typical */}
          <div className="border border-white/10 rounded-2xl p-8 sm:p-12 bg-white/5 backdrop-blur-sm shadow-xl">
            <h3 className="text-[11px] font-bold mb-10 text-slate-400 uppercase tracking-widest">TYPICAL LOAN MARKETPLACE</h3>
            <div className="flex flex-col gap-6 text-[17px] font-medium text-slate-300">
              <div className="flex items-center gap-6">
                <span className="w-2 h-2 rounded-full bg-slate-500 shadow-[0_0_8px_rgba(100,116,139,0.5)]"></span>
                <span>You</span>
              </div>
              <div className="ml-1 border-l border-white/10 h-8"></div>
              <div className="flex items-center gap-6">
                <span className="w-2 h-2 rounded-full bg-slate-500 shadow-[0_0_8px_rgba(100,116,139,0.5)]"></span>
                <span>Application</span>
              </div>
              <div className="ml-1 border-l border-white/10 h-8"></div>
              <div className="flex items-center gap-6">
                <span className="w-2 h-2 rounded-full bg-slate-500 shadow-[0_0_8px_rgba(100,116,139,0.5)]"></span>
                <span>Lender</span>
              </div>
            </div>
          </div>
          
          {/* Credit Expert */}
          <div className="border border-blue-500/30 rounded-2xl p-8 sm:p-12 bg-blue-500/10 relative backdrop-blur-sm shadow-2xl">
            <h3 className="text-[11px] font-bold mb-10 text-blue-400 uppercase tracking-widest">CREDIT EXPERT INDIA</h3>
            <div className="flex flex-col gap-6 text-[17px] font-medium text-white">
              <div className="flex items-center gap-6">
                <span className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_12px_rgba(96,165,250,0.8)]"></span>
                <span>You</span>
              </div>
              <div className="ml-1 border-l border-blue-500/30 h-8"></div>
              <div className="flex items-center gap-6">
                <span className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_12px_rgba(96,165,250,0.8)]"></span>
                <span>Debt review</span>
              </div>
              <div className="ml-1 border-l border-blue-500/30 h-8"></div>
              <div className="flex items-center gap-6">
                <span className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_12px_rgba(96,165,250,0.8)]"></span>
                <span>Cost analysis</span>
              </div>
              <div className="ml-1 border-l border-blue-500/30 h-8"></div>
              <div className="flex items-center gap-6">
                <span className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_12px_rgba(96,165,250,0.8)]"></span>
                <span>Possible solutions</span>
              </div>
              <div className="ml-1 border-l border-blue-500/30 h-8"></div>
              <div className="flex items-center gap-6">
                <span className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_12px_rgba(96,165,250,0.8)]"></span>
                <span>Suitable lender options</span>
              </div>
              <div className="ml-1 border-l border-blue-500/30 h-8"></div>
              <div className="flex items-center gap-6">
                <span className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_12px_rgba(96,165,250,0.8)]"></span>
                <span>Human guidance</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

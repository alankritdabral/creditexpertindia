export function DifferentApproach() {
  return (
    <section className="py-24 sm:py-32 bg-primary text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-4xl font-medium tracking-tight text-white sm:text-6xl leading-[1.1] mb-6">
            We don't start with the loan.
          </h2>
          <h3 className="text-3xl font-medium tracking-tight text-brand-blue sm:text-5xl">
            We start with your debt.
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Typical */}
          <div className="border border-white/10 rounded-3xl p-8 sm:p-12 bg-white/5">
            <h3 className="text-sm font-bold mb-10 text-white/40 uppercase tracking-wider">TYPICAL LOAN MARKETPLACE</h3>
            <div className="flex flex-col gap-6 text-xl font-medium text-white/60">
              <div className="flex items-center gap-6">
                <span className="w-2 h-2 rounded-full bg-white/20"></span>
                <span>You</span>
              </div>
              <div className="ml-1 border-l border-white/10 h-6"></div>
              <div className="flex items-center gap-6">
                <span className="w-2 h-2 rounded-full bg-white/20"></span>
                <span>Application</span>
              </div>
              <div className="ml-1 border-l border-white/10 h-6"></div>
              <div className="flex items-center gap-6">
                <span className="w-2 h-2 rounded-full bg-white/20"></span>
                <span>Lender</span>
              </div>
            </div>
          </div>
          
          {/* Credit Expert */}
          <div className="border border-brand-blue/30 rounded-3xl p-8 sm:p-12 bg-brand-blue/10 relative">
            <h3 className="text-sm font-bold mb-10 text-brand-blue uppercase tracking-wider">CREDIT EXPERT INDIA</h3>
            <div className="flex flex-col gap-6 text-xl font-medium text-white">
              <div className="flex items-center gap-6">
                <span className="w-2 h-2 rounded-full bg-brand-blue"></span>
                <span>You</span>
              </div>
              <div className="ml-1 border-l border-brand-blue/30 h-6"></div>
              <div className="flex items-center gap-6">
                <span className="w-2 h-2 rounded-full bg-brand-blue"></span>
                <span>Debt review</span>
              </div>
              <div className="ml-1 border-l border-brand-blue/30 h-6"></div>
              <div className="flex items-center gap-6">
                <span className="w-2 h-2 rounded-full bg-brand-blue"></span>
                <span>Cost analysis</span>
              </div>
              <div className="ml-1 border-l border-brand-blue/30 h-6"></div>
              <div className="flex items-center gap-6">
                <span className="w-2 h-2 rounded-full bg-brand-blue"></span>
                <span>Possible solutions</span>
              </div>
              <div className="ml-1 border-l border-brand-blue/30 h-6"></div>
              <div className="flex items-center gap-6">
                <span className="w-2 h-2 rounded-full bg-brand-blue"></span>
                <span>Suitable lender options</span>
              </div>
              <div className="ml-1 border-l border-brand-blue/30 h-6"></div>
              <div className="flex items-center gap-6">
                <span className="w-2 h-2 rounded-full bg-brand-blue"></span>
                <span>Human guidance</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function DifferentApproach() {
  return (
    <section className="py-24 sm:py-32 bg-ink text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-4xl font-medium tracking-[-1px] sm:text-5xl">
            Not another loan marketplace.
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Typical */}
          <div className="border border-white/10 rounded-2xl p-8 bg-white/5">
            <h3 className="text-xl font-semibold mb-6 text-white/50 uppercase tracking-wide text-sm">Typical Loan Marketplace</h3>
            <div className="flex flex-col gap-4 text-lg font-light text-white/80">
              <div className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">1</span>
                <span>You</span>
              </div>
              <div className="ml-3 border-l border-white/20 h-6"></div>
              <div className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">2</span>
                <span>Form</span>
              </div>
              <div className="ml-3 border-l border-white/20 h-6"></div>
              <div className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">3</span>
                <span>Lender offers</span>
              </div>
            </div>
          </div>
          
          {/* Credit Expert */}
          <div className="border border-primary/30 rounded-2xl p-8 bg-primary/10 relative">
            <div className="absolute -top-3 right-6 bg-primary text-white text-xs px-3 py-1 rounded-full font-semibold tracking-wide">OUR APPROACH</div>
            <h3 className="text-xl font-semibold mb-6 text-primary uppercase tracking-wide text-sm">Credit Expert India</h3>
            <div className="flex flex-col gap-4 text-lg font-light text-white">
              <div className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">1</span>
                <span>You</span>
              </div>
              <div className="ml-3 border-l border-primary/50 h-6"></div>
              <div className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">2</span>
                <span>Debt review</span>
              </div>
              <div className="ml-3 border-l border-primary/50 h-6"></div>
              <div className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">3</span>
                <span>Cost analysis</span>
              </div>
              <div className="ml-3 border-l border-primary/50 h-6"></div>
              <div className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">4</span>
                <span>Suitable lender options</span>
              </div>
              <div className="ml-3 border-l border-primary/50 h-6"></div>
              <div className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">5</span>
                <span>Human guidance</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mx-auto max-w-2xl text-center mt-20">
          <h3 className="text-3xl font-medium tracking-[-1px] text-white">
            We start with your problem, not the loan.
          </h3>
        </div>
      </div>
    </section>
  );
}

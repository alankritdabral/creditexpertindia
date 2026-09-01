export function Hero() {
  return (
    <section className="relative pt-32 pb-24 sm:pt-48 sm:pb-32 bg-white flex flex-col justify-center items-center text-center min-h-[90vh] overflow-hidden">
      {/* Background styling kept minimal for premium feel */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        
        {/* Text Content */}
        <div className="flex-1 text-left">
          <p className="text-xs font-semibold tracking-[0.1px] text-primary-deep uppercase mb-8">
            CREDIT EXPERT INDIA
          </p>
          <h1 className="text-[48px] leading-[1.05] font-medium tracking-[-1px] text-ink sm:text-[64px] mb-6">
            Too many EMIs? <br/> Let&apos;s simplify them.
          </h1>
          <p className="mt-6 text-lg leading-[1.5] text-ink-mute font-light max-w-xl">
            Review your loans, credit-card dues and repayment burden to understand whether consolidation, refinancing or another repayment option could work better for you.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <a
              href="#debt-health-check"
              className="rounded-full bg-primary px-6 py-3 text-base font-medium leading-none text-white shadow-sm hover:bg-primary-press transition-colors"
            >
              Check My Debt Options
            </a>
            <a
              href="#contact"
              className="rounded-full bg-transparent px-6 py-3 text-base font-medium leading-none text-ink border border-ink/20 hover:bg-ink/5 transition-colors"
            >
              Talk to a Credit Expert
            </a>
          </div>
          <p className="mt-4 text-[13px] leading-[1.4] font-normal tracking-[-0.39px] text-ink-mute">
            Free · Confidential · No obligation
          </p>
        </div>

        {/* Debt Transformation Visualization */}
        <div className="flex-1 w-full max-w-md bg-white border border-ink/10 rounded-2xl p-8 shadow-sm text-left">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center text-ink-mute text-sm pb-2 border-b border-ink/5">
              <span>Multiple Debts</span>
            </div>
            
            <div className="flex justify-between items-center bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm font-medium">
              <span>4 Personal Loans</span>
            </div>
            <div className="flex justify-between items-center bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm font-medium">
              <span>2 Credit Cards</span>
            </div>
            <div className="flex justify-between items-center bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm font-medium">
              <span>1 App Loan</span>
            </div>
            
            <div className="flex justify-center py-2">
              <svg className="w-5 h-5 text-ink/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
            </div>
            
            <div className="flex justify-between items-center text-ink-mute text-sm pb-2 border-b border-ink/5">
              <span>Debt Analysis</span>
            </div>
            
            <div className="flex justify-between items-center bg-green-50 text-green-700 px-4 py-4 rounded-lg text-base font-medium border border-green-200">
              <span>Potentially 1 Manageable Plan</span>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}

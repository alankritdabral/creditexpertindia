export function Hero() {
  return (
    <section className="relative pt-32 pb-24 sm:pt-48 sm:pb-32 bg-warm-bg flex flex-col justify-center items-center text-center min-h-[90vh] overflow-hidden">
      {/* Subtle blue radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-4xl px-6 lg:px-8 relative z-10 flex flex-col items-center">
        <p className="text-sm font-semibold tracking-widest text-text-muted uppercase mb-8">
          CREDIT EXPERT INDIA
        </p>
        
        <h1 className="text-[56px] leading-[1.05] font-semibold tracking-tight text-primary sm:text-[76px] mb-4">
          TOO MANY EMIs?
        </h1>
        
        <h2 className="text-[40px] leading-[1.1] font-medium tracking-tight text-text-main sm:text-[56px] mb-8">
          Let's simplify them.
        </h2>
        
        <p className="text-lg leading-relaxed text-text-muted font-normal max-w-2xl mb-12 sm:text-xl">
          Review your loans, cards and repayment burden.
        </p>
        
        <div className="flex flex-col items-center gap-6 w-full sm:w-auto">
          <a
            href="#debt-health-check"
            className="w-full sm:w-auto rounded-full bg-brand-blue px-8 py-4 text-lg font-medium text-white hover:bg-blue-700 transition-colors shadow-lg shadow-brand-blue/20"
          >
            Check My Debt Options &rarr;
          </a>
          
          <p className="text-[14px] leading-relaxed font-medium text-text-muted">
            Free &middot; Confidential &middot; No obligation
          </p>
        </div>
      </div>
    </section>
  );
}

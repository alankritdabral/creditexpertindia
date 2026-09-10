export function CaseStudies() {
  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div className="mb-10">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-text-main mb-2">
          Real situations.
        </h2>
        <p className="text-sm text-text-muted">A look at how we help everyday borrowers simplify their debt.</p>
      </div>

      <div className="bg-warm-bg p-6 rounded-2xl border border-slate-200/60 flex-1">
        <h3 className="text-lg font-bold text-text-main mb-6 border-b border-slate-200/60 pb-3">
          Salaried Professional
        </h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-2">Before</h4>
            <div className="font-mono text-slate-700 bg-white p-3 rounded-lg text-sm space-y-1 border border-slate-200/60">
              <p>6 active loans</p>
              <p>₹31,800 monthly EMI</p>
              <p>Interest rates: 18–36%</p>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-2">Outcome</h4>
            <p className="text-sm text-text-muted border-l-2 border-brand-blue/30 pl-3">
              Explored a simpler repayment structure with a single EMI based on the customer's eligibility profile.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-[10px] text-slate-400 leading-tight">
          Customer results vary. Outcomes depend on individual circumstances, lender policies and final approval.
        </p>
      </div>
    </div>
  );
}

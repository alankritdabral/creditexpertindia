export function CaseStudies() {
  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div className="mb-10">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-brand-black mb-2">
          Real situations.
        </h2>
        <p className="text-sm text-brand-black/70">A look at how we help everyday borrowers simplify their debt.</p>
      </div>

      <div className="bg-icy-blue p-6 rounded-2xl border border-icy-blue/60 flex-1">
        <h3 className="text-lg font-bold text-brand-black mb-6 border-b border-icy-blue/60 pb-3">
          Salaried Professional
        </h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-2">Before</h4>
            <div className="font-mono text-brand-black/90 bg-white p-3 rounded-lg text-sm space-y-1 border border-icy-blue/60">
              <p>6 active loans</p>
              <p>₹31,800 monthly EMI</p>
              <p>Interest rates: 18–36%</p>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-2">Outcome</h4>
            <p className="text-sm text-brand-black/70 border-l-2 border-blue-energy/30 pl-3">
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

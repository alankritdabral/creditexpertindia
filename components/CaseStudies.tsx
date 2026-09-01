export function CaseStudies() {
  return (
    <section className="py-24 sm:py-32 bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Real situations. Real decisions.
          </h2>
        </div>

        <div className="mx-auto max-w-3xl">
          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-2xl font-semibold text-slate-900 mb-8 border-b border-slate-100 pb-4">
              Salaried Professional
            </h3>
            
            <div className="space-y-8">
              <div>
                <h4 className="text-sm font-bold tracking-widest text-slate-400 uppercase mb-3">Before</h4>
                <div className="font-mono text-slate-700 bg-slate-50 p-4 rounded-lg text-sm space-y-1 border border-slate-100">
                  <p>6 active loans</p>
                  <p>₹31,800 monthly EMI</p>
                  <p>Interest rates: 18–36%</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold tracking-widest text-slate-400 uppercase mb-3">Challenge</h4>
                <p className="text-slate-600 border-l-2 border-blue-200 pl-4">
                  Multiple repayments and high-interest debt were putting pressure on monthly cash flow.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold tracking-widest text-slate-400 uppercase mb-3">Reviewed</h4>
                <p className="text-slate-600 border-l-2 border-blue-200 pl-4">
                  Loan balances, interest rates, EMI structure and consolidation eligibility.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold tracking-widest text-slate-400 uppercase mb-3">Outcome</h4>
                <p className="text-slate-600 border-l-2 border-blue-200 pl-4">
                  A simpler repayment structure was explored based on the customer&apos;s eligibility.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500 max-w-2xl mx-auto">
              Customer results vary. Outcomes depend on individual circumstances, lender policies and final approval.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

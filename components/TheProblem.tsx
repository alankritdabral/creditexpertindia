export function TheProblem() {
  return (
    <section className="py-24 sm:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            When debt gets complicated, clarity matters.
          </h2>
          <p className="mt-8 text-lg leading-8 text-slate-600">
            One loan becomes two. Two become five. Different lenders, different due dates, different interest rates — and the same salary has to handle all of them.
          </p>
          <div className="mt-16 bg-slate-50 p-8 rounded-2xl text-left font-mono text-sm sm:text-base border border-slate-100 shadow-sm mx-auto max-w-md">
            <div className="flex justify-between py-3 border-b border-slate-200">
              <span className="text-slate-600">Personal Loan</span>
              <span className="text-slate-900 font-medium">₹18,500 EMI</span>
            </div>
            <div className="flex justify-between py-3 border-b border-slate-200">
              <span className="text-slate-600">Credit Card</span>
              <span className="text-slate-900 font-medium">₹12,000 / month</span>
            </div>
            <div className="flex justify-between py-3 border-b border-slate-200">
              <span className="text-slate-600">App Loan</span>
              <span className="text-slate-900 font-medium">₹8,500 EMI</span>
            </div>
            <div className="flex justify-between py-3 border-b border-slate-200">
              <span className="text-slate-600">Another Loan</span>
              <span className="text-slate-900 font-medium">₹7,000 EMI</span>
            </div>
            <div className="flex justify-between py-4 mt-2">
              <span className="font-bold text-slate-900">Monthly repayments</span>
              <span className="font-bold text-slate-900">₹46,000</span>
            </div>
          </div>
          <p className="mt-16 text-xl font-medium text-slate-900">
            You don&apos;t always need more credit. Sometimes you need a better plan.
          </p>
        </div>
      </div>
    </section>
  );
}

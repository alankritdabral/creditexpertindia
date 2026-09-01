import { ArrowDownIcon } from '@heroicons/react/24/outline';

export function BeforeAfter() {
  return (
    <section className="py-24 sm:py-32 bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            From scattered repayments to a clearer picture.
          </h2>
        </div>

        <div className="mx-auto max-w-3xl">
          {/* BEFORE */}
          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm text-center">
            <h3 className="text-sm font-bold tracking-widest text-slate-400 uppercase mb-8">BEFORE</h3>
            <div className="font-mono text-slate-600 mb-8 space-y-2">
              <p className="text-xl font-medium text-slate-900 mb-6 font-sans">5 Active Loans</p>
              <p>Different lenders</p>
              <p>Different due dates</p>
              <p>Different interest rates</p>
              <p>Multiple EMIs</p>
            </div>
            <div className="pt-8 border-t border-slate-100">
              <p className="text-sm font-medium text-slate-500 mb-1 font-sans">Monthly repayment</p>
              <p className="text-3xl font-semibold text-slate-900 font-sans">₹46,000</p>
            </div>
          </div>

          <div className="flex justify-center my-8">
            <div className="bg-white p-3 rounded-full shadow-sm border border-slate-100">
              <ArrowDownIcon className="w-6 h-6 text-slate-400" />
            </div>
          </div>

          {/* AFTER */}
          <div className="bg-blue-600 p-8 sm:p-12 rounded-3xl shadow-sm text-center text-white">
            <h3 className="text-sm font-bold tracking-widest text-blue-200 uppercase mb-8">AFTER REVIEW</h3>
            <p className="text-2xl font-semibold mb-8">One clearer repayment strategy</p>
            <div className="space-y-4 text-lg text-blue-100">
              <p>Understand your total debt</p>
              <p>Understand your interest</p>
              <p>Review suitable options</p>
              <p>Choose what makes sense</p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-xl font-medium text-slate-900">
              The goal isn&apos;t simply another loan. It&apos;s a repayment structure you can understand.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

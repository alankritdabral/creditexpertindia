export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 sm:py-32 bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-24">
          <p className="text-base font-semibold leading-7 text-blue-600 tracking-wide uppercase">
            A SIMPLE PROCESS
          </p>
          <h2 className="mt-2 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            First understand. Then decide.
          </h2>
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
            {/* 01 */}
            <div>
              <p className="text-sm font-bold tracking-widest text-slate-400 mb-6">01</p>
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">
                Tell us where you stand.
              </h3>
              <p className="text-slate-600 leading-relaxed font-light">
                Share your basic loan, EMI, income and borrowing details.
              </p>
            </div>

            {/* 02 */}
            <div>
              <p className="text-sm font-bold tracking-widest text-slate-400 mb-6">02</p>
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">
                We review your situation.
              </h3>
              <p className="text-slate-600 leading-relaxed font-light">
                We look at your current obligations, interest rates and requirements.
              </p>
            </div>

            {/* 03 */}
            <div>
              <p className="text-sm font-bold tracking-widest text-slate-400 mb-6">03</p>
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">
                Understand your options.
              </h3>
              <p className="text-slate-600 leading-relaxed font-light">
                We&apos;ll explain the relevant options available to you so you can make an informed decision.
              </p>
            </div>
          </div>

          <div className="mt-24 text-center border-t border-slate-200 pt-12">
            <p className="text-xl font-medium text-slate-900">
              No pressure. No complicated financial language.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

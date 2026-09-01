export function WhyUs() {
  return (
    <section id="about-us" className="py-24 sm:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-24">
          <h2 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Financial guidance should feel simple.
          </h2>
        </div>

        <div className="mx-auto max-w-4xl grid grid-cols-1 sm:grid-cols-2 gap-12 text-center">
          <div>
            <h3 className="text-2xl font-semibold text-slate-900 mb-4">Human</h3>
            <p className="text-lg text-slate-600 font-light">
              Speak with people who understand your situation.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-slate-900 mb-4">Clear</h3>
            <p className="text-lg text-slate-600 font-light">
              No unnecessary financial jargon.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-slate-900 mb-4">Transparent</h3>
            <p className="text-lg text-slate-600 font-light">
              Understand the applicable terms before moving forward.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-slate-900 mb-4">Confidential</h3>
            <p className="text-lg text-slate-600 font-light">
              Your financial information should be handled responsibly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

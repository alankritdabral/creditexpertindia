export function WhyUs() {
  return (
    <section id="about-us" className="py-24 sm:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-24">
          <h2 className="text-4xl font-semibold tracking-tight text-brand-black sm:text-5xl">
            Financial guidance should feel simple.
          </h2>
        </div>

        <div className="mx-auto max-w-4xl grid grid-cols-1 sm:grid-cols-2 gap-12 text-center">
          <div>
            <h3 className="text-2xl font-semibold text-brand-black mb-4">Human</h3>
            <p className="text-lg text-brand-black/80 font-light">
              Speak with people who understand your situation.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-brand-black mb-4">Clear</h3>
            <p className="text-lg text-brand-black/80 font-light">
              No unnecessary financial jargon.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-brand-black mb-4">Transparent</h3>
            <p className="text-lg text-brand-black/80 font-light">
              Understand the applicable terms before moving forward.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-brand-black mb-4">Confidential</h3>
            <p className="text-lg text-brand-black/80 font-light">
              Your financial information should be handled responsibly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

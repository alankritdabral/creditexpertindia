export function WhatBringsYouHere() {
  return (
    <section className="py-24 sm:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-[48px] leading-[1.15] font-light tracking-[-0.96px] text-ink sm:text-[56px] sm:leading-[1.03] sm:tracking-[-1.4px]">
            What brings you here?
          </h2>
        </div>

        <div className="mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
          <a
            href="#lead-form"
            className="group block p-12 bg-canvas-soft rounded-[12px] border border-hairline hover:border-primary-bg-subdued-hover hover:bg-canvas transition-all text-left relative overflow-hidden shadow-sm hover:shadow-[0_8px_30px_-5px_rgba(0,55,112,0.08)]"
          >
            <h3 className="text-[32px] leading-[1.1] font-light tracking-[-0.64px] text-ink mb-4 group-hover:text-primary transition-colors">
              I have existing debt
            </h3>
            <p className="text-[16px] leading-[1.4] text-ink-mute font-light mb-8 group-hover:text-ink-secondary transition-colors">
              Multiple EMIs, high interest or credit-card dues.
            </p>
            <div className="flex items-center text-primary font-bold text-2xl group-hover:translate-x-2 transition-transform">
              →
            </div>
          </a>

          <a
            href="#lead-form"
            className="group block p-12 bg-canvas-soft rounded-[12px] border border-hairline hover:border-primary-bg-subdued-hover hover:bg-canvas transition-all text-left relative overflow-hidden shadow-sm hover:shadow-[0_8px_30px_-5px_rgba(0,55,112,0.08)]"
          >
            <h3 className="text-[32px] leading-[1.1] font-light tracking-[-0.64px] text-ink mb-4 group-hover:text-primary transition-colors">
              I need a new loan
            </h3>
            <p className="text-[16px] leading-[1.4] text-ink-mute font-light mb-8 group-hover:text-ink-secondary transition-colors">
              Looking for a personal loan or better borrowing option.
            </p>
            <div className="flex items-center text-primary font-bold text-2xl group-hover:translate-x-2 transition-transform">
              →
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

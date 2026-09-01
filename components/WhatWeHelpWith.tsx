export function WhatWeHelpWith() {
  return (
    <section className="py-24 sm:py-32 bg-canvas-soft">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <p className="text-[10px] font-normal tracking-[0.1px] leading-[1.15] text-primary-deep uppercase">
            HOW WE CAN HELP
          </p>
          <h2 className="mt-2 text-[48px] leading-[1.15] font-light tracking-[-0.96px] text-ink sm:text-[56px] sm:leading-[1.03] sm:tracking-[-1.4px]">
            One financial situation. Several possible paths.
          </h2>
          <p className="mt-6 text-[16px] leading-[1.4] text-ink-mute font-light">
            We start by understanding where you are before discussing where you could go.
          </p>
        </div>

        <div className="mx-auto mt-24 max-w-2xl lg:max-w-4xl">
          <div className="space-y-24">
            {/* 01 */}
            <div className="relative">
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-[13px] font-normal text-ink-mute tracking-[-0.39px] [font-feature-settings:'tnum']">01</span>
                <h3 className="text-[32px] leading-[1.1] font-light tracking-[-0.64px] text-ink">Existing Debt</h3>
              </div>
              <p className="text-[18px] leading-[1.4] text-ink-mute font-light mb-8 border-l border-hairline pl-6 py-1">
                Already managing multiple loans or credit-card dues?
              </p>
              <div className="pl-6">
                <p className="mb-4 text-ink font-light text-[15px]">We help you review:</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-ink-mute text-[15px] font-light">
                  <li className="flex gap-x-3 items-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" /> High-interest loans
                  </li>
                  <li className="flex gap-x-3 items-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" /> Multiple EMIs
                  </li>
                  <li className="flex gap-x-3 items-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" /> Credit-card dues
                  </li>
                  <li className="flex gap-x-3 items-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" /> App / fintech loans
                  </li>
                  <li className="flex gap-x-3 items-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" /> Debt consolidation possibilities
                  </li>
                  <li className="flex gap-x-3 items-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" /> Balance-transfer possibilities
                  </li>
                </ul>
              </div>
            </div>

            {/* 02 */}
            <div className="relative">
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-[13px] font-normal text-ink-mute tracking-[-0.39px] [font-feature-settings:'tnum']">02</span>
                <h3 className="text-[32px] leading-[1.1] font-light tracking-[-0.64px] text-ink">Fresh Loan</h3>
              </div>
              <p className="text-[18px] leading-[1.4] text-ink-mute font-light mb-8 border-l border-hairline pl-6 py-1">
                Looking for a new personal loan?
              </p>
              <div className="pl-6 text-ink-mute font-light text-[15px] space-y-4">
                <p>We help eligible borrowers explore suitable options based on their profile and requirements.</p>
                <p>For salaried professionals, available options may include rates starting from <strong className="text-ink font-normal [font-feature-settings:'tnum']">9.95% ROI</strong>, subject to eligibility, lender policies and approval.</p>
              </div>
            </div>

            {/* 03 */}
            <div className="relative">
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-[13px] font-normal text-ink-mute tracking-[-0.39px] [font-feature-settings:'tnum']">03</span>
                <h3 className="text-[32px] leading-[1.1] font-light tracking-[-0.64px] text-ink">Better Repayment</h3>
              </div>
              <p className="text-[18px] leading-[1.4] text-ink-mute font-light mb-8 border-l border-hairline pl-6 py-1">
                Sometimes the best solution isn&apos;t another loan.
              </p>
              <div className="pl-6">
                <p className="mb-4 text-ink font-light text-[15px]">Depending on your situation, we may help you evaluate:</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-ink-mute text-[15px] font-light">
                  <li className="flex gap-x-3 items-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" /> Consolidation
                  </li>
                  <li className="flex gap-x-3 items-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" /> Balance transfer
                  </li>
                  <li className="flex gap-x-3 items-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" /> Refinancing
                  </li>
                  <li className="flex gap-x-3 items-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" /> Targeted repayment
                  </li>
                  <li className="flex gap-x-3 items-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" /> Improving loan eligibility
                  </li>
                  <li className="flex gap-x-3 items-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" /> Continuing your existing repayment plan
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-24 border-t border-hairline pt-12">
            <p className="text-[20px] leading-[1.4] tracking-[-0.2px] font-light text-ink text-center">
              We don&apos;t promise a solution before understanding the problem.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

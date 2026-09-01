export function Hero() {
  return (
    <section className="relative pt-32 pb-24 sm:pt-48 sm:pb-32 bg-white flex flex-col justify-center items-center text-center min-h-[90vh] overflow-hidden">
      {/* Gradient Mesh Backdrop */}
      <div className="absolute inset-0 top-0 left-0 right-0 h-[600px] pointer-events-none overflow-hidden -z-10 opacity-70">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[80%] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#f5e9d4] via-[#f5e9d4] to-transparent blur-[80px] mix-blend-multiply"></div>
        <div className="absolute top-[0%] left-[20%] w-[40%] h-[70%] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#ffb480] via-[#ffb480] to-transparent blur-[80px] mix-blend-multiply opacity-80"></div>
        <div className="absolute top-[-10%] right-[10%] w-[50%] h-[80%] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#b9b9f9] via-[#b9b9f9] to-transparent blur-[80px] mix-blend-multiply opacity-60"></div>
        <div className="absolute top-[10%] right-[25%] w-[40%] h-[70%] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#533afd] via-[#533afd] to-transparent blur-[80px] mix-blend-multiply opacity-40"></div>
        <div className="absolute top-[20%] right-[5%] w-[35%] h-[60%] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#ea2261] via-[#ea2261] to-transparent blur-[80px] mix-blend-multiply opacity-30"></div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.1px] text-primary-deep uppercase mb-8">
            CREDIT EXPERT INDIA
          </p>
          <h1 className="text-[56px] leading-[1.03] font-light tracking-[-1.4px] text-ink sm:text-[72px]">
            Too Many EMIs?<br />Let&apos;s Make Your Debt Manageable.
          </h1>
          <p className="mt-8 text-lg leading-[1.4] text-ink-mute font-light max-w-2xl mx-auto">
            We help you understand your existing loans, credit-card dues and repayment options — and find a path that makes more sense for your situation.
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-6">
            <a
              href="#lead-form"
              className="rounded-full bg-primary px-4 py-2 text-base font-normal leading-none text-white shadow-sm hover:bg-primary-press transition-colors"
            >
              Get My Free Assessment
            </a>
            <p className="text-[13px] leading-[1.4] font-normal tracking-[-0.39px] text-ink-mute">
              Confidential • No obligation • Human assistance
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function LeadForm() {
  return (
    <section id="lead-form" className="py-24 sm:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-[48px] leading-[1.15] font-light tracking-[-0.96px] text-ink sm:text-[56px] sm:leading-[1.03] sm:tracking-[-1.4px]">
            Let&apos;s make your debt easier to understand.
          </h2>
          <p className="mt-8 text-[18px] leading-[1.4] text-ink-mute font-light">
            Tell us about your loans, EMIs or borrowing requirement. We&apos;ll help you understand what options may be available.
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-6">
            <button
              type="button"
              className="rounded-full bg-primary px-4 py-2 text-[16px] font-normal leading-none text-white shadow-sm hover:bg-primary-press transition-colors"
            >
              Get My Free Assessment
            </button>
            <p className="text-[13px] font-normal tracking-[-0.39px] text-ink-mute">
              Confidential • No obligation
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

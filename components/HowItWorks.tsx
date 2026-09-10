export function HowItWorks() {
  return (
    <div id="how-it-works" className="w-full h-full flex flex-col justify-between">
      <div className="mb-10">
        <p className="text-xs font-semibold leading-7 text-brand-blue tracking-widest uppercase">
          A SIMPLE PROCESS
        </p>
        <h2 className="mt-2 text-2xl md:text-3xl font-bold tracking-tight text-text-main">
          First understand. <br /> Then decide.
        </h2>
      </div>

      <div className="flex flex-col gap-8">
        {/* 01 */}
        <div className="relative pl-6 border-l-2 border-slate-100">
          <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-slate-200" />
          <p className="text-xs font-bold tracking-widest text-slate-400 mb-2">01</p>
          <h3 className="text-lg font-bold text-text-main mb-1">
            Tell us where you stand.
          </h3>
          <p className="text-sm text-text-muted leading-relaxed">
            Share your basic loan, EMI, income and borrowing details.
          </p>
        </div>

        {/* 02 */}
        <div className="relative pl-6 border-l-2 border-slate-100">
          <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-slate-200" />
          <p className="text-xs font-bold tracking-widest text-slate-400 mb-2">02</p>
          <h3 className="text-lg font-bold text-text-main mb-1">
            We review your situation.
          </h3>
          <p className="text-sm text-text-muted leading-relaxed">
            We look at your current obligations, interest rates and requirements.
          </p>
        </div>

        {/* 03 */}
        <div className="relative pl-6 border-l-2 border-transparent">
          <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-slate-200" />
          <p className="text-xs font-bold tracking-widest text-slate-400 mb-2">03</p>
          <h3 className="text-lg font-bold text-text-main mb-1">
            Understand your options.
          </h3>
          <p className="text-sm text-text-muted leading-relaxed">
            We'll explain the options available to you so you can make an informed decision.
          </p>
        </div>
      </div>
    </div>
  );
}

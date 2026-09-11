import { ClipboardList, Search, Lightbulb } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: ClipboardList,
    title: "Tell us where you stand.",
    desc: "Share your basic loan, EMI, income and borrowing details.",
  },
  {
    num: "02",
    icon: Search,
    title: "We review your situation.",
    desc: "We look at your current obligations, interest rates and requirements.",
  },
  {
    num: "03",
    icon: Lightbulb,
    title: "Understand your options.",
    desc: "We'll explain the options available to you so you can make an informed decision.",
  },
];

export function HowItWorks() {
  return (
    <div id="how-it-works" className="w-full h-full flex flex-col justify-between">
      <div className="mb-10 text-center">
        <p className="text-xs font-semibold leading-7 text-brand-blue tracking-widest uppercase">
          A SIMPLE PROCESS
        </p>
        <h2 className="mt-2 text-2xl md:text-3xl font-bold tracking-tight text-text-main">
          First understand. <br />Then decide.
        </h2>
      </div>

      <div className="flex flex-col gap-0">
        {steps.map((step, i) => {
          const Icon = step.icon;
          const isLast = i === steps.length - 1;
          return (
            <div key={step.num} className={`relative flex flex-col items-center text-center group cursor-default ${isLast ? '' : 'pb-10'}`}>
              {/* Step indicator */}
              <div className="flex flex-col items-center mb-4">
                {/* Circle */}
                <div className="w-12 h-12 rounded-full bg-brand-blue/10 border-2 border-brand-blue/30 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:border-brand-blue group-hover:shadow-[0_0_10px_rgba(10,37,64,0.2)]">
                  <Icon className="w-5 h-5 text-brand-blue" strokeWidth={2} />
                </div>
              </div>

              {/* Content */}
              <div className="transition-transform duration-300 group-hover:-translate-y-0.5">
                <p className="text-[11px] font-bold tracking-widest text-brand-blue/60 mb-2 uppercase transition-colors duration-300 group-hover:text-brand-blue">STEP {step.num}</p>
                <h3 className="text-lg font-bold text-text-main mb-2 transition-colors duration-300 group-hover:text-brand-blue">
                  {step.title}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed max-w-sm mx-auto">
                  {step.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import { ShieldCheck } from 'lucide-react';

export function TrustBar() {
  return (
    <section className="py-24 sm:py-32 bg-white border-t border-hairline border-b overflow-hidden">
      <div className="mx-auto px-6 lg:px-8 w-full max-w-7xl">
        {/* Existing Trust Section */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-[48px] leading-[1.15] font-light tracking-[-0.96px] text-ink sm:text-[56px] sm:leading-[1.03] sm:tracking-[-1.4px]">
            You should know who you&apos;re dealing with.
          </h2>
        </div>

        <div className="mx-auto max-w-3xl bg-canvas-soft border border-hairline rounded-[12px] p-8 sm:p-12 text-center shadow-sm">
          <div className="flex justify-center mb-6 pb-6 border-b border-hairline">
            <ShieldCheck className="h-10 w-10 text-primary-soft" />
          </div>
          <p className="text-[22px] font-light tracking-[-0.22px] text-ink mb-8">
            Credit Expert India
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-xl mx-auto text-[15px] text-ink-mute font-light">
            <div className="flex items-center gap-3">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" /> Human-assisted credit guidance
            </div>
            <div className="flex items-center gap-3">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" /> Clear communication
            </div>
            <div className="flex items-center gap-3">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" /> Confidential handling of info
            </div>
            <div className="flex items-center gap-3">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" /> Transparent loan terms
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

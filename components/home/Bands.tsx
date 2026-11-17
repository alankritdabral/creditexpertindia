import Link from "next/link";
import { ArrowRight } from "lucide-react";

/** Big orange call-to-action band that closes the page above the black footer. */
export function CtaBand() {
  return (
    <section className="w-full bg-[#FF5A00] text-[#2E2E2E] border-t-2 border-[#2E2E2E]">
      <div className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-[72px] flex flex-col lg:flex-row lg:items-end justify-between gap-10">
        <h2 className="text-[44px] sm:text-[64px] lg:text-[88px] leading-[0.95] font-extrabold tracking-[-0.05em] max-w-3xl">
          Ready to pay less on your EMIs?
        </h2>
        <Link
          href="#check-eligibility"
          data-analytics-cta="cta_band_check_eligibility"
          data-analytics-location="cta_band"
          className="inline-flex items-center justify-center gap-2 h-14 px-8 bg-[#2E2E2E] text-white text-lg font-bold rounded border-2 border-[#2E2E2E] shadow-[4px_4px_0_0_#FFDA00] hover:bg-white hover:text-[#2E2E2E] transition-colors"
        >
          Check My Eligibility <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </section>
  );
}

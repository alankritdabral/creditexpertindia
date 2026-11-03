import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist or has moved.",
  robots: { index: false, follow: true },
};

const suggestions = [
  { href: "/personal-loan", label: "Personal loans" },
  { href: "/debt-consolidation", label: "Debt consolidation" },
  { href: "/personal-loan-emi-calculator", label: "EMI calculator" },
  { href: "/learning-center", label: "Learning center" },
  { href: "/faq", label: "FAQs" },
  { href: "/contact", label: "Contact us" },
];

export default function NotFound() {
  return (
    <div className="bg-white text-[#0A2540]">
      <div className="h-[84px]" aria-hidden="true" />
      <section className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-20 md:py-32">
        <p className="text-base font-semibold text-[#0052CC]">Error 404</p>
        <h1 className="mt-4 text-[clamp(36px,8vw,56px)] leading-[1.02] tracking-[-0.04em] font-bold max-w-3xl">
          We couldn&apos;t find that page.
        </h1>
        <p className="mt-5 text-lg md:text-xl leading-relaxed text-[#3C4F69] max-w-xl">
          The link may be broken or the page may have moved. Try one of these instead.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded bg-[#0052CC] text-white font-semibold text-base px-[22px] h-[48px] hover:bg-[#0A2540] transition-colors"
          >
            Back to home
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href="/eligibility"
            className="inline-flex items-center rounded border border-[#0A2540]/20 font-semibold text-base px-[22px] h-[48px] hover:border-[#0A2540] transition-colors"
          >
            Check eligibility
          </Link>
        </div>
        <ul className="mt-14 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3 max-w-xl">
          {suggestions.map((s) => (
            <li key={s.href}>
              <Link href={s.href} className="text-base font-semibold text-[#0052CC] hover:underline">
                {s.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

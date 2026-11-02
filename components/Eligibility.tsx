"use client";
import { eligibility } from "@/content/site";

const docs = [
  "PAN card & Aadhaar",
  "Latest 3 salary slips",
  "6 months of bank statements",
  "Current loan sanction letters",
  "Credit-card statements",
  "Proof of employment",
];

export function Eligibility() {
  return (
    <section className="bg-white">
      <div className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-12 lg:gap-20">
        <div>
          <h2 className="text-[40px] sm:text-[56px] leading-[1.02] tracking-[-0.04em] font-bold text-[#0A2540]">
            What will lenders look at?
          </h2>
          <p className="mt-5 text-lg md:text-xl leading-relaxed text-[#3C4F69] max-w-md">
            Every bank has its own rules, but these are the usual things. Knowing them upfront saves
            you time.
          </p>
          <p className="mt-6 text-base text-[#3C4F69] max-w-md">
            Meeting these helps us shortlist options for you, but it isn&apos;t a guarantee of
            approval. The lender always makes the final call.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-[#EAF3FF] p-7 md:p-8">
            <h3 className="text-2xl font-bold tracking-[-0.02em] text-[#0A2540]">They usually check</h3>
            <ul className="mt-5 space-y-3 text-lg leading-snug text-[#0A2540]">
              {eligibility.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </div>
          <div className="bg-[#0A2540] text-white p-7 md:p-8">
            <h3 className="text-2xl font-bold tracking-[-0.02em]">Keep these handy</h3>
            <ul className="mt-5 space-y-3 text-lg leading-snug text-[#BFDBFE]">
              {docs.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-[#BFDBFE] leading-relaxed">
              You don&apos;t upload anything when you first contact us. Files are only shared when you
              apply with a specific lender.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

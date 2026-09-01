"use client";
import { motion } from "framer-motion";
import { eligibility } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { FileCheck, CheckCircle2, ShieldAlert } from "lucide-react";

export function Eligibility() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="container-narrow">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#059669]">
                QUALIFICATION GUIDE
              </span>
              <h2 className="mt-3 text-[30px] font-extrabold tracking-tight text-[#091328] sm:text-[38px]">
                What Partner Lenders Typically Evaluate
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                While each banking partner maintains specific risk criteria, these general benchmarks help prepare your profile for evaluation.
              </p>

              <div className="mt-6 flex flex-wrap gap-2.5">
                {eligibility.map((e) => (
                  <span
                    key={e}
                    className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-50/60 px-4 py-2 text-xs font-bold text-[#091328]"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                    <span>{e}</span>
                  </span>
                ))}
              </div>

              <div className="mt-6 flex items-start gap-2.5 rounded-2xl bg-amber-50 p-4 border border-amber-200/70">
                <ShieldAlert className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
                <p className="text-xs leading-5 text-amber-900 font-medium">
                  Criteria varies by lender. Meeting basic criteria helps shortlist options but does not constitute an approval guarantee.
                </p>
              </div>
            </div>
          </Reveal>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-slate-200/90 bg-gradient-to-b from-slate-50 to-white p-7 shadow-md sm:p-8"
          >
            <div className="flex items-center gap-2 border-b border-slate-200 pb-4 mb-6">
              <FileCheck className="h-5 w-5 text-[#059669]" />
              <h3 className="text-base font-extrabold text-[#091328]">Standard Verification Documents</h3>
            </div>

            <ul className="grid gap-3 sm:grid-cols-2 text-xs font-semibold text-slate-700">
              {[
                "PAN Card & Aadhaar",
                "Latest Salary Slips (3 Mos)",
                "Bank Statement (6 Mos)",
                "Current Loan Sanction Letters",
                "Credit Card Statements",
                "Proof of Employment",
              ].map((d) => (
                <li key={d} className="flex items-center gap-2.5 rounded-xl bg-white p-3 border border-slate-200/60 shadow-xs">
                  <div className="h-2 w-2 rounded-full bg-[#10b981]" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-[11px] leading-5 text-slate-500 font-medium border-t border-slate-100 pt-4">
              🔒 Privacy First: We never collect document uploads on initial contact. You share files only when proceeding with a specific lender application.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


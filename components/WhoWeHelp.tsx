"use client";
import { CheckCircle2, ArrowRight, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { whoWeHelp } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";

export function WhoWeHelp() {
  return (
    <section className="bg-slate-50/80 py-16 sm:py-24 border-y border-slate-200/80">
      <div className="container-narrow grid gap-10 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#059669]">
              TARGET BORROWERS
            </span>
            <h2 className="mt-3 text-[30px] font-extrabold leading-tight tracking-tight text-[#091328] sm:text-[38px]">
              If Any of These Describe Your Situation, We Can Help You
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
              We eliminate debt stress with structured, empathetic financial assistance — whether you require debt consolidation, rate reduction, or a clean fresh loan.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <motion.a
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                href="#lead-form"
                className="shimmer-btn inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#091328] px-7 text-xs font-extrabold tracking-wider text-white shadow-md hover:bg-[#132247]"
              >
                <span>CHECK MY ELIGIBILITY</span>
                <ArrowRight className="h-4 w-4 text-emerald-400" />
              </motion.a>
            </div>
          </div>
        </Reveal>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-slate-200/90 bg-white p-7 shadow-md sm:p-8"
        >
          <div className="flex items-center gap-2 border-b border-slate-100 pb-4 mb-5 text-xs font-extrabold text-[#091328] uppercase tracking-wider">
            <Shield className="h-4 w-4 text-emerald-600" /> Common Salaried Profiles We Support
          </div>

          <ul className="space-y-3.5">
            {whoWeHelp.map((item) => (
              <li key={item} className="flex items-start gap-3 text-xs sm:text-sm font-semibold text-slate-700">
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <CheckCircle2 className="h-4 w-4 stroke-[2.5]" />
                </div>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-[11px] font-medium leading-5 text-slate-500 border border-slate-100">
            * Note: Lender policies govern final approval. Meeting general criteria helps spot suitable options.
          </div>
        </motion.div>
      </div>
    </section>
  );
}


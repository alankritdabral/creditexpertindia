"use client";
import { motion } from "framer-motion";
import { whyUs } from "@/content/site";
import { Building2, UserCheck, Zap, Headphones, Eye, Lock, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Reveal, Stagger } from "@/components/ui/Reveal";

const icons = [Building2, UserCheck, Zap, Headphones, Eye, Lock];

export function WhyUs() {
  return (
    <section className="bg-slate-50 py-16 sm:py-24 border-b border-slate-200">
      <div className="container-narrow">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#059669]">
              OUR COMMITMENT
            </span>
            <h2 className="mt-3 text-[30px] font-extrabold tracking-tight text-[#091328] sm:text-[40px]">
              Your Finances Deserve Transparency.
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
              We focus on honest financial counseling, realistic eligibility assessments, and clear communication.
            </p>
          </div>
        </Reveal>

        <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyUs.map((w, i) => {
            const Icon = icons[i % icons.length] ?? Building2;
            return (
              <motion.div
                key={w.title}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
                }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-7 shadow-xs transition-all duration-300 hover:border-emerald-500/40 hover:shadow-xl"
              >
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#091328] to-[#132247] text-emerald-400 shadow-md group-hover:bg-gradient-to-br group-hover:from-[#059669] group-hover:to-[#10b981] group-hover:text-white transition-all">
                    <Icon className="h-6 w-6 stroke-[2]" />
                  </div>

                  <h3 className="mt-6 text-lg font-extrabold text-[#091328] group-hover:text-[#059669] transition-colors">
                    {w.title}
                  </h3>
                  <p className="mt-2.5 text-xs leading-6 text-slate-600 font-medium">{w.desc}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-bold text-slate-500">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Verified Standard</span>
                </div>
              </motion.div>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}


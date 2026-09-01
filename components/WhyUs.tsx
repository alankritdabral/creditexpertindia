"use client";
import { motion } from "framer-motion";
import { whyUs } from "@/content/site";
import { Building2, UserCheck, Zap, Headphones, Eye, Lock, ShieldCheck } from "lucide-react";
import { Reveal, Stagger } from "@/components/ui/Reveal";

const icons = [Building2, UserCheck, Zap, Headphones, Eye, Lock];

export function WhyUs() {
  return (
    <section className="relative overflow-hidden bg-[#040814] py-16 sm:py-24 text-white">
      {/* Subtle Dark Mesh Blobs */}
      <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="container-narrow relative">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400">
              WHY CHOOSE US
            </span>
            <h2 className="mt-3 text-[30px] font-extrabold tracking-tight text-white sm:text-[40px]">
              Expert, Trustworthy & Transparent Credit Assistance
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">
              A modern fintech credit guidance network dedicated to helping salaried Indians eliminate predatory interest rates.
            </p>
          </div>
        </Reveal>

        <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whyUs.map((c, i) => {
            const Icon = icons[i] ?? Building2;
            return (
              <motion.div
                key={c.title}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
                }}
              >
                <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 p-7 shadow-2xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/50 hover:bg-slate-900">
                  <div className="absolute top-0 right-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-emerald-500/10 blur-xl group-hover:bg-emerald-500/20 transition-all" />

                  <div>
                    <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:scale-105 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all">
                      <Icon className="h-6 w-6 stroke-[2]" />
                    </div>

                    <h3 className="mt-6 text-lg font-extrabold text-white group-hover:text-emerald-300 transition-colors">
                      {c.title}
                    </h3>
                    <p className="mt-2.5 text-xs leading-6 text-slate-400 font-medium">{c.desc}</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-2 text-[11px] font-bold text-slate-400">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Verified Standard</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}


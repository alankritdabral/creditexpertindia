"use client";
import { motion } from "framer-motion";
import { howItWorks } from "@/content/site";
import { Reveal, Stagger } from "@/components/ui/Reveal";
import { CheckCircle2, ShieldCheck } from "lucide-react";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white py-16 sm:py-24">
      <div className="container-narrow">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#059669]">
              OUR SIMPLE WORKFLOW
            </span>
            <h2 className="mt-3 text-[30px] font-extrabold tracking-tight text-[#091328] sm:text-[40px]">
              A Clear, Transparent Process — No Hidden Surprises
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
              Here is how we assist you from initial assessment to potential loan disbursal through our partner network.
            </p>
          </div>
        </Reveal>

        <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {howItWorks.map((s, i) => (
            <motion.div
              key={s.step}
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
              }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-7 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#091328] to-[#132247] font-black text-white text-base shadow-md group-hover:bg-gradient-to-br group-hover:from-[#059669] group-hover:to-[#10b981] transition-all">
                  {s.step}
                </div>
                <span className="text-[11px] font-extrabold tracking-wider text-slate-600 uppercase">
                  STEP 0{i + 1}
                </span>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-extrabold text-[#091328] group-hover:text-[#059669] transition-colors">
                  {s.title}
                </h3>
                <p className="mt-2.5 text-xs leading-6 text-slate-600 font-medium">{s.desc}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-bold text-emerald-600">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Zero Obligation Stage</span>
              </div>
            </motion.div>
          ))}
        </Stagger>

        <Reveal delay={0.15}>
          <div className="mx-auto mt-10 flex max-w-3xl items-center gap-3 rounded-2xl bg-slate-50 p-4 border border-slate-200/80">
            <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-600" />
            <p className="text-xs leading-5 text-slate-600 font-medium">
              We never promise <span className="font-bold text-slate-800">guaranteed approval, guaranteed disbursal, or guaranteed lowest interest rate</span>. Every partner lender evaluates applications based on individual credit history and internal policy.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}


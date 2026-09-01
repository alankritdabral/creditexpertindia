"use client";
import { ArrowRight, Combine, HandCoins, RefreshCw, PlusCircle, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { services } from "@/content/site";
import { Reveal, Stagger } from "@/components/ui/Reveal";

const icons = [Combine, HandCoins, RefreshCw, PlusCircle];

export function Services() {
  return (
    <section id="services" className="bg-gradient-to-b from-slate-50 to-white py-16 sm:py-24 border-b border-slate-200">
      <div className="container-narrow">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#059669]">
              SOLUTIONS & ADVISORY
            </span>
            <h2 className="mt-3 text-[30px] font-extrabold tracking-tight text-[#091328] sm:text-[40px]">
              How Can We Help?
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
              Explore options tailored to your debt situation and borrowing requirements across our partner network.
            </p>
          </div>
        </Reveal>

        <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = icons[i % icons.length] ?? Combine;
            const featured = s.id === "consolidation";
            return (
              <motion.div
                key={s.title}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
                }}
              >
                <div
                  className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl p-7 sm:p-8 transition-all duration-300 ${
                    featured
                      ? "border-2 border-emerald-500/40 bg-gradient-to-br from-white via-emerald-50/30 to-white shadow-xl hover:shadow-2xl"
                      : "border border-slate-200/90 bg-white shadow-xs hover:border-slate-300 hover:shadow-xl"
                  }`}
                >
                  {featured && (
                    <div className="absolute top-0 right-0 rounded-bl-2xl bg-gradient-to-r from-[#059669] to-[#10b981] px-4 py-1.5 text-[11px] font-extrabold tracking-wide text-white shadow-xs">
                      ★ FEATURED SOLUTION
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between">
                      <div
                        className={`flex h-13 w-13 items-center justify-center rounded-2xl shadow-md transition-transform group-hover:scale-105 ${
                          featured
                            ? "bg-gradient-to-br from-[#059669] to-[#10b981] text-white"
                            : "bg-gradient-to-br from-[#091328] to-[#132247] text-emerald-400"
                        }`}
                      >
                        <Icon className="h-6 w-6 stroke-[2]" />
                      </div>
                    </div>

                    <h3 className="mt-6 text-xl font-extrabold text-[#091328] group-hover:text-[#059669] transition-colors">
                      {s.title}
                    </h3>
                    <p className="mt-2.5 text-xs leading-6 text-slate-600 font-medium">{s.desc}</p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <a
                      href={s.href}
                      className="inline-flex items-center gap-2 text-xs font-extrabold tracking-wider text-[#091328] group-hover:text-[#059669] transition-all uppercase"
                    >
                      <span>Explore →</span>
                      <ArrowRight className="h-4 w-4 text-emerald-600 group-hover:translate-x-1 transition-transform" />
                    </a>

                    <div className="flex items-center gap-1 text-[11px] font-bold text-slate-500">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                      <span>Confidential</span>
                    </div>
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


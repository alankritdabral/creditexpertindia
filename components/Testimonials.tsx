"use client";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { testimonials } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-white py-16 sm:py-24 border-b border-slate-200">
      <div className="container-narrow">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">
              CUSTOMER EXPERIENCES
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Why Customers Choose Us
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
              Real feedback from salaried professionals who evaluated their borrowing and debt consolidation options with us.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-slate-50/50 p-6 sm:p-7 shadow-xs hover:border-emerald-500/30 hover:shadow-md transition-all"
            >
              <div>
                <div className="flex gap-1 text-amber-400">
                  {Array.from({ length: t.rating }).map((_, k) => (
                    <Star key={k} className="h-4 w-4 fill-amber-400" />
                  ))}
                </div>
                <p className="mt-4 text-xs sm:text-sm leading-6 text-slate-700 font-medium">
                  "{t.text}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/80">
                <p className="text-sm font-extrabold text-slate-900">{t.name}</p>
                <p className="text-xs font-semibold text-slate-500">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

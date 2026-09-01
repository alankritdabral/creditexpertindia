"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { faqs } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="bg-slate-50 py-14 sm:py-20">
      <div className="container-narrow">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold tracking-widest text-[#0E9F6E]">FAQS</p>
            <h2 className="mt-3 text-[28px] font-bold tracking-tight text-[#0B1D3A] sm:text-[36px]">Your Questions, Answered Clearly</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">We are conservative with claims because this is financial services. Here are the most asked questions.</p>
          </div>
        </Reveal>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mx-auto mt-8 max-w-3xl overflow-hidden rounded-3xl border border-slate-200 bg-white">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="border-b border-slate-100 last:border-b-0">
                <button onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6">
                  <span className="text-sm font-bold leading-6 text-[#0B1D3A] sm:text-[15px]">{f.q}</span>
                  <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }} className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${isOpen ? "bg-[#0B1D3A] text-white border-[#0B1D3A]" : "bg-slate-50 text-slate-500 border-slate-200"}`}>
                    <ChevronDown className="h-4 w-4" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                      <div className="px-5 pb-5 text-sm leading-6 text-slate-600 sm:px-6">{f.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

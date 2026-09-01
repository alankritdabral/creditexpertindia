"use client";
import { ArrowRight, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";

export function FinalCTA() {
  return (
    <section className="bg-white py-10 sm:py-14">
      <div className="container-narrow">
        <motion.div initial={{ opacity: 0, y: 20, scale: 0.98 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="relative overflow-hidden rounded-[28px] bg-[#0B1D3A] px-6 py-10 text-center sm:px-10 sm:py-14">
          <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="pointer-events-none absolute -top-20 -right-20 h-[400px] w-[400px] rounded-full bg-[#0E9F6E] blur-3xl" />
          <Reveal>
            <h2 className="mx-auto max-w-3xl text-[26px] font-bold leading-tight tracking-tight text-white sm:text-[36px]">Ready to Explore a Better Way to Manage Your Credit?</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">Tell us about your requirement and our credit experts will help you understand the options available for your profile.</p>
          </Reveal>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }} className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <motion.a variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }} whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.98 }} href="#lead-form" className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-7 text-sm font-extrabold text-[#0B1D3A] hover:bg-slate-100">
              CHECK MY ELIGIBILITY <ArrowRight className="h-4 w-4" />
            </motion.a>
            <motion.a variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }} whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }} href="#lead-form" className="inline-flex h-12 items-center gap-2 rounded-full border border-white/20 bg-white/10 px-7 text-sm font-bold text-white hover:bg-white/20 backdrop-blur">
              <Phone className="h-4 w-4" /> TALK TO AN EXPERT
            </motion.a>
          </motion.div>
          <p className="mt-4 text-xs text-slate-400">No obligation. Secure & confidential. The lender makes the final decision on approval and terms.</p>
        </motion.div>
      </div>
    </section>
  );
}

"use client";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section id="home" className="relative flex flex-col items-center justify-center min-h-[90vh] bg-[#F8FAFC] py-20 text-center overflow-hidden">
      {/* Background Texture & Glows (Light Mode) */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#e2e8f080_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f080_1px,transparent_1px)] bg-[size:48px_48px]" />
      <div className="absolute top-0 right-1/4 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/2 rounded-full bg-blue-400/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 h-[400px] w-[400px] translate-y-1/2 -translate-x-1/2 rounded-full bg-emerald-400/10 blur-[100px] pointer-events-none" />

      <div className="container-narrow relative z-10 flex flex-col items-center mt-12 sm:mt-0">
        {/* Subtle Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-slate-700 shadow-sm"
        >
          <ShieldCheck className="h-4 w-4 text-blue-600" />
          <span>Debt Consolidation & Advisory</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl text-[40px] font-black leading-[1.1] tracking-tight text-slate-900 sm:text-[64px] md:text-[80px]"
        >
          Too Many EMIs? <br className="hidden sm:block" />
          <span className="text-blue-600">
            Let&apos;s Make Them Simpler.
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-xl font-medium"
        >
          Consolidate your high-interest loans and credit cards into a single manageable plan starting at 9.95% p.a.
        </motion.p>

        {/* Single CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10"
        >
          <a
            href="#lead-form"
            className="group relative inline-flex h-14 items-center justify-center gap-3 overflow-hidden rounded-full bg-blue-600 px-10 text-sm font-extrabold uppercase tracking-wider text-white transition-all hover:scale-105 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/30 active:scale-95 shadow-xl shadow-blue-600/20"
          >
            <span className="relative z-10">Check Your Eligibility</span>
            <div className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white text-blue-600">
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

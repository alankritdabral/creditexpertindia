"use client";
import { ShieldCheck, ArrowRight, Play, CheckCircle2, TrendingDown } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} id="home" className="relative flex flex-col items-center justify-start min-h-[140vh] bg-slate-50 pt-32 pb-20 text-center overflow-hidden">
      {/* Background Texture & Glows */}
      <div className="absolute inset-0 -z-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
      <div className="absolute top-[-10%] left-1/2 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-slate-200/50 blur-[150px] pointer-events-none" />

      <div className="container-narrow relative z-10 flex flex-col items-center">
        {/* Subtle Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/60 backdrop-blur-md px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-slate-800 shadow-sm"
        >
          <ShieldCheck className="h-4 w-4 text-slate-700" />
          <span>Debt Consolidation Platform</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl text-[44px] font-black leading-[1.05] tracking-tight text-slate-900 sm:text-[64px] md:text-[84px]"
        >
          Optimize your debt with <br className="hidden sm:block" />
          <span className="relative inline-block">
            <span className="relative z-10 text-slate-900">AI-driven insights.</span>
            <span className="absolute bottom-2 left-0 -z-10 h-4 w-full bg-slate-200/80 -rotate-1"></span>
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl font-medium"
        >
          See your entire financial picture in one place. Consolidate high-interest loans and credit cards into a single manageable plan starting at 9.95% p.a.
        </motion.p>

        {/* Dual CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <a
            href="#lead-form"
            className="group relative inline-flex h-14 w-full sm:w-auto items-center justify-center gap-3 overflow-hidden rounded-full bg-slate-900 px-8 text-sm font-bold tracking-wide text-white transition-all hover:scale-[1.02] hover:bg-black hover:shadow-xl hover:shadow-slate-900/20 focus:outline-none active:scale-95"
          >
            <span className="relative z-10">Get started now</span>
            <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#how-it-works"
            className="group relative inline-flex h-14 w-full sm:w-auto items-center justify-center gap-3 rounded-full bg-white px-8 text-sm font-bold tracking-wide text-slate-900 border border-slate-200 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50 hover:shadow-md"
          >
            <Play className="h-4 w-4 fill-slate-900" />
            <span>View demo</span>
          </a>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm font-semibold text-slate-600"
        >
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              <div className="h-6 w-6 rounded-full bg-slate-800 border-2 border-white flex items-center justify-center text-[10px] text-white">⭐</div>
            </div>
            <span>4.9/5 Rating</span>
          </div>
          <div className="h-4 w-[1px] bg-slate-300 hidden sm:block"></div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-slate-700" />
            <span>Bank-level security</span>
          </div>
          <div className="h-4 w-[1px] bg-slate-300 hidden sm:block"></div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-slate-700" />
            <span>Real-time AI insights</span>
          </div>
        </motion.div>

        {/* Interactive 3D Preview Card */}
        <motion.div
          style={{ y, opacity }}
          initial={{ opacity: 0, y: 100, rotateX: 10 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-16 w-full max-w-5xl perspective-1000"
        >
          <div className="relative rounded-3xl border border-white/40 bg-white/40 backdrop-blur-2xl p-2 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] ring-1 ring-black/5">
            <div className="absolute -left-8 top-12 z-20 hidden md:block">
              <motion.div 
                animate={{ y: [0, -10, 0] }} 
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-xl backdrop-blur-md"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700">
                  <TrendingDown className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500">Interest Saved</p>
                  <p className="text-lg font-black text-slate-900">₹1,24,500</p>
                </div>
              </motion.div>
            </div>
            <div className="absolute -right-6 bottom-24 z-20 hidden md:block">
              <motion.div 
                animate={{ y: [0, 10, 0] }} 
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-xl backdrop-blur-md"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500">EMI Reduced by</p>
                  <p className="text-lg font-black text-slate-900">42%</p>
                </div>
              </motion.div>
            </div>
            
            <div className="relative overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-900/5">
              <Image 
                src="/dashboard-mockup.png" 
                alt="Dashboard Mockup" 
                width={1200} 
                height={800} 
                className="w-full h-auto object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-60"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


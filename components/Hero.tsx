"use client";
import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { AnimatedWord } from "./AnimatedWord";
import { InteractiveDebtVisualizer } from "./InteractiveDebtVisualizer";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  const bottomOpacity = useTransform(scrollYProgress, [0.6, 0.65, 1], [0, 1, 1]);
  const bottomY = useTransform(scrollYProgress, [0.6, 0.65, 1], [50, 0, 0]);
  const bottomPointerEvents = useTransform(scrollYProgress, (v) => v > 0.63 ? "auto" : "none");

  return (
    <section ref={containerRef} className="relative bg-warm-bg h-[600vh]">
      <div className="sticky top-0 h-screen w-full flex flex-col justify-start sm:justify-center items-center text-center overflow-x-clip pt-28 sm:pt-32 pb-12 z-0">
        {/* Subtle blue radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="mx-auto max-w-4xl px-6 lg:px-8 relative z-10 flex flex-col items-center shrink-0">
          <h1 className="text-[42px] sm:text-[64px] md:text-[76px] leading-[1.05] font-bold tracking-tighter text-slate-900 mb-4 sm:mb-8 flex flex-col items-center justify-center mt-8 gap-3 sm:gap-4">
            <span className="block">We help you</span>
            <motion.span layout className="flex flex-row flex-nowrap whitespace-nowrap items-center">
              <AnimatedWord /> debt.
            </motion.span>
          </h1>
          <div className="max-w-2xl space-y-4 mb-2">
            <p className="text-lg leading-relaxed text-text-main font-medium sm:text-xl">
              From high-interest loans and multiple EMIs to credit card debt — we help you take control of what you owe.
            </p>
          </div>
        </div>
        
        {/* Interactive Scroll Visualizer now controlled by Hero's scroll progress */}
        <InteractiveDebtVisualizer scrollYProgress={scrollYProgress} />
        
        <motion.div 
          initial={{ opacity: 0 }}
          style={{ opacity: bottomOpacity, y: bottomY, pointerEvents: bottomPointerEvents as import("react").CSSProperties["pointerEvents"] }}
          className="mx-auto max-w-4xl px-6 lg:px-8 relative z-10 flex flex-col items-center mt-2 shrink-0"
        >
          <div className="max-w-2xl mb-6 text-center">
            <p className="text-lg leading-relaxed text-text-muted font-normal sm:text-[19px]">
              Get expert guidance to reduce your interest burden, manage your repayments, consolidate eligible debts, and work towards becoming debt-free.
            </p>
          </div>
          <div className="flex flex-col items-center gap-6 w-full sm:w-auto">
            <a
              href="#debt-health-check"
              className="w-full sm:w-auto rounded-full bg-brand-blue px-8 py-4 text-lg font-medium text-white hover:bg-blue-700 transition-colors shadow-lg shadow-brand-blue/20"
            >
              Talk to an Expert
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

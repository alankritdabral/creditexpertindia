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
  const bottomMaxHeight = useTransform(scrollYProgress, [0.67, 0.73, 1], [0, 300, 300]);
  const bottomOpacity = useTransform(scrollYProgress, [0.73, 0.79, 1], [0, 1, 1]);
  const bottomY = useTransform(scrollYProgress, [0.73, 0.79, 1], [30, 0, 0]);
  const bottomPointerEvents = useTransform(scrollYProgress, (v) => v > 0.76 ? "auto" : "none");

  return (
    <section ref={containerRef} className="relative bg-warm-bg h-[600vh]">
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center text-center overflow-x-clip px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-8 z-0">
        {/* Subtle blue radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="mx-auto max-w-4xl relative z-10 flex flex-col items-center shrink-0">
          <h1 className="text-[36px] sm:text-[64px] md:text-[76px] leading-[1.05] font-bold tracking-tighter text-slate-900 mb-3 sm:mb-6 flex flex-col items-center justify-center gap-2 sm:gap-4">
            <span className="block">We help you</span>
            <motion.span layout className="flex flex-row flex-nowrap whitespace-nowrap items-center">
              <AnimatedWord /> debt.
            </motion.span>
          </h1>
          <div className="max-w-2xl space-y-2 sm:space-y-4 mb-2 sm:mb-4">
            <p className="text-base sm:text-xl leading-relaxed text-text-main font-medium">
              From high-interest loans and multiple EMIs to credit card debt — we help you take control of what you owe.
            </p>
          </div>
        </div>
        
        {/* Interactive Scroll Visualizer now controlled by Hero's scroll progress */}
        <InteractiveDebtVisualizer scrollYProgress={scrollYProgress} />
        
        <motion.div 
          initial={{ opacity: 0 }}
          style={{ 
            maxHeight: bottomMaxHeight,
            opacity: bottomOpacity, 
            y: bottomY, 
            pointerEvents: bottomPointerEvents 
          }}
          className="mx-auto max-w-4xl relative z-10 flex flex-col items-center shrink-0 overflow-hidden"
        >
          <div className="max-w-2xl mb-4 sm:mb-6 text-center">
            <p className="text-base sm:text-[19px] leading-relaxed text-text-muted font-normal">
              Get expert guidance to reduce your interest burden, manage your repayments, consolidate eligible debts, and work towards becoming debt-free.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 sm:gap-6 w-full sm:w-auto">
            <a
              href="#debt-health-check"
              className="w-full sm:w-auto rounded-full bg-brand-blue px-8 py-4 text-base sm:text-lg font-medium text-white hover:bg-blue-700 transition-colors shadow-lg shadow-brand-blue/20"
            >
              Talk to an Expert
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

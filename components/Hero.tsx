"use client";
import { motion } from "framer-motion";
import { AnimatedWord } from "./AnimatedWord";
import { AnimatedMeshBackground } from "./AnimatedMeshBackground";

export function Hero() {
  return (
    <section className="relative w-full pt-32 pb-32 lg:pt-48 lg:pb-40 bg-background overflow-hidden">
      {/* Stripe-like Rich Slanted Background */}
      <div className="absolute inset-0 -z-10 h-[110%] w-full" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 85%)' }}>
        <AnimatedMeshBackground />
        {/* Additional slanted stripes (Stripe signature) */}
        <div className="absolute top-0 right-0 w-full h-[200%] max-w-[60%] transform origin-top-right -skew-y-12 bg-gradient-to-bl from-[#E2D6CC]/40 to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-full h-[150%] max-w-[40%] transform origin-top-right -skew-y-12 bg-gradient-to-bl from-white/30 to-transparent pointer-events-none" />
      </div>

      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & CTAs */}
          <div className="max-w-2xl">
            <h1 className="text-[48px] sm:text-[64px] lg:text-[76px] leading-[1.05] font-bold tracking-tighter text-brand-black mb-6 flex flex-col gap-2">
              <span className="block">We help you</span>
              <motion.span layout className="flex flex-row flex-nowrap whitespace-nowrap items-center">
                <AnimatedWord /> debt.
              </motion.span>
            </h1>
            
            <p className="text-[17px] sm:text-[19px] leading-relaxed text-brand-black/70 font-medium mb-8 max-w-xl">
              From high-interest loans and multiple EMIs to credit card debt — we help you take control of what you owe. Get expert guidance to reduce your interest burden, manage your repayments, consolidate eligible debts, and work towards becoming debt-free.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a
                href="#debt-health-check"
                className="w-full sm:w-auto rounded-full bg-slate-900 px-8 py-4 text-base font-semibold text-white hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20 text-center"
              >
                Talk to an Expert
              </a>
              <a
                href="#how-it-works"
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-semibold text-brand-black hover:text-brand-black/80 transition-colors"
              >
                Explore how it works
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-0.5">
                  <path d="M6.1584 3.13508C6.35985 2.89559 6.71885 2.86326 6.95834 3.06471L10.9583 6.43971C11.1278 6.58231 11.2268 6.7909 11.2268 7.01168C11.2268 7.23247 11.1278 7.44105 10.9583 7.58366L6.95834 10.9587C6.71885 11.1601 6.35985 11.1278 6.1584 10.8883C5.95695 10.6488 5.98928 10.2898 6.22877 10.0884L9.5539 7.28823L6.22877 4.01168C5.98928 3.81023 5.95695 3.45123 6.1584 3.13508Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Right Column: Abstract UI Graphics */}
          <div className="relative w-full aspect-square max-w-[500px] mx-auto lg:ml-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute top-10 right-10 bg-white p-6 rounded-2xl shadow-2xl border border-slate-100 w-64 z-20"
            >
              <div className="text-[11px] font-bold text-brand-black/70 uppercase mb-1">Total Payable</div>
              <div className="text-2xl font-bold text-brand-black mb-4">₹10.0 Lakhs*</div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "65%" }}
                  transition={{ duration: 1, delay: 0.8 }}
                  className="h-full bg-savings-green"
                />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute bottom-20 left-0 bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-slate-100 w-72 z-30"
            >
              <div className="flex justify-between items-center mb-3">
                <div className="text-[11px] font-bold text-savings-green uppercase">One Clear Plan</div>
              </div>
              <div className="flex justify-between items-end border-b border-slate-100 pb-2 mb-2">
                <span className="text-brand-black/70 font-medium text-sm">Interest Rate</span>
                <span className="text-lg font-bold text-brand-black">11% p.a.*</span>
              </div>
              <div className="flex justify-between items-end border-b border-slate-100 pb-2">
                <span className="text-brand-black/70 font-medium text-sm">Monthly EMI</span>
                <span className="text-lg font-bold text-brand-black">₹27,800*</span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 bg-gradient-to-tr from-icy-blue to-icy-blue rounded-[40px] opacity-20 -z-10 transform rotate-6"
            />
          </div>

        </div>
      </div>
    </section>
  );
}


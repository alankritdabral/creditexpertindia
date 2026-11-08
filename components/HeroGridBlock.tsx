"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Calculator } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";

// Only lenders that actually appear in lib/lenderEngine.ts's LENDERS table —
// the marquee previously also showed IDFC FIRST Bank, Bajaj Finserv, YES
// Bank, Credit Saison and Shriram, none of which are in that data.
import axisFinanceLogo from '@/public/logos/AXISFINANCE.svg';
import tataLogo from '@/public/logos/TATA.svg';
import ltFinanceLogo from '@/public/logos/L&T.svg';
import smfgLogo from '@/public/logos/SMFG.svg';
import kotakBankLogo from '@/public/logos/KOTAK_BANK.png';
import iciciBankLogo from '@/public/logos/ICICI.png';
import hdfcLogo from '@/public/logos/hdfc.webp';

export function HeroGridBlock() {
  const words = [
    { text: "reduce", color: "#0066FF" },
    { text: "manage", color: "#0066FF" },
    { text: "clear", color: "#15803D" }
  ];
  const [wordIndex, setWordIndex] = React.useState(0);
  const shouldReduceMotion = useReducedMotion();

  React.useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2400); // 1.8s pause + 0.6s transition = 2.4s interval
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <div className="flex flex-col justify-start pt-[40px] sm:pt-[70px] pb-6 sm:pb-12 sm:justify-center h-full min-h-max sm:min-h-[500px] lg:min-h-[700px] px-4 sm:p-8 md:px-12 lg:py-24 relative z-10 w-full">
      <div className="w-full max-w-[340px] sm:max-w-3xl">
        {/* Stripe-style Heading */}
        <h1 className="hero-title text-brand-black mb-6 font-medium tracking-[-0.04em] text-[clamp(36px,10vw,44px)] leading-[1.02] sm:text-5xl lg:text-[56px] lg:leading-[1.02]">
          A smarter way to <br className="hidden md:block" />
          <span className="inline-flex items-center flex-nowrap whitespace-nowrap">
            <motion.span layout transition={{ type: "spring", stiffness: 400, damping: 30 }} className="relative inline-flex items-center overflow-hidden h-[1.2em] mr-2 lg:mr-3 pb-1">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={words[wordIndex].text}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0, position: "absolute" }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="inline-block text-left"
                  style={{ color: words[wordIndex].color }}
                >
                  {words[wordIndex].text}
                </motion.span>
              </AnimatePresence>
            </motion.span>
            <motion.span layout transition={{ type: "spring", stiffness: 400, damping: 30 }} className="text-brand-black">your debt.</motion.span>
          </span>
        </h1>

        <p className="hero-description text-brand-black/70 mb-8 sm:mb-10 text-base leading-[1.5] sm:text-lg lg:text-xl max-w-[340px] sm:max-w-none">
          Combine multiple EMIs into one. Explore lower-rate financing options designed around your profile.
        </p>

        {/* Stripe-style CTAs */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-8">
          <Link
            href="#check-eligibility"
            data-analytics-cta="hero_check_eligibility"
            data-analytics-location="hero"
            className="flex w-full sm:w-auto px-[22px] h-[48px] bg-[#0052CC] text-white rounded text-base font-semibold hover:bg-[#0A2540] transition-all items-center justify-center gap-2 group shadow-sm"
          >
            Check My Eligibility
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="#calculator"
            data-analytics-cta="hero_see_savings"
            data-analytics-location="hero"
            className="flex w-full sm:w-auto px-[22px] h-[48px] bg-white text-brand-black border border-slate-200 rounded text-base font-semibold hover:bg-slate-50 transition-all items-center justify-center gap-2 group shadow-sm"
          >
            <Calculator className="w-4 h-4 text-slate-600" />
            See Potential Savings
          </Link>
        </div>


      </div>

    </div>
  );
}

export function HeroLogos() {
  return (
    <div className="w-full bg-white/40 sm:bg-white/90 backdrop-blur-md relative z-20 border-t border-white/20">
      <div className="max-w-[1220px] mx-auto flex flex-col xl:flex-row xl:items-center py-4 sm:py-6 overflow-hidden">

        <div className="flex-1 flex items-center min-w-0 logo-strip">
          <div className="flex w-max animate-marquee opacity-100 transition-all duration-500 items-center">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex shrink-0 items-center gap-8 sm:gap-14 pr-8 sm:pr-14">
                <Image src={axisFinanceLogo} alt="Axis Finance" className="shrink-0 h-[25px] sm:h-10 w-auto object-contain opacity-100 mix-blend-multiply" />
                <Image src={hdfcLogo} alt="HDFC Bank" className="shrink-0 h-[25px] sm:h-10 w-auto object-contain opacity-100 mix-blend-multiply" />
                <Image src={tataLogo} alt="Tata Capital" className="shrink-0 h-[25px] sm:h-10 w-auto object-contain opacity-100 mix-blend-multiply" />
                <Image src={ltFinanceLogo} alt="L&T Finance" className="shrink-0 h-[25px] sm:h-10 w-auto object-contain opacity-100 mix-blend-multiply" />
                <Image src={smfgLogo} alt="SMFG India Credit" className="shrink-0 h-[25px] sm:h-10 w-auto object-contain opacity-100 mix-blend-multiply" />
                <Image src={kotakBankLogo} alt="Kotak Mahindra Bank" className="shrink-0 h-[25px] sm:h-10 w-auto object-contain opacity-100 mix-blend-multiply" />
                <Image src={iciciBankLogo} alt="ICICI Bank" className="shrink-0 h-[25px] sm:h-10 w-auto object-contain opacity-100 mix-blend-multiply" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

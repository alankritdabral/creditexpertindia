"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Calculator, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";

import hdfcLogo from '@/public/logos/hdfc.png';
import iciciLogo from '@/public/logos/icici.png';
import axisLogo from '@/public/logos/axis.png';
import kotakLogo from '@/public/logos/kotak.png';

function OdometerDigit({ char }: { char: string }) {
  if (isNaN(Number(char)) || char.trim() === "") {
    return (
      <span className="flex h-[1em] items-center justify-center">
        {char}
      </span>
    );
  }
  return (
    <span className="relative flex h-[1em] w-[1ch] overflow-hidden">
      <motion.span
        initial={false}
        animate={{ y: `-${Number(char) * 10}%` }}
        transition={{ type: "tween", ease: [0.22, 1, 0.36, 1], duration: 0.8 }}
        className="absolute top-0 left-0 flex flex-col w-full"
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <span key={num} className="flex h-[1em] items-center justify-center">
            {num}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

function AnimatedCurrency({ amount, isMounted }: { amount: number, isMounted: boolean }) {
  const formattedAmount = isMounted
    ? new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(amount)
    : '₹15,43,29,805.12';

  const chars = formattedAmount.split("");
  const len = chars.length;
  
  return (
    <span className="inline-flex items-center text-emerald-600 font-mono tracking-tight" style={{ lineHeight: 1 }}>
      {chars.map((char, i) => (
        <OdometerDigit key={len - i - 1} char={char} />
      ))}
    </span>
  );
}

export function HeroGridBlock() {
  const BASE_AMOUNT = 154329805.12;
  // Fixed anchor timestamp so the number continuously grows over time instead of resetting on redeploys
  const BASELINE_TIMESTAMP = 1789640000000; 
  const INCREMENT_PER_SECOND = 12.45;

  const [displayAmount, setDisplayAmount] = React.useState(BASE_AMOUNT);
  
  const [isMounted, setIsMounted] = React.useState(false);
  const words = [
    { text: "reduce", color: "#2563EB" },
    { text: "manage", color: "#7C3AED" },
    { text: "clear", color: "#16A34A" }
  ];
  const [wordIndex, setWordIndex] = React.useState(0);
  const shouldReduceMotion = useReducedMotion();

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
    let animationFrameId: number;
    const startTime = performance.now();
    const ANIMATION_DURATION = 3000; // 3 seconds to smoothly count up
    
    let lastTickTime = 0;
    let nextTickDelay = 2500;

    const updateCounter = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      
      const elapsedSecondsTotal = (Date.now() - BASELINE_TIMESTAMP) / 1000;
      const trueAmount = BASE_AMOUNT + Math.max(0, elapsedSecondsTotal) * INCREMENT_PER_SECOND;

      if (elapsedTime < ANIMATION_DURATION) {
        // Smooth ease-out cubic animation to catch up to the true accrued amount
        const progress = elapsedTime / ANIMATION_DURATION;
        const easeOutProgress = 1 - Math.pow(1 - progress, 3);
        setDisplayAmount(BASE_AMOUNT + (trueAmount - BASE_AMOUNT) * easeOutProgress);
      } else {
        // After initial animation, tick every 2-3 seconds to create a more deliberate slot-machine effect
        if (currentTime - lastTickTime > nextTickDelay) {
          setDisplayAmount(trueAmount);
          lastTickTime = currentTime;
          nextTickDelay = 2000 + Math.random() * 1000; // Randomize next tick between 2s and 3s
        }
      }
      
      animationFrameId = requestAnimationFrame(updateCounter);
    };

    animationFrameId = requestAnimationFrame(updateCounter);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2400); // 1.8s pause + 0.6s transition = 2.4s interval
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <div className="flex flex-col justify-between h-full p-8 md:p-12">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-700 text-[11px] font-bold uppercase tracking-wider mb-8 shadow-sm">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
          </span>
          <span className="opacity-80">Interest Saved for Customers:</span>
          <AnimatedCurrency amount={displayAmount} isMounted={isMounted} />
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-text-main mb-6 leading-[1.1]">
          A smarter way to <br className="hidden md:block" />
          <span className="inline-flex items-center">
            <span 
              className="inline-block whitespace-nowrap mr-2 lg:mr-3 text-left"
              style={{ color: words[wordIndex].color }}
            >
              {words[wordIndex].text}
            </span>
            <span className="text-text-main">your debt.</span>
          </span>
        </h1>

        <p className="text-lg text-text-muted mb-10 max-w-xl">
          Credit Expert India helps you explore loan consolidation, refinancing, top-up loans and fresh financing options designed around your financial profile.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link href="#check-eligibility" className="w-full sm:w-auto px-6 py-3.5 bg-brand-blue text-white rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 group">
            Check My Eligibility
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="#calculator" className="w-full sm:w-auto px-6 py-3.5 bg-white text-text-main border border-slate-200 hover:border-slate-300 rounded-xl font-medium hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
            <Calculator className="w-4 h-4 text-brand-blue" />
            Potential Savings
          </Link>
        </div>
      </div>

      <div className="mt-16 pt-8 border-t border-slate-100 overflow-hidden relative">
        {/* Gradient fades for smooth edges */}
        <div className="absolute left-0 bottom-0 top-16 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 bottom-0 top-16 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        
        <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-6">Trusted by 10 Lac+ Customers via Banking Partners</p>
        
        <div className="flex w-max animate-marquee opacity-100 transition-all duration-500">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 pr-12">
              <Image src={hdfcLogo} alt="HDFC" className="h-6 w-auto object-contain" />
              <Image src={iciciLogo} alt="ICICI" className="h-6 w-auto object-contain" />
              <Image src={axisLogo} alt="Axis" className="h-6 w-auto object-contain" />
              <Image src={kotakLogo} alt="Kotak" className="h-6 w-auto object-contain" />
              
              <Image src={hdfcLogo} alt="HDFC" className="h-6 w-auto object-contain" />
              <Image src={iciciLogo} alt="ICICI" className="h-6 w-auto object-contain" />
              <Image src={axisLogo} alt="Axis" className="h-6 w-auto object-contain" />
              <Image src={kotakLogo} alt="Kotak" className="h-6 w-auto object-contain" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export { HeroVisualBlock } from "./HeroAnimation";

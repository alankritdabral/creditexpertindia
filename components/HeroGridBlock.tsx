"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Calculator, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";

import axisFinanceLogo from '@/public/logos/AXISFINANCE.svg';
import idfcLogo from '@/public/logos/IDFC.svg';
import bajajFinservLogo from '@/public/logos/BAJAJFINSERV.svg';
import yesBankLogo from '@/public/logos/YESBANK.svg';
import tataLogo from '@/public/logos/TATA.svg';
import ltFinanceLogo from '@/public/logos/L&T.svg';
import creditSaisonLogo from '@/public/logos/CREDITSAISON.svg';
import shriramLogo from '@/public/logos/SHRIRAM.svg';
import smfgLogo from '@/public/logos/SMFG.svg';
import kotakBankLogo from '@/public/logos/KOTAK_BANK.png';
import iciciBankLogo from '@/public/logos/ICICI.png';

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
    <div className="flex flex-col justify-center h-full min-h-[500px] lg:min-h-[700px] p-8 md:px-12 lg:py-24">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-icy-blue text-brand-black/90 text-[11px] font-bold uppercase tracking-wider mb-8 shadow-sm">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
          </span>
          <span className="opacity-80">Interest Saved for Customers:</span>
          <AnimatedCurrency amount={displayAmount} isMounted={isMounted} />
        </div>

        <h1 className="hero-title text-brand-black mb-6">
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

        <p className="hero-description text-brand-black/70 mb-10">
          Combine multiple EMIs into one. Explore lower-rate financing options designed around your profile.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mb-10">
          <Link href="#check-eligibility" className="w-full sm:w-auto px-6 py-3.5 bg-blue-energy text-white rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 group">
            Check My Eligibility
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="#calculator" className="w-full sm:w-auto px-6 py-3.5 bg-white text-brand-black border border-icy-blue hover:border-slate-300 rounded-xl font-medium hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
            <Calculator className="w-4 h-4 text-blue-energy" />
            See Potential Savings
          </Link>
        </div>


      </div>

    </div>
  );
}

export function HeroLogos() {
  return (
    <div className="w-full bg-white/50 backdrop-blur-sm relative z-20">
      <div className="max-w-[1220px] mx-auto flex flex-col xl:flex-row xl:items-center py-6 border-t border-x border-slate-300 overflow-hidden">

        <div className="flex-1 flex items-center min-w-0">
          <div className="flex w-max animate-marquee opacity-100 transition-all duration-500 items-center">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex shrink-0 items-center gap-14 pr-14">
                <Image src={axisFinanceLogo} alt="Axis Finance" priority className="shrink-0 h-10 w-32 object-contain opacity-80 hover:opacity-100 transition-opacity mix-blend-multiply" />
                <Image src={idfcLogo} alt="IDFC FIRST Bank" priority className="shrink-0 h-10 w-32 object-contain opacity-80 hover:opacity-100 transition-opacity mix-blend-multiply" />
                <Image src={bajajFinservLogo} alt="Bajaj Finserv" priority className="shrink-0 h-10 w-32 object-contain opacity-80 hover:opacity-100 transition-opacity mix-blend-multiply" />
                <Image src={yesBankLogo} alt="YES Bank" priority className="shrink-0 h-10 w-32 object-contain opacity-80 hover:opacity-100 transition-opacity mix-blend-multiply" />
                <Image src={tataLogo} alt="TATA Capital" priority className="shrink-0 h-10 w-32 object-contain opacity-80 hover:opacity-100 transition-opacity mix-blend-multiply" />
                <Image src={ltFinanceLogo} alt="L&T Finance" priority className="shrink-0 h-10 w-32 object-contain opacity-80 hover:opacity-100 transition-opacity mix-blend-multiply" />
                <Image src={creditSaisonLogo} alt="Credit Saison" priority className="shrink-0 h-10 w-32 object-contain opacity-80 hover:opacity-100 transition-opacity mix-blend-multiply" />
                <Image src={shriramLogo} alt="Shriram" priority className="shrink-0 h-10 w-32 object-contain opacity-80 hover:opacity-100 transition-opacity mix-blend-multiply" />
                <Image src={smfgLogo} alt="SMFG" priority className="shrink-0 h-10 w-32 object-contain opacity-80 hover:opacity-100 transition-opacity mix-blend-multiply" />
                <Image src={kotakBankLogo} alt="Kotak Mahindra Bank" priority className="shrink-0 h-10 w-32 object-contain opacity-80 hover:opacity-100 transition-opacity mix-blend-multiply" />
                <Image src={iciciBankLogo} alt="ICICI Bank" priority className="shrink-0 h-10 w-32 object-contain opacity-80 hover:opacity-100 transition-opacity mix-blend-multiply" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export { HeroVisualBlock } from "./hero/HeroVisualBlock";

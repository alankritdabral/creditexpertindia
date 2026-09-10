"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Calculator, RefreshCw, CreditCard, Smartphone, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import hdfcLogo from '@/public/logos/hdfc.png';
import iciciLogo from '@/public/logos/icici.png';
import axisLogo from '@/public/logos/axis.png';
import kotakLogo from '@/public/logos/kotak.png';
import idfcLogo from '@/public/logos/idfc.png';

const banks = [
  { id: "hdfc", name: "HDFC Bank", logo: hdfcLogo },
  { id: "icici", name: "ICICI Bank", logo: iciciLogo },
  { id: "axis", name: "Axis Bank", logo: axisLogo },
  { id: "kotak", name: "Kotak Mahindra", logo: kotakLogo },
  { id: "idfc", name: "IDFC First", logo: idfcLogo }
];
const duplicatedBanks = [...banks, ...banks, ...banks, ...banks];

export function CinematicHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Scene 1: Hero (0% - 18%)
  // Hold 0-10%, Fade out 10-18%
  const heroOpacity = useTransform(scrollYProgress, [0, 0.1, 0.18], [1, 1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.1, 0.18], [0, 0, -50]);
  const heroScale = useTransform(scrollYProgress, [0, 0.1, 0.18], [1, 1, 0.95]);
  const heroPointerEvents = useTransform(scrollYProgress, (pos) => pos < 0.18 ? "auto" : "none");

  // Scene 2: The Problem - Text (20% - 65%)
  // Fade in 20-25%, Hold 25-60%, Fade out 60-65%
  const midTextOpacity = useTransform(scrollYProgress, [0.2, 0.25, 0.6, 0.65], [0, 1, 1, 0]);
  const midTextY = useTransform(scrollYProgress, [0.2, 0.25, 0.6, 0.65], [50, 0, 0, -50]);

  // Scene 2: The Chaos Cards (20% - 65%)
  const cardsEntryOpacity = useTransform(scrollYProgress, [0.2, 0.25], [0, 1]);
  const cardsExitOpacity = useTransform(scrollYProgress, [0.6, 0.65], [1, 0]);
  const cardsOpacity = useTransform(scrollYProgress, (pos) => {
    if (pos < 0.2) return 0;
    if (pos > 0.65) return 0;
    if (pos < 0.25) return cardsEntryOpacity.get();
    if (pos > 0.6) return cardsExitOpacity.get();
    return 1;
  });

  // Card Movements: Hold in chaos 25-45%, slowly merge 45-60%
  // Card 1: Personal Loan (Top Left)
  const card1X = useTransform(scrollYProgress, [0.2, 0.25, 0.45, 0.6], ["-50vw", "-25vw", "-25vw", "0vw"]);
  const card1Y = useTransform(scrollYProgress, [0.2, 0.25, 0.45, 0.6], ["-30vh", "-15vh", "-15vh", "0vh"]);
  const card1Rotate = useTransform(scrollYProgress, [0.2, 0.25, 0.45, 0.6], [-30, -12, -12, 0]);

  // Card 2: Credit Card (Top Right)
  const card2X = useTransform(scrollYProgress, [0.2, 0.25, 0.45, 0.6], ["50vw", "25vw", "25vw", "0vw"]);
  const card2Y = useTransform(scrollYProgress, [0.2, 0.25, 0.45, 0.6], ["-30vh", "-10vh", "-10vh", "0vh"]);
  const card2Rotate = useTransform(scrollYProgress, [0.2, 0.25, 0.45, 0.6], [30, 15, 15, 0]);

  // Card 3: App Loan (Bottom Left)
  const card3X = useTransform(scrollYProgress, [0.2, 0.25, 0.45, 0.6], ["-50vw", "-20vw", "-20vw", "0vw"]);
  const card3Y = useTransform(scrollYProgress, [0.2, 0.25, 0.45, 0.6], ["30vh", "15vh", "15vh", "0vh"]);
  const card3Rotate = useTransform(scrollYProgress, [0.2, 0.25, 0.45, 0.6], [-20, -8, -8, 0]);

  // Card 4: Consumer Loan (Bottom Right)
  const card4X = useTransform(scrollYProgress, [0.2, 0.25, 0.45, 0.6], ["50vw", "20vw", "20vw", "0vw"]);
  const card4Y = useTransform(scrollYProgress, [0.2, 0.25, 0.45, 0.6], ["30vh", "20vh", "20vh", "0vh"]);
  const card4Rotate = useTransform(scrollYProgress, [0.2, 0.25, 0.45, 0.6], [20, 10, 10, 0]);

  // Scene 3: The Solution (65% - 100%)
  // Fade in 65-75%, Hold 75-100%
  const finalCardScale = useTransform(scrollYProgress, [0.65, 0.75], [0.8, 1]);
  const finalCardOpacity = useTransform(scrollYProgress, [0.65, 0.75], [0, 1]);
  const finalTextOpacity = useTransform(scrollYProgress, [0.65, 0.75], [0, 1]);
  const finalTextY = useTransform(scrollYProgress, [0.65, 0.75], [30, 0]);
  const finalPointerEvents = useTransform(scrollYProgress, (pos) => pos > 0.65 ? "auto" : "none");

  // Dynamic Background
  // White 0-25%, Gray 25-55%, Green 65-100%
  const bgColor = useTransform(scrollYProgress, [0, 0.25, 0.55, 0.65], ["#FFFFFF", "#F8FAFC", "#F8FAFC", "#ECFDF5"]);

  return (
    <div ref={containerRef} className="relative h-[800vh] bg-background">
      <motion.div 
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center"
        style={{ backgroundColor: bgColor }}
      >
        {/* Background Decorative Mesh */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
          <motion.div 
            className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-100 blur-[100px]"
            style={{ 
              y: useTransform(scrollYProgress, [0, 1], [0, 200]),
              opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 0.5, 0.2])
            }}
          />
          <motion.div 
            className="absolute top-[40%] -right-[10%] w-[60%] h-[60%] rounded-full bg-emerald-100 blur-[120px]"
            style={{ 
              y: useTransform(scrollYProgress, [0, 1], [0, -200]),
              opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 0.6, 1])
            }}
          />
        </div>

        {/* SCENE 1: Hero */}
        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-center px-4 md:px-8 text-center z-20"
          style={{ opacity: heroOpacity, y: heroY, scale: heroScale, pointerEvents: heroPointerEvents as any }}
        >
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-brand-blue text-sm font-medium mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue opacity-40"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-blue"></span>
              </span>
              Smarter Debt Management
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-text-main mb-6 leading-[1.1]">
              Turn Multiple EMIs Into <br className="hidden md:block" />
              <span className="text-gradient">One Smarter EMI.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-text-muted mb-10 max-w-2xl mx-auto">
              Credit Expert India helps you explore loan consolidation, refinancing, top-up loans and fresh financing options designed around your financial profile.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="#check-eligibility" className="w-full sm:w-auto px-8 py-4 bg-brand-blue text-white rounded-xl font-medium hover:bg-blue-800 transition-colors flex items-center justify-center gap-2 group">
                Check My Eligibility
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="#calculator" className="w-full sm:w-auto px-8 py-4 bg-white text-text-main border border-slate-200 rounded-xl font-medium hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                <Calculator className="w-4 h-4 text-brand-blue" />
                Calculate Potential Savings
              </Link>
            </div>
          </div>

          {/* Trusted Partners Ticker in Hero */}
          <div className="absolute bottom-10 left-0 right-0 mx-auto w-full overflow-hidden max-w-6xl px-4">
            <p className="text-sm font-medium text-text-muted mb-6 tracking-wide uppercase text-center">Trusted by 10 Lac+ Customers via Banking Partners</p>
            <div className="relative flex overflow-hidden w-full transition-all duration-500 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
              <motion.div 
                className="flex items-center gap-12 md:gap-20 whitespace-nowrap w-max"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ ease: "linear", duration: 40, repeat: Infinity }}
              >
                {duplicatedBanks.map((bank, i) => (
                  <div key={i} className="flex items-center gap-3 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                    <Image
                      src={bank.logo}
                      alt={bank.name}
                      width={32}
                      height={32}
                      className="h-8 w-8 object-contain rounded-md"
                    />
                    <span className="text-lg font-bold text-slate-800 tracking-tight">{bank.name}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* SCENE 2: The Problem (Text) */}
        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center z-10 pointer-events-none"
          style={{ opacity: midTextOpacity, y: midTextY }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-text-main mb-4">Have Multiple EMIs?</h2>
          <p className="text-lg text-text-muted max-w-xl mx-auto">
            If you're paying several EMIs across personal loans, app loans, and credit cards, consolidation may help simplify your repayments.
          </p>
        </motion.div>

        {/* SCENE 2: The Chaos Cards */}
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none perspective-[1000px]">
          {/* Card 1: Personal Loan */}
          <motion.div 
            className="absolute glass-card rounded-2xl p-4 md:p-6 w-56 md:w-64 shadow-xl border-slate-200/60 flex flex-col gap-3"
            style={{ x: card1X, y: card1Y, rotate: card1Rotate, opacity: cardsOpacity }}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg text-brand-blue"><RefreshCw className="w-5 h-5" /></div>
              <div>
                <p className="text-xs text-text-muted font-medium uppercase tracking-wider">Personal Loan</p>
                <p className="text-sm font-semibold text-text-main">HDFC Bank</p>
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-text-main">₹8,500<span className="text-sm text-text-muted font-normal">/mo</span></p>
              <p className="text-xs text-warning-red font-medium mt-1">16.5% ROI</p>
            </div>
          </motion.div>

          {/* Card 2: Credit Card */}
          <motion.div 
            className="absolute glass-card rounded-2xl p-4 md:p-6 w-56 md:w-64 shadow-xl border-slate-200/60 flex flex-col gap-3"
            style={{ x: card2X, y: card2Y, rotate: card2Rotate, opacity: cardsOpacity }}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-50 rounded-lg text-warning-red"><CreditCard className="w-5 h-5" /></div>
              <div>
                <p className="text-xs text-text-muted font-medium uppercase tracking-wider">Credit Card</p>
                <p className="text-sm font-semibold text-text-main">Outstanding</p>
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-text-main">₹6,200<span className="text-sm text-text-muted font-normal">/mo</span></p>
              <p className="text-xs text-warning-red font-medium mt-1">36.0% ROI</p>
            </div>
          </motion.div>

          {/* Card 3: App Loan */}
          <motion.div 
            className="absolute glass-card rounded-2xl p-4 md:p-6 w-56 md:w-64 shadow-xl border-slate-200/60 flex flex-col gap-3"
            style={{ x: card3X, y: card3Y, rotate: card3Rotate, opacity: cardsOpacity }}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-50 rounded-lg text-purple-600"><Smartphone className="w-5 h-5" /></div>
              <div>
                <p className="text-xs text-text-muted font-medium uppercase tracking-wider">App Loan</p>
                <p className="text-sm font-semibold text-text-main">Instant Cash</p>
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-text-main">₹4,300<span className="text-sm text-text-muted font-normal">/mo</span></p>
              <p className="text-xs text-warning-red font-medium mt-1">28.0% ROI</p>
            </div>
          </motion.div>

          {/* Card 4: Consumer Loan */}
          <motion.div 
            className="absolute glass-card rounded-2xl p-4 md:p-6 w-56 md:w-64 shadow-xl border-slate-200/60 flex flex-col gap-3"
            style={{ x: card4X, y: card4Y, rotate: card4Rotate, opacity: cardsOpacity }}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-50 rounded-lg text-orange-500"><ShoppingBag className="w-5 h-5" /></div>
              <div>
                <p className="text-xs text-text-muted font-medium uppercase tracking-wider">Consumer</p>
                <p className="text-sm font-semibold text-text-main">Electronics</p>
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-text-main">₹3,800<span className="text-sm text-text-muted font-normal">/mo</span></p>
              <p className="text-xs text-text-muted font-medium mt-1">0% EMI</p>
            </div>
          </motion.div>
        </div>

        {/* SCENE 3: The Resolution */}
        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-center z-30 px-4"
          style={{ pointerEvents: finalPointerEvents as any }}
        >
          <motion.div 
            className="bg-white rounded-3xl p-6 md:p-10 w-full max-w-md shadow-2xl border border-emerald-100 relative overflow-hidden"
            style={{ scale: finalCardScale, opacity: finalCardOpacity }}
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 to-teal-500" />
            <div className="text-center mb-8 mt-2">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 mb-4">
                <RefreshCw className="w-8 h-8" />
              </div>
              <p className="text-sm text-text-muted font-medium uppercase tracking-wider mb-2">Consolidated Plan</p>
              <h3 className="text-4xl font-bold text-text-main">₹18,500<span className="text-lg text-text-muted font-normal">/mo</span></h3>
              <p className="text-sm font-medium text-emerald-600 mt-2 bg-emerald-50 inline-block px-3 py-1 rounded-full">
                Potential difference: ₹4,300/mo*
              </p>
            </div>
            
            <div className="space-y-3 mb-8">
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-text-muted">Total Outstanding</span>
                <span className="font-semibold text-text-main">₹6,20,000</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-text-muted">Estimated Rate</span>
                <span className="font-semibold text-text-main">11.5% p.a.</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-text-muted">Simplified To</span>
                <span className="font-semibold text-text-main">1 Single EMI</span>
              </div>
            </div>

            <Link href="#check-eligibility" className="w-full py-4 bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2 group">
              Check Consolidation Eligibility
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <p className="text-[10px] text-slate-400 text-center mt-4 leading-tight">
              *Illustration only. Actual rates and EMI depend on eligibility and lender policies.
            </p>
          </motion.div>

          <motion.div 
            className="mt-12 text-center"
            style={{ opacity: finalTextOpacity, y: finalTextY }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-text-main mb-4">Your Debt. Simplified.</h2>
            <p className="text-text-muted max-w-lg mx-auto">
              Get a consolidated view of your financial options and take back control of your monthly cash flow.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

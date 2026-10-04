"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Landmark, Smartphone, CreditCard, Layers } from "lucide-react";

const PHONE_CARDS = [
  { icon: Landmark, color: "text-blue-500", bgColor: "bg-blue-50", label: "Personal Loan", amount: "₹12,400", pathId: "path1", stroke: "url(#grad1)" },
  { icon: CreditCard, color: "text-indigo-600", bgColor: "bg-indigo-50", label: "Credit Card", amount: "₹8,200", pathId: "path2", stroke: "url(#grad2)" },
  { icon: Smartphone, color: "text-orange-500", bgColor: "bg-orange-50", label: "App Loan", amount: "₹6,700", pathId: "path3", stroke: "url(#grad3)" },
  { icon: Layers, color: "text-emerald-500", bgColor: "bg-emerald-50", label: "Overdraft", amount: "₹4,900", pathId: "path4", stroke: "url(#grad4)" },
];

export function HeroVisualBlock() {
  return (
    <div className="relative w-full h-full min-h-[500px] lg:min-h-[600px] flex items-center justify-center overflow-visible bg-transparent">
      
      {/* Floating text & arrow */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="absolute top-[8%] right-[5%] lg:right-[15%] z-40 flex flex-col items-center pointer-events-none hidden sm:flex"
      >
        <div className="text-blue-600 font-semibold text-sm md:text-base -rotate-6 tracking-wide" style={{ fontFamily: "'Caveat', cursive, sans-serif" }}>
          Multiple EMIs<br/>One simple payment
        </div>
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="mt-1 ml-4 -rotate-12">
          <path d="M10 10 Q 30 15 20 35" stroke="#2563EB" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M15 32 L 20 35 L 24 30" stroke="#2563EB" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>

      {/* Main Container - using a fixed aspect ratio container that scales */}
      <div className="relative w-[800px] h-[550px] scale-[0.6] lg:scale-[0.7] xl:scale-[0.8] transform origin-center" style={{ perspective: "1500px" }}>
        
        {/* SVG connecting lines (pipes) */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <svg width="800" height="550" viewBox="0 0 800 550" fill="none">
            <defs>
              <linearGradient id="grad1" x1="250" y1="120" x2="450" y2="275" gradientUnits="userSpaceOnUse">
                <stop stopColor="#3B82F6" stopOpacity="0.8" />
                <stop offset="1" stopColor="#10B981" />
              </linearGradient>
              <linearGradient id="grad2" x1="250" y1="190" x2="450" y2="275" gradientUnits="userSpaceOnUse">
                <stop stopColor="#4F46E5" stopOpacity="0.8" />
                <stop offset="1" stopColor="#10B981" />
              </linearGradient>
              <linearGradient id="grad3" x1="250" y1="260" x2="450" y2="275" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F97316" stopOpacity="0.8" />
                <stop offset="1" stopColor="#10B981" />
              </linearGradient>
              <linearGradient id="grad4" x1="250" y1="330" x2="450" y2="275" gradientUnits="userSpaceOnUse">
                <stop stopColor="#10B981" stopOpacity="0.8" />
                <stop offset="1" stopColor="#10B981" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            {/* Thick colorful pipes */}
            <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }} d="M 230 140 C 350 140, 380 275, 450 275" stroke="url(#grad1)" strokeWidth="4" strokeLinecap="round" filter="url(#glow)" />
            <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }} d="M 240 210 C 350 210, 380 275, 450 275" stroke="url(#grad2)" strokeWidth="4" strokeLinecap="round" filter="url(#glow)" />
            <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, delay: 0.7, ease: "easeOut" }} d="M 250 280 C 350 280, 380 275, 450 275" stroke="url(#grad3)" strokeWidth="4" strokeLinecap="round" filter="url(#glow)" />
            <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }} d="M 260 350 C 350 350, 380 275, 450 275" stroke="url(#grad4)" strokeWidth="4" strokeLinecap="round" filter="url(#glow)" />
            
            {/* Connector node at the EMI card */}
            <circle cx="450" cy="275" r="6" fill="white" stroke="#10B981" strokeWidth="3" filter="url(#glow)" />
            <circle cx="450" cy="275" r="3" fill="#10B981" />
          </svg>
        </div>

        {/* 3D Isometric Phone Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -50, rotateY: 40, rotateX: 25, rotateZ: -10 }}
          animate={{ opacity: 1, x: 0, rotateY: 22, rotateX: 15, rotateZ: -6 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ transformStyle: "preserve-3d" }}
          className="absolute left-[20px] top-[50%] -translate-y-1/2 z-20 w-[270px] h-[540px] rounded-[44px] bg-slate-900 border-[6px] border-slate-700 shadow-[-12px_12px_0px_#020617,30px_50px_80px_-10px_rgba(0,0,0,0.5)] flex flex-col ring-[4px] ring-slate-800"
        >
          {/* Hardware Side Buttons */}
          <div className="absolute top-[130px] -left-[11px] w-[5px] h-[40px] bg-slate-800 rounded-l-[4px] shadow-inner" style={{ transform: "translateZ(-1px)" }} /> {/* Volume Up */}
          <div className="absolute top-[185px] -left-[11px] w-[5px] h-[40px] bg-slate-800 rounded-l-[4px] shadow-inner" style={{ transform: "translateZ(-1px)" }} /> {/* Volume Down */}
          <div className="absolute top-[150px] -right-[11px] w-[5px] h-[65px] bg-slate-950 rounded-r-[4px]" style={{ transform: "translateZ(-1px)" }} /> {/* Power Button */}

          {/* Inner Screen Background with overflow hidden for the notch */}
          <div className="absolute inset-0 rounded-[32px] bg-slate-50 overflow-hidden pointer-events-none" style={{ transform: "translateZ(1px)" }}>
            {/* Notch */}
            <div className="absolute top-0 inset-x-0 flex justify-center z-30">
              <div className="w-[100px] h-[28px] bg-slate-900 rounded-b-[16px]" />
            </div>
            {/* Glass reflection highlight */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/20 pointer-events-none z-40" />
          </div>
          
          {/* Screen Content - NO overflow hidden, so cards can pop out */}
          <div className="w-full h-full flex flex-col pt-20 px-4 gap-4 relative z-10" style={{ transformStyle: "preserve-3d" }}>
            {PHONE_CARDS.map((card, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, z: 20, scale: 0.9, x: -10 }}
                animate={{ opacity: 1, z: 50, scale: 1, x: 5 }}
                transition={{ duration: 0.5, delay: 0.5 + idx * 0.15 }}
                className="w-full bg-white rounded-2xl p-4 shadow-[10px_20px_30px_rgba(0,0,0,0.2)] flex items-center gap-3 relative border border-slate-100/80 transform-gpu"
                style={{ transform: "translateZ(40px)" }}
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${card.bgColor} ${card.color} shrink-0`}>
                  <card.icon strokeWidth={2.5} className="w-5 h-5" />
                </div>
                <div className="shrink-0">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">{card.label}</p>
                  <p className="text-[16px] font-extrabold text-slate-800 tracking-tight leading-none">
                    {card.amount} <span className="text-[10px] font-semibold text-slate-400">/ month</span>
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Consolidated Card Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="absolute left-[450px] top-[50%] -translate-y-1/2 z-30"
        >
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="w-[310px] bg-white rounded-[32px] p-7 shadow-[0_40px_80px_-15px_rgba(16,185,129,0.35)] border-[2px] border-emerald-50 relative overflow-hidden"
          >
            {/* Subtle glow background inside card */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/10 blur-3xl rounded-full" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-400/10 blur-3xl rounded-full" />

            <div className="relative z-10">
              {/* Top Check */}
              <div className="flex justify-center mb-6">
                <div className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-[0_8px_16px_rgba(16,185,129,0.4)]">
                  <CheckCircle2 strokeWidth={3.5} className="w-8 h-8" />
                </div>
              </div>
              
              <div className="text-center mb-7">
                <p className="text-[10px] font-extrabold text-blue-500 uppercase tracking-[0.2em] mb-2.5">
                  Your Consolidated EMI
                </p>
                <h3 className="text-[36px] font-black text-slate-900 tracking-tighter leading-none mb-4">
                  ₹18,499<span className="text-sm font-bold text-slate-400 tracking-normal ml-1">/ month</span>
                </h3>
                <div className="inline-flex bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-full text-xs font-black tracking-wide border border-emerald-100 shadow-sm">
                  9.99% Interest Rate
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t border-slate-100/80">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-slate-500">Tenure</span>
                  <span className="text-sm font-black text-slate-800">60 months</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[13px] font-semibold text-slate-500">Potential Monthly Savings</span>
                  <span className="text-sm font-black text-emerald-600">₹13,701</span>
                </div>
              </div>

              <div className="mt-7 flex items-center justify-center gap-2 text-[14px] font-black text-emerald-800 bg-emerald-100/50 hover:bg-emerald-100 py-4 rounded-2xl border border-emerald-200 transition-colors shadow-sm">
                <Layers className="w-4 h-4" />
                4 loans → 1 EMI
              </div>
            </div>
          </motion.div>
        </motion.div>
        
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Smartphone, CreditCard, Banknote, Landmark, Check } from "lucide-react";
import Image from "next/image";
import { AnimatedPhoneMockup } from "./ui/AnimatedPhoneMockup";

const AnimatedCard = ({ children, className, bgStyle }: { children: React.ReactNode; className?: string, bgStyle?: string }) => {
  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.3, ease: "easeOut" } }}
      className={`group relative bg-white border border-gray-100 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col p-6 lg:p-8 cursor-pointer ${className || ""}`}
    >
      <div className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-500 ease-out" style={{ background: bgStyle }} />
      <div className="relative z-10 flex flex-col h-full">
        {children}
      </div>
    </motion.div>
  );
};

export const LoanSolutionsSection = () => {
  return (
    <section className="relative w-full py-20 lg:py-32 overflow-hidden bg-[#f7f9fc]">
      <style dangerouslySetInnerHTML={{__html: `
        .dot-pattern-blue {
          background-image: radial-gradient(#6b9cff 1.5px, transparent 1.5px);
          background-size: 16px 16px;
          opacity: 0.3;
          mask-image: radial-gradient(ellipse at center, black 10%, transparent 70%);
          -webkit-mask-image: radial-gradient(ellipse at center, black 10%, transparent 70%);
        }
        .dot-pattern-orange {
          background-image: radial-gradient(#ffb477 1.5px, transparent 1.5px);
          background-size: 16px 16px;
          opacity: 0.4;
          mask-image: radial-gradient(ellipse at top right, black 20%, transparent 70%);
          -webkit-mask-image: radial-gradient(ellipse at top right, black 20%, transparent 70%);
        }
        .gradient-text-blue {
          background: linear-gradient(90deg, #3b82f6, #6366f1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .quote-line {
          position: relative;
        }
        .quote-line::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 2px;
          background-color: #cbd5e1; /* slate-300 */
          border-radius: 2px;
        }
      `}} />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        
        {/* Bento Grid: 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* 1. Personal Loan (Spans 2 rows) */}
          <AnimatedCard 
            className="lg:row-span-2 min-h-[700px] bg-white"
          >
            {/* Background elements */}
            <div className="absolute top-[20%] left-[-10%] w-[80%] h-[60%] dot-pattern-blue z-0 pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-20%] w-[120%] h-[60%] bg-gradient-to-tr from-blue-100/50 via-purple-100/30 to-transparent blur-3xl z-0 rounded-full" />
            <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[40%] bg-blue-50/50 blur-3xl z-0 rounded-full" />

            {/* Header */}
            <div className="relative z-10 flex justify-between items-center mb-10">
              <div className="flex items-center space-x-2 text-slate-900 font-semibold">
                <Smartphone className="w-5 h-5 text-blue-600" />
                <span>Personal Loan</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <ArrowRight className="w-4 h-4 -rotate-45" />
              </div>
            </div>

            <h2 className="relative z-10 text-4xl lg:text-[2.75rem] font-bold text-slate-900 mb-6 leading-[1.1] tracking-tight">
              Make your monthly <br /> repayments more <br />
              <span className="text-blue-600">manageable.</span>
            </h2>

            <div className="relative z-10 pl-5 mb-10 quote-line">
              <p className="text-slate-600 italic text-lg">
                "We wanted to focus on her wedding,<br />not another financial burden."
              </p>
            </div>

            {/* Phone Mockup Area */}
            <div className="relative z-10 flex-1 w-full flex flex-col items-center justify-center mt-4 mb-4">
              <AnimatedPhoneMockup />
            </div>

            {/* Bottom Section (CTA + Avatars) */}
            <div className="relative z-10 mt-12 flex flex-col xl:flex-row xl:items-center justify-between gap-6">
              <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full py-4 px-8 font-semibold flex items-center justify-center space-x-2 transition-colors w-full xl:w-auto">
                <span>Check your EMI options</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex-shrink-0 overflow-hidden">
                    {/* Placeholder for avatar */}
                    <div className="w-full h-full bg-gradient-to-br from-blue-300 to-blue-400" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex-shrink-0 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-purple-300 to-purple-400" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex-shrink-0 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-pink-300 to-pink-400" />
                  </div>
                </div>
                <div className="text-xs text-slate-500">
                  <span className="font-semibold text-slate-700 block">Join 10,000+ Indians</span>
                  who simplified their loans
                </div>
              </div>
            </div>

          </AnimatedCard>

          {/* 2. Credit Card */}
          <AnimatedCard 
            bgStyle="radial-gradient(circle at bottom right, rgba(220, 120, 255, 0.15) 0%, transparent 60%)"
          >
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-2 text-slate-900 font-semibold">
                <CreditCard className="w-5 h-5 text-purple-600" />
                <span>Credit Card</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-purple-50 group-hover:text-purple-600 transition-colors">
                <ArrowRight className="w-4 h-4 -rotate-45" />
              </div>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mb-6 leading-tight">
              Reduce the burden of expensive credit-card debt.
            </h3>

            <div className="pl-4 mb-8 quote-line">
              <p className="text-slate-500 italic text-sm">
                "I was paying nearly 45%<br />interest on my credit card..."
              </p>
            </div>

            <div className="mt-auto relative flex flex-col items-center">
              {/* Credit Card Graphic Placeholder */}
              <div className="w-[200px] h-[125px] rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-xl transform rotate-[-10deg] group-hover:rotate-[-5deg] transition-transform duration-500 mb-8 relative overflow-hidden flex items-end justify-end p-4">
                 <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay"></div>
                 <span className="text-white/80 font-bold italic tracking-widest relative z-10 text-sm">VISA</span>
              </div>

              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 flex items-center justify-between w-full shadow-sm border border-purple-50">
                <div className="text-center w-full">
                  <p className="text-2xl font-bold text-red-500">45%</p>
                  <p className="text-[10px] text-slate-500">Current rate</p>
                </div>
                <ArrowRight className="w-6 h-6 text-slate-300 mx-2" />
                <div className="text-center w-full">
                  <p className="text-2xl font-bold text-emerald-500">11%</p>
                  <p className="text-[10px] text-slate-500">Potential rate*</p>
                </div>
              </div>
            </div>
          </AnimatedCard>

          {/* 3. App Loans */}
          <AnimatedCard 
            bgStyle="radial-gradient(circle at right center, rgba(255, 180, 119, 0.15) 0%, transparent 70%)"
          >
            <div className="absolute top-[10%] right-[-10%] w-[60%] h-[60%] dot-pattern-orange z-0 pointer-events-none" />
            
            <div className="relative z-10 flex justify-between items-center mb-6">
              <div className="flex items-center space-x-2 text-slate-900 font-semibold">
                <Smartphone className="w-5 h-5 text-blue-600" />
                <span>App Loans</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                <ArrowRight className="w-4 h-4 -rotate-45" />
              </div>
            </div>

            <h3 className="relative z-10 text-2xl font-bold text-slate-900 mb-6 leading-tight">
              Bring scattered app loans into a clearer plan.
            </h3>

            <div className="relative z-10 pl-4 mb-8 quote-line">
              <p className="text-slate-500 italic text-sm">
                "One small loan became <br /> several. I couldn't keep track..."
              </p>
            </div>

            <div className="relative z-10 mt-auto flex items-center justify-between">
               
               <div className="flex flex-col gap-3">
                 {/* App Item 1 */}
                 <div className="flex items-center space-x-3 bg-white px-3 py-2 rounded-lg shadow-sm border border-slate-100 relative group/item">
                    <div className="w-6 h-6 rounded bg-yellow-400 flex-shrink-0" /> {/* KreditBee Placeholder */}
                    <div>
                      <p className="text-xs font-bold text-slate-800">₹8,000</p>
                      <p className="text-[9px] text-slate-500">KreditBee</p>
                    </div>
                 </div>
                 {/* App Item 2 */}
                 <div className="flex items-center space-x-3 bg-white px-3 py-2 rounded-lg shadow-sm border border-slate-100 relative group/item">
                    <div className="w-6 h-6 rounded bg-red-500 flex-shrink-0" /> {/* LazyPay Placeholder */}
                    <div>
                      <p className="text-xs font-bold text-slate-800">₹5,500</p>
                      <p className="text-[9px] text-slate-500">LazyPay</p>
                    </div>
                 </div>
                 {/* App Item 3 */}
                 <div className="flex items-center space-x-3 bg-white px-3 py-2 rounded-lg shadow-sm border border-slate-100 relative group/item">
                    <div className="w-6 h-6 rounded bg-green-500 flex-shrink-0" /> {/* MoneyView Placeholder */}
                    <div>
                      <p className="text-xs font-bold text-slate-800">₹3,200</p>
                      <p className="text-[9px] text-slate-500">MoneyView</p>
                    </div>
                 </div>
                 {/* App Item 4 */}
                 <div className="flex items-center space-x-3 bg-white px-3 py-2 rounded-lg shadow-sm border border-slate-100 relative group/item">
                    <div className="w-6 h-6 rounded bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-500"><Banknote className="w-3 h-3" /></div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">₹2,800</p>
                      <p className="text-[9px] text-slate-500">Other app loan</p>
                    </div>
                 </div>
               </div>

               {/* Connecting Lines SVG */}
               <div className="absolute left-[110px] right-[100px] top-[30px] bottom-[30px] pointer-events-none">
                  <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 150">
                    <path d="M 0 15 C 50 15, 50 75, 100 75" stroke="#cbd5e1" strokeWidth="1.5" fill="none" strokeDasharray="3 3" />
                    <path d="M 0 55 C 50 55, 50 75, 100 75" stroke="#cbd5e1" strokeWidth="1.5" fill="none" strokeDasharray="3 3" />
                    <path d="M 0 95 C 50 95, 50 75, 100 75" stroke="#cbd5e1" strokeWidth="1.5" fill="none" strokeDasharray="3 3" />
                    <path d="M 0 135 C 50 135, 50 75, 100 75" stroke="#cbd5e1" strokeWidth="1.5" fill="none" strokeDasharray="3 3" />
                  </svg>
               </div>

               <div className="bg-blue-600 text-white p-4 rounded-2xl shadow-lg z-10 w-[110px] text-center">
                 <p className="text-[10px] text-blue-200 mb-1">ONE EMI</p>
                 <p className="font-bold text-lg">₹15,999</p>
                 <p className="text-[9px] text-blue-200 mt-1">per month</p>
               </div>

            </div>
          </AnimatedCard>

          {/* 4. Multiple Loans */}
          <AnimatedCard 
            bgStyle="radial-gradient(circle at bottom right, rgba(110, 140, 255, 0.15) 0%, transparent 60%)"
          >
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-2 text-slate-900 font-semibold">
                <Banknote className="w-5 h-5 text-blue-600" />
                <span>Multiple Loans</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                <ArrowRight className="w-4 h-4 -rotate-45" />
              </div>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mb-6 leading-tight">
              Replace multiple payments with one simpler repayment.
            </h3>

            <div className="pl-4 mb-8 quote-line">
              <p className="text-slate-500 italic text-sm">
                "I had four different payments<br />to keep track of every month..."
              </p>
            </div>

            <div className="mt-auto relative flex items-center justify-between">
               
               <div className="flex flex-col gap-3">
                 <div className="flex items-center space-x-3 bg-white px-3 py-2 rounded-lg shadow-sm border border-slate-100">
                    <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-500"><Banknote className="w-3 h-3" /></div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">₹12,500</p>
                      <p className="text-[9px] text-slate-500">Personal Loan</p>
                    </div>
                 </div>
                 <div className="flex items-center space-x-3 bg-white px-3 py-2 rounded-lg shadow-sm border border-slate-100">
                    <div className="w-6 h-6 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0 text-purple-500"><CreditCard className="w-3 h-3" /></div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">₹8,300</p>
                      <p className="text-[9px] text-slate-500">Credit Card</p>
                    </div>
                 </div>
                 <div className="flex items-center space-x-3 bg-white px-3 py-2 rounded-lg shadow-sm border border-slate-100">
                    <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0 text-emerald-500"><Smartphone className="w-3 h-3" /></div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">₹4,200</p>
                      <p className="text-[9px] text-slate-500">Consumer Loan</p>
                    </div>
                 </div>
                 <div className="flex items-center space-x-3 bg-white px-3 py-2 rounded-lg shadow-sm border border-slate-100">
                    <div className="w-6 h-6 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0 text-orange-500"><Banknote className="w-3 h-3" /></div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">₹3,800</p>
                      <p className="text-[9px] text-slate-500">Other Loan</p>
                    </div>
                 </div>
               </div>

               {/* Connecting Lines SVG */}
               <div className="absolute left-[110px] right-[100px] top-[30px] bottom-[30px] pointer-events-none">
                  <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 150">
                    <path d="M 0 15 C 50 15, 50 75, 100 75" stroke="#cbd5e1" strokeWidth="1.5" fill="none" strokeDasharray="3 3" />
                    <path d="M 0 55 C 50 55, 50 75, 100 75" stroke="#cbd5e1" strokeWidth="1.5" fill="none" strokeDasharray="3 3" />
                    <path d="M 0 95 C 50 95, 50 75, 100 75" stroke="#cbd5e1" strokeWidth="1.5" fill="none" strokeDasharray="3 3" />
                    <path d="M 0 135 C 50 135, 50 75, 100 75" stroke="#cbd5e1" strokeWidth="1.5" fill="none" strokeDasharray="3 3" />
                  </svg>
               </div>

               <div className="bg-blue-600 text-white p-4 rounded-2xl shadow-lg z-10 w-[110px] text-center">
                 <p className="text-[10px] text-blue-200 mb-1">ONE EMI</p>
                 <p className="font-bold text-lg">₹24,999</p>
                 <p className="text-[9px] text-blue-200 mt-1">per month</p>
               </div>

            </div>
          </AnimatedCard>

          {/* 5. Overdraft */}
          <AnimatedCard 
            bgStyle="radial-gradient(circle at bottom right, rgba(150, 110, 255, 0.15) 0%, transparent 60%)"
          >
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-2 text-slate-900 font-semibold">
                <Landmark className="w-5 h-5 text-indigo-600" />
                <span>Overdraft</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                <ArrowRight className="w-4 h-4 -rotate-45" />
              </div>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mb-6 leading-tight">
              Explore options for expensive overdraft debt.
            </h3>

            <div className="pl-4 mb-8 quote-line">
              <p className="text-slate-500 italic text-sm">
                "₹70 lakh outstanding at<br />14% interest was becoming<br />difficult to manage..."
              </p>
            </div>

            <div className="mt-auto relative flex flex-col items-center">
              {/* Bank Building Graphic Placeholder */}
              <div className="w-[180px] h-[120px] mb-8 relative flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                 <Landmark className="w-32 h-32 text-indigo-200" strokeWidth={1} />
              </div>

              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 flex items-center justify-between w-full shadow-sm border border-indigo-50">
                <div className="text-center w-full">
                  <p className="text-2xl font-bold text-slate-700">14%</p>
                  <p className="text-[10px] text-slate-500">Current rate</p>
                </div>
                <ArrowRight className="w-6 h-6 text-slate-300 mx-2" />
                <div className="text-center w-full">
                  <p className="text-2xl font-bold text-blue-600">10.99%</p>
                  <p className="text-[10px] text-slate-500">Potential rate*</p>
                </div>
              </div>
            </div>
          </AnimatedCard>

        </div>
      </div>
    </section>
  );
};

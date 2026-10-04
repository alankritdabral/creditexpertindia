"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { Smartphone, ArrowRight, Check } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const INJECTED_STYLES = `
  /* Realistic iPhone Mockup Hardware */
  .iphone-bezel {
      background-color: #071B4F;
      box-shadow: 
          inset 0 0 0 2px #123B87, 
          inset 0 0 0 7px #071B4F, 
          0 40px 80px -15px rgba(7,27,79,0.5),
          0 15px 25px -5px rgba(7,27,79,0.4);
      transform-style: preserve-3d;
  }

  .hardware-btn {
      background: linear-gradient(90deg, #404040 0%, #171717 100%);
      box-shadow: 
          -2px 0 5px rgba(0,0,0,0.8),
          inset -1px 0 1px rgba(255,255,255,0.15),
          inset 1px 0 2px rgba(0,0,0,0.8);
      border-left: 1px solid rgba(255,255,255,0.05);
  }
  
  /* Gradient UI Elements */
  .ambient-gradient {
      background: 
          radial-gradient(circle at 70% 25%, rgba(45, 140, 255, 0.25), transparent 45%),
          linear-gradient(180deg, #123B87 0%, #0c2b69 55%, #071B4F 100%);
  }

  .phone-screen {
      box-shadow:
          inset 0 0 0 1px rgba(255,255,255,0.1),
          inset 0 0 50px rgba(255,255,255,0.05);
  }

  .phone-screen::before {
      content: "";
      position: absolute;
      inset: -20%;
      background: linear-gradient(
          135deg,
          transparent 35%,
          rgba(255,255,255,0.04) 48%,
          transparent 60%
      );
      transform: rotate(-8deg);
      pointer-events: none;
      z-index: 40;
  }

  .glass-card {
      background: rgba(255,255,255,0.06);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 24px;
  }

  .savings-card {
      background: linear-gradient(135deg, rgba(18,184,120, 0.22), rgba(18,184,120, 0.35));
      border: 1px solid rgba(18,184,120, 0.45);
      border-radius: 24px;
  }

  .glass-arrow {
      background: rgba(45,140,255, 0.22);
      border: 1px solid rgba(45,140,255, 0.35);
  }
  
  .savings-icon-container {
      background: rgba(18,184,120, 0.25);
      border: 1px solid rgba(18,184,120, 0.50);
  }
  
  .hide-scrollbar::-webkit-scrollbar {
      display: none;
  }
  .hide-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
  }
`;

export function AnimatedPhoneMockup({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);
  
  // Counter Refs
  const currentRef = useRef<HTMLParagraphElement>(null);
  const newRef = useRef<HTMLParagraphElement>(null);
  const savingsRef = useRef<HTMLParagraphElement>(null);

  // 1. High-Performance Mouse Interaction Logic
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(requestRef.current);
      
      requestRef.current = requestAnimationFrame(() => {
        if (mockupRef.current && containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          const xVal = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
          const yVal = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

          gsap.to(mockupRef.current, {
            rotationY: xVal * 12,
            rotationX: -yVal * 12,
            ease: "power3.out",
            duration: 1.2,
          });
        }
      });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
      }
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // 2. Animation for the widgets inside the phone when it comes into view
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(".ui-fade-up", { autoAlpha: 0, y: 15 });
      gsap.set(".ui-slide-right", { autoAlpha: 0, x: -20 });
      gsap.set(".ui-scale-in", { autoAlpha: 0, scale: 0.5 });
      gsap.set(".ui-arrow", { autoAlpha: 0, scale: 0.5, rotation: -180 });

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 80%",
        onEnter: () => {
          const tl = gsap.timeline();
          
          tl.to(".ui-fade-up", { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" })
            .to(".ui-slide-right", { autoAlpha: 1, x: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }, "-=0.3")
            .to(".ui-scale-in", { autoAlpha: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.5)" }, "-=0.4")
            .to(".ui-arrow", { autoAlpha: 1, scale: 1, rotation: 0, duration: 0.7, ease: "back.out(1.5)" }, "-=0.4");

          // Animate the numbers
          const counters = { current: 0, next: 0, savings: 0 };
          gsap.to(counters, {
            current: 25000,
            next: 18075,
            savings: 6925,
            duration: 1.5,
            ease: "power2.out",
            delay: 0.2,
            onUpdate: () => {
              if (currentRef.current) currentRef.current.innerText = "₹" + Math.floor(counters.current).toLocaleString("en-IN");
              if (newRef.current) newRef.current.innerText = "₹" + Math.floor(counters.next).toLocaleString("en-IN");
              if (savingsRef.current) savingsRef.current.innerText = "₹" + Math.floor(counters.savings).toLocaleString("en-IN");
            }
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []); 

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full h-[550px] md:h-[650px] flex items-center justify-center", className)}
      style={{ perspective: "1000px" }}
    >
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />
      
      {/* The iPhone Bezel */}
      <div
        ref={mockupRef}
        className="relative w-[300px] h-[600px] rounded-[3rem] iphone-bezel flex flex-col will-change-transform transform-style-3d shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)]"
      >
        {/* Physical Hardware Buttons */}
        <div className="absolute top-[120px] -left-[3px] w-[3px] h-[25px] hardware-btn rounded-l-md z-0" aria-hidden="true" />
        <div className="absolute top-[170px] -left-[3px] w-[3px] h-[45px] hardware-btn rounded-l-md z-0" aria-hidden="true" />
        <div className="absolute top-[230px] -left-[3px] w-[3px] h-[45px] hardware-btn rounded-l-md z-0" aria-hidden="true" />
        <div className="absolute top-[180px] -right-[3px] w-[3px] h-[70px] hardware-btn rounded-r-md z-0 scale-x-[-1]" aria-hidden="true" />

        {/* Inner Screen Container */}
        <div className="absolute inset-[7px] rounded-[2.5rem] overflow-hidden phone-screen ambient-gradient text-white z-10 flex flex-col">
          {/* Dynamic Island Notch */}
          <div className="absolute top-[5px] left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-black rounded-full z-50 flex items-center justify-end px-3 shadow-[inset_0_-1px_2px_rgba(255,255,255,0.1)]">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)] animate-pulse" />
          </div>

          {/* App Interface */}
          <div className="relative w-full h-full pt-12 px-4 pb-6 flex flex-col overflow-y-auto z-10 hide-scrollbar">
            {/* Header */}
            <div className="ui-fade-up flex justify-between items-center mb-4 relative z-10">
              <div className="flex items-center space-x-2">
                <div className="w-[32px] h-[32px] rounded-[10px] bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                  <Smartphone className="w-4 h-4 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-white text-[18px] leading-tight">Personal Loan</span>
                  <span className="text-[12px] text-white/[0.65] font-normal leading-tight mt-0.5">HDFC Bank</span>
                </div>
              </div>
              <div className="w-[32px] h-[32px] rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center cursor-pointer">
                <span className="text-white text-lg leading-none -mt-1">&times;</span>
              </div>
            </div>

            {/* Current EMI Glass Card */}
            <div className="ui-fade-up glass-card p-4 relative z-10">
              <div className="flex items-center mb-2.5">
                <div className="w-[16px] h-[16px] rounded flex items-center justify-center mr-2 opacity-70">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                    <rect x="2" y="5" width="20" height="14" rx="2"></rect>
                    <line x1="2" y1="10" x2="22" y2="10"></line>
                  </svg>
                </div>
                <p className="ui-fade-up text-[14px] text-white/[0.72] font-medium">Current EMI</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <p ref={currentRef} className="ui-slide-right text-[32px] font-bold text-white leading-none">₹0</p>
                  <p className="ui-fade-up text-[13px] text-white/[0.55] font-normal mt-1">per month</p>
                </div>
                <div className="ui-scale-in bg-[rgba(45,140,255,0.15)] border border-[rgba(45,140,255,0.45)] text-[#6bb0ff] px-2.5 py-1.5 rounded-[12px] flex flex-col items-center">
                  <span className="text-[14px] font-semibold leading-none mb-0.5">16.5%</span>
                  <span className="text-[10px] font-medium leading-none text-[#6bb0ff]">interest rate</span>
                </div>
              </div>
            </div>

            {/* Transition Arrow */}
            <div className="ui-arrow z-20 flex flex-col items-center justify-center relative pointer-events-none py-1">
              <div className="w-[1px] h-2 border-l border-dashed border-white/30 mb-1" />
              <div className="w-[38px] h-[38px] rounded-full glass-arrow flex items-center justify-center text-white pointer-events-auto">
                <ArrowRight className="w-5 h-5 rotate-90" />
              </div>
              <div className="w-[1px] h-2 border-l border-dashed border-white/30 mt-1" />
            </div>

            {/* Consolidated EMI Glass Card */}
            <div className="ui-fade-up glass-card p-4 relative z-10">
              <div className="flex items-center mb-2.5">
                <div className="w-[16px] h-[16px] rounded flex items-center justify-center mr-2 opacity-70">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                    <rect x="2" y="5" width="20" height="14" rx="2"></rect>
                    <line x1="2" y1="10" x2="22" y2="10"></line>
                  </svg>
                </div>
                <p className="ui-fade-up text-[14px] text-white/[0.72] font-medium">New EMI</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <p ref={newRef} className="ui-slide-right text-[32px] font-bold text-white leading-none">₹0</p>
                  <p className="ui-fade-up text-[13px] text-white/[0.55] font-normal mt-1">per month</p>
                </div>
                <div className="ui-scale-in bg-[rgba(18,184,120,0.20)] border border-[rgba(18,184,120,0.50)] text-[#12B878] px-2.5 py-1.5 rounded-[12px] flex flex-col items-center">
                  <span className="text-[14px] font-semibold leading-none mb-0.5">9.99%</span>
                  <span className="text-[10px] font-medium leading-none text-[#12B878]">interest rate</span>
                </div>
              </div>
            </div>

            {/* Savings Card */}
            <div className="ui-fade-up mt-auto savings-card p-4 flex flex-col relative z-10">
              <div className="flex items-start">
                <div className="ui-scale-in w-[40px] h-[40px] rounded-full savings-icon-container flex items-center justify-center text-white flex-shrink-0 mr-3">
                  <Check className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <p className="ui-fade-up text-[14px] text-white/90 font-medium mb-1">You could save</p>
                  <p ref={savingsRef} className="ui-slide-right text-[32px] font-bold text-white leading-tight mb-1">₹0</p>
                  <p className="ui-fade-up text-[14px] text-white/70 font-medium">every month</p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[120px] h-[4px] bg-white/50 rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.1)]" />
          </div>
        </div>
      </div>
    </div>
  );
}

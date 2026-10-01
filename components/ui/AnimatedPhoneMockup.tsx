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
      background-color: #111;
      box-shadow: 
          inset 0 0 0 2px #52525B, 
          inset 0 0 0 7px #000, 
          0 40px 80px -15px rgba(0,0,0,0.9),
          0 15px 25px -5px rgba(0,0,0,0.7);
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
          radial-gradient(circle at 20% 10%, rgba(80, 120, 255, 0.55), transparent 35%),
          radial-gradient(circle at 90% 35%, rgba(170, 90, 255, 0.45), transparent 35%),
          radial-gradient(circle at 70% 90%, rgba(0, 220, 190, 0.45), transparent 40%),
          linear-gradient(145deg, #315FEA 0%, #273BBA 42%, #6A3DDB 70%, #12CFC0 115%);
      background-size: 200% 200%;
      animation: gradientMove 12s ease-in-out infinite;
  }

  @keyframes gradientMove {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
  }

  .phone-screen {
      box-shadow:
          inset 0 0 0 1px rgba(255,255,255,0.28),
          inset 0 0 50px rgba(255,255,255,0.08);
  }

  .phone-screen::before {
      content: "";
      position: absolute;
      inset: -20%;
      background: linear-gradient(
          135deg,
          transparent 35%,
          rgba(255,255,255,0.08) 48%,
          transparent 60%
      );
      transform: rotate(-8deg);
      pointer-events: none;
      z-index: 40;
  }

  .glass-card {
      background: rgba(255,255,255,0.12);
      backdrop-filter: blur(18px);
      -webkit-backdrop-filter: blur(18px);
      border: 1px solid rgba(255,255,255,0.24);
      border-radius: 26px;
  }

  .savings-card {
      background: linear-gradient(135deg, rgba(0, 255, 200, 0.30), rgba(50, 120, 255, 0.24));
      border: 1px solid rgba(120,255,220,0.45);
      box-shadow: 0 15px 45px rgba(0, 220, 190, 0.18), inset 0 1px 0 rgba(255,255,255,0.20);
      border-radius: 26px;
  }

  .glass-arrow {
      background: rgba(255,255,255,0.85);
      box-shadow: 0 8px 30px rgba(30,40,180,0.25), 0 0 30px rgba(120,150,255,0.25);
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
            next: 18499,
            savings: 6501,
            duration: 1.5,
            ease: "power2.out",
            delay: 0.2,
            onUpdate: () => {
              if (currentRef.current) currentRef.current.innerText = "₹" + Math.floor(counters.current).toLocaleString("en-IN");
              if (newRef.current) newRef.current.innerText = "₹" + Math.floor(counters.next).toLocaleString("en-IN");
              if (savingsRef.current) savingsRef.current.innerText = "₹" + Math.floor(counters.savings).toLocaleString("en-IN") + " every month";
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
      className={cn("relative w-full h-[450px] md:h-[600px] flex items-center justify-center", className)}
      style={{ perspective: "1000px" }}
    >
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />
      
      {/* The iPhone Bezel */}
      <div
        ref={mockupRef}
        className="relative w-[280px] h-[580px] rounded-[3rem] iphone-bezel flex flex-col will-change-transform transform-style-3d shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)]"
      >
        {/* Physical Hardware Buttons */}
        <div className="absolute top-[120px] -left-[3px] w-[3px] h-[25px] hardware-btn rounded-l-md z-0" aria-hidden="true" />
        <div className="absolute top-[160px] -left-[3px] w-[3px] h-[45px] hardware-btn rounded-l-md z-0" aria-hidden="true" />
        <div className="absolute top-[220px] -left-[3px] w-[3px] h-[45px] hardware-btn rounded-l-md z-0" aria-hidden="true" />
        <div className="absolute top-[170px] -right-[3px] w-[3px] h-[70px] hardware-btn rounded-r-md z-0 scale-x-[-1]" aria-hidden="true" />

        {/* Inner Screen Container */}
        <div className="absolute inset-[7px] rounded-[2.5rem] overflow-hidden phone-screen ambient-gradient text-white z-10 flex flex-col">
          {/* Dynamic Island Notch */}
          <div className="absolute top-[5px] left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-black rounded-full z-50 flex items-center justify-end px-3 shadow-[inset_0_-1px_2px_rgba(255,255,255,0.1)]">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)] animate-pulse" />
          </div>

          {/* App Interface */}
          <div className="relative w-full h-full pt-14 px-5 pb-8 flex flex-col overflow-y-auto z-10 hide-scrollbar">
            {/* Header */}
            <div className="ui-fade-up flex justify-between items-center mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-[42px] h-[42px] rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-white text-[18px] leading-tight">Personal Loan</span>
                  <span className="text-[12px] text-white/70 font-medium leading-tight mt-0.5">HDFC Bank</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center cursor-pointer">
                <span className="text-white text-xl leading-none -mt-1">&times;</span>
              </div>
            </div>

            {/* Current EMI Glass Card */}
            <div className="ui-fade-up glass-card p-5 pb-6">
              <p className="ui-fade-up text-[14px] text-white font-medium mb-1">Current EMI</p>
              <div className="flex items-center justify-between mt-2">
                <div className="flex flex-col">
                  <p ref={currentRef} className="ui-slide-right text-[36px] font-bold text-white leading-none">₹0</p>
                  <p className="ui-fade-up text-[13px] text-white/70 font-medium mt-1">per month</p>
                </div>
                <div className="ui-scale-in bg-[rgba(255,120,145,0.28)] border border-[rgba(255,170,185,0.35)] text-[#FF6B82] px-3 py-1.5 rounded-xl flex flex-col items-center">
                  <span className="text-[16px] font-bold leading-none mb-0.5">16.5%</span>
                  <span className="text-[10px] font-semibold leading-none">Interest rate</span>
                </div>
              </div>
            </div>

            {/* Transition Arrow */}
            <div className="ui-arrow z-20 -my-6 flex justify-center relative pointer-events-none">
              <div className="w-[56px] h-[56px] rounded-full glass-arrow flex items-center justify-center text-[#315FEA] pointer-events-auto">
                <ArrowRight className="w-6 h-6 rotate-90" />
              </div>
            </div>

            {/* Consolidated EMI Glass Card */}
            <div className="ui-fade-up glass-card p-5 pt-7 relative z-10">
              <p className="ui-fade-up text-[14px] text-white font-semibold mb-1">With Consolidation</p>
              <div className="flex items-center justify-between mt-2">
                <div className="flex flex-col">
                  <p ref={newRef} className="ui-slide-right text-[36px] font-bold text-white leading-none">₹0</p>
                  <p className="ui-fade-up text-[13px] text-white/70 font-medium mt-1">per month</p>
                </div>
                <div className="ui-scale-in bg-[rgba(100,240,190,0.22)] border border-[rgba(100,240,190,0.3)] px-3 py-1.5 rounded-xl flex flex-col items-center">
                  <span className="text-[16px] font-bold text-[#66F0BD] leading-none mb-0.5">10.99%</span>
                  <span className="text-[10px] text-[#B7FFE2] font-semibold leading-none">Potential rate*</span>
                </div>
              </div>
            </div>

            {/* Savings Card */}
            <div className="ui-fade-up mt-auto savings-card p-4 lg:p-5 flex items-center space-x-4">
              <div className="ui-scale-in w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white flex-shrink-0 shadow-[0_4px_12px_rgba(0,0,0,0.1)] border border-white/30">
                <Check className="w-5 h-5" />
              </div>
              <div className="overflow-hidden">
                <p className="ui-fade-up text-[13px] text-white/90 font-medium mb-0.5">You could save</p>
                <p ref={savingsRef} className="ui-slide-right text-[22px] font-bold text-white leading-tight">₹0 every month</p>
              </div>
            </div>

            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[120px] h-[4px] bg-white/50 rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.1)]" />
          </div>
        </div>
      </div>
    </div>
  );
}

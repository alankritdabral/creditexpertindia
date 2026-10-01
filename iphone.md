// --- Component ---
// src/components/ui/phone-card.tsx
"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const INJECTED_STYLES = `
  /* Environment Overlays */
  .bg-grid-theme {
      background-size: 60px 60px;
      background-image: 
          linear-gradient(to right, color-mix(in srgb, var(--color-foreground) 5%, transparent) 1px, transparent 1px),
          linear-gradient(to bottom, color-mix(in srgb, var(--color-foreground) 5%, transparent) 1px, transparent 1px);
      mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
      -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
  }

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
  
  .screen-glare {
      background: linear-gradient(110deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 45%);
  }

  .widget-depth {
      background: linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%);
      box-shadow: 
          0 10px 20px rgba(0,0,0,0.3),
          inset 0 1px 1px rgba(255,255,255,0.05),
          inset 0 -1px 1px rgba(0,0,0,0.5);
      border: 1px solid rgba(255,255,255,0.03);
  }

  .floating-ui-badge {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.01) 100%);
      backdrop-filter: blur(24px); 
      -webkit-backdrop-filter: blur(24px);
      box-shadow: 
          0 0 0 1px rgba(255, 255, 255, 0.1),
          0 25px 50px -12px rgba(0, 0, 0, 0.8),
          inset 0 1px 1px rgba(255,255,255,0.2),
          inset 0 -1px 1px rgba(0,0,0,0.5);
  }

  .progress-ring {
      transform: rotate(-90deg);
      transform-origin: center;
      stroke-dasharray: 402;
      stroke-dashoffset: 402;
      stroke-linecap: round;
  }
`;

export interface PhoneCardProps extends React.HTMLAttributes<HTMLDivElement> {
  metricValue?: number;
  metricLabel?: string;
}

export function PhoneCard({ 
  metricValue = 12,
  metricLabel = "Months Saved",
  className, 
  ...props 
}: PhoneCardProps) {
  
  const containerRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);

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
      gsap.set([".phone-widget", ".floating-badge"], { autoAlpha: 0, scale: 0.9, y: 20 });
      gsap.set(".progress-ring", { strokeDashoffset: 402 });

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 80%",
        onEnter: () => {
          const tl = gsap.timeline();
          tl.to(".phone-widget", { y: 0, autoAlpha: 1, scale: 1, stagger: 0.15, ease: "back.out(1.2)", duration: 1 })
            .to(".progress-ring", { strokeDashoffset: 60, duration: 1.5, ease: "power3.inOut" }, "-=0.8")
            .to(".counter-val", { innerHTML: metricValue, snap: { innerHTML: 1 }, duration: 1.5, ease: "expo.out" }, "-=1.5")
            .to(".floating-badge", { y: 0, autoAlpha: 1, scale: 1, ease: "back.out(1.5)", duration: 1, stagger: 0.2 }, "-=1.0");
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [metricValue]); 

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full max-w-5xl mx-auto rounded-3xl overflow-hidden bg-[#0A101D] border border-white/5 shadow-2xl p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 font-sans antialiased group", className)}
      style={{ perspective: "1500px" }}
      {...props}
    >
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />
      <div className="bg-grid-theme absolute inset-0 z-0 pointer-events-none opacity-20" aria-hidden="true" />
      
      {/* TEXT SECTION */}
      <div className="flex-1 z-10 flex flex-col justify-center text-center md:text-left text-white space-y-6">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
          Make your monthly <br className="hidden lg:block" />
          repayments more <br className="hidden lg:block" />
          manageable.
        </h2>
        <p className="text-lg md:text-xl text-white/70 italic font-light leading-relaxed">
          &quot;We wanted to focus on her wedding, <br className="hidden lg:block" />
          not another financial burden.&quot;
        </p>
      </div>

      {/* PHONE SECTION */}
      <div className="flex-1 z-10 relative w-full h-[450px] md:h-[600px] flex items-center justify-center transform scale-[0.8] md:scale-100" style={{ perspective: "1000px" }}>
        
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
          <div className="absolute inset-[7px] bg-[#050914] rounded-[2.5rem] overflow-hidden shadow-[inset_0_0_15px_rgba(0,0,0,1)] text-white z-10">
            <div className="absolute inset-0 screen-glare z-40 pointer-events-none" aria-hidden="true" />

            {/* Dynamic Island Notch */}
            <div className="absolute top-[5px] left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-black rounded-full z-50 flex items-center justify-end px-3 shadow-[inset_0_-1px_2px_rgba(255,255,255,0.1)]">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)] animate-pulse" />
            </div>

            {/* App Interface */}
            <div className="relative w-full h-full pt-12 px-5 pb-8 flex flex-col">
              <div className="phone-widget flex justify-between items-center mb-8">
                <div className="flex flex-col">
                  <span className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold mb-1">Today</span>
                  <span className="text-xl font-bold tracking-tight text-white drop-shadow-md">Finances</span>
                </div>
                <div className="w-9 h-9 rounded-full bg-white/5 text-neutral-200 flex items-center justify-center font-bold text-sm border border-white/10 shadow-lg shadow-black/50">CE</div>
              </div>

              <div className="phone-widget relative w-44 h-44 mx-auto flex items-center justify-center mb-8 drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)]">
                <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
                  <circle cx="88" cy="88" r="64" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="12" />
                  <circle className="progress-ring" cx="88" cy="88" r="64" fill="none" stroke="#3B82F6" strokeWidth="12" />
                </svg>
                <div className="text-center z-10 flex flex-col items-center">
                  <span className="counter-val text-4xl font-extrabold tracking-tighter text-white">0</span>
                  <span className="text-[8px] text-blue-200/50 uppercase tracking-[0.1em] font-bold mt-0.5">{metricLabel}</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="phone-widget widget-depth rounded-2xl p-3 flex items-center">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/5 flex items-center justify-center mr-3 border border-blue-400/20 shadow-inner">
                    <svg className="w-4 h-4 text-blue-400 drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="h-2 w-20 bg-neutral-300 rounded-full mb-2 shadow-inner" />
                    <div className="h-1.5 w-12 bg-neutral-600 rounded-full shadow-inner" />
                  </div>
                </div>
                <div className="phone-widget widget-depth rounded-2xl p-3 flex items-center">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/5 flex items-center justify-center mr-3 border border-emerald-400/20 shadow-inner">
                    <svg className="w-4 h-4 text-emerald-400 drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="h-2 w-16 bg-neutral-300 rounded-full mb-2 shadow-inner" />
                    <div className="h-1.5 w-24 bg-neutral-600 rounded-full shadow-inner" />
                  </div>
                </div>
              </div>

              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[120px] h-[4px] bg-white/20 rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
            </div>
          </div>
        </div>

        {/* Floating Glass Badges */}
        <div className="floating-badge absolute flex top-6 lg:top-12 left-[-15px] lg:left-[-80px] floating-ui-badge rounded-xl lg:rounded-2xl p-3 lg:p-4 items-center gap-3 lg:gap-4 z-30">
          <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-b from-blue-500/20 to-blue-900/10 flex items-center justify-center border border-blue-400/30 shadow-inner">
            <span className="text-base lg:text-xl drop-shadow-lg" aria-hidden="true">🔥</span>
          </div>
          <div>
            <p className="text-white text-xs lg:text-sm font-bold tracking-tight">On Track</p>
            <p className="text-blue-200/50 text-[10px] lg:text-xs font-medium">Payment secured</p>
          </div>
        </div>

        <div className="floating-badge absolute flex bottom-12 lg:bottom-20 right-[-15px] lg:right-[-80px] floating-ui-badge rounded-xl lg:rounded-2xl p-3 lg:p-4 items-center gap-3 lg:gap-4 z-30">
          <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-b from-indigo-500/20 to-indigo-900/10 flex items-center justify-center border border-indigo-400/30 shadow-inner">
            <span className="text-base lg:text-lg drop-shadow-lg" aria-hidden="true">🎯</span>
          </div>
          <div>
            <p className="text-white text-xs lg:text-sm font-bold tracking-tight">Goal Reached</p>
            <p className="text-blue-200/50 text-[10px] lg:text-xs font-medium">Savings unlocked</p>
          </div>
        </div>

      </div>
    </div>
  );
}

// --- Demo ---
import { PhoneCard } from "@/components/ui/phone-card";

export default function PhoneCardDemo() {
  return (
    <div className="overflow-x-hidden w-full min-h-screen bg-black flex items-center justify-center p-4">
      <PhoneCard />
    </div>
  );
}
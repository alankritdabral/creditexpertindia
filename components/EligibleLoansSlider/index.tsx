"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useAnimationFrame, useMotionValue, useSpring } from "framer-motion";
import { loanCategories } from "./loanData";

export const EligibleLoansSlider = () => {
  // Generate alternating items: Image -> Content -> Image -> Content
  const slides = loanCategories.flatMap((category, index) => [
    { type: "image" as const, data: category, id: `${category.id}-img` },
    { type: "content" as const, data: category, id: `${category.id}-content` }
  ]);

  const [isHovered, setIsHovered] = useState(false);
  const [contentWidth, setContentWidth] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const velocityFactor = useSpring(1, { damping: 50, stiffness: 400 });

  useEffect(() => {
    // Measure the exact width of one full set of items
    const measure = () => {
      if (contentRef.current) {
        setContentWidth(contentRef.current.offsetWidth);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    // Drop speed to 20% (1/5) on hover
    velocityFactor.set(isHovered ? 0.2 : 1);
  }, [isHovered, velocityFactor]);

  useAnimationFrame((time, delta) => {
    if (contentWidth === 0) return;
    
    // Base speed: 60px per second
    const baseVelocity = -60;
    const moveBy = baseVelocity * velocityFactor.get() * (delta / 1000);
    
    let currentX = x.get() + moveBy;
    
    // Seamless wrap around
    if (currentX <= -contentWidth) {
      currentX += contentWidth;
    } else if (currentX > 0) {
      currentX -= contentWidth;
    }
    
    x.set(currentX);
  });

  return (
    <section className="relative w-full py-10 md:py-20 overflow-hidden bg-gray-50/50">
      <div className="max-w-[1220px] mx-auto border-x border-slate-300">
        
        <div className="px-4 md:px-6 lg:px-12 py-6 md:py-8 mb-2 md:mb-4 text-center">
          <p className="text-[10px] md:text-sm font-bold tracking-wider text-blue-600 uppercase mb-2 md:mb-4">
            Bring Your Eligible Loans Together
          </p>
          <h2 className="text-2xl md:text-[32px] lg:text-[42px] leading-[1.1] tracking-[-0.03em] font-semibold mx-auto text-slate-900 max-w-[280px] md:max-w-none">
            Different Loans. One Lower EMI.
          </h2>
        </div>

        <div className="relative w-full px-6 lg:px-12 overflow-hidden py-8">
          {/* Infinite Ticker Container using Framer Motion */}
        <motion.div 
          className="flex w-max"
          style={{ x }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
        >
          <style dangerouslySetInnerHTML={{__html: `
            .hide-scrollbar::-webkit-scrollbar { display: none; }
          `}} />
          
          {/* Render 2 identical sets of items to create the infinite loop */}
          {[1, 2].map((setIndex) => (
            <div 
              key={setIndex}
              ref={setIndex === 1 ? contentRef : null} 
              className="flex gap-4 pr-4"
            >
              {slides.map((slide, i) => {
                if (slide.type === "image") {
                  return (
                    <div 
                      key={`${slide.id}-${i}`} 
                      className="relative flex-shrink-0 w-[85vw] md:w-[380px] h-[520px] rounded-[30px] overflow-hidden shadow-sm cursor-pointer group"
                    >
                      <Image
                        src={slide.data.image}
                        alt={slide.data.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/10 transition-opacity duration-300"></div>
                    </div>
                  );
                }

                // Content Card
                return (
                  <div 
                    key={`${slide.id}-${i}`} 
                    className="relative flex-shrink-0 w-[85vw] md:w-[380px] h-[520px] rounded-[30px] overflow-hidden shadow-sm border border-gray-200 cursor-pointer"
                  >
                    {/* Background Image for glass effect */}
                    <Image
                      src={slide.data.image}
                      alt="Background"
                      fill
                      className="object-cover opacity-80"
                    />
                    
                    {/* Frosted Glass Container */}
                    <div className="absolute inset-3 md:inset-4 rounded-[20px] bg-white/50 backdrop-blur-xl border border-white/60 p-5 md:p-6 flex flex-col shadow-xl transition-all duration-300">
                      {/* Top Text */}
                      <div className="mb-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 bg-white rounded-xl shadow-sm border border-gray-100">
                            {slide.data.icon}
                          </div>
                          <h3 className="loan-card-title text-slate-900">
                            {slide.data.title}
                          </h3>
                        </div>
                        <p className="loan-card-description text-slate-800">
                          {slide.data.description}
                        </p>
                      </div>
                      
                      {/* Bottom Content / Stats */}
                      <div className="flex-1 flex flex-col justify-end min-h-0 overflow-y-auto hide-scrollbar">
                        {slide.data.renderActiveContent()}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </motion.div>
        </div>

        {/* Bottom Metrics Bar */}
        <div className="px-4 md:px-6 lg:px-12 mt-8 md:mt-12 py-6 md:py-8 flex flex-wrap justify-center gap-2 md:gap-4">
          {[
            "10,000+ Users",
            "4.9 Rating",
            "Real-time insights",
            "Secure & compliant"
          ].map((badge, i) => (
            <div key={i} className="px-3 md:px-5 py-1.5 md:py-2.5 bg-white/70 backdrop-blur-md rounded-full border border-gray-200 shadow-sm text-xs md:text-sm font-semibold text-slate-700">
              {badge}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

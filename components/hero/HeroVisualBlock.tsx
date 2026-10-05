"use client";

import React, { useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { LoanNotificationManager } from './LoanNotificationManager';

const IndiaMapScene = dynamic(() => import('./IndiaMapScene').then(mod => mod.IndiaMapScene), { ssr: false });

export function HeroVisualBlock() {
  const [activeCity, setActiveCity] = useState<string | null>(null);
  const [highlightedCity, setHighlightedCity] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const isReducedMotion = shouldReduceMotion === true;

  return (
    <div className="relative w-full h-full min-h-[500px] lg:min-h-[600px] flex items-center justify-center overflow-visible bg-transparent">
      {/* Container specifically designed to not overlap left text on desktop, but be centered on mobile */}
      <div className="relative w-full h-[500px] lg:h-[600px] lg:w-[600px] xl:w-[700px] lg:ml-auto">
        <IndiaMapScene activeCity={activeCity} highlightedCity={highlightedCity} isReducedMotion={isReducedMotion} />
        <LoanNotificationManager onActiveCityChange={setActiveCity} onHighlightCityChange={setHighlightedCity} isReducedMotion={isReducedMotion} />
      </div>
    </div>
  );
}

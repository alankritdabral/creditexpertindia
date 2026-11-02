"use client";

import React, { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { LoanNotificationManager } from './LoanNotificationManager';

const IndiaMapScene = dynamic(() => import('./IndiaMapScene').then(mod => mod.IndiaMapScene), { ssr: false });

// The 3D map is decorative: skip it on small screens, data-saver mode and low-end hardware.
function canRunHeroScene() {
  if (!window.matchMedia('(min-width: 1024px)').matches) return false;
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  if (nav.connection?.saveData) return false;
  if (nav.deviceMemory !== undefined && nav.deviceMemory < 4) return false;
  if (nav.hardwareConcurrency !== undefined && nav.hardwareConcurrency < 4) return false;
  return true;
}

export function HeroVisualBlock() {
  const [sceneEnabled, setSceneEnabled] = useState(false);
  const [activeCity, setActiveCity] = useState<string | null>(null);
  const [highlightedCity, setHighlightedCity] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const isReducedMotion = shouldReduceMotion === true;

  useEffect(() => {
    if (!canRunHeroScene()) return;
    // Let the hero text and LCP image finish before loading three.js
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void };
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => setSceneEnabled(true), { timeout: 2500 });
      return () => w.cancelIdleCallback?.(id);
    }
    const t = setTimeout(() => setSceneEnabled(true), 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative w-full h-full min-h-[500px] lg:min-h-[600px] flex items-center justify-center overflow-visible bg-transparent">
      {/* Container specifically designed to not overlap left text on desktop, but be centered on mobile */}
      <div className="relative w-full h-[500px] lg:h-[600px] lg:w-[600px] xl:w-[700px] lg:ml-auto">
        {sceneEnabled && (
          <>
            <IndiaMapScene activeCity={activeCity} highlightedCity={highlightedCity} isReducedMotion={isReducedMotion} />
            <LoanNotificationManager onActiveCityChange={setActiveCity} onHighlightCityChange={setHighlightedCity} isReducedMotion={isReducedMotion} />
          </>
        )}
      </div>
    </div>
  );
}

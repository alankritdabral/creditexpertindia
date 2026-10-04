import React, { useEffect, useState } from 'react';
import { Transaction } from './LoanNotification';
import { transactions } from './utils';

interface Props {
  onActiveCityChange: (city: string | null) => void;
  onHighlightCityChange?: (city: string | null) => void;
  isReducedMotion: boolean;
}

export function LoanNotificationManager({ onActiveCityChange, onHighlightCityChange, isReducedMotion }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const runLoop = async () => {
      let i = 0;
      while (isMounted) {
        // Show notification and highlight
        const currentCity = transactions[i].city;
        setCurrentIndex(i);
        setIsVisible(true);
        onActiveCityChange(currentCity);
        if (onHighlightCityChange) onHighlightCityChange(currentCity);
        
        await new Promise(r => setTimeout(r, 2500)); // Visible duration for highlight
        
        if (!isMounted) break;

        // Turn off highlight slightly before notification disappears
        if (onHighlightCityChange) onHighlightCityChange(null);

        await new Promise(r => setTimeout(r, 500)); // Total ~3s visibility
        
        if (!isMounted) break;

        // Hide notification
        setIsVisible(false);
        onActiveCityChange(null);

        await new Promise(r => setTimeout(r, 1000)); // Gap before next state

        if (!isMounted) break;

        // Move to next
        i = (i + 1) % transactions.length;
      }
    };

    runLoop();

    return () => {
      isMounted = false;
    };
  }, [isReducedMotion, onActiveCityChange, onHighlightCityChange]);

  // The manager just controls state/rotation. Rendering happens in IndiaMap.tsx
  return null;
}

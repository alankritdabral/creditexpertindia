import React, { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { LoanNotification, MobileLoanNotification, Transaction } from './LoanNotification';
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

    if (isReducedMotion) {
      const timer = setTimeout(() => {
        if (isMounted) {
          setCurrentIndex(0);
          setIsVisible(true);
          onActiveCityChange(transactions[0].city);
          if (onHighlightCityChange) onHighlightCityChange(transactions[0].city);
        }
      }, 0);
      return () => {
        isMounted = false;
        clearTimeout(timer);
      };
    }

    const runLoop = async () => {
      let i = 0;
      while (isMounted) {
        // Show notification and highlight
        const currentCity = transactions[i].city;
        setCurrentIndex(i);
        setIsVisible(true);
        onActiveCityChange(currentCity);
        if (onHighlightCityChange) onHighlightCityChange(currentCity);
        
        await new Promise(r => setTimeout(r, 2500)); // Visible duration for highlight (2.5s)
        
        if (!isMounted) break;

        // Turn off highlight 0.5s before notification disappears
        if (onHighlightCityChange) onHighlightCityChange(null);

        await new Promise(r => setTimeout(r, 500)); // Remaining duration for notification (total 3s)
        
        if (!isMounted) break;

        // Hide notification
        setIsVisible(false);
        onActiveCityChange(null);

        await new Promise(r => setTimeout(r, 1200)); // Gap before next state starts (increased for smoothness)

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

  const activeTransaction = isVisible ? transactions[currentIndex] : null;

  return (
    <>
      <AnimatePresence>
        {activeTransaction && <MobileLoanNotification transaction={activeTransaction} />}
      </AnimatePresence>
    </>
  );
}

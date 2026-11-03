"use client";

import React, { useEffect, useRef, useState } from "react";
import { animate, useMotionValue } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Tweens a number by writing frames straight to the DOM, so it never re-renders per frame.
 * Pass `from` to count up from that value on mount.
 */
export function AnimatedNumber({ value, from, format, instant }: { value: number; from?: number; format: (n: number) => string; instant: boolean }) {
  const mv = useMotionValue(from ?? value);
  const ref = useRef<HTMLSpanElement>(null);
  const formatRef = useRef(format);
  // Frozen so React never rewrites the text mid-tween.
  const [initialText] = useState(() => format(from ?? value));

  useEffect(() => {
    formatRef.current = format;
  });

  useEffect(() => mv.on("change", (v) => {
    if (ref.current) ref.current.textContent = formatRef.current(v);
  }), [mv]);

  useEffect(() => {
    if (instant) {
      mv.set(value);
      return;
    }
    const controls = animate(mv, value, { duration: 0.9, ease: EASE });
    return () => controls.stop();
  }, [value, instant, mv]);

  return <span ref={ref}>{initialText}</span>;
}

"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = [
  { text: "reduce", textCol: "#059669" }, // emerald-600
  { text: "manage", textCol: "#2563eb" }, // blue-600
  { text: "clear", textCol: "#7c3aed" }   // violet-600
];

export function AnimatedWord() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.span layout className="relative inline-flex items-center justify-center mx-2 overflow-hidden px-1.5 py-4 -my-4">
      <span className="invisible pointer-events-none flex items-center" aria-hidden="true">
        {words[index].text}
      </span>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={index}
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-full h-full flex justify-center items-center font-bold"
          style={{ color: words[index].textCol }}
        >
          {words[index].text}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
}

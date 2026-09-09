"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = [
  { text: "reduce", textCol: "#059669" }, // emerald-600
  { text: "clear", textCol: "#7c3aed" },  // violet-600
  { text: "manage", textCol: "#2563eb" }  // blue-600
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
    <motion.span 
      layout 
      className="relative inline-flex items-center justify-center mx-2 overflow-hidden px-1.5 py-4 -my-4"
      style={{ perspective: "1000px" }}
      transition={{ type: "tween", duration: 0.15, ease: "easeOut" }}
    >
      <span className="invisible pointer-events-none flex items-center" aria-hidden="true">
        {words[index].text}
      </span>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={index}
          initial={{ y: 40, opacity: 0, rotateX: -90, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, rotateX: 0, scale: 1 }}
          exit={{ y: -40, opacity: 0, rotateX: 90, scale: 0.8 }}
          transition={{ type: "tween", duration: 0.15, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full flex justify-center items-center font-bold whitespace-nowrap"
          style={{ color: words[index].textCol, transformStyle: "preserve-3d", transformOrigin: "center center" }}
        >
          {words[index].text}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
}

"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = [
  { text: "Reduce", color: "text-emerald-500", extraClass: "" },
  { text: "Manage", color: "text-blue-500", extraClass: "" },
  { text: "Clear", color: "text-violet-500", extraClass: "tracking-[0.08em]" }
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
    <span className="relative inline-block mx-1 overflow-hidden align-bottom text-center">
      <span className="invisible pointer-events-none" aria-hidden="true">
        Manage
      </span>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={index}
          initial={{ y: 35, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -35, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`absolute inset-0 w-full h-full flex justify-center items-center text-center ${words[index].color} ${words[index].extraClass}`}
        >
          {words[index].text}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

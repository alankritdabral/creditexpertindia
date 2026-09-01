"use client";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, staggerContainerFast, cardReveal, ease } from "@/lib/motion";

export function Reveal({
  children,
  delay = 0,
  y = 24,
  once = true,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  once?: boolean;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration: 0.6, ease, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  fast = false,
  className,
}: {
  children: React.ReactNode;
  fast?: boolean;
  className?: string;
}) {
  return (
    <motion.div
      variants={fast ? staggerContainerFast : staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function RevealCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div variants={cardReveal} className={className}>
      {children}
    </motion.div>
  );
}

// Re-export for convenience
export { fadeUp, staggerContainer };

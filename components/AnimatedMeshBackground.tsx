"use client";
import { motion } from "framer-motion";

export function AnimatedMeshBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 bg-background">
      <motion.div
        animate={{
          x: ["0%", "20%", "-10%", "0%"],
          y: ["0%", "-10%", "20%", "0%"],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute -top-[20%] -left-[10%] w-[60%] h-[70%] rounded-full bg-[#F7DCCB] opacity-80 blur-[80px]"
      />
      <motion.div
        animate={{
          x: ["0%", "-20%", "15%", "0%"],
          y: ["0%", "15%", "-20%", "0%"],
          scale: [1, 1.3, 0.8, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-[0%] -right-[10%] w-[70%] h-[70%] rounded-full bg-[#E8F5DF] opacity-80 blur-[100px]"
      />
      <motion.div
        animate={{
          x: ["0%", "15%", "-25%", "0%"],
          y: ["0%", "-20%", "15%", "0%"],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute -bottom-[20%] left-[20%] w-[60%] h-[70%] rounded-full bg-[#F7D2BC] opacity-80 blur-[90px]"
      />
      <motion.div
        animate={{
          x: ["0%", "-15%", "20%", "0%"],
          y: ["0%", "25%", "-15%", "0%"],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-[20%] left-[20%] w-[50%] h-[60%] rounded-full bg-[#E2D6CC] opacity-80 blur-[80px]"
      />
    </div>
  );
}

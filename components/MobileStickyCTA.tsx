"use client";
import { Phone, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export function MobileStickyCTA() {
  return (
    <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 p-3 backdrop-blur lg:hidden">
      <div className="flex gap-2">
        <a href="tel:+910000000000" className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-3 text-sm font-bold text-[#0B1D3A]">
          <Phone className="h-4 w-4" /> Call
        </a>
        <a href="https://wa.me/910000000000" target="_blank" rel="noopener noreferrer" className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-[#0E9F6E] bg-[#ECFDF5] px-3 py-3 text-sm font-bold text-[#0E9F6E]">
          <MessageCircle className="h-4 w-4" /> WhatsApp
        </a>
        <motion.a whileTap={{ scale: 0.96 }} href="#lead-form" className="flex flex-[1.4] items-center justify-center rounded-full bg-[#0B1D3A] px-3 py-3 text-sm font-extrabold text-white">
          Check Eligibility
        </motion.a>
      </div>
    </motion.div>
  );
}

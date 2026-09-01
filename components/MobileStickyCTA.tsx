"use client";
import { Phone, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export function MobileStickyCTA() {
  return (
    <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 p-3 backdrop-blur lg:hidden shadow-lg">
      <div className="flex gap-2">
        <a href="https://wa.me/919876543210?text=Hi%2C%20I%20would%20like%20help%20with%20my%20loans%2FEMIs%20and%20want%20to%20understand%20my%20options." target="_blank" rel="noopener noreferrer" className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-emerald-600 bg-emerald-50 px-3 py-3 text-xs font-extrabold text-emerald-700">
          <MessageCircle className="h-4 w-4 text-emerald-600" /> WhatsApp
        </a>
        <motion.a whileTap={{ scale: 0.96 }} href="#lead-form" className="flex flex-[1.4] items-center justify-center rounded-full bg-[#091328] px-3 py-3 text-xs font-extrabold text-white uppercase tracking-wider shadow">
          Check Options
        </motion.a>
      </div>
    </motion.div>
  );
}

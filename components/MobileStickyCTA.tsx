"use client";
import { Phone, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export function MobileStickyCTA() {
  return (
    <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="fixed inset-x-0 bottom-0 z-50 bg-white/90 p-4 backdrop-blur lg:hidden border-t border-hairline">
      <div className="flex justify-center">
        <a href="https://wa.me/919876543210?text=Hi%2C%20I%20would%20like%20help%20with%20my%20loans%2FEMIs%20and%20want%20to%20understand%20my%20options." target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-[15px] font-medium text-white shadow-sm hover:bg-[#1DA851] w-full max-w-sm transition-colors">
          <MessageCircle className="h-5 w-5" /> WhatsApp a Credit Expert
        </a>
      </div>
    </motion.div>
  );
}

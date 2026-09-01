"use client";
import { motion } from "framer-motion";

function HDFCLogo() {
  return (
    <svg viewBox="0 0 160 40" className="h-6 w-auto" aria-label="HDFC Bank">
      <rect x="2" y="6" width="28" height="28" fill="#004C8F" rx="3" />
      <rect x="9" y="13" width="14" height="14" fill="#ED232A" />
      <rect x="13" y="9" width="6" height="22" fill="#004C8F" />
      <rect x="9" y="17" width="14" height="6" fill="#004C8F" />
      <text x="38" y="25" fill="#004C8F" fontSize="15" fontWeight="800" fontFamily="sans-serif" letterSpacing="-0.5">
        HDFC BANK
      </text>
    </svg>
  );
}

function ICICILogo() {
  return (
    <svg viewBox="0 0 160 40" className="h-6 w-auto" aria-label="ICICI Bank">
      <path d="M6 10 C18 6, 26 14, 20 28 C16 36, 6 32, 6 32 C14 30, 18 24, 14 18 C11 14, 6 15, 6 10 Z" fill="#F37023" />
      <circle cx="20" cy="11" r="3.5" fill="#052F6B" />
      <text x="34" y="25" fill="#052F6B" fontSize="16" fontWeight="800" fontFamily="sans-serif" letterSpacing="-0.5">
        ICICI Bank
      </text>
    </svg>
  );
}

function AxisLogo() {
  return (
    <svg viewBox="0 0 150 40" className="h-6 w-auto" aria-label="Axis Bank">
      <polygon points="6,32 18,8 30,32" fill="#97124B" />
      <polygon points="18,17 24,32 12,32" fill="#FFFFFF" />
      <text x="36" y="25" fill="#97124B" fontSize="15" fontWeight="800" fontFamily="sans-serif" letterSpacing="0.5">
        AXIS BANK
      </text>
    </svg>
  );
}

function KotakLogo() {
  return (
    <svg viewBox="0 0 160 40" className="h-6 w-auto" aria-label="Kotak Mahindra Bank">
      <path d="M8 12 Q 16 6, 24 18 Q 16 30, 8 24 Q 16 18, 8 12 Z" fill="#EE1C25" />
      <path d="M24 18 Q 32 6, 24 30 Q 16 24, 24 18 Z" fill="#003366" />
      <text x="34" y="25" fill="#003366" fontSize="15" fontWeight="800" fontFamily="sans-serif" letterSpacing="-0.3">
        kotak
      </text>
    </svg>
  );
}

function IndusIndLogo() {
  return (
    <svg viewBox="0 0 170 40" className="h-6 w-auto" aria-label="IndusInd Bank">
      <rect x="4" y="8" width="24" height="24" rx="4" fill="#800000" />
      <path d="M10 24 L16 12 L22 24 Z" fill="#FFFFFF" />
      <text x="34" y="25" fill="#800000" fontSize="15" fontWeight="800" fontFamily="sans-serif" letterSpacing="-0.3">
        IndusInd Bank
      </text>
    </svg>
  );
}

function IDFCLogo() {
  return (
    <svg viewBox="0 0 170 40" className="h-6 w-auto" aria-label="IDFC FIRST Bank">
      <rect x="4" y="8" width="24" height="24" rx="3" fill="#9F1B32" />
      <text x="6.5" y="23" fill="#FFFFFF" fontSize="9" fontWeight="900" fontFamily="sans-serif">
        IDFC
      </text>
      <text x="34" y="25" fill="#9F1B32" fontSize="14" fontWeight="800" fontFamily="sans-serif" letterSpacing="-0.3">
        IDFC FIRST Bank
      </text>
    </svg>
  );
}

const bankLogos = [
  { id: "hdfc", name: "HDFC Bank", Component: HDFCLogo },
  { id: "icici", name: "ICICI Bank", Component: ICICILogo },
  { id: "axis", name: "Axis Bank", Component: AxisLogo },
  { id: "kotak", name: "Kotak Mahindra Bank", Component: KotakLogo },
  { id: "indusind", name: "IndusInd Bank", Component: IndusIndLogo },
  { id: "idfc", name: "IDFC FIRST Bank", Component: IDFCLogo },
];

export function TrustBar() {
  return (
    <section className="bg-white py-12 border-b border-slate-200">
      <div className="mb-6 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
        Trusted by Top Indian Banks & NBFCs
      </div>
      <div className="relative mx-auto flex max-w-[1200px] overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />

        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
          className="flex items-center gap-12 w-max px-6 transition-all"
        >
          {[...bankLogos, ...bankLogos, ...bankLogos].map((bank, index) => (
            <div key={`${bank.id}-${index}`} className="flex h-10 items-center justify-center">
              <bank.Component />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

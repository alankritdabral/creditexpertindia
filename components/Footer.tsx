"use client";
import { motion } from "framer-motion";
import { contact } from "@/lib/config";
import { ShieldCheck, Mail, Phone, MapPin, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-[#02050E] text-slate-400">
      <div className="container-narrow py-14 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5"
        >
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#059669] to-[#10b981] font-black text-white text-base shadow-lg">
                CE
              </div>
              <div>
                <div className="text-base font-extrabold text-white tracking-tight">
                  Credit Expert <span className="text-emerald-400">India</span>
                </div>
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Salaried Debt Advisory
                </div>
              </div>
            </div>

            <p className="text-xs leading-6 text-slate-400 font-medium max-w-md">
              Empowering Indian professionals to break free from high-interest debt traps through structured debt consolidation and transparent loan options.
            </p>

            <div className="space-y-2 text-xs font-semibold text-slate-400 pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span>{contact.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span>{contact.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span>{contact.email}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-white">Solutions</h4>
            <ul className="mt-4 space-y-2.5 text-xs font-semibold text-slate-400">
              <li>
                <a href="#debt-consolidation" className="hover:text-emerald-400 transition-colors">
                  Debt Consolidation
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-emerald-400 transition-colors">
                  Personal Loans
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-emerald-400 transition-colors">
                  Credit Card Payoff
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-emerald-400 transition-colors">
                  Balance Transfer
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-white">Tools & Info</h4>
            <ul className="mt-4 space-y-2.5 text-xs font-semibold text-slate-400">
              <li>
                <a href="#calculator" className="hover:text-emerald-400 transition-colors">
                  EMI Calculator
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-emerald-400 transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-emerald-400 transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
              <li>
                <a href="#lead-form" className="hover:text-emerald-400 transition-colors">
                  Check Eligibility
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-white">Regulatory</h4>
            <ul className="mt-4 space-y-2.5 text-xs font-semibold text-slate-400">
              <li>
                <a href="#privacy" className="hover:text-emerald-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-emerald-400 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#disclaimer" className="hover:text-emerald-400 transition-colors">
                  Lending Disclosure
                </a>
              </li>
              <li>
                <a href="#lead-form" className="hover:text-emerald-400 transition-colors">
                  Consent Framework
                </a>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Regulatory Disclosure Box */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          id="privacy"
          className="mt-10 rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-md"
        >
          <div className="flex items-center gap-2 text-xs font-extrabold text-emerald-400 uppercase tracking-widest mb-2">
            <ShieldCheck className="h-4 w-4" /> Compliance & Regulatory Disclaimer
          </div>
          <p className="text-[11px] leading-5 text-slate-400 font-medium">
            Credit Expert India is a financial service platform facilitating loan inquiries and credit counseling. We are not a direct Bank or RBI-registered Non-Banking Financial Company (NBFC). All loan approvals, final interest rates, processing fees, and repayment terms are strictly determined by our RBI-regulated partner lenders based on independent credit evaluation. Advertised interest rates (starting 9.95% p.a.*) apply only to select qualified profiles. Calculations provided on this website are indicative estimates for guidance purposes. Never pay upfront fees to personal accounts.
          </p>
        </motion.div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-slate-800/80 pt-6 text-xs text-slate-400 font-medium sm:flex-row">
          <p>© {new Date().getFullYear()} Credit Expert India. All rights reserved.</p>
          <div className="flex items-center gap-2 text-emerald-400 font-bold">
            <ShieldCheck className="h-4 w-4" />
            <span>Bank-Grade 256-Bit Data Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
}


"use client";
import { motion } from "framer-motion";
import { Shield, Clock, TrendingDown, CheckCircle2, Lock, Building } from "lucide-react";

export function TrustBar() {
  return (
    <section className="border-b border-slate-200 bg-slate-50 py-10">
      <div className="container-narrow">
        {/* Institutional Financial Metrics */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            { metric: "₹250+ Cr", label: "Debt Assessed", sub: "Salaried applicant portfolios", icon: TrendingDown },
            { metric: "From 9.95%", label: "Annual Interest Rate*", sub: "Eligible salaried profiles", icon: CheckCircle2 },
            { metric: "24-48 Hours", label: "Turnaround Time", sub: "Streamlined partner workflow", icon: Clock },
            { metric: "100% Safe", label: "Zero CIBIL Impact", sub: "Soft eligibility check", icon: Shield },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="flex items-center gap-3.5 rounded-xl border border-slate-200 bg-white p-4 shadow-2xs hover:border-slate-300 transition-all"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#091328] text-emerald-400">
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-base font-extrabold tracking-tight text-slate-900 sm:text-lg">
                  {stat.metric}
                </div>
                <div className="text-xs font-semibold text-slate-700">{stat.label}</div>
                <div className="text-[10px] text-slate-500">{stat.sub}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

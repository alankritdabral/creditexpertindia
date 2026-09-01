"use client";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { testimonialsPlaceholder } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";

export function Testimonials() {
  if (!testimonialsPlaceholder.enabled) {
    return (
      <section className="bg-white py-14 sm:py-16">
        <div className="container-narrow">
          <Reveal>
            <div className="mx-auto max-w-3xl rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-8 text-center sm:px-10">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
                <Quote className="h-5 w-5 text-slate-400" />
              </div>
              <h3 className="mt-3 text-sm font-bold tracking-widest text-slate-500">TESTIMONIALS · VERIFICATION PENDING</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">Real customer testimonials and verifiable metrics will appear here once supplied by Credit Expert India. We never create fake testimonials, reviews or statistics.</p>
              <p className="mt-2 text-xs text-slate-500">Want to be featured? After your case is resolved we may request your consent to share your experience.</p>
            </div>
          </Reveal>
        </div>
      </section>
    );
  }
  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="container-narrow">
        <h2 className="text-center text-[28px] font-bold tracking-tight text-[#0B1D3A]">{testimonialsPlaceholder.headline}</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="h-4 w-4 fill-amber-400" />
                ))}
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-700">Customer quote placeholder</p>
              <p className="mt-3 text-sm font-bold text-[#0B1D3A]">Customer Name</p>
              <p className="text-xs text-slate-500">City</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

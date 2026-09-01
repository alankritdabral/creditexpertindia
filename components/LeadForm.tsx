"use client";
import { useState } from "react";
import { ArrowRight, ShieldCheck, Clock, CheckCircle2, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";

type FormErrors = Partial<Record<"name" | "mobile" | "employment" | "income" | "debt" | "requirement" | "consent", string>>;

export function LeadForm() {
  const [values, setValues] = useState({ name: "", mobile: "", employment: "", income: "", debt: "", requirement: "" });
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [msg, setMsg] = useState("");

  function validate(): boolean {
    const e: FormErrors = {};
    if (!values.name.trim() || values.name.trim().length < 2) e.name = "Enter your full name";
    if (!/^[6-9]\d{9}$/.test(values.mobile)) e.mobile = "Enter a valid 10-digit mobile number";
    if (!values.employment) e.employment = "Select employment type";
    if (!values.income) e.income = "Select monthly income";
    if (!values.requirement) e.requirement = "Select your requirement";
    if (!consent) e.consent = "Please give consent to be contacted";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    setMsg("");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, consent }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setStatus("success");
      setMsg("Application Received! A senior credit specialist will call you shortly.");
      setValues({ name: "", mobile: "", employment: "", income: "", debt: "", requirement: "" });
      setConsent(false);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to submit";
      setStatus("error");
      setMsg(message);
    }
  }

  return (
    <section id="lead-form" className="relative overflow-hidden bg-[#040814] py-16 sm:py-24 text-white">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 left-0 h-96 w-96 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

      <div className="container-narrow relative grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-center">
        {/* Left Column Content */}
        <div>
          <Reveal y={16}>
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400">
              FAST & CONFIDENTIAL
            </span>
            <h2 className="mt-3 text-[32px] font-extrabold leading-tight tracking-tight text-white sm:text-[42px]">
              Check Your Loan Options With Zero Impact On Credit Score
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300">
              Fill out this confidential 60-second assessment. Our credit experts analyze your current obligations and connect you with matching lender offers.
            </p>
          </Reveal>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } } }}
            className="mt-8 grid gap-4 sm:grid-cols-2"
          >
            {[
              { title: "100% Free Consultation", sub: "Understand options before committing" },
              { title: "Dedicated Credit Advisor", sub: "Personalized human assistance" },
              { title: "256-bit Encryption", sub: "Your personal data is fully secured" },
              { title: "Direct Bank Partners", sub: "Transparent RBI-regulated lenders" },
            ].map((f) => (
              <motion.div
                key={f.title}
                variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-md"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <p className="text-xs font-extrabold text-white">{f.title}</p>
                </div>
                <p className="mt-1 text-[11px] text-slate-400 font-medium pl-6">{f.sub}</p>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-8 flex items-center gap-2 text-xs font-semibold text-slate-400">
            <Clock className="h-4 w-4 text-emerald-400" />
            <span>Average callback response time: <span className="text-white font-bold">&lt; 15 minutes</span> during business hours</span>
          </div>
        </div>

        {/* Right Form Card */}
        <motion.form
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          onSubmit={onSubmit}
          noValidate
          className="rounded-3xl border border-slate-200/90 bg-white p-7 shadow-2xl sm:p-9 text-slate-900"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-xl font-extrabold text-[#091328]">Check Eligibility Now</h3>
              <p className="text-xs font-medium text-slate-500 mt-0.5">Free evaluation • No CIBIL score pull</p>
            </div>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-extrabold text-emerald-800">
              STEP 1 OF 1
            </span>
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Full Name *</label>
              <input
                value={values.name}
                onChange={(e) => setValues({ ...values, name: e.target.value })}
                placeholder="e.g. Rahul Sharma"
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-900 outline-none transition-all focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20"
              />
              {errors.name && <p className="mt-1 text-xs font-semibold text-red-600">{errors.name}</p>}
            </div>

            <div>
              <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Mobile Number *</label>
              <div className="relative mt-1.5">
                <span className="absolute left-3.5 top-3 text-xs font-bold text-slate-600">+91</span>
                <input
                  value={values.mobile}
                  onChange={(e) => setValues({ ...values, mobile: e.target.value.replace(/\D/g, "").slice(0, 10) })}
                  placeholder="98765 43210"
                  inputMode="numeric"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-12 pr-4 py-3 text-sm font-medium text-slate-900 outline-none transition-all focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
              {errors.mobile && <p className="mt-1 text-xs font-semibold text-red-600">{errors.mobile}</p>}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Employment *</label>
                <select
                  value={values.employment}
                  onChange={(e) => setValues({ ...values, employment: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm font-medium text-slate-900 outline-none transition-all focus:border-emerald-500 focus:bg-white"
                >
                  <option value="">Select Profile</option>
                  <option value="Salaried">Salaried (Private / Govt)</option>
                  <option value="Self-employed">Self Employed / Business</option>
                  <option value="Other">Other</option>
                </select>
                {errors.employment && <p className="mt-1 text-xs font-semibold text-red-600">{errors.employment}</p>}
              </div>

              <div>
                <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Monthly Income *</label>
                <select
                  value={values.income}
                  onChange={(e) => setValues({ ...values, income: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm font-medium text-slate-900 outline-none transition-all focus:border-emerald-500 focus:bg-white"
                >
                  <option value="">Select Income</option>
                  <option value="<25k">Below ₹25,000</option>
                  <option value="25k-50k">₹25,000 – ₹50,000</option>
                  <option value="50k-1L">₹50,000 – ₹1 Lakh</option>
                  <option value="1L+">Above ₹1 Lakh</option>
                </select>
                {errors.income && <p className="mt-1 text-xs font-semibold text-red-600">{errors.income}</p>}
              </div>
            </div>

            <div>
              <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Primary Need *</label>
              <select
                value={values.requirement}
                onChange={(e) => setValues({ ...values, requirement: e.target.value })}
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm font-medium text-slate-900 outline-none transition-all focus:border-emerald-500 focus:bg-white"
              >
                <option value="">Select your primary requirement</option>
                <option value="Consolidate">Debt Consolidation (Multiple Loans / CC Dues)</option>
                <option value="Reduce interest">Reduce Existing Loan Interest Rate</option>
                <option value="Credit-card debt">Credit Card Balance Payoff</option>
                <option value="Personal loan">New Personal Loan</option>
                <option value="Balance transfer">Personal Loan Balance Transfer</option>
                <option value="Other">Other Assistance</option>
              </select>
              {errors.requirement && <p className="mt-1 text-xs font-semibold text-red-600">{errors.requirement}</p>}
            </div>

            <div>
              <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Existing Loan Dues (Optional)</label>
              <input
                value={values.debt}
                onChange={(e) => setValues({ ...values, debt: e.target.value })}
                placeholder="e.g. ₹3L Personal Loan + ₹80k Credit Card"
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-900 outline-none transition-all focus:border-emerald-500 focus:bg-white"
              />
            </div>

            <label className="flex items-start gap-2.5 rounded-xl bg-slate-50 p-3.5 border border-slate-200/80 cursor-pointer">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 h-4 w-4 accent-emerald-600 cursor-pointer"
              />
              <span className="text-[11px] leading-4 text-slate-600 font-medium">
                I authorize Credit Expert India and its partner banks/NBFCs to reach out via Phone/WhatsApp regarding my inquiry, accepting the{" "}
                <a href="#privacy" className="font-bold text-[#091328] underline">Privacy Policy</a> & <a href="#terms" className="font-bold text-[#091328] underline">Terms</a>.
              </span>
            </label>
            {errors.consent && <p className="text-xs font-semibold text-red-600">{errors.consent}</p>}

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={status === "loading"}
              className="shimmer-btn flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[#091328] text-xs font-extrabold tracking-wider text-white shadow-xl hover:bg-[#132247] disabled:opacity-60"
            >
              {status === "loading" ? "SUBMITTING..." : "CHECK MY OPTIONS NOW"}
              <ArrowRight className="h-4 w-4 text-emerald-400" />
            </motion.button>

            <a
              href="https://wa.me/919876543210?text=Hi%2C%20I%20would%20like%20help%20with%20my%20loans%2FEMIs%20and%20want%20to%20understand%20my%20options."
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-extrabold tracking-wider text-emerald-700 hover:bg-emerald-500/20 transition-all"
            >
              <span>💬 TALK TO A CREDIT EXPERT VIA WHATSAPP</span>
            </a>

            <AnimatePresence>
              {msg && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className={`rounded-xl p-4 text-xs font-bold text-center ${
                    status === "success"
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                      : "bg-red-50 text-red-700 border border-red-200"
                  }`}
                >
                  {msg}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-600 font-semibold pt-1">
              <Lock className="h-3.5 w-3.5 text-emerald-600" />
              <span>We respect your privacy. No unwanted calls or spam.</span>
            </div>
          </div>
        </motion.form>
      </div>
    </section>
  );
}


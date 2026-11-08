"use client";

import React, { useState, useEffect, useRef } from "react";
import { Loader2, ArrowRight, CheckCircle2, AlertCircle, ChevronDown, Lock, Check, CheckCheck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/img/logo.webp";
import { contact } from "@/lib/config";
import { NOTICE_VERSION } from "@/lib/consent";
import { track } from "@/lib/analytics/track";

const REQUIREMENTS = [
  "Reduce my EMI",
  "Consolidate Multiple Loans",
  "Personal Loan",
  "Credit Card Loan",
  "App Loans",
  "Loan Balance Transfer",
  "Overdraft / OD",
  "Check My Eligibility",
  "Other"
];

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    requirement: "",
    netSalary: "",
    ongoingEmi: "",
    consentContact: false,
    consentShareWithLenders: false,
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const hasStartedRef = useRef(false);

  // Approximates the plan's "50% visible" lead_form_view with a mount-time
  // fire: both pages that render this form put it close to the viewport
  // (the homepage's #lead-form section, or above the fold on /contact), and
  // a full IntersectionObserver per form instance was judged not worth the
  // added complexity for this phase.
  useEffect(() => {
    track({ name: "lead_form_view", params: { form_id: "contact", form_location: "contact_form" } });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!hasStartedRef.current) {
      hasStartedRef.current = true;
      track({ name: "lead_form_start", params: { form_id: "contact" } });
    }
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    track({ name: "lead_form_submit", params: { form_id: "contact" } });

    if (!formData.name || !formData.phone || !formData.requirement || !formData.netSalary || !formData.ongoingEmi) {
      setErrorMessage("Please fill all required fields.");
      setStatus("error");
      track({ name: "lead_form_error", params: { form_id: "contact", error_code: "name_missing" } });
      return;
    }

    const salary = Number(formData.netSalary);
    if (isNaN(salary) || salary <= 45000) {
      setErrorMessage("Net salary must be greater than ₹45,000.");
      setStatus("error");
      track({ name: "lead_form_error", params: { form_id: "contact", error_code: "salary_below_min" } });
      return;
    }

    const emi = Number(formData.ongoingEmi);
    if (isNaN(emi) || emi > salary * 0.8) {
      setErrorMessage("Ongoing EMI cannot be greater than 80% of net salary.");
      setStatus("error");
      track({ name: "lead_form_error", params: { form_id: "contact", error_code: "emi_too_high" } });
      return;
    }

    if (!formData.consentContact) {
      setErrorMessage("Please agree to being contacted about your enquiry.");
      setStatus("error");
      track({ name: "lead_form_error", params: { form_id: "contact", error_code: "consent_missing" } });
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          consent: {
            contact: formData.consentContact,
            shareWithLenders: formData.consentShareWithLenders,
            noticeVersion: NOTICE_VERSION,
          },
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit form.");
      }

      setStatus("success");
      setFormData({
        name: "",
        phone: "",
            requirement: "",
            netSalary: "",
        ongoingEmi: "",
        consentContact: false,
        consentShareWithLenders: false,
      });
      track({ name: "generate_lead", params: { lead_source: "contact", currency: "INR" } });
    } catch (error: any) {
      console.error("Form submission error:", error);
      setErrorMessage(error.message || "An unexpected error occurred. Please try again.");
      track({ name: "lead_form_error", params: { form_id: "contact", error_code: "server" } });
      setStatus("error");
    }
  };

  const renderRightColumn = () => {
    if (status === "success") {
      return (
        <div className="bg-emerald-50 border border-emerald-200 rounded-[24px] p-8 text-center shadow-sm h-full flex flex-col justify-center">
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-500" />
          </div>
          <h3 className="text-2xl font-bold text-emerald-900 mb-2">Successfully Submitted</h3>
          <p className="text-emerald-700 mb-8">
            Thank you for contacting Credit Expert India.
            <br />
            Our team will contact you shortly.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              data-analytics-location="contact_form_success"
              className="flex-1 px-6 py-3 bg-[#25D366] text-white hover:bg-emerald-600 rounded font-bold transition-all shadow-md shadow-green-600/20 hover:-translate-y-0.5 text-sm sm:text-base flex items-center justify-center gap-2"
            >
              Chat on WhatsApp
            </Link>
            <Link
              href="/eligibility"
              data-analytics-cta="contact_form_success_check_eligibility"
              data-analytics-location="contact_form_success"
              className="flex-1 px-6 py-3 bg-[#0052CC] text-white hover:bg-[#0052CC]/90 rounded font-bold transition-all shadow-md shadow-[#0052CC]/20 hover:-translate-y-0.5 text-sm sm:text-base flex items-center justify-center gap-2"
            >
              Check Eligibility
            </Link>
          </div>
          
          <button
            onClick={() => setStatus("idle")}
            className="mt-6 text-sm text-emerald-700 hover:text-emerald-900 underline font-medium transition-colors"
          >
            Send another message
          </button>
        </div>
      );
    }

    return (
      <div className="bg-white p-6 sm:p-10 relative z-20 flex flex-col scroll-mt-24 rounded-2xl card-elevated" id="contact-form-card">
        <div className="mb-6 md:mb-8 shrink-0">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-2">
            <h2 className="text-[32px] font-bold tracking-[-0.02em] text-[#0A2540]">Leave your details</h2>

          </div>
          <p className="text-[#3C4F69] text-sm -mt-1 sm:mt-0">We&apos;ll call you back, usually within 24 hours.</p>
        </div>

        {status === "error" && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 flex items-start gap-3 shrink-0">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <p className="text-sm text-red-800 font-medium">{errorMessage}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 flex flex-col flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="name" className="text-sm font-bold text-[#0A2540]">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Rahul Sharma"
                className="w-full bg-slate-50 border border-slate-50 focus:border-slate-200 rounded-xl px-4 py-3 text-[#0A2540] text-sm focus:ring-4 focus:ring-blue-50 outline-none transition-all placeholder:text-[#3C4F69]/50"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="phone" className="text-sm font-bold text-[#0A2540]">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g. 9876543210"
                className="w-full bg-slate-50 border border-slate-50 focus:border-slate-200 rounded-xl px-4 py-3 text-[#0A2540] text-sm focus:ring-4 focus:ring-blue-50 outline-none transition-all placeholder:text-[#3C4F69]/50"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="requirement" className="text-sm font-bold text-[#0A2540]">
              What can we help you with? <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                id="requirement"
                name="requirement"
                value={formData.requirement}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-50 focus:border-slate-200 rounded-xl px-4 py-3 text-[#0A2540] text-sm focus:ring-4 focus:ring-blue-50 outline-none transition-all appearance-none pr-10"
                required
              >
                <option value="" disabled>Select an option</option>
                {REQUIREMENTS.map((req) => (
                  <option key={req} value={req}>
                    {req}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-[#3C4F69]">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="netSalary" className="text-sm font-bold text-[#0A2540]">
                Net Monthly Salary (₹) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="netSalary"
                name="netSalary"
                value={formData.netSalary}
                onChange={handleChange}
                placeholder="e.g. 50000"
                className="w-full bg-slate-50 border border-slate-50 focus:border-slate-200 rounded-xl px-4 py-3 text-[#0A2540] text-sm focus:ring-4 focus:ring-blue-50 outline-none transition-all placeholder:text-[#3C4F69]/50"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="ongoingEmi" className="text-sm font-bold text-[#0A2540]">
                Ongoing EMI (₹) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="ongoingEmi"
                name="ongoingEmi"
                value={formData.ongoingEmi}
                onChange={handleChange}
                placeholder="e.g. 15000"
                className="w-full bg-slate-50 border border-slate-50 focus:border-slate-200 rounded-xl px-4 py-3 text-[#0A2540] text-sm focus:ring-4 focus:ring-blue-50 outline-none transition-all placeholder:text-[#3C4F69]/50"
                required
              />
            </div>
          </div>

          <div className="mt-4 pt-4 shrink-0">
            <label className="flex items-start gap-3 py-1 rounded-xl cursor-pointer group mb-3">
              <div className="relative flex items-center justify-center mt-0.5">
                <input
                  type="checkbox"
                  name="consentContact"
                  checked={formData.consentContact}
                  onChange={handleChange}
                  className="peer w-[18px] h-[18px] appearance-none border border-slate-200 rounded-[4px] checked:bg-[#0052CC] checked:border-[#0052CC] transition-colors cursor-pointer"
                  required
                />
                <Check className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" strokeWidth={3} />
              </div>
              <span className="text-sm text-[#3C4F69] group-hover:text-[#0A2540] transition-colors">
                I agree that Credit Expert India may contact me regarding this enquiry. <span className="text-red-500">*</span>
              </span>
            </label>

            <label className="flex items-start gap-3 py-1 rounded-xl cursor-pointer group mb-4">
              <div className="relative flex items-center justify-center mt-0.5">
                <input
                  type="checkbox"
                  name="consentShareWithLenders"
                  checked={formData.consentShareWithLenders}
                  onChange={handleChange}
                  className="peer w-[18px] h-[18px] appearance-none border border-slate-200 rounded-[4px] checked:bg-[#0052CC] checked:border-[#0052CC] transition-colors cursor-pointer"
                />
                <Check className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" strokeWidth={3} />
              </div>
              <span className="text-sm text-[#3C4F69] group-hover:text-[#0A2540] transition-colors">
                I'm also open to being contacted by Credit Expert India's partner lenders (see{" "}
                <Link href="/partner-disclosures" className="underline">partner disclosures</Link>). Optional.
              </span>
            </label>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-[#0052CC] text-white py-[18px] rounded font-bold shadow-xl shadow-[#0052CC]/20 hover:shadow-2xl hover:shadow-[#0052CC]/30 hover:bg-[#0052CC]/90 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none text-base"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <span>Submit Enquiry</span>
                  <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                </>
              )}
            </button>
            
            <div className="pt-4 flex items-start sm:items-center justify-center gap-1.5 text-[#3C4F69]">
              <Lock className="w-3.5 h-3.5 shrink-0 mt-0.5 sm:mt-0 text-slate-400" />
              <p className="text-[11px] sm:text-xs text-slate-400">Your information is secure and will only be used to contact you.</p>
            </div>
          </div>
        </form>
      </div>
    );
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-[5fr_6fr] gap-10 lg:gap-16 items-start">
        <div className="order-2 lg:order-1 lg:sticky lg:top-28">
          <h2 className="text-[40px] sm:text-[56px] lg:text-[58px] leading-[1.02] tracking-[-0.04em] font-bold text-[#0A2540]">
            Rather have someone call you?
          </h2>
          <p className="mt-5 text-lg md:text-xl leading-relaxed text-[#0A2540] max-w-md">
            Leave your number and tell us what you need help with. A credit expert will ring you
            back and walk through it with you.
          </p>

          <div className="mt-9 max-w-md overflow-hidden rounded-2xl card-elevated bg-[#efeae2]">
            <div className="flex items-center gap-3 bg-[#008069] px-4 py-3 text-white">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white">
                <Image src={logo} alt="" className="h-[18px] w-auto object-contain" />
              </div>
              <div className="leading-tight">
                <p className="text-[15px] font-semibold">Credit Expert India</p>
                <p className="text-xs text-white/80">online</p>
              </div>
            </div>

            <div className="flex flex-col gap-2 px-4 py-5">
              <span className="self-center rounded-md bg-white/80 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-[#54656f] shadow-sm">
                Today
              </span>

              <div className="self-end max-w-[85%] rounded-lg rounded-tr-none bg-[#d9fdd3] px-3 pt-2 pb-1.5 text-[#111b21] shadow-sm">
                <p className="text-[15px] leading-snug">I have a few EMIs. Can I pay less every month?</p>
                <p className="mt-0.5 flex items-center justify-end gap-1 text-[11px] text-[#667781]">
                  10:42
                  <CheckCheck className="h-3.5 w-3.5 text-[#53bdeb]" strokeWidth={2.5} />
                </p>
              </div>

              <div className="self-start max-w-[85%] rounded-lg rounded-tl-none bg-white px-3 pt-2 pb-1.5 text-[#111b21] shadow-sm">
                <p className="text-[15px] leading-snug">
                  Maybe. Share a few details and we&apos;ll go through them with you. It&apos;s free, and
                  there&apos;s no pressure to go ahead.
                </p>
                <p className="mt-0.5 text-right text-[11px] text-[#667781]">10:43</p>
              </div>
            </div>
          </div>

          <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-base text-[#0A2540] max-w-md">
            <li>Your data is encrypted.</li>
            <li>Never shared with third parties.</li>
            <li>Verified loan experts.</li>
            <li>Usually a reply within 24 hours.</li>
          </ul>
        </div>

        <div className="order-1 lg:order-2 relative w-full lg:ml-auto max-w-[560px]">
          {renderRightColumn()}
        </div>
      </div>
    </div>
  );
}

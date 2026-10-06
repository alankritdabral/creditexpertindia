"use client";

import React, { useState } from "react";
import { Loader2, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { contact } from "@/lib/config";

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
    email: "",
    requirement: "",
    message: "",
    consent: false,
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
    if (!formData.name || !formData.phone || !formData.requirement) {
      setErrorMessage("Please fill all required fields.");
      setStatus("error");
      return;
    }
    if (!formData.consent) {
      setErrorMessage("Please agree to our contact policy.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      // Send Email and Save to Firestore via Server API
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit form.");
      }

      setStatus("success");
      setFormData({
        name: "",
        phone: "",
        email: "",
        requirement: "",
        message: "",
        consent: false,
      });
    } catch (error: any) {
      console.error("Form submission error:", error);
      setErrorMessage(error.message || "An unexpected error occurred. Please try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center max-w-lg mx-auto shadow-sm">
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
            className="flex-1 px-6 py-3 bg-[#25D366] text-white hover:bg-[#20bd5a] rounded-xl font-bold transition-all shadow-md shadow-green-600/20 hover:-translate-y-0.5 text-sm sm:text-base flex items-center justify-center gap-2"
          >
            Chat on WhatsApp
          </Link>
          <Link
            href="/eligibility"
            className="flex-1 px-6 py-3 bg-blue-energy text-white hover:bg-blue-600 rounded-xl font-bold transition-all shadow-md shadow-blue-energy/20 hover:-translate-y-0.5 text-sm sm:text-base flex items-center justify-center gap-2"
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
    <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-icy-blue p-6 md:p-8 max-w-2xl mx-auto" id="contact-form">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-brand-black mb-2">Get in touch</h2>
        <p className="text-brand-black/70 text-sm">Fill out the form below and our credit experts will get back to you.</p>
      </div>

      {status === "error" && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <p className="text-sm text-red-800 font-medium">{errorMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label htmlFor="name" className="text-sm font-semibold text-brand-black">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Rahul Sharma"
              className="w-full bg-slate-50 border border-icy-blue rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-energy/30 focus:border-blue-energy outline-none transition-all"
              required
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="phone" className="text-sm font-semibold text-brand-black">
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g. 9876543210"
              className="w-full bg-slate-50 border border-icy-blue rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-energy/30 focus:border-blue-energy outline-none transition-all"
              required
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="email" className="text-sm font-semibold text-brand-black">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g. rahul@example.com"
            className="w-full bg-slate-50 border border-icy-blue rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-energy/30 focus:border-blue-energy outline-none transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="requirement" className="text-sm font-semibold text-brand-black">
            What can we help you with? <span className="text-red-500">*</span>
          </label>
          <select
            id="requirement"
            name="requirement"
            value={formData.requirement}
            onChange={handleChange}
            className="w-full bg-slate-50 border border-icy-blue rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-energy/30 focus:border-blue-energy outline-none transition-all appearance-none"
            required
          >
            <option value="" disabled>Select an option</option>
            {REQUIREMENTS.map((req) => (
              <option key={req} value={req}>
                {req}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="message" className="text-sm font-semibold text-brand-black">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us a bit more about your situation..."
            rows={4}
            className="w-full bg-slate-50 border border-icy-blue rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-energy/30 focus:border-blue-energy outline-none transition-all resize-y"
          />
        </div>

        <label className="flex items-start gap-3 p-4 border border-icy-blue rounded-xl cursor-pointer hover:bg-slate-50 transition-colors group">
          <input
            type="checkbox"
            name="consent"
            checked={formData.consent}
            onChange={handleChange}
            className="w-5 h-5 mt-0.5 text-blue-energy accent-blue-energy shrink-0 rounded border-icy-blue"
            required
          />
          <span className="text-sm text-brand-black/80 leading-relaxed group-hover:text-brand-black transition-colors">
            I agree that Credit Expert India may contact me regarding my enquiry.
          </span>
        </label>

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-blue-energy text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-energy/20 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Submitting...</span>
            </>
          ) : (
            <>
              <span>Submit Enquiry</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}

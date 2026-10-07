"use client";

import React, { useState } from "react";
import { Loader2, ArrowRight, CheckCircle2, AlertCircle, Clock, Lock, ShieldCheck, UserCheck, Zap, ChevronDown, FileText, BarChart2, User, Check, HandCoins, CreditCard, Smartphone, Database } from "lucide-react";
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
    netSalary: "",
    ongoingEmi: "",
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
    if (!formData.name || !formData.phone || !formData.requirement || !formData.netSalary || !formData.ongoingEmi) {
      setErrorMessage("Please fill all required fields.");
      setStatus("error");
      return;
    }

    const salary = Number(formData.netSalary);
    if (isNaN(salary) || salary <= 45000) {
      setErrorMessage("Net salary must be greater than ₹45,000.");
      setStatus("error");
      return;
    }
    
    const emi = Number(formData.ongoingEmi);
    if (isNaN(emi) || emi > salary * 0.8) {
      setErrorMessage("Ongoing EMI cannot be greater than 80% of net salary.");
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
        netSalary: "",
        ongoingEmi: "",
        consent: false,
      });
    } catch (error: any) {
      console.error("Form submission error:", error);
      setErrorMessage(error.message || "An unexpected error occurred. Please try again.");
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
              className="flex-1 px-6 py-3 bg-[#25D366] text-white hover:bg-emerald-600 rounded-xl font-bold transition-all shadow-md shadow-green-600/20 hover:-translate-y-0.5 text-sm sm:text-base flex items-center justify-center gap-2"
            >
              Chat on WhatsApp
            </Link>
            <Link
              href="/eligibility"
              className="flex-1 px-6 py-3 bg-[#1769D1] text-white hover:bg-[#1769D1]/90 rounded-xl font-bold transition-all shadow-md shadow-[#1769D1]/20 hover:-translate-y-0.5 text-sm sm:text-base flex items-center justify-center gap-2"
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
      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(7,27,58,0.06)] border border-slate-200/50 p-6 sm:p-10 relative z-20 flex flex-col" id="contact-form">
        <div className="mb-6 md:mb-8 shrink-0">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-2">
            <h2 className="text-[26px] font-bold text-[#0B2945]">Get in touch</h2>
            <div className="inline-flex items-center gap-2 bg-indigo-50 px-3 py-2 rounded-xl text-indigo-700">
              <Clock className="w-4 h-4" />
              <span className="text-[11px] font-bold leading-tight">Usually respond<br/>within 24 hours</span>
            </div>
          </div>
          <p className="text-[#4F6784] text-[14px] -mt-1 sm:mt-0">Fill out the form below and our credit experts will get back to you.</p>
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
              <label htmlFor="name" className="text-[14px] font-bold text-[#0B2945]">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Rahul Sharma"
                className="w-full bg-slate-50 border border-slate-50 focus:border-slate-200 rounded-xl px-4 py-3 text-[#0B2945] text-[14px] focus:ring-4 focus:ring-indigo-50 outline-none transition-all placeholder:text-[#4F6784]/50"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="phone" className="text-[14px] font-bold text-[#0B2945]">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g. 9876543210"
                className="w-full bg-slate-50 border border-slate-50 focus:border-slate-200 rounded-xl px-4 py-3 text-[#0B2945] text-[14px] focus:ring-4 focus:ring-indigo-50 outline-none transition-all placeholder:text-[#4F6784]/50"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="email" className="text-[14px] font-bold text-[#0B2945]">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. rahul@example.com"
              className="w-full bg-slate-50 border border-slate-50 focus:border-slate-200 rounded-xl px-4 py-3 text-[#0B2945] text-[14px] focus:ring-4 focus:ring-indigo-50 outline-none transition-all placeholder:text-[#4F6784]/50"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="requirement" className="text-[14px] font-bold text-[#0B2945]">
              What can we help you with? <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                id="requirement"
                name="requirement"
                value={formData.requirement}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-50 focus:border-slate-200 rounded-xl px-4 py-3 text-[#0B2945] text-[14px] focus:ring-4 focus:ring-indigo-50 outline-none transition-all appearance-none pr-10"
                required
              >
                <option value="" disabled>Select an option</option>
                {REQUIREMENTS.map((req) => (
                  <option key={req} value={req}>
                    {req}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-[#4F6784]">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="netSalary" className="text-[14px] font-bold text-[#0B2945]">
                Net Monthly Salary (₹) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="netSalary"
                name="netSalary"
                value={formData.netSalary}
                onChange={handleChange}
                placeholder="e.g. 50000"
                className="w-full bg-slate-50 border border-slate-50 focus:border-slate-200 rounded-xl px-4 py-3 text-[#0B2945] text-[14px] focus:ring-4 focus:ring-indigo-50 outline-none transition-all placeholder:text-[#4F6784]/50"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="ongoingEmi" className="text-[14px] font-bold text-[#0B2945]">
                Ongoing EMI (₹) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="ongoingEmi"
                name="ongoingEmi"
                value={formData.ongoingEmi}
                onChange={handleChange}
                placeholder="e.g. 15000"
                className="w-full bg-slate-50 border border-slate-50 focus:border-slate-200 rounded-xl px-4 py-3 text-[#0B2945] text-[14px] focus:ring-4 focus:ring-indigo-50 outline-none transition-all placeholder:text-[#4F6784]/50"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5 flex flex-col">
            <label htmlFor="message" className="text-[14px] font-bold text-[#0B2945]">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us a bit more about your situation..."
              rows={2}
              className="w-full bg-slate-50 border border-slate-50 focus:border-slate-200 rounded-xl px-4 py-3 text-[#0B2945] text-[14px] focus:ring-4 focus:ring-indigo-50 outline-none transition-all resize-none placeholder:text-[#4F6784]/50"
            />
          </div>

          <div className="mt-4 pt-4 shrink-0">
            <label className="flex items-center gap-3 py-1 rounded-xl cursor-pointer group mb-4">
              <div className="relative flex items-center justify-center">
                <input
                  type="checkbox"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                  className="peer w-[18px] h-[18px] appearance-none border border-slate-200 rounded-[4px] checked:bg-[#1769D1] checked:border-[#1769D1] transition-colors cursor-pointer"
                  required
                />
                <Check className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" strokeWidth={3} />
              </div>
              <span className="text-[14px] text-[#4F6784] group-hover:text-[#0B2945] transition-colors">
                I agree that Credit Expert India may contact me regarding my enquiry.
              </span>
            </label>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-[#1769D1] text-white py-[18px] rounded-xl font-bold shadow-xl shadow-[#1769D1]/20 hover:shadow-2xl hover:shadow-[#1769D1]/30 hover:bg-[#1769D1]/90 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none text-[15px]"
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
            
            <div className="pt-4 flex items-start sm:items-center justify-center gap-1.5 text-[#4F6784]">
              <Lock className="w-3.5 h-3.5 shrink-0 mt-0.5 sm:mt-0 text-slate-400" />
              <p className="text-[11px] sm:text-[12px] text-slate-400">Your information is secure and will only be used to contact you.</p>
            </div>
          </div>
        </form>
      </div>
    );
  };

  return (
    <div className="relative w-full overflow-hidden sm:overflow-visible">
      {/* Background blobs matching the image */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-indigo-50/80 to-transparent rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/4"></div>
      
      <div className="max-w-[1200px] mx-auto w-full py-4 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 xl:gap-14 items-start">
          {/* Left Column */}
          <div className="flex flex-col h-full">
            <div className="flex flex-col justify-center">
              <div className="mb-4">
                <span className="text-[#1769D1] font-bold tracking-[0.2em] text-[11px] uppercase">A Simple Process</span>
                <h2 className="text-[36px] sm:text-[46px] font-extrabold text-[#0B2945] mt-2 mb-3 leading-[1.1] tracking-tight">
                  First understand.<br/>
                  <span className="text-[#1769D1]">Then decide.</span>
                </h2>
                <p className="text-[#4F6784] text-[14px] sm:text-[15px] leading-relaxed max-w-[480px]">
                  Share a few details and our credit experts will get back to you with personalised options to reduce your interest rates and manage your loans better.
                </p>
              </div>
                       <div className="relative flex flex-col lg:flex-row items-center lg:items-start w-full mt-8 lg:mt-12 z-10 gap-12 lg:gap-4">
                <div className="space-y-6 w-full lg:w-[55%] shrink-0 z-20">
                  <div className="flex gap-4 items-start">
                    <div className="flex gap-2 shrink-0">
                      <div className="w-8 h-8 rounded-full bg-indigo-50 text-[#1769D1] flex items-center justify-center font-bold text-xs shrink-0">01</div>
                      <div className="w-10 h-10 rounded-full bg-blue-50 text-[#1769D1] flex items-center justify-center shrink-0 -mt-1">
                        <FileText className="w-4 h-4" strokeWidth={2.5} />
                      </div>
                    </div>
                    <div className="pt-0.5">
                      <h3 className="text-[16px] sm:text-[17px] font-bold text-[#0B2945] mb-0.5">Tell us where you stand.</h3>
                      <p className="text-[#4F6784] text-[14px] leading-relaxed max-w-[240px]">Share your basic loan, EMI, income and borrowing details.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 items-start">
                    <div className="flex gap-2 shrink-0">
                      <div className="w-8 h-8 rounded-full bg-indigo-50 text-[#1769D1] flex items-center justify-center font-bold text-xs shrink-0">02</div>
                      <div className="w-10 h-10 rounded-full bg-indigo-50/80 text-indigo-600 flex items-center justify-center shrink-0 -mt-1">
                        <BarChart2 className="w-4 h-4" strokeWidth={2.5} />
                      </div>
                    </div>
                    <div className="pt-0.5">
                      <h3 className="text-[16px] sm:text-[17px] font-bold text-[#0B2945] mb-0.5">We review your situation.</h3>
                      <p className="text-[#4F6784] text-[14px] leading-relaxed max-w-[240px]">We look at your current obligations, interest rates and requirements.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 items-start">
                    <div className="flex gap-2 shrink-0">
                      <div className="w-8 h-8 rounded-full bg-indigo-50 text-[#1769D1] flex items-center justify-center font-bold text-xs shrink-0">03</div>
                      <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 -mt-1">
                        <User className="w-4 h-4" strokeWidth={2.5} />
                      </div>
                    </div>
                    <div className="pt-0.5">
                      <h3 className="text-[16px] sm:text-[17px] font-bold text-[#0B2945] mb-0.5">Understand your options.</h3>
                      <p className="text-[#4F6784] text-[14px] leading-relaxed max-w-[240px]">Our experts will explain options so you can make a decision.</p>
                    </div>
                  </div>
                </div>

                {/* Smartphone / EMI Stack Illustration (Visual Area) */}
                <div className="hidden lg:flex w-full lg:w-[45%] justify-center lg:justify-end shrink-0 pointer-events-none mt-4 lg:mt-0 relative pb-0 sm:pb-4">
                  
                  <div className="rotate-[10deg] flex flex-col items-center scale-[0.8] sm:scale-[0.9] lg:scale-[0.8] xl:scale-[0.85] origin-top lg:origin-top-right translate-x-8 lg:translate-x-12 -mb-[110px] sm:-mb-[60px] lg:-mb-[110px] xl:-mb-[80px]">
                    {/* The iPhone */}
                    <div className="relative w-[260px] h-[440px] bg-black rounded-[2.75rem] shadow-[0_0_0_1.5px_#666,0_0_0_4px_#222,0_20px_50px_rgba(7,27,58,0.15)] p-[10px] z-10">
                      {/* Hardware buttons */}
                      <div className="absolute top-[80px] -left-[5px] w-[3px] h-[25px] bg-[#555] rounded-l-sm shadow-[inset_-1px_0_2px_#000]"></div>
                      <div className="absolute top-[130px] -left-[5px] w-[3px] h-[45px] bg-[#555] rounded-l-sm shadow-[inset_-1px_0_2px_#000]"></div>
                      <div className="absolute top-[190px] -left-[5px] w-[3px] h-[45px] bg-[#555] rounded-l-sm shadow-[inset_-1px_0_2px_#000]"></div>
                      <div className="absolute top-[140px] -right-[5px] w-[3px] h-[65px] bg-[#555] rounded-r-sm shadow-[inset_1px_0_2px_#000]"></div>
                      
                      {/* Screen */}
                      <div className="relative w-full h-full bg-[#f4f7fc] rounded-[2rem] overflow-hidden flex flex-col pt-12 px-3 pb-3 shadow-[inset_0_0_4px_rgba(0,0,0,0.1)]">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#ffffff] via-[#f7f9fc] to-[#e6eef6] z-0"></div>
                        
                        {/* Dynamic Island */}
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[90px] h-[26px] bg-black rounded-full z-20 flex items-center px-1.5 gap-2 shadow-[0_2px_10px_rgba(0,0,0,0.1)]">
                          {/* Camera */}
                          <div className="w-[18px] h-[18px] rounded-full bg-[#080928] shadow-[inset_0_0_3px_#4c4da3] relative overflow-hidden flex-shrink-0 ml-0.5">
                            <div className="absolute top-[10%] left-[33%] w-[75%] h-[50%] bg-[radial-gradient(circle,#6667ac,transparent_50%)]"></div>
                            <div className="absolute top-[85%] left-[60%] w-[50%] h-[50%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,#4a4b82,transparent_50%)]"></div>
                          </div>
                          {/* Sensor */}
                          <div className="w-2.5 h-2.5 rounded-full bg-[#1C283F] shadow-[inset_0_0_2px_rgba(255,255,255,0.1)] ml-auto"></div>
                        </div>
                        
                        {/* Merging Lines SVG */}
                        <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none" viewBox="0 0 240 420">
                          <style>{`
                            @keyframes flow {
                              to { stroke-dashoffset: -12; }
                            }
                            .path-flow { animation: flow 0.5s linear infinite; }
                          `}</style>
                          <defs>
                            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor="#1769D1" stopOpacity="0.3" />
                              <stop offset="100%" stopColor="#1769D1" stopOpacity="1" />
                            </linearGradient>
                          </defs>
                          
                          {/* Main Trunk */}
                          <path d="M 210 88 L 210 330 C 210 380, 120 360, 120 420" fill="none" stroke="url(#lineGrad)" strokeWidth="3" strokeLinecap="round" />
                          
                          {/* Solid Branches */}
                          <path d="M 190 88 L 210 88" fill="none" stroke="#1769D1" strokeOpacity="0.3" strokeWidth="3" strokeLinecap="round" />
                          <path d="M 190 162 L 210 162" fill="none" stroke="#1769D1" strokeOpacity="0.5" strokeWidth="3" strokeLinecap="round" />
                          <path d="M 190 236 L 210 236" fill="none" stroke="#1769D1" strokeOpacity="0.7" strokeWidth="3" strokeLinecap="round" />
                          <path d="M 190 310 L 210 310" fill="none" stroke="#1769D1" strokeOpacity="0.9" strokeWidth="3" strokeLinecap="round" />

                          {/* Animated Dashes */}
                          <path d="M 190 88 L 210 88" fill="none" stroke="#ffffff" strokeWidth="2" strokeDasharray="6 6" className="path-flow" />
                          <path d="M 190 162 L 210 162" fill="none" stroke="#ffffff" strokeWidth="2" strokeDasharray="6 6" className="path-flow" />
                          <path d="M 190 236 L 210 236" fill="none" stroke="#ffffff" strokeWidth="2" strokeDasharray="6 6" className="path-flow" />
                          <path d="M 190 310 L 210 310" fill="none" stroke="#ffffff" strokeWidth="2" strokeDasharray="6 6" className="path-flow" />
                          <path d="M 210 88 L 210 330 C 210 380, 120 360, 120 420" fill="none" stroke="#ffffff" strokeWidth="2" strokeDasharray="6 6" className="path-flow" />
                        </svg>

                        {/* Home Indicator */}
                        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-[35%] h-[4px] bg-[#0B2945]/20 rounded-full z-20"></div>

                        {/* The 4 inside cards */}
                        <div className="flex flex-col gap-2.5 w-[85%] mt-2 relative z-20">
                          <div className="bg-white rounded-2xl shadow-[0_8px_20px_rgb(0,0,0,0.05)] p-3 px-4 flex items-center gap-3 w-full relative z-20">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
                              <HandCoins className="w-5 h-5" strokeWidth={2.5} />
                            </div>
                            <div>
                              <div className="text-[13px] font-bold text-[#0B2945]">Personal Loan</div>
                              <div className="text-[11px] text-[#4F6784] font-medium">₹ 12,500 EMI</div>
                            </div>
                          </div>
                          
                          <div className="bg-white rounded-2xl shadow-[0_8px_20px_rgb(0,0,0,0.05)] p-3 px-4 flex items-center gap-3 w-full relative z-20">
                            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-500 shrink-0">
                              <CreditCard className="w-5 h-5" strokeWidth={2.5} />
                            </div>
                            <div>
                              <div className="text-[13px] font-bold text-[#0B2945]">Credit Card</div>
                              <div className="text-[11px] text-[#4F6784] font-medium">₹ 4,200 EMI</div>
                            </div>
                          </div>
                          
                          <div className="bg-white rounded-2xl shadow-[0_8px_20px_rgb(0,0,0,0.05)] p-3 px-4 flex items-center gap-3 w-full relative z-20">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
                              <Smartphone className="w-5 h-5" strokeWidth={2.5} />
                            </div>
                            <div>
                              <div className="text-[13px] font-bold text-[#0B2945]">App Loan</div>
                              <div className="text-[11px] text-[#4F6784] font-medium">₹ 3,800 EMI</div>
                            </div>
                          </div>
                          
                          <div className="bg-white rounded-2xl shadow-[0_8px_20px_rgb(0,0,0,0.05)] p-3 px-4 flex items-center gap-3 w-full relative z-20">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
                              <Database className="w-5 h-5" strokeWidth={2.5} />
                            </div>
                            <div>
                              <div className="text-[13px] font-bold text-[#0B2945]">Overdraft</div>
                              <div className="text-[11px] text-[#4F6784] font-medium">₹ 6,800 EMI</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Merge Arrow connecting phone to One EMI */}
                    <div className="flex flex-col items-center -mt-14 mb-0 relative z-20">
                      <div className="w-10 h-10 bg-[#1769D1] rounded-full flex items-center justify-center text-white border-[4px] border-white shadow-md">
                        <ArrowRight className="w-5 h-5 rotate-90" strokeWidth={3} />
                      </div>
                    </div>

                    {/* One EMI Card overlapping phone */}
                    <div className="bg-white rounded-[24px] shadow-[0_20px_60px_rgb(16,185,129,0.25)] border-2 border-emerald-500 p-4 px-6 flex items-center gap-4 relative z-30 w-[270px] -mt-12 ml-6 hover:-translate-y-1 transition-transform">
                        <div className="absolute -top-3 -left-3 rotate-12 bg-white rounded-full p-1.5 shadow-md">
                          <svg className="w-6 h-6 text-[#1769D1]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0 shadow-[0_0_15px_rgb(16,185,129,0.5)]">
                          <Check className="w-6 h-6 stroke-[3]" />
                        </div>
                        <div>
                          <div className="text-[14px] font-bold text-[#0B2945]">One EMI</div>
                          <div className="text-2xl font-black text-emerald-500 leading-tight mt-0.5">₹ 18,900</div>
                          <div className="text-[11px] text-[#4F6784] font-medium mt-0.5">at lower interest rate</div>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Strip integrated into Left Column */}
            <div className="mt-2 pt-4 grid grid-cols-2 gap-y-6 gap-x-4 border-t border-slate-200/80 w-full pb-8 lg:pb-12">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center text-[#1769D1] shrink-0 border border-slate-200">
                  <ShieldCheck className="w-4 h-4" strokeWidth={2.5} />
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-[#0B2945]">100% Secure</h4>
                  <p className="text-[12px] text-[#4F6784] mt-0.5 font-medium leading-tight">Your data is encrypted</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center text-[#1769D1] shrink-0 border border-slate-200">
                  <Lock className="w-4 h-4" strokeWidth={2.5} />
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-[#0B2945]">Confidential</h4>
                  <p className="text-[12px] text-[#4F6784] mt-0.5 font-medium leading-tight">Never shared with 3rd parties</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center text-[#1769D1] shrink-0 border border-slate-200">
                  <UserCheck className="w-4 h-4" strokeWidth={2.5} />
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-[#0B2945]">Expert Guidance</h4>
                  <p className="text-[12px] text-[#4F6784] mt-0.5 font-medium leading-tight">From verified loan experts</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center text-[#1769D1] shrink-0 border border-slate-200">
                  <Zap className="w-4 h-4 fill-blue-energy" strokeWidth={2.5} />
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-[#0B2945]">Usually respond</h4>
                  <p className="text-[12px] text-[#4F6784] mt-0.5 font-medium leading-tight">within 24 hours</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column (Form) */}
          <div className="relative w-full mx-auto lg:mr-0 max-w-[480px]">
            {renderRightColumn()}
          </div>
        </div>
      </div>
    </div>
  );
}

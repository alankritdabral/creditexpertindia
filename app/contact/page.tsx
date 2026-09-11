import { Metadata } from "next";
import { LeadForm } from "@/components/LeadForm";
import { contact } from "@/lib/config";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { AnimatedMeshBackground } from "@/components/AnimatedMeshBackground";

export const metadata: Metadata = {
  title: "Contact Us | Credit Expert India",
  description: "Get in touch with Credit Expert India debt specialists for assistance with personal loans and debt consolidation.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      
      <section className="relative w-full pt-32 pb-24 lg:pt-40 lg:pb-32 bg-background overflow-hidden border-b border-slate-200">
        <div className="absolute inset-0 -z-10 h-full w-full">
          <AnimatedMeshBackground />
          <div className="absolute top-0 right-0 w-full h-full max-w-[60%] transform origin-top-right -skew-y-12 bg-gradient-to-bl from-[#E2D6CC]/40 to-transparent pointer-events-none" />
        </div>
        <div className="container-narrow text-center relative z-10">
          <span className="text-xs font-extrabold uppercase tracking-widest text-slate-600">
            CONTACT & SUPPORT
          </span>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl text-slate-900">
            Speak With a Credit Specialist
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-sm text-slate-600 font-medium">
            Have questions about your debt consolidation or loan options? We are here to assist.
          </p>
        </div>
      </section>

      <section className="py-12 bg-white border-b border-slate-200">
        <div className="container-narrow grid gap-6 sm:grid-cols-3 text-center">
          <div className="rounded-2xl bg-slate-50 p-6 border border-slate-200">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
              <MapPin className="h-5 w-5" />
            </div>
            <h3 className="mt-3 text-sm font-extrabold text-slate-900">Office Location</h3>
            <p className="mt-1 text-xs text-slate-600 font-medium">{contact.address}</p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-6 border border-slate-200">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
              <Phone className="h-5 w-5" />
            </div>
            <h3 className="mt-3 text-sm font-extrabold text-slate-900">Phone Support</h3>
            <p className="mt-1 text-xs text-slate-600 font-medium">{contact.phone}</p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-6 border border-slate-200">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
              <Mail className="h-5 w-5" />
            </div>
            <h3 className="mt-3 text-sm font-extrabold text-slate-900">Email Inquiry</h3>
            <p className="mt-1 text-xs text-slate-600 font-medium">{contact.email}</p>
          </div>
        </div>
      </section>

      <LeadForm />
    </div>
  );
}

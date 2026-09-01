import { Metadata } from "next";
import { LeadForm } from "@/components/LeadForm";
import { contact } from "@/lib/config";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | Credit Expert India",
  description: "Get in touch with Credit Expert India debt specialists for assistance with personal loans and debt consolidation.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-[#091328] py-16 text-white sm:py-20">
        <div className="container-narrow text-center">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400">
            CONTACT & SUPPORT
          </span>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Speak With a Credit Specialist
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-sm text-slate-300">
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
    </main>
  );
}

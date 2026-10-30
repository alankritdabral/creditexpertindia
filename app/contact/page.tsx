import { Metadata } from "next";
import Image from "next/image";
import { ContactForm } from "@/components/ContactForm";
import { contact } from "@/lib/config";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Our Financial & Loan Advisory Team",
  description: "Get in touch with Credit Expert India debt specialists for assistance with personal loans and debt consolidation.",
  alternates: { canonical: "/contact" },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@graph": contact.addresses.map((addr) => ({
    "@type": "FinancialService",
    "name": `Credit Expert India - ${addr.city} Branch`,
    "description": "Debt consolidation, balance transfer and personal loan advisory services.",
    "telephone": contact.whatsapp,
    "email": contact.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": addr.fullAddress,
      "addressLocality": addr.city,
      "addressCountry": "IN"
    }
  }))
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      
      <section className="relative isolate w-full pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden border-b border-icy-blue">
        <div className="absolute inset-0 pointer-events-none z-0">
          <Image
            src="/contact.png"
            alt="Contact Hero Background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-right sm:object-[75%_center] opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/30 to-transparent" />
        </div>
        <div className="container-narrow text-center relative z-10">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-black/80">
            CONTACT & SUPPORT
          </span>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl text-brand-black">
            Speak With a Credit Specialist
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-sm text-brand-black/80 font-medium">
            Have questions about your debt consolidation or loan options? We are here to assist.
          </p>
          <div className="mt-8 flex justify-center">
            <a
              href="#contact-form"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-slate-900 px-8 text-sm font-semibold text-white hover:bg-slate-800 transition-colors shadow-lg"
            >
              <span>Get in Touch</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-20 bg-white border-b border-icy-blue">
        <div className="container-narrow px-4">
          <ContactForm />
        </div>
      </section>

      <section className="py-12 bg-slate-50 border-b border-icy-blue">
        <div className="container-narrow grid gap-6 sm:grid-cols-3 text-center">
          <div className="rounded-2xl bg-white p-6 border border-icy-blue shadow-sm">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
              <MapPin className="h-5 w-5" />
            </div>
            <h3 className="mt-3 text-sm font-extrabold text-brand-black">Office Locations</h3>
            <div className="mt-1 flex flex-col gap-3">
              {contact.addresses.map((addr, idx) => (
                <p key={idx} className="text-xs text-brand-black/80 font-medium">
                  <strong className="text-brand-black block mb-1">{addr.city} Office:</strong>
                  {addr.fullAddress}
                </p>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 border border-icy-blue shadow-sm">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
              <Phone className="h-5 w-5" />
            </div>
            <h3 className="mt-3 text-sm font-extrabold text-brand-black">Phone Support</h3>
            <p className="mt-1 text-xs text-brand-black/80 font-medium">{contact.whatsapp}</p>
          </div>

          <div className="rounded-2xl bg-white p-6 border border-icy-blue shadow-sm">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
              <Mail className="h-5 w-5" />
            </div>
            <h3 className="mt-3 text-sm font-extrabold text-brand-black">Email Inquiry</h3>
            <p className="mt-1 text-xs text-brand-black/80 font-medium">{contact.email}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

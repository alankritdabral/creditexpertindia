import { Metadata } from "next";
import { ProductHero } from "@/components/ProductHero";
import { ContactForm } from "@/components/ContactForm";
import { contact } from "@/lib/config";

export const metadata: Metadata = {
  title: "Contact Us | Credit Expert India",
  description: "Get in touch with Credit Expert India debt specialists for assistance with personal loans and debt consolidation.",
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
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      
      <ProductHero
        title="Want to talk to a real person? Here we are."
        body="Questions about your loans or consolidation options? Call, message or fill in the form and one of our credit specialists will get back to you."
        cta="Leave my details"
        image="/contact.png"
        points={["Offices in Dehradun, Delhi and Rudrapur", "Usually a reply within 24 hours", "Free to ask"]}
        href="#contact-form"
      />

      <section className="bg-[#EAF3FF]">
        <div className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24">
          <ContactForm />
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24 grid gap-12 lg:grid-cols-[5fr_7fr]">
          <h2 className="text-[40px] sm:text-[56px] leading-[1.02] tracking-[-0.04em] font-bold text-[#0A2540]">
            Or come and see us.
          </h2>
          <div className="grid gap-10 sm:grid-cols-2 text-[#0A2540]">
            {contact.addresses.map((addr, idx) => (
              <div key={idx}>
                <h3 className="text-2xl font-bold tracking-[-0.02em]">{addr.city}</h3>
                <p className="mt-2 text-lg leading-relaxed text-[#3C4F69]">{addr.fullAddress}</p>
              </div>
            ))}
            <div>
              <h3 className="text-2xl font-bold tracking-[-0.02em]">Call or WhatsApp</h3>
              <p className="mt-2 text-lg text-[#3C4F69]">{contact.whatsapp}</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold tracking-[-0.02em]">Email</h3>
              <p className="mt-2 text-lg text-[#3C4F69] break-all">{contact.email}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

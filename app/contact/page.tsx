import { Mail, MapPin, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { ShortLeadForm } from "@/components/sections/ShortLeadForm";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { contact, identity } from "@/lib/config";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact Us",
  description: "Talk to a credit specialist on WhatsApp, email us, or leave your details. Offices in Dehradun, Delhi and Rudrapur.",
  path: "/contact",
});

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@graph": contact.addresses.map((addr) => ({
    "@type": "FinancialService",
    name: `Credit Expert India - ${addr.city}`,
    description: "Debt consolidation, balance transfer and personal loan assistance. A loan facilitator, not a bank or NBFC.",
    telephone: identity.phone || contact.whatsapp,
    email: contact.email,
    address: { "@type": "PostalAddress", streetAddress: addr.fullAddress, addressLocality: addr.city, addressCountry: "IN" },
  })),
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={localBusinessSchema} />
      <PageHero title="Talk to a credit specialist" lead="Message us on WhatsApp for the quickest reply, or leave your details and we will contact you." />
      <Section bg="page">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-12">
          <div className="space-y-6">
            <Card>
              <h2 className="text-xl font-bold">Reach us</h2>
              <ul className="mt-4 space-y-4 text-[15px] leading-6">
                <li className="flex items-start gap-3"><MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" /><span><span className="font-semibold">WhatsApp</span><br />{contact.whatsapp}</span></li>
                <li className="flex items-start gap-3"><Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" /><span><span className="font-semibold">Email</span><br /><a className="text-primary underline" href={`mailto:${contact.email}`}>{contact.email}</a></span></li>
              </ul>
              <div className="mt-5"><WhatsAppButton location="contact-page" size="lg" /></div>
            </Card>
            <Card>
              <h2 className="text-xl font-bold">Our offices</h2>
              <ul className="mt-4 space-y-4 text-[15px] leading-6">
                {contact.addresses.map((a) => (
                  <li key={a.city} className="flex items-start gap-3"><MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" /><span><span className="font-semibold">{a.city}</span><br />{a.fullAddress}</span></li>
                ))}
              </ul>
            </Card>
            {identity.grievanceOfficer ? (
              <Card>
                <h2 className="text-xl font-bold">Grievance officer</h2>
                <p className="mt-3 text-[15px] leading-6">{identity.grievanceOfficer.name}<br /><a className="text-primary underline" href={`mailto:${identity.grievanceOfficer.email}`}>{identity.grievanceOfficer.email}</a>{identity.grievanceOfficer.phone ? <><br />{identity.grievanceOfficer.phone}</> : null}{identity.grievanceOfficer.responseTime ? <><br />We respond within {identity.grievanceOfficer.responseTime}.</> : null}</p>
              </Card>
            ) : null}
          </div>
          <Card id="get-started" className="self-start p-6 sm:p-8">
            <h2 className="mb-5 text-xl font-bold">Leave your details</h2>
            <ShortLeadForm source="contact" />
          </Card>
        </div>
      </Section>
    </>
  );
}

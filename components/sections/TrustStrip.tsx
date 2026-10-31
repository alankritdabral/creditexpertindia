import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import { contact, lendingPartners } from "@/lib/config";

// TODO(business): set `verified: true` in lib/config.ts only for lenders you have a signed
// arrangement with. Until then no lender logos are shown.
const PARTNER_LOGOS: { id: string; src: string; alt: string }[] = [
  { id: "hdfc", src: "/logos/hdfc.webp", alt: "HDFC Bank" },
  { id: "icici", src: "/logos/icici.webp", alt: "ICICI Bank" },
  { id: "axis", src: "/logos/axiss.webp", alt: "Axis Bank" },
  { id: "kotak", src: "/logos/kotak.webp", alt: "Kotak Mahindra Bank" },
];

export function TrustStrip() {
  const showLogos = (lendingPartners as { verified?: boolean }).verified === true;
  return (
    <section aria-label="About Credit Expert India" className="border-y border-line bg-page">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-4 px-4 py-6 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
          <p className="max-w-3xl text-[15px] leading-6 text-ink">
            <span className="font-semibold">{contact.legalName}</span> is a loan facilitator, not a bank or NBFC. Rates and approval depend on the lender, and the final decision is theirs.
          </p>
        </div>
        {showLogos ? (
          <ul className="flex flex-wrap items-center gap-6" aria-label="Lending partners">
            {PARTNER_LOGOS.map((l) => (
              <li key={l.id}><Image src={l.src} alt={l.alt} width={96} height={32} className="h-8 w-auto" /></li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}

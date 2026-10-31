import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import logoWithName from "@/public/img/logo_with_name.webp";
import { contact, identity, facilitatorStatement, siteConfig } from "@/lib/config";
import { solutionLinks } from "@/content/site";

const linkClass = "inline-flex min-h-[44px] items-center text-[15px] text-ink-muted hover:text-primary lg:min-h-0 lg:py-1";

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-sm font-semibold text-ink">{title}</h2>
      <ul className="mt-3 space-y-1">{children}</ul>
    </div>
  );
}

export function SiteFooter() {
  const whatsapp = contact.whatsapp.replace(/\D/g, "");
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto w-full max-w-[1200px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.3fr]">
          <div>
            <Link href="/" aria-label="Credit Expert India home" className="inline-block">
              <Image src={logoWithName} alt="Credit Expert India" width={180} height={48} className="h-10 w-auto" />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-6 text-ink-muted">
              Helping salaried Indians understand and explore debt consolidation, balance transfer and personal loan options.
            </p>
            <div className="mt-4 flex gap-1">
              <a href="https://www.facebook.com/people/Credit-Expert-India/100095328945231/" target="_blank" rel="noopener noreferrer" className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-ink-muted hover:text-primary" aria-label="Credit Expert India on Facebook"><Facebook className="h-5 w-5" aria-hidden="true" /></a>
              <a href="https://www.instagram.com/creditexpertindia/" target="_blank" rel="noopener noreferrer" className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-ink-muted hover:text-primary" aria-label="Credit Expert India on Instagram"><Instagram className="h-5 w-5" aria-hidden="true" /></a>
              <a href="https://www.linkedin.com/company/credit-expert-india/home/" target="_blank" rel="noopener noreferrer" className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-ink-muted hover:text-primary" aria-label="Credit Expert India on LinkedIn"><Linkedin className="h-5 w-5" aria-hidden="true" /></a>
            </div>
          </div>

          <Column title="Solutions">
            {solutionLinks.map((l) => (
              <li key={l.href}><Link href={l.href} className={linkClass}>{l.label}</Link></li>
            ))}
          </Column>

          <Column title="Company">
            <li><Link href="/about" className={linkClass}>About us</Link></li>
            <li><Link href="/how-it-works" className={linkClass}>How it works</Link></li>
            <li><Link href="/faq" className={linkClass}>FAQs</Link></li>
            <li><Link href="/contact" className={linkClass}>Contact</Link></li>
          </Column>

          <Column title="Legal">
            <li><Link href="/privacy-policy" className={linkClass}>Privacy policy</Link></li>
            <li><Link href="/terms-and-conditions" className={linkClass}>Terms and conditions</Link></li>
            <li><Link href="/partner-disclosures" className={linkClass}>Partner disclosures</Link></li>
          </Column>

          <div>
            <h2 className="text-sm font-semibold text-ink">Contact</h2>
            <ul className="mt-3 space-y-1">
              <li><a href={`https://wa.me/${whatsapp}`} className={linkClass}>WhatsApp {contact.whatsapp}</a></li>
              {identity.phone ? <li><a href={`tel:${identity.phone.replace(/\s/g, "")}`} className={linkClass}>{identity.phone}</a></li> : null}
              <li><a href={`mailto:${contact.email}`} className={linkClass}>{contact.email}</a></li>
            </ul>
            {identity.grievanceOfficer ? (
              <p className="mt-4 text-sm leading-6 text-ink-muted">
                <span className="font-semibold text-ink">Grievance officer:</span> {identity.grievanceOfficer.name},{" "}
                <a className="underline" href={`mailto:${identity.grievanceOfficer.email}`}>{identity.grievanceOfficer.email}</a>
                {identity.grievanceOfficer.phone ? `, ${identity.grievanceOfficer.phone}` : ""}
                {identity.grievanceOfficer.responseTime ? `. We respond within ${identity.grievanceOfficer.responseTime}.` : ""}
              </p>
            ) : null}
            <div className="mt-4 space-y-3 text-sm leading-6 text-ink-muted">
              {contact.addresses.map((a) => (
                <p key={a.city}><span className="font-semibold text-ink">{a.city}:</span> {a.fullAddress}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 space-y-3 border-t border-line pt-6 text-sm leading-[22px] text-ink-muted">
          <p>
            {identity.registeredName || contact.legalName}
            {identity.cin ? `, CIN ${identity.cin}` : ""}
            {identity.registeredAddress ? `. Registered office: ${identity.registeredAddress}` : ""}.
          </p>
          <p>{facilitatorStatement}</p>
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
            <p>© {new Date().getFullYear()} {siteConfig.name}</p>
            <Link href="/team/login" className="inline-flex min-h-[44px] items-center text-ink-muted hover:text-primary lg:min-h-0">Team login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

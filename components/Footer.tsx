"use client";

import Link from 'next/link';
import Image from 'next/image';
import logoWithName from '@/public/img/logo_with_name.png';
import { siteConfig, contact } from '@/lib/config';
import { ArrowRight, MessageCircle, Facebook, Instagram, Linkedin } from 'lucide-react';
import { usePathname } from 'next/navigation';

export function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin') || pathname?.startsWith('/team')) return null;

  return (
    <footer className="bg-slate-50 border-t border-icy-blue">
      {/* CTA Banner */}
      <div className="bg-[#0A2540] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-energy/20 via-transparent to-blue-energy/10 pointer-events-none" />
        <div className="mx-auto max-w-[1220px] px-4 py-12 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                Still have questions? Talk to an expert.
              </h3>
              <p className="text-slate-400 mt-2 text-sm max-w-lg">
                Get a free, no-obligation assessment of your current loans and options.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <a
                href="#check-eligibility"
                className="flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[14px] font-bold text-brand-black hover:bg-slate-100 transition-colors whitespace-nowrap"
              >
                Get Free Assessment
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}?text=Hi%2C%20I%20would%20like%20help%20with%20my%20loans.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-[14px] font-bold text-white hover:bg-[#1DA851] transition-colors whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Content */}
      <div className="mx-auto max-w-[1220px] px-4 py-12 sm:px-6 lg:py-16 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Column 1: Logo, Text, Socials */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <Image
                src={logoWithName}
                alt={siteConfig.name}
                width={160}
                height={40}
                className="h-10 w-auto object-contain"
                style={{ width: 'auto', height: 'auto' }}
              />
            </Link>
            <p className="text-[15px] leading-relaxed text-brand-black/70 font-medium">
              We're not a bank. We're your credit-side guide to help you find clearer financial options. Let's create something amazing together.
            </p>
            <div className="flex items-center gap-5 pt-2">
              <a href="https://www.facebook.com/people/Credit-Expert-India/100095328945231/#" target="_blank" rel="noopener noreferrer" className="text-brand-black/60 hover:text-brand-black transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/creditexpertindia/" target="_blank" rel="noopener noreferrer" className="text-brand-black/60 hover:text-brand-black transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/company/credit-expert-india/home/" target="_blank" rel="noopener noreferrer" className="text-brand-black/60 hover:text-brand-black transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Sitemap */}
          <div>
            <h3 className="text-[16px] font-bold text-brand-black mb-6">Sitemap</h3>
            <ul role="list" className="space-y-4">
              <li><Link href="/contact" className="text-[15px] text-brand-black/70 hover:text-brand-black transition-colors font-medium">Contact us</Link></li>
              <li><Link href="/about" className="text-[15px] text-brand-black/70 hover:text-brand-black transition-colors font-medium">About us</Link></li>
              <li><Link href="/debt-consolidation" className="text-[15px] text-brand-black/70 hover:text-brand-black transition-colors font-medium">Debt Consolidation</Link></li>
              <li><Link href="/personal-loan" className="text-[15px] text-brand-black/70 hover:text-brand-black transition-colors font-medium">Personal Loans</Link></li>
              <li><Link href="/faq" className="text-[15px] text-brand-black/70 hover:text-brand-black transition-colors font-medium">FAQ</Link></li>
            </ul>
          </div>
          
          {/* Column 3: Other Pages */}
          <div>
            <h3 className="text-[16px] font-bold text-brand-black mb-6">Other Pages</h3>
            <ul role="list" className="space-y-4">
              <li><Link href="/privacy-policy" className="text-[15px] text-brand-black/70 hover:text-brand-black transition-colors font-medium">Privacy Policy</Link></li>
              <li><Link href="/terms-and-conditions" className="text-[15px] text-brand-black/70 hover:text-brand-black transition-colors font-medium">Terms & Conditions</Link></li>
              <li><Link href="/partner-disclosures" className="text-[15px] text-brand-black/70 hover:text-brand-black transition-colors font-medium">Partner Disclosures</Link></li>
              <li><Link href="/admin/login" className="text-[15px] text-brand-black/70 hover:text-brand-black transition-colors font-medium">Admin Login</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact Details */}
          <div>
            <h3 className="text-[16px] font-bold text-brand-black mb-6">Contact Details</h3>
            <ul role="list" className="space-y-4">
              {contact.addresses.map((addr, idx) => (
                <li key={idx}>
                  <span className="text-[15px] leading-relaxed text-brand-black/70 font-medium block">
                    <strong className="text-brand-black">{addr.city}:</strong> {addr.fullAddress}
                  </span>
                </li>
              ))}
              <li>
                <a href={`mailto:${contact.email}`} className="text-[15px] text-brand-black/70 hover:text-brand-black transition-colors font-medium">
                  {contact.email}
                </a>
              </li>
              <li>
                <a href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}`} className="text-[15px] text-brand-black/70 hover:text-brand-black transition-colors font-medium">
                  {contact.whatsapp}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-icy-blue pt-8 sm:mt-20 lg:mt-24 space-y-4 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="space-y-2">
            <p className="text-[13px] leading-relaxed text-brand-black/70 font-medium max-w-4xl">
              {contact.legalName}. Credit Expert India is a loan facilitator and not a bank or NBFC.
            </p>
            <p className="text-[13px] leading-relaxed text-brand-black/70 font-medium max-w-4xl">
              Final loan approval, interest rate and loan terms are determined by the respective lender based on its policies and eligibility criteria. We do not guarantee loan approval or specific rates.
            </p>
          </div>
          <p className="text-[13px] font-medium text-brand-black/70 mt-4 md:mt-0">© {new Date().getFullYear()} {siteConfig.name}.</p>
        </div>
      </div>
    </footer>
  );
}

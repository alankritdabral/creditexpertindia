"use client";

import Link from 'next/link';
import Image from 'next/image';
import logoWithName from '@/public/img/logo_with_name.webp';
import { siteConfig, contact } from '@/lib/config';
import { ArrowRight, MessageCircle, Facebook, Instagram, Linkedin, Mail, MapPin } from 'lucide-react';

const linkGroups = [
  {
    title: 'Solutions',
    links: [
      { label: 'Debt Consolidation', href: '/debt-consolidation' },
      { label: 'Personal Loans', href: '/personal-loan' },
      { label: 'Overdraft Options', href: '/personal-loan-overdraft' },
      { label: 'Check Eligibility', href: '/eligibility#credit-profile' },
    ],
  },
  {
    title: 'Calculators',
    links: [
      { label: 'Debt Consolidation Calculator', href: '/calculators/debt-consolidation-calculator' },
      { label: 'Personal Loan EMI Calculator', href: '/personal-loan-emi-calculator' },
      { label: 'EMI Savings Calculator', href: '/emi-savings-calculator' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About us', href: '/about' },
      { label: 'Contact us', href: '/contact' },
      { label: 'Learning Center', href: '/learning-center' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
];

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms & Conditions', href: '/terms-and-conditions' },
  { label: 'Partner Disclosures', href: '/partner-disclosures' },
];

const socials = [
  { label: 'Facebook', href: 'https://www.facebook.com/people/Credit-Expert-India/100095328945231/#', Icon: Facebook },
  { label: 'Instagram', href: 'https://www.instagram.com/creditexpertindia/', Icon: Instagram },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/credit-expert-india/home/', Icon: Linkedin },
];

const linkClass = 'text-sm text-brand-black/70 hover:text-brand-black transition-colors font-medium';

export function Footer() {
  const whatsappDigits = contact.whatsapp.replace(/[^0-9]/g, '');

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
              <Link
                href="/eligibility#credit-profile"
                className="flex items-center gap-2 rounded bg-white px-6 py-3 text-sm font-bold text-brand-black hover:bg-slate-100 transition-colors whitespace-nowrap"
              >
                Get Free Assessment
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`https://wa.me/${whatsappDigits}?text=Hi%2C%20I%20would%20like%20help%20with%20my%20loans.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded bg-[#25D366] px-6 py-3 text-sm font-bold text-white hover:bg-[#1DA851] transition-colors whitespace-nowrap"
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
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-12 lg:gap-8">

          {/* Brand */}
          <div className="col-span-2 lg:col-span-4 space-y-5">
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
            <p className="text-sm leading-relaxed text-brand-black/70 font-medium max-w-sm">
              We&apos;re not a bank. We&apos;re your credit-side guide to help you find clearer financial options.
            </p>
            <div className="flex items-center gap-3">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-icy-blue bg-white text-brand-black/60 hover:text-brand-black hover:border-brand-black/30 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link groups */}
          {linkGroups.map((group) => (
            <nav key={group.title} aria-label={group.title} className="lg:col-span-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-brand-black mb-5">{group.title}</h3>
              <ul role="list" className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={linkClass}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Contact */}
          <div className="col-span-2 lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-black mb-5">Contact</h3>
            <ul role="list" className="space-y-3">
              <li>
                <a href={`mailto:${contact.email}`} className={`${linkClass} flex items-start gap-2 break-all`}>
                  <Mail className="w-4 h-4 mt-0.5 shrink-0" />
                  {contact.email}
                </a>
              </li>
              <li>
                <a href={`https://wa.me/${whatsappDigits}`} className={`${linkClass} flex items-start gap-2`}>
                  <MessageCircle className="w-4 h-4 mt-0.5 shrink-0" />
                  {contact.whatsapp}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Offices */}
        <div className="mt-12 border-t border-icy-blue pt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {contact.addresses.map((addr, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <MapPin className="w-4 h-4 mt-1 shrink-0 text-brand-black/50" />
              <p className="text-sm leading-relaxed text-brand-black/70 font-medium">
                <strong className="text-brand-black">{addr.city}:</strong> {addr.fullAddress}
              </p>
            </div>
          ))}
        </div>

        {/* Legal */}
        <div className="mt-8 border-t border-icy-blue pt-8 space-y-6">
          <div className="space-y-2">
            <p className="text-xs leading-relaxed text-brand-black/60 font-medium max-w-4xl">
              {contact.legalName}. Credit Expert India is a loan facilitator and not a bank or NBFC.
            </p>
            <p className="text-xs leading-relaxed text-brand-black/60 font-medium max-w-4xl">
              Final loan approval, interest rate and loan terms are determined by the respective lender based on its policies and eligibility criteria. We do not guarantee loan approval or specific rates.
            </p>
          </div>
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p className="text-sm font-medium text-brand-black/70">© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
            <nav aria-label="Legal">
              <ul role="list" className="flex flex-wrap gap-x-6 gap-y-2">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={linkClass}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}

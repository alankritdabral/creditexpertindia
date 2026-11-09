"use client";

import Link from 'next/link';
import Image from 'next/image';
import logoWithName from '@/public/img/logo_with_name.webp';
import { siteConfig, contact } from '@/lib/config';
import { MessageCircle, Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { clearConsent } from '@/lib/consent';
import { articles } from '@/content/articles';

// Every loan/product and calculator route lives in a footer link so Google
// can reach it by following a link, not just through the hover-only navbar
// menu (plans/01-visibility-and-analytics.md Phase 8).
const solutionsLinks = [
  { label: 'Debt Consolidation', href: '/debt-consolidation' },
  { label: 'Personal Loans', href: '/personal-loan' },
  { label: 'Loan Balance Transfer', href: '/loan-balance-transfer' },
  { label: 'Credit Card Debt', href: '/credit-card-debt' },
  { label: 'High-Interest Loans', href: '/high-interest-loan' },
  { label: 'App Loans', href: '/app-loan' },
  { label: 'Overdraft Options', href: '/personal-loan-overdraft' },
  { label: 'Check Eligibility', href: '/eligibility#credit-profile' },
];

const calculatorLinks = [
  { label: 'All Calculators', href: '/calculators' },
  { label: 'Debt Consolidation Calculator', href: '/calculators/debt-consolidation-calculator' },
  { label: 'Personal Loan EMI Calculator', href: '/personal-loan-emi-calculator' },
  { label: 'EMI Savings Calculator', href: '/emi-savings-calculator' },
];

const companyLinks = [
  { label: 'About us', href: '/about' },
  { label: 'How it works', href: '/how-it-works' },
  { label: 'Contact us', href: '/contact' },
  { label: 'FAQ', href: '/faq' },
];

const guideLinks = articles.slice(0, 5).map((a) => ({ label: a.title, href: `/learning-center/${a.slug}` }));

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

const linkClass = 'text-sm text-[#B4C3E0] hover:text-white transition-colors';
const headingClass = 'text-xs font-bold uppercase tracking-wider text-white mb-4';

export function Footer() {
  const whatsappDigits = contact.whatsapp.replace(/[^0-9]/g, '');

  return (
    <footer className="bg-[#0A2150] text-[#E6ECF7]">
      <div className="mx-auto max-w-[1220px] px-4 sm:px-6 lg:px-8">

        {/* Talk to an advisor */}
        <div className="flex flex-wrap items-end justify-between gap-8 py-14 lg:py-16 border-b border-white/10">
          <div className="flex-1 min-w-[280px] max-w-[520px]">
            <h2 className="text-3xl font-extrabold tracking-tight text-white">Talk to a credit advisor</h2>
            <p className="mt-3 text-base leading-relaxed text-[#B4C3E0]">
              We&apos;re not a bank. We&apos;re your credit-side guide to finding clearer options on personal loans, EMIs and debt.
            </p>
          </div>
          <div className="flex flex-1 min-w-[280px] flex-wrap justify-end gap-3">
            <a
              href={`https://wa.me/${whatsappDigits}?text=Hi%2C%20I%20would%20like%20help%20with%20my%20loans.`}
              target="_blank"
              rel="noopener noreferrer"
              data-analytics-cta="footer_whatsapp"
              data-analytics-location="footer"
              className="flex flex-1 min-w-[200px] items-center gap-3 rounded-2xl bg-[#25D366] px-5 py-3 text-white hover:bg-[#1DA851] transition-colors"
            >
              <MessageCircle className="w-5 h-5 shrink-0" />
              <span className="flex flex-col">
                <span className="text-xs opacity-90">Chat on WhatsApp</span>
                <span className="text-base font-bold">{contact.whatsapp}</span>
              </span>
            </a>
            <a
              href={`tel:+${whatsappDigits}`}
              data-analytics-cta="footer_call"
              data-analytics-location="footer"
              className="flex flex-1 min-w-[200px] items-center gap-3 rounded-2xl bg-[#12306B] border border-white/10 px-5 py-3 text-white hover:bg-[#163a82] transition-colors"
            >
              <Phone className="w-5 h-5 shrink-0" />
              <span className="flex flex-col">
                <span className="text-xs text-[#B4C3E0]">Call us</span>
                <span className="text-base font-bold">{contact.whatsapp}</span>
              </span>
            </a>
            <a
              href={`mailto:${contact.email}`}
              data-analytics-cta="footer_email"
              data-analytics-location="footer"
              className="flex flex-1 min-w-[260px] items-center gap-3 rounded-2xl bg-[#12306B] border border-white/10 px-5 py-3 text-white hover:bg-[#163a82] transition-colors"
            >
              <Mail className="w-5 h-5 shrink-0" />
              <span className="flex flex-col">
                <span className="text-xs text-[#B4C3E0]">Email</span>
                <span className="text-base font-bold">{contact.email}</span>
              </span>
            </a>
          </div>
        </div>

        {/* Brand + nav columns */}
        <div className="flex flex-wrap gap-12 py-14">
          <div className="flex-1 min-w-[260px] max-w-[320px] flex flex-col gap-6">
            <Link href="/" aria-label={`${siteConfig.name} home`} className="inline-flex items-center gap-3 text-white">
              <Image
                src={logoWithName}
                alt={siteConfig.name}
                width={44}
                height={44}
                className="h-11 w-auto object-contain"
                style={{ width: 'auto', height: 'auto' }}
              />
              <span className="flex flex-col leading-tight">
                <span className="text-lg font-extrabold tracking-tight">Credit Expert</span>
                <span className="text-sm font-semibold text-[#7FB2FF]">India</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-[#B4C3E0]">
              A loan facilitator helping salaried borrowers compare lenders, cut EMIs and consolidate debt.
            </p>
            <div className="flex items-center gap-2.5">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-[#B4C3E0] hover:text-white hover:border-white/40 transition-colors"
                >
                  <Icon className="w-[18px] h-[18px]" />
                </a>
              ))}
            </div>
          </div>

          <div className="flex-[999_1_640px] min-w-0 grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-10">
            <nav aria-label="Solutions">
              <h3 className={headingClass}>Solutions</h3>
              <ul role="list" className="space-y-3">
                {solutionsLinks.map((link) => (
                  <li key={link.href}><Link href={link.href} className={linkClass}>{link.label}</Link></li>
                ))}
              </ul>
            </nav>

            <div>
              <nav aria-label="Calculators">
                <h3 className={headingClass}>Calculators</h3>
                <ul role="list" className="space-y-3">
                  {calculatorLinks.map((link) => (
                    <li key={link.href}><Link href={link.href} className={linkClass}>{link.label}</Link></li>
                  ))}
                </ul>
              </nav>
              <nav aria-label="Company" className="mt-8">
                <h3 className={headingClass}>Company</h3>
                <ul role="list" className="space-y-3">
                  {companyLinks.map((link) => (
                    <li key={link.href}><Link href={link.href} className={linkClass}>{link.label}</Link></li>
                  ))}
                </ul>
              </nav>
            </div>

            <nav aria-label="Guides" className="min-w-0">
              <h3 className={headingClass}>Guides</h3>
              <ul role="list" className="space-y-3 max-w-[380px]">
                {guideLinks.map((link) => (
                  <li key={link.href}><Link href={link.href} className={linkClass}>{link.label}</Link></li>
                ))}
              </ul>
              <Link href="/learning-center" className="inline-flex items-center mt-3 text-sm font-bold text-[#7FB2FF] hover:text-white transition-colors">
                Visit the learning center
              </Link>
            </nav>
          </div>
        </div>

        {/* Offices */}
        <div className="border-t border-white/10 py-10">
          <h3 className={headingClass}>Our offices</h3>
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {contact.addresses.map((addr) => (
              <address key={addr.city} className="not-italic flex gap-3.5 p-5 rounded-2xl bg-white/5">
                <MapPin className="w-5 h-5 mt-0.5 shrink-0 text-[#7FB2FF]" />
                <span className="flex flex-col gap-1.5">
                  <strong className="text-base text-white">{addr.city}</strong>
                  <span className="text-sm leading-relaxed text-[#B4C3E0]">{addr.fullAddress}</span>
                </span>
              </address>
            ))}
          </div>
        </div>

        {/* Legal */}
        <div className="border-t border-white/10 py-7 lg:pb-9 flex flex-col gap-6">
          <p className="text-xs leading-relaxed text-[#93A6CB] max-w-4xl">
            {contact.legalName} is a loan facilitator, not a bank or NBFC. Final loan approval, interest rate and loan terms are determined by the respective lender based on its policies and eligibility criteria. We do not guarantee loan approval or specific rates.
          </p>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-[#93A6CB]">© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
            <nav aria-label="Legal">
              <ul role="list" className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-[#B4C3E0] hover:text-white transition-colors">{link.label}</Link>
                  </li>
                ))}
                <li>
                  <button type="button" onClick={() => clearConsent()} className="text-[#B4C3E0] hover:text-white transition-colors">
                    Cookie settings
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}

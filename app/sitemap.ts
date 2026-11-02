import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/about',
    '/contact',
    '/credit-card-debt',
    '/debt-consolidation',
    '/eligibility',
    '/faq',
    '/high-interest-loan',
    '/how-it-works',
    '/loan-balance-transfer',
    '/partner-disclosures',
    '/personal-loan',
    '/privacy-policy',
    '/team',
    '/terms-and-conditions',
    '/app-loan',
    '/calculators/debt-consolidation-calculator',
    '/personal-loan-overdraft',
    '/personal-loan-emi-calculator',
    '/emi-savings-calculator',
    '/learning-center',
    '/personal-loan-in-bangalore',
    '/personal-loan-in-mumbai',
    '/personal-loan-in-delhi',
    '/personal-loan-in-noida',
    '/personal-loan-in-gurgaon',
    '/personal-loan-in-chennai',
    '/personal-loan-in-hyderabad',
    '/personal-loan-in-pune',
    '/personal-loan-in-kolkata',
    '/personal-loan-in-ahmedabad',
    '/personal-loan-in-jaipur',
    '/personal-loan-in-surat',
    '/personal-loan-in-lucknow',
    '/learning-center/what-is-emi-and-how-is-it-calculated',
    '/learning-center/debt-consolidation-explained-for-salaried-borrowers',
    '/learning-center/credit-card-interest-vs-personal-loan-interest',
    '/learning-center/personal-loan-balance-transfer-when-it-makes-sense',
    '/learning-center/salaried-personal-loan-eligibility-checklist',
    '/learning-center/overdraft-vs-personal-loan',
  ].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return [...routes];
}

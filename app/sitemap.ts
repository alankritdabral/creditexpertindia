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
    '/app-loan'
  ].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return [...routes];
}

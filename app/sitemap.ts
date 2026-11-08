import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/config';
import { staticRoutes } from '@/lib/routes';
import { cities } from '@/lib/cities';
import { articles } from '@/content/articles';

// Google ignores <changefreq> and <priority> (developers.google.com/search/
// docs/crawling-indexing/sitemaps/build-sitemap), so neither field is set
// here. <lastmod> is included only where the source data has a real content
// date; Google only trusts it when it is "consistently and verifiably
// accurate", so a build-time `new Date()` is never used.
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = staticRoutes
    .filter((r) => !r.noindex)
    .map((r) => ({
      url: `${siteConfig.url}${r.path}`,
      ...(r.lastModified ? { lastModified: r.lastModified } : {}),
    }));

  const cityPages: MetadataRoute.Sitemap = cities.map((c) => ({
    url: `${siteConfig.url}/personal-loan-in-${c.slug}`,
    lastModified: c.lastModified,
  }));

  const articlePages: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${siteConfig.url}/learning-center/${a.slug}`,
    lastModified: a.updatedAt,
  }));

  return [...pages, ...cityPages, ...articlePages];
}

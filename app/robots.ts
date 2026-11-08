import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'OAI-SearchBot',
          'ClaudeBot',
          'Claude-SearchBot',
          'PerplexityBot',
          'Google-Extended',
          'Applebot',
        ],
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}


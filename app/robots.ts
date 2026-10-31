import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/team/', '/api/', '/whatsapp'],
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
        disallow: ['/admin/', '/team/', '/api/', '/whatsapp'],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}


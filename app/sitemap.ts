import type { MetadataRoute } from 'next'
import { articles, siteConfig } from '@/lib/site-config'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteConfig.url, changeFrequency: 'monthly', priority: 1 },
    { url: `${siteConfig.url}/politica-de-privacidade`, changeFrequency: 'yearly', priority: 0.2 },
    ...articles.map((a) => ({
      url: `${siteConfig.url}/artigos/${a.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]
}

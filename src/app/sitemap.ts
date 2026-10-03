import type { MetadataRoute } from 'next';
import { disciplines } from '@/content/engineering';
import { projects } from '@/content/projects';
import { absoluteUrl } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '/',
    '/work',
    '/engineering',
    '/experience',
    '/about',
    '/resume',
    '/contact',
  ];
  return [
    ...staticRoutes.map((path) => ({
      url: absoluteUrl(path),
      changeFrequency: 'monthly' as const,
      priority: path === '/' ? 1 : 0.7,
    })),
    ...projects.map((project) => ({
      url: absoluteUrl(`/work/${project.slug}`),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
    ...disciplines.map((discipline) => ({
      url: absoluteUrl(`/engineering/${discipline.id}`),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
  ];
}

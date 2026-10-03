import { profile } from '@/content/profile';
import type { Project } from '@/content/types';
import { absoluteUrl, site } from './site';

export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': absoluteUrl('/#person'),
    name: profile.name,
    jobTitle: profile.title,
    description: profile.positioning,
    url: site.url,
    email: `mailto:${profile.email}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Abuja',
      addressCountry: 'NG',
    },
    sameAs: [profile.links.linkedin, profile.links.github],
    alumniOf: profile.education.map((entry) => ({
      '@type': 'CollegeOrUniversity',
      name: entry.institution,
    })),
    knowsAbout: [
      'Frontend engineering',
      'Backend engineering',
      'Mobile development',
      'React',
      'React Native',
      'Angular',
      'TypeScript',
      'Node.js',
      'Machine learning',
      'LLM evaluation',
    ],
  };
}

export function caseStudySchema(project: Project) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: project.headline,
    description: project.metaDescription,
    url: absoluteUrl(`/work/${project.slug}`),
    author: { '@id': absoluteUrl('/#person') },
    about: project.name,
    keywords: project.stack.join(', '),
  };
}

/** Serialises JSON-LD safely for inline <script> injection. */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

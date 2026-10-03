import { profile } from '@/content/profile';

function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, '');
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return 'http://localhost:3000';
}

export const site = {
  url: resolveSiteUrl(),
  name: profile.name,
  locale: 'en_GB',
  defaultTitle: `${profile.name} — ${profile.title}`,
  defaultDescription: `${profile.positioning} ${profile.yearsExperience} years across React, Angular, React Native, Node.js, Python and on-device ML. Based in ${profile.location}.`,
} as const;

export function absoluteUrl(path = '/'): string {
  return new URL(path, `${site.url}/`).toString();
}

/** Primary navigation — single source for header, mobile menu and footer. */
export const navigation = [
  { href: '/work', label: 'Work' },
  { href: '/engineering', label: 'Engineering' },
  { href: '/experience', label: 'Experience' },
  { href: '/about', label: 'About' },
  { href: '/resume', label: 'Resume' },
  { href: '/contact', label: 'Contact' },
] as const;

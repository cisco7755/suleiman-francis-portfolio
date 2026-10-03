import type { Metadata } from 'next';
import { site } from './site';

interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article' | 'profile';
}

/**
 * Builds per-route metadata with a canonical URL and matching Open Graph and
 * Twitter cards. Images come from the opengraph-image file conventions.
 */
export function pageMetadata({
  title,
  description,
  path,
  type = 'website',
}: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      type,
      siteName: site.name,
      locale: site.locale,
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}

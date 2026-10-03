import { profile } from '@/content/profile';
import { ogSize, renderOgImage } from '@/lib/og';

export const alt = `${profile.name} — ${profile.positioning}`;
export const size = ogSize;
export const contentType = 'image/png';
export const dynamic = 'force-static';

export default function Image() {
  return renderOgImage({ eyebrow: profile.specializations.join(' · '), title: profile.headline });
}

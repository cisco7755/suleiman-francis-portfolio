import { ImageResponse } from 'next/og';
import { profile } from '@/content/profile';

export const ogSize = { width: 1200, height: 630 };

/**
 * Shared Open Graph card: the site's palette and hierarchy, rendered at build
 * time. Uses the default font bundled with next/og — no network fetch.
 */
export function renderOgImage({ eyebrow, title }: { eyebrow: string; title: string }) {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '72px 80px',
        background: '#fafaf7',
        color: '#16161a',
      }}
    >
      <div
        style={{
          display: 'flex',
          fontSize: 24,
          letterSpacing: 3,
          color: '#66666e',
          textTransform: 'uppercase',
        }}
      >
        {eyebrow}
      </div>
      <div
        style={{
          display: 'flex',
          fontSize: title.length > 70 ? 54 : 64,
          lineHeight: 1.1,
          letterSpacing: -1.5,
          maxWidth: 1000,
        }}
      >
        {title}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24, fontSize: 26 }}>
        <div style={{ width: 48, height: 4, background: '#b03d0c' }} />
        <div style={{ display: 'flex' }}>
          {profile.name} · {profile.title} · {profile.location}
        </div>
      </div>
    </div>,
    ogSize,
  );
}

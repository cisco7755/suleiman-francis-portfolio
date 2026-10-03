'use client';

import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';
import { cx } from '@/lib/cx';

/**
 * next/image with a visible fallback. If the file fails to load, the reader
 * sees the description instead of a broken-image icon.
 */
export function SafeImage({ alt, className, ...props }: ImageProps & { alt: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cx(
          'flex min-h-40 w-full items-center justify-center rounded-sm border border-dashed border-line-strong p-6 text-center text-caption text-fg-muted',
          className,
        )}
      >
        Image unavailable. {alt}
      </div>
    );
  }

  return <Image alt={alt} className={className} onError={() => setFailed(true)} {...props} />;
}

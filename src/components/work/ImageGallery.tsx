import type { Figure } from '@/content/types';
import { cx } from '@/lib/cx';
import { SafeImage } from '@/components/ui/SafeImage';

const WIDE_MIN_WIDTH = 1200;

/**
 * Product screenshots in neutral frames. Portrait phone captures are capped in
 * height so a single screenshot never dominates the page.
 */
export function ImageGallery({ figures }: { figures: readonly Figure[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {figures.map((figure) => {
        const portrait = figure.height > figure.width;
        // Large desktop captures need the full width to stay legible.
        const wide = figure.width >= WIDE_MIN_WIDTH;
        return (
          <figure key={figure.src} className={cx('flex flex-col gap-3', wide && 'sm:col-span-2')}>
            <div className="flex items-center justify-center rounded-md border border-line bg-surface-muted p-4 sm:p-6">
              <SafeImage
                src={figure.src}
                alt={figure.alt}
                width={figure.width}
                height={figure.height}
                sizes={wide ? '(min-width: 1024px) 860px, 92vw' : '(min-width: 640px) 40vw, 90vw'}
                loading="lazy"
                className={
                  portrait
                    ? 'h-auto max-h-[28rem] w-auto rounded-sm border border-line'
                    : 'h-auto w-full rounded-sm border border-line'
                }
              />
            </div>
            <figcaption className="text-caption text-fg-muted">{figure.caption}</figcaption>
          </figure>
        );
      })}
    </div>
  );
}

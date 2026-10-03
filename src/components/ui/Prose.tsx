import { cx } from '@/lib/cx';

/** Renders content paragraphs at a readable measure. */
export function Prose({
  paragraphs,
  className,
}: {
  paragraphs: readonly string[];
  className?: string;
}) {
  return (
    <div className={cx('max-w-prose space-y-5 text-body text-pretty text-fg-secondary', className)}>
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  );
}

export function BulletList({ items, className }: { items: readonly string[]; className?: string }) {
  return (
    <ul className={cx('max-w-prose space-y-3 text-body text-fg-secondary', className)}>
      {items.map((item) => (
        <li key={item} className="relative break-inside-avoid pl-5">
          <span aria-hidden className="absolute top-[0.8em] left-0 h-px w-2.5 bg-line-strong" />
          {item}
        </li>
      ))}
    </ul>
  );
}

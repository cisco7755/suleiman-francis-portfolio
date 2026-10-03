import type { CodeExcerpt } from '@/content/types';

/**
 * Plain, unhighlighted code. Scrolls horizontally on narrow screens and is
 * keyboard-focusable so the scroll region is reachable without a mouse.
 */
export function CodeBlock({ excerpt }: { excerpt: CodeExcerpt }) {
  return (
    <figure className="overflow-hidden rounded-md border border-line bg-surface-muted">
      <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-2">
        <span className="text-caption font-medium text-fg">{excerpt.title}</span>
        <span className="meta">{excerpt.language}</span>
      </div>
      <pre
        tabIndex={0}
        aria-label={`${excerpt.title} (code)`}
        className="overflow-x-auto p-4 font-mono text-[0.8125rem] leading-relaxed text-fg"
      >
        <code>{excerpt.code}</code>
      </pre>
      <figcaption className="border-t border-line px-4 py-2 text-caption text-fg-muted">
        {excerpt.caption}
      </figcaption>
    </figure>
  );
}

import type { ReactNode } from 'react';

/** Small, square-cornered label for technologies. Not interactive. */
export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-sm border border-line px-2 py-0.5 font-mono text-caption text-fg-secondary">
      {children}
    </span>
  );
}

export function TagList({ items, label }: { items: readonly string[]; label: string }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label={label}>
      {items.map((item) => (
        <li key={item}>
          <Tag>{item}</Tag>
        </li>
      ))}
    </ul>
  );
}

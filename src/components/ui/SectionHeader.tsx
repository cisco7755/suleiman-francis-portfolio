import type { ReactNode } from 'react';
import { cx } from '@/lib/cx';

interface SectionHeaderProps {
  id: string;
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  action?: ReactNode;
  className?: string;
}

/**
 * Section opener: a hairline rule, a mono eyebrow, the h2, and an optional
 * lede that sits beside the title on wide screens.
 */
export function SectionHeader({ id, eyebrow, title, lede, action, className }: SectionHeaderProps) {
  return (
    <header
      className={cx('grid gap-6 border-t border-line pt-6 lg:grid-cols-12 lg:gap-8', className)}
    >
      <div className="lg:col-span-7">
        <p className="meta mb-3">{eyebrow}</p>
        <h2 id={id} className="text-h2 font-medium text-balance text-fg">
          {title}
        </h2>
      </div>
      {(lede || action) && (
        <div className="flex flex-col gap-4 lg:col-span-5 lg:justify-end">
          {lede && <p className="text-body text-pretty text-fg-secondary">{lede}</p>}
          {action}
        </div>
      )}
    </header>
  );
}

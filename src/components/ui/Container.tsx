import type { ElementType, ReactNode } from 'react';
import { cx } from '@/lib/cx';

interface ContainerProps {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

/** Page-width wrapper: one max width and one gutter scale for the whole site. */
export function Container({ as: Tag = 'div', className, children }: ContainerProps) {
  return (
    <Tag className={cx('mx-auto w-full max-w-page px-4 sm:px-6 lg:px-8 print:px-0', className)}>
      {children}
    </Tag>
  );
}

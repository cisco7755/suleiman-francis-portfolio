import type { ReactNode } from 'react';

/** Pull quote for a key lesson. Never used for testimonials. */
export function Quote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="max-w-prose border-l-2 border-accent pl-5 text-lede text-pretty text-fg">
      {children}
    </blockquote>
  );
}

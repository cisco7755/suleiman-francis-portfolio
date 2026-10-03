import type { ReactNode } from 'react';

interface PageIntroProps {
  eyebrow: string;
  title: string;
  lede?: ReactNode;
  children?: ReactNode;
}

/** Opening block for top-level pages: one h1 per page, always here. */
export function PageIntro({ eyebrow, title, lede, children }: PageIntroProps) {
  return (
    <header className="pt-14 pb-12 sm:pt-20 lg:pb-16">
      <p className="meta mb-4">{eyebrow}</p>
      <h1 className="max-w-4xl text-h1 font-medium text-balance text-fg">{title}</h1>
      {lede && <p className="mt-6 max-w-prose text-lede text-pretty text-fg-secondary">{lede}</p>}
      {children && <div className="mt-8">{children}</div>}
    </header>
  );
}

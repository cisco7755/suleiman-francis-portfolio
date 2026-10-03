'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { buttonClasses } from '@/components/ui/button-styles';
import { Container } from '@/components/ui/Container';

export default function ErrorBoundary({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container>
      <div className="pt-14 pb-12 sm:pt-20">
        <p className="meta mb-4">Error</p>
        <h1 className="max-w-4xl text-h1 font-medium text-balance text-fg">
          This page didn’t load properly.
        </h1>
        <p className="mt-6 max-w-prose text-lede text-fg-secondary">
          Something went wrong while rendering it. Trying again usually fixes it; if not, the rest
          of the site still works.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button type="button" onClick={retry} className={buttonClasses('primary')}>
            Try again
          </button>
          <Link href="/" className={buttonClasses('secondary')}>
            Home
          </Link>
        </div>
      </div>
    </Container>
  );
}

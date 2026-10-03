'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { track } from '@/lib/analytics/client';
import { isAnalyticsEvent, parseTrackingProps } from '@/lib/analytics/events';

const CASE_STUDY_PATH = /^\/work\/([a-z0-9-]+)\/?$/;

/**
 * One delegated listener reports clicks on any element carrying data-track,
 * so server components can be instrumented without becoming client code.
 * Also reports a view event on every route change.
 */
export function AnalyticsListener() {
  const pathname = usePathname();

  useEffect(() => {
    track('portfolio_view', { path: pathname });
    const caseStudy = CASE_STUDY_PATH.exec(pathname);
    if (caseStudy) track('case_study_view', { slug: caseStudy[1] });
  }, [pathname]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest('[data-track]') : null;
      if (!(target instanceof HTMLElement)) return;
      const name = target.dataset.track;
      if (!isAnalyticsEvent(name)) return;
      track(name, parseTrackingProps(target.dataset.trackProps));
    };
    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, []);

  return null;
}

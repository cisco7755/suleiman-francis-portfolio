import type { AnalyticsEvent, AnalyticsProps } from './events';

type PlausibleFn = (event: string, options?: { props?: AnalyticsProps }) => void;

declare global {
  interface Window {
    plausible?: PlausibleFn;
  }
}

/**
 * Sends an event to the configured provider. With no provider configured this
 * is a no-op in production and a console trace in development. Tracking must
 * never throw into the UI.
 */
export function track(event: AnalyticsEvent, props?: AnalyticsProps): void {
  if (typeof window === 'undefined') return;
  try {
    if (typeof window.plausible === 'function') {
      window.plausible(event, props ? { props } : undefined);
    } else if (process.env.NODE_ENV === 'development') {
      console.debug('[analytics]', event, props ?? {});
    }
  } catch {
    // Analytics failures are deliberately swallowed.
  }
}

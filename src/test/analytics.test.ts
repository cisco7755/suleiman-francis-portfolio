import { describe, expect, it } from 'vitest';
import {
  ANALYTICS_EVENTS,
  isAnalyticsEvent,
  parseTrackingProps,
  trackingAttributes,
} from '@/lib/analytics/events';

describe('analytics events', () => {
  it('covers the required event vocabulary', () => {
    expect([...ANALYTICS_EVENTS].sort()).toEqual(
      [
        'case_study_view',
        'contact_click',
        'email_click',
        'github_click',
        'linkedin_click',
        'portfolio_view',
        'project_open',
        'resume_download',
      ].sort(),
    );
  });

  it('rejects unknown events', () => {
    expect(isAnalyticsEvent('project_open')).toBe(true);
    expect(isAnalyticsEvent('arbitrary_event')).toBe(false);
    expect(isAnalyticsEvent(undefined)).toBe(false);
  });

  it('round-trips props through data attributes', () => {
    const attrs = trackingAttributes('project_open', { slug: 'elsrt' });
    expect(attrs['data-track']).toBe('project_open');
    expect(parseTrackingProps(attrs['data-track-props'])).toEqual({ slug: 'elsrt' });
  });

  it('omits the props attribute when there are none', () => {
    expect(trackingAttributes('email_click')).toEqual({ 'data-track': 'email_click' });
  });

  it('ignores malformed or non-string props', () => {
    expect(parseTrackingProps('{not json')).toBeUndefined();
    expect(parseTrackingProps('[1,2]')).toBeUndefined();
    expect(parseTrackingProps('{"a":"b","n":1}')).toEqual({ a: 'b' });
    expect(parseTrackingProps(null)).toBeUndefined();
  });
});

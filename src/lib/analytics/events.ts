/**
 * The complete analytics vocabulary. Events carry only non-personal context
 * (a slug, a link target) — never names, emails or free text.
 */
export const ANALYTICS_EVENTS = [
  'portfolio_view',
  'project_open',
  'case_study_view',
  'resume_download',
  'contact_click',
  'github_click',
  'linkedin_click',
  'email_click',
] as const;

export type AnalyticsEvent = (typeof ANALYTICS_EVENTS)[number];
export type AnalyticsProps = Record<string, string>;

export function isAnalyticsEvent(value: unknown): value is AnalyticsEvent {
  return typeof value === 'string' && (ANALYTICS_EVENTS as readonly string[]).includes(value);
}

/**
 * Declarative tracking for server-rendered links: spread onto an element and
 * the client listener reports the click. Keeps tracking out of server code.
 */
export function trackingAttributes(event: AnalyticsEvent, props?: AnalyticsProps) {
  return {
    'data-track': event,
    ...(props ? { 'data-track-props': JSON.stringify(props) } : {}),
  };
}

export function parseTrackingProps(raw: string | undefined | null): AnalyticsProps | undefined {
  if (!raw) return undefined;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return undefined;
    const entries = Object.entries(parsed).filter(
      (entry): entry is [string, string] => typeof entry[1] === 'string',
    );
    return Object.fromEntries(entries);
  } catch {
    return undefined;
  }
}

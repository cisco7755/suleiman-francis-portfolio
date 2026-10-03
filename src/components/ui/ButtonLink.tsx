import Link from 'next/link';
import type { ReactNode } from 'react';
import type { AnalyticsEvent, AnalyticsProps } from '@/lib/analytics/events';
import { trackingAttributes } from '@/lib/analytics/events';
import { cx } from '@/lib/cx';
import { buttonClasses, type ButtonSize, type ButtonVariant } from './button-styles';

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  /** Downloads the target instead of navigating (résumé PDF). */
  download?: boolean;
  track?: { event: AnalyticsEvent; props?: AnalyticsProps };
}

const isExternal = (href: string) => /^(https?:|mailto:|tel:)/.test(href);

/**
 * A link styled as a button. Internal routes use next/link; external, mailto,
 * tel and download targets use a plain anchor. External http(s) links open in
 * a new tab and say so to screen readers.
 */
export function ButtonLink({
  href,
  children,
  variant = 'primary',
  size = 'md',
  className,
  download,
  track,
}: ButtonLinkProps) {
  const classes = cx(buttonClasses(variant, size), className);
  const tracking = track ? trackingAttributes(track.event, track.props) : {};

  if (isExternal(href) || download) {
    const opensTab = href.startsWith('http');
    return (
      <a
        href={href}
        className={classes}
        download={download || undefined}
        {...(opensTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...tracking}
      >
        {children}
        {opensTab && <span className="sr-only"> (opens in a new tab)</span>}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...tracking}>
      {children}
    </Link>
  );
}

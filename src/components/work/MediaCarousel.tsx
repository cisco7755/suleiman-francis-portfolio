'use client';

import { useEffect, useState, useSyncExternalStore, type ReactNode } from 'react';
import { cx } from '@/lib/cx';

const INTERVAL_MS = 3000;

export interface CarouselSlide {
  id: string;
  /** Short name of what the slide shows, e.g. “Analytics” or “Architecture”. */
  title: string;
  /** Optional chip, e.g. the device size: “Mobile”, “Tablet”, “Desktop”. */
  badge?: string;
  content: ReactNode;
  /** Longer description, shown under the frame in the feature variant. */
  caption?: string;
}

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

function subscribeReducedMotion(onChange: () => void) {
  const media = window.matchMedia(REDUCED_MOTION);
  media.addEventListener('change', onChange);
  return () => media.removeEventListener('change', onChange);
}

const getReducedMotion = () => window.matchMedia(REDUCED_MOTION).matches;
const getServerReducedMotion = () => false;

interface MediaCarouselProps {
  slides: readonly CarouselSlide[];
  label: string;
  /** card: compact, sits inside a clickable project card. feature: larger, with captions. */
  variant?: 'card' | 'feature';
}

/**
 * Slides advance every 3 seconds. A clone of the last slide sits before the
 * first and a clone of the first after the last, so both directions wrap
 * seamlessly. Rotation pauses on hover and keyboard focus, stops for good once
 * the visitor uses the arrows, and never starts under reduced motion.
 */
export function MediaCarousel({ slides, label, variant = 'card' }: MediaCarouselProps) {
  const count = slides.length;
  const looping = count > 1;

  // Track positions: 0 = clone of the last slide, 1..count = real slides, count + 1 = clone of the first.
  const [position, setPosition] = useState(looping ? 1 : 0);
  const [animate, setAnimate] = useState(true);
  const [stopped, setStopped] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    getServerReducedMotion,
  );

  const active = looping ? (position - 1 + count) % count : 0;
  const rotating = looping && !stopped && !hovered && !focused && !reducedMotion;

  useEffect(() => {
    if (!rotating) return;
    const timer = window.setInterval(() => {
      if (document.visibilityState !== 'visible') return;
      setAnimate(true);
      setPosition((current) => Math.min(current + 1, count + 1));
    }, INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [rotating, count]);

  // After sliding onto a clone, jump to the real slide it copies without animating.
  function onTransitionEnd() {
    if (position === count + 1) jump(1);
    else if (position === 0) jump(count);
  }

  function jump(to: number) {
    setAnimate(false);
    setPosition(to);
  }

  // Re-enable the transition after an instant jump.
  useEffect(() => {
    if (animate) return;
    const frame = window.requestAnimationFrame(() => setAnimate(true));
    return () => window.cancelAnimationFrame(frame);
  }, [animate]);

  function step(direction: 1 | -1) {
    setStopped(true);
    if (reducedMotion) {
      // No animation, so no clones to land on: wrap directly.
      setPosition((current) => ((current - 1 + direction + count) % count) + 1);
      return;
    }
    setAnimate(true);
    setPosition((current) => Math.max(0, Math.min(current + direction, count + 1)));
  }

  const rendered = looping ? [slides[count - 1], ...slides, slides[0]] : slides;
  const current = slides[active];
  const frameHeight = variant === 'card' ? 'h-80 sm:h-96' : 'h-96 sm:h-120';

  return (
    <section
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
    >
      <div className="overflow-hidden rounded-md border border-line bg-surface-muted transition-colors group-hover:border-line-strong">
        <div className={cx('overflow-hidden', frameHeight)}>
          <div
            onTransitionEnd={onTransitionEnd}
            className={cx(
              'flex h-full',
              animate &&
                !reducedMotion &&
                'transition-transform duration-700 ease-(--ease-standard)',
            )}
            style={{ transform: `translateX(-${position * 100}%)` }}
          >
            {rendered.map((slide, index) => {
              const isClone = looping && (index === 0 || index === count + 1);
              const visible = index === position;
              return (
                <div
                  key={isClone ? `${slide.id}-clone-${index}` : slide.id}
                  role={isClone ? undefined : 'group'}
                  aria-roledescription={isClone ? undefined : 'slide'}
                  aria-label={
                    isClone ? undefined : `${slide.title}, ${looping ? index : 1} of ${count}`
                  }
                  aria-hidden={isClone || !visible}
                  inert={isClone || !visible}
                  className="flex h-full w-full shrink-0 items-center justify-center p-4 sm:p-6"
                >
                  {slide.content}
                </div>
              );
            })}
          </div>
        </div>

        {/* z-10 keeps the arrows above a project card's stretched link. */}
        <div className="relative z-10 flex items-center justify-between gap-3 border-t border-line bg-surface px-3 py-2 sm:px-4">
          <p
            aria-live={rotating ? 'off' : 'polite'}
            className="flex min-w-0 items-center gap-2 text-small text-fg-secondary"
          >
            {current.badge && (
              <span className="shrink-0 rounded-sm border border-line px-1.5 py-0.5 font-mono text-caption text-fg-muted">
                {current.badge}
              </span>
            )}
            <span className="truncate text-fg">{current.title}</span>
            {looping && (
              <span className="shrink-0 tabular-nums">
                · {active + 1} / {count}
              </span>
            )}
          </p>
          {looping && (
            <div className="flex shrink-0 gap-2">
              <ArrowButton direction="previous" onClick={() => step(-1)} />
              <ArrowButton direction="next" onClick={() => step(1)} />
            </div>
          )}
        </div>
      </div>

      {variant === 'feature' && current.caption && (
        <p className="mt-3 text-caption text-fg-muted">{current.caption}</p>
      )}
    </section>
  );
}

function ArrowButton({
  direction,
  onClick,
}: {
  direction: 'previous' | 'next';
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === 'previous' ? 'Previous slide' : 'Next slide'}
      className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-line-strong text-fg transition-colors hover:border-fg hover:bg-surface-muted"
    >
      <svg
        aria-hidden
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={direction === 'previous' ? 'm15 18-6-6 6-6' : 'm9 18 6-6-6-6'} />
      </svg>
    </button>
  );
}

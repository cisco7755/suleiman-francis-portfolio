'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * Scales its content down (never up) so it fits the parent's box — for
 * previews such as a full diagram inside a fixed-height carousel slide.
 * The content keeps its layout (at contentClassName's width); only the rendered size changes.
 */
export function FitToFrame({
  children,
  contentClassName = 'w-full',
}: {
  children: ReactNode;
  /** Width the content is laid out at before scaling, e.g. a fixed design width. */
  contentClassName?: string;
}) {
  const frame = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const outer = frame.current;
    const inner = content.current;
    if (!outer || !inner) return;
    const fit = () => {
      const next = Math.min(
        1,
        outer.clientWidth / inner.scrollWidth,
        outer.clientHeight / inner.scrollHeight,
      );
      setScale(Number.isFinite(next) && next > 0 ? next : 1);
    };
    const observer = new ResizeObserver(fit);
    observer.observe(outer);
    observer.observe(inner);
    return () => observer.disconnect();
  }, []);

  // The content is absolutely positioned, so its unscaled size never widens the page.
  return (
    <div ref={frame} className="relative h-full w-full min-w-0 overflow-hidden">
      <div
        ref={content}
        className={`absolute top-1/2 left-1/2 ${contentClassName}`}
        style={{ transform: `translate(-50%, -50%) scale(${scale})` }}
      >
        {children}
      </div>
    </div>
  );
}

import type { Architecture } from '@/content/types';
import { cx } from '@/lib/cx';

interface ArchitectureDiagramProps {
  architecture: Architecture;
  /** Compact: smaller type, at most three nodes per layer. Used on cards. */
  compact?: boolean;
  /** No frame of its own — for use inside another frame, such as a carousel slide. */
  bare?: boolean;
  className?: string;
}

const COMPACT_NODE_LIMIT = 3;

/**
 * Layered system diagram rendered as an ordered list, so it reflows on small
 * screens and reads in order for screen readers. Top-to-bottom follows the
 * direction of a request.
 */
export function ArchitectureDiagram({
  architecture,
  compact = false,
  bare = false,
  className,
}: ArchitectureDiagramProps) {
  return (
    <figure
      className={cx(
        !bare && 'rounded-md border border-line bg-surface',
        !bare && (compact ? 'p-4' : 'p-4 sm:p-6'),
        className,
      )}
    >
      <ol aria-label={`${architecture.title}, layers from top to bottom`}>
        {architecture.layers.map((layer, index) => {
          const nodes = compact ? layer.nodes.slice(0, COMPACT_NODE_LIMIT) : layer.nodes;
          const hidden = layer.nodes.length - nodes.length;
          const isLast = index === architecture.layers.length - 1;
          return (
            <li
              key={layer.label}
              className={cx(
                'grid gap-2',
                !compact && 'sm:grid-cols-[7.5rem_1fr] sm:gap-4',
                bare && 'grid-cols-[6rem_1fr] gap-3',
              )}
            >
              <span className={cx('meta', !compact && 'sm:pt-2.5', bare && 'pt-1.5')}>
                {layer.label}
              </span>
              <div>
                <ul className="flex flex-wrap gap-1.5">
                  {nodes.map((node) => (
                    <li
                      key={node}
                      className={cx(
                        'rounded-sm border border-line-strong bg-bg text-fg',
                        compact ? 'px-2 py-1 text-caption' : 'px-3 py-2 text-small',
                      )}
                    >
                      {node}
                    </li>
                  ))}
                  {hidden > 0 && (
                    <li className="px-1 py-1 text-caption text-fg-muted">+{hidden} more</li>
                  )}
                </ul>
                {!isLast && (
                  <span
                    aria-hidden
                    className={cx('ml-4 block w-px bg-line-strong', compact ? 'h-3' : 'h-5')}
                  />
                )}
              </div>
            </li>
          );
        })}
      </ol>
      {!compact && (
        <figcaption className="mt-5 border-t border-line pt-3 text-caption text-fg-muted">
          {architecture.caption}
        </figcaption>
      )}
    </figure>
  );
}

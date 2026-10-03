import type { Flow } from '@/content/types';
import { cx } from '@/lib/cx';

interface FlowDiagramProps {
  flow: Flow;
  /** vertical: always stacked. horizontal: stacked on small screens, a row of columns on wide ones. */
  layout?: 'vertical' | 'horizontal';
  className?: string;
}

/** A numbered sequence of steps. Order is carried by an <ol>, not by arrows alone. */
export function FlowDiagram({ flow, layout = 'vertical', className }: FlowDiagramProps) {
  const horizontal = layout === 'horizontal';
  return (
    <figure className={className}>
      <ol
        aria-label={flow.title}
        className={cx(
          horizontal
            ? 'grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8'
            : 'relative',
        )}
      >
        {flow.steps.map((step, index) => (
          <li
            key={step.label}
            className={cx(
              horizontal
                ? 'flex flex-col gap-1.5 bg-surface p-4'
                : 'relative grid grid-cols-[2rem_1fr] gap-3 pb-5 last:pb-0',
            )}
          >
            {!horizontal && index < flow.steps.length - 1 && (
              <span
                aria-hidden
                className="absolute top-8 bottom-1 left-[0.9375rem] w-px bg-line-strong"
              />
            )}
            <span
              className={cx(
                'font-mono text-caption tabular-nums',
                horizontal
                  ? 'text-accent'
                  : 'relative flex h-8 w-8 items-center justify-center rounded-sm border border-line-strong bg-surface text-fg-secondary',
              )}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="flex flex-col gap-0.5">
              <span
                className={cx('font-medium text-fg', horizontal ? 'text-small' : 'pt-1 text-body')}
              >
                {step.label}
              </span>
              {step.detail && <span className="text-caption text-fg-muted">{step.detail}</span>}
            </span>
          </li>
        ))}
      </ol>
      {flow.caption && (
        <figcaption className="mt-4 text-caption text-fg-muted">{flow.caption}</figcaption>
      )}
    </figure>
  );
}

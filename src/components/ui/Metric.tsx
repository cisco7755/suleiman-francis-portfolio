import type { EvidenceBasis, Metric as MetricData } from '@/content/types';
import { cx } from '@/lib/cx';

const basisLabel: Record<EvidenceBasis, string> = {
  measured: 'Measured',
  estimate: 'Estimate',
  superseded: 'Superseded',
  unavailable: 'Not measured',
};

const basisTone: Record<EvidenceBasis, string> = {
  measured: 'text-positive',
  estimate: 'text-caution',
  superseded: 'text-critical',
  unavailable: 'text-fg-muted',
};

/**
 * A number with its provenance. The basis label is always visible, so a
 * reader never has to guess whether a figure was measured or estimated.
 */
export function Metric({ metric }: { metric: MetricData }) {
  return (
    <div className="flex flex-col gap-2 border-t border-line pt-4">
      <dt className="text-small text-fg-secondary">{metric.label}</dt>
      <dd className="order-first flex items-baseline gap-3">
        <span
          className={cx(
            'text-h2 font-medium tabular-nums',
            metric.value === null || metric.basis === 'superseded' ? 'text-fg-muted' : 'text-fg',
            metric.basis === 'superseded' && 'line-through decoration-1',
          )}
        >
          {metric.value ?? '—'}
        </span>
        <span className={cx('meta', basisTone[metric.basis])}>{basisLabel[metric.basis]}</span>
      </dd>
      <dd className="text-caption text-fg-muted">{metric.note}</dd>
    </div>
  );
}

export function MetricGrid({ metrics }: { metrics: readonly MetricData[] }) {
  return (
    <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
      {metrics.map((metric) => (
        <Metric key={metric.label} metric={metric} />
      ))}
    </dl>
  );
}

import type { Decision } from '@/content/types';

/**
 * A lightweight architecture decision record:
 * problem → options → trade-offs → decision → reason → result.
 */
export function DecisionRecord({ decision, index }: { decision: Decision; index: number }) {
  const rows = [
    { label: 'Problem', content: decision.problem },
    {
      label: 'Options',
      content: (
        <ol className="list-[lower-alpha] space-y-1 pl-5 marker:text-fg-muted">
          {decision.options.map((option) => (
            <li key={option}>{option}</li>
          ))}
        </ol>
      ),
    },
    { label: 'Trade-offs', content: decision.tradeoffs },
    {
      label: 'Decision',
      content: <strong className="font-medium text-fg">{decision.decision}</strong>,
    },
    { label: 'Reason', content: decision.reason },
    { label: 'Result', content: decision.result },
  ];

  return (
    <article className="rounded-md border border-line bg-surface">
      <h3 className="flex gap-3 border-b border-line px-4 py-4 text-h3 font-medium text-fg sm:px-6">
        <span className="font-mono text-caption leading-[1.9] text-accent tabular-nums">
          {String(index + 1).padStart(2, '0')}
        </span>
        {decision.title}
      </h3>
      <dl className="divide-y divide-line">
        {rows.map((row) => (
          <div
            key={row.label}
            className="grid gap-1 px-4 py-3 sm:grid-cols-[8rem_1fr] sm:gap-6 sm:px-6"
          >
            <dt className="meta pt-1">{row.label}</dt>
            <dd className="text-small text-pretty text-fg-secondary">{row.content}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}

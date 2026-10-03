import { signals } from '@/content/capabilities';
import { Container } from '@/components/ui/Container';

export function CredibilityStrip() {
  return (
    <section aria-label="Professional signals">
      <Container>
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-line bg-line md:grid-cols-3 xl:grid-cols-6">
          {signals.map((signal) => (
            <div key={signal.label} className="flex flex-col gap-1 bg-bg p-4 sm:p-5">
              <dt className="meta">{signal.label}</dt>
              <dd className="text-body font-medium text-fg">{signal.value}</dd>
              <dd className="text-caption text-fg-muted">{signal.detail}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}

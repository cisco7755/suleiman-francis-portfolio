import { productionPipeline } from '@/content/capabilities';
import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';

export function ProductionPipeline() {
  return (
    <section aria-labelledby="pipeline-title" className="py-16 lg:py-24">
      <Container>
        <SectionHeader
          id="pipeline-title"
          eyebrow="Production engineering"
          title="From code to production"
          lede="Only tools I’ve used on shipped work are listed."
        />
        <ol className="mt-10 grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {productionPipeline.map((step, index) => (
            <li key={step.label} className="flex flex-col gap-2 bg-bg p-5">
              <span className="font-mono text-caption text-accent tabular-nums">
                {String(index + 1).padStart(2, '0')}
                <span aria-hidden className="text-fg-muted">
                  {index < productionPipeline.length - 1 ? ' →' : ' ↺'}
                </span>
              </span>
              <h3 className="text-h3 font-medium text-fg">{step.label}</h3>
              <p className="text-small text-fg-secondary">{step.description}</p>
              {step.tools && (
                <p className="mt-auto pt-2 font-mono text-caption text-fg-muted">
                  {step.tools.join(' · ')}
                </p>
              )}
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

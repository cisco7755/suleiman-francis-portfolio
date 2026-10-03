import { approach } from '@/content/capabilities';
import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';

export function Approach() {
  return (
    <section aria-labelledby="approach-title" className="py-16 lg:py-24">
      <Container>
        <SectionHeader
          id="approach-title"
          eyebrow="Approach"
          title="From requirement to evidence"
          lede="The same loop on every project, whether it’s a form field or an ML feature."
        />
        <ol className="mt-10 border-b border-line">
          {approach.map((step, index) => (
            <li
              key={step.label}
              className="grid grid-cols-[2.5rem_1fr] gap-x-4 gap-y-1 border-t border-line py-5 sm:grid-cols-[3rem_10rem_1fr] sm:items-baseline"
            >
              <span className="font-mono text-caption text-accent tabular-nums">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="text-h3 font-medium text-fg">{step.label}</h3>
              <p className="col-start-2 max-w-prose text-body text-fg-secondary sm:col-start-3">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

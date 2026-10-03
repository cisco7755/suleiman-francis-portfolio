import Link from 'next/link';
import { capabilities } from '@/content/capabilities';
import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';

/**
 * Capabilities grouped by discipline, each with the shipped work that backs
 * it up — evidence first, technology list second.
 */
export function Capabilities({ headingLevel: Heading = 'h3' }: { headingLevel?: 'h2' | 'h3' }) {
  return (
    <div className="grid gap-px overflow-hidden rounded-md border border-line bg-line md:grid-cols-2 xl:grid-cols-5">
      {capabilities.map((capability) => (
        <section
          key={capability.id}
          aria-labelledby={`cap-${capability.id}`}
          className="row-span-3 grid grid-rows-subgrid gap-4 bg-bg p-5 sm:p-6"
        >
          <Heading id={`cap-${capability.id}`} className="text-h3 font-medium text-fg">
            {capability.id === 'practice' ? (
              capability.label
            ) : (
              <Link href={`/engineering/${capability.id}`} className="hover:text-accent">
                {capability.label} <span aria-hidden>→</span>
              </Link>
            )}
          </Heading>
          <p className="text-small text-fg-secondary">{capability.evidence}</p>
          <ul className="flex flex-col gap-1.5 border-t border-line pt-4 text-small text-fg">
            {capability.skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

export function CapabilitiesSection() {
  return (
    <section aria-labelledby="capabilities-title" className="py-16 lg:py-24">
      <Container>
        <SectionHeader
          id="capabilities-title"
          eyebrow="Capabilities"
          title="Engineering capabilities"
          lede="Grouped by discipline, with where each one was used in shipped work."
        />
        <div className="mt-10">
          <Capabilities />
        </div>
      </Container>
    </section>
  );
}

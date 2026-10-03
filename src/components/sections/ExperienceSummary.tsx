import { experience } from '@/content/experience';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Timeline } from '@/components/work/Timeline';

export function ExperienceSummary() {
  return (
    <section aria-labelledby="experience-title" className="py-16 lg:py-24">
      <Container>
        <SectionHeader
          id="experience-title"
          eyebrow="Experience"
          title="Where I’ve shipped"
          action={
            <ButtonLink href="/experience" variant="quiet">
              Full experience →
            </ButtonLink>
          }
        />
        <div className="mt-6">
          <Timeline roles={experience} compact />
        </div>
      </Container>
    </section>
  );
}

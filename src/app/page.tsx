import { getProject } from '@/lib/content';
import { Approach } from '@/components/sections/Approach';
import { CapabilitiesSection } from '@/components/sections/Capabilities';
import { ClassifierSpotlight } from '@/components/sections/ClassifierSpotlight';
import { ContactCta } from '@/components/sections/ContactCta';
import { CredibilityStrip } from '@/components/sections/CredibilityStrip';
import { EssayList } from '@/components/sections/EssayList';
import { ExperienceSummary } from '@/components/sections/ExperienceSummary';
import { Hero } from '@/components/sections/Hero';
import { ProductionPipeline } from '@/components/sections/ProductionPipeline';
import { SelectedWork } from '@/components/sections/SelectedWork';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';

export default function HomePage() {
  const whistler = getProject('whistler-mobile');
  const spotlight = whistler?.caseStudy.spotlight;

  return (
    <>
      <Hero />
      <CredibilityStrip />
      <SelectedWork />
      {whistler && spotlight && (
        <ClassifierSpotlight
          spotlight={spotlight}
          caseStudyHref={`/work/${whistler.slug}#${spotlight.id}`}
        />
      )}
      <CapabilitiesSection />
      <Approach />
      <ProductionPipeline />
      <section aria-labelledby="writing-title" className="py-16 lg:py-24">
        <Container>
          <SectionHeader
            id="writing-title"
            eyebrow="Engineering"
            title="How I think about engineering"
            action={
              <ButtonLink href="/engineering" variant="quiet">
                All engineering notes →
              </ButtonLink>
            }
          />
          <EssayList className="mt-6" />
        </Container>
      </section>
      <ExperienceSummary />
      <ContactCta />
    </>
  );
}

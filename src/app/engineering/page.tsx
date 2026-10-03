import { pageMetadata } from '@/lib/metadata';
import { PageIntro } from '@/components/layout/PageIntro';
import { Approach } from '@/components/sections/Approach';
import { CapabilitiesSection } from '@/components/sections/Capabilities';
import { EssayList } from '@/components/sections/EssayList';
import { ProductionPipeline } from '@/components/sections/ProductionPipeline';
import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';

export const metadata = pageMetadata({
  title: 'Engineering',
  description:
    'How Suleiman Francis approaches frontend architecture, realtime backends, cross-platform mobile releases and practical AI — with the shipped work behind each.',
  path: '/engineering',
});

export default function EngineeringPage() {
  return (
    <>
      <Container>
        <PageIntro
          eyebrow="Engineering"
          title="How I think about engineering"
          lede="Four write-ups, one per discipline, each grounded in software I’ve shipped — including a case where my own metric didn’t hold up."
        />
      </Container>
      <section aria-labelledby="writeups-title" className="pb-8">
        <Container>
          <SectionHeader
            id="writeups-title"
            eyebrow="Disciplines"
            title="Write-ups by discipline"
          />
          <EssayList className="mt-6" />
        </Container>
      </section>
      <CapabilitiesSection />
      <Approach />
      <ProductionPipeline />
    </>
  );
}

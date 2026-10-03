import type { Metadata } from 'next';
import { PageIntro } from '@/components/layout/PageIntro';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Container } from '@/components/ui/Container';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <Container>
      <PageIntro
        eyebrow="404"
        title="Looks like this route doesn’t exist."
        lede="The page may have moved, or the link may have a typo. The case studies are a good place to start."
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/work">Back to work</ButtonLink>
          <ButtonLink href="/" variant="secondary">
            Home
          </ButtonLink>
        </div>
      </PageIntro>
    </Container>
  );
}

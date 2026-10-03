import { profile } from '@/content/profile';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Container } from '@/components/ui/Container';

export function ContactCta() {
  return (
    <section aria-labelledby="cta-title" className="py-16 lg:py-24">
      <Container>
        <div className="grid gap-8 border-t border-line pt-10 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <h2 id="cta-title" className="text-h1 font-medium text-balance text-fg">
              Let’s build something useful.
            </h2>
            <p className="mt-5 max-w-prose text-lede text-fg-secondary">
              Interested in working together, discussing an engineering problem, or exploring an
              opportunity?
            </p>
          </div>
          <div className="flex flex-col items-start gap-3 lg:col-span-5 lg:items-end lg:justify-end">
            <ButtonLink
              href={`mailto:${profile.email}`}
              track={{ event: 'email_click', props: { from: 'cta' } }}
            >
              Send an email
            </ButtonLink>
            <p className="text-small text-fg-secondary">{profile.email}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}

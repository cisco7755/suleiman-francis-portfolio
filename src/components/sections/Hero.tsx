import { experience } from '@/content/experience';
import { profile } from '@/content/profile';
import { featuredProjects, moreProjects } from '@/content/projects';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { KeepHyphenated } from '@/components/ui/KeepHyphenated';
import { Container } from '@/components/ui/Container';

export function Hero() {
  const current = experience.filter((role) => role.period.endsWith('Present'));
  const previous = experience.filter((role) => !role.period.endsWith('Present'));
  const glance = [
    { label: 'Now', value: current.map((role) => role.organisation).join(' · ') },
    { label: 'Before', value: previous.map((role) => role.organisation).join(' · ') },
    {
      label: 'Shipped',
      value: `${featuredProjects.map((project) => project.name).join(' · ')} + ${moreProjects.length} more`,
    },
    { label: 'Based in', value: `${profile.location} · ${profile.timezone}` },
  ];

  return (
    <section aria-labelledby="hero-title" className="pt-14 pb-16 sm:pt-20 lg:pt-24 lg:pb-20">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-8">
          <p className="meta mb-6">
            {profile.title} · {profile.specializations.join(' · ')}
          </p>
          <h1
            id="hero-title"
            className="max-w-[18ch] text-display font-medium text-balance text-fg"
          >
            <KeepHyphenated text={profile.headline} />
          </h1>
          <p className="mt-6 max-w-prose text-lede text-pretty text-fg-secondary">
            {profile.summary}
          </p>

          <p className="mt-6 flex items-center gap-2 text-small text-fg-secondary">
            <span aria-hidden className="inline-block h-2 w-2 rounded-full bg-positive" />
            {profile.location} · {profile.availability}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ButtonLink href="/#work">View selected work</ButtonLink>
            <ButtonLink
              href="/contact"
              variant="secondary"
              track={{ event: 'contact_click', props: { from: 'hero' } }}
            >
              Let’s talk
            </ButtonLink>
            <ButtonLink
              href={profile.resume.href}
              variant="quiet"
              download
              track={{ event: 'resume_download', props: { from: 'hero' } }}
            >
              Download résumé
            </ButtonLink>
          </div>
        </div>

        <aside
          aria-label="At a glance"
          className="lg:col-span-4 lg:border-l lg:border-line lg:pl-8"
        >
          <dl className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            {glance.map((item) => (
              <div key={item.label}>
                <dt className="meta mb-1">{item.label}</dt>
                <dd className="text-small text-fg">{item.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </Container>
    </section>
  );
}

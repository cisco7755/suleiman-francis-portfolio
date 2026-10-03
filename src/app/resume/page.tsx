import { capabilities } from '@/content/capabilities';
import { experience } from '@/content/experience';
import { profile } from '@/content/profile';
import { trackingAttributes } from '@/lib/analytics/events';
import { pageMetadata } from '@/lib/metadata';
import { PageIntro } from '@/components/layout/PageIntro';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Container } from '@/components/ui/Container';
import { Timeline } from '@/components/work/Timeline';

export const metadata = pageMetadata({
  title: 'Résumé',
  description:
    'Résumé of Suleiman Francis, Software Engineer (frontend, backend, mobile, AI): experience, skills and education, readable in the browser or as a PDF download.',
  path: '/resume',
});

export default function ResumePage() {
  const contact = [
    {
      label: 'Email',
      value: profile.email,
      href: `mailto:${profile.email}`,
      track: trackingAttributes('email_click', { from: 'resume' }),
    },
    { label: 'Phone', value: profile.phone.display, href: profile.phone.href },
    {
      label: 'LinkedIn',
      value: 'francis-suleiman',
      href: profile.links.linkedin,
      external: true,
      track: trackingAttributes('linkedin_click', { from: 'resume' }),
    },
    {
      label: 'GitHub',
      value: 'cisco7755',
      href: profile.links.github,
      external: true,
      track: trackingAttributes('github_click', { from: 'resume' }),
    },
  ];

  return (
    <Container>
      <div className="print:hidden">
        <PageIntro
          eyebrow="Résumé"
          title="Résumé"
          lede="The full résumé is below — no download needed. The PDF has the same content for applicant tracking systems and printing."
        >
          <div className="flex flex-wrap items-center gap-3">
            <ButtonLink
              href={profile.resume.href}
              download
              track={{ event: 'resume_download', props: { from: 'resume' } }}
            >
              Download résumé
            </ButtonLink>
            <ButtonLink href="/experience" variant="secondary">
              View experience
            </ButtonLink>
            <span className="text-caption text-fg-muted">{profile.resume.format}</span>
          </div>
        </PageIntro>
      </div>

      <div className="rounded-md border border-line bg-surface px-4 py-8 sm:px-8 lg:px-12 lg:py-12 print:border-0 print:bg-transparent print:p-0">
        <header className="grid gap-6 border-b border-line pb-8 lg:grid-cols-12 print:grid-cols-12 print:pb-5">
          <div className="lg:col-span-6 print:col-span-6">
            <h2 className="text-h2 font-medium text-fg">{profile.name}</h2>
            <p className="text-body text-fg-secondary">
              {profile.title} · {profile.specializations.join(' · ')}
            </p>
            <p className="text-small text-fg-muted">{profile.location}</p>
          </div>
          <dl className="grid gap-x-6 gap-y-2 text-small sm:grid-cols-2 lg:col-span-6 print:col-span-6">
            {contact.map((item) => (
              <div key={item.label}>
                <dt className="meta">{item.label}</dt>
                <dd>
                  <a
                    href={item.href}
                    className="link break-all"
                    {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    {...item.track}
                  >
                    {item.value}
                    {item.external && <span className="sr-only"> (opens in a new tab)</span>}
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        </header>

        <section aria-labelledby="resume-summary" className="border-b border-line py-8">
          <h3 id="resume-summary" className="meta mb-3">
            Summary
          </h3>
          <p className="max-w-prose text-body text-fg-secondary">{profile.resumeSummary}</p>
        </section>

        <section aria-labelledby="resume-experience" className="py-8">
          <h3 id="resume-experience" className="meta mb-3">
            Experience
          </h3>
          <Timeline roles={experience} />
        </section>

        <section aria-labelledby="resume-skills" className="border-b border-line pb-8">
          <h3 id="resume-skills" className="meta mb-4">
            Skills
          </h3>
          <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {capabilities.map((capability) => (
              <div key={capability.id}>
                <dt className="text-small font-medium text-fg">{capability.label}</dt>
                <dd className="text-small text-fg-secondary">{capability.skills.join(', ')}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="resume-education" className="pt-8">
          <h3 id="resume-education" className="meta mb-3">
            Education
          </h3>
          {profile.education.map((entry) => (
            <p key={entry.institution} className="text-body text-fg">
              {entry.qualification} — {entry.institution}, {entry.year}
            </p>
          ))}
        </section>
      </div>
    </Container>
  );
}

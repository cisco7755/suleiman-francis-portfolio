import { profile } from '@/content/profile';
import { trackingAttributes } from '@/lib/analytics/events';
import { pageMetadata } from '@/lib/metadata';
import { PageIntro } from '@/components/layout/PageIntro';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Container } from '@/components/ui/Container';
import { CopyEmailButton } from '@/components/ui/CopyEmailButton';

export const metadata = pageMetadata({
  title: 'Contact',
  description:
    'Contact Suleiman Francis about software engineering roles, projects or an engineering problem — by email, LinkedIn or GitHub.',
  path: '/contact',
});

export default function ContactPage() {
  const channels = [
    {
      label: 'LinkedIn',
      value: 'linkedin.com/in/francis-suleiman-259a77221',
      href: profile.links.linkedin,
      event: 'linkedin_click' as const,
    },
    {
      label: 'GitHub',
      value: 'github.com/cisco7755',
      href: profile.links.github,
      event: 'github_click' as const,
    },
  ];

  return (
    <Container>
      <PageIntro
        eyebrow="Contact"
        title="Let’s build something useful."
        lede="Interested in working together, discussing an engineering problem, or exploring an opportunity?"
      />

      <div className="grid gap-12 border-t border-line pt-10 lg:grid-cols-12 lg:gap-10">
        <section aria-labelledby="email-title" className="lg:col-span-6">
          <h2 id="email-title" className="meta mb-3">
            Email — the fastest way to reach me
          </h2>
          <p className="mb-6 text-h3 font-medium break-all text-fg">{profile.email}</p>
          <div className="flex flex-wrap items-start gap-3">
            <ButtonLink
              href={`mailto:${profile.email}`}
              track={{ event: 'email_click', props: { from: 'contact' } }}
            >
              Send an email
            </ButtonLink>
            <CopyEmailButton email={profile.email} />
          </div>
        </section>

        <section aria-labelledby="elsewhere-title" className="lg:col-span-6">
          <h2 id="elsewhere-title" className="meta mb-3">
            Elsewhere
          </h2>
          <dl className="divide-y divide-line border-y border-line">
            {channels.map((channel) => (
              <div key={channel.label} className="grid gap-1 py-4 sm:grid-cols-[7rem_1fr]">
                <dt className="text-small text-fg-muted">{channel.label}</dt>
                <dd>
                  <a
                    href={channel.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link text-small break-all"
                    {...trackingAttributes(channel.event, { from: 'contact' })}
                  >
                    {channel.value}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </dd>
              </div>
            ))}
            <div className="grid gap-1 py-4 sm:grid-cols-[7rem_1fr]">
              <dt className="text-small text-fg-muted">Résumé</dt>
              <dd>
                <a
                  href={profile.resume.href}
                  download
                  className="link text-small"
                  {...trackingAttributes('resume_download', { from: 'contact' })}
                >
                  Download PDF
                </a>
              </dd>
            </div>
            <div className="grid gap-1 py-4 sm:grid-cols-[7rem_1fr]">
              <dt className="text-small text-fg-muted">Location</dt>
              <dd className="text-small text-fg">
                {profile.location} · {profile.timezone}
              </dd>
            </div>
          </dl>
        </section>
      </div>
    </Container>
  );
}

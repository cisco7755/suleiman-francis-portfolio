import { experience } from '@/content/experience';
import { profile } from '@/content/profile';
import { pageMetadata } from '@/lib/metadata';
import { PageIntro } from '@/components/layout/PageIntro';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Container } from '@/components/ui/Container';
import { Timeline } from '@/components/work/Timeline';

export const metadata = pageMetadata({
  title: 'Experience',
  description:
    'Suleiman Francis’s experience: lead mobile engineer at Whistler, frontend/full-stack engineer at SeamHealth Group, and software developer at Nigeria Civil Defence Corps HQ.',
  path: '/experience',
});

export default function ExperiencePage() {
  return (
    <Container>
      <PageIntro
        eyebrow="Experience"
        title="Experience"
        lede={`${profile.yearsExperience} years building production software for community platforms, healthcare and SaaS products, and internal government systems. Figures marked “estimated” are team estimates, not instrumented measurements.`}
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink
            href={profile.resume.href}
            download
            track={{ event: 'resume_download', props: { from: 'experience' } }}
          >
            Download résumé
          </ButtonLink>
          <ButtonLink href="/work" variant="secondary">
            View case studies
          </ButtonLink>
        </div>
      </PageIntro>

      <Timeline roles={experience} headingLevel="h2" />

      <section
        aria-labelledby="education-title"
        className="mt-16 grid gap-4 lg:grid-cols-12 lg:gap-8"
      >
        <h2 id="education-title" className="meta lg:col-span-3 lg:pt-1">
          Education
        </h2>
        <ul className="lg:col-span-9">
          {profile.education.map((entry) => (
            <li key={entry.institution}>
              <p className="text-h3 font-medium text-fg">{entry.qualification}</p>
              <p className="text-body text-fg-secondary">
                {entry.institution} · {entry.year}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </Container>
  );
}

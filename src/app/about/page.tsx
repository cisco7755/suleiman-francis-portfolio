import Link from 'next/link';
import { capabilities } from '@/content/capabilities';
import { disciplines } from '@/content/engineering';
import { experience } from '@/content/experience';
import { profile } from '@/content/profile';
import { pageMetadata } from '@/lib/metadata';
import { PageIntro } from '@/components/layout/PageIntro';
import { Container } from '@/components/ui/Container';
import { BulletList, Prose } from '@/components/ui/Prose';

export const metadata = pageMetadata({
  title: 'About',
  description:
    'About Suleiman Francis, a software engineer in Abuja, Nigeria, building production web, mobile and AI-powered products — background, disciplines, technologies and working principles.',
  path: '/about',
  type: 'profile',
});

const SKILLS_PER_DISCIPLINE = 5;

function AboutSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      aria-labelledby={id}
      className="grid gap-4 border-t border-line py-10 lg:grid-cols-12 lg:gap-8"
    >
      <h2 id={id} className="text-h3 font-medium text-fg lg:col-span-3">
        {title}
      </h2>
      <div className="lg:col-span-9">{children}</div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <Container>
      <PageIntro eyebrow="About" title={profile.name} lede={profile.positioning} />

      <div className="grid gap-4 pb-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-9 lg:col-start-4">
          <Prose paragraphs={profile.bio} className="text-lede" />
        </div>
      </div>

      <AboutSection id="about-experience" title="Experience">
        <ul className="space-y-3">
          {experience.map((role) => (
            <li key={role.organisation} className="grid gap-1 sm:grid-cols-[9rem_1fr] sm:gap-6">
              <span className="font-mono text-small text-fg-muted tabular-nums">{role.period}</span>
              <span className="text-body text-fg">
                {role.role}, {role.organisation}
              </span>
            </li>
          ))}
        </ul>
        <Link href="/experience" className="link mt-5 inline-block text-small">
          Full experience
        </Link>
      </AboutSection>

      <AboutSection id="about-disciplines" title="Core disciplines">
        <dl className="grid gap-6 sm:grid-cols-2">
          {disciplines.map((discipline) => (
            <div key={discipline.id}>
              <dt className="font-medium text-fg">
                <Link href={`/engineering/${discipline.id}`} className="hover:text-accent">
                  {discipline.label} →
                </Link>
              </dt>
              <dd className="mt-1 text-small text-fg-secondary">{discipline.essay.title}</dd>
            </div>
          ))}
        </dl>
      </AboutSection>

      <AboutSection id="about-technologies" title="Selected technologies">
        <dl className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {capabilities.map((capability) => (
            <div key={capability.id}>
              <dt className="meta mb-2">{capability.label}</dt>
              <dd className="text-small text-fg">
                {capability.skills.slice(0, SKILLS_PER_DISCIPLINE).join(', ')}
              </dd>
            </div>
          ))}
        </dl>
      </AboutSection>

      <AboutSection id="about-interests" title="Current interests">
        <BulletList items={profile.interests} />
      </AboutSection>

      <AboutSection id="about-principles" title="Professional principles">
        <dl className="max-w-prose space-y-6">
          {profile.principles.map((principle) => (
            <div key={principle.title}>
              <dt className="font-medium text-fg">{principle.title}</dt>
              <dd className="mt-1 text-body text-fg-secondary">{principle.body}</dd>
            </div>
          ))}
        </dl>
      </AboutSection>
    </Container>
  );
}

import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { capabilities } from '@/content/capabilities';
import { disciplines } from '@/content/engineering';
import { getDiscipline, getProjectsForDiscipline } from '@/lib/content';
import { pageMetadata } from '@/lib/metadata';
import { PageIntro } from '@/components/layout/PageIntro';
import { Container } from '@/components/ui/Container';
import { BulletList, Prose } from '@/components/ui/Prose';

export const dynamicParams = false;

export function generateStaticParams() {
  return disciplines.map((discipline) => ({ discipline: discipline.id }));
}

export async function generateMetadata({
  params,
}: PageProps<'/engineering/[discipline]'>): Promise<Metadata> {
  const { discipline: id } = await params;
  const discipline = getDiscipline(id);
  if (!discipline) return {};
  return pageMetadata({
    title: `${discipline.title} · ${discipline.label}`,
    description: discipline.description,
    path: `/engineering/${discipline.id}`,
    type: 'article',
  });
}

export default async function DisciplinePage({ params }: PageProps<'/engineering/[discipline]'>) {
  const { discipline: id } = await params;
  const discipline = getDiscipline(id);
  if (!discipline) notFound();

  const capability = capabilities.find((entry) => entry.id === discipline.id);
  const evidence = getProjectsForDiscipline(discipline.id);
  const others = disciplines.filter((entry) => entry.id !== discipline.id);

  return (
    <Container>
      <PageIntro
        eyebrow={`Engineering · ${discipline.label}`}
        title={discipline.essay.title}
        lede={discipline.essay.summary}
      />

      <div className="grid gap-12 border-t border-line pt-10 lg:grid-cols-12 lg:gap-10">
        <article className="space-y-12 lg:col-span-8">
          {discipline.essay.sections.map((section) => (
            <section key={section.heading} aria-labelledby={slugify(section.heading)}>
              <h2 id={slugify(section.heading)} className="mb-4 text-h2 font-medium text-fg">
                {section.heading}
              </h2>
              <Prose paragraphs={section.paragraphs} />
              {section.points && <BulletList items={section.points} className="mt-5" />}
            </section>
          ))}
        </article>

        <aside className="space-y-10 lg:col-span-4">
          <section
            aria-labelledby="evidence-title"
            className="rounded-md border border-line bg-surface p-5"
          >
            <h2 id="evidence-title" className="meta mb-4">
              Evidence
            </h2>
            <ul className="space-y-4">
              {evidence.map((project) => (
                <li key={project.slug}>
                  <Link
                    href={`/work/${project.slug}`}
                    className="font-medium text-fg hover:text-accent"
                  >
                    {project.name} →
                  </Link>
                  <p className="text-caption text-fg-muted">{project.summary}</p>
                </li>
              ))}
            </ul>
          </section>
          {capability && (
            <section aria-labelledby="skills-title">
              <h2 id="skills-title" className="meta mb-4">
                {capability.label} skills
              </h2>
              <p className="mb-4 text-small text-fg-secondary">{capability.evidence}</p>
              <ul className="flex flex-col gap-1.5 border-t border-line pt-4 text-small text-fg">
                {capability.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </section>
          )}
        </aside>
      </div>

      <nav aria-label="Other disciplines" className="mt-24 border-t border-line pt-8">
        <p className="meta mb-4">Other disciplines</p>
        <ul className="grid gap-4 sm:grid-cols-3">
          {others.map((entry) => (
            <li key={entry.id}>
              <Link href={`/engineering/${entry.id}`} className="group block">
                <span className="meta">{entry.label}</span>
                <span className="mt-1 block text-body font-medium text-fg group-hover:text-accent">
                  {entry.essay.title} →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </Container>
  );
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

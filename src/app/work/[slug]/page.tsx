import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { projects } from '@/content/projects';
import { getNextProject, getProject } from '@/lib/content';
import { pageMetadata } from '@/lib/metadata';
import { caseStudySchema } from '@/lib/structured-data';
import { Container } from '@/components/ui/Container';
import { JsonLd } from '@/components/ui/JsonLd';
import { CaseStudyBody, caseStudyToc } from '@/components/work/CaseStudyBody';
import { CaseStudyHeader } from '@/components/work/CaseStudyHeader';
import { TableOfContents } from '@/components/work/TableOfContents';

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<'/work/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return pageMetadata({
    title: `${project.name} case study`,
    description: project.metaDescription,
    path: `/work/${project.slug}`,
    type: 'article',
  });
}

export default async function CaseStudyPage({ params }: PageProps<'/work/[slug]'>) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const next = getNextProject(project.slug);

  return (
    <article>
      <Container>
        <CaseStudyHeader project={project} />
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-10">
          <aside className="lg:col-span-3">
            <TableOfContents entries={caseStudyToc(project)} />
          </aside>
          <div className="min-w-0 lg:col-span-9">
            <CaseStudyBody project={project} />
          </div>
        </div>

        <nav aria-label="Next case study" className="mt-24 border-t border-line pt-8">
          <p className="meta mb-2">Next case study</p>
          <Link href={`/work/${next.slug}`} className="group inline-block">
            <span className="text-h2 font-medium text-fg decoration-accent decoration-2 underline-offset-4 group-hover:underline">
              {next.name} →
            </span>
            <span className="mt-2 block max-w-prose text-body text-fg-secondary">
              {next.summary}
            </span>
          </Link>
        </nav>
      </Container>
      <JsonLd data={caseStudySchema(project)} />
    </article>
  );
}

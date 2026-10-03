import Link from 'next/link';
import type { Project } from '@/content/types';
import { trackingAttributes } from '@/lib/analytics/events';
import { TagList } from '@/components/ui/Tag';
import { ArchitectureDiagram } from './ArchitectureDiagram';
import { architectureSlide, screenSlides } from './carousel-slides';
import { MediaCarousel } from './MediaCarousel';

interface ProjectCardProps {
  project: Project;
  index: number;
  headingLevel?: 'h2' | 'h3';
}

/**
 * A full-width editorial row rather than a tile: facts on the left, evidence
 * (a screenshot or the system diagram) on the right. The whole row is
 * clickable through a stretched link on the title.
 */
export function ProjectCard({ project, index, headingLevel: Heading = 'h3' }: ProjectCardProps) {
  const href = `/work/${project.slug}`;
  const facts = [
    { label: 'Role', value: project.role },
    { label: 'Platform', value: project.platform },
    { label: 'Category', value: project.category },
  ];

  return (
    <article className="group relative grid gap-8 border-t border-line py-10 lg:grid-cols-12 lg:gap-10">
      <div className="flex flex-col gap-5 lg:col-span-7">
        <p className="meta flex flex-wrap gap-x-3">
          <span className="text-accent tabular-nums">{String(index + 1).padStart(2, '0')}</span>
          <span>{project.organisation}</span>
          <span>{project.timeline}</span>
        </p>
        <div className="space-y-3">
          <Heading className="text-h2 font-medium text-fg">
            <Link
              href={href}
              className="decoration-accent decoration-2 underline-offset-[0.2em] group-hover:underline after:absolute after:inset-0 after:content-['']"
              {...trackingAttributes('project_open', { slug: project.slug })}
            >
              {project.name}
            </Link>
          </Heading>
          <p className="max-w-prose text-lede text-pretty text-fg-secondary">{project.summary}</p>
        </div>

        <dl className="grid gap-x-6 gap-y-3 text-small sm:grid-cols-3">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt className="meta mb-1">{fact.label}</dt>
              <dd className="text-fg">{fact.value}</dd>
            </div>
          ))}
          <div className="sm:col-span-3">
            <dt className="meta mb-1">Outcome</dt>
            <dd className="max-w-prose text-fg">{project.outcome}</dd>
          </div>
        </dl>

        <TagList items={project.tags} label={`${project.name} technologies`} />

        <p aria-hidden className="text-small font-medium text-accent">
          Read case study →
        </p>
      </div>

      <div className="lg:col-span-5">
        <CardVisual project={project} />
      </div>
    </article>
  );
}

/**
 * Card visual. Projects with screenshots get a carousel that always ends on
 * the architecture diagram; projects without screenshots show the diagram alone.
 */
function CardVisual({ project }: { project: Project }) {
  const screens = project.cover.kind === 'showcase' ? (project.caseStudy.showcase ?? []) : [];
  if (screens.length === 0) {
    return (
      <ArchitectureDiagram
        architecture={project.caseStudy.architecture}
        compact
        className="transition-colors group-hover:border-line-strong"
      />
    );
  }
  return (
    <MediaCarousel
      slides={[...screenSlides(screens), architectureSlide(project.caseStudy.architecture)]}
      label={`${project.name}: screens and architecture`}
    />
  );
}

/** Compact row for secondary projects: no visual, same stretched-link pattern. */
export function ProjectSummaryRow({
  project,
  headingLevel: Heading = 'h3',
}: Omit<ProjectCardProps, 'index'>) {
  return (
    <article className="group relative grid gap-3 border-t border-line py-6 lg:grid-cols-12 lg:gap-10">
      <p className="meta flex flex-wrap gap-x-3 lg:col-span-3 lg:flex-col lg:pt-1.5">
        <span>{project.organisation}</span>
        <span>{project.timeline}</span>
      </p>
      <div className="space-y-3 lg:col-span-9">
        <Heading className="text-h3 font-medium text-fg">
          <Link
            href={`/work/${project.slug}`}
            className="decoration-accent decoration-2 underline-offset-4 group-hover:underline after:absolute after:inset-0 after:content-['']"
            {...trackingAttributes('project_open', { slug: project.slug })}
          >
            {project.name}{' '}
            <span aria-hidden className="text-accent">
              →
            </span>
          </Link>
        </Heading>
        <p className="max-w-prose text-body text-fg-secondary">{project.summary}</p>
        <p className="text-small text-fg-muted">{project.role}</p>
      </div>
    </article>
  );
}

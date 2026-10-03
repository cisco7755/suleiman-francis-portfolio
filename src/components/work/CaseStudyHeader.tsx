import Link from 'next/link';
import type { Project } from '@/content/types';
import { KeepHyphenated } from '@/components/ui/KeepHyphenated';
import { TagList } from '@/components/ui/Tag';

export function CaseStudyHeader({ project }: { project: Project }) {
  const facts = [
    { label: 'Role', value: project.role },
    { label: 'Timeline', value: project.timeline },
    { label: 'Team', value: project.team },
    { label: 'Platform', value: project.platform },
  ];

  return (
    <header className="pt-10 pb-12 sm:pt-14">
      <nav aria-label="Breadcrumb" className="mb-10">
        <Link href="/work" className="text-small text-fg-secondary hover:text-fg">
          ← All work
        </Link>
      </nav>
      <p className="meta mb-4">
        {project.name} · {project.organisation}
      </p>
      <h1 className="max-w-4xl text-h1 font-medium text-balance text-fg">
        <KeepHyphenated text={project.headline} />
      </h1>
      <p className="mt-6 max-w-prose text-lede text-pretty text-fg-secondary">{project.summary}</p>

      <dl className="mt-10 grid gap-x-8 gap-y-5 border-t border-line pt-6 sm:grid-cols-2 lg:grid-cols-4">
        {facts.map((fact) => (
          <div key={fact.label}>
            <dt className="meta mb-1">{fact.label}</dt>
            <dd className="text-small text-fg">{fact.value}</dd>
          </div>
        ))}
        <div className="sm:col-span-2 lg:col-span-4">
          <dt className="meta mb-2">Stack</dt>
          <dd>
            <TagList items={project.stack} label="Stack" />
          </dd>
        </div>
      </dl>

      {project.confidentiality && (
        <p className="mt-8 max-w-prose border-l-2 border-line-strong pl-4 text-small text-fg-secondary">
          {project.confidentiality}
        </p>
      )}
    </header>
  );
}

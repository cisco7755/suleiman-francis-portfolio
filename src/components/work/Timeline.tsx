import Link from 'next/link';
import type { Role } from '@/content/types';
import { getProjectsBySlugs } from '@/lib/content';
import { BulletList } from '@/components/ui/Prose';

interface TimelineProps {
  roles: readonly Role[];
  /** Compact: role, organisation, period and summary only. */
  compact?: boolean;
  headingLevel?: 'h2' | 'h3';
}

export function Timeline({ roles, compact = false, headingLevel: Heading = 'h3' }: TimelineProps) {
  return (
    <ol className="border-b border-line">
      {roles.map((role) => {
        const related = getProjectsBySlugs(role.projects);
        return (
          <li
            key={role.organisation}
            className="grid gap-4 border-t border-line py-8 lg:grid-cols-12 lg:gap-8 print:grid-cols-12 print:gap-6 print:py-5"
          >
            <div className="lg:col-span-3 print:col-span-3">
              <p className="font-mono text-small text-fg tabular-nums">{role.period}</p>
              <p className="text-caption text-fg-muted">{role.location}</p>
            </div>
            <div className="space-y-4 lg:col-span-9 print:col-span-9 print:space-y-2">
              <div>
                <Heading className="text-h3 font-medium text-fg">{role.role}</Heading>
                <p className="text-body text-fg-secondary">{role.organisation}</p>
              </div>
              <p className="max-w-prose text-body text-fg-secondary">{role.summary}</p>
              {!compact && <BulletList items={role.highlights} />}
              {!compact && related.length > 0 && (
                <p className="text-small text-fg-secondary print:hidden">
                  Case studies:{' '}
                  {related.map((project, index) => (
                    <span key={project.slug}>
                      {index > 0 && ', '}
                      <Link href={`/work/${project.slug}`} className="link">
                        {project.name}
                      </Link>
                    </span>
                  ))}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

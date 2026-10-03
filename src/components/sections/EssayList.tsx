import Link from 'next/link';
import { disciplines } from '@/content/engineering';
import { cx } from '@/lib/cx';

/** Links to the four discipline write-ups. */
export function EssayList({
  headingLevel: Heading = 'h3',
  className,
}: {
  headingLevel?: 'h2' | 'h3';
  className?: string;
}) {
  return (
    <ul className={cx('border-b border-line', className)}>
      {disciplines.map((discipline) => (
        <li
          key={discipline.id}
          className="group relative grid gap-2 border-t border-line py-6 lg:grid-cols-12 lg:gap-8"
        >
          <p className="meta lg:col-span-2 lg:pt-1">{discipline.label}</p>
          <div className="lg:col-span-10">
            <Heading className="text-h3 font-medium text-fg">
              <Link
                href={`/engineering/${discipline.id}`}
                className="decoration-accent decoration-2 underline-offset-4 group-hover:underline after:absolute after:inset-0 after:content-['']"
              >
                {discipline.essay.title}
              </Link>
            </Heading>
            <p className="mt-2 max-w-prose text-small text-fg-secondary">
              {discipline.essay.summary}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

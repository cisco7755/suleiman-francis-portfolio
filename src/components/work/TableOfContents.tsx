import type { TocEntry } from './CaseStudyBody';

/** Sticky on wide screens; a collapsible disclosure on small ones. */
export function TableOfContents({ entries }: { entries: readonly TocEntry[] }) {
  const list = (
    <ol className="space-y-1.5 text-small">
      {entries.map((entry) => (
        <li key={entry.id}>
          <a href={`#${entry.id}`} className="text-fg-secondary transition-colors hover:text-fg">
            {entry.label}
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <>
      <details className="rounded-md border border-line lg:hidden">
        <summary className="cursor-pointer px-4 py-3 text-small font-medium text-fg">
          On this page
        </summary>
        <nav aria-label="On this page" className="border-t border-line px-4 py-3">
          {list}
        </nav>
      </details>
      <nav aria-label="On this page" className="sticky top-20 hidden lg:block">
        <p className="meta mb-4">On this page</p>
        {list}
      </nav>
    </>
  );
}

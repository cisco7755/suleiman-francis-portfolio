import type { ReactNode } from 'react';
import type { Note, Project } from '@/content/types';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { MetricGrid } from '@/components/ui/Metric';
import { BulletList, Prose } from '@/components/ui/Prose';
import { Quote } from '@/components/ui/Quote';
import { ArchitectureDiagram } from './ArchitectureDiagram';
import { DecisionRecord } from './DecisionRecord';
import { screenSlides } from './carousel-slides';
import { MediaCarousel } from './MediaCarousel';
import { FlowDiagram } from './FlowDiagram';
import { ImageGallery } from './ImageGallery';

export interface TocEntry {
  id: string;
  label: string;
}

/** Table of contents derived from which sections the case study actually has. */
export function caseStudyToc(project: Project): TocEntry[] {
  const study = project.caseStudy;
  return [
    { id: 'context', label: 'Context' },
    { id: 'responsibility', label: 'My responsibility' },
    { id: 'challenge', label: 'The challenge' },
    { id: 'constraints', label: 'Constraints' },
    { id: 'architecture', label: 'Architecture' },
    ...(study.exploration ? [{ id: 'exploration', label: 'Exploration' }] : []),
    { id: 'decisions', label: 'Key decisions' },
    ...(study.spotlight ? [{ id: study.spotlight.id, label: 'On-device AI' }] : []),
    { id: 'implementation', label: 'Implementation' },
    { id: 'production', label: 'Production' },
    ...(study.gallery || study.showcase ? [{ id: 'screens', label: 'Screens' }] : []),
    { id: 'outcome', label: 'Outcome' },
    { id: 'lessons', label: 'Lessons' },
    { id: 'next', label: 'Next iteration' },
  ];
}

function CaseSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="scroll-mt-20 border-t border-line pt-8"
    >
      <h2 id={`${id}-title`} className="mb-6 text-h2 font-medium text-fg">
        {title}
      </h2>
      {children}
    </section>
  );
}

function NoteList({ notes, columns = 1 }: { notes: readonly Note[]; columns?: 1 | 2 }) {
  return (
    <dl
      className={columns === 2 ? 'grid gap-x-10 gap-y-6 md:grid-cols-2' : 'max-w-prose space-y-6'}
    >
      {notes.map((note) => (
        <div key={note.title}>
          <dt className="mb-1 text-body font-medium text-fg">{note.title}</dt>
          <dd className="text-body text-pretty text-fg-secondary">{note.body}</dd>
        </div>
      ))}
    </dl>
  );
}

export function CaseStudyBody({ project }: { project: Project }) {
  const study = project.caseStudy;
  const [keyLesson, ...otherLessons] = study.lessons;

  return (
    <div className="space-y-16">
      <CaseSection id="context" title="Context">
        <Prose paragraphs={study.context} />
      </CaseSection>

      <CaseSection id="responsibility" title="My responsibility">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h3 className="meta mb-4">I owned</h3>
            <BulletList items={study.responsibility.owned} />
          </div>
          <div>
            <h3 className="meta mb-4">I collaborated on</h3>
            <BulletList items={study.responsibility.collaborated} />
          </div>
        </div>
      </CaseSection>

      <CaseSection id="challenge" title="The challenge">
        <Prose paragraphs={study.challenge} />
      </CaseSection>

      <CaseSection id="constraints" title="Constraints">
        <NoteList notes={study.constraints} columns={2} />
      </CaseSection>

      <CaseSection id="architecture" title="Architecture">
        <ArchitectureDiagram architecture={study.architecture} />
        <BulletList items={study.architecture.notes} className="mt-8" />
      </CaseSection>

      {study.exploration && (
        <CaseSection id="exploration" title="Exploration">
          <NoteList notes={study.exploration} />
        </CaseSection>
      )}

      <CaseSection id="decisions" title="Key decisions">
        <div className="space-y-6">
          {study.decisions.map((decision, index) => (
            <DecisionRecord key={decision.title} decision={decision} index={index} />
          ))}
        </div>
      </CaseSection>

      {study.spotlight && (
        <CaseSection id={study.spotlight.id} title={study.spotlight.title}>
          <Prose paragraphs={[study.spotlight.intro]} />
          <div className="mt-8 grid gap-8">
            <div className="rounded-md border border-line bg-surface p-5 sm:p-6">
              <FlowDiagram flow={study.spotlight.flow} />
            </div>
            {study.spotlight.code && <CodeBlock excerpt={study.spotlight.code} />}
          </div>
          <h3 className="mt-10 mb-3 text-h3 font-medium text-fg">Why this architecture</h3>
          <BulletList items={study.spotlight.rationale} />
          <h3 className="mt-10 mb-3 text-h3 font-medium text-fg">Evaluation methodology</h3>
          <Prose paragraphs={study.spotlight.evaluation.summary} />
          <div className="mt-8">
            <MetricGrid metrics={study.spotlight.evaluation.metrics} />
          </div>
        </CaseSection>
      )}

      <CaseSection id="implementation" title="Implementation">
        <NoteList notes={study.implementation} columns={2} />
      </CaseSection>

      <CaseSection id="production" title="Production">
        <NoteList notes={study.production} columns={2} />
      </CaseSection>

      {(study.gallery || study.showcase) && (
        <CaseSection id="screens" title="Screens">
          <div className="space-y-12">
            {study.showcase && (
              <MediaCarousel
                slides={screenSlides(study.showcase, 'feature')}
                label={`${project.name} screens`}
                variant="feature"
              />
            )}
            {study.gallery && <ImageGallery figures={study.gallery} />}
          </div>
        </CaseSection>
      )}

      <CaseSection id="outcome" title="Outcome">
        <Prose paragraphs={study.outcome.summary} />
        <div className="mt-8">
          <MetricGrid metrics={study.outcome.metrics} />
        </div>
      </CaseSection>

      <CaseSection id="lessons" title="Lessons">
        <Quote>{keyLesson}</Quote>
        {otherLessons.length > 0 && <Prose paragraphs={otherLessons} className="mt-8" />}
      </CaseSection>

      <CaseSection id="next" title="Next iteration">
        <BulletList items={study.next} />
      </CaseSection>
    </div>
  );
}

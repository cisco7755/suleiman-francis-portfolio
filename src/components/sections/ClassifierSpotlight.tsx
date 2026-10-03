import Link from 'next/link';
import type { Spotlight } from '@/content/types';
import { Container } from '@/components/ui/Container';
import { MetricGrid } from '@/components/ui/Metric';
import { BulletList, Prose } from '@/components/ui/Prose';
import { FlowDiagram } from '@/components/work/FlowDiagram';

interface ClassifierSpotlightProps {
  spotlight: Spotlight;
  caseStudyHref: string;
}

export function ClassifierSpotlight({ spotlight, caseStudyHref }: ClassifierSpotlightProps) {
  return (
    <section
      aria-labelledby="spotlight-title"
      className="border-y border-line bg-surface py-16 lg:py-24"
    >
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <p className="meta mb-3">AI feature · Whistler Mobile</p>
          <h2 id="spotlight-title" className="text-h2 font-medium text-balance text-fg">
            {spotlight.title}
          </h2>
          <p className="mt-5 max-w-prose text-body text-fg-secondary">{spotlight.intro}</p>
          <h3 className="mt-8 mb-3 text-h3 font-medium text-fg">Why this architecture</h3>
          <BulletList items={spotlight.rationale} />
        </div>
        <div className="lg:col-span-6">
          <div className="rounded-md border border-line bg-bg p-5 sm:p-6">
            <FlowDiagram flow={spotlight.flow} />
          </div>
        </div>

        <div className="grid gap-8 border-t border-line pt-8 lg:col-span-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <h3 className="mb-3 text-h3 font-medium text-fg">How well does it work?</h3>
            <Prose paragraphs={spotlight.evaluation.summary} className="text-small" />
            <Link
              href={caseStudyHref}
              className="mt-5 inline-block text-small font-medium text-accent hover:underline"
            >
              Methodology and lessons in the case study →
            </Link>
          </div>
          <div className="lg:col-span-7">
            <MetricGrid metrics={spotlight.evaluation.metrics} />
          </div>
        </div>
      </Container>
    </section>
  );
}

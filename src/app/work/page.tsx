import { featuredProjects, moreProjects, projects } from '@/content/projects';
import { pageMetadata } from '@/lib/metadata';
import { PageIntro } from '@/components/layout/PageIntro';
import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ProjectCard, ProjectSummaryRow } from '@/components/work/ProjectCard';

export const metadata = pageMetadata({
  title: 'Work',
  description:
    'Case studies from Suleiman Francis: Whistler Mobile, Clientshot, Whistler Web, Device Intelligence, Whistler Admin, Clientshot Public, the SeamHealth blog and ELSRT.',
  path: '/work',
});

export default function WorkPage() {
  return (
    <Container>
      <PageIntro
        eyebrow="Work"
        title="Selected work"
        lede={`${projects.length} production systems across mobile, web, backend and AI. Each case study covers context, constraints, architecture, key decisions, outcome and what I’d do next — and separates what I owned from what I collaborated on.`}
      />
      <div>
        {featuredProjects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} headingLevel="h2" />
        ))}
      </div>

      <section aria-labelledby="more-work-title" className="mt-16">
        <SectionHeader id="more-work-title" eyebrow="More" title="More work" />
        <div className="mt-4 border-b border-line">
          {moreProjects.map((project) => (
            <ProjectSummaryRow key={project.slug} project={project} headingLevel="h3" />
          ))}
        </div>
      </section>

      <p className="mt-8 max-w-prose text-small text-fg-muted">
        Commit counts come from each repository’s git history. SeamHealth products are described
        without proprietary screens, code or data.
      </p>
    </Container>
  );
}

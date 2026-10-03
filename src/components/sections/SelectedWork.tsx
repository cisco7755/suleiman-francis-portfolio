import { featuredProjects, projects } from '@/content/projects';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ProjectCard } from '@/components/work/ProjectCard';

export function SelectedWork() {
  return (
    <section id="work" aria-labelledby="work-title" className="py-16 lg:py-24">
      <Container>
        <SectionHeader
          id="work-title"
          eyebrow="Work"
          title="Selected work"
          lede="Production software across mobile, web, backend, and AI. Each case study separates what I owned from what I collaborated on."
          action={
            <ButtonLink href="/work" variant="quiet">
              All {projects.length} case studies →
            </ButtonLink>
          }
        />
        <div className="mt-6">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}

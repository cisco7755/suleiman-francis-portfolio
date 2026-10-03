import { projects } from '@/content/projects';
import { getProject } from '@/lib/content';
import { ogSize, renderOgImage } from '@/lib/og';

export const alt = 'Case study by Suleiman Francis';
export const size = ogSize;
export const contentType = 'image/png';

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  return renderOgImage({
    eyebrow: project ? `Case study · ${project.name}` : 'Case study',
    title: project?.headline ?? 'Case study',
  });
}

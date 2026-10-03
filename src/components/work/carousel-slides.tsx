import type { Architecture, Device, DeviceView } from '@/content/types';
import { FitToFrame } from '@/components/ui/FitToFrame';
import { SafeImage } from '@/components/ui/SafeImage';
import { ArchitectureDiagram } from './ArchitectureDiagram';
import type { CarouselSlide } from './MediaCarousel';

/**
 * Builders for MediaCarousel slides. They run on the server, so slide content
 * (images and the architecture diagram) arrives as rendered HTML.
 */

const deviceLabel: Record<Device, string> = {
  mobile: 'Mobile',
  tablet: 'Tablet',
  desktop: 'Desktop',
};

type Size = 'card' | 'feature';

const imageSizes: Record<Size, string> = {
  card: '(min-width: 1024px) 480px, 92vw',
  feature: '(min-width: 1024px) 860px, 92vw',
};

/** One slide per screenshot, in the order given, badged with its device size. */
export function screenSlides(views: readonly DeviceView[], size: Size = 'card'): CarouselSlide[] {
  return views.map((view, index) => ({
    id: `${view.device}-${index}`,
    title: view.title,
    badge: deviceLabel[view.device],
    caption: view.figure.caption,
    content: (
      <SafeImage
        src={view.figure.src}
        alt={view.figure.alt}
        width={view.figure.width}
        height={view.figure.height}
        sizes={imageSizes[size]}
        className="h-auto max-h-full w-auto max-w-full rounded-sm"
      />
    ),
  }));
}

export function architectureSlide(architecture: Architecture): CarouselSlide {
  return {
    id: 'architecture',
    title: 'Architecture',
    caption: architecture.caption,
    // Laid out at a fixed width, then scaled, so the preview looks the same on every card size.
    content: (
      <FitToFrame contentClassName="w-120">
        <ArchitectureDiagram architecture={architecture} compact bare />
      </FitToFrame>
    ),
  };
}

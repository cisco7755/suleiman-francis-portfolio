import Link from 'next/link';
import { profile } from '@/content/profile';
import { trackingAttributes } from '@/lib/analytics/events';
import { navigation } from '@/lib/site';
import { Container } from '@/components/ui/Container';

const linkClass = 'text-small text-fg-secondary transition-colors hover:text-fg';

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-line print:hidden">
      <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="font-medium text-fg">{profile.name}</p>
          <p className="text-small text-fg-secondary">{profile.title}</p>
          <p className="text-small text-fg-muted">{profile.location}</p>
        </div>

        <div className="lg:col-span-4">
          <h2 className="meta mb-3">Contact</h2>
          <ul className="space-y-2">
            <li>
              <a
                href={`mailto:${profile.email}`}
                className={linkClass}
                {...trackingAttributes('email_click', { from: 'footer' })}
              >
                {profile.email}
              </a>
            </li>
            <li>
              <a
                href={profile.links.github}
                className={linkClass}
                target="_blank"
                rel="noopener noreferrer"
                {...trackingAttributes('github_click', { from: 'footer' })}
              >
                GitHub<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a
                href={profile.links.linkedin}
                className={linkClass}
                target="_blank"
                rel="noopener noreferrer"
                {...trackingAttributes('linkedin_click', { from: 'footer' })}
              >
                LinkedIn<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a
                href={profile.resume.href}
                download
                className={linkClass}
                {...trackingAttributes('resume_download', { from: 'footer' })}
              >
                Résumé (PDF)
              </a>
            </li>
          </ul>
        </div>

        <nav aria-label="Footer" className="lg:col-span-3">
          <h2 className="meta mb-3">Site</h2>
          <ul className="space-y-2">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
      <Container>
        <p className="border-t border-line py-6 text-caption text-fg-muted">
          © {year} {profile.name}. Built with Next.js and TypeScript.
        </p>
      </Container>
    </footer>
  );
}

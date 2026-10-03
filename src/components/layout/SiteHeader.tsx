import Link from 'next/link';
import { profile } from '@/content/profile';
import { navigation } from '@/lib/site';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Container } from '@/components/ui/Container';
import { MobileNav } from './MobileNav';
import { NavLink } from './NavLink';
import { ThemeToggle } from './ThemeToggle';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg print:hidden">
      <Container className="relative flex h-14 items-center justify-between gap-6">
        <Link
          href="/"
          className="text-caption font-semibold tracking-[0.12em] text-fg uppercase"
          aria-label={`${profile.name} — home`}
        >
          {profile.name}
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          <nav aria-label="Primary">
            <ul className="flex items-center gap-7">
              {navigation.map((item) => (
                <li key={item.href}>
                  <NavLink
                    href={item.href}
                    className="py-1 text-small text-fg-secondary transition-colors hover:text-fg"
                    activeClassName="text-fg underline decoration-accent decoration-2 underline-offset-8"
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <ThemeToggle />
          <ButtonLink
            href="/contact"
            size="sm"
            track={{ event: 'contact_click', props: { from: 'header' } }}
          >
            Let’s talk
          </ButtonLink>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <ThemeToggle />
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}

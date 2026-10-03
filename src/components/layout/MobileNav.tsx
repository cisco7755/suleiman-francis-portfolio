'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { navigation } from '@/lib/site';
import { buttonClasses } from '@/components/ui/button-styles';
import { NavLink } from './NavLink';

/**
 * Disclosure-pattern menu for small screens: a labelled toggle that drops a
 * panel below the header. Escape closes it and returns focus to the toggle.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="lg:hidden">
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="-mr-2 inline-flex h-11 items-center gap-2 px-2 text-small font-medium text-fg"
      >
        <span aria-hidden className="relative block h-3 w-4">
          <span
            className={`absolute left-0 h-px w-4 bg-current transition-transform duration-(--duration-base) ${open ? 'top-1.5 rotate-45' : 'top-0'}`}
          />
          <span
            className={`absolute left-0 h-px w-4 bg-current transition-transform duration-(--duration-base) ${open ? 'top-1.5 -rotate-45' : 'top-3'}`}
          />
        </span>
        {open ? 'Close' : 'Menu'}
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-line bg-bg shadow-[0_8px_16px_-12px_rgb(0_0_0/0.25)]"
      >
        <nav aria-label="Primary" className="mx-auto max-w-page px-4 pt-2 pb-6 sm:px-6">
          <ul className="divide-y divide-line">
            {navigation.map((item) => (
              <li key={item.href}>
                <NavLink
                  href={item.href}
                  onNavigate={close}
                  className="flex h-12 items-center text-body text-fg-secondary"
                  activeClassName="font-medium text-fg"
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <NavLink
            href="/contact"
            onNavigate={close}
            className={`${buttonClasses('primary')} mt-4 w-full`}
          >
            Let’s talk
          </NavLink>
        </nav>
      </div>
    </div>
  );
}

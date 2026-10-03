'use client';

import { useSyncExternalStore } from 'react';
import { THEME_STORAGE_KEY, isTheme, type Theme } from '@/lib/theme';

const DARK_QUERY = '(prefers-color-scheme: dark)';

function subscribe(onChange: () => void) {
  const media = window.matchMedia(DARK_QUERY);
  const observer = new MutationObserver(onChange);
  media.addEventListener('change', onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  return () => {
    media.removeEventListener('change', onChange);
    observer.disconnect();
  };
}

/** The theme actually on screen: the saved choice, or the OS setting. */
function getTheme(): Theme {
  const saved = document.documentElement.dataset.theme;
  if (isTheme(saved)) return saved;
  return window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light';
}

/** Unknown during prerendering; resolved on the client after hydration. */
const getServerTheme = () => null;

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage blocked (private mode): the choice lasts for this page view only.
  }
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme);
  const next: Theme = theme === 'dark' ? 'light' : 'dark';

  return (
    <button
      type="button"
      onClick={() => applyTheme(next)}
      aria-label={theme ? `Switch to ${next} theme` : 'Switch theme'}
      title={theme ? `Switch to ${next} theme` : undefined}
      className="inline-flex h-11 w-11 items-center justify-center rounded-md text-fg-secondary transition-colors hover:bg-surface-muted hover:text-fg"
    >
      {theme === 'dark' && <SunIcon />}
      {theme === 'light' && <MoonIcon />}
    </button>
  );
}

function SunIcon() {
  return (
    <svg
      aria-hidden
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      aria-hidden
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.5 14.5A8.5 8.5 0 1 1 9.5 3.5a7 7 0 0 0 11 11Z" />
    </svg>
  );
}

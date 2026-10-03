export type Theme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'theme';

export function isTheme(value: unknown): value is Theme {
  return value === 'light' || value === 'dark';
}

/**
 * Runs in <head> before first paint: applies a saved theme so there is no
 * flash of the wrong one. With nothing saved, CSS follows the OS setting.
 * Must stay dependency-free and ES5 — it is inlined as a string.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)});if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

import { describe, expect, it } from 'vitest';
import { isTheme, themeInitScript } from '@/lib/theme';

function runInitScript(saved: string | null, storageThrows = false) {
  const attributes: Record<string, string> = {};
  const localStorage = {
    getItem: () => {
      if (storageThrows) throw new Error('blocked');
      return saved;
    },
  };
  const document = {
    documentElement: { setAttribute: (name: string, value: string) => (attributes[name] = value) },
  };
  new Function('localStorage', 'document', themeInitScript)(localStorage, document);
  return attributes['data-theme'];
}

describe('theme init script', () => {
  it('applies a saved theme', () => {
    expect(runInitScript('dark')).toBe('dark');
    expect(runInitScript('light')).toBe('light');
  });

  it('leaves the OS setting in charge when nothing valid is saved', () => {
    expect(runInitScript(null)).toBeUndefined();
    expect(runInitScript('purple')).toBeUndefined();
  });

  it('never throws when storage is blocked', () => {
    expect(runInitScript('dark', true)).toBeUndefined();
  });

  it('validates theme values', () => {
    expect(isTheme('dark')).toBe(true);
    expect(isTheme('system')).toBe(false);
  });
});

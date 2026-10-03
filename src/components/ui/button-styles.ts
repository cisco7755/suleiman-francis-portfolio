import { cx } from '@/lib/cx';

export type ButtonVariant = 'primary' | 'secondary' | 'quiet';
export type ButtonSize = 'sm' | 'md';

const base =
  'inline-flex items-center justify-center gap-2 rounded-md font-medium whitespace-nowrap transition-colors duration-(--duration-fast) ease-(--ease-standard) disabled:cursor-not-allowed disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50';

const sizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-3.5 text-caption',
  md: 'h-11 px-5 text-small',
};

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-on-accent hover:bg-accent-hover active:bg-accent-hover',
  secondary:
    'border border-line-strong bg-transparent text-fg hover:border-fg active:bg-surface-muted',
  quiet:
    'text-small text-fg underline decoration-line-strong underline-offset-4 hover:decoration-accent',
};

/** Shared by <Button> and <ButtonLink> so links and buttons look identical. */
export function buttonClasses(variant: ButtonVariant = 'primary', size: ButtonSize = 'md') {
  // Quiet buttons read as links: no box, so no size padding to fight with.
  return cx(base, variant !== 'quiet' && sizes[size], variants[variant]);
}

'use client';

import { useRef, useState } from 'react';
import { track } from '@/lib/analytics/client';
import { buttonClasses } from './button-styles';

type Status = 'idle' | 'copied' | 'failed';

const RESET_AFTER_MS = 2500;

/**
 * Fallback for visitors without a configured mail client — mailto links fail
 * silently for them. Reports success and failure through a live region.
 */
export function CopyEmailButton({ email }: { email: string }) {
  const [status, setStatus] = useState<Status>('idle');
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  async function copy() {
    clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(email);
      setStatus('copied');
      track('email_click', { method: 'copy' });
    } catch {
      setStatus('failed');
    }
    timer.current = setTimeout(() => setStatus('idle'), RESET_AFTER_MS);
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <button type="button" onClick={copy} className={buttonClasses('secondary')}>
        {status === 'copied' ? 'Copied' : 'Copy email address'}
      </button>
      <p role="status" aria-live="polite" className="min-h-5 text-caption">
        {status === 'copied' && <span className="text-positive">Copied to clipboard.</span>}
        {status === 'failed' && (
          <span className="text-critical">
            Couldn’t copy automatically. The address is {email}.
          </span>
        )}
      </p>
    </div>
  );
}

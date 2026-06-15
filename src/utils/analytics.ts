// Meta (Facebook) Pixel helpers.
// The base pixel is loaded in index.html and fires the initial PageView.
// Here we expose a typed wrapper plus a one-shot "lead pending" flag so the
// Lead event fires exactly once — after a real submission AND once the
// thank-you page is shown (never on a direct visit to the thank-you URL).

type Fbq = (...args: unknown[]) => void

declare global {
  interface Window {
    fbq?: Fbq
  }
}

/** Hash route for the thank-you page. */
export const THANKYOU_HASH = 'danke'

const LEAD_FLAG = 'klaster:lead-pending'

/** Fire a standard Meta Pixel event (no-op if the pixel is blocked/absent). */
export function track(event: string, params?: Record<string, unknown>): void {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', event, params)
  }
}

export function trackLead(params?: Record<string, unknown>): void {
  track('Lead', params)
}

/** Mark that a submission just succeeded (call right before navigating). */
export function markLeadPending(): void {
  try {
    sessionStorage.setItem(LEAD_FLAG, '1')
  } catch {
    /* storage unavailable — Lead simply won't fire, no crash */
  }
}

/** Consume the flag. Returns true once per successful submission. */
export function consumeLeadPending(): boolean {
  try {
    if (sessionStorage.getItem(LEAD_FLAG) === '1') {
      sessionStorage.removeItem(LEAD_FLAG)
      return true
    }
  } catch {
    /* ignore */
  }
  return false
}

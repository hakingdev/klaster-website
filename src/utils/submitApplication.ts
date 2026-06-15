/**
 * Application payload sent to the mail backend.
 * Keep this in sync with the form fields in ApplicationForm.tsx.
 */
export interface ApplicationPayload {
  name: string
  age: string
  city: string
  contact: string
  guestCount: string
  musicTaste: string[]
  message: string
  agreeNoGuarantee: boolean
  agreeData: boolean
  /** Honeypot — always empty for real users; the server rejects non-empty. */
  website?: string
}

/**
 * Sends an application to the SMTP backend (server/index.js → nodemailer).
 *
 * Endpoint: POST {VITE_API_BASE}/api/apply
 *  - In development, VITE_API_BASE is empty and Vite proxies /api → backend.
 *  - In production, set VITE_API_BASE to the backend origin if it differs.
 *
 * All SMTP credentials live in the backend's .env and never reach the browser.
 *
 * Want a different channel instead of your own SMTP backend? Swap the fetch
 * below for one of: Formspree, Telegram Bot API, EmailJS, Supabase, Firebase
 * or Netlify Forms. The function only needs to resolve on success and throw on
 * failure.
 */
export async function submitApplication(payload: ApplicationPayload): Promise<void> {
  const base = import.meta.env.VITE_API_BASE ?? ''

  const res = await fetch(`${base}/api/apply`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    let message = 'Request failed'
    try {
      const data = (await res.json()) as { error?: string }
      if (data?.error) message = data.error
    } catch {
      /* non-JSON error response — keep the generic message */
    }
    throw new Error(message)
  }
}

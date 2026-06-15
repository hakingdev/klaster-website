import { useEffect, useRef } from 'react'
import styles from './ThankYou.module.css'
import { useHashRoute } from '../hooks/useHashRoute'
import { consumeLeadPending, trackLead, THANKYOU_HASH } from '../utils/analytics'

/**
 * Full-screen thank-you page (hash route `#danke`).
 *
 * When it appears after a real submission, it fires the Meta Pixel `Lead`
 * event exactly once (guarded by a sessionStorage flag set by the form), so
 * the lead is counted when the request was sent and this page is shown.
 */
export default function ThankYou() {
  const { hash, clear } = useHashRoute()
  const open = hash === THANKYOU_HASH
  const fired = useRef(false)

  useEffect(() => {
    if (!open) return

    // Fire Lead once, only if we arrived here from a successful submission.
    if (!fired.current && consumeLeadPending()) {
      trackLead()
      fired.current = true
    }

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.scrollTo(0, 0)

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') clear()
    }
    window.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [open, clear])

  if (!open) return null

  return (
    <div
      className={styles.page}
      role="dialog"
      aria-modal="true"
      aria-labelledby="danke-title"
    >
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.inner}>
        <span className={styles.mark} aria-hidden="true">
          ✓
        </span>
        <p className="kicker">Bewerbung erhalten</p>
        <h1 id="danke-title" className={styles.title}>
          Danke. Deine Bewerbung ist eingegangen.
        </h1>
        <p className={styles.text}>
          Wenn es passt, melden wir uns persönlich bei dir. Der genaue
          Einlassort wird nur bestätigten Gästen wenige Tage vor dem Event
          mitgeteilt.
        </p>
        <button type="button" className="btn btn--ghost" onClick={clear}>
          Zurück zur Startseite
        </button>
      </div>
    </div>
  )
}

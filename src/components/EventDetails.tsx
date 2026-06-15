import type { ReactNode } from 'react'
import styles from './EventDetails.module.css'
import { event } from '../data/event'
import { useScrollReveal } from '../hooks/useScrollReveal'

/** Thin-line icons keyed by detail id. Decorative — hidden from a11y tree. */
const icons: Record<string, ReactNode> = {
  event: (
    <path d="M12 3l2.5 5.2L20 9l-4 4 1 5.8L12 16l-5 2.8 1-5.8-4-4 5.5-.8z" />
  ),
  date: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="1.5" />
      <path d="M3.5 9.5h17M8 3.5v3M16 3.5v3" />
    </>
  ),
  city: (
    <>
      <path d="M12 21s7-5.6 7-11a7 7 0 10-14 0c0 5.4 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.4" />
    </>
  ),
  price: (
    <>
      <circle cx="12" cy="12" r="8.2" />
      <path d="M15 9.2A4 4 0 1012 16M8.5 11h5M8.5 13h5" />
    </>
  ),
  genres: (
    <path d="M4 12h2l1.5-5 2.5 11 2.5-9 1.8 6L16 12h4" />
  ),
  location: (
    <>
      <circle cx="9" cy="9" r="3.4" />
      <path d="M11.4 11.4L20 20M16.5 16.5l2-2M14.2 14.2l2-2" />
    </>
  ),
}

export default function EventDetails() {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section className={`section ${styles.section}`} ref={ref} aria-labelledby="details-title">
      <div className="container">
        <div className={`reveal ${styles.head}`}>
          <p className="kicker">Übersicht</p>
          <h2 id="details-title" className="section-title">
            Details
          </h2>
        </div>

        <ul className={styles.grid}>
          {event.details.map((item) => (
            <li key={item.id} className={`reveal ${styles.card}`}>
              <span className={styles.icon} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
                  {icons[item.id]}
                </svg>
              </span>
              <span className={styles.label}>{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

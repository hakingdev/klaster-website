import styles from './Footer.module.css'
import { event } from '../data/event'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <hr className="hairline" />
      <div className={`container ${styles.inner}`}>
        <p className={styles.brand}>{event.brand}</p>

        <div className={styles.lines}>
          <p>
            {event.brand} · {event.tagline}
          </p>
          <p>
            {event.city} · {event.date}
          </p>
          <p>Einlassort für bestätigte Gäste</p>
        </div>

        <nav className={styles.legal} aria-label="Rechtliches">
          <a href="#impressum">Impressum</a>
          <span aria-hidden="true">·</span>
          <a href="#datenschutz">Datenschutz</a>
        </nav>

        <p className={styles.small}>
          Details folgen persönlich. Bitte respektiere den privaten Charakter des
          Events.
        </p>
      </div>
    </footer>
  )
}

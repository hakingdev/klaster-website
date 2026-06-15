import styles from './Atmosphere.module.css'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function Atmosphere() {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section
      className={`section ${styles.section}`}
      ref={ref}
      aria-labelledby="concept-title"
    >
      <div className={styles.glow} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <p className={`reveal kicker ${styles.kicker}`}>Konzept</p>

        <h2 id="concept-title" className={`reveal ${styles.title}`}>
          Keine gewöhnliche Party.
        </h2>

        <div className={styles.body}>
          <p className={`reveal ${styles.lead}`}>
            KLASTER ist ein privates elektronisches Musikformat mit kuratierter
            Gästeliste. Keine Massenveranstaltung, kein Zufallspublikum, kein
            öffentlicher Ticketverkauf. Nur Menschen, die zum Vibe passen.
          </p>

          <p className={`reveal ${styles.sub}`}>
            Wir schaffen einen Raum für Sound, Nähe, Energie und eine Nacht, die
            nicht für jeden gedacht ist.
          </p>
        </div>
      </div>
    </section>
  )
}

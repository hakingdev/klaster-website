import styles from './FinalCta.module.css'
import { scrollToId, FORM_SECTION_ID } from '../utils/scroll'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function FinalCta() {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section className={`section ${styles.section}`} ref={ref} aria-labelledby="final-title">
      <div className={styles.glow} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <h2 id="final-title" className={`reveal ${styles.title}`}>
          Bereit für die Nacht?
        </h2>
        <p className={`reveal ${styles.text}`}>
          KLASTER ist kein Ort, den man einfach findet. Es ist eine Nacht, zu der
          man eingeladen wird.
        </p>
        <button
          type="button"
          className={`reveal btn btn--primary ${styles.cta}`}
          onClick={() => scrollToId(FORM_SECTION_ID)}
        >
          Zur Gästeliste bewerben
        </button>
      </div>
    </section>
  )
}

import styles from './HowToEnter.module.css'
import { event } from '../data/event'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function HowToEnter() {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section
      className={`section ${styles.section}`}
      ref={ref}
      aria-labelledby="how-title"
    >
      <div className="container">
        <div className={`reveal ${styles.head}`}>
          <p className="kicker">Zugang</p>
          <h2 id="how-title" className="section-title">
            Wie kommst du rein?
          </h2>
        </div>

        <ol className={styles.steps}>
          {event.howToSteps.map((s) => (
            <li key={s.step} className={`reveal ${styles.step}`}>
              <span className={styles.num}>
                {String(s.step).padStart(2, '0')}
              </span>
              <span className={styles.stepTitle}>{s.title}</span>
            </li>
          ))}
        </ol>

        <p className={`reveal ${styles.note}`}>
          Eine Bewerbung garantiert keinen Einlass. Wir halten die Runde bewusst
          klein, persönlich und passend zur Atmosphäre.
        </p>
      </div>
    </section>
  )
}

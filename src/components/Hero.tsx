import styles from './Hero.module.css'
import { event } from '../data/event'
import { useAudioPlayer } from '../context/AudioPlayerContext'
import { scrollToId, FORM_SECTION_ID, AUDIO_SECTION_ID } from '../utils/scroll'

export default function Hero() {
  const { start, hasStarted, isPlaying, isMuted } = useAudioPlayer()
  const soundActive = hasStarted && isPlaying && !isMuted

  const handleSound = () => {
    if (soundActive) {
      // Already audible — take the listener to the full audio controls.
      scrollToId(AUDIO_SECTION_ID)
    } else {
      start()
    }
  }

  return (
    <header className={styles.hero}>
      <div className={styles.bg} aria-hidden="true" />
      <div className={styles.vignette} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <p className={styles.eyebrow}>
          Private Event <span className={styles.dot}>·</span> {event.city}{' '}
          <span className={styles.dot}>·</span> {event.date}
        </p>

        <h1 className={styles.logo}>
          {event.brand}
          <span className="visually-hidden"> — {event.tagline}</span>
        </h1>

        <p className={styles.genres}>{event.genresLine}</p>

        <p className={styles.lead}>
          Eine private Nacht für Menschen, die elektronische Musik nicht nur
          hören, sondern fühlen.
        </p>

        <p className={styles.secret}>
          Der genaue Einlassort bleibt geheim und wird nur bestätigten Gästen
          wenige Tage vor dem Event mitgeteilt.
        </p>

        <div className={styles.actions}>
          <button
            type="button"
            className="btn btn--primary"
            onClick={() => scrollToId(FORM_SECTION_ID)}
          >
            Bewerbung zur Gästeliste
          </button>

          <button
            type="button"
            className="btn btn--ghost"
            onClick={handleSound}
            aria-pressed={soundActive}
          >
            {soundActive ? (
              <>
                <span className={styles.eq} aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </span>
                Sound läuft
              </>
            ) : (
              'Sound starten'
            )}
          </button>
        </div>

        <p className={styles.micro}>
          Limitierte Plätze. Keine öffentliche Ticketvergabe.
        </p>
      </div>

      <a
        className={styles.scrollHint}
        href={`#${AUDIO_SECTION_ID}`}
        onClick={(e) => {
          e.preventDefault()
          scrollToId(AUDIO_SECTION_ID)
        }}
        aria-label="Nach unten scrollen"
      >
        <span className={styles.scrollLine} aria-hidden="true" />
      </a>
    </header>
  )
}

import styles from './AudioTeaser.module.css'
import { useAudioPlayer } from '../context/AudioPlayerContext'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { AUDIO_SECTION_ID } from '../utils/scroll'

/** Static heights (%) for the waveform bars — feels organic, no randomness. */
const WAVE_BARS = [
  34, 58, 80, 46, 92, 64, 38, 72, 100, 52, 30, 68, 88, 44, 60, 76, 40, 84, 56,
  36, 70, 94, 48, 62, 78, 42, 66, 90, 50, 32,
]

export default function AudioTeaser() {
  const { hasStarted, isPlaying, isMuted, hasError, start, togglePlay, toggleMute } =
    useAudioPlayer()
  const ref = useScrollReveal<HTMLElement>()

  const active = hasStarted && isPlaying && !isMuted

  return (
    <section
      id={AUDIO_SECTION_ID}
      className={`section ${styles.section}`}
      ref={ref}
      aria-labelledby="audio-title"
    >
      <div className={`container ${styles.inner}`}>
        <p className="reveal kicker">Sound Preview</p>
        <h2 id="audio-title" className={`reveal section-title ${styles.title}`}>
          Hör den Vibe
        </h2>
        <p className={`reveal ${styles.text}`}>
          Ein kurzer Sound-Preview gibt dir einen Eindruck von der Nacht:
          melodisch, tief, warm und treibend.
        </p>

        <div className={`reveal ${styles.player}`}>
          {/* Waveform / equalizer */}
          <div
            className={`${styles.wave} ${active ? styles.waveActive : ''}`}
            aria-hidden="true"
          >
            {WAVE_BARS.map((h, i) => (
              <span
                key={i}
                style={{ ['--h' as string]: `${h}%`, ['--i' as string]: i }}
              />
            ))}
          </div>

          {hasError ? (
            <p className={styles.error} role="status">
              Sound-Preview konnte nicht geladen werden. Lege die Datei unter{' '}
              <code>/audio/klaster-preview.mp3</code> ab oder versuche es später
              erneut.
            </p>
          ) : (
            <div className={styles.controls}>
              {!hasStarted ? (
                <button type="button" className="btn btn--primary" onClick={start}>
                  <PlayIcon />
                  Sound starten
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    className="btn btn--primary"
                    onClick={togglePlay}
                    aria-pressed={isPlaying}
                  >
                    {isPlaying ? <PauseIcon /> : <PlayIcon />}
                    {isPlaying ? 'Pause' : 'Play'}
                  </button>

                  <button
                    type="button"
                    className={`btn btn--ghost ${styles.muteBtn}`}
                    onClick={toggleMute}
                    aria-pressed={isMuted}
                  >
                    {isMuted ? <MutedIcon /> : <SoundIcon />}
                    {isMuted ? 'Unmute' : 'Mute'}
                  </button>
                </>
              )}
            </div>
          )}

          <p className={styles.hint}>
            Lautstärke ist bewusst niedrig gehalten — Teil der Atmosphäre, nicht
            mehr.
          </p>
        </div>
      </div>
    </section>
  )
}

/* --- Inline icons --------------------------------------------------------- */

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
      <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />
    </svg>
  )
}

function SoundIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="15"
      height="15"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 9v6h4l5 4V5L8 9z" />
      <path d="M16.5 8.5a5 5 0 010 7M19 6a8.5 8.5 0 010 12" />
    </svg>
  )
}

function MutedIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="15"
      height="15"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 9v6h4l5 4V5L8 9z" />
      <path d="M16 9l5 6M21 9l-5 6" />
    </svg>
  )
}

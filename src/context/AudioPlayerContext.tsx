import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'

/**
 * Shared audio player.
 *
 * One <audio> element lives here so that the Hero "Sound starten" button and
 * the AudioTeaser section drive the SAME playback (never two clips at once).
 *
 * Browser autoplay rules:
 *  - We try a MUTED autoplay on mount (allowed by most browsers) so the clip is
 *    primed and ready the instant the user interacts.
 *  - Real, audible playback only ever starts from a user gesture (`start`).
 *  - The user's mute choice is persisted in localStorage.
 */

const STORAGE_MUTED = 'klaster:audio-muted'
const DEFAULT_VOLUME = 0.3 // ~30% — present but never intrusive

interface AudioPlayerValue {
  isPlaying: boolean
  isMuted: boolean
  /** True once the listener has triggered audible playback at least once. */
  hasStarted: boolean
  /** True if the audio source failed to load. */
  hasError: boolean
  /** First gesture: unmute (unless previously muted) and play. */
  start: () => void
  togglePlay: () => void
  toggleMute: () => void
}

const AudioPlayerContext = createContext<AudioPlayerValue | null>(null)

function readStoredMuted(): boolean {
  try {
    return localStorage.getItem(STORAGE_MUTED) === 'true'
  } catch {
    return false
  }
}

interface ProviderProps {
  src: string
  children: ReactNode
}

export function AudioPlayerProvider({ src, children }: ProviderProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState<boolean>(() => readStoredMuted())
  const [hasStarted, setHasStarted] = useState(false)
  const [hasError, setHasError] = useState(false)

  // Create the audio element once, imperatively, so it is never re-created on
  // re-render and never duplicated.
  useEffect(() => {
    const audio = new Audio(src)
    audio.preload = 'metadata'
    audio.loop = true
    audio.volume = DEFAULT_VOLUME
    audio.muted = true // priming: muted autoplay is broadly permitted
    audioRef.current = audio

    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)
    const onError = () => setHasError(true)

    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('error', onError)

    // Attempt muted autoplay. If the browser blocks it, that's fine — the
    // listener will start playback with the "Sound starten" button.
    void audio.play().catch(() => {
      /* autoplay blocked — expected, no-op */
    })

    return () => {
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('error', onError)
      audio.pause()
      audioRef.current = null
    }
  }, [src])

  // Keep the element's muted flag and storage in sync with state.
  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = isMuted
    try {
      localStorage.setItem(STORAGE_MUTED, String(isMuted))
    } catch {
      /* storage unavailable — non-critical */
    }
  }, [isMuted])

  const start = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = DEFAULT_VOLUME
    // Honour the persisted preference; otherwise switch sound on.
    if (!readStoredMuted()) {
      setIsMuted(false)
      audio.muted = false
    }
    setHasStarted(true)
    void audio.play().catch(() => setHasError(true))
  }, [])

  const togglePlay = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      setHasStarted(true)
      void audio.play().catch(() => setHasError(true))
    } else {
      audio.pause()
    }
  }, [])

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev)
  }, [])

  const value = useMemo<AudioPlayerValue>(
    () => ({ isPlaying, isMuted, hasStarted, hasError, start, togglePlay, toggleMute }),
    [isPlaying, isMuted, hasStarted, hasError, start, togglePlay, toggleMute],
  )

  return <AudioPlayerContext.Provider value={value}>{children}</AudioPlayerContext.Provider>
}

export function useAudioPlayer(): AudioPlayerValue {
  const ctx = useContext(AudioPlayerContext)
  if (!ctx) {
    throw new Error('useAudioPlayer must be used within an AudioPlayerProvider')
  }
  return ctx
}

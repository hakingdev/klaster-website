import { useCallback, useEffect, useState } from 'react'

/**
 * Tiny hash router (no dependency). Tracks `window.location.hash` so legal
 * pages can be opened via `#impressum` / `#datenschutz` and are directly
 * linkable + work with the browser back button.
 */
export function useHashRoute() {
  const [hash, setHash] = useState<string>(() =>
    typeof window !== 'undefined' ? window.location.hash.replace(/^#/, '') : '',
  )

  useEffect(() => {
    const onChange = () => setHash(window.location.hash.replace(/^#/, ''))
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  // Clear the hash without leaving a dangling "#" in the URL.
  const clear = useCallback(() => {
    history.replaceState(null, '', window.location.pathname + window.location.search)
    setHash('')
  }, [])

  return { hash, clear }
}

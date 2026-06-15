import { useEffect, useRef } from 'react'

/**
 * Reveal-on-scroll. Attach the returned ref to a wrapper (usually the
 * <section>). When that wrapper enters the viewport, the `is-visible` class is
 * added both to the wrapper itself and to every `.reveal` descendant inside it,
 * so the staggered fade-in (see `.reveal` in global.css) plays.
 *
 * Respects prefers-reduced-motion (the CSS neutralises the transform there).
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options?: IntersectionObserverInit,
) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reveal = (target: Element) => {
      target.classList.add('is-visible')
      target.querySelectorAll('.reveal').forEach((child) => {
        child.classList.add('is-visible')
      })
    }

    // No IntersectionObserver (or SSR) → show everything immediately.
    if (typeof IntersectionObserver === 'undefined') {
      reveal(el)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -10% 0px', ...options },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [options])

  return ref
}

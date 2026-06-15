/** Smoothly scroll to an element by id, respecting reduced-motion preference. */
export function scrollToId(id: string): void {
  const el = document.getElementById(id)
  if (!el) return
  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
}

/** Anchor id of the application form section — single source of truth. */
export const FORM_SECTION_ID = 'bewerbung'
export const AUDIO_SECTION_ID = 'sound'

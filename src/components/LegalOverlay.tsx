import { useEffect, useRef } from 'react'
import styles from './LegalOverlay.module.css'
import { legalDocs, type LegalBlock, type LegalDoc } from '../data/legal'
import { useHashRoute } from '../hooks/useHashRoute'

/** Renders the Impressum / Datenschutz overlay based on the URL hash. */
export default function LegalOverlay() {
  const { hash, clear } = useHashRoute()
  const closeRef = useRef<HTMLButtonElement | null>(null)

  const doc: LegalDoc | undefined =
    hash === 'impressum'
      ? legalDocs.impressum
      : hash === 'datenschutz'
        ? legalDocs.datenschutz
        : undefined

  const open = Boolean(doc)

  // Lock page scroll, move focus, close on Escape while open.
  useEffect(() => {
    if (!open) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') clear()
    }
    window.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [open, clear])

  if (!doc) return null

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) clear()
      }}
    >
      <div className={styles.panel}>
        <header className={styles.header}>
          <span className={styles.brand}>KLASTER</span>
          <button
            ref={closeRef}
            type="button"
            className={styles.close}
            onClick={clear}
            aria-label="Schließen"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </header>

        <div className={styles.content}>
          <p className="kicker">Rechtliches</p>
          <h1 id="legal-title" className={styles.title}>
            {doc.title}
          </h1>
          {doc.intro && <p className={styles.intro}>{doc.intro}</p>}

          {doc.blocks.map((block, i) => (
            <Block key={i} block={block} />
          ))}

          {doc.updated && <p className={styles.updated}>{doc.updated}</p>}
        </div>
      </div>
    </div>
  )
}

function Block({ block }: { block: LegalBlock }) {
  switch (block.type) {
    case 'heading':
      return <h2 className={styles.heading}>{block.text}</h2>
    case 'paragraph':
      return <p className={styles.paragraph}>{block.text}</p>
    case 'list':
      return (
        <ul className={styles.list}>
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )
    case 'address':
      return (
        <address className={styles.address}>
          {block.lines.map((line, i) => (
            <span key={i}>{line}</span>
          ))}
        </address>
      )
    default:
      return null
  }
}

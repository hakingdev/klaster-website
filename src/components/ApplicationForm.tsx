import { useState, type FormEvent } from 'react'
import styles from './ApplicationForm.module.css'
import { event } from '../data/event'
import { FORM_SECTION_ID } from '../utils/scroll'
import { markLeadPending, THANKYOU_HASH } from '../utils/analytics'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { submitApplication, type ApplicationPayload } from '../utils/submitApplication'

type Status = 'idle' | 'submitting' | 'error'

interface FormState {
  name: string
  age: string
  city: string
  contact: string
  guestCount: string
  musicTaste: string[]
  message: string
  agreeNoGuarantee: boolean
  agreeData: boolean
  /** Honeypot — must stay empty. Hidden from real users. */
  website: string
}

const initialState: FormState = {
  name: '',
  age: '',
  city: '',
  contact: '',
  guestCount: '',
  musicTaste: [],
  message: '',
  agreeNoGuarantee: false,
  agreeData: false,
  website: '',
}

type Errors = Partial<Record<keyof FormState, string>>

function validate(state: FormState): Errors {
  const errors: Errors = {}

  if (!state.name.trim()) {
    errors.name = 'Bitte gib deinen Namen an.'
  }

  const age = Number(state.age)
  if (!state.age.trim()) {
    errors.age = 'Bitte gib dein Alter an.'
  } else if (!Number.isFinite(age) || age < 18 || age > 99) {
    errors.age = 'Mindestalter 18. Bitte gib ein gültiges Alter an.'
  }

  if (!state.contact.trim()) {
    errors.contact = 'Bitte hinterlasse einen Kontakt, über den wir dich erreichen.'
  }

  if (!state.agreeNoGuarantee) {
    errors.agreeNoGuarantee = 'Bitte bestätige diesen Punkt.'
  }

  if (!state.agreeData) {
    errors.agreeData = 'Bitte bestätige diesen Punkt.'
  }

  return errors
}

export default function ApplicationForm() {
  const ref = useScrollReveal<HTMLElement>()
  const [state, setState] = useState<FormState>(initialState)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')

  const { guestCountOptions, musicTasteOptions } = event.applicationFields

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setState((prev) => ({ ...prev, [key]: value }))
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const toggleMusic = (value: string) => {
    setState((prev) => ({
      ...prev,
      musicTaste: prev.musicTaste.includes(value)
        ? prev.musicTaste.filter((v) => v !== value)
        : [...prev.musicTaste, value],
    }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (status === 'submitting') return

    // Honeypot: a filled hidden field means a bot. Pretend success (show the
    // thank-you page) but send nothing and do NOT count a lead.
    if (state.website.trim() !== '') {
      setState(initialState)
      window.location.hash = THANKYOU_HASH
      return
    }

    const nextErrors = validate(state)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      setStatus('idle')
      // Move focus to the first invalid field for keyboard/AT users.
      const firstKey = Object.keys(nextErrors)[0]
      document.getElementById(`field-${firstKey}`)?.focus()
      return
    }

    setStatus('submitting')
    const payload: ApplicationPayload = {
      name: state.name.trim(),
      age: state.age.trim(),
      city: state.city.trim(),
      contact: state.contact.trim(),
      guestCount: state.guestCount,
      musicTaste: state.musicTaste,
      message: state.message.trim(),
      agreeNoGuarantee: state.agreeNoGuarantee,
      agreeData: state.agreeData,
      website: state.website, // honeypot — '' for real users
    }

    try {
      await submitApplication(payload)
      // Request sent OK → mark the lead, reset, and go to the thank-you page,
      // where the Meta Pixel `Lead` event fires once.
      markLeadPending()
      setState(initialState)
      setStatus('idle')
      window.location.hash = THANKYOU_HASH
    } catch {
      setStatus('error')
    }
  }

  const isSubmitting = status === 'submitting'

  // --- Form view -----------------------------------------------------------
  return (
    <section
      id={FORM_SECTION_ID}
      className={`section ${styles.section}`}
      ref={ref}
      aria-labelledby="form-title"
    >
      <div className={`container ${styles.inner}`}>
        <div className={`reveal ${styles.head}`}>
          <p className="kicker">Gästeliste</p>
          <h2 id="form-title" className="section-title">
            Bewerbung zur Gästeliste
          </h2>
          <p className={styles.intro}>
            Erzähl uns kurz, wer du bist. Wenn es passt, melden wir uns mit
            weiteren Informationen.
          </p>
        </div>

        <form className={`reveal ${styles.form}`} onSubmit={handleSubmit} noValidate>
          {/* Honeypot — visually hidden, off the a11y tree, no tab stop. */}
          <div className={styles.honeypot} aria-hidden="true">
            <label htmlFor="field-website">Website (bitte leer lassen)</label>
            <input
              id="field-website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={state.website}
              onChange={(e) => update('website', e.target.value)}
            />
          </div>

          <div className={styles.row}>
            <Field
              id="field-name"
              label="Name"
              required
              error={errors.name}
            >
              <input
                id="field-name"
                type="text"
                placeholder="Dein Name"
                value={state.name}
                autoComplete="name"
                aria-invalid={!!errors.name}
                onChange={(e) => update('name', e.target.value)}
              />
            </Field>

            <Field id="field-age" label="Alter" required error={errors.age}>
              <input
                id="field-age"
                type="number"
                inputMode="numeric"
                min={18}
                max={99}
                placeholder="Dein Alter"
                value={state.age}
                aria-invalid={!!errors.age}
                onChange={(e) => update('age', e.target.value)}
              />
            </Field>
          </div>

          <div className={styles.row}>
            <Field id="field-city" label="Stadt" hint="optional">
              <input
                id="field-city"
                type="text"
                placeholder="Deine Stadt"
                value={state.city}
                autoComplete="address-level2"
                onChange={(e) => update('city', e.target.value)}
              />
            </Field>

            <Field
              id="field-contact"
              label="Instagram oder Kontakt"
              required
              error={errors.contact}
            >
              <input
                id="field-contact"
                type="text"
                placeholder="Instagram, Telegram, WhatsApp oder E-Mail"
                value={state.contact}
                aria-invalid={!!errors.contact}
                onChange={(e) => update('contact', e.target.value)}
              />
            </Field>
          </div>

          <Field id="field-guestCount" label="Kommst du alleine oder mit Begleitung?">
            <div className={styles.selectWrap}>
              <select
                id="field-guestCount"
                value={state.guestCount}
                onChange={(e) => update('guestCount', e.target.value)}
              >
                <option value="">Bitte wählen</option>
                {guestCountOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </Field>

          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>Musikgeschmack</legend>
            <div className={styles.chips}>
              {musicTasteOptions.map((o) => {
                const checked = state.musicTaste.includes(o.value)
                return (
                  <label
                    key={o.value}
                    className={`${styles.chip} ${checked ? styles.chipOn : ''}`}
                  >
                    <input
                      type="checkbox"
                      className="visually-hidden"
                      checked={checked}
                      onChange={() => toggleMusic(o.value)}
                    />
                    {o.label}
                  </label>
                )
              })}
            </div>
          </fieldset>

          <Field id="field-message" label="Kurze Nachricht">
            <textarea
              id="field-message"
              rows={4}
              placeholder="Warum möchtest du zu KLASTER kommen?"
              value={state.message}
              onChange={(e) => update('message', e.target.value)}
            />
          </Field>

          <div className={styles.consents}>
            <Consent
              id="field-agreeNoGuarantee"
              checked={state.agreeNoGuarantee}
              error={errors.agreeNoGuarantee}
              onChange={(v) => update('agreeNoGuarantee', v)}
            >
              Ich verstehe, dass meine Bewerbung keinen garantierten Einlass
              bedeutet.
            </Consent>

            <Consent
              id="field-agreeData"
              checked={state.agreeData}
              error={errors.agreeData}
              onChange={(v) => update('agreeData', v)}
            >
              Ich bin damit einverstanden, dass meine Angaben zur Bearbeitung
              der Anfrage verwendet werden.
            </Consent>
          </div>

          {status === 'error' && (
            <p className={styles.formError} role="alert">
              Etwas ist schiefgelaufen. Bitte versuche es erneut oder kontaktiere
              uns direkt.
            </p>
          )}

          <div className={styles.submitRow}>
            <button
              type="submit"
              className={`btn btn--primary ${styles.submitBtn}`}
              disabled={isSubmitting}
              aria-busy={isSubmitting}
            >
              {isSubmitting ? 'Wird gesendet …' : 'Bewerbung senden'}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

/* --- Small field primitives ----------------------------------------------- */

interface FieldProps {
  id: string
  label: string
  required?: boolean
  hint?: string
  error?: string
  children: React.ReactNode
}

function Field({ id, label, required, hint, error, children }: FieldProps) {
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {required && <span className={styles.req} aria-hidden="true"> *</span>}
        {hint && <span className={styles.hint}> · {hint}</span>}
      </label>
      {children}
      {error && (
        <span className={styles.error} role="alert">
          {error}
        </span>
      )}
    </div>
  )
}

interface ConsentProps {
  id: string
  checked: boolean
  error?: string
  onChange: (value: boolean) => void
  children: React.ReactNode
}

function Consent({ id, checked, error, onChange, children }: ConsentProps) {
  return (
    <div className={styles.consent}>
      <label className={styles.consentLabel}>
        <input
          id={id}
          type="checkbox"
          checked={checked}
          aria-invalid={!!error}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span className={styles.box} aria-hidden="true" />
        <span className={styles.consentText}>{children}</span>
      </label>
      {error && (
        <span className={styles.error} role="alert">
          {error}
        </span>
      )}
    </div>
  )
}

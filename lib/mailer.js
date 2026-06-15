// Shared application-mail logic.
// Used by BOTH the local dev server (server/index.js) and the Vercel
// serverless function (api/apply.js). Reads SMTP config from process.env
// (locally provided via .env, on Vercel via the dashboard env vars).

import nodemailer from 'nodemailer'

/** Error carrying an HTTP status + a German message safe to show the user. */
export class AppError extends Error {
  constructor(statusCode, message) {
    super(message)
    this.statusCode = statusCode
  }
}

const GUEST_LABELS = {
  alleine: 'Alleine',
  mit_1: 'Mit 1 Person',
  mit_2: 'Mit 2 Personen',
  gruppe: 'Gruppe',
}

const MUSIC_LABELS = {
  melodic_techno: 'Melodic Techno',
  afro_house: 'Afro House',
  deep_house: 'Deep House',
  tech_house: 'Tech House',
  other: 'Other',
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Lazily-created singleton transport (built on first use, after env is loaded).
let cachedTransport
let transportBuilt = false

export function getTransport() {
  if (transportBuilt) return cachedTransport
  transportBuilt = true
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE } = process.env
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    cachedTransport = null
    return null
  }
  cachedTransport = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: String(SMTP_SECURE).toLowerCase() === 'true', // true for port 465
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  })
  return cachedTransport
}

function validate(b) {
  const errors = []
  if (!b || typeof b !== 'object') return ['Ungültige Anfrage.']
  if (!String(b.name || '').trim()) errors.push('Name fehlt.')
  const age = Number(b.age)
  if (!Number.isFinite(age) || age < 18 || age > 99) {
    errors.push('Ungültiges Alter (Mindestalter 18).')
  }
  if (!String(b.contact || '').trim()) errors.push('Kontakt fehlt.')
  if (!b.agreeNoGuarantee) errors.push('Zustimmung (kein garantierter Einlass) fehlt.')
  if (!b.agreeData) errors.push('Datenzustimmung fehlt.')
  return errors
}

function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/**
 * Validate + send one application.
 * @returns {Promise<{ok: true, skipped?: boolean}>}
 * @throws {AppError} on validation / configuration / send failure
 */
export async function processApplication(b = {}) {
  // Honeypot: a filled hidden field means a bot — accept silently, send nothing.
  if (String(b.website || '').trim() !== '') {
    return { ok: true, skipped: true }
  }

  const errors = validate(b)
  if (errors.length) throw new AppError(400, errors.join(' '))

  const transporter = getTransport()
  if (!transporter) {
    throw new AppError(500, 'Mailversand ist nicht konfiguriert.')
  }

  const guest = GUEST_LABELS[b.guestCount] || b.guestCount || '—'
  const music =
    Array.isArray(b.musicTaste) && b.musicTaste.length
      ? b.musicTaste.map((v) => MUSIC_LABELS[v] || v).join(', ')
      : '—'

  const rows = [
    ['Name', b.name],
    ['Alter', b.age],
    ['Stadt', b.city || '—'],
    ['Kontakt', b.contact],
    ['Begleitung', guest],
    ['Musikgeschmack', music],
    ['Nachricht', b.message || '—'],
  ]

  const text =
    'Neue KLASTER-Bewerbung\n\n' + rows.map(([k, v]) => `${k}: ${v}`).join('\n')

  const html = `<!doctype html>
<html lang="de">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;background:#0a0a0a">
  <div style="font-family:Arial,Helvetica,sans-serif;background:#0a0a0a;color:#f4f0ea;padding:24px;border-radius:8px;max-width:560px">
    <h2 style="margin:0 0 4px;letter-spacing:.25em;color:#e0a85a">KLASTER</h2>
    <p style="margin:0 0 18px;color:#a6a09a;font-size:13px">Neue Bewerbung zur Gästeliste</p>
    <table style="width:100%;border-collapse:collapse;font-size:14px">
      ${rows
        .map(
          ([k, v]) => `<tr>
            <td style="padding:8px 10px;border-bottom:1px solid #222;color:#a6a09a;width:38%;vertical-align:top">${esc(k)}</td>
            <td style="padding:8px 10px;border-bottom:1px solid #222;color:#f4f0ea">${esc(v)}</td>
          </tr>`,
        )
        .join('')}
    </table>
  </div>
</body>
</html>`

  const replyTo = EMAIL_RE.test(String(b.contact).trim())
    ? String(b.contact).trim()
    : undefined

  try {
    await transporter.sendMail({
      from: process.env.MAIL_FROM || process.env.SMTP_USER,
      to: process.env.MAIL_TO || process.env.SMTP_USER,
      replyTo,
      subject: process.env.MAIL_SUBJECT || `Neue KLASTER-Bewerbung – ${b.name}`,
      text,
      html,
    })
  } catch (err) {
    throw new AppError(502, 'E-Mail konnte nicht gesendet werden.')
  }

  return { ok: true }
}

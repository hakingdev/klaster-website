// KLASTER — LOCAL DEV mail backend.
//
// This Express server is only for local development (npm run server /
// npm run dev:full). In production on Vercel the request is handled by the
// serverless function api/apply.js instead — both share lib/mailer.js.
//
// All configuration is read from .env (see .env.example).

import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { processApplication, getTransport, AppError } from '../lib/mailer.js'

const app = express()
app.use(express.json({ limit: '64kb' }))
app.use(cors({ origin: process.env.ALLOWED_ORIGIN || true }))

const PORT = Number(process.env.SERVER_PORT) || 3001

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, mailReady: Boolean(getTransport()) })
})

app.post('/api/apply', async (req, res) => {
  try {
    const result = await processApplication(req.body || {})
    res.json(result)
  } catch (err) {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({ error: err.message })
    }
    console.error('[KLASTER] apply error:', err)
    res.status(500).json({ error: 'Interner Fehler.' })
  }
})

app.listen(PORT, () => {
  console.log(`[KLASTER] Dev-API läuft auf http://localhost:${PORT}`)
  const transporter = getTransport()
  if (!transporter) {
    console.warn('[KLASTER] WARNUNG: SMTP nicht konfiguriert. Bitte .env ausfüllen.')
  } else {
    transporter
      .verify()
      .then(() => console.log('[KLASTER] SMTP-Verbindung OK.'))
      .catch((e) => console.warn('[KLASTER] SMTP-Verbindung fehlgeschlagen:', e?.message))
  }
})

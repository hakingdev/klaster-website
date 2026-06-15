// Vercel Serverless Function — POST /api/apply
// On Vercel this file is automatically exposed at the /api/apply route.
// SMTP credentials come from the project's Environment Variables (Vercel
// dashboard → Settings → Environment Variables), NOT from a committed .env.

import { processApplication, AppError } from '../lib/mailer.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Vercel parses JSON bodies automatically; guard for string bodies too.
  let body = req.body
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body)
    } catch {
      return res.status(400).json({ error: 'Ungültige Anfrage.' })
    }
  }

  try {
    const result = await processApplication(body || {})
    return res.status(200).json(result)
  } catch (err) {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({ error: err.message })
    }
    console.error('[KLASTER] apply error:', err)
    return res.status(500).json({ error: 'Interner Fehler.' })
  }
}

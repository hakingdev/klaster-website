# KLASTER — Private Electronic Music Event

Einseitiger Landing-Page (Funnel) für eine **private, geschlossene
Electronic-Music-Nacht** am **17.07.2026 in Bad Kissingen**.
Ziel: qualifizierte Bewerbungen für eine kuratierte Gästeliste sammeln –
**kein** öffentlicher Ticketverkauf.

Stack: **React + Vite + TypeScript**, kustom-gestaltetes CSS
(CSS Modules + globale Design-Tokens). Mobile-first, responsiv, barrierearm.

---

## Schnellstart

```bash
npm install      # Abhängigkeiten installieren
npm run dev      # nur Frontend (Vite)
npm run dev:full # Frontend + Mail-Backend zusammen (empfohlen)
npm run build    # Produktions-Build nach /dist
npm run preview  # Build lokal prüfen
```

Voraussetzung: **Node.js 18+**. Lokal SMTP-Daten in `.env` eintragen
(siehe `.env.example`).

---

## Deployment auf Vercel

Das Projekt ist Vercel-ready:

- **Frontend:** Vite-Build → `dist` (Vercel erkennt das Framework automatisch).
- **Backend:** Das Bewerbungsformular wird von der Serverless Function
  [`api/apply.js`](api/apply.js) verarbeitet (teilt die Logik mit dem lokalen
  Dev-Server über `lib/mailer.js`). Unter `/api/apply` automatisch erreichbar.

**Wichtig — Environment Variables im Vercel-Dashboard setzen**
(Settings → Environment Variables), NICHT die `.env` committen:

```
SMTP_HOST       mail.privateemail.com
SMTP_PORT       465
SMTP_SECURE     true
SMTP_USER       klaster@hotel-weisses-haus.com
SMTP_PASS       ********           (das echte Passwort)
MAIL_FROM       KLASTER <klaster@hotel-weisses-haus.com>
MAIL_TO         klaster@hotel-weisses-haus.com
```

`VITE_API_BASE` bleibt leer (Function läuft same-origin unter `/api`).

> Die lokale `.env` ist per `.gitignore` ausgeschlossen und wird nicht gepusht.

---

## Tracking (Meta Pixel)

Der Meta Pixel (`2187361092062134`) liegt in `index.html` und feuert beim Laden
`PageView`. Nach erfolgreichem Absenden wird zur Danke-Seite (`#danke`)
navigiert, die **genau einmal** das Standard-Event **`Lead`** auslöst
(abgesichert über ein Session-Flag — kein Lead bei direktem Aufruf von
`#danke`). Logik: [`src/utils/analytics.ts`](src/utils/analytics.ts) und
[`src/components/ThankYou.tsx`](src/components/ThankYou.tsx).

---

## Assets ablegen

| Was            | Wohin                                  | Pflicht | Fallback                                   |
| -------------- | -------------------------------------- | :-----: | ------------------------------------------ |
| Sound-Preview  | `public/audio/klaster-preview.mp3`     |   ja*   | Player zeigt dezente Fehlermeldung         |
| Hero-Bild      | `public/images/hero.jpg`               |  nein   | Dunkler Verlauf + Amber-Glow (sieht fertig aus) |
| OG-/Share-Bild | `public/images/og-klaster.jpg`         |  nein   | Kein Vorschaubild beim Teilen              |
| Eigene Fonts   | `public/fonts/*.woff2`                 |  nein   | Space Grotesk + Inter (Google Fonts)       |

\* Für das volle Erlebnis. Die Seite funktioniert auch ohne Audiodatei.

Details siehe `README.md` in den jeweiligen `public/`-Ordnern.

---

## Projektstruktur

```
src/
  App.tsx                      # Komposition aller Sektionen
  main.tsx                     # Einstiegspunkt
  data/event.ts                # Single source of truth: Daten & wiederholte Texte
  context/
    AudioPlayerContext.tsx     # Geteilter Audio-Player (1 Audio-Element für alle Buttons)
  hooks/
    useScrollReveal.ts         # Fade-in beim Scrollen (IntersectionObserver)
  utils/
    scroll.ts                  # Smooth-Scroll + Sektion-IDs
    submitApplication.ts       # Formular-Versand (Integrationen als Platzhalter)
  components/
    Hero.tsx                   # Erster Screen: Marke, Genres, CTAs
    Atmosphere.tsx             # Konzept: "Keine gewöhnliche Party."
    EventDetails.tsx           # Schnellfakten ("Details")
    AudioTeaser.tsx            # "Hör den Vibe" – Play/Pause/Mute + Waveform
    HowToEnter.tsx             # "Wie kommst du rein?" – 4 Schritte
    ApplicationForm.tsx        # Bewerbungsformular + Validierung + States
    FinalCta.tsx               # "Bereit für die Nacht?"
    Footer.tsx
  styles/global.css            # Design-Tokens, Reset, Buttons, Animationen
```

---

## Funnel-Logik (Reihenfolge der Sektionen)

1. **Hero** – Intrige & Atmosphäre, sofort sichtbare CTAs.
2. **Atmosphere** – Exklusivität: nicht für jeden.
3. **Details** – Schnellfakten zum Event.
4. **AudioTeaser** – Vibe hörbar machen.
5. **HowToEnter** – wie der Zugang funktioniert.
6. **ApplicationForm** – Bewerbung (Vorab-Anfrage, kein Ticketkauf).
7. **FinalCta** – letzter Anstoß zur Bewerbung.

Die primäre CTA führt überall per Smooth-Scroll zur Bewerbung (`#bewerbung`).

---

## Audio – wie es funktioniert

Browser blockieren Autoplay mit Ton. Umgesetzter Ablauf:

1. Beim Laden wird ein **stummer Autoplay** versucht (zum Vorpuffern).
2. Sichtbare Buttons **„Sound starten“** (Hero & AudioTeaser) starten den Ton
   beim **ersten Klick** (User-Geste).
3. Vollständige Steuerung: **Play/Pause** und **Mute/Unmute**.
4. Standard-Lautstärke ~**30 %** (`DEFAULT_VOLUME`).
5. Der Mute-Zustand wird in **localStorage** gespeichert.
6. Ein animierter **Waveform/Equalizer** zeigt den Zustand an.

Alle Buttons teilen sich **ein** Audio-Element (`AudioPlayerContext`), damit nie
zwei Spuren gleichzeitig laufen.

---

## Formular-Versand anbinden

Es gibt absichtlich **kein** Backend. Die Funktion `submitApplication()` in
`src/utils/submitApplication.ts` enthält fertige Code-Snippets für:

- **Formspree** (am schnellsten, kein Backend)
- **Telegram Bot API**
- **EmailJS**
- **Supabase**
- **Firebase / Firestore**
- **Netlify Forms / eigener Endpoint**

Ein Snippet auswählen, Zugangsdaten eintragen, den Platzhalter-Block ersetzen.
Geheimnisse via `import.meta.env.VITE_*` (Datei `.env.local`).

Bereits enthalten: Pflichtfeld-Validierung, Disabled-State während des
Sendens, Erfolgs-/Fehlermeldung, Schutz vor leerem Absenden und ein
**Honeypot-Feld** gegen Spam.

> Hinweis: Mindestalter ist auf **18** validiert
> (`validate()` in `ApplicationForm.tsx`) – bei Bedarf anpassen.

---

## Design

- Fast schwarzer Hintergrund (`#050505`/`#0A0A0A`), milchweißer Text
  (`#F4F0EA`), warmer Amber-/Gold-Akzent (`#C8944A`/`#E0A85A`).
- Großer, weit gesperrter `KLASTER`-Schriftzug, uppercase Kicker, feine Linien.
- Sanfte Fade-ins, leichter Hintergrund-Drift, pulsierender Audio-Indikator,
  Hover-Effekte – alles respektiert `prefers-reduced-motion`.
- Alle Farben/Abstände als CSS-Variablen in `src/styles/global.css`.

---

## Barrierefreiheit

Echte `<button>`/`<a>`, Labels für alle Felder, Fokus-Stile, ausreichender
Kontrast, Audio per Tastatur bedienbar, Status-/Fehlermeldungen mit
`role="status"`/`role="alert"`. Information wird nie nur über Farbe vermittelt.

# Fonts

Standardmäßig nutzt das Projekt **Space Grotesk** (Display/Logo) und
**Inter** (Fließtext), geladen über Google Fonts in `index.html`.

## Eigene Schriften einbinden
Wenn gebrandete Schriftdateien geliefert werden:

1. Dateien hier ablegen, z. B.:
   ```
   public/fonts/klaster-display.woff2
   public/fonts/klaster-body.woff2
   ```
2. In `src/styles/global.css` die `@font-face`-Blöcke einkommentieren
   (sind oben in der Datei vorbereitet).
3. Die Variablen `--font-display` und `--font-body` auf die neuen
   Schriftnamen setzen.
4. Optional den Google-Fonts-`<link>` in `index.html` entfernen.

Empfohlenes Format: **WOFF2** mit `font-display: swap`.

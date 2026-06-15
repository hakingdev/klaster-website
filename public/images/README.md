# Images

Optionale, aber empfohlene Dateien:

| Datei                  | Verwendung                                            |
| ---------------------- | ----------------------------------------------------- |
| `hero.jpg`             | Atmosphärisches Hintergrundbild der Hero-Sektion      |
| `og-klaster.jpg`       | Open-Graph-/Social-Sharing-Bild (1200 × 630 px)       |

## hero.jpg
Wird in `src/components/Hero.module.css` (Klasse `.bg`) referenziert. Ohne
Bild greift ein dunkler Verlauf mit warmem Amber-Glow als Fallback – die
Seite sieht also auch ohne Foto vollständig aus.

Empfehlung: dunkle Nachtaufnahme mit Menschen, Licht und Schatten,
warmes/goldenes Licht. Querformat, mind. 1920 px Breite, optimiert
(WebP/JPG, < 400 KB).

## og-klaster.jpg
Referenziert in `index.html` (`og:image` / `twitter:image`). 1200 × 630 px.
Dunkel, mit großem "KLASTER"-Schriftzug für die Vorschau in Messengern und
sozialen Netzwerken.

> Bilder zweiter Ordnung werden im Markup mit `loading="lazy"` geladen.
> Das Hero-Bild ist ein CSS-Hintergrund und sollte gut komprimiert sein.

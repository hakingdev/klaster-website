# Audio

Lege hier die Sound-Vorschau ab:

```
public/audio/klaster-preview.mp3
```

Der Pfad ist in `src/data/event.ts` (`audioSrc`) hinterlegt und wird vom
`AudioTeaser` sowie dem Hero-Button "Sound starten" verwendet.

Hinweise:
- Empfohlen: kurze, geloopte Narrezung (~30–60 s), MP3, ~128–192 kbps.
- Solange keine Datei vorhanden ist, zeigt der Player eine dezente
  Fehlermeldung an (kein Absturz).
- Die Lautstärke ist bewusst auf ~30 % voreingestellt
  (siehe `DEFAULT_VOLUME` in `src/context/AudioPlayerContext.tsx`).

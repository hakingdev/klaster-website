/**
 * Single source of truth for all event data and copy that is reused across
 * components. Keep marketing copy that appears in more than one place here so
 * it never drifts out of sync.
 */

export interface EventDetailItem {
  /** Short id, also used as a hook for the inline icon. */
  id: string
  label: string
}

export interface HowToStep {
  step: number
  title: string
}

export type GuestCountOption = 'alleine' | 'mit_1' | 'mit_2' | 'gruppe'

export interface SelectOption<T extends string = string> {
  value: T
  label: string
}

export interface MusicTasteOption {
  value: string
  label: string
}

/** Field metadata used to render and validate the application form. */
export interface ApplicationFields {
  guestCountOptions: SelectOption<GuestCountOption>[]
  musicTasteOptions: MusicTasteOption[]
}

export const event = {
  brand: 'KLASTER',
  tagline: 'Private Electronic Music Event',
  date: '17.07.2026',
  dateLabel: '17. Juli 2026',
  city: 'Bad Kissingen',
  price: '10 €',
  genres: ['Melodic Techno', 'Afro House', 'Deep House'] as const,
  genresLine: 'Melodic Techno · Afro House · Deep House',
  locationPolicy: 'Einlassort nur für bestätigte Gäste',
  audioSrc: '/audio/klaster-preview.mp3',

  /** Quick-facts block ("Details"). */
  details: [
    { id: 'event', label: 'Private Event' },
    { id: 'date', label: '17.07.2026' },
    { id: 'city', label: 'Bad Kissingen' },
    { id: 'price', label: 'Eintritt: 10 €' },
    { id: 'genres', label: 'Melodic Techno / Afro House / Deep House' },
    { id: 'location', label: 'Einlassort nur für bestätigte Gäste' },
  ] as EventDetailItem[],

  /** "Wie kommst du rein?" steps. */
  howToSteps: [
    { step: 1, title: 'Bewerbung ausfüllen' },
    { step: 2, title: 'Wir prüfen die Gästeliste' },
    { step: 3, title: 'Bestätigung erhalten' },
    { step: 4, title: 'Geheimer Einlassort folgt wenige Tage vorher' },
  ] as HowToStep[],

  /** Form configuration. */
  applicationFields: {
    guestCountOptions: [
      { value: 'alleine', label: 'Alleine' },
      { value: 'mit_1', label: 'Mit 1 Person' },
      { value: 'mit_2', label: 'Mit 2 Personen' },
      { value: 'gruppe', label: 'Gruppe' },
    ],
    musicTasteOptions: [
      { value: 'melodic_techno', label: 'Melodic Techno' },
      { value: 'afro_house', label: 'Afro House' },
      { value: 'deep_house', label: 'Deep House' },
      { value: 'tech_house', label: 'Tech House' },
      { value: 'other', label: 'Other' },
    ],
  } as ApplicationFields,
} as const

export type Event = typeof event

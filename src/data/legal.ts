/**
 * Legal content (Impressum & Datenschutz), adapted to the KLASTER site.
 *
 * Legal entity is unchanged (Weisses Haus GmbH). Site-specific references that
 * applied to the Bun & Fish restaurant / Lieferando ordering have been adapted
 * to the KLASTER guest-list application form.
 *
 * Note: this is content provided by the operator — not legal advice. Have it
 * reviewed by the operator before going live.
 */

export type LegalBlock =
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'address'; lines: string[] }

export interface LegalDoc {
  id: 'impressum' | 'datenschutz'
  title: string
  intro?: string
  blocks: LegalBlock[]
  updated?: string
}

export const impressum: LegalDoc = {
  id: 'impressum',
  title: 'Impressum',
  intro:
    'KLASTER ist ein privates Veranstaltungsformat der Weisses Haus GmbH.',
  blocks: [
    { type: 'heading', text: 'Angaben gemäß § 5 DDG' },
    {
      type: 'address',
      lines: ['Weisses Haus GmbH', 'Kurhausstraße 11A', '97688 Bad Kissingen'],
    },
    { type: 'heading', text: 'Betriebsstätte Bun & Fish' },
    { type: 'address', lines: ['Marktplatz 5', '97688 Bad Kissingen'] },
    { type: 'heading', text: 'Registereintrag' },
    {
      type: 'list',
      items: [
        'Handelsregister: HRB 9292',
        'Registergericht: Registergericht Schweinfurt',
      ],
    },
    { type: 'heading', text: 'Vertreten durch' },
    { type: 'paragraph', text: 'A. Samsonov' },
    { type: 'heading', text: 'Kontakt' },
    {
      type: 'list',
      items: ['Telefon: 0971 72730', 'E-Mail: info@bunfish.de'],
    },
    { type: 'heading', text: 'Umsatzsteuer-ID' },
    {
      type: 'paragraph',
      text: 'Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:',
    },
    { type: 'paragraph', text: 'Steuernr.: 205/142/20396' },
    { type: 'heading', text: 'Streitschlichtung' },
    {
      type: 'paragraph',
      text: 'Die frühere Plattform der Europäischen Kommission zur Online-Streitbeilegung wurde zum 20. Juli 2025 eingestellt. Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.',
    },
    { type: 'heading', text: 'Haftung für Inhalte' },
    {
      type: 'paragraph',
      text: 'Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Wir sind jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.',
    },
    {
      type: 'paragraph',
      text: 'Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.',
    },
    { type: 'heading', text: 'Haftung für Links' },
    {
      type: 'paragraph',
      text: 'Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.',
    },
    {
      type: 'paragraph',
      text: 'Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.',
    },
    { type: 'heading', text: 'Urheberrecht' },
    {
      type: 'paragraph',
      text: 'Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors beziehungsweise Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.',
    },
    {
      type: 'paragraph',
      text: 'Soweit Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Sollten Sie dennoch auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.',
    },
  ],
}

export const datenschutz: LegalDoc = {
  id: 'datenschutz',
  title: 'Datenschutz',
  intro:
    'Wir freuen uns über Ihr Interesse an KLASTER. Der Schutz Ihrer personenbezogenen Daten ist uns wichtig. Nachfolgend informieren wir Sie darüber, welche Daten wir beim Besuch dieser Website, bei der Bewerbung zur Gästeliste und bei der Kontaktaufnahme verarbeiten.',
  updated: 'Stand: Juni 2026',
  blocks: [
    { type: 'heading', text: '1. Verantwortlicher für die Datenverarbeitung' },
    {
      type: 'address',
      lines: ['Weisses Haus GmbH', 'Kurhausstraße 11A', '97688 Bad Kissingen'],
    },
    {
      type: 'address',
      lines: ['Betriebsstätte Bun & Fish', 'Marktplatz 5', '97688 Bad Kissingen'],
    },
    {
      type: 'list',
      items: [
        'Telefon: 0971 72730',
        'E-Mail: info@bunfish.de',
        'Datenschutzbeauftragter: A. Samsonov',
      ],
    },
    { type: 'heading', text: '2. Zwecke und Rechtsgrundlagen der Datenverarbeitung' },
    {
      type: 'paragraph',
      text: 'Wir verarbeiten personenbezogene Daten zu folgenden Zwecken:',
    },
    {
      type: 'list',
      items: [
        'Betrieb, Sicherheit und Darstellung dieser Website',
        'Bearbeitung von Bewerbungen zur Gästeliste über das Kontaktformular',
        'Bearbeitung von Anfragen per E-Mail oder Telefon',
        'Erfüllung gesetzlicher Verpflichtungen',
        'Marketing und Werbung, soweit Sie hierin eingewilligt haben',
      ],
    },
    {
      type: 'paragraph',
      text: 'Rechtsgrundlagen der Verarbeitung sind insbesondere:',
    },
    {
      type: 'list',
      items: [
        'Art. 6 Abs. 1 lit. a DSGVO, soweit Sie eine Einwilligung erteilt haben',
        'Art. 6 Abs. 1 lit. b DSGVO, soweit die Verarbeitung zur Durchführung vorvertraglicher Maßnahmen oder eines Vertrags erforderlich ist',
        'Art. 6 Abs. 1 lit. c DSGVO, soweit eine rechtliche Verpflichtung besteht',
        'Art. 6 Abs. 1 lit. f DSGVO auf Grundlage unserer berechtigten Interessen an einem sicheren und nutzerfreundlichen Internetauftritt',
      ],
    },
    { type: 'heading', text: '3. Arten der verarbeiteten Daten' },
    {
      type: 'paragraph',
      text: 'Je nach Nutzung unserer Website können insbesondere folgende Daten verarbeitet werden:',
    },
    {
      type: 'list',
      items: [
        'technische Zugriffsdaten, zum Beispiel IP-Adresse, Datum und Uhrzeit des Zugriffs, Browsertyp, Betriebssystem und aufgerufene Seiten',
        'Angaben aus dem Bewerbungsformular: Name, Alter, Stadt (optional), Kontakt (z. B. Instagram, Telegram, WhatsApp oder E-Mail), Begleitung, Musikgeschmack und Ihre Nachricht',
        'Kontaktdaten, zum Beispiel Name, E-Mail-Adresse und Telefonnummer, wenn Sie uns kontaktieren',
        'Inhalte Ihrer Anfrage oder Kommunikation',
        'Daten, die beim Aufruf externer Dienste wie Google Fonts technisch übertragen werden',
      ],
    },
    { type: 'heading', text: '4. Empfänger der Daten' },
    {
      type: 'paragraph',
      text: 'Ihre Daten können an folgende Empfänger übermittelt werden:',
    },
    {
      type: 'list',
      items: [
        'Hosting- und IT-Dienstleister, die für den Betrieb der Website eingesetzt werden',
        'E-Mail- bzw. SMTP-Dienstleister, über die uns Ihre Bewerbung als E-Mail zugestellt wird',
        'externe Dienstleister, soweit dies für Kommunikation, Sicherheit oder technische Darstellung erforderlich ist',
        'Behörden und öffentliche Stellen, soweit wir gesetzlich hierzu verpflichtet sind',
      ],
    },
    {
      type: 'paragraph',
      text: 'Eine Übermittlung in Drittländer findet nur statt, soweit dies für eingesetzte externe Dienste erforderlich ist und die datenschutzrechtlichen Voraussetzungen hierfür vorliegen.',
    },
    { type: 'heading', text: '5. Externe Dienste und Inhalte' },
    {
      type: 'paragraph',
      text: 'Auf unserer Website können externe Inhalte eingebunden sein. Dazu gehören insbesondere Schriftarten von Google Fonts. Beim Aufruf solcher Inhalte kann Ihre IP-Adresse an den jeweiligen Anbieter übertragen werden. Für die weitere Verarbeitung gelten zusätzlich die Datenschutzinformationen der jeweiligen Anbieter.',
    },
    { type: 'heading', text: '6. Rechte der betroffenen Personen' },
    {
      type: 'paragraph',
      text: 'Sie haben im Rahmen der gesetzlichen Voraussetzungen folgende Rechte:',
    },
    {
      type: 'list',
      items: [
        'Auskunftsrecht gemäß Art. 15 DSGVO',
        'Recht auf Berichtigung gemäß Art. 16 DSGVO',
        'Recht auf Löschung gemäß Art. 17 DSGVO',
        'Recht auf Einschränkung der Verarbeitung gemäß Art. 18 DSGVO',
        'Recht auf Datenübertragbarkeit gemäß Art. 20 DSGVO',
        'Widerspruchsrecht gemäß Art. 21 DSGVO',
        'Widerrufsrecht gemäß Art. 7 Abs. 3 DSGVO, soweit die Verarbeitung auf einer Einwilligung beruht',
      ],
    },
    {
      type: 'paragraph',
      text: 'Zudem haben Sie das Recht, sich bei einer Datenschutzaufsichtsbehörde zu beschweren.',
    },
    { type: 'heading', text: '7. Speicherdauer' },
    {
      type: 'paragraph',
      text: 'Wir speichern personenbezogene Daten nur so lange, wie dies für die jeweiligen Zwecke erforderlich ist oder gesetzliche Aufbewahrungsfristen bestehen. Kriterien für die Speicherdauer sind insbesondere gesetzliche Fristen, die Dauer der Bearbeitung einer Bewerbung oder Anfrage sowie unsere berechtigten Interessen an Dokumentation und Sicherheit.',
    },
    { type: 'heading', text: '8. Cookies und ähnliche Technologien' },
    {
      type: 'paragraph',
      text: 'Unsere Website kann technisch notwendige Cookies oder vergleichbare Technologien verwenden. Externe Dienste können eigene Cookies oder ähnliche Technologien einsetzen, wenn Sie entsprechende Inhalte nutzen. Sie können Cookies in den Einstellungen Ihres Browsers einschränken oder löschen.',
    },
    { type: 'heading', text: '9. Automatisierte Entscheidungsfindung und Profiling' },
    {
      type: 'paragraph',
      text: 'Eine automatisierte Entscheidungsfindung einschließlich Profiling findet durch uns nicht statt. Die Auswahl der Gäste erfolgt manuell und persönlich.',
    },
    { type: 'heading', text: '10. Datensicherheit' },
    {
      type: 'paragraph',
      text: 'Wir setzen technische und organisatorische Sicherheitsmaßnahmen ein, um Ihre Daten gegen Verlust, Missbrauch und unbefugten Zugriff zu schützen.',
    },
    { type: 'heading', text: '11. Änderungen dieser Datenschutzerklärung' },
    {
      type: 'paragraph',
      text: 'Wir behalten uns vor, diese Datenschutzerklärung zu ändern, wenn technische, rechtliche oder organisatorische Anpassungen erforderlich werden.',
    },
  ],
}

export const legalDocs = { impressum, datenschutz }

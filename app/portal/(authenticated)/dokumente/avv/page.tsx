"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Download, Printer } from "lucide-react";

export default function AVVPage() {
  const contentRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div className="flex items-center justify-between mb-8 print:hidden">
        <Link
          href="/portal/dokumente"
          className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Zurück zu Dokumente
        </Link>
        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gray-900 text-white text-sm font-bold hover:bg-gray-800 transition-colors"
        >
          <Printer className="w-4 h-4" />
          Als PDF speichern / Drucken
        </button>
      </div>

      <div ref={contentRef} className="bg-white rounded-2xl border border-gray-200/60 p-8 md:p-12 print:border-0 print:p-0 print:rounded-none">
        {/* Header */}
        <div className="text-center mb-10 print:mb-8">
          <div className="flex items-center justify-center gap-2.5 mb-4 print:mb-2">
            <svg className="w-6 h-6" viewBox="0 0 32 32" fill="none">
              <path d="M16 0C16 8.83656 8.83656 16 0 16C8.83656 16 16 23.1634 16 32C16 23.1634 23.1634 16 32 16C23.1634 16 16 8.83656 16 0Z" fill="currentColor" />
            </svg>
            <span className="text-lg font-headline font-bold tracking-tighter">defuse digital</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight mb-2">
            Auftragsverarbeitungsvereinbarung
          </h1>
          <p className="text-sm text-gray-400 font-medium">
            gemäß Art. 28 DSGVO — Stand: April 2026
          </p>
        </div>

        <div className="prose prose-sm max-w-none text-gray-600 leading-[1.9] print:text-[11px] print:leading-[1.7]">
          <h2 className="text-base font-extrabold text-gray-900 mb-3 print:text-sm">§ 1 Gegenstand, Dauer und Parteien</h2>
          <p>
            <strong>Auftragsverarbeiter:</strong> LUCRAM MEDIA GmbH (handelnd als „defuse digital"),
            Alte Chemnitzer Straße 4, 09573 Augustusburg, vertreten durch die Geschäftsführung.
          </p>
          <p>
            <strong>Auftraggeber (Verantwortlicher):</strong> Der im Kundenportal registrierte Vertragspartner.
          </p>
          <p>
            Diese Vereinbarung gilt für die Dauer der gesamten Geschäftsbeziehung und endet automatisch mit
            Beendigung des letzten aktiven Auftrags. Sie regelt die Verarbeitung personenbezogener Daten,
            die der Auftragsverarbeiter im Auftrag des Verantwortlichen durchführt.
          </p>

          <h2 className="text-base font-extrabold text-gray-900 mb-3 mt-8 print:text-sm print:mt-5">§ 2 Art, Zweck und Umfang der Verarbeitung</h2>
          <p>Die Verarbeitung erfolgt im Rahmen folgender Leistungen:</p>
          <ul>
            <li>Konzeption, Design und Entwicklung von Websites und Web-Applikationen</li>
            <li>Hosting und Betrieb von Websites auf der Plattform Vercel</li>
            <li>Integration und Pflege von Content-Management-Systemen (Sanity CMS)</li>
            <li>Suchmaschinenoptimierung (SEO) und Web-Performance-Analyse</li>
            <li>Einrichtung und Pflege von Datenbanken und Analytics-Systemen</li>
            <li>Laufende Wartung, Support und technische Betreuung</li>
          </ul>
          <p><strong>Kategorien betroffener Personen:</strong></p>
          <ul>
            <li>Kunden und Interessenten des Auftraggebers (Website-Besucher)</li>
            <li>Mitarbeiter und Ansprechpartner des Auftraggebers</li>
            <li>Newsletter-Abonnenten und Kontaktformular-Nutzer</li>
          </ul>
          <p><strong>Kategorien personenbezogener Daten:</strong></p>
          <ul>
            <li>Kontaktdaten: Name, E-Mail-Adresse, Telefonnummer, Anschrift</li>
            <li>Nutzungsdaten: IP-Adressen, Browser-/Geräteinformationen, Seitenaufrufe, Referrer</li>
            <li>Kommunikationsdaten: Kontaktformular-Einträge, Newsletter-Anmeldungen</li>
            <li>Inhaltsdaten: Vom Auftraggeber bereitgestellte Texte, Bilder und Dokumente</li>
            <li>CMS-Zugangsdaten: Benutzernamen und E-Mail-Adressen der Redakteure</li>
          </ul>

          <h2 className="text-base font-extrabold text-gray-900 mb-3 mt-8 print:text-sm print:mt-5">§ 3 Weisungsbefugnis</h2>
          <p>
            Der Auftragsverarbeiter verarbeitet personenbezogene Daten ausschließlich auf dokumentierte Weisung
            des Auftraggebers (Art. 28 Abs. 3 lit. a DSGVO). Weisungen werden in Textform erteilt (E-Mail,
            Kundenportal-Nachricht oder schriftlich). Der Auftragsverarbeiter informiert den Auftraggeber
            unverzüglich, wenn eine Weisung nach seiner Auffassung gegen datenschutzrechtliche Vorschriften verstößt.
          </p>

          <h2 className="text-base font-extrabold text-gray-900 mb-3 mt-8 print:text-sm print:mt-5">§ 4 Technische und organisatorische Maßnahmen (TOMs)</h2>
          <p>Der Auftragsverarbeiter gewährleistet gem. Art. 32 DSGVO insbesondere:</p>
          <ul>
            <li><strong>Verschlüsselung:</strong> TLS 1.3 für alle Datenübertragungen, verschlüsselte Backups</li>
            <li><strong>Zugriffskontrolle:</strong> Rollenbasierte Zugriffsrechte, SSH-Key-Authentifizierung, 2FA für alle Systeme</li>
            <li><strong>Pseudonymisierung:</strong> Wo technisch möglich, insbesondere bei Analytics-Daten</li>
            <li><strong>Verfügbarkeit:</strong> Automatische Backups, Hosting auf global verteilter CDN-Infrastruktur (Vercel Edge Network)</li>
            <li><strong>Wiederherstellbarkeit:</strong> Git-basierte Versionierung aller Code-Änderungen, Datenbank-Snapshots</li>
            <li><strong>Vertraulichkeit:</strong> Alle Mitarbeiter sind auf die Vertraulichkeit verpflichtet (§ 53 BDSG)</li>
            <li><strong>Regelmäßige Überprüfung:</strong> Automatisierte Lighthouse-Audits, Dependency-Scanning, Security Headers</li>
          </ul>

          <h2 className="text-base font-extrabold text-gray-900 mb-3 mt-8 print:text-sm print:mt-5">§ 5 Unterauftragnehmer</h2>
          <p>
            Der Auftraggeber stimmt dem Einsatz folgender Unterauftragnehmer zu. Der Auftragsverarbeiter
            stellt sicher, dass mit jedem Unterauftragnehmer ein Vertrag gem. Art. 28 Abs. 4 DSGVO besteht:
          </p>
          <table className="w-full text-xs border-collapse border border-gray-200 my-4">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left p-2 border border-gray-200 font-bold text-gray-900">Unternehmen</th>
                <th className="text-left p-2 border border-gray-200 font-bold text-gray-900">Leistung</th>
                <th className="text-left p-2 border border-gray-200 font-bold text-gray-900">Standort</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="p-2 border border-gray-200">Vercel Inc.</td><td className="p-2 border border-gray-200">Website-Hosting, CDN, Edge Functions</td><td className="p-2 border border-gray-200">USA (EU SCCs)</td></tr>
              <tr><td className="p-2 border border-gray-200">Sanity AS</td><td className="p-2 border border-gray-200">Headless CMS, Content-Speicherung</td><td className="p-2 border border-gray-200">Norwegen (EWR)</td></tr>
              <tr><td className="p-2 border border-gray-200">Ionos SE</td><td className="p-2 border border-gray-200">E-Mail-Hosting, DNS</td><td className="p-2 border border-gray-200">Deutschland</td></tr>
              <tr><td className="p-2 border border-gray-200">Notion Labs Inc.</td><td className="p-2 border border-gray-200">Projektmanagement, Kundenportal</td><td className="p-2 border border-gray-200">USA (EU SCCs)</td></tr>
              <tr><td className="p-2 border border-gray-200">Hetzner Online GmbH</td><td className="p-2 border border-gray-200">Server-Infrastruktur (falls zutreffend)</td><td className="p-2 border border-gray-200">Deutschland</td></tr>
            </tbody>
          </table>
          <p>
            Bei Unterauftragnehmern mit Sitz außerhalb des EWR (USA) sind EU-Standardvertragsklauseln (SCCs)
            gem. Durchführungsbeschluss (EU) 2021/914 abgeschlossen. Der Auftragsverarbeiter informiert den
            Auftraggeber über jede beabsichtigte Änderung und räumt 14 Tage Einspruchsfrist ein.
          </p>

          <h2 className="text-base font-extrabold text-gray-900 mb-3 mt-8 print:text-sm print:mt-5">§ 6 Pflichten des Auftraggebers</h2>
          <p>
            Der Auftraggeber ist als Verantwortlicher für die Rechtmäßigkeit der Datenverarbeitung
            verantwortlich. Er stellt sicher, dass: (a) betroffene Personen ordnungsgemäß informiert
            wurden (Datenschutzerklärung), (b) erforderliche Einwilligungen eingeholt wurden
            (Cookie-Banner, Newsletter-Opt-In), (c) er den Auftragsverarbeiter unverzüglich über
            Betroffenenrechte-Anfragen informiert.
          </p>

          <h2 className="text-base font-extrabold text-gray-900 mb-3 mt-8 print:text-sm print:mt-5">§ 7 Meldepflichten und Betroffenenrechte</h2>
          <p>
            Der Auftragsverarbeiter unterstützt den Auftraggeber bei der Erfüllung der Betroffenenrechte
            (Art. 15–22 DSGVO) und bei Datenschutzverletzungen (Art. 33, 34 DSGVO). Im Falle einer
            Verletzung des Schutzes personenbezogener Daten informiert der Auftragsverarbeiter den
            Auftraggeber unverzüglich, spätestens innerhalb von 24 Stunden nach Bekanntwerden.
          </p>

          <h2 className="text-base font-extrabold text-gray-900 mb-3 mt-8 print:text-sm print:mt-5">§ 8 Kontrollrechte und Audits</h2>
          <p>
            Der Auftraggeber hat das Recht, die Einhaltung dieser Vereinbarung zu überprüfen — durch
            Einsichtnahme in Nachweise, Zertifikate und Audit-Berichte oder durch Vor-Ort-Kontrollen
            nach angemessener Vorankündigung.
          </p>

          <h2 className="text-base font-extrabold text-gray-900 mb-3 mt-8 print:text-sm print:mt-5">§ 9 Löschung und Rückgabe</h2>
          <p>
            Nach Beendigung der Leistungserbringung löscht der Auftragsverarbeiter sämtliche
            personenbezogenen Daten und bestätigt die Löschung schriftlich — es sei denn, gesetzliche
            Aufbewahrungspflichten (§ 257 HGB, § 147 AO) stehen dem entgegen. Auf Wunsch erfolgt
            statt Löschung eine Rückgabe in einem gängigen Format.
          </p>

          <h2 className="text-base font-extrabold text-gray-900 mb-3 mt-8 print:text-sm print:mt-5">§ 10 Haftung</h2>
          <p>
            Die Haftung richtet sich nach Art. 82 DSGVO. Der Auftragsverarbeiter haftet für Schäden,
            die durch eine nicht den Vorgaben der DSGVO entsprechende Verarbeitung verursacht werden
            oder wenn er außerhalb oder entgegen den rechtmäßigen Weisungen des Auftraggebers gehandelt hat.
          </p>
        </div>

        {/* Signature area for print */}
        <div className="mt-12 pt-8 border-t border-gray-200 hidden print:block">
          <div className="grid grid-cols-2 gap-16">
            <div>
              <p className="text-xs text-gray-400 mb-12">Ort, Datum</p>
              <div className="border-b border-gray-900 mb-2" />
              <p className="text-xs text-gray-600">Auftraggeber (Verantwortlicher)</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-12">Ort, Datum</p>
              <div className="border-b border-gray-900 mb-2" />
              <p className="text-xs text-gray-600">defuse digital / LUCRAM MEDIA GmbH</p>
            </div>
          </div>
        </div>
      </div>

      {/* Print hint */}
      <p className="text-center text-xs text-gray-400 font-medium mt-6 print:hidden">
        Tipp: Wählen Sie beim Drucken „Als PDF speichern" um das Dokument als PDF herunterzuladen.
      </p>
    </>
  );
}

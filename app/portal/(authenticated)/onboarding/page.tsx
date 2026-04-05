"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Check, FileText, Download, ArrowRight } from "lucide-react";

const STEPS = ["Willkommen", "AVV unterzeichnen", "Service Agreement", "Fertig"];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [signName, setSignName] = useState("");
  const [signChecked, setSignChecked] = useState(false);
  const [signing, setSigning] = useState(false);
  const [signed, setSigned] = useState(false);

  const handleSignAVV = async () => {
    if (!signName.trim() || !signChecked) return;
    setSigning(true);
    await fetch("/api/portal/onboarding", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "sign-avv", signedBy: signName.trim() }),
    });
    setSigned(true);
    setSigning(false);
    setTimeout(() => setStep(2), 800);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="flex items-center gap-2 mb-14">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center flex-1 last:flex-none">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-medium shrink-0 ${
                i < step
                  ? "bg-gray-900 text-white"
                  : i === step
                  ? "bg-gray-900 text-white ring-2 ring-gray-900/10"
                  : "bg-gray-200 text-gray-400"
              }`}
            >
              {i < step ? (
                <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
              ) : (
                <span>{i + 1}</span>
              )}
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`h-px flex-1 mx-2 ${
                  i < step ? "bg-gray-900" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 0: Welcome with beautiful banner */}
      {step === 0 && (
        <div>
          {/* Full-width jellyfish banner */}
          <div className="relative rounded-2xl overflow-hidden mb-10" style={{ minHeight: "240px" }}>
            <Image
              src="/portal-jellyfish.jpg"
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 700px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-gray-950/40 to-gray-950/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-950/30 to-transparent" />
            <div className="relative z-10 p-10 flex flex-col justify-end h-full" style={{ minHeight: "240px" }}>
              <p className="text-xs text-white/40 uppercase tracking-wider mb-2">Kundenportal</p>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">
                Willkommen
              </h1>
              <p className="text-sm text-white/50">
                Ihr persönlicher Bereich bei defuse digital.
              </p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-500 leading-relaxed max-w-md mx-auto mb-5">
              In Ihrem Portal sehen Sie jederzeit den Status Ihrer Projekte,
              können Dokumente einsehen, Nachrichten senden und
              Support-Tickets erstellen.
            </p>
            <p className="text-sm text-gray-500 leading-relaxed max-w-md mx-auto mb-12">
              Bevor es losgeht, bitten wir Sie um die Unterzeichnung unserer
              Auftragsverarbeitungsvereinbarung (AVV) — das ist gesetzlich
              vorgeschrieben und schützt Ihre Daten.
            </p>
            <button
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Weiter
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 1: AVV */}
      {step === 1 && (
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-2">
            Auftragsverarbeitungsvereinbarung
          </h1>
          <p className="text-sm text-gray-500 mb-8">
            Gemäß Art. 28 DSGVO — bitte lesen und unterzeichnen.
          </p>

          {/* AVV Content */}
          <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-6 md:p-8 mb-6 max-h-[400px] overflow-y-auto text-sm text-gray-600 leading-[1.8]">
            <p className="text-xs text-gray-400 mb-5">
              Auftragsverarbeitung gem. Art. 28 DSGVO — Stand: April 2026
            </p>

            <h2 className="text-sm font-bold text-gray-900 mb-2">
              § 1 Gegenstand, Dauer und Parteien
            </h2>
            <p className="mb-2">
              <strong>Auftragsverarbeiter:</strong> LUCRAM MEDIA GmbH (handelnd
              als „defuse digital"), Alte Chemnitzer Straße 4, 09573
              Augustusburg, vertreten durch die Geschäftsführung.
            </p>
            <p className="mb-2">
              <strong>Auftraggeber (Verantwortlicher):</strong> Der im
              Kundenportal registrierte Vertragspartner.
            </p>
            <p className="mb-4">
              Diese Vereinbarung gilt für die Dauer der gesamten
              Geschäftsbeziehung und endet automatisch mit Beendigung des
              letzten aktiven Auftrags. Sie regelt die Verarbeitung
              personenbezogener Daten, die der Auftragsverarbeiter im Auftrag
              des Verantwortlichen durchführt.
            </p>

            <h2 className="text-sm font-bold text-gray-900 mb-2">
              § 2 Art, Zweck und Umfang der Verarbeitung
            </h2>
            <p className="mb-2">
              Die Verarbeitung erfolgt im Rahmen folgender Leistungen:
            </p>
            <ul className="list-disc pl-5 mb-2 space-y-1">
              <li>
                Konzeption, Design und Entwicklung von Websites und
                Web-Applikationen
              </li>
              <li>Hosting und Betrieb von Websites auf der Plattform Vercel</li>
              <li>
                Integration und Pflege von Content-Management-Systemen (Sanity
                CMS)
              </li>
              <li>
                Suchmaschinenoptimierung (SEO) und Web-Performance-Analyse
              </li>
              <li>
                Einrichtung und Pflege von Datenbanken und Analytics-Systemen
              </li>
              <li>Laufende Wartung, Support und technische Betreuung</li>
            </ul>
            <p className="mb-2">
              <strong>Kategorien betroffener Personen:</strong>
            </p>
            <ul className="list-disc pl-5 mb-2 space-y-1">
              <li>
                Kunden und Interessenten des Auftraggebers (Website-Besucher)
              </li>
              <li>Mitarbeiter und Ansprechpartner des Auftraggebers</li>
              <li>Newsletter-Abonnenten und Kontaktformular-Nutzer</li>
            </ul>
            <p className="mb-2">
              <strong>Kategorien personenbezogener Daten:</strong>
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-1">
              <li>
                Kontaktdaten: Name, E-Mail-Adresse, Telefonnummer, Anschrift
              </li>
              <li>
                Nutzungsdaten: IP-Adressen, Browser-/Geräteinformationen,
                Seitenaufrufe, Referrer
              </li>
              <li>
                Kommunikationsdaten: Kontaktformular-Einträge,
                Newsletter-Anmeldungen
              </li>
              <li>
                Inhaltsdaten: Vom Auftraggeber bereitgestellte Texte, Bilder und
                Dokumente
              </li>
              <li>
                CMS-Zugangsdaten: Benutzernamen und E-Mail-Adressen der
                Redakteure
              </li>
            </ul>

            <h2 className="text-sm font-bold text-gray-900 mb-2">
              § 3 Weisungsbefugnis
            </h2>
            <p className="mb-4">
              Der Auftragsverarbeiter verarbeitet personenbezogene Daten
              ausschließlich auf dokumentierte Weisung des Auftraggebers (Art.
              28 Abs. 3 lit. a DSGVO). Weisungen werden in Textform erteilt
              (E-Mail, Kundenportal-Nachricht oder schriftlich). Der
              Auftragsverarbeiter informiert den Auftraggeber unverzüglich, wenn
              eine Weisung nach seiner Auffassung gegen datenschutzrechtliche
              Vorschriften verstößt.
            </p>

            <h2 className="text-sm font-bold text-gray-900 mb-2">
              § 4 Technische und organisatorische Maßnahmen (TOMs)
            </h2>
            <p className="mb-2">
              Der Auftragsverarbeiter gewährleistet gem. Art. 32 DSGVO
              insbesondere:
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-1">
              <li>
                <strong>Verschlüsselung:</strong> TLS 1.3 für alle
                Datenübertragungen, verschlüsselte Backups
              </li>
              <li>
                <strong>Zugriffskontrolle:</strong> Rollenbasierte
                Zugriffsrechte, SSH-Key-Authentifizierung, 2FA für alle Systeme
              </li>
              <li>
                <strong>Pseudonymisierung:</strong> Wo technisch möglich,
                insbesondere bei Analytics-Daten
              </li>
              <li>
                <strong>Verfügbarkeit:</strong> Automatische Backups, Hosting auf
                global verteilter CDN-Infrastruktur (Vercel Edge Network)
              </li>
              <li>
                <strong>Wiederherstellbarkeit:</strong> Git-basierte
                Versionierung aller Code-Änderungen, Datenbank-Snapshots
              </li>
              <li>
                <strong>Vertraulichkeit:</strong> Alle Mitarbeiter sind auf die
                Vertraulichkeit verpflichtet (§ 53 BDSG)
              </li>
              <li>
                <strong>Regelmäßige Überprüfung:</strong> Automatisierte
                Lighthouse-Audits, Dependency-Scanning, Security Headers
              </li>
            </ul>

            <h2 className="text-sm font-bold text-gray-900 mb-2">
              § 5 Unterauftragnehmer
            </h2>
            <p className="mb-2">
              Der Auftraggeber stimmt dem Einsatz folgender Unterauftragnehmer
              zu. Der Auftragsverarbeiter stellt sicher, dass mit jedem
              Unterauftragnehmer ein Vertrag gem. Art. 28 Abs. 4 DSGVO besteht:
            </p>
            <table className="w-full text-xs mb-4 border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 font-medium text-gray-900">
                    Unternehmen
                  </th>
                  <th className="text-left py-2 font-medium text-gray-900">
                    Leistung
                  </th>
                  <th className="text-left py-2 font-medium text-gray-900">
                    Standort
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="py-2">Vercel Inc.</td>
                  <td>Website-Hosting, CDN, Edge Functions</td>
                  <td>USA (EU SCCs)</td>
                </tr>
                <tr>
                  <td className="py-2">Sanity AS</td>
                  <td>Headless CMS, Content-Speicherung</td>
                  <td>Norwegen (EWR)</td>
                </tr>
                <tr>
                  <td className="py-2">Ionos SE</td>
                  <td>E-Mail-Hosting, DNS</td>
                  <td>Deutschland</td>
                </tr>
                <tr>
                  <td className="py-2">Notion Labs Inc.</td>
                  <td>Projektmanagement, Kundenportal-Backend</td>
                  <td>USA (EU SCCs)</td>
                </tr>
                <tr>
                  <td className="py-2">Hetzner Online GmbH</td>
                  <td>Server-Infrastruktur (falls zutreffend)</td>
                  <td>Deutschland</td>
                </tr>
              </tbody>
            </table>
            <p className="mb-4">
              Bei Unterauftragnehmern mit Sitz außerhalb des EWR (USA) sind
              EU-Standardvertragsklauseln (SCCs) gem. Durchführungsbeschluss (EU)
              2021/914 abgeschlossen. Der Auftragsverarbeiter informiert den
              Auftraggeber über jede beabsichtigte Änderung der
              Unterauftragnehmer und räumt dem Auftraggeber die Möglichkeit ein,
              innerhalb von 14 Tagen Einspruch zu erheben.
            </p>

            <h2 className="text-sm font-bold text-gray-900 mb-2">
              § 6 Pflichten des Auftraggebers
            </h2>
            <p className="mb-4">
              Der Auftraggeber ist als Verantwortlicher für die Rechtmäßigkeit
              der Datenverarbeitung verantwortlich. Er stellt sicher, dass: (a)
              die betroffenen Personen ordnungsgemäß informiert wurden
              (Datenschutzerklärung auf der Website), (b) erforderliche
              Einwilligungen eingeholt wurden (Cookie-Banner, Newsletter-Opt-In),
              (c) er den Auftragsverarbeiter unverzüglich über
              Betroffenenrechte-Anfragen informiert.
            </p>

            <h2 className="text-sm font-bold text-gray-900 mb-2">
              § 7 Meldepflichten und Betroffenenrechte
            </h2>
            <p className="mb-4">
              Der Auftragsverarbeiter unterstützt den Auftraggeber bei der
              Erfüllung der Betroffenenrechte (Art. 15–22 DSGVO) und bei
              Datenschutzverletzungen (Art. 33, 34 DSGVO). Im Falle einer
              Verletzung des Schutzes personenbezogener Daten informiert der
              Auftragsverarbeiter den Auftraggeber unverzüglich, spätestens
              innerhalb von 24 Stunden nach Bekanntwerden.
            </p>

            <h2 className="text-sm font-bold text-gray-900 mb-2">
              § 8 Kontrollrechte und Audits
            </h2>
            <p className="mb-4">
              Der Auftraggeber hat das Recht, die Einhaltung dieser Vereinbarung
              zu überprüfen — durch Einsichtnahme in Nachweise, Zertifikate und
              Audit-Berichte oder durch Vor-Ort-Kontrollen nach angemessener
              Vorankündigung. Der Auftragsverarbeiter stellt alle erforderlichen
              Informationen zur Verfügung.
            </p>

            <h2 className="text-sm font-bold text-gray-900 mb-2">
              § 9 Löschung und Rückgabe
            </h2>
            <p className="mb-4">
              Nach Beendigung der Leistungserbringung löscht der
              Auftragsverarbeiter sämtliche personenbezogenen Daten des
              Auftraggebers und bestätigt die Löschung schriftlich — es sei
              denn, gesetzliche Aufbewahrungspflichten (z.B. § 257 HGB, § 147
              AO) stehen dem entgegen. In diesem Fall werden die Daten gesperrt
              und nach Ablauf der Fristen gelöscht. Auf Wunsch erfolgt statt
              Löschung eine Rückgabe der Daten in einem gängigen Format.
            </p>

            <h2 className="text-sm font-bold text-gray-900 mb-2">
              § 10 Haftung
            </h2>
            <p>
              Die Haftung richtet sich nach Art. 82 DSGVO. Der
              Auftragsverarbeiter haftet für Schäden, die durch eine nicht den
              Vorgaben der DSGVO entsprechende Verarbeitung verursacht werden
              oder wenn er außerhalb oder entgegen den rechtmäßigen Weisungen
              des Auftraggebers gehandelt hat.
            </p>
          </div>

          {/* Signature */}
          <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-6 md:p-8">
            {signed ? (
              <div className="flex items-center gap-2 text-green-600">
                <Check className="w-5 h-5" />
                <p className="text-sm font-medium">
                  AVV erfolgreich unterzeichnet
                </p>
              </div>
            ) : (
              <>
                <label className="flex items-start gap-3 mb-5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={signChecked}
                    onChange={(e) => setSignChecked(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                  />
                  <span className="text-sm text-gray-600 leading-relaxed">
                    Ich habe die Auftragsverarbeitungsvereinbarung gelesen und
                    stimme den Bedingungen zu.
                  </span>
                </label>

                <div className="flex items-end gap-4">
                  <div className="flex-1">
                    <label className="text-xs text-gray-400 mb-2 block">
                      Vollständiger Name
                    </label>
                    <input
                      type="text"
                      placeholder="Vor- und Nachname"
                      value={signName}
                      onChange={(e) => setSignName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#f5f5f7] text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 transition-all"
                    />
                  </div>
                  <button
                    onClick={handleSignAVV}
                    disabled={!signChecked || !signName.trim() || signing}
                    className="px-6 py-3 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                  >
                    {signing ? "Wird signiert..." : "Jetzt unterzeichnen"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Step 2: Service Agreement */}
      {step === 2 && (
        <div className="text-center">
          <FileText className="w-7 h-7 text-gray-400 mx-auto mb-5" />
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-3">
            Service Agreement
          </h1>
          <p className="text-sm text-gray-500 leading-relaxed max-w-md mx-auto mb-10">
            Laden Sie unser Service Agreement herunter. Darin finden Sie alle
            Details zu Leistungsumfang, Reaktionszeiten, SLAs und Konditionen.
          </p>

          <a
            href="/dokumente/service-agreement.pdf"
            download
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#f5f5f7] text-sm font-medium text-gray-700 hover:bg-gray-200/60 transition-colors mb-10"
          >
            <Download className="w-4 h-4" />
            Service Agreement herunterladen (PDF)
          </a>

          <div>
            <button
              onClick={() => setStep(3)}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Weiter
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Done */}
      {step === 3 && (
        <div className="text-center">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
            <Check className="w-6 h-6 text-green-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-3">
            Alles erledigt
          </h1>
          <p className="text-sm text-gray-500 leading-relaxed max-w-md mx-auto mb-10">
            Ihr Portal ist eingerichtet. Sie können jetzt Ihre Projekte
            einsehen, Dokumente herunterladen und jederzeit mit uns
            kommunizieren.
          </p>
          <button
            onClick={() => router.push("/portal")}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Zum Dashboard
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

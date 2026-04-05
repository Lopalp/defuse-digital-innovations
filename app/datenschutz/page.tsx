import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Datenschutz — defuse digital",
  description:
    "Datenschutzerklärung der defuse digital — Informationen zur Erhebung und Verarbeitung personenbezogener Daten.",
};

export default function DatenschutzPage() {
  return (
    <>
      <Header />
      <main>
        <section className="pt-40 pb-24 px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-20">
              Datenschutz
            </h1>

            <div className="space-y-12 text-sm text-gray-500 leading-relaxed">
              <div>
                <h2 className="text-lg font-extrabold text-gray-900 mb-4">
                  1. Datenschutz auf einen Blick
                </h2>
                <h3 className="font-bold text-gray-900 mb-2">
                  Allgemeine Hinweise
                </h3>
                <p>
                  Die folgenden Hinweise geben einen einfachen Überblick
                  darüber, was mit Ihren personenbezogenen Daten passiert, wenn
                  Sie diese Website besuchen. Personenbezogene Daten sind alle
                  Daten, mit denen Sie persönlich identifiziert werden können.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-extrabold text-gray-900 mb-4">
                  2. Verantwortliche Stelle
                </h2>
                <p>
                  Verantwortlich für die Datenverarbeitung auf dieser Website
                  ist:
                </p>
                <p className="mt-4">
                  defuse digital
                  <br />
                  Louis Radisch
                  <br />
                  Musterstraße 1
                  <br />
                  09111 Chemnitz
                  <br />
                  E-Mail: hello@defuse.digital
                </p>
              </div>

              <div>
                <h2 className="text-lg font-extrabold text-gray-900 mb-4">
                  3. Datenerfassung auf dieser Website
                </h2>
                <h3 className="font-bold text-gray-900 mb-2">Server-Log-Dateien</h3>
                <p className="mb-6">
                  Der Provider der Seiten erhebt und speichert automatisch
                  Informationen in sogenannten Server-Log-Dateien, die Ihr
                  Browser automatisch an uns übermittelt. Dies sind: Browsertyp
                  und Browserversion, verwendetes Betriebssystem, Referrer URL,
                  Hostname des zugreifenden Rechners, Uhrzeit der
                  Serveranfrage, IP-Adresse.
                </p>
                <h3 className="font-bold text-gray-900 mb-2">Kontaktformular</h3>
                <p>
                  Wenn Sie uns per Kontaktformular Anfragen zukommen lassen,
                  werden Ihre Angaben aus dem Anfrageformular inklusive der von
                  Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der
                  Anfrage und für den Fall von Anschlussfragen bei uns
                  gespeichert. Diese Daten geben wir nicht ohne Ihre
                  Einwilligung weiter.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-extrabold text-gray-900 mb-4">
                  4. Hosting
                </h2>
                <p>
                  Diese Website wird bei Vercel Inc. gehostet. Die Server
                  befinden sich in der EU (Frankfurt). Details finden Sie in der{" "}
                  <a
                    href="https://vercel.com/legal/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-900 font-semibold underline underline-offset-2 hover:text-gray-600 transition-colors"
                  >
                    Datenschutzerklärung von Vercel
                  </a>
                  .
                </p>
              </div>

              <div>
                <h2 className="text-lg font-extrabold text-gray-900 mb-4">
                  5. Ihre Rechte
                </h2>
                <p>Sie haben jederzeit das Recht auf:</p>
                <ul className="list-disc list-inside mt-4 space-y-2">
                  <li>
                    Auskunft über Ihre bei uns gespeicherten personenbezogenen
                    Daten
                  </li>
                  <li>Berichtigung unrichtiger Daten</li>
                  <li>Löschung Ihrer bei uns gespeicherten Daten</li>
                  <li>Einschränkung der Datenverarbeitung</li>
                  <li>Widerspruch gegen die Verarbeitung</li>
                  <li>Datenübertragbarkeit</li>
                </ul>
                <p className="mt-6">
                  Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können
                  Sie sich jederzeit an uns wenden.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-extrabold text-gray-900 mb-4">
                  6. Cookies
                </h2>
                <p>
                  Diese Website verwendet keine Tracking-Cookies und keine
                  externen Analyse-Tools. Es werden ausschließlich technisch
                  notwendige Cookies eingesetzt, die für den Betrieb der Website
                  erforderlich sind.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-extrabold text-gray-900 mb-4">
                  7. Externe Dienste
                </h2>
                <p>
                  Schriftarten werden lokal gehostet (Self-Hosting). Es werden
                  keine externen CDN-Dienste wie Google Fonts eingebunden.
                  Bilder werden über Unsplash eingebunden — dabei kann eine
                  Verbindung zu den Servern von Unsplash hergestellt werden.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

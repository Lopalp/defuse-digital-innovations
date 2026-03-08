import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Impressum — defuse.",
  description:
    "Impressum und Angaben gemäß § 5 TMG der defuse. digital.",
};

export default function ImpressumPage() {
  return (
    <>
      <Header />
      <main>
        <section className="pt-40 pb-24 px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-20">
              Impressum
            </h1>

            <div className="space-y-12 text-sm text-gray-500 leading-relaxed">
              <div>
                <h2 className="text-lg font-extrabold text-gray-900 mb-4">
                  Angaben gemäß § 5 TMG
                </h2>
                <p>
                  defuse. digital
                  <br />
                  Louis Radisch
                  <br />
                  Musterstraße 1
                  <br />
                  09111 Chemnitz
                </p>
              </div>

              <div>
                <h2 className="text-lg font-extrabold text-gray-900 mb-4">
                  Kontakt
                </h2>
                <p>
                  E-Mail: hello@defuse.digital
                  <br />
                  Telefon: +49 (0) 123 456 789
                </p>
              </div>

              <div>
                <h2 className="text-lg font-extrabold text-gray-900 mb-4">
                  Umsatzsteuer-ID
                </h2>
                <p>
                  Umsatzsteuer-Identifikationsnummer gemäß § 27 a
                  Umsatzsteuergesetz:
                  <br />
                  DE XXX XXX XXX
                </p>
              </div>

              <div>
                <h2 className="text-lg font-extrabold text-gray-900 mb-4">
                  Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
                </h2>
                <p>
                  Louis Radisch
                  <br />
                  Musterstraße 1
                  <br />
                  09111 Chemnitz
                </p>
              </div>

              <div>
                <h2 className="text-lg font-extrabold text-gray-900 mb-4">
                  Haftungsausschluss
                </h2>
                <h3 className="font-bold text-gray-900 mb-2">
                  Haftung für Inhalte
                </h3>
                <p className="mb-6">
                  Die Inhalte unserer Seiten wurden mit größter Sorgfalt
                  erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität
                  der Inhalte können wir jedoch keine Gewähr übernehmen. Als
                  Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene
                  Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
                  verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
                  Diensteanbieter jedoch nicht verpflichtet, übermittelte oder
                  gespeicherte fremde Informationen zu überwachen.
                </p>
                <h3 className="font-bold text-gray-900 mb-2">
                  Haftung für Links
                </h3>
                <p>
                  Unser Angebot enthält Links zu externen Webseiten Dritter, auf
                  deren Inhalte wir keinen Einfluss haben. Deshalb können wir
                  für diese fremden Inhalte auch keine Gewähr übernehmen. Für
                  die Inhalte der verlinkten Seiten ist stets der jeweilige
                  Anbieter oder Betreiber der Seiten verantwortlich.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-extrabold text-gray-900 mb-4">
                  Urheberrecht
                </h2>
                <p>
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
                  diesen Seiten unterliegen dem deutschen Urheberrecht. Die
                  Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
                  Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen
                  der schriftlichen Zustimmung des jeweiligen Autors bzw.
                  Erstellers.
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

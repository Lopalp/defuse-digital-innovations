import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Impressum — defuse digital",
  description:
    "Impressum und Angaben gemäß § 5 TMG — LUCRAM MEDIA GmbH, Augustusburg.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://defuse.digital/impressum" },
};

export default function ImpressumPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startseite", item: "https://defuse.digital" },
      { "@type": "ListItem", position: 2, name: "Impressum", item: "https://defuse.digital/impressum" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
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
                  LUCRAM MEDIA GmbH
                  <br />
                  Alte Chemnitzer Straße 4
                  <br />
                  09573 Augustusburg
                  <br />
                  Deutschland
                </p>
              </div>

              <div>
                <h2 className="text-lg font-extrabold text-gray-900 mb-4">
                  Handelsregister
                </h2>
                <p>
                  HRB: 32640
                  <br />
                  Amtsgericht Chemnitz
                </p>
              </div>

              <div>
                <h2 className="text-lg font-extrabold text-gray-900 mb-4">
                  Geschäftsführer
                </h2>
                <p>Ramy Töpperwien</p>
              </div>

              <div>
                <h2 className="text-lg font-extrabold text-gray-900 mb-4">
                  Kontakt
                </h2>
                <p>
                  E-Mail:{" "}
                  <a
                    href="mailto:info@lucram-media.com"
                    className="text-gray-900 font-medium hover:text-gray-600 transition-colors"
                  >
                    info@lucram-media.com
                  </a>
                  <br />
                  Internet:{" "}
                  <a
                    href="https://www.lucram-media.de"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-900 font-medium hover:text-gray-600 transition-colors"
                  >
                    www.lucram-media.de
                  </a>
                </p>
              </div>

              <div>
                <h2 className="text-lg font-extrabold text-gray-900 mb-4">
                  Weitere Gesellschaft
                </h2>
                <p>LUCRAM MEDIA UG (haftungsbeschränkt)</p>
              </div>

              <div>
                <h2 className="text-lg font-extrabold text-gray-900 mb-4">
                  Streitschlichtung
                </h2>
                <p>
                  Die Europäische Kommission stellt eine Plattform zur
                  Online-Streitbeilegung (OS) bereit. Unsere E-Mail-Adresse
                  finden Sie oben im Impressum. Wir sind nicht bereit oder
                  verpflichtet, an Streitbeilegungsverfahren vor einer
                  Verbraucherschlichtungsstelle teilzunehmen.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-extrabold text-gray-900 mb-4">
                  Haftung für Inhalte
                </h2>
                <p>
                  Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene
                  Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
                  verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
                  Diensteanbieter jedoch nicht verpflichtet, übermittelte oder
                  gespeicherte fremde Informationen zu überwachen oder nach
                  Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
                  hinweisen.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-extrabold text-gray-900 mb-4">
                  Haftung für Links
                </h2>
                <p>
                  Unser Angebot enthält Links zu externen Websites Dritter, auf
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

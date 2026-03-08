import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Über uns — defuse.",
  description:
    "Wir sind defuse. — eine Digitalagentur aus Chemnitz. Wir bauen Websites, die performen, ranken und konvertieren.",
};

const VALUES = [
  {
    number: "01",
    title: "Kein Bullshit",
    description:
      "Wir reden nicht um den heißen Brei. Klare Kommunikation, ehrliche Timelines, faire Preise.",
  },
  {
    number: "02",
    title: "Code > Templates",
    description:
      "Jede Zeile wird geschrieben, nicht zusammengeklickt. Das Ergebnis: schneller, sicherer, individueller.",
  },
  {
    number: "03",
    title: "Ergebnisse zählen",
    description:
      "Lighthouse 90+, Core Web Vitals im grünen Bereich, Seite 1 bei Google. Das ist unser Standard.",
  },
  {
    number: "04",
    title: "Langfristig denken",
    description:
      "Wir bauen keine Wegwerf-Websites. Jedes Projekt ist auf Wartbarkeit, Skalierbarkeit und Zukunft ausgelegt.",
  },
];

const STACK = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Sanity CMS",
  "Vercel",
  "GitHub Actions",
  "Lighthouse CI",
];

export default function UeberUnsPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-40 pb-24 px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.05]">
              Wir machen das{" "}
              <span className="font-serif italic font-normal text-gray-500">
                Internet
              </span>{" "}
              besser
            </h1>
            <p className="mt-8 text-lg text-gray-500 max-w-2xl font-medium leading-relaxed">
              defuse. ist eine Digitalagentur aus Chemnitz. Wir helfen
              Unternehmen, mit schnellen, sichtbaren und sicheren Websites zu
              wachsen — ohne Kompromisse.
            </p>
          </div>
        </section>

        {/* Image + Story */}
        <section className="pb-32 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] md:h-[520px] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1740&auto=format&fit=crop"
                alt="Team bei der Arbeit"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 leading-tight">
                Von Entwicklern gegründet,{" "}
                <span className="text-gray-400">für Unternehmen gebaut.</span>
              </h2>
              <div className="space-y-5 text-sm text-gray-500 leading-relaxed">
                <p>
                  Wir haben defuse. gegründet, weil wir es leid waren, Websites
                  zu sehen, die langsam laden, schlecht ranken und nach sechs
                  Monaten veraltet sind.
                </p>
                <p>
                  Unser Ansatz: Jede Website wird von Grund auf mit modernem
                  Tech-Stack entwickelt. Kein WordPress, kein Baukasten, keine
                  Kompromisse. Dafür: Performance, Sicherheit und SEO aus einer
                  Hand.
                </p>
                <p>
                  Wir arbeiten eng mit unseren Kunden zusammen — von der ersten
                  Idee bis zum letzten Lighthouse-Audit. Und auch danach.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="pb-32 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-20 text-center">
              Wofür wir stehen
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {VALUES.map((value) => (
                <div
                  key={value.number}
                  className="p-8 md:p-10 rounded-2xl bg-white border border-gray-200/60"
                >
                  <span className="text-xs font-bold text-gray-300 tracking-[0.15em]">
                    {value.number}
                  </span>
                  <h3 className="text-xl font-extrabold text-gray-900 mt-4 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="pb-32 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
              Unser Stack
            </h2>
            <p className="text-gray-500 font-medium mb-14 max-w-md mx-auto">
              Die Tools, mit denen wir jeden Tag arbeiten.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {STACK.map((tech) => (
                <span
                  key={tech}
                  className="px-5 py-2.5 bg-white border border-gray-200/60 text-gray-700 text-sm font-semibold rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 pb-24">
          <div className="max-w-4xl mx-auto bg-gray-900 rounded-3xl p-10 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
              Lust, zusammenzuarbeiten?
            </h2>
            <p className="text-gray-400 font-medium mb-8 max-w-md mx-auto">
              Wir freuen uns auf Ihr Projekt. Lassen Sie uns reden.
            </p>
            <Link
              href="/kontakt"
              className="inline-flex items-center px-8 py-4 rounded-full bg-white text-gray-900 font-bold text-sm hover:bg-gray-100 transition-colors"
            >
              Kontakt aufnehmen
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

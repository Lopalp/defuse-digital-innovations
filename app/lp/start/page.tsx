"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Zap,
  ShieldCheck,
  BarChart3,
  Clock,
  CheckCircle2,
  ArrowRight,
  Star,
} from "lucide-react";

const BENEFITS = [
  {
    icon: Zap,
    title: "Ladezeit unter 1 Sekunde",
    description: "Ihre Website wird schneller als 95% aller Konkurrenz-Seiten.",
  },
  {
    icon: ShieldCheck,
    title: "DSGVO ab Tag 1",
    description: "Keine Google Fonts, keine Tracking-Cookies, kein Risiko.",
  },
  {
    icon: BarChart3,
    title: "SEO, das rankt",
    description: "Seite 1 bei Google. Nicht irgendwann — von Anfang an.",
  },
  {
    icon: Clock,
    title: "In 4 Wochen live",
    description: "Kein Projekt zieht sich ewig. Klare Timeline, feste Deadlines.",
  },
];

const SOCIAL_PROOF = [
  { metric: "95+", label: "Lighthouse Score" },
  { metric: "<1s", label: "Ladezeit" },
  { metric: "100%", label: "DSGVO-konform" },
  { metric: "24h", label: "Antwortzeit" },
];

const TESTIMONIALS = [
  {
    text: "Unsere neue Website hat die Anfragen verdreifacht. Innerhalb von 3 Wochen war alles live.",
    author: "M. Weber",
    role: "Geschäftsführer, TechStart GmbH",
  },
  {
    text: "Endlich eine Agentur, die versteht was Performance bedeutet. Lighthouse 98 — ohne Kompromisse.",
    author: "S. Fischer",
    role: "Marketing Lead, Handwerk Schuster",
  },
];

export default function LandingPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Minimal Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-50/80 backdrop-blur-xl border-b border-gray-200/50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg
              aria-hidden="true"
              className="w-7 h-7 text-gray-900"
              viewBox="0 0 32 32"
              fill="none"
            >
              <path
                d="M16 0C16 8.83656 8.83656 16 0 16C8.83656 16 16 23.1634 16 32C16 23.1634 23.1634 16 32 16C23.1634 16 16 8.83656 16 0Z"
                fill="currentColor"
              />
            </svg>
            <span className="text-xl font-extrabold tracking-tighter">
              defuse digital
            </span>
          </div>
          <a
            href="#cta"
            className="px-5 py-2.5 rounded-full bg-gray-900 text-white text-sm font-bold hover:bg-gray-800 transition-colors shadow-sm"
          >
            Kostenlos anfragen
          </a>
        </div>
      </header>

      <main>
        {/* Hero — Maximum Impact */}
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900 text-white text-xs font-bold mb-8">
                <Zap className="w-3 h-3" /> Limitiert: Kostenlose Website-Analyse
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.05] mb-6">
                Ihre Website verliert{" "}
                <span className="font-serif italic font-normal text-gray-500">
                  täglich
                </span>{" "}
                Kunden
              </h1>
              <p className="text-lg text-gray-500 font-medium leading-relaxed mb-8 max-w-lg">
                Langsame Ladezeiten, schlechtes Google-Ranking, veraltetes Design
                — jeder Tag ohne professionelle Website kostet Sie bares Geld.
              </p>

              {/* Inline CTA */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a
                  href="#cta"
                  className="px-8 py-4 rounded-full bg-gray-900 text-white font-bold text-sm hover:bg-gray-800 transition-all shadow-lg hover:-translate-y-0.5 text-center"
                >
                  Kostenlose Analyse anfordern
                </a>
                <a
                  href="#benefits"
                  className="px-8 py-4 rounded-full border-2 border-gray-900 text-gray-900 font-bold text-sm hover:bg-gray-900 hover:text-white transition-all text-center"
                >
                  Mehr erfahren
                </a>
              </div>

              {/* Trust Signals */}
              <div className="flex items-center gap-1 text-sm text-gray-500 font-medium">
                <div className="flex -space-x-1 mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-gray-900 fill-gray-900"
                    />
                  ))}
                </div>
                Vertraut von 20+ Unternehmen im DACH-Raum
              </div>
            </div>

            <div className="relative h-[400px] lg:h-[520px] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1740&auto=format&fit=crop"
                alt="Performance Dashboard"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </div>
        </section>

        {/* Social Proof Bar */}
        <section className="pb-20 px-6">
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
            {SOCIAL_PROOF.map((item) => (
              <div
                key={item.label}
                className="text-center p-6 rounded-2xl bg-white border border-gray-200/60"
              >
                <div className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                  {item.metric}
                </div>
                <div className="text-xs text-gray-400 font-bold uppercase tracking-[0.1em] mt-2">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section id="benefits" className="pb-24 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-center mb-4">
              Warum Unternehmen zu uns wechseln
            </h2>
            <p className="text-gray-500 font-medium text-center mb-16 max-w-lg mx-auto">
              Keine leeren Versprechen — messbare Ergebnisse.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {BENEFITS.map((b) => {
                const Icon = b.icon;
                return (
                  <div
                    key={b.title}
                    className="p-8 md:p-10 rounded-2xl bg-white border border-gray-200/60"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center mb-6">
                      <Icon className="w-5 h-5 text-gray-700" />
                    </div>
                    <h3 className="text-xl font-extrabold text-gray-900 mb-3">
                      {b.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {b.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="pb-24 px-6">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.author}
                className="p-8 md:p-10 rounded-2xl bg-gray-900 text-white"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-white fill-white"
                    />
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-6 text-gray-300">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div>
                  <p className="text-sm font-extrabold">{t.author}</p>
                  <p className="text-xs text-gray-500 mt-1">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* What You Get */}
        <section className="pb-24 px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
              Das bekommen Sie
            </h2>
            <p className="text-gray-500 font-medium">
              Alles inklusive, keine versteckten Kosten.
            </p>
          </div>
          <div className="max-w-2xl mx-auto space-y-4">
            {[
              "Individuelles Design — kein Template",
              "Next.js & React Entwicklung",
              "Technisches SEO & Structured Data",
              "DSGVO-konformes Setup",
              "CMS-Integration (Sanity)",
              "Lighthouse Score 90+",
              "SSL, Hosting-Setup & Domain",
              "3 Monate Support nach Launch",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-4 p-5 rounded-xl bg-white border border-gray-200/60"
              >
                <CheckCircle2 className="w-5 h-5 text-gray-900 shrink-0" />
                <span className="text-sm font-semibold text-gray-900">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Form */}
        <section id="cta" className="pb-24 px-6">
          <div className="max-w-4xl mx-auto bg-gray-900 rounded-3xl p-8 md:p-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
                  Kostenlose Website-Analyse
                </h2>
                <p className="text-gray-400 font-medium mb-6 leading-relaxed">
                  Wir analysieren Ihre aktuelle Website und zeigen Ihnen genau,
                  wo Sie Kunden verlieren — und wie Sie das ändern.
                </p>
                <ul className="space-y-3 text-sm text-gray-400">
                  {[
                    "Performance-Report mit Lighthouse",
                    "SEO-Audit mit konkreten Handlungsempfehlungen",
                    "Wettbewerbs-Vergleich",
                    "Unverbindlich & kostenlos",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                {submitted ? (
                  <div className="text-center py-12">
                    <CheckCircle2 className="w-12 h-12 text-white mx-auto mb-4" />
                    <h3 className="text-xl font-extrabold text-white mb-2">
                      Anfrage erhalten!
                    </h3>
                    <p className="text-sm text-gray-400">
                      Wir melden uns innerhalb von 24 Stunden.
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSubmitted(true);
                    }}
                    className="space-y-4"
                  >
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Ihr Name"
                      className="w-full px-4 py-3.5 rounded-xl bg-white/10 border border-white/10 text-sm text-white font-medium placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                    />
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="E-Mail-Adresse"
                      className="w-full px-4 py-3.5 rounded-xl bg-white/10 border border-white/10 text-sm text-white font-medium placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                    />
                    <input
                      type="url"
                      name="website"
                      placeholder="Ihre aktuelle Website (optional)"
                      className="w-full px-4 py-3.5 rounded-xl bg-white/10 border border-white/10 text-sm text-white font-medium placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                    />
                    <button
                      type="submit"
                      className="w-full px-8 py-4 rounded-full bg-white text-gray-900 font-bold text-sm hover:bg-gray-100 transition-all shadow-lg hover:-translate-y-0.5"
                    >
                      Kostenlose Analyse anfordern
                      <ArrowRight className="w-4 h-4 inline-block ml-2" />
                    </button>
                    <p className="text-xs text-gray-500 text-center">
                      Keine Kosten. Kein Spam. Versprochen.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Strip */}
        <section className="pb-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm text-gray-400 font-medium mb-4">
              Noch unsicher?
            </p>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6">
              Jede Woche ohne professionelle Website ist eine Woche verlorener Kunden.
            </h2>
            <a
              href="#cta"
              className="inline-flex items-center px-8 py-4 rounded-full bg-gray-900 text-white font-bold text-sm hover:bg-gray-800 transition-all shadow-lg hover:-translate-y-0.5"
            >
              Jetzt kostenlos starten
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </div>
        </section>
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-gray-200/50 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} defuse digital
          </p>
          <div className="flex items-center gap-4">
            <a
              href="/impressum"
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              Impressum
            </a>
            <a
              href="/datenschutz"
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              Datenschutz
            </a>
          </div>
        </div>
      </footer>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gray-50/95 backdrop-blur-xl border-t border-gray-200/50 z-50 sm:hidden">
        <a
          href="#cta"
          className="block w-full px-6 py-4 rounded-full bg-gray-900 text-white font-bold text-sm text-center shadow-lg"
        >
          Kostenlose Analyse anfordern
        </a>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  ArrowRight,
  Check,
  Zap,
  Shield,
  TrendingUp,
  Layers,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Leistungen — defuse. | Webdesign, SEO & Deep Tech aus Chemnitz",
  description:
    "Hochwertige Websites, technisches SEO, CMS-Lösungen und Deep Tech — KI-Integration, Automatisierung und Custom APIs. Digitalagentur aus Chemnitz für Unternehmen, die mehr erwarten.",
};

const STATS = [
  { value: "97+", label: "Lighthouse Score" },
  { value: "<1s", label: "Ladezeit" },
  { value: "100%", label: "Custom Code" },
  { value: "24h", label: "Response Time" },
];

const SERVICES = [
  {
    id: "webdesign",
    label: "Webdesign & Entwicklung",
    headline: "Websites, die verkaufen.",
    subline: "Nicht nur schön — strategisch.",
    description:
      "Jede Website, die wir bauen, ist ein Vertriebsinstrument. Wir entwickeln individuelle Websites mit Next.js und Tailwind CSS — keine Templates, keine Baukästen, kein Kompromiss. Jede Zeile Code ist handgeschrieben, jede Seite auf Performance und Conversion optimiert.",
    deliverables: [
      "Individuelles Design — kein Template, keine Vorlage",
      "Next.js App Router mit Server Components",
      "Responsive auf allen Geräten — Pixel-perfekt",
      "Lighthouse 90+ garantiert",
      "DSGVO-konform ohne Cookie-Banner",
      "Übergabe mit Dokumentation und Einweisung",
    ],
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1740&auto=format&fit=crop",
    stats: [
      { value: "0", unit: "Templates", detail: "100% Custom" },
      { value: "90+", unit: "Score", detail: "Lighthouse" },
      { value: "<1s", unit: "Load", detail: "Time to Interactive" },
    ],
  },
  {
    id: "cms",
    label: "CMS & Content",
    headline: "Ihr Content. Ihre Kontrolle.",
    subline: "Ohne Entwickler. Ohne Limits.",
    description:
      "Wir integrieren Sanity CMS so nahtlos, dass Ihre Redakteure sofort loslegen können. Live-Vorschau, flexible Strukturen, automatische Synchronisation — Content-Management, das sich anfühlt wie ein eigenes Produkt. Nicht wie ein Kompromiss.",
    deliverables: [
      "Sanity Studio mit maßgeschneidertem Schema",
      "Live-Preview — Änderungen sofort sichtbar",
      "Automatische Bild-Optimierung und CDN",
      "SEO-Felder direkt im Editor",
      "Rollen- und Rechtemanagement",
      "Persönliche Schulung für Ihr Team",
    ],
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1740&auto=format&fit=crop",
    stats: [
      { value: "∞", unit: "Seiten", detail: "Keine Limits" },
      { value: "0", unit: "Plugins", detail: "Nötig" },
      { value: "Live", unit: "Preview", detail: "In Echtzeit" },
    ],
  },
  {
    id: "seo",
    label: "Technisches SEO",
    headline: "Gefunden werden. Dominieren.",
    subline: "Nicht hoffen — sicherstellen.",
    description:
      "SEO ist keine Checkliste — es ist Architektur. Wir bauen die technische Grundlage, damit Google Ihre Seite versteht, indexiert und bevorzugt. Structured Data, Core Web Vitals, interne Verlinkung — jedes Detail zählt. Und wir überlassen kein Detail dem Zufall.",
    deliverables: [
      "Vollständige Structured Data (JSON-LD Schemas)",
      "Core Web Vitals Optimierung",
      "Technisches Audit mit Maßnahmenkatalog",
      "XML-Sitemap und Robots-Konfiguration",
      "Automatisiertes Lighthouse CI Monitoring",
      "Monatliches Performance-Reporting",
    ],
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1740&auto=format&fit=crop",
    stats: [
      { value: "#1", unit: "Ziel", detail: "Google Seite 1" },
      { value: "97+", unit: "Score", detail: "Core Web Vitals" },
      { value: "100%", unit: "Indexiert", detail: "Alle Seiten" },
    ],
  },
  {
    id: "relaunch",
    label: "Website Relaunch",
    headline: "Neustart. Ohne Verluste.",
    subline: "Alles behalten. Alles verbessern.",
    description:
      "Ein Relaunch ist kein Risiko — wenn man es richtig macht. Wir migrieren Design, Content und SEO-Equity in einen modernen Stack. Keine verlorenen Rankings, keine kaputten Links. Nur eine Website, die endlich so funktioniert, wie sie sollte.",
    deliverables: [
      "Vollständige Content- und SEO-Migration",
      "301-Redirect-Mapping für alle URLs",
      "Design-Upgrade auf modernen Stack",
      "Performance-Boost durch Code-Neubau",
      "Ranking-Monitoring vor und nach Launch",
      "Backup und Rollback-Strategie",
    ],
    image:
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1740&auto=format&fit=crop",
    stats: [
      { value: "0", unit: "Rankings", detail: "Verloren" },
      { value: "301", unit: "Redirects", detail: "Automatisch" },
      { value: "2×", unit: "Schneller", detail: "Mindestens" },
    ],
  },
];

const DEEP_TECH = [
  {
    icon: Zap,
    title: "KI-Integration",
    description:
      "Chatbots, automatisierte Texte, intelligente Suche. Wir integrieren KI dort, wo sie messbar Wert schafft — nicht als Spielerei.",
    examples: ["OpenAI / Claude APIs", "RAG-Systeme", "Content-Automation"],
  },
  {
    icon: Layers,
    title: "Automatisierung",
    description:
      "Manuelle Prozesse kosten Zeit und Geld. Wir automatisieren Workflows end-to-end — von Lead-Erfassung bis Reporting.",
    examples: ["n8n / Make Workflows", "CRM-Sync", "E-Mail-Sequenzen"],
  },
  {
    icon: Shield,
    title: "Custom APIs & Backends",
    description:
      "Ihre Systeme müssen reden? Wir bauen die Brücken. REST, GraphQL, Webhooks — maßgeschneidert, dokumentiert, getestet.",
    examples: ["REST & GraphQL", "Webhook-Pipelines", "Auth & Rechte"],
  },
  {
    icon: TrendingUp,
    title: "Complex Web Apps",
    description:
      "Dashboards, Portale, interne Tools. Wenn Standard nicht reicht, entwickeln wir das System, das Ihr Business wirklich braucht.",
    examples: ["Admin-Dashboards", "Kundenportale", "Daten-Visualisierung"],
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Gespräch",
    description:
      "Kein Formular. Ein echtes Gespräch. Wir verstehen Ihr Business, Ihre Ziele und was Sie nachts wach hält.",
    duration: "Tag 1",
  },
  {
    step: "02",
    title: "Strategie & Design",
    description:
      "Wireframes, Prototypen, Design-System. Sie sehen und testen alles, bevor eine Zeile Code entsteht.",
    duration: "Woche 1–2",
  },
  {
    step: "03",
    title: "Entwicklung",
    description:
      "Clean Code, Git-Workflow, CI/CD. Jeder Commit wird getestet, jede Seite auditiert. Sie sehen den Fortschritt live.",
    duration: "Woche 2–5",
  },
  {
    step: "04",
    title: "Launch & Betreuung",
    description:
      "Go-Live mit Monitoring, Analytics-Setup und persönlichem Support. Wir sind auch nach dem Launch für Sie da.",
    duration: "Fortlaufend",
  },
];

export default function LeistungenPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-40 pb-16 px-6">
          <div className="max-w-6xl mx-auto">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.25em] mb-6">
              Leistungen
            </p>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[0.95] max-w-5xl">
              Alles. Aus einer Hand.
            </h1>
            <p className="mt-10 text-xl md:text-2xl text-gray-500 max-w-2xl font-medium leading-relaxed">
              Von der ersten Idee bis zum laufenden System. Wir designen,
              entwickeln und optimieren — damit Sie sich auf Ihr Business
              konzentrieren können.
            </p>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="pb-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-200/60 rounded-2xl overflow-hidden">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-gray-50 p-8 md:p-10 text-center"
                >
                  <p className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-[0.15em] mt-2">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services — each one a full section */}
        {SERVICES.map((service, idx) => (
          <section
            key={service.id}
            id={service.id}
            className="pb-32 px-6"
          >
            <div className="max-w-6xl mx-auto">
              {/* Section Header */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.25em]">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <div className="h-px flex-1 bg-gray-200/60" />
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em]">
                  {service.label}
                </span>
              </div>

              {/* Layout: alternating image/text */}
              <div className={`flex flex-col ${idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-10 md:gap-16 items-center`}>
                {/* Image */}
                <div className="w-full md:w-1/2">
                  <div className="relative h-[320px] md:h-[500px] rounded-2xl overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.label}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="w-full md:w-1/2">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.05] mb-3">
                    {service.headline}
                  </h2>
                  <p className="text-lg text-gray-400 font-medium mb-8">
                    {service.subline}
                  </p>
                  <p className="text-base text-gray-600 leading-[1.8] font-medium mb-10">
                    {service.description}
                  </p>

                  {/* Mini Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-10">
                    {service.stats.map((s) => (
                      <div key={s.detail} className="text-center p-4 rounded-xl bg-gray-50">
                        <p className="text-2xl font-extrabold text-gray-900 tracking-tight">
                          {s.value}
                        </p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-1">
                          {s.detail}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Deliverables */}
                  <div className="space-y-3">
                    {service.deliverables.map((d) => (
                      <div key={d} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-gray-900 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-white" strokeWidth={3} />
                        </div>
                        <span className="text-sm text-gray-700 font-medium leading-relaxed">
                          {d}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* Deep Tech Section */}
        <section className="px-6 pb-32">
          <div className="max-w-6xl mx-auto bg-gray-950 rounded-3xl p-10 md:p-16 lg:p-20">
            <div className="max-w-2xl mb-16">
              <p className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.25em] mb-6">
                Für die, die mehr wollen
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
                Deep Tech
              </h2>
              <p className="text-lg text-gray-500 font-medium leading-relaxed">
                Manche Projekte brauchen mehr als eine Website. Wenn Standard
                nicht reicht — wir bauen, was andere nicht können.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/5 rounded-2xl overflow-hidden">
              {DEEP_TECH.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="bg-gray-950 p-8 md:p-10"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-extrabold text-white mb-3 tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-6">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.examples.map((ex) => (
                        <span
                          key={ex}
                          className="px-3 py-1 bg-white/5 text-gray-400 text-[10px] font-bold rounded-full uppercase tracking-wider"
                        >
                          {ex}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-12 text-center">
              <Link
                href="/blog/deep-tech-webentwicklung"
                className="inline-flex items-center gap-2 text-sm font-bold text-white hover:gap-3 transition-all"
              >
                Deep Tech Case Study lesen <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="pb-32 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.25em] mb-6">
                Unser Prozess
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
                Von der Idee zum Launch
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6">
              {PROCESS.map((item, i) => (
                <div key={item.step} className="relative">
                  {i < PROCESS.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-[calc(100%+0.75rem)] w-[calc(100%-1.5rem)] h-px bg-gray-200/60" />
                  )}
                  <span className="text-6xl md:text-7xl font-extrabold text-gray-100 block leading-none mb-4">
                    {item.step}
                  </span>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-3">
                    {item.duration}
                  </p>
                  <h3 className="text-xl font-extrabold text-gray-900 mb-3 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed font-medium">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust / Why defuse */}
        <section className="pb-32 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-16 items-start">
              <div className="md:w-1/2 md:sticky md:top-32">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.25em] mb-6">
                  Warum wir
                </p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6">
                  Kein Zufall. Kein Kompromiss.
                </h2>
                <p className="text-lg text-gray-500 font-medium leading-relaxed">
                  Wir sind keine Agentur, die alles macht. Wir sind Spezialisten,
                  die das Richtige machen. Jedes Projekt bekommt die gleiche
                  Präzision — egal ob Startup oder Enterprise.
                </p>
              </div>
              <div className="md:w-1/2 space-y-6">
                {[
                  {
                    title: "Keine Abhängigkeit",
                    text: "Sie besitzen alles — Code, Domains, Hosting. Kein Vendor-Lock-in, keine versteckten Kosten. Wenn wir morgen verschwinden, läuft Ihre Website weiter.",
                  },
                  {
                    title: "Feste Preise",
                    text: "Kein Stundensatz, keine Überraschungen. Wir definieren den Scope, Sie kennen den Preis. Punkt.",
                  },
                  {
                    title: "Direkte Kommunikation",
                    text: "Kein Projektmanager dazwischen. Sie sprechen direkt mit den Entwicklern, die Ihre Website bauen.",
                  },
                  {
                    title: "Nach dem Launch",
                    text: "Wir verschwinden nicht. Monitoring, Updates, neue Features — wir sind langfristiger Partner, nicht einmaliger Dienstleister.",
                  },
                  {
                    title: "Made in Sachsen",
                    text: "Wir sitzen in Chemnitz und kennen die Region. Persönliche Treffen, kurze Wege, echte Partnerschaft auf Augenhöhe.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="p-6 md:p-8 rounded-2xl bg-gray-50 border border-gray-100"
                  >
                    <h3 className="text-base font-extrabold text-gray-900 tracking-tight mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed font-medium">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 pb-24">
          <div className="max-w-6xl mx-auto bg-gray-950 rounded-3xl p-12 md:p-20 text-center">
            <p className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.25em] mb-6">
              Bereit?
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
              Lassen Sie uns reden.
            </h2>
            <p className="text-gray-500 font-medium mb-10 max-w-lg mx-auto text-lg">
              Kein Formular mit 20 Feldern. Ein kurzes Gespräch — und wir wissen,
              ob wir zusammenpassen. Kostenlos und unverbindlich.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/kontakt"
                className="px-10 py-4 rounded-full bg-white text-gray-900 font-bold text-sm hover:bg-gray-100 transition-colors"
              >
                Projekt besprechen
              </Link>
              <Link
                href="/referenzen"
                className="px-10 py-4 rounded-full border border-white/20 text-white font-bold text-sm hover:bg-white/5 transition-colors"
              >
                Referenzen ansehen
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

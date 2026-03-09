import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Code,
  Search,
  Paintbrush,
  RefreshCw,
  ArrowRight,
  Cpu,
  Bot,
  Database,
  Workflow,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Leistungen — defuse.",
  description:
    "Webdesign, Sanity CMS, technisches SEO, Website-Relaunches und Deep Tech — KI-Integration, Automatisierung und Custom APIs. Alles aus einer Hand.",
};

const SERVICES = [
  {
    icon: Code,
    title: "Webdesign & Entwicklung",
    description:
      "Individuelle Websites mit Next.js und Tailwind CSS. Kein Template, kein Baukasten — jede Seite wird von Grund auf gebaut.",
    features: ["Next.js App Router", "Tailwind CSS", "TypeScript", "Responsive Design"],
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1740&auto=format&fit=crop",
  },
  {
    icon: Paintbrush,
    title: "Sanity CMS",
    description:
      "Content-Management, das Spaß macht. Ihre Kunden bearbeiten Texte, Bilder und Preise selbst — ohne Entwickler.",
    features: ["Sanity Studio", "Live Preview", "Auto-Sync", "Schulung inklusive"],
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1740&auto=format&fit=crop",
  },
  {
    icon: Search,
    title: "Technisches SEO",
    description:
      "Structured Data, Core Web Vitals, Lighthouse 90+. Wir sorgen dafür, dass Google Ihre Seite versteht und liebt.",
    features: ["JSON-LD Schemas", "Sitemap & Robots", "Meta-Optimierung", "Lighthouse CI"],
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1740&auto=format&fit=crop",
  },
  {
    icon: RefreshCw,
    title: "Website Relaunch",
    description:
      "Ihre aktuelle Seite ist veraltet? Wir überführen Design, Content und SEO-Equity in einen modernen Stack.",
    features: ["301 Redirects", "Content-Migration", "Design-Upgrade", "Performance-Boost"],
    image:
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1740&auto=format&fit=crop",
  },
];

const DEEP_TECH = [
  {
    icon: Bot,
    title: "KI-Integration",
    description:
      "Chatbots, automatisierte Content-Generierung, intelligente Suchfunktionen — wir integrieren KI dort, wo sie echten Mehrwert schafft.",
  },
  {
    icon: Workflow,
    title: "Automatisierung",
    description:
      "Workflows, die manuelle Arbeit eliminieren. Von E-Mail-Sequenzen bis zu CRM-Sync — alles automatisch.",
  },
  {
    icon: Database,
    title: "Custom APIs & Backends",
    description:
      "Maßgeschneiderte Schnittstellen, die Ihre Systeme verbinden. REST, GraphQL, Webhooks — whatever it takes.",
  },
  {
    icon: Cpu,
    title: "Complex Web Apps",
    description:
      "Dashboards, Portale, interne Tools — wenn Standard-Lösungen nicht reichen, bauen wir das Richtige.",
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Discovery",
    description: "Wir verstehen Ihr Business, Ihre Ziele und Ihre Nutzer. Kein Briefing-Template — echte Gespräche.",
  },
  {
    step: "02",
    title: "Konzept & Design",
    description: "Wireframes, Prototypen, Design-System. Sie sehen alles, bevor eine Zeile Code geschrieben wird.",
  },
  {
    step: "03",
    title: "Entwicklung",
    description: "Clean Code, Git-Workflow, CI/CD. Jeder Commit wird getestet, jede Seite wird auditiert.",
  },
  {
    step: "04",
    title: "Launch & Support",
    description: "Go-Live mit Monitoring, Analytics-Setup und persönlichem Support. Wir verschwinden nicht nach dem Launch.",
  },
];

export default function LeistungenPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-40 pb-24 px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.05]">
              Was wir{" "}
              <span className="font-serif italic font-normal text-gray-500">
                wirklich
              </span>{" "}
              machen
            </h1>
            <p className="mt-8 text-lg text-gray-500 max-w-2xl font-medium leading-relaxed">
              Keine Buzzwords. Wir bauen schnelle, sichere und sichtbare Websites
              — und gehen tiefer, wenn es sein muss.
            </p>
          </div>
        </section>

        {/* Core Services Grid */}
        <section className="pb-32 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-16">
              Core Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SERVICES.map((service) => {
                const Icon = service.icon;
                return (
                  <div
                    key={service.title}
                    className="group relative rounded-2xl overflow-hidden bg-white border border-gray-200/60 hover:border-gray-300 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </div>
                    <div className="p-8">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {service.title}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed mb-6">
                        {service.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {service.features.map((f) => (
                          <span
                            key={f}
                            className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full"
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Deep Tech */}
        <section className="pb-32 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-3xl mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-6">
                Deep Tech
              </h2>
              <p className="text-lg text-gray-500 font-medium leading-relaxed">
                Manche Projekte brauchen mehr als eine Website. Wenn es um KI,
                Automatisierung oder komplexe Systeme geht — wir bauen das.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {DEEP_TECH.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="group p-8 md:p-10 rounded-2xl bg-gray-900 text-white hover:-translate-y-1 transition-all duration-300 hover:shadow-2xl"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6 group-hover:bg-white/15 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-extrabold mb-3">{item.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="mt-8 text-center">
              <Link
                href="/blog/deep-tech-webentwicklung"
                className="inline-flex items-center gap-2 text-sm font-bold text-gray-900 hover:gap-3 transition-all"
              >
                Mehr über Deep Tech lesen <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="pb-32 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-16 text-center">
              So arbeiten wir
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {PROCESS.map((item, i) => (
                <div key={item.step} className="relative">
                  {i < PROCESS.length - 1 && (
                    <div className="hidden md:block absolute top-6 left-full w-full h-px bg-gray-200" />
                  )}
                  <span className="text-4xl font-extrabold text-gray-200 mb-4 block">
                    {item.step}
                  </span>
                  <h3 className="text-lg font-extrabold text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 pb-24">
          <div className="max-w-4xl mx-auto bg-gray-900 rounded-3xl p-10 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
              Projekt im Kopf?
            </h2>
            <p className="text-gray-400 font-medium mb-8 max-w-md mx-auto">
              Erzähl uns davon. Wir melden uns innerhalb von 24 Stunden.
            </p>
            <Link
              href="/kontakt"
              className="inline-flex items-center px-8 py-4 rounded-full bg-white text-gray-900 font-bold text-sm hover:bg-gray-100 transition-colors"
            >
              Jetzt anfragen
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

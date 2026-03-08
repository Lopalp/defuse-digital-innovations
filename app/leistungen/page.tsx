import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Code, Search, Paintbrush, RefreshCw, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Leistungen — defuse.",
  description:
    "Webdesign, Sanity CMS, technisches SEO und Website-Relaunches. Alles aus einer Hand, DSGVO-konform und performance-optimiert.",
};

const SERVICES = [
  {
    icon: Code,
    title: "Webdesign & Entwicklung",
    slug: "webdesign",
    description:
      "Individuelle Websites mit Next.js und Tailwind CSS. Kein Template, kein Baukasten — jede Seite wird von Grund auf gebaut.",
    features: ["Next.js App Router", "Tailwind CSS", "TypeScript", "Responsive Design"],
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1740&auto=format&fit=crop",
  },
  {
    icon: Paintbrush,
    title: "Sanity CMS",
    slug: "sanity-cms",
    description:
      "Content-Management, das Spaß macht. Ihre Kunden bearbeiten Texte, Bilder und Preise selbst — ohne Entwickler.",
    features: ["Sanity Studio", "Live Preview", "Automatische Aktualisierung", "Schulung inklusive"],
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1740&auto=format&fit=crop",
  },
  {
    icon: Search,
    title: "Technisches SEO",
    slug: "seo",
    description:
      "Structured Data, Core Web Vitals, Lighthouse 90+. Wir sorgen dafür, dass Google Ihre Seite versteht und liebt.",
    features: ["JSON-LD Schemas", "Sitemap & Robots", "Meta-Optimierung", "Lighthouse CI"],
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1740&auto=format&fit=crop",
  },
  {
    icon: RefreshCw,
    title: "Website Relaunch",
    slug: "relaunch",
    description:
      "Ihre aktuelle Seite ist veraltet? Wir überführen Design, Content und SEO-Equity in einen modernen Stack.",
    features: ["301 Redirects", "Content-Migration", "Design-Upgrade", "Performance-Boost"],
    image:
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1740&auto=format&fit=crop",
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
              — von der ersten Zeile Code bis zum letzten Lighthouse-Audit.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="pb-40 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {SERVICES.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.slug}
                  className="group relative rounded-2xl overflow-hidden bg-white border border-gray-200/60 hover:border-gray-300 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* Image */}
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

                  {/* Content */}
                  <div className="p-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-3">
                      {service.title}
                    </h2>
                    <p className="text-sm text-gray-500 leading-relaxed mb-6">
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {service.features.map((f) => (
                        <span
                          key={f}
                          className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-2 text-sm font-bold text-gray-900 group-hover:gap-3 transition-all">
                      Mehr erfahren <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              );
            })}
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

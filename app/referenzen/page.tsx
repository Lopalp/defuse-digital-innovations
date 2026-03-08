import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Referenzen — defuse.",
  description:
    "Ausgewählte Projekte aus den Bereichen Webdesign, CMS-Integration und technisches SEO. Ergebnisse, die für sich sprechen.",
};

const PROJECTS = [
  {
    title: "Bergpension Laasen Perle",
    category: "Webdesign · SEO · CMS",
    description:
      "Kompletter Website-Relaunch für eine Pension in der Sächsischen Schweiz. Next.js, Sanity CMS und Lighthouse-Score 95+.",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1740&auto=format&fit=crop",
    tags: ["Next.js", "Sanity CMS", "SEO", "DSGVO"],
    year: "2025",
  },
  {
    title: "Lucram Media",
    category: "Branding · Webdesign",
    description:
      "Corporate Website mit scroll-basiertem Storytelling und Custom-Animationen. Minimalistisches Design, maximale Wirkung.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1740&auto=format&fit=crop",
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    year: "2025",
  },
  {
    title: "TechStart GmbH",
    category: "Webdesign · CMS",
    description:
      "SaaS-Landingpage mit Sanity-gesteuertem Blog und automatisierter Lead-Generierung. Conversion Rate +40%.",
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1740&auto=format&fit=crop",
    tags: ["Next.js", "Sanity CMS", "Analytics"],
    year: "2024",
  },
  {
    title: "Handwerk Schuster",
    category: "Relaunch · SEO",
    description:
      "Von WordPress zu Next.js: 301-Redirects, Content-Migration und technisches SEO. Ladezeit von 4,2s auf 0,8s.",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1740&auto=format&fit=crop",
    tags: ["Migration", "Next.js", "Performance"],
    year: "2024",
  },
];

export default function ReferenzenPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-40 pb-24 px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.05]">
              Projekte, die{" "}
              <span className="font-serif italic font-normal text-gray-500">
                sprechen
              </span>
            </h1>
            <p className="mt-8 text-lg text-gray-500 max-w-2xl font-medium leading-relaxed">
              Jedes Projekt ist ein Beweis. Hier zeigen wir, was passiert, wenn
              Design, Technik und Strategie zusammenkommen.
            </p>
          </div>
        </section>

        {/* Projects */}
        <section className="pb-40 px-6">
          <div className="max-w-6xl mx-auto space-y-8">
            {PROJECTS.map((project, i) => (
              <div
                key={project.title}
                className={`group relative rounded-2xl overflow-hidden bg-white border border-gray-200/60 hover:border-gray-300 transition-all duration-300 hover:shadow-xl ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } flex flex-col md:flex`}
              >
                {/* Image */}
                <div className="relative md:w-1/2 h-72 md:h-auto min-h-[320px]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                {/* Content */}
                <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-[0.15em]">
                      {project.category}
                    </span>
                    <span className="text-xs text-gray-300 font-medium">
                      {project.year}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight mb-4">
                    {project.title}
                  </h2>
                  <p className="text-sm text-gray-500 leading-relaxed mb-6">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-2 text-sm font-bold text-gray-900 group-hover:gap-3 transition-all">
                    Case Study ansehen{" "}
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 pb-24">
          <div className="max-w-4xl mx-auto bg-gray-900 rounded-3xl p-10 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
              Ihr Projekt fehlt hier noch
            </h2>
            <p className="text-gray-400 font-medium mb-8 max-w-md mx-auto">
              Lassen Sie uns gemeinsam etwas bauen, das sich sehen lassen kann.
            </p>
            <Link
              href="/kontakt"
              className="inline-flex items-center px-8 py-4 rounded-full bg-white text-gray-900 font-bold text-sm hover:bg-gray-100 transition-colors"
            >
              Projekt besprechen
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { TiltCard } from "@/components/TiltCard";
import { PROJECTS } from "@/lib/projects";
import { ArrowUpRight } from "lucide-react";

export default function ReferenzenPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-40 pb-16 px-6">
          <div className="max-w-6xl mx-auto">
            <Reveal direction="up" distance={60} duration={1}>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.15em] mb-4">
                Ausgewählte Arbeiten
              </p>
            </Reveal>
            <Reveal direction="up" distance={80} duration={1.2}>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.05]">
                Projekte, die{" "}
                <span className="font-serif italic font-normal text-gray-500">
                  sprechen
                </span>
              </h1>
            </Reveal>
            <Reveal direction="up" delay={0.3}>
              <p className="mt-8 text-lg text-gray-500 max-w-2xl font-medium leading-relaxed">
                Echte Projekte, echte Ergebnisse. Jede Website wird individuell
                geplant, designed und entwickelt — keine Templates, keine
                Kompromisse.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Featured Project — full width */}
        <section className="px-6 pb-12">
          <div className="max-w-6xl mx-auto">
            <Reveal animation="scale" duration={1}>
              <Link
                href={`/referenzen/${PROJECTS[0].slug}`}
                className="group block"
              >
                <TiltCard intensity={4}>
                  <div className="relative aspect-[21/9] rounded-2xl overflow-hidden bg-gray-100">
                    <Image
                      src={PROJECTS[0].image}
                      alt={`${PROJECTS[0].client} — ${PROJECTS[0].title}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="100vw"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-[10px] font-bold text-white/50 uppercase tracking-[0.15em]">
                          {PROJECTS[0].client}
                        </span>
                        <span className="text-[10px] text-white/30">
                          {PROJECTS[0].year}
                        </span>
                      </div>
                      <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
                        {PROJECTS[0].title}
                      </h2>
                      <p className="text-sm text-white/50 mt-4 max-w-xl leading-relaxed">
                        {PROJECTS[0].description}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-5">
                        {PROJECTS[0].tags.map((t) => (
                          <span
                            key={t}
                            className="px-3 py-1 bg-white/10 text-white/60 text-[10px] font-semibold rounded-full"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </Link>
            </Reveal>
          </div>
        </section>

        {/* Project Grid */}
        <section className="px-6 pb-32">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 lg:gap-8">
            {PROJECTS.slice(1).map((project, i) => (
              <Reveal
                key={project.slug}
                direction="up"
                delay={i * 0.1}
                animation="scale"
              >
                <Link
                  href={`/referenzen/${project.slug}`}
                  className="group block"
                >
                  <TiltCard intensity={5}>
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
                      <Image
                        src={project.image}
                        alt={`${project.client} — ${project.title}`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-[10px] font-bold text-white/50 uppercase tracking-[0.15em]">
                            {project.client}
                          </span>
                          <span className="text-[10px] text-white/30">
                            {project.year}
                          </span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
                          {project.title}
                        </h3>
                        <p className="text-xs text-white/40 mt-3 leading-relaxed line-clamp-2">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5 mt-4">
                          {project.tags.map((t) => (
                            <span
                              key={t}
                              className="px-2.5 py-0.5 bg-white/10 text-white/50 text-[9px] font-semibold rounded-full"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 pb-24">
          <div className="max-w-4xl mx-auto bg-gray-900 rounded-3xl p-10 md:p-16 text-center">
            <Reveal direction="up">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
                Ihr Projekt fehlt hier noch
              </h2>
            </Reveal>
            <Reveal direction="up" delay={0.15}>
              <p className="text-gray-400 font-medium mb-8 max-w-md mx-auto">
                Lassen Sie uns gemeinsam etwas bauen, das sich sehen lassen
                kann.
              </p>
            </Reveal>
            <Reveal direction="up" delay={0.3}>
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-gray-900 font-bold text-sm hover:bg-gray-100 transition-colors"
              >
                Projekt besprechen <ArrowUpRight className="w-4 h-4" />
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

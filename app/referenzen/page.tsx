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
                {PROJECTS.length}+ Projekte
              </p>
            </Reveal>
            <Reveal direction="up" distance={80} duration={1.2}>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.05]">
                Projekte, die{" "}
                <span className="font-display italic font-normal text-gray-500">
                  sprechen
                </span>
              </h1>
            </Reveal>
            <Reveal direction="up" delay={0.3}>
              <p className="mt-8 text-lg text-gray-500 max-w-2xl font-medium leading-relaxed">
                Von der Bergpension bis zur KI-Plattform — jedes Projekt ist
                individuell geplant, designed und entwickelt. Keine Templates,
                keine Kompromisse.
              </p>
            </Reveal>
          </div>
        </section>

        {/* 3-Column Grid */}
        <section className="px-6 pb-32">
          <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {PROJECTS.map((project, i) => (
              <Reveal
                key={project.slug}
                direction="up"
                delay={Math.min(i * 0.05, 0.4)}
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
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        priority={i < 6}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[9px] font-bold text-white/50 uppercase tracking-[0.12em]">
                            {project.client}
                          </span>
                          <span className="text-[9px] text-white/25">
                            {project.year}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-white tracking-tight leading-tight">
                          {project.title}
                        </h3>
                        <p className="text-[11px] text-white/40 mt-2 leading-relaxed line-clamp-2">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-3">
                          {project.tags.slice(0, 3).map((t) => (
                            <span
                              key={t}
                              className="px-2 py-0.5 bg-white/10 text-white/50 text-[8px] font-semibold rounded-full"
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

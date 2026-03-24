"use client";

import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { StickySection } from "@/components/StickySection";
import { CountUp } from "@/components/CountUp";
import { TiltCard } from "@/components/TiltCard";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import type { Project } from "@/lib/projects";

export function CaseStudyClient({ project }: { project: Project }) {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative h-[80vh] min-h-[500px] overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-gray-900/20" />

          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 max-w-6xl mx-auto">
            <Reveal direction="up" delay={0.2}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[10px] font-bold text-white/50 uppercase tracking-[0.15em]">
                  {project.branche}
                </span>
                <span className="text-[10px] text-white/30">
                  {project.year}
                </span>
              </div>
            </Reveal>
            <Reveal direction="up" delay={0.3}>
              <p className="text-lg text-white/40 font-medium mb-2">
                {project.client}
              </p>
            </Reveal>
            <Reveal direction="up" distance={80} duration={1.2}>
              <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.05]">
                {project.title}
              </h1>
            </Reveal>
            <Reveal direction="up" delay={0.5}>
              <p className="text-base text-white/40 mt-6 max-w-xl font-medium leading-relaxed">
                {project.description}
              </p>
            </Reveal>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 px-6 border-b border-gray-200/50">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            {project.stats.map((stat, i) => (
              <Reveal key={stat.label} animation="scale" delay={0.1 + i * 0.1}>
                <div>
                  <p className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                    {/^\d+$/.test(stat.value) ? (
                      <CountUp target={parseInt(stat.value)} />
                    ) : (
                      stat.value
                    )}
                  </p>
                  <p className="text-sm text-gray-400 font-semibold mt-2">
                    {stat.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Scroll Storytelling: Aufgabe → Lösung → Ergebnis */}
        <StickySection scrollHeight="300vh">
          {(progress) => (
            <div className="h-full relative overflow-hidden flex items-center bg-gray-50">
              {/* Ghost text */}
              <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none">
                <span
                  className="text-[12vw] font-extrabold leading-none tracking-tight"
                  style={{
                    color: `rgba(0,0,0,${Math.min(0.03, progress * 0.06)})`,
                  }}
                >
                  {progress < 0.33
                    ? "AUFGABE"
                    : progress < 0.66
                      ? "LÖSUNG"
                      : "ERGEBNIS"}
                </span>
              </div>

              <div className="relative z-10 px-6 md:px-16 max-w-4xl mx-auto">
                {/* Phase 1 */}
                <div
                  style={{
                    opacity: Math.min(1, progress * 5),
                    transform: `translateY(${Math.max(0, (1 - progress * 4) * 80)}px)`,
                  }}
                >
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.15em] mb-6">
                    Die Aufgabe
                  </p>
                  <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.05]">
                    Ausgangslage
                    <span className="text-gray-300">.</span>
                  </h2>
                </div>

                <div
                  style={{
                    opacity: Math.min(
                      1,
                      Math.max(0, (progress - 0.1) * 3.5),
                    ),
                    transform: `translateY(${Math.max(0, (1 - Math.max(0, progress - 0.1) * 3) * 50)}px)`,
                  }}
                >
                  <p className="text-base text-gray-500 leading-relaxed mt-8 font-medium">
                    {project.aufgabe}
                  </p>
                </div>

                {/* Phase 2 */}
                <div
                  style={{
                    opacity: Math.min(
                      1,
                      Math.max(0, (progress - 0.33) * 3),
                    ),
                    transform: `translateY(${Math.max(0, (1 - Math.max(0, progress - 0.33) * 3) * 40)}px)`,
                  }}
                >
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.15em] mb-4 mt-14">
                    Die Lösung
                  </p>
                  <p className="text-base text-gray-500 leading-relaxed font-medium">
                    {project.loesung}
                  </p>
                </div>

                {/* Phase 3 */}
                <div
                  style={{
                    opacity: Math.min(1, Math.max(0, (progress - 0.6) * 3)),
                    transform: `translateY(${Math.max(0, (1 - Math.max(0, progress - 0.6) * 3) * 30)}px)`,
                  }}
                >
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.15em] mb-4 mt-14">
                    Das Ergebnis
                  </p>
                  <p className="text-base text-gray-600 leading-relaxed font-semibold">
                    {project.ergebnis}
                  </p>
                </div>

                {/* Tech stack tags */}
                <div
                  style={{
                    opacity: Math.min(1, Math.max(0, (progress - 0.8) * 4)),
                    transform: `translateY(${Math.max(0, (1 - Math.max(0, progress - 0.8) * 3) * 20)}px)`,
                  }}
                >
                  <div className="flex flex-wrap gap-2 mt-10">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-1.5 bg-gray-100 text-gray-500 text-xs font-semibold rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </StickySection>

        {/* Image Gallery */}
        {project.images.length > 1 && (
          <section className="py-8 px-4 md:px-8">
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {project.images.map((src, i) => (
                <Reveal key={src} animation="scale" delay={i * 0.08}>
                  <TiltCard intensity={5}>
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
                      <Image
                        src={src}
                        alt={`${project.client} — Bild ${i + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </div>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* Testimonial */}
        {project.testimonial && (
          <section className="py-24 md:py-32 px-6">
            <div className="max-w-3xl mx-auto text-center">
              <Reveal animation="fade">
                <div className="w-px h-12 bg-gray-200 mx-auto mb-12" />
              </Reveal>
              <Reveal direction="up" delay={0.2}>
                <blockquote className="text-xl md:text-2xl font-serif italic text-gray-500 leading-relaxed">
                  &ldquo;{project.testimonial.text}&rdquo;
                </blockquote>
              </Reveal>
              <Reveal direction="up" delay={0.4}>
                <p className="text-sm font-bold text-gray-900 mt-8">
                  {project.testimonial.name}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {project.testimonial.role}
                </p>
              </Reveal>
            </div>
          </section>
        )}

        {/* Services & Tech */}
        <section className="py-24 px-6 border-t border-gray-200/50">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 md:gap-24">
            <div>
              <Reveal direction="up">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.15em] mb-8">
                  Leistungen
                </p>
              </Reveal>
              {project.tags.map((tag, i) => (
                <Reveal key={tag} direction="left" delay={0.1 + i * 0.07}>
                  <p className="text-sm text-gray-600 font-medium py-4 border-b border-gray-200/50">
                    {tag}
                  </p>
                </Reveal>
              ))}
            </div>
            <div>
              <Reveal direction="up">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.15em] mb-8">
                  Technologie
                </p>
              </Reveal>
              {project.stack.map((tech, i) => (
                <Reveal key={tech} direction="left" delay={0.1 + i * 0.07}>
                  <p className="text-sm text-gray-600 font-medium py-4 border-b border-gray-200/50">
                    {tech}
                  </p>
                </Reveal>
              ))}
              {project.liveUrl && (
                <Reveal direction="up" delay={0.5}>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-8 text-sm font-bold text-gray-900 hover:text-gray-600 transition-colors"
                  >
                    Live ansehen <ExternalLink className="w-4 h-4" />
                  </a>
                </Reveal>
              )}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 pb-24">
          <div className="max-w-4xl mx-auto bg-gray-900 rounded-3xl p-10 md:p-16 text-center">
            <Reveal direction="up">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
                Ihr Projekt könnte das nächste sein
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

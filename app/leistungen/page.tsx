"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { TiltCard } from "@/components/TiltCard";
import { StickySection } from "@/components/StickySection";
import { CountUp } from "@/components/CountUp";
import {
  ArrowRight,
  ArrowDownRight,
  Code2,
  Layers,
  Cpu,
  BarChart3,
  MessageSquare,
  Check,
  Globe,
  Sparkles,
  Zap,
  Shield,
} from "lucide-react";

/* ────────────────────────────────────────────────────────────
   IMAGES
   ──────────────────────────────────────────────────────────── */

const HERO_BG =
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0";

const IMG_WEBDESIGN =
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1740&auto=format&fit=crop";

const IMG_CMS =
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1740&auto=format&fit=crop";

const IMG_SEO =
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1740&auto=format&fit=crop";

const IMG_TESTIMONIAL =
  "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop";

/* ────────────────────────────────────────────────────────────
   PROCESS STEPS
   ──────────────────────────────────────────────────────────── */

const PROCESS = [
  {
    step: "01",
    title: "Verstehen",
    description:
      "Wir analysieren Ihre Branche, Zielgruppe und Wettbewerber. Kein Briefing-Formular, sondern echte Gespräche auf Augenhöhe. Am Ende wissen wir genau, was Ihre Website leisten muss.",
    icon: MessageSquare,
  },
  {
    step: "02",
    title: "Strategie",
    description:
      "Wireframes, Informationsarchitektur, technischer Stack. Wir definieren den Fahrplan und Sie sehen jedes Detail, bevor eine Zeile Code entsteht. Keine Überraschungen.",
    icon: Layers,
  },
  {
    step: "03",
    title: "Kreation",
    description:
      "Design und Code entstehen parallel. Jede Komponente wird in Figma entworfen, in Next.js entwickelt und auf Performance auditiert. Sie sehen den Fortschritt live.",
    icon: Code2,
  },
  {
    step: "04",
    title: "Launch & Wachstum",
    description:
      "Go-Live mit Monitoring, SEO-Setup und Analytics. Aber das ist erst der Anfang. Wir optimieren kontinuierlich und begleiten Sie als langfristiger Partner.",
    icon: Zap,
  },
];

/* ────────────────────────────────────────────────────────────
   PHILOSOPHY LINES (for StickySection)
   ──────────────────────────────────────────────────────────── */

const PHILOSOPHY_LINES = [
  "Wir glauben nicht an Output um des Outputs willen.",
  "Jede Website, die wir bauen, muss eine Wirkung erzielen.",
  "Schnellere Ladezeiten. Bessere Rankings. Mehr Conversions.",
  "Kein Feature ohne Zweck. Kein Pixel ohne Funktion.",
  "Das ist unser Versprechen: Wirkung statt Output.",
];

/* ────────────────────────────────────────────────────────────
   SEO TECH TAGS
   ──────────────────────────────────────────────────────────── */

const TECH_TAGS = [
  "JSON-LD",
  "Core Web Vitals",
  "Structured Data",
  "XML Sitemap",
  "robots.txt",
  "Canonical Tags",
  "Open Graph",
  "Lighthouse CI",
  "Schema.org",
  "TTFB < 200ms",
  "CLS < 0.1",
  "LCP < 2.5s",
  "FID < 100ms",
  "INP < 200ms",
  "SSR / ISR",
  "Edge Caching",
];

/* ────────────────────────────────────────────────────────────
   MARQUEE ITEMS
   ──────────────────────────────────────────────────────────── */

const MARQUEE_ITEMS = [
  "Next.js",
  "React",
  "Tailwind CSS",
  "Sanity CMS",
  "TypeScript",
  "Vercel",
  "Node.js",
  "GraphQL",
  "REST APIs",
  "OpenAI",
  "Claude AI",
  "n8n",
  "Figma",
  "Git",
  "CI/CD",
  "DSGVO",
];

/* ────────────────────────────────────────────────────────────
   ZOOM IMAGE HOOK (hero parallax)
   ──────────────────────────────────────────────────────────── */

function useHeroZoom() {
  const [scale, setScale] = useState(1);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewH = window.innerHeight;
      const progress = Math.min(scrollY / viewH, 1);
      setScale(1 + progress * 0.3);
      setOpacity(1 - progress * 0.7);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { scale, opacity };
}

/* ────────────────────────────────────────────────────────────
   MAIN COMPONENT
   ──────────────────────────────────────────────────────────── */

export default function LeistungenPage() {
  const { scale, opacity } = useHeroZoom();
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Header />
      <main className="overflow-x-hidden">
        {/* ═══════════════════════════════════════════════════
            1. HERO — Cinematic fullscreen with ZoomImage effect
            ═══════════════════════════════════════════════════ */}
        <section className="relative h-[100svh] flex items-center justify-center overflow-hidden">
          {/* Background image with zoom-on-scroll */}
          <div
            className="absolute inset-0 z-0"
            style={{
              transform: `scale(${scale})`,
              opacity,
              transition: "transform 0.1s linear, opacity 0.1s linear",
            }}
          >
            <Image
              src={HERO_BG}
              alt="Digitale Landschaft"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gray-950/60" />
          </div>

          {/* Hero content */}
          <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
            <div
              className="transition-all duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                opacity: heroLoaded ? 1 : 0,
                transform: heroLoaded ? "translateY(0)" : "translateY(40px)",
              }}
            >
              <p className="text-[10px] font-bold text-white/50 uppercase tracking-[0.3em] mb-8">
                Unsere Leistungen
              </p>
              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] font-extrabold text-white tracking-tighter leading-[0.9]">
                Digital.
                <br />
                <span className="font-display italic font-normal">Präzise.</span>
              </h1>
              <p className="mt-8 text-lg md:text-xl text-white/60 max-w-xl mx-auto font-medium leading-relaxed">
                Websites, SEO & Deep Tech — alles aus einer Hand.
                Maßgeschneidert für Unternehmen, die mehr erwarten.
              </p>
            </div>

            {/* Scroll indicator */}
            <div
              className="absolute bottom-10 left-1/2 -translate-x-1/2 transition-all duration-[1.5s] delay-[0.8s]"
              style={{
                opacity: heroLoaded ? 1 : 0,
                transform: heroLoaded
                  ? "translate(-50%, 0)"
                  : "translate(-50%, 20px)",
              }}
            >
              <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-1.5">
                <div className="w-1 h-2.5 bg-white/60 rounded-full animate-bounce" />
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            2. THE CHALLENGE — Editorial split layout
            ═══════════════════════════════════════════════════ */}
        <section className="py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-0 items-stretch">
              {/* Accent panel left */}
              <Reveal direction="left" className="w-full lg:w-5/12">
                <div className="bg-gray-900 text-white p-10 md:p-14 lg:p-16 rounded-2xl lg:rounded-r-none lg:rounded-l-2xl h-full flex flex-col justify-center">
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.25em] mb-6">
                    Die Herausforderung
                  </p>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.05]">
                    95% aller Websites{" "}
                    <span className="font-serif italic font-normal text-gray-400">
                      scheitern.
                    </span>
                  </h2>
                  <div className="mt-8 w-16 h-px bg-white/20" />
                </div>
              </Reveal>

              {/* Text right */}
              <Reveal direction="right" delay={0.2} className="w-full lg:w-7/12">
                <div className="bg-white p-10 md:p-14 lg:p-16 rounded-2xl lg:rounded-l-none lg:rounded-r-2xl border border-gray-100 h-full flex flex-col justify-center">
                  <p className="text-base md:text-lg text-gray-600 leading-[1.9] font-medium">
                    Langsam, unsichtbar, austauschbar. Die meisten Websites kosten Geld,
                    bringen aber keine Ergebnisse. Templates, Pagebuilder und
                    Billig-Agenturen produzieren digitale Massenware, die weder bei Google
                    rankt noch Besucher in Kunden verwandelt.
                  </p>
                  <p className="mt-6 text-base md:text-lg text-gray-600 leading-[1.9] font-medium">
                    defuse. existiert, weil wir das anders sehen. Jede Website, die wir
                    entwickeln, ist ein individuelles System — gebaut auf modernem Code,
                    optimiert für Suchmaschinen und designed für messbare Ergebnisse. Keine
                    Kompromisse. Keine Abkürzungen.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    {["Performance", "Sichtbarkeit", "Conversion"].map((tag) => (
                      <span
                        key={tag}
                        className="px-4 py-1.5 bg-gray-50 text-gray-900 text-[11px] font-bold rounded-full uppercase tracking-wider border border-gray-100"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            3. STATS — Full-bleed horizontal band with CountUp
            ═══════════════════════════════════════════════════ */}
        <section className="bg-gray-900 py-20 md:py-24">
          <div className="max-w-6xl mx-auto px-6">
            <Reveal direction="up">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
                {/* Stat 1 */}
                <div className="text-center">
                  <p className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight">
                    <CountUp target={97} suffix="+" duration={2.5} />
                  </p>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mt-3">
                    Lighthouse Score
                  </p>
                </div>

                {/* Stat 2 */}
                <div className="text-center">
                  <p className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight">
                    {"<"}
                    <CountUp target={1} suffix="s" duration={1.5} />
                  </p>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mt-3">
                    Ladezeit
                  </p>
                </div>

                {/* Stat 3 */}
                <div className="text-center">
                  <p className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight">
                    <CountUp target={100} suffix="%" duration={2.5} />
                  </p>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mt-3">
                    Custom Code
                  </p>
                </div>

                {/* Stat 4 */}
                <div className="text-center">
                  <p className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight">
                    <CountUp target={24} suffix="h" duration={2} />
                  </p>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mt-3">
                    Response Time
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            4. PHILOSOPHY — StickySection scroll-linked text reveal
            ═══════════════════════════════════════════════════ */}
        <StickySection scrollHeight="300vh">
          {(progress) => (
            <div className="h-full flex items-center justify-center bg-gray-50 px-6">
              <div className="max-w-4xl mx-auto text-center">
                <Reveal direction="none" animation="fade">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mb-12">
                    Unsere Philosophie
                  </p>
                </Reveal>
                <div className="space-y-4">
                  {PHILOSOPHY_LINES.map((line, i) => {
                    const lineStart = i / PHILOSOPHY_LINES.length;
                    const lineEnd = (i + 0.6) / PHILOSOPHY_LINES.length;
                    const lineProgress = Math.max(
                      0,
                      Math.min(1, (progress - lineStart) / (lineEnd - lineStart))
                    );
                    const isLast = i === PHILOSOPHY_LINES.length - 1;

                    return (
                      <p
                        key={i}
                        className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight leading-[1.2] transition-all duration-300 ${
                          isLast ? "font-extrabold" : "font-bold"
                        }`}
                        style={{
                          opacity: 0.15 + lineProgress * 0.85,
                          transform: `translateY(${(1 - lineProgress) * 20}px)`,
                          color: isLast && lineProgress > 0.5 ? "#111827" : undefined,
                        }}
                      >
                        {isLast ? (
                          <>
                            <span className="font-display italic font-normal">Wirkung</span>{" "}
                            statt Output.
                          </>
                        ) : (
                          line
                        )}
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </StickySection>

        {/* ═══════════════════════════════════════════════════
            5. PROCESS — 4-step horizontal timeline with TiltCards
            ═══════════════════════════════════════════════════ */}
        <section className="py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <Reveal direction="up">
              <div className="text-center mb-20">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.25em] mb-6">
                  Unser Prozess
                </p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
                  Von der Idee zum{" "}
                  <span className="font-serif italic font-normal">Launch</span>
                </h2>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {PROCESS.map((item, i) => {
                const Icon = item.icon;
                return (
                  <Reveal
                    key={item.step}
                    direction="up"
                    delay={i * 0.15}
                  >
                    <TiltCard className="h-full">
                      <div className="relative bg-white border border-gray-100 rounded-2xl p-8 h-full group hover:border-gray-200 transition-colors">
                        {/* Step number */}
                        <span className="text-7xl md:text-8xl font-extrabold text-gray-100 absolute top-4 right-6 leading-none select-none group-hover:text-gray-200 transition-colors">
                          {item.step}
                        </span>

                        {/* Icon */}
                        <div className="w-12 h-12 rounded-xl bg-gray-900 flex items-center justify-center mb-6 relative z-10">
                          <Icon className="w-5 h-5 text-white" />
                        </div>

                        <h3 className="text-xl font-extrabold text-gray-900 mb-3 tracking-tight relative z-10">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-500 leading-relaxed font-medium relative z-10">
                          {item.description}
                        </p>

                        {/* Arrow connector (hidden on last) */}
                        {i < PROCESS.length - 1 && (
                          <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-6 h-6 rounded-full bg-gray-900 items-center justify-center">
                            <ArrowRight className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                    </TiltCard>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            6. SERVICE 01 — Webdesign & Entwicklung
            ═══════════════════════════════════════════════════ */}
        <section className="py-32 px-6" id="webdesign">
          <div className="max-w-6xl mx-auto">
            {/* Section header */}
            <Reveal direction="up">
              <div className="flex items-center gap-4 mb-16">
                <span className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.25em]">
                  01
                </span>
                <div className="h-px flex-1 bg-gray-200/60" />
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em]">
                  Webdesign & Entwicklung
                </span>
              </div>
            </Reveal>

            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
              {/* Giant number + image */}
              <Reveal direction="left" className="w-full lg:w-1/2">
                <div className="relative">
                  <span className="text-[12rem] sm:text-[16rem] md:text-[20rem] font-extrabold text-gray-100 leading-none absolute -top-16 -left-4 select-none pointer-events-none z-0">
                    01
                  </span>
                  <div className="relative z-10 rounded-2xl overflow-hidden h-[400px] md:h-[560px]">
                    <Image
                      src={IMG_WEBDESIGN}
                      alt="Webdesign und Entwicklung"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </div>
              </Reveal>

              {/* Editorial content */}
              <Reveal direction="right" delay={0.2} className="w-full lg:w-1/2">
                <div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.05] mb-3">
                    Websites, die{" "}
                    <span className="font-display italic font-normal">verkaufen.</span>
                  </h2>
                  <p className="text-lg text-gray-400 font-medium mb-8">
                    Nicht nur schön — strategisch.
                  </p>
                  <p className="text-base text-gray-600 leading-[1.9] font-medium mb-10">
                    Jede Website, die wir bauen, ist ein Vertriebsinstrument. Wir entwickeln
                    individuelle Websites mit Next.js und Tailwind CSS — keine Templates,
                    keine Baukästen, kein Kompromiss. Jede Zeile Code ist handgeschrieben,
                    jede Seite auf Performance und Conversion optimiert.
                  </p>

                  {/* Deliverables */}
                  <div className="space-y-3 mb-10">
                    {[
                      "Individuelles Design — kein Template, keine Vorlage",
                      "Next.js App Router mit Server Components",
                      "Responsive auf allen Geräten — Pixel-perfekt",
                      "Lighthouse 90+ garantiert",
                      "DSGVO-konform ohne Cookie-Banner",
                      "Übergabe mit Dokumentation und Einweisung",
                    ].map((d) => (
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

                  <Link
                    href="/kontakt"
                    className="inline-flex items-center gap-2 text-sm font-bold text-gray-900 hover:gap-3 transition-all group"
                  >
                    Projekt besprechen{" "}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            7. SERVICE 02 — Sanity CMS (centered magazine-feel)
            ═══════════════════════════════════════════════════ */}
        <section className="py-32 px-6 bg-white" id="cms">
          <div className="max-w-4xl mx-auto text-center">
            {/* Section header */}
            <Reveal direction="up">
              <div className="flex items-center gap-4 mb-16 max-w-6xl mx-auto">
                <span className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.25em]">
                  02
                </span>
                <div className="h-px flex-1 bg-gray-200/60" />
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em]">
                  Sanity CMS
                </span>
              </div>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <span className="text-[10rem] sm:text-[14rem] md:text-[18rem] font-extrabold text-gray-100 leading-none block select-none pointer-events-none">
                02
              </span>
            </Reveal>

            <Reveal direction="up" delay={0.2}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] -mt-16 md:-mt-24 relative z-10">
                Ihr Content.{" "}
                <span className="font-serif italic font-normal">Ihre Kontrolle.</span>
              </h2>
            </Reveal>

            <Reveal direction="up" delay={0.3}>
              <p className="mt-8 text-base md:text-lg text-gray-500 leading-[1.9] font-medium max-w-2xl mx-auto">
                Wir integrieren Sanity CMS so nahtlos, dass Ihre Redakteure sofort loslegen
                können. Live-Vorschau, flexible Strukturen, automatische Synchronisation —
                Content-Management, das sich anfühlt wie ein eigenes Produkt. Nicht wie ein
                Kompromiss.
              </p>
            </Reveal>

            {/* Feature grid */}
            <Reveal direction="up" delay={0.4}>
              <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  {
                    icon: Globe,
                    title: "Live-Preview",
                    text: "Änderungen sofort sichtbar — direkt im Sanity Studio, ohne Deployment.",
                  },
                  {
                    icon: Layers,
                    title: "Flexible Schemas",
                    text: "Maßgeschneiderte Content-Strukturen, die genau zu Ihrem Business passen.",
                  },
                  {
                    icon: Shield,
                    title: "Rollen & Rechte",
                    text: "Granulares Rechtemanagement. Jedes Teammitglied sieht nur, was es sehen soll.",
                  },
                ].map((feat) => {
                  const FeatIcon = feat.icon;
                  return (
                    <div
                      key={feat.title}
                      className="p-8 rounded-2xl bg-gray-50 border border-gray-100 text-left"
                    >
                      <div className="w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center mb-5">
                        <FeatIcon className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="text-base font-extrabold text-gray-900 tracking-tight mb-2">
                        {feat.title}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed font-medium">
                        {feat.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </Reveal>

            {/* CMS stats */}
            <Reveal direction="up" delay={0.5}>
              <div className="mt-12 grid grid-cols-3 gap-4">
                {[
                  { value: "Unbegrenzt", label: "Seiten & Dokumente" },
                  { value: "0 Plugins", label: "Nötig" },
                  { value: "Live", label: "Vorschau in Echtzeit" },
                ].map((s) => (
                  <div key={s.label} className="p-6 rounded-xl bg-gray-50">
                    <p className="text-lg md:text-xl font-extrabold text-gray-900 tracking-tight">
                      {s.value}
                    </p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-1">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            8. SERVICE 03 — SEO & Performance (code-themed)
            ═══════════════════════════════════════════════════ */}
        <section className="py-32 px-6 bg-gray-950" id="seo">
          <div className="max-w-6xl mx-auto">
            {/* Section header */}
            <Reveal direction="up">
              <div className="flex items-center gap-4 mb-16">
                <span className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.25em]">
                  03
                </span>
                <div className="h-px flex-1 bg-white/10" />
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.15em]">
                  SEO & Performance
                </span>
              </div>
            </Reveal>

            <div className="flex flex-col lg:flex-row gap-16 items-center">
              {/* Content */}
              <Reveal direction="left" className="w-full lg:w-1/2">
                <div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.05] mb-3">
                    Gefunden werden.{" "}
                    <span className="font-serif italic font-normal text-gray-400">
                      Dominieren.
                    </span>
                  </h2>
                  <p className="text-lg text-gray-500 font-medium mb-8">
                    SEO ist keine Checkliste — es ist Architektur.
                  </p>
                  <p className="text-base text-gray-400 leading-[1.9] font-medium mb-10">
                    Wir bauen die technische Grundlage, damit Google Ihre Seite versteht,
                    indexiert und bevorzugt. Structured Data, Core Web Vitals, interne
                    Verlinkung — jedes Detail zählt. Und wir überlassen kein Detail dem Zufall.
                  </p>

                  {/* Deliverables */}
                  <div className="space-y-3">
                    {[
                      "Vollständige Structured Data (JSON-LD Schemas)",
                      "Core Web Vitals Optimierung",
                      "Technisches Audit mit Maßnahmenkatalog",
                      "XML-Sitemap und Robots-Konfiguration",
                      "Automatisiertes Lighthouse CI Monitoring",
                      "Monatliches Performance-Reporting",
                    ].map((d) => (
                      <div key={d} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-white" strokeWidth={3} />
                        </div>
                        <span className="text-sm text-gray-400 font-medium leading-relaxed">
                          {d}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Code-themed / tech tags panel */}
              <Reveal direction="right" delay={0.2} className="w-full lg:w-1/2">
                <div className="bg-gray-900 rounded-2xl border border-white/5 overflow-hidden">
                  {/* Terminal bar */}
                  <div className="flex items-center gap-2 px-5 py-3.5 bg-gray-800/50 border-b border-white/5">
                    <div className="w-3 h-3 rounded-full bg-red-500/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                    <div className="w-3 h-3 rounded-full bg-green-500/60" />
                    <span className="ml-3 text-[11px] text-gray-500 font-mono">
                      seo-audit.ts
                    </span>
                  </div>

                  {/* Code block */}
                  <div className="p-6 md:p-8">
                    <pre className="text-[12px] md:text-[13px] text-gray-400 font-mono leading-[2] whitespace-pre-wrap">
                      <span className="text-blue-400">const</span>{" "}
                      <span className="text-green-400">auditConfig</span> = {"{"}
                      {"\n"}
                      {"  "}
                      <span className="text-purple-400">lighthouse</span>:{" "}
                      <span className="text-yellow-400">&quot;97+&quot;</span>,{"\n"}
                      {"  "}
                      <span className="text-purple-400">lcp</span>:{" "}
                      <span className="text-yellow-400">&quot;&lt; 2.5s&quot;</span>,{"\n"}
                      {"  "}
                      <span className="text-purple-400">cls</span>:{" "}
                      <span className="text-yellow-400">&quot;&lt; 0.1&quot;</span>,{"\n"}
                      {"  "}
                      <span className="text-purple-400">ttfb</span>:{" "}
                      <span className="text-yellow-400">&quot;&lt; 200ms&quot;</span>,{"\n"}
                      {"  "}
                      <span className="text-purple-400">customCode</span>:{" "}
                      <span className="text-orange-400">true</span>,{"\n"}
                      {"  "}
                      <span className="text-purple-400">templates</span>:{" "}
                      <span className="text-orange-400">false</span>,{"\n"}
                      {"}"};
                    </pre>
                  </div>

                  {/* Tech tags */}
                  <div className="px-6 md:px-8 pb-6 md:pb-8">
                    <div className="flex flex-wrap gap-2">
                      {TECH_TAGS.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1.5 bg-white/5 text-gray-500 text-[10px] font-mono font-bold rounded-md border border-white/5 hover:text-white hover:bg-white/10 transition-colors cursor-default"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            9. SERVICE CARDS — Deep Tech, Analytics, Beratung + Marquee
            ═══════════════════════════════════════════════════ */}
        <section className="py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <Reveal direction="up">
              <div className="text-center mb-20">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.25em] mb-6">
                  Weitere Leistungen
                </p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
                  Wenn Standard nicht{" "}
                  <span className="font-serif italic font-normal">reicht.</span>
                </h2>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Deep Tech / KI */}
              <Reveal direction="up" delay={0}>
                <TiltCard className="h-full">
                  <div className="bg-gray-900 rounded-2xl p-8 md:p-10 h-full text-white group hover:bg-gray-800 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-8">
                      <Cpu className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-extrabold tracking-tight mb-3">
                      Deep Tech & KI
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed font-medium mb-8">
                      Chatbots, intelligente Suche, RAG-Systeme, Content-Automation. Wir
                      integrieren KI dort, wo sie messbar Wert schafft — nicht als Spielerei,
                      sondern als Werkzeug, das Ihr Business nach vorne bringt.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {["OpenAI", "Claude APIs", "RAG", "Automation"].map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-white/5 text-gray-500 text-[10px] font-bold rounded-full uppercase tracking-wider"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </Reveal>

              {/* Analytics */}
              <Reveal direction="up" delay={0.15}>
                <TiltCard className="h-full">
                  <div className="bg-white border border-gray-100 rounded-2xl p-8 md:p-10 h-full group hover:border-gray-200 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-gray-900 flex items-center justify-center mb-8">
                      <BarChart3 className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-extrabold text-gray-900 tracking-tight mb-3">
                      Analytics & Tracking
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed font-medium mb-8">
                      DSGVO-konformes Tracking ohne Cookie-Banner. Wir implementieren
                      datenschutzfreundliche Analytics-Lösungen, die Ihnen die Insights liefern,
                      die Sie für fundierte Entscheidungen brauchen.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {["Plausible", "Matomo", "GA4", "Dashboards"].map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-gray-50 text-gray-500 text-[10px] font-bold rounded-full uppercase tracking-wider border border-gray-100"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </Reveal>

              {/* Beratung */}
              <Reveal direction="up" delay={0.3}>
                <TiltCard className="h-full">
                  <div className="bg-white border border-gray-100 rounded-2xl p-8 md:p-10 h-full group hover:border-gray-200 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-gray-900 flex items-center justify-center mb-8">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-extrabold text-gray-900 tracking-tight mb-3">
                      Strategische Beratung
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed font-medium mb-8">
                      Sie haben die Idee, wir den technischen Blick. Von der
                      Digitalstrategie über Tech-Stack-Entscheidungen bis zur
                      Marktpositionierung — wir beraten ehrlich, direkt und
                      ergebnisorientiert.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {["Workshops", "Audits", "Roadmaps", "Sparring"].map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-gray-50 text-gray-500 text-[10px] font-bold rounded-full uppercase tracking-wider border border-gray-100"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            </div>
          </div>

          {/* Marquee band */}
          <Reveal direction="up" delay={0.2}>
            <div className="mt-24 overflow-hidden marquee-wrap">
              <div
                className="marquee-track flex whitespace-nowrap"
                style={{
                  animation: "marquee 30s linear infinite",
                }}
              >
                {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
                  <span
                    key={`${item}-${i}`}
                    className="inline-flex items-center gap-4 mx-4 text-2xl md:text-3xl font-extrabold text-gray-200 tracking-tight select-none"
                  >
                    {item}
                    <span className="w-2 h-2 rounded-full bg-gray-300 inline-block" />
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* ═══════════════════════════════════════════════════
            10. TESTIMONIAL — Fullscreen centered quote
            ═══════════════════════════════════════════════════ */}
        <section className="relative py-40 md:py-52 overflow-hidden">
          {/* Background image */}
          <div className="absolute inset-0 z-0">
            <Image
              src={IMG_TESTIMONIAL}
              alt="Testimonial Hintergrund"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gray-950/80 backdrop-blur-sm" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <Reveal direction="up" animation="scale">
              <div>
                {/* Quotation mark */}
                <span className="text-8xl md:text-9xl font-serif italic text-white/10 leading-none block mb-4 select-none">
                  &ldquo;
                </span>
                <blockquote className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white font-bold tracking-tight leading-[1.3] -mt-12 md:-mt-16">
                  defuse. hat unsere Website nicht einfach neu gebaut — sie haben unser
                  gesamtes digitales Auftreten auf ein neues Level gehoben. Ladezeit unter
                  einer Sekunde, Top-Rankings und ein CMS, das unser Team liebt.
                </blockquote>
                <div className="mt-10">
                  <p className="text-white font-bold text-sm">
                    Bergpension Laasen Perle
                  </p>
                  <p className="text-gray-500 text-sm font-medium mt-1">
                    Website Relaunch & SEO
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            11. CTA — "Projekt starten" with giant arrow
            ═══════════════════════════════════════════════════ */}
        <section className="py-32 md:py-40 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <Reveal direction="up">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mb-8">
                Bereit?
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tighter leading-[0.95]">
                Lassen Sie uns Ihr{" "}
                <span className="font-display italic font-normal">nächstes Projekt</span>
                {" "}starten.
              </h2>
            </Reveal>

            <Reveal direction="up" delay={0.2}>
              <p className="mt-8 text-lg md:text-xl text-gray-500 font-medium max-w-xl mx-auto leading-relaxed">
                Kein Formular mit 20 Feldern. Ein kurzes Gespräch — und wir wissen, ob wir
                zusammenpassen.
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.3}>
              <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/kontakt"
                  className="group inline-flex items-center gap-4 px-10 py-5 rounded-full bg-gray-900 text-white font-bold text-base hover:bg-gray-800 transition-all hover:gap-6"
                >
                  Projekt starten
                  <ArrowDownRight className="w-5 h-5 group-hover:rotate-0 -rotate-45 transition-transform duration-300" />
                </Link>
                <Link
                  href="/referenzen"
                  className="px-10 py-5 rounded-full border border-gray-200 text-gray-900 font-bold text-base hover:bg-gray-100 transition-colors"
                >
                  Referenzen ansehen
                </Link>
              </div>
            </Reveal>

            {/* Giant decorative arrow */}
            <Reveal direction="up" delay={0.5} distance={100}>
              <div className="mt-24 flex justify-center">
                <ArrowDownRight className="w-32 h-32 md:w-48 md:h-48 text-gray-100 stroke-[0.5]" />
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

/*
  Über-uns: A scroll-driven visual story.

  The page is one continuous vertical scroll (no snap) where elements
  reveal, parallax, and transform based on scroll position. Each "chapter"
  flows into the next — no hard cuts, no snapping.

  Chapters:
  1. Hero — fullscreen title, subtitle fades in on scroll
  2. Manifest — large statement text that reveals word-by-word
  3. Pillars — 3 horizontal image+text blocks that parallax at different rates
  4. Stack — tech names that slide in from alternating sides
  5. Team — locations with circle-reveal image
  6. CTA — dark section with scale-in
*/

const IMG_1 = "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1740&auto=format&fit=crop";
const IMG_2 = "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1740&auto=format&fit=crop";
const IMG_3 = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1740&auto=format&fit=crop";
const IMG_4 = "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1740&auto=format&fit=crop";
const IMG_5 = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1740&auto=format&fit=crop";

const EASE_OUT = "cubic-bezier(0.16, 1, 0.3, 1)";

const MANIFEST_WORDS = "Wir bauen nicht für Sie — wir bauen mit Ihnen. Nachhaltig. Langfristig. Auf Augenhöhe.".split(" ");

const PILLARS = [
  {
    label: "Philosophie",
    title: "Partnerschaft statt Dienstleistung",
    text: "Jedes Projekt entsteht in enger Abstimmung. Ihr Team versteht, gestaltet mit und wächst mit der Lösung. Wir fördern interne Kompetenzen statt Abhängigkeiten zu schaffen.",
    image: IMG_1,
  },
  {
    label: "Technologie",
    title: "Headless. Serverless. Global.",
    text: "Next.js, Sanity CMS, Green Hosting — zukunftssichere Architekturen auf Topniveau. Performant, sicher, global verteilt über Edge-Netzwerke.",
    image: IMG_2,
  },
  {
    label: "Produkte",
    title: "Plauderbot & Lumera.ai",
    text: "Eigene Produkte, die wir selbst entwickeln und betreiben. Bewährte Technologie aus eigener Hand, die direkt in Ihr Projekt integriert werden kann.",
    image: IMG_4,
  },
];

const STACK = [
  { name: "Next.js", side: "left" },
  { name: "React", side: "right" },
  { name: "TypeScript", side: "left" },
  { name: "Tailwind CSS", side: "right" },
  { name: "Sanity CMS", side: "left" },
  { name: "Green Hosting", side: "right" },
  { name: "Serverless", side: "left" },
  { name: "Edge CDN", side: "right" },
];

const LOCATIONS = [
  { city: "Chemnitz", role: "Hauptsitz & Entwicklung" },
  { city: "Flöha", role: "Kreativ & Strategie" },
  { city: "Dresden", role: "Beratung & Kunden" },
];

function clamp(v: number, min = 0, max = 1) {
  return Math.max(min, Math.min(max, v));
}

export default function UeberUnsPage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [vh, setVh] = useState(1000);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setScrollY(el.scrollTop);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    setVh(el.clientHeight);
    el.addEventListener("scroll", handleScroll, { passive: true });
    const onResize = () => setVh(el.clientHeight);
    window.addEventListener("resize", onResize);
    return () => {
      el.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [handleScroll]);

  // Normalized progress per chapter (each ~1vh of scroll)
  const p = (chapter: number) => clamp((scrollY - chapter * vh) / vh);
  // Progress relative to a pixel offset
  const pAt = (px: number, range: number) => clamp((scrollY - px) / range);

  const heroOp = 1 - clamp(scrollY / (vh * 0.6));
  const heroScale = 1 - clamp(scrollY / (vh * 2)) * 0.05;

  // Chapters overlap — each starts before the previous ends
  const manifestStart = vh * 0.4;
  const manifestRange = vh * 2;

  const pillarsStart = vh * 2.5;

  const stackStart = vh * 5.5;
  const stackRange = vh * 2;

  const teamStart = vh * 7.5;
  const teamRange = vh * 1.5;

  const ctaStart = vh * 9.5;

  // Dark section detection for UI color switch
  const inDark = scrollY > ctaStart - vh * 0.2;
  const uiColor = inDark ? "white" : "#111827";
  const uiMuted = inDark ? "rgba(255,255,255,0.4)" : "#9ca3af";

  return (
    <>
    {/* Header */}
    <header className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl px-4 md:px-6 py-3 md:py-4 flex items-center justify-between" style={{ zIndex: 100, transition: "color 0.4s ease" }}>
      <a href="/" className="flex items-center gap-3 cursor-pointer group">
        <svg aria-hidden="true" className="w-8 h-8 group-hover:-rotate-12 transition-transform duration-300" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 0C16 8.83656 8.83656 16 0 16C8.83656 16 16 23.1634 16 32C16 23.1634 23.1634 16 32 16C23.1634 16 16 8.83656 16 0Z" fill={uiColor} style={{ transition: "fill 0.4s ease" }} />
        </svg>
        <span className="text-2xl font-extrabold tracking-tighter" style={{ color: uiColor, transition: "color 0.4s ease" }}>defuse.</span>
      </a>
      <a href="/kontakt" className="px-4 md:px-5 py-2 md:py-2.5 rounded-full text-sm font-bold transition-all shadow-sm" style={{
        backgroundColor: inDark ? "white" : "#111827",
        color: inDark ? "#111827" : "white",
        transition: "all 0.4s ease",
      }}>
        Projekt starten
      </a>
    </header>

    {/* Legal Links */}
    <div className="fixed bottom-4 left-4 md:bottom-6 md:left-8 flex items-center gap-3" style={{ zIndex: 100 }}>
      <a href="/impressum" className="text-[10px] font-medium hover:opacity-100 transition-all" style={{ color: uiMuted, transition: "color 0.4s ease" }}>Impressum</a>
      <a href="/datenschutz" className="text-[10px] font-medium hover:opacity-100 transition-all" style={{ color: uiMuted, transition: "color 0.4s ease" }}>Datenschutz</a>
    </div>
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-8 flex items-center gap-3" style={{ zIndex: 100 }}>
      <a href="/kontakt" className="text-[10px] font-medium hover:opacity-100 transition-all" style={{ color: uiMuted, transition: "color 0.4s ease" }}>Kontakt</a>
    </div>

    <div
      ref={scrollRef}
      className="h-screen overflow-y-auto bg-gray-50"
      style={{ scrollBehavior: "auto" }}
    >
      {/* Total scrollable height */}
      <div style={{ height: vh * 11, position: "relative" }}>

        {/* ===== Ch.1 — Hero (sticky) ===== */}
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-6 text-center" style={{ zIndex: 1 }}>
          <div style={{ opacity: heroOp, transform: `scale(${heroScale})`, willChange: "transform, opacity" }}>
            <p className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-[0.25em] mb-6">
              Über uns
            </p>
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-extrabold tracking-tight leading-[0.95] max-w-4xl">
              Technologie,
              <br />
              <span className="font-serif italic font-normal text-gray-400">die bleibt</span>
            </h1>
            <p className="mt-8 text-base md:text-lg text-gray-500 max-w-lg mx-auto font-medium leading-relaxed">
              Studierte Informatiker aus Sachsen. Nachhaltige Lösungen. Langfristige Partnerschaften.
            </p>

            {/* Stats */}
            <div className="mt-16 flex gap-12 md:gap-20 justify-center">
              {[
                { value: "100+", label: "Projekte" },
                { value: "8+", label: "Jahre" },
                { value: "98%", label: "Zufriedenheit" },
                { value: "3", label: "Standorte" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900">{s.value}</p>
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll hint */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2" style={{ opacity: heroOp }}>
            <div className="w-5 h-8 border-2 border-gray-300 rounded-full flex items-start justify-center pt-1.5">
              <div className="w-1 h-2 bg-gray-400 rounded-full animate-bounce" />
            </div>
          </div>
        </div>

        {/* ===== Ch.2 — Manifest (word-by-word reveal) ===== */}
        <div className="sticky top-0 h-screen flex items-center justify-center px-6" style={{ zIndex: 2 }}>
          <div className="absolute inset-0 bg-gray-50" style={{
            opacity: clamp((scrollY - manifestStart * 0.5) / (vh * 0.3)),
          }} />
          <p className="relative max-w-4xl text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-center">
            {MANIFEST_WORDS.map((word, i) => {
              const wordProgress = clamp((scrollY - manifestStart - (i / MANIFEST_WORDS.length) * manifestRange) / (manifestRange * 0.15));
              return (
                <span key={i} className="inline-block mr-[0.3em] transition-none" style={{
                  opacity: 0.15 + wordProgress * 0.85,
                  color: wordProgress > 0.5 ? "#111827" : "#d1d5db",
                  transition: "color 0.3s ease",
                }}>
                  {word}
                </span>
              );
            })}
          </p>
        </div>

        {/* ===== Ch.3 — Pillars (parallax image+text pairs) ===== */}
        <div className="relative" style={{ zIndex: 3 }}>
          <div className="absolute inset-0 bg-gray-50" />
          {PILLARS.map((pillar, i) => {
            const blockStart = pillarsStart + i * vh;
            const progress = clamp((scrollY - blockStart) / vh);
            const imgY = (1 - progress) * 80;
            const textY = (1 - progress) * 120;
            const opacity = clamp(progress * 4) * (1 - clamp((progress - 0.9) * 10));
            const isEven = i % 2 === 0;

            return (
              <div key={pillar.label} className="sticky top-0 h-screen flex items-center px-6 md:px-16 lg:px-24" style={{ zIndex: 3 + i }}>
                <div className="absolute inset-0 bg-gray-50" />
                <div className={`relative w-full max-w-6xl mx-auto flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-8 md:gap-16 items-center`}>
                  {/* Image */}
                  <div className="md:w-1/2 relative" style={{
                    transform: `translateY(${imgY}px)`,
                    opacity,
                    willChange: "transform, opacity",
                  }}>
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                      <Image src={pillar.image} alt={pillar.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </div>
                  </div>

                  {/* Text */}
                  <div className="md:w-1/2" style={{
                    transform: `translateY(${textY}px)`,
                    opacity,
                    willChange: "transform, opacity",
                  }}>
                    <p className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-[0.25em] mb-4">
                      {pillar.label}
                    </p>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-6">
                      {pillar.title}
                    </h2>
                    <p className="text-sm md:text-base text-gray-500 leading-relaxed max-w-md">
                      {pillar.text}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ===== Ch.4 — Stack (alternating slide-in) ===== */}
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-6" style={{ zIndex: 7 }}>
          <div className="absolute inset-0 bg-white" style={{
            opacity: clamp((scrollY - stackStart + vh) / (vh * 0.4)),
          }} />
          <div className="relative text-center mb-12">
            <p className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-[0.25em] mb-4">
              Techstack
            </p>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight" style={{
              opacity: clamp((scrollY - stackStart) / (vh * 0.3)),
            }}>
              Built{" "}
              <span className="font-serif italic font-normal text-gray-400">different</span>
            </h2>
          </div>
          <div className="relative flex flex-col gap-2 md:gap-3">
            {STACK.map((tech, i) => {
              const itemProgress = clamp((scrollY - stackStart - vh * 0.2 - i * (stackRange / STACK.length)) / (vh * 0.3));
              const xOffset = tech.side === "left" ? -100 * (1 - itemProgress) : 100 * (1 - itemProgress);
              return (
                <p key={tech.name}
                  className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight cursor-default hover:text-gray-900 transition-colors duration-300"
                  style={{
                    transform: `translateX(${xOffset}px)`,
                    opacity: itemProgress,
                    color: tech.side === "left" ? "#111827" : "#9ca3af",
                    textAlign: tech.side === "left" ? "right" : "left",
                    willChange: "transform, opacity",
                  }}
                >
                  {tech.name}
                </p>
              );
            })}
          </div>
        </div>

        {/* ===== Ch.5 — Team & Standorte ===== */}
        <div className="sticky top-0 h-screen flex items-center justify-center px-6" style={{ zIndex: 8 }}>
          <div className="absolute inset-0 bg-gray-50" style={{
            opacity: clamp((scrollY - teamStart + vh) / (vh * 0.3)),
          }} />
          <div className="relative max-w-6xl w-full flex flex-col md:flex-row gap-16 items-center">
            <div className="md:w-1/2">
              <p className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-[0.25em] mb-4" style={{
                opacity: clamp((scrollY - teamStart) / (vh * 0.2)),
              }}>Team</p>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-8" style={{
                opacity: clamp((scrollY - teamStart) / (vh * 0.3)),
                transform: `translateY(${(1 - clamp((scrollY - teamStart) / (vh * 0.3))) * 30}px)`,
              }}>
                Regional
                <br />
                <span className="font-serif italic font-normal text-gray-400">verwurzelt</span>
              </h2>
              <div className="space-y-4 text-sm text-gray-500 leading-relaxed" style={{
                opacity: clamp((scrollY - teamStart - vh * 0.1) / (vh * 0.3)),
              }}>
                <p>
                  Studierte Informatiker mit Büros in Chemnitz, Flöha und Dresden. Über 100 Projekte.
                  Wir stehen als starker Partner an Ihrer Seite — ob langfristige Kooperation oder gemeinsame Produktentwicklung.
                </p>
                <p>
                  Wir unterstützen und fördern aktiv Open-Source-Projekte. Innovation und Technologie treiben uns an.
                </p>
              </div>
            </div>

            <div className="md:w-1/2 relative">
              {/* Circle-reveal image */}
              <div className="relative w-full aspect-square max-w-md mx-auto rounded-3xl overflow-hidden" style={{
                clipPath: `circle(${clamp((scrollY - teamStart) / (vh * 0.5)) * 75}% at 50% 50%)`,
              }}>
                <Image src={IMG_5} alt="Team" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-50/60 to-transparent" />
              </div>

              {/* Location cards */}
              <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-2">
                {LOCATIONS.map((loc, i) => {
                  const cardP = clamp((scrollY - teamStart - vh * 0.3 - i * vh * 0.1) / (vh * 0.2));
                  return (
                    <div key={loc.city}
                      className="flex items-center justify-between p-4 rounded-xl bg-white/90 backdrop-blur-md border border-gray-200/40 hover:border-gray-900 transition-all duration-300"
                      style={{
                        opacity: cardP,
                        transform: `translateY(${(1 - cardP) * 20}px)`,
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-2 h-2 rounded-full bg-gray-900" />
                          <div className="absolute inset-0 w-2 h-2 rounded-full bg-gray-900" style={{
                            animation: `pulse-ring 3s ease-out ${i * 0.8}s infinite`,
                          }} />
                        </div>
                        <div>
                          <p className="text-sm font-extrabold text-gray-900">{loc.city}</p>
                          <p className="text-[10px] text-gray-400">{loc.role}</p>
                        </div>
                      </div>
                      <span className="text-gray-300 hover:text-gray-900 transition-colors text-lg">&rarr;</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ===== Ch.6 — CTA (dark) ===== */}
        <div className="sticky top-0 h-screen flex items-center justify-center px-6" style={{ zIndex: 9 }}>
          <div className="absolute inset-0" style={{
            backgroundColor: `rgb(${Math.round(249 - clamp((scrollY - ctaStart) / (vh * 0.4)) * 246)}, ${Math.round(250 - clamp((scrollY - ctaStart) / (vh * 0.4)) * 243)}, ${Math.round(251 - clamp((scrollY - ctaStart) / (vh * 0.4)) * 233)})`,
          }} />

          {/* Gradient orb */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[500px] h-[500px] rounded-full" style={{
              background: "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 60%)",
              animation: "orb-drift 10s ease-in-out infinite",
              opacity: clamp((scrollY - ctaStart) / (vh * 0.4)),
            }} />
          </div>

          <div className="relative text-center" style={{
            opacity: clamp((scrollY - ctaStart) / (vh * 0.4)),
            transform: `scale(${0.9 + clamp((scrollY - ctaStart) / (vh * 0.4)) * 0.1})`,
            filter: `blur(${(1 - clamp((scrollY - ctaStart) / (vh * 0.4))) * 8}px)`,
          }}>
            <p className="text-[9px] md:text-[10px] font-bold text-gray-500 uppercase tracking-[0.25em] mb-6">
              Nächster Schritt
            </p>
            <h2 className="text-5xl sm:text-6xl md:text-8xl font-extrabold tracking-tight leading-[0.95] max-w-3xl mx-auto text-white">
              Lassen Sie uns
              <br />
              <span className="font-serif italic font-normal text-gray-500">gemeinsam</span>
              <br />
              wachsen
            </h2>
            <p className="mt-8 text-sm text-gray-500 max-w-sm mx-auto leading-relaxed">
              Ob langfristige Kooperation oder konkretes Projekt — wir freuen uns auf den Austausch.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/kontakt"
                className="px-8 py-3.5 rounded-full bg-white text-gray-900 font-bold text-sm hover:bg-gray-100 transition-all hover:-translate-y-0.5 shadow-lg"
              >
                Projekt starten
              </Link>
              <Link href="/leistungen"
                className="px-8 py-3.5 rounded-full border-2 border-white/20 text-white font-bold text-sm hover:bg-white/10 transition-all"
              >
                Leistungen ansehen
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
    </>
  );
}

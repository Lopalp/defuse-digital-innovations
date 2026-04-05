"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { CountUp } from "@/components/CountUp";
import { TiltCard } from "@/components/TiltCard";
import { StickySection } from "@/components/StickySection";
import { 
  BarChart3, 
  Database, 
  Layers, 
  Cpu, 
  TrendingUp, 
  ShieldCheck,
  Check,
  ArrowRight
} from "lucide-react";

const IMG_HERO = "https://images.unsplash.com/photo-1772752021285-27e336543d01?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"; // IMG_1 (BI Card)
const IMG_DATA = "https://images.unsplash.com/photo-1772752021241-2d922cadbab1?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"; // HERO_IMAGE
const IMG_DASHBOARD = "https://images.unsplash.com/photo-1597865633454-41df015240ec?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"; // IMG_4 (Lucram Media)
const IMG_PRODUCTS = "https://images.unsplash.com/photo-1628776385527-3be340a9b419?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"; // IMG_2 (Produkte)

export default function BusinessIntelligencePage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="bg-white text-gray-950 font-sans selection:bg-gray-900 selection:text-white">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header variant={isScrolled ? "default" : "transparent"} />
      </div>

      {/* ═══════════════════════════════════════════════
          1. HERO — Massive & Centered
      ═══════════════════════════════════════════════ */}
      <section className="h-[110vh] relative overflow-hidden flex flex-col items-center justify-center px-6 text-center">
        <Image 
          src={IMG_HERO} 
          alt="Business Intelligence Hero" 
          fill 
          priority 
          className="object-cover" 
          sizes="100vw" 
        />
        {/* Modern Glassy Overlay */}
        <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-white z-[2]" />

        <div className="relative z-10 max-w-6xl mx-auto">
          <Reveal direction="up" delay={0.1}>
            <span className="inline-block px-4 py-1.5 mb-8 rounded-full bg-gray-900 text-white text-[10px] font-bold uppercase tracking-[0.4em]">
              Deep Tech Intelligence
            </span>
          </Reveal>
          <Reveal direction="up" distance={60} duration={1}>
            <h1 className="text-6xl sm:text-8xl md:text-[10rem] lg:text-[13rem] font-extrabold leading-[0.8] tracking-tighter text-gray-900">
              DATA<br />DRIVEN.
            </h1>
          </Reveal>
          <Reveal direction="up" delay={0.3}>
            <p className="mt-12 text-xl md:text-3xl text-gray-700 max-w-3xl mx-auto font-medium leading-tight">
              Wir bauen keine statischen Dashboards. Wir bauen <span className="font-headline italic font-normal text-gray-400">lebende Systeme</span> für präzise Geschäftsentscheidungen.
            </p>
          </Reveal>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10">
          <Reveal animation="fade" delay={1} duration={2}>
            <div className="flex flex-col items-center gap-4 opacity-30">
              <span className="text-[10px] font-bold uppercase tracking-widest">Scroll to Explore</span>
              <div className="w-px h-20 bg-gray-900" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          2. THE MISSION — Large Centered Text
      ═══════════════════════════════════════════════ */}
      <section className="py-40 md:py-60 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <Reveal direction="up">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-gray-900">
              Die meisten Unternehmen sammeln Daten.<br />
              <span className="text-gray-300">Nur wenige nutzen sie.</span>
            </h2>
          </Reveal>
          <Reveal direction="up" delay={0.2}>
            <p className="mt-12 text-lg md:text-2xl text-gray-500 leading-relaxed max-w-3xl mx-auto">
              In einer Welt voller Rohdaten ist Klarheit der ultimative Wettbewerbsvorteil. defuse digital schließt die Lücke zwischen Datenquelle und Geschäftsstrategie durch technologische Exzellenz.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          3. THE DATA FLOW — Simple CSS Diagram
      ═══════════════════════════════════════════════ */}
      <section className="py-32 md:py-48 px-6 bg-gray-50 border-y border-gray-100">
        <div className="max-w-6xl mx-auto">
          <Reveal direction="up" className="text-center mb-24">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mb-4">Unser Ansatz</p>
            <h3 className="text-4xl md:text-6xl font-extrabold tracking-tight">Vom Signal zur <span className="text-gray-300">Wirkung.</span></h3>
          </Reveal>

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24 items-start">
            {/* Step 1 */}
            <Reveal direction="up" delay={0.1}>
              <div className="flex flex-col items-center text-center group">
                <div className="w-24 h-24 rounded-3xl bg-white shadow-xl shadow-gray-200/50 flex items-center justify-center mb-8 border border-gray-100 group-hover:scale-110 transition-transform duration-500">
                  <Database className="w-8 h-8 text-gray-900" />
                </div>
                <h4 className="text-xl font-bold mb-4">Ingestion</h4>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Zentralisierung verteilter Datenquellen (ERP, CRM, Web, API) in eine skalierbare Single Source of Truth.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  {["REST API", "Webhooks", "ETL"].map(t => <span key={t} className="text-[9px] font-bold px-2 py-1 bg-gray-200/50 rounded uppercase tracking-wider">{t}</span>)}
                </div>
              </div>
            </Reveal>

            {/* Connection Line 1 */}
            <div className="hidden md:block absolute top-12 left-[30%] right-[60%] h-px bg-gray-200" />

            {/* Step 2 */}
            <Reveal direction="up" delay={0.2}>
              <div className="flex flex-col items-center text-center group">
                <div className="w-24 h-24 rounded-3xl bg-gray-900 shadow-2xl shadow-gray-400/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                  <Layers className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold mb-4">Transformation</h4>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Automatisierte Bereinigung, Aggregation und Modellierung nach höchsten Standards der Data Engineering Kunst.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  {["dbt", "Snowflake", "Python"].map(t => <span key={t} className="text-[9px] font-bold px-2 py-1 bg-gray-200/50 rounded uppercase tracking-wider">{t}</span>)}
                </div>
              </div>
            </Reveal>

            {/* Connection Line 2 */}
            <div className="hidden md:block absolute top-12 left-[63%] right-[25%] h-px bg-gray-200" />

            {/* Step 3 */}
            <Reveal direction="up" delay={0.3}>
              <div className="flex flex-col items-center text-center group">
                <div className="w-24 h-24 rounded-3xl bg-white shadow-xl shadow-gray-200/50 flex items-center justify-center mb-8 border border-gray-100 group-hover:scale-110 transition-transform duration-500">
                  <BarChart3 className="w-8 h-8 text-gray-900" />
                </div>
                <h4 className="text-xl font-bold mb-4">Intelligence</h4>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Interaktive Dashboards und Predictive-Modelle, die Antworten liefern, bevor Fragen gestellt werden.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  {["PowerBI", "Custom UI", "AI"].map(t => <span key={t} className="text-[9px] font-bold px-2 py-1 bg-gray-200/50 rounded uppercase tracking-wider">{t}</span>)}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          4. STICKY DEEP DIVES — Larger & More Detailed
      ═══════════════════════════════════════════════ */}
      <StickySection scrollHeight="300vh">
        {(progress) => (
          <div className="h-full relative overflow-hidden flex flex-col lg:flex-row items-stretch bg-white">
            <div className="w-full lg:w-1/2 relative overflow-hidden h-64 lg:h-auto">
              <Image src={IMG_DATA} alt="Data Architecture" fill className="object-cover" style={{ transform: `scale(${1.2 - progress * 0.2})` }} />
              <div className="absolute inset-0 bg-gray-900/10" />
            </div>
            <div className="w-full lg:w-1/2 p-10 md:p-20 lg:p-32 flex flex-col justify-center">
               <div style={{ opacity: Math.min(1, progress * 4), transform: `translateY(${(1 - Math.min(1, progress * 4)) * 50}px)` }}>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.4em] mb-12">Pfeiler 01</p>
                <h3 className="text-4xl md:text-7xl font-extrabold tracking-tighter leading-none mb-12">DATA WAREHOUSING</h3>
                <div className="space-y-8">
                  <div className="flex gap-6">
                    <div className="w-px h-auto bg-gray-200" />
                    <p className="text-lg md:text-xl text-gray-500 leading-relaxed">
                      Wir bauen performante Data Warehouses auf Basis modernster Cloud-Technologien. Skalierbarkeit ist kein Feature, sondern das Fundament.
                    </p>
                  </div>
                  <ul className="grid grid-cols-2 gap-4">
                    {["Snowflake Setup", "Architecture Audit", "Migration", "BigQuery", "Cost Optimization", "Security Layers"].map(item => (
                      <li key={item} className="flex items-center gap-3 text-[11px] font-bold text-gray-900 uppercase tracking-widest">
                        <Check className="w-3 h-3" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </StickySection>

      <StickySection scrollHeight="300vh">
        {(progress) => (
          <div className="h-full relative overflow-hidden flex flex-col lg:flex-row-reverse items-stretch bg-gray-50">
            <div className="w-full lg:w-1/2 relative overflow-hidden h-64 lg:h-auto">
              <Image src={IMG_DASHBOARD} alt="Analytics UI" fill className="object-cover" style={{ transform: `scale(${1 + progress * 0.15})` }} />
              <div className="absolute inset-0 bg-gray-900/10" />
            </div>
            <div className="w-full lg:w-1/2 p-10 md:p-20 lg:p-32 flex flex-col justify-center">
               <div style={{ opacity: Math.min(1, progress * 4), transform: `translateY(${(1 - Math.min(1, progress * 4)) * 50}px)` }}>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.4em] mb-12">Pfeiler 02</p>
                <h3 className="text-4xl md:text-7xl font-extrabold tracking-tighter leading-none mb-12">ADVANCED ANALYTICS</h3>
                <div className="space-y-8 text-right lg:text-left">
                  <div className="flex gap-6 flex-row-reverse lg:flex-row">
                    <div className="w-px h-auto bg-gray-200" />
                    <p className="text-lg md:text-xl text-gray-500 leading-relaxed">
                      Daten visualisieren kann jeder. Wir machen sie nutzbar. Mit interaktiven App-ähnlichen Erfahrungen statt statischen Berichten.
                    </p>
                  </div>
                  <ul className="grid grid-cols-2 gap-4">
                    {["Custom React UI", "PowerBI & Tableau", "Live Monitoring", "Alerting Systems", "UX for Data", "Global Dashboards"].map(item => (
                      <li key={item} className="flex items-center gap-3 text-[11px] font-bold text-gray-900 uppercase tracking-widest justify-end lg:justify-start">
                        <Check className="w-3 h-3" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </StickySection>

      {/* ═══════════════════════════════════════════════
          5. TOOLS & TECH — Cleaner Grid
      ═══════════════════════════════════════════════ */}
      <section className="py-32 md:py-48 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-20 items-end justify-between mb-24">
            <Reveal direction="left" className="lg:w-1/2">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mb-8">Technology Stack</p>
              <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-gray-900 leading-[0.9]">
                Tools für das<br /><span className="text-gray-300 italic font-headline font-normal">Next Level.</span>
              </h2>
            </Reveal>
            <Reveal direction="right" className="lg:w-1/3 text-gray-500 text-lg font-medium">
              Wir setzen auf marktführende Technologien, die Stabilität und Agilität vereinen. Kein Vendor-Lock-in, sondern State-of-the-Art.
            </Reveal>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 lg:gap-8">
            {[
              { name: "Snowflake", cat: "Cloud Warehouse" },
              { name: "dbt", cat: "Engineering" },
              { name: "Python", cat: "ML & Logic" },
              { name: "PowerBI", cat: "Analytics" },
              { name: "Airflow", cat: "Orchestration" },
              { name: "Vercel", cat: "Deployment" },
              { name: "PostgreSQL", cat: "Database" },
              { name: "Looker", cat: "BI Platform" },
              { name: "TypeScript", cat: "Custom Apps" },
              { name: "Docker", cat: "Infrastructure" },
              { name: "Figma", cat: "Design" },
              { name: "Azure", cat: "Cloud" },
            ].map((tool, i) => (
              <Reveal key={tool.name} direction="up" delay={i * 0.05}>
                <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col items-center justify-center text-center hover:bg-white hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 group">
                  <span className="text-sm font-extrabold text-gray-900 mb-2 group-hover:scale-110 transition-transform">{tool.name}</span>
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{tool.cat}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          6. STATS — Bold Numbers
      ═══════════════════════════════════════════════ */}
      <section className="py-32 md:py-60 px-6 bg-gray-900 text-white text-center">
        <div className="max-w-6xl mx-auto">
          <Reveal direction="up" className="mb-24 opacity-30">
            <p className="text-[10px] font-bold uppercase tracking-[0.5em]">Wirksamkeit in Zahlen</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
            {[
              { val: 40, suf: "%", label: "Reduktion der Kosten", desc: "Durch effiziente Data Pipelines" },
              { val: 10, suf: "x", label: "Schnellere Reports", desc: "Dank Cloud-Optimierung" },
              { val: 100, suf: "%", label: "Custom Built", desc: "Keine fertigen Vorlagen" },
            ].map((s, i) => (
              <Reveal key={s.label} direction="up" delay={i * 0.1}>
                <div className="flex flex-col items-center">
                  <div className="text-7xl md:text-9xl font-extrabold tracking-tighter mb-6 flex items-baseline">
                    <CountUp target={s.val} duration={2} />
                    <span className="text-4xl md:text-6xl text-white/20 ml-2">{s.suf}</span>
                  </div>
                  <h4 className="text-xl font-bold mb-4 tracking-tight">{s.label}</h4>
                  <p className="text-sm text-white/40 font-medium">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          7. THE PROCESS — Exciting Steps
      ═══════════════════════════════════════════════ */}
      <section className="py-32 md:py-48 px-6 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-32">
            <Reveal direction="up">
              <h2 className="text-5xl md:text-8xl font-extrabold tracking-tighter leading-none text-gray-900">
                WIE WIR <span className="text-gray-200 italic font-headline font-normal">STARTEN.</span>
              </h2>
            </Reveal>
          </div>

          <div className="space-y-32">
            {[
              { nr: "01", title: "Assessment & Audit", text: "Wir analysieren Ihre bestehende Datenlandschaft, identifizieren Datenquellen und definieren klare Business-Ziele. Kein Raten — nur Fakten." },
              { nr: "02", title: "Architecture Design", text: "Entwurf einer zukunftssicheren Daten-Infrastruktur, die mit Ihren Anforderungen wächst. Wir planen modular und effizient." },
              { nr: "03", title: "Engineering & Launch", text: "Hands-on Entwicklung der Pipelines und Dashboards. Nach wenigen Wochen sehen Sie erste Ergebnisse in Echtzeit." },
            ].map((step, i) => (
              <Reveal key={step.nr} direction={i % 2 === 0 ? "left" : "right"} distance={100}>
                <div className={`flex flex-col md:flex-row gap-12 md:gap-24 items-center ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="text-[10rem] md:text-[16rem] font-extrabold leading-none text-gray-50 select-none">{step.nr}</div>
                  <div className="flex-1 max-w-xl">
                    <h3 className="text-3xl md:text-5xl font-extrabold mb-8 tracking-tight text-gray-900">{step.title}</h3>
                    <p className="text-lg md:text-xl text-gray-500 leading-relaxed font-medium">{step.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          8. FINAL CTA
      ═══════════════════════════════════════════════ */}
      <section className="py-40 md:py-60 px-6 bg-gray-50 text-center relative overflow-hidden">
        {/* Abstract Background Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-gray-200/40 rounded-full blur-[120px] -z-10" />

        <div className="max-w-5xl mx-auto">
          <Reveal direction="up">
            <h2 className="text-5xl md:text-8xl lg:text-[10rem] font-extrabold tracking-tighter leading-[0.8] mb-16 text-gray-900">
              TIME TO<br />GET <span className="text-gray-300 italic font-headline font-normal">SMART.</span>
            </h2>
          </Reveal>
          <Reveal direction="up" delay={0.2}>
            <p className="text-xl md:text-3xl text-gray-500 max-w-2xl mx-auto leading-tight mb-20 font-medium">
              Vom ersten Call zum ersten Dashboard. Lassen Sie uns die Zukunft Ihres Unternehmens auf Daten bauen.
            </p>
          </Reveal>
          <Reveal direction="up" delay={0.4}>
            <Link 
              href="/kontakt" 
              className="group inline-flex items-center gap-6 px-12 py-6 rounded-full bg-gray-900 text-white font-bold text-xl md:text-2xl hover:bg-gray-800 transition-all hover:gap-10 shadow-2xl shadow-gray-400/20"
            >
              Projekt besprechen
              <ArrowRight className="w-8 h-8 group-hover:translate-x-4 transition-transform duration-500" />
            </Link>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}

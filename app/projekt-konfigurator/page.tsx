"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Building2,
  FolderKanban,
  Users,
  Target,
  FileText,
  Palette,
  Server,
  Shield,
  ClipboardList,
  Pencil,
  ChevronDown,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════════════ */

interface FormState {
  /* Step 1 — Firmeninfos */
  firmenname: string;
  branche: string;
  ansprechpartner: string;
  position: string;
  email: string;
  telefon: string;
  website: string;

  /* Step 2 — Projektart */
  projektart: string[];
  zeitrahmen: string;
  budget: string;

  /* Step 3 — Zielgruppe */
  zielgruppe: string;
  usp: string;
  wettbewerber: string;
  marktposition: string;

  /* Step 4 — Ziele */
  ziele: string[];
  erfolgsmessung: string;
  funktionen: string[];

  /* Step 5 — Inhalte */
  seitenumfang: string;
  seitenstruktur: string;
  inhalteVorhanden: string;
  texterstellung: string;
  bildmaterial: string;
  mehrsprachig: string;

  /* Step 6 — Design */
  designStatus: string;
  farbwelt: string;
  designStil: string[];
  referenzen: string;
  logoVorhanden: string;
  styleguideVorhanden: string;

  /* Step 7 — Tech-Bestand */
  domainVorhanden: string;
  domainName: string;
  hostingVorhanden: string;
  hostingAnbieter: string;
  mailVorhanden: string;
  mailAnbieter: string;
  bestehendeSysteme: string;
  cmsPreference: string;

  /* Step 8 — Betrieb & Recht */
  datenschutz: string;
  barrierefreiheit: string;
  seo: string;
  analytics: string;
  wartung: string;
  schulung: string;
  sonstiges: string;
}

const initialState: FormState = {
  firmenname: "",
  branche: "",
  ansprechpartner: "",
  position: "",
  email: "",
  telefon: "",
  website: "",

  projektart: [],
  zeitrahmen: "",
  budget: "",

  zielgruppe: "",
  usp: "",
  wettbewerber: "",
  marktposition: "",

  ziele: [],
  erfolgsmessung: "",
  funktionen: [],

  seitenumfang: "",
  seitenstruktur: "",
  inhalteVorhanden: "",
  texterstellung: "",
  bildmaterial: "",
  mehrsprachig: "",

  designStatus: "",
  farbwelt: "",
  designStil: [],
  referenzen: "",
  logoVorhanden: "",
  styleguideVorhanden: "",

  domainVorhanden: "",
  domainName: "",
  hostingVorhanden: "",
  hostingAnbieter: "",
  mailVorhanden: "",
  mailAnbieter: "",
  bestehendeSysteme: "",
  cmsPreference: "",

  datenschutz: "",
  barrierefreiheit: "",
  seo: "",
  analytics: "",
  wartung: "",
  schulung: "",
  sonstiges: "",
};

/* ═══════════════════════════════════════════════════════════════
   STEP META
   ═══════════════════════════════════════════════════════════════ */

const STEPS = [
  {
    num: "01",
    title: "Firmeninfos",
    subtitle: "Wer sind Sie?",
    icon: Building2,
  },
  {
    num: "02",
    title: "Projektart",
    subtitle: "Was moechten Sie umsetzen?",
    icon: FolderKanban,
  },
  {
    num: "03",
    title: "Zielgruppe",
    subtitle: "Wen moechten Sie erreichen?",
    icon: Users,
  },
  {
    num: "04",
    title: "Ziele",
    subtitle: "Was soll erreicht werden?",
    icon: Target,
  },
  {
    num: "05",
    title: "Inhalte",
    subtitle: "Welche Inhalte haben Sie?",
    icon: FileText,
  },
  {
    num: "06",
    title: "Design",
    subtitle: "Wie soll es aussehen?",
    icon: Palette,
  },
  {
    num: "07",
    title: "Tech-Bestand",
    subtitle: "Was besteht bereits?",
    icon: Server,
  },
  {
    num: "08",
    title: "Betrieb & Recht",
    subtitle: "Rechtliches & Betrieb.",
    icon: Shield,
  },
  {
    num: "09",
    title: "Uebersicht",
    subtitle: "Alles auf einen Blick.",
    icon: ClipboardList,
  },
];

/* ═══════════════════════════════════════════════════════════════
   OPTIONS DATA
   ═══════════════════════════════════════════════════════════════ */

const PROJEKTART_OPTIONS = [
  "Unternehmenswebsite",
  "Landing Page",
  "Online-Shop",
  "Web-App",
  "Relaunch",
  "IT-System",
  "API",
  "Mobile App",
  "Sonstiges",
];

const ZEITRAHMEN_OPTIONS = [
  { value: "sofort", label: "So schnell wie moeglich" },
  { value: "1-3-monate", label: "1 - 3 Monate" },
  { value: "3-6-monate", label: "3 - 6 Monate" },
  { value: "6-12-monate", label: "6 - 12 Monate" },
  { value: "flexibel", label: "Flexibel" },
];

const BUDGET_OPTIONS = [
  { value: "unter-5000", label: "Unter 5.000 EUR" },
  { value: "5000-10000", label: "5.000 - 10.000 EUR" },
  { value: "10000-25000", label: "10.000 - 25.000 EUR" },
  { value: "25000-50000", label: "25.000 - 50.000 EUR" },
  { value: "50000+", label: "50.000+ EUR" },
  { value: "unsicher", label: "Noch unsicher" },
];

const MARKTPOSITION_OPTIONS = [
  { value: "marktfuehrer", label: "Marktfuehrer" },
  { value: "etabliert", label: "Etabliert" },
  { value: "wachsend", label: "Wachsend" },
  { value: "startup", label: "Startup / Neugruendung" },
];

const ZIELE_OPTIONS = [
  "Neukunden gewinnen",
  "Marke staerken",
  "Online verkaufen",
  "Leads generieren",
  "Prozesse digitalisieren",
  "Mitarbeiter gewinnen",
  "Kundenbindung",
  "Informieren",
  "Sonstiges",
];

const FUNKTIONEN_OPTIONS = [
  "Kontaktformular",
  "Newsletter",
  "Blog / News",
  "Kundenportal",
  "Buchungssystem",
  "Chat / Support",
  "Konfigurator",
  "Suche",
  "Filterfunktionen",
  "Download-Bereich",
  "Social Media Integration",
  "Sonstiges",
];

const SEITENUMFANG_OPTIONS = [
  { value: "1-5", label: "1 - 5 Seiten" },
  { value: "6-15", label: "6 - 15 Seiten" },
  { value: "16-30", label: "16 - 30 Seiten" },
  { value: "30+", label: "30+ Seiten" },
  { value: "unsicher", label: "Noch unsicher" },
];

const JA_NEIN_UNSICHER = [
  { value: "ja", label: "Ja" },
  { value: "nein", label: "Nein" },
  { value: "unsicher", label: "Unsicher" },
];

const JA_NEIN_TEILWEISE = [
  { value: "ja", label: "Ja, vollstaendig" },
  { value: "teilweise", label: "Teilweise" },
  { value: "nein", label: "Nein" },
];

const TEXTERSTELLUNG_OPTIONS = [
  { value: "selbst", label: "Wir liefern die Texte" },
  { value: "agentur", label: "Agentur soll Texte erstellen" },
  { value: "gemeinsam", label: "Gemeinsam erarbeiten" },
];

const BILDMATERIAL_OPTIONS = [
  { value: "vorhanden", label: "Eigenes Bildmaterial vorhanden" },
  { value: "stockfotos", label: "Stockfotos gewuenscht" },
  { value: "fotoshooting", label: "Fotoshooting gewuenscht" },
  { value: "unsicher", label: "Noch unsicher" },
];

const MEHRSPRACHIG_OPTIONS = [
  { value: "nein", label: "Nein, nur Deutsch" },
  { value: "de-en", label: "Deutsch + Englisch" },
  { value: "mehrere", label: "Mehrere Sprachen" },
  { value: "unsicher", label: "Noch unsicher" },
];

const DESIGN_STATUS_OPTIONS = [
  { value: "kein-design", label: "Kein Design vorhanden" },
  { value: "grobe-vorstellung", label: "Grobe Vorstellung" },
  { value: "design-vorhanden", label: "Design vorhanden (Figma o.ae.)" },
  { value: "redesign", label: "Bestehendes Design ueberarbeiten" },
];

const DESIGN_STIL_OPTIONS = [
  "Minimalistisch",
  "Modern / Clean",
  "Verspielt / Kreativ",
  "Corporate / Serioes",
  "Luxurioes / Premium",
  "Technisch / Futuristisch",
  "Natuerlich / Organisch",
  "Bold / Auffaellig",
];

const LOGO_OPTIONS = [
  { value: "ja", label: "Ja, Logo vorhanden" },
  { value: "nein", label: "Nein, Logo wird benoetigt" },
  { value: "ueberarbeiten", label: "Logo soll ueberarbeitet werden" },
];

const STYLEGUIDE_OPTIONS = [
  { value: "ja", label: "Ja, Styleguide vorhanden" },
  { value: "nein", label: "Nein" },
  { value: "teilweise", label: "Teilweise (z.B. nur Farben/Schriften)" },
];

const DOMAIN_OPTIONS = [
  { value: "ja", label: "Ja, Domain vorhanden" },
  { value: "nein", label: "Nein, brauche eine neue" },
  { value: "unsicher", label: "Unsicher" },
];

const HOSTING_OPTIONS = [
  { value: "ja", label: "Ja, Hosting vorhanden" },
  { value: "nein", label: "Nein, Hosting benoetigt" },
  { value: "wechsel", label: "Hosting-Wechsel gewuenscht" },
];

const MAIL_OPTIONS = [
  { value: "ja", label: "Ja, E-Mail vorhanden" },
  { value: "nein", label: "Nein, E-Mail benoetigt" },
  { value: "wechsel", label: "E-Mail-Wechsel gewuenscht" },
];

const CMS_OPTIONS = [
  { value: "sanity", label: "Sanity CMS" },
  { value: "wordpress", label: "WordPress" },
  { value: "headless", label: "Anderes Headless CMS" },
  { value: "kein-cms", label: "Kein CMS noetig" },
  { value: "empfehlung", label: "Empfehlung gewuenscht" },
];

const DATENSCHUTZ_OPTIONS = [
  { value: "wichtig", label: "Sehr wichtig, muss DSGVO-konform sein" },
  { value: "standard", label: "Standard ausreichend" },
  { value: "unsicher", label: "Bitte beraten" },
];

const BARRIEREFREIHEIT_OPTIONS = [
  { value: "ja", label: "Ja, Barrierefreiheit wichtig" },
  { value: "nice-to-have", label: "Nice-to-have" },
  { value: "nein", label: "Nicht relevant" },
  { value: "unsicher", label: "Bitte beraten" },
];

const SEO_OPTIONS = [
  { value: "ja", label: "Ja, SEO ist sehr wichtig" },
  { value: "basis", label: "Basis-SEO reicht" },
  { value: "unsicher", label: "Bitte beraten" },
];

const ANALYTICS_OPTIONS = [
  { value: "ja", label: "Ja, Analytics gewuenscht" },
  { value: "datenschutzkonform", label: "Nur datenschutzkonforme Loesung" },
  { value: "nein", label: "Nein, nicht noetig" },
  { value: "unsicher", label: "Bitte beraten" },
];

const WARTUNG_OPTIONS = [
  { value: "ja", label: "Ja, laufende Wartung gewuenscht" },
  { value: "nein", label: "Nein, wir betreuen selbst" },
  { value: "unsicher", label: "Bitte beraten" },
];

const SCHULUNG_OPTIONS = [
  { value: "ja", label: "Ja, Schulung gewuenscht" },
  { value: "nein", label: "Nein, nicht noetig" },
  { value: "vielleicht", label: "Vielleicht, je nach System" },
];

/* ═══════════════════════════════════════════════════════════════
   FORM PRIMITIVES
   ═══════════════════════════════════════════════════════════════ */

const inputCls =
  "w-full px-4 py-3.5 rounded-xl bg-white border border-gray-200/60 text-sm text-gray-900 font-medium placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition-all";
const labelCls =
  "block text-xs font-bold text-gray-400 uppercase tracking-[0.1em] mb-2";

function CheckboxGroup({
  options,
  selected,
  onChange,
  columns = 2,
}: {
  options: string[];
  selected: string[];
  onChange: (v: string[]) => void;
  columns?: number;
}) {
  const toggle = (opt: string) =>
    onChange(
      selected.includes(opt)
        ? selected.filter((v) => v !== opt)
        : [...selected, opt]
    );
  return (
    <div
      className={`grid gap-2 ${
        columns === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"
      }`}
    >
      {options.map((opt) => {
        const active = selected.includes(opt);
        return (
          <button
            key={opt}
            type="button"
            onClick={() => toggle(opt)}
            className={`text-left px-4 py-3.5 rounded-xl border text-sm font-medium transition-all cursor-pointer ${
              active
                ? "border-gray-900 bg-gray-900 text-white"
                : "border-gray-200/60 bg-white text-gray-600 hover:border-gray-300"
            }`}
          >
            <span className="flex items-center gap-3">
              <span
                className={`w-4 h-4 rounded flex items-center justify-center text-[10px] shrink-0 ${
                  active ? "bg-white text-gray-900" : "border border-gray-300"
                }`}
              >
                {active && <Check className="w-3 h-3" />}
              </span>
              {opt}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function RadioGroup({
  options,
  value,
  onChange,
  columns = 2,
}: {
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
  columns?: number;
}) {
  return (
    <div
      className={`grid gap-2 ${
        columns === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"
      }`}
    >
      {options.map((opt) => {
        const active = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`text-left px-4 py-3.5 rounded-xl border text-sm font-medium transition-all cursor-pointer ${
              active
                ? "border-gray-900 bg-gray-900 text-white"
                : "border-gray-200/60 bg-white text-gray-600 hover:border-gray-300"
            }`}
          >
            <span className="flex items-center gap-3">
              <span
                className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                  active ? "border-white" : "border-gray-300"
                }`}
              >
                {active && (
                  <span className="w-2 h-2 rounded-full bg-white" />
                )}
              </span>
              {opt.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function StepTransition({
  active,
  children,
}: {
  active: boolean;
  children: React.ReactNode;
}) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (active) {
      const t = setTimeout(() => setShow(true), 50);
      return () => clearTimeout(t);
    }
    setShow(false);
  }, [active]);
  if (!active) return null;
  return (
    <div
      className="transition-all duration-500 ease-out"
      style={{
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0)" : "translateY(24px)",
      }}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   VALIDATION
   ═══════════════════════════════════════════════════════════════ */

function validateStep(step: number, d: FormState): string[] {
  const e: string[] = [];
  switch (step) {
    case 0:
      if (!d.firmenname.trim()) e.push("Firmenname ist ein Pflichtfeld.");
      if (!d.ansprechpartner.trim())
        e.push("Ansprechpartner ist ein Pflichtfeld.");
      if (!d.email.trim()) e.push("E-Mail ist ein Pflichtfeld.");
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email))
        e.push("Bitte geben Sie eine gueltige E-Mail-Adresse ein.");
      break;
    case 1:
      if (!d.projektart.length)
        e.push("Bitte waehlen Sie mindestens eine Projektart.");
      break;
    case 2:
      if (!d.zielgruppe.trim())
        e.push("Bitte beschreiben Sie Ihre Zielgruppe.");
      break;
    case 3:
      if (!d.ziele.length)
        e.push("Bitte waehlen Sie mindestens ein Ziel.");
      break;
    case 4:
      break;
    case 5:
      break;
    case 6:
      break;
    case 7:
      break;
  }
  return e;
}

/* ═══════════════════════════════════════════════════════════════
   HELPER — find label for a radio value
   ═══════════════════════════════════════════════════════════════ */

function findLabel(
  options: { value: string; label: string }[],
  value: string
): string {
  return options.find((o) => o.value === value)?.label || value || "—";
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */

export default function ProjektKonfigurator() {
  const [currentStep, setCurrentStep] = useState(-1); // -1 = hero
  const [data, setData] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setData((prev) => ({ ...prev, [key]: value }));

  const goNext = () => {
    if (currentStep === -1) {
      setCurrentStep(0);
      return;
    }
    if (currentStep < 8) {
      const errs = validateStep(currentStep, data);
      if (errs.length) {
        setErrors(errs);
        return;
      }
    }
    setErrors([]);
    setCurrentStep((s) => Math.min(s + 1, 8));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goPrev = () => {
    setErrors([]);
    setCurrentStep((s) => Math.max(s - 1, -1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToStep = (step: number) => {
    setErrors([]);
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = () => {
    console.log("Projekt-Konfigurator Data:", data);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ── HERO ── */
  if (currentStep === -1 && !submitted) {
    return (
      <>
        <Header />
        <main>
          <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
            {/* Giant background number */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
              <span className="text-[20rem] sm:text-[30rem] md:text-[40rem] font-extrabold text-gray-100/70 leading-none tracking-tighter">
                09
              </span>
            </div>

            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <Reveal direction="up" distance={60} duration={1}>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-6">
                  Projekt-Konfigurator
                </p>
              </Reveal>
              <Reveal direction="up" distance={60} duration={1} delay={0.1}>
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.05]">
                  Ihr Projekt.{" "}
                  <span className="font-headline italic font-normal text-gray-500">
                    Ihre Vision.
                  </span>
                </h1>
              </Reveal>
              <Reveal direction="up" delay={0.3}>
                <p className="mt-8 text-lg sm:text-xl text-gray-500 max-w-xl mx-auto font-medium leading-relaxed">
                  In 9 Schritten erfassen wir alle Details Ihres Projekts — fuer
                  ein passgenaues Angebot ohne Rueckfragen.
                </p>
              </Reveal>
              <Reveal direction="up" delay={0.5}>
                <button
                  onClick={goNext}
                  className="mt-10 inline-flex items-center gap-2 px-10 py-5 rounded-full bg-gray-900 text-white font-bold text-base hover:bg-gray-800 transition-colors cursor-pointer group"
                >
                  Konfiguration starten
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Reveal>
              <Reveal direction="up" delay={0.7}>
                <p className="mt-6 text-xs text-gray-400 font-medium">
                  Dauert ca. 10 Minuten | Unverbindlich | Kostenlos
                </p>
              </Reveal>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  /* ── SUCCESS ── */
  if (submitted) {
    return (
      <>
        <Header />
        <main className="min-h-[80vh] flex items-center justify-center px-6">
          <div className="text-center max-w-lg">
            <Reveal animation="scale">
              <div className="w-20 h-20 rounded-2xl bg-gray-900 flex items-center justify-center mx-auto mb-10">
                <Check className="w-8 h-8 text-white" />
              </div>
            </Reveal>
            <Reveal direction="up" delay={0.2}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                Vielen Dank!
              </h2>
            </Reveal>
            <Reveal direction="up" delay={0.4}>
              <p className="text-gray-500 font-medium leading-relaxed text-lg mb-2">
                Ihre Projektanfrage ist bei uns eingegangen.
              </p>
              <p className="text-gray-400 font-medium leading-relaxed text-sm">
                Wir analysieren Ihre Angaben und melden uns innerhalb von 24
                Stunden mit einer ersten Einschaetzung und den naechsten
                Schritten.
              </p>
            </Reveal>
            <Reveal direction="up" delay={0.6}>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gray-900 text-white text-sm font-bold hover:bg-gray-800 transition-colors"
                >
                  Zur Startseite
                </Link>
                <Link
                  href="/kontakt"
                  className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors"
                >
                  Zum Kontakt <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  /* ── MULTI-STEP FORM ── */
  const stepProgress = ((currentStep + 1) / STEPS.length) * 100;

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <div className="max-w-7xl mx-auto px-6 pt-28 pb-24">
          <div className="flex gap-12">
            {/* ── SIDEBAR (Desktop) ── */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-28">
                <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em] mb-6">
                  Fortschritt
                </p>
                <nav className="space-y-1">
                  {STEPS.map((s, i) => {
                    const Icon = s.icon;
                    const isActive = i === currentStep;
                    const isCompleted = i < currentStep;
                    return (
                      <button
                        key={s.num}
                        type="button"
                        onClick={() => {
                          if (isCompleted) goToStep(i);
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
                          isActive
                            ? "bg-gray-900 text-white"
                            : isCompleted
                            ? "bg-gray-100 text-gray-900 hover:bg-gray-200 cursor-pointer"
                            : "text-gray-300 cursor-default"
                        }`}
                      >
                        <span
                          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                            isActive
                              ? "bg-white/20"
                              : isCompleted
                              ? "bg-gray-900 text-white"
                              : "bg-gray-100"
                          }`}
                        >
                          {isCompleted ? (
                            <Check className="w-3.5 h-3.5" />
                          ) : (
                            <Icon className="w-3.5 h-3.5" />
                          )}
                        </span>
                        <div className="min-w-0">
                          <p
                            className={`text-xs font-bold truncate ${
                              isActive
                                ? "text-white"
                                : isCompleted
                                ? "text-gray-900"
                                : "text-gray-300"
                            }`}
                          >
                            {s.num}. {s.title}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </nav>

                {/* Sidebar progress indicator */}
                <div className="mt-8 pt-6 border-t border-gray-200/50">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.1em]">
                      Gesamt
                    </p>
                    <p className="text-xs font-bold text-gray-400">
                      {currentStep + 1}/{STEPS.length}
                    </p>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gray-900 transition-all duration-500"
                      style={{ width: `${stepProgress}%` }}
                    />
                  </div>
                </div>
              </div>
            </aside>

            {/* ── MAIN CONTENT ── */}
            <div className="flex-1 max-w-3xl">
              {/* Mobile progress bar */}
              <div className="lg:hidden mb-8">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-bold text-gray-400">
                    Schritt {STEPS[currentStep].num} von 09
                  </p>
                  <p className="text-xs font-bold text-gray-300">
                    {STEPS[currentStep].title}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  {STEPS.map((s, i) => (
                    <div
                      key={s.num}
                      className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                        i <= currentStep ? "bg-gray-900" : "bg-gray-200"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Step header */}
              <div className="mb-10">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">
                  Schritt {STEPS[currentStep].num}
                </p>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  {STEPS[currentStep].title}
                </h2>
                <p className="text-sm text-gray-400 font-medium mt-1">
                  {STEPS[currentStep].subtitle}
                </p>
              </div>

              {/* ══════════════════════════════════════
                 STEP 1 — Firmeninfos
              ══════════════════════════════════════ */}
              <StepTransition active={currentStep === 0}>
                <div className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className={labelCls}>Firmenname *</label>
                      <input
                        type="text"
                        value={data.firmenname}
                        onChange={(e) => update("firmenname", e.target.value)}
                        placeholder="Musterfirma GmbH"
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className={labelCls}>Branche</label>
                      <input
                        type="text"
                        value={data.branche}
                        onChange={(e) => update("branche", e.target.value)}
                        placeholder="z.B. IT, Handwerk, Gastronomie"
                        className={inputCls}
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className={labelCls}>Ansprechpartner *</label>
                      <input
                        type="text"
                        value={data.ansprechpartner}
                        onChange={(e) =>
                          update("ansprechpartner", e.target.value)
                        }
                        placeholder="Max Mustermann"
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className={labelCls}>Position</label>
                      <input
                        type="text"
                        value={data.position}
                        onChange={(e) => update("position", e.target.value)}
                        placeholder="z.B. Geschaeftsfuehrer"
                        className={inputCls}
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className={labelCls}>E-Mail *</label>
                      <input
                        type="email"
                        value={data.email}
                        onChange={(e) => update("email", e.target.value)}
                        placeholder="max@musterfirma.de"
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className={labelCls}>Telefon</label>
                      <input
                        type="tel"
                        value={data.telefon}
                        onChange={(e) => update("telefon", e.target.value)}
                        placeholder="+49 (0) 123 456 789"
                        className={inputCls}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>
                      Bestehende Website{" "}
                      <span className="text-gray-300 normal-case tracking-normal">
                        (optional)
                      </span>
                    </label>
                    <input
                      type="url"
                      value={data.website}
                      onChange={(e) => update("website", e.target.value)}
                      placeholder="https://www.musterfirma.de"
                      className={inputCls}
                    />
                  </div>
                </div>
              </StepTransition>

              {/* ══════════════════════════════════════
                 STEP 2 — Projektart
              ══════════════════════════════════════ */}
              <StepTransition active={currentStep === 1}>
                <div className="space-y-8">
                  <div>
                    <label className={labelCls}>
                      Was moechten Sie umsetzen? *
                    </label>
                    <CheckboxGroup
                      options={PROJEKTART_OPTIONS}
                      selected={data.projektart}
                      onChange={(v) => update("projektart", v)}
                      columns={3}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Zeitrahmen</label>
                    <RadioGroup
                      options={ZEITRAHMEN_OPTIONS}
                      value={data.zeitrahmen}
                      onChange={(v) => update("zeitrahmen", v)}
                      columns={3}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Budget-Rahmen</label>
                    <RadioGroup
                      options={BUDGET_OPTIONS}
                      value={data.budget}
                      onChange={(v) => update("budget", v)}
                      columns={3}
                    />
                  </div>
                </div>
              </StepTransition>

              {/* ══════════════════════════════════════
                 STEP 3 — Zielgruppe
              ══════════════════════════════════════ */}
              <StepTransition active={currentStep === 2}>
                <div className="space-y-6">
                  <div>
                    <label className={labelCls}>
                      Wer ist Ihre Zielgruppe? *
                    </label>
                    <textarea
                      value={data.zielgruppe}
                      onChange={(e) => update("zielgruppe", e.target.value)}
                      placeholder="Beschreiben Sie Ihre idealen Kunden — Alter, Interessen, Beduerfnisse, Branche..."
                      rows={4}
                      className={`${inputCls} resize-none`}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>
                      Was ist Ihr USP / Alleinstellungsmerkmal?
                    </label>
                    <textarea
                      value={data.usp}
                      onChange={(e) => update("usp", e.target.value)}
                      placeholder="Was unterscheidet Sie von der Konkurrenz?"
                      rows={3}
                      className={`${inputCls} resize-none`}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>
                      Wichtigste Wettbewerber
                    </label>
                    <textarea
                      value={data.wettbewerber}
                      onChange={(e) => update("wettbewerber", e.target.value)}
                      placeholder="Nennen Sie 2-3 Wettbewerber (mit Website-URL, wenn moeglich)"
                      rows={3}
                      className={`${inputCls} resize-none`}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Marktposition</label>
                    <RadioGroup
                      options={MARKTPOSITION_OPTIONS}
                      value={data.marktposition}
                      onChange={(v) => update("marktposition", v)}
                    />
                  </div>
                </div>
              </StepTransition>

              {/* ══════════════════════════════════════
                 STEP 4 — Ziele
              ══════════════════════════════════════ */}
              <StepTransition active={currentStep === 3}>
                <div className="space-y-8">
                  <div>
                    <label className={labelCls}>
                      Welche Ziele verfolgen Sie? *
                    </label>
                    <CheckboxGroup
                      options={ZIELE_OPTIONS}
                      selected={data.ziele}
                      onChange={(v) => update("ziele", v)}
                      columns={3}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>
                      Wie messen Sie Erfolg?
                    </label>
                    <textarea
                      value={data.erfolgsmessung}
                      onChange={(e) =>
                        update("erfolgsmessung", e.target.value)
                      }
                      placeholder="z.B. Mehr Anfragen, hoehere Conversion Rate, besseres Google-Ranking..."
                      rows={3}
                      className={`${inputCls} resize-none`}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>
                      Gewuenschte Funktionen
                    </label>
                    <CheckboxGroup
                      options={FUNKTIONEN_OPTIONS}
                      selected={data.funktionen}
                      onChange={(v) => update("funktionen", v)}
                      columns={3}
                    />
                  </div>
                </div>
              </StepTransition>

              {/* ══════════════════════════════════════
                 STEP 5 — Inhalte
              ══════════════════════════════════════ */}
              <StepTransition active={currentStep === 4}>
                <div className="space-y-8">
                  <div>
                    <label className={labelCls}>Seitenumfang</label>
                    <RadioGroup
                      options={SEITENUMFANG_OPTIONS}
                      value={data.seitenumfang}
                      onChange={(v) => update("seitenumfang", v)}
                      columns={3}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>
                      Gewuenschte Seitenstruktur
                    </label>
                    <textarea
                      value={data.seitenstruktur}
                      onChange={(e) =>
                        update("seitenstruktur", e.target.value)
                      }
                      placeholder="z.B. Startseite, Ueber uns, Leistungen, Blog, Kontakt..."
                      rows={3}
                      className={`${inputCls} resize-none`}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>
                      Sind Inhalte bereits vorhanden?
                    </label>
                    <RadioGroup
                      options={JA_NEIN_TEILWEISE}
                      value={data.inhalteVorhanden}
                      onChange={(v) => update("inhalteVorhanden", v)}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Texterstellung</label>
                    <RadioGroup
                      options={TEXTERSTELLUNG_OPTIONS}
                      value={data.texterstellung}
                      onChange={(v) => update("texterstellung", v)}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Bildmaterial</label>
                    <RadioGroup
                      options={BILDMATERIAL_OPTIONS}
                      value={data.bildmaterial}
                      onChange={(v) => update("bildmaterial", v)}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Mehrsprachigkeit</label>
                    <RadioGroup
                      options={MEHRSPRACHIG_OPTIONS}
                      value={data.mehrsprachig}
                      onChange={(v) => update("mehrsprachig", v)}
                    />
                  </div>
                </div>
              </StepTransition>

              {/* ══════════════════════════════════════
                 STEP 6 — Design
              ══════════════════════════════════════ */}
              <StepTransition active={currentStep === 5}>
                <div className="space-y-8">
                  <div>
                    <label className={labelCls}>Design-Status</label>
                    <RadioGroup
                      options={DESIGN_STATUS_OPTIONS}
                      value={data.designStatus}
                      onChange={(v) => update("designStatus", v)}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>
                      Farbwelt / Wunschfarben
                    </label>
                    <input
                      type="text"
                      value={data.farbwelt}
                      onChange={(e) => update("farbwelt", e.target.value)}
                      placeholder="z.B. Dunkelblau + Gold, Schwarz + Weiss, erdig..."
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>
                      Gewuenschter Design-Stil
                    </label>
                    <CheckboxGroup
                      options={DESIGN_STIL_OPTIONS}
                      selected={data.designStil}
                      onChange={(v) => update("designStil", v)}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>
                      Referenz-Websites die Ihnen gefallen
                    </label>
                    <textarea
                      value={data.referenzen}
                      onChange={(e) => update("referenzen", e.target.value)}
                      placeholder="Nennen Sie 2-3 Websites, deren Design Ihnen gefaellt (mit URL)"
                      rows={3}
                      className={`${inputCls} resize-none`}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Logo vorhanden?</label>
                    <RadioGroup
                      options={LOGO_OPTIONS}
                      value={data.logoVorhanden}
                      onChange={(v) => update("logoVorhanden", v)}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>
                      Styleguide / Brand Guidelines
                    </label>
                    <RadioGroup
                      options={STYLEGUIDE_OPTIONS}
                      value={data.styleguideVorhanden}
                      onChange={(v) => update("styleguideVorhanden", v)}
                    />
                  </div>
                </div>
              </StepTransition>

              {/* ══════════════════════════════════════
                 STEP 7 — Tech-Bestand
              ══════════════════════════════════════ */}
              <StepTransition active={currentStep === 6}>
                <div className="space-y-8">
                  <div className="space-y-4">
                    <div>
                      <label className={labelCls}>
                        Domain vorhanden?
                      </label>
                      <RadioGroup
                        options={DOMAIN_OPTIONS}
                        value={data.domainVorhanden}
                        onChange={(v) => update("domainVorhanden", v)}
                      />
                    </div>
                    {data.domainVorhanden === "ja" && (
                      <div>
                        <label className={labelCls}>
                          Domain-Name
                        </label>
                        <input
                          type="text"
                          value={data.domainName}
                          onChange={(e) =>
                            update("domainName", e.target.value)
                          }
                          placeholder="www.musterfirma.de"
                          className={inputCls}
                        />
                      </div>
                    )}
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className={labelCls}>
                        Hosting vorhanden?
                      </label>
                      <RadioGroup
                        options={HOSTING_OPTIONS}
                        value={data.hostingVorhanden}
                        onChange={(v) => update("hostingVorhanden", v)}
                      />
                    </div>
                    {(data.hostingVorhanden === "ja" ||
                      data.hostingVorhanden === "wechsel") && (
                      <div>
                        <label className={labelCls}>
                          Hosting-Anbieter
                        </label>
                        <input
                          type="text"
                          value={data.hostingAnbieter}
                          onChange={(e) =>
                            update("hostingAnbieter", e.target.value)
                          }
                          placeholder="z.B. IONOS, Hetzner, Strato..."
                          className={inputCls}
                        />
                      </div>
                    )}
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className={labelCls}>
                        E-Mail-System vorhanden?
                      </label>
                      <RadioGroup
                        options={MAIL_OPTIONS}
                        value={data.mailVorhanden}
                        onChange={(v) => update("mailVorhanden", v)}
                      />
                    </div>
                    {(data.mailVorhanden === "ja" ||
                      data.mailVorhanden === "wechsel") && (
                      <div>
                        <label className={labelCls}>
                          E-Mail-Anbieter
                        </label>
                        <input
                          type="text"
                          value={data.mailAnbieter}
                          onChange={(e) =>
                            update("mailAnbieter", e.target.value)
                          }
                          placeholder="z.B. Microsoft 365, Google Workspace..."
                          className={inputCls}
                        />
                      </div>
                    )}
                  </div>
                  <div>
                    <label className={labelCls}>
                      Bestehende Systeme / Tools
                    </label>
                    <textarea
                      value={data.bestehendeSysteme}
                      onChange={(e) =>
                        update("bestehendeSysteme", e.target.value)
                      }
                      placeholder="z.B. CRM, ERP, Newsletter-Tool, Buchhaltung..."
                      rows={3}
                      className={`${inputCls} resize-none`}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>CMS-Praeferenz</label>
                    <RadioGroup
                      options={CMS_OPTIONS}
                      value={data.cmsPreference}
                      onChange={(v) => update("cmsPreference", v)}
                      columns={3}
                    />
                  </div>
                </div>
              </StepTransition>

              {/* ══════════════════════════════════════
                 STEP 8 — Betrieb & Recht
              ══════════════════════════════════════ */}
              <StepTransition active={currentStep === 7}>
                <div className="space-y-8">
                  <div>
                    <label className={labelCls}>Datenschutz / DSGVO</label>
                    <RadioGroup
                      options={DATENSCHUTZ_OPTIONS}
                      value={data.datenschutz}
                      onChange={(v) => update("datenschutz", v)}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Barrierefreiheit</label>
                    <RadioGroup
                      options={BARRIEREFREIHEIT_OPTIONS}
                      value={data.barrierefreiheit}
                      onChange={(v) => update("barrierefreiheit", v)}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>SEO</label>
                    <RadioGroup
                      options={SEO_OPTIONS}
                      value={data.seo}
                      onChange={(v) => update("seo", v)}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>
                      Analytics / Tracking
                    </label>
                    <RadioGroup
                      options={ANALYTICS_OPTIONS}
                      value={data.analytics}
                      onChange={(v) => update("analytics", v)}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>
                      Wartung & Support
                    </label>
                    <RadioGroup
                      options={WARTUNG_OPTIONS}
                      value={data.wartung}
                      onChange={(v) => update("wartung", v)}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Schulung</label>
                    <RadioGroup
                      options={SCHULUNG_OPTIONS}
                      value={data.schulung}
                      onChange={(v) => update("schulung", v)}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>
                      Sonstiges / Anmerkungen
                    </label>
                    <textarea
                      value={data.sonstiges}
                      onChange={(e) => update("sonstiges", e.target.value)}
                      placeholder="Gibt es noch etwas, das wir wissen sollten?"
                      rows={4}
                      className={`${inputCls} resize-none`}
                    />
                  </div>
                </div>
              </StepTransition>

              {/* ══════════════════════════════════════
                 STEP 9 — Uebersicht
              ══════════════════════════════════════ */}
              <StepTransition active={currentStep === 8}>
                <div className="space-y-8">
                  {/* Section: Firmeninfos */}
                  <SummarySection
                    title="Firmeninfos"
                    stepIndex={0}
                    onEdit={() => goToStep(0)}
                  >
                    <SummaryRow label="Firmenname" value={data.firmenname} />
                    <SummaryRow label="Branche" value={data.branche} />
                    <SummaryRow
                      label="Ansprechpartner"
                      value={data.ansprechpartner}
                    />
                    <SummaryRow label="Position" value={data.position} />
                    <SummaryRow label="E-Mail" value={data.email} />
                    <SummaryRow label="Telefon" value={data.telefon} />
                    <SummaryRow label="Website" value={data.website} />
                  </SummarySection>

                  {/* Section: Projektart */}
                  <SummarySection
                    title="Projektart"
                    stepIndex={1}
                    onEdit={() => goToStep(1)}
                  >
                    <SummaryRow
                      label="Projektart"
                      value={data.projektart.join(", ")}
                    />
                    <SummaryRow
                      label="Zeitrahmen"
                      value={findLabel(ZEITRAHMEN_OPTIONS, data.zeitrahmen)}
                    />
                    <SummaryRow
                      label="Budget"
                      value={findLabel(BUDGET_OPTIONS, data.budget)}
                    />
                  </SummarySection>

                  {/* Section: Zielgruppe */}
                  <SummarySection
                    title="Zielgruppe"
                    stepIndex={2}
                    onEdit={() => goToStep(2)}
                  >
                    <SummaryRow
                      label="Zielgruppe"
                      value={data.zielgruppe}
                    />
                    <SummaryRow label="USP" value={data.usp} />
                    <SummaryRow
                      label="Wettbewerber"
                      value={data.wettbewerber}
                    />
                    <SummaryRow
                      label="Marktposition"
                      value={findLabel(
                        MARKTPOSITION_OPTIONS,
                        data.marktposition
                      )}
                    />
                  </SummarySection>

                  {/* Section: Ziele */}
                  <SummarySection
                    title="Ziele"
                    stepIndex={3}
                    onEdit={() => goToStep(3)}
                  >
                    <SummaryRow
                      label="Ziele"
                      value={data.ziele.join(", ")}
                    />
                    <SummaryRow
                      label="Erfolgsmessung"
                      value={data.erfolgsmessung}
                    />
                    <SummaryRow
                      label="Funktionen"
                      value={data.funktionen.join(", ")}
                    />
                  </SummarySection>

                  {/* Section: Inhalte */}
                  <SummarySection
                    title="Inhalte"
                    stepIndex={4}
                    onEdit={() => goToStep(4)}
                  >
                    <SummaryRow
                      label="Seitenumfang"
                      value={findLabel(
                        SEITENUMFANG_OPTIONS,
                        data.seitenumfang
                      )}
                    />
                    <SummaryRow
                      label="Seitenstruktur"
                      value={data.seitenstruktur}
                    />
                    <SummaryRow
                      label="Inhalte vorhanden"
                      value={findLabel(
                        JA_NEIN_TEILWEISE,
                        data.inhalteVorhanden
                      )}
                    />
                    <SummaryRow
                      label="Texterstellung"
                      value={findLabel(
                        TEXTERSTELLUNG_OPTIONS,
                        data.texterstellung
                      )}
                    />
                    <SummaryRow
                      label="Bildmaterial"
                      value={findLabel(
                        BILDMATERIAL_OPTIONS,
                        data.bildmaterial
                      )}
                    />
                    <SummaryRow
                      label="Mehrsprachig"
                      value={findLabel(
                        MEHRSPRACHIG_OPTIONS,
                        data.mehrsprachig
                      )}
                    />
                  </SummarySection>

                  {/* Section: Design */}
                  <SummarySection
                    title="Design"
                    stepIndex={5}
                    onEdit={() => goToStep(5)}
                  >
                    <SummaryRow
                      label="Design-Status"
                      value={findLabel(
                        DESIGN_STATUS_OPTIONS,
                        data.designStatus
                      )}
                    />
                    <SummaryRow label="Farbwelt" value={data.farbwelt} />
                    <SummaryRow
                      label="Design-Stil"
                      value={data.designStil.join(", ")}
                    />
                    <SummaryRow
                      label="Referenzen"
                      value={data.referenzen}
                    />
                    <SummaryRow
                      label="Logo"
                      value={findLabel(LOGO_OPTIONS, data.logoVorhanden)}
                    />
                    <SummaryRow
                      label="Styleguide"
                      value={findLabel(
                        STYLEGUIDE_OPTIONS,
                        data.styleguideVorhanden
                      )}
                    />
                  </SummarySection>

                  {/* Section: Tech-Bestand */}
                  <SummarySection
                    title="Tech-Bestand"
                    stepIndex={6}
                    onEdit={() => goToStep(6)}
                  >
                    <SummaryRow
                      label="Domain"
                      value={
                        findLabel(DOMAIN_OPTIONS, data.domainVorhanden) +
                        (data.domainName
                          ? ` (${data.domainName})`
                          : "")
                      }
                    />
                    <SummaryRow
                      label="Hosting"
                      value={
                        findLabel(HOSTING_OPTIONS, data.hostingVorhanden) +
                        (data.hostingAnbieter
                          ? ` (${data.hostingAnbieter})`
                          : "")
                      }
                    />
                    <SummaryRow
                      label="E-Mail"
                      value={
                        findLabel(MAIL_OPTIONS, data.mailVorhanden) +
                        (data.mailAnbieter
                          ? ` (${data.mailAnbieter})`
                          : "")
                      }
                    />
                    <SummaryRow
                      label="Bestehende Systeme"
                      value={data.bestehendeSysteme}
                    />
                    <SummaryRow
                      label="CMS"
                      value={findLabel(CMS_OPTIONS, data.cmsPreference)}
                    />
                  </SummarySection>

                  {/* Section: Betrieb & Recht */}
                  <SummarySection
                    title="Betrieb & Recht"
                    stepIndex={7}
                    onEdit={() => goToStep(7)}
                  >
                    <SummaryRow
                      label="Datenschutz"
                      value={findLabel(
                        DATENSCHUTZ_OPTIONS,
                        data.datenschutz
                      )}
                    />
                    <SummaryRow
                      label="Barrierefreiheit"
                      value={findLabel(
                        BARRIEREFREIHEIT_OPTIONS,
                        data.barrierefreiheit
                      )}
                    />
                    <SummaryRow
                      label="SEO"
                      value={findLabel(SEO_OPTIONS, data.seo)}
                    />
                    <SummaryRow
                      label="Analytics"
                      value={findLabel(ANALYTICS_OPTIONS, data.analytics)}
                    />
                    <SummaryRow
                      label="Wartung"
                      value={findLabel(WARTUNG_OPTIONS, data.wartung)}
                    />
                    <SummaryRow
                      label="Schulung"
                      value={findLabel(SCHULUNG_OPTIONS, data.schulung)}
                    />
                    <SummaryRow
                      label="Sonstiges"
                      value={data.sonstiges}
                    />
                  </SummarySection>
                </div>
              </StepTransition>

              {/* ── Errors ── */}
              {errors.length > 0 && (
                <div className="mt-6 p-4 rounded-xl bg-red-50 border border-red-200">
                  {errors.map((err) => (
                    <p
                      key={err}
                      className="text-xs text-red-600 font-medium"
                    >
                      {err}
                    </p>
                  ))}
                </div>
              )}

              {/* ── Navigation ── */}
              <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-200/50">
                <button
                  type="button"
                  onClick={goPrev}
                  className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" /> Zurueck
                </button>
                {currentStep < 8 ? (
                  <button
                    type="button"
                    onClick={goNext}
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gray-900 text-white text-sm font-bold hover:bg-gray-800 transition-colors cursor-pointer"
                  >
                    Weiter <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gray-900 text-white text-sm font-bold hover:bg-gray-800 transition-colors cursor-pointer"
                  >
                    Anfrage absenden <Check className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SUMMARY COMPONENTS
   ═══════════════════════════════════════════════════════════════ */

function SummarySection({
  title,
  stepIndex,
  onEdit,
  children,
}: {
  title: string;
  stepIndex: number;
  onEdit: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="p-6 rounded-2xl bg-white border border-gray-200/60">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-extrabold text-gray-900 uppercase tracking-[0.05em]">
          {String(stepIndex + 1).padStart(2, "0")}. {title}
        </h3>
        <button
          type="button"
          onClick={onEdit}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-gray-900 transition-colors cursor-pointer"
        >
          <Pencil className="w-3 h-3" /> Bearbeiten
        </button>
      </div>
      <div className="space-y-0">{children}</div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  if (!value || value === "\u2014") return null;
  return (
    <div className="flex items-start gap-4 py-2.5 border-b border-gray-100 last:border-0">
      <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.1em] w-32 shrink-0 pt-0.5">
        {label}
      </p>
      <p className="text-sm text-gray-700 font-medium whitespace-pre-line">
        {value}
      </p>
    </div>
  );
}

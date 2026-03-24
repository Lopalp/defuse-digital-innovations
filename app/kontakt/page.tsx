"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { Mail, MapPin, Clock, ArrowRight, ArrowLeft, Check } from "lucide-react";

/* ── Types ── */
interface FormData {
  projektTyp: string[];
  zeitrahmen: string;
  budgetrahmen: string;
  firmenname: string;
  ansprechpartner: string;
  email: string;
  telefon: string;
  website: string;
  nachricht: string;
  datenschutz: boolean;
}

const initialData: FormData = {
  projektTyp: [],
  zeitrahmen: "",
  budgetrahmen: "",
  firmenname: "",
  ansprechpartner: "",
  email: "",
  telefon: "",
  website: "",
  nachricht: "",
  datenschutz: false,
};

const STEPS = [
  { title: "Über Sie", subtitle: "Erzählen Sie uns von sich.", num: "01" },
  { title: "Ihr Projekt", subtitle: "Was möchten Sie umsetzen?", num: "02" },
  { title: "Details", subtitle: "Budget, Zeitrahmen & Nachricht.", num: "03" },
  { title: "Übersicht", subtitle: "Alles auf einen Blick.", num: "04" },
];

const PROJEKT_TYPEN = [
  "Neue Website",
  "Website Relaunch",
  "Sanity CMS Integration",
  "SEO Optimierung",
  "Landing Page",
  "Online-Shop",
  "Sonstiges",
];

const BUDGET_OPTIONEN = [
  { value: "3000-5000", label: "3.000 – 5.000 €" },
  { value: "5000-10000", label: "5.000 – 10.000 €" },
  { value: "10000-20000", label: "10.000 – 20.000 €" },
  { value: "20000+", label: "20.000+ €" },
  { value: "unsicher", label: "Noch unsicher" },
];

const ZEITRAHMEN_OPTIONEN = [
  { value: "sofort", label: "So schnell wie möglich" },
  { value: "1-2-monate", label: "1 – 2 Monate" },
  { value: "3-6-monate", label: "3 – 6 Monate" },
  { value: "flexibel", label: "Flexibel" },
];

const CONTACT_INFO = [
  { icon: Mail, label: "E-Mail", value: "hello@defuse.digital", href: "mailto:hello@defuse.digital" },
  { icon: MapPin, label: "Standort", value: "Augustusburg, Deutschland" },
  { icon: Clock, label: "Antwortzeit", value: "Innerhalb von 24 Stunden" },
];

/* ── Primitives ── */
const inputCls =
  "w-full px-4 py-3.5 rounded-xl bg-white border border-gray-200/60 text-sm text-gray-900 font-medium placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition-all";
const labelCls = "block text-xs font-bold text-gray-400 uppercase tracking-[0.1em] mb-2";

function CheckboxGroup({ options, selected, onChange }: { options: string[]; selected: string[]; onChange: (v: string[]) => void }) {
  const toggle = (opt: string) =>
    onChange(selected.includes(opt) ? selected.filter((v) => v !== opt) : [...selected, opt]);
  return (
    <div className="grid sm:grid-cols-2 gap-2">
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

function RadioGroup({ options, value, onChange }: { options: { value: string; label: string }[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="grid sm:grid-cols-2 gap-2">
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
                {active && <span className="w-2 h-2 rounded-full bg-white" />}
              </span>
              {opt.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function StepTransition({ active, children }: { active: boolean; children: React.ReactNode }) {
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
      style={{ opacity: show ? 1 : 0, transform: show ? "translateY(0)" : "translateY(20px)" }}
    >
      {children}
    </div>
  );
}

function validateStep(step: number, d: FormData): string[] {
  const e: string[] = [];
  switch (step) {
    case 0:
      if (!d.ansprechpartner.trim()) e.push("Name ist ein Pflichtfeld.");
      if (!d.email.trim()) e.push("E-Mail ist ein Pflichtfeld.");
      break;
    case 1:
      if (!d.projektTyp.length) e.push("Bitte wählen Sie mindestens eine Projektart.");
      break;
    case 2:
      if (!d.nachricht.trim()) e.push("Bitte beschreiben Sie Ihr Projekt kurz.");
      if (!d.datenschutz) e.push("Bitte akzeptieren Sie die Datenschutzerklärung.");
      break;
  }
  return e;
}

/* ── Main ── */
export default function KontaktPage() {
  const [step, setStep] = useState(-1);
  const [data, setData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const update = <K extends keyof FormData>(key: K, value: FormData[K]) =>
    setData((prev) => ({ ...prev, [key]: value }));

  const next = () => {
    if (step === -1) { setStep(0); return; }
    const errs = validateStep(step, data);
    if (errs.length) { setErrors(errs); return; }
    setErrors([]);
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const prev = () => { setErrors([]); setStep((s) => Math.max(s - 1, -1)); };

  const handleSubmit = () => {
    const errs = validateStep(2, data);
    if (errs.length) { setErrors(errs); return; }
    console.log("Kontakt-Formular:", data);
    setSubmitted(true);
  };

  /* ── Intro ── */
  if (step === -1 && !submitted) {
    return (
      <>
        <Header />
        <main>
          <section className="pt-40 pb-24 px-6">
            <div className="max-w-4xl mx-auto">
              <Reveal direction="up" distance={60} duration={1}>
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.05]">
                  Lassen Sie uns{" "}
                  <span className="font-serif italic font-normal text-gray-500">reden</span>
                </h1>
              </Reveal>
              <Reveal direction="up" delay={0.3}>
                <p className="mt-8 text-lg text-gray-500 max-w-2xl font-medium leading-relaxed">
                  In 4 kurzen Schritten erfahren wir alles, was wir brauchen. Je genauer Ihre Angaben, desto passgenauer unser Angebot.
                </p>
              </Reveal>
              <Reveal direction="up" delay={0.5}>
                <button
                  onClick={next}
                  className="mt-10 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gray-900 text-white font-bold text-sm hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  Projekt konfigurieren <ArrowRight className="w-4 h-4" />
                </button>
              </Reveal>
            </div>
          </section>

          <section className="pb-40 px-6">
            <div className="max-w-4xl mx-auto grid sm:grid-cols-3 gap-8">
              {CONTACT_INFO.map((item, i) => {
                const Icon = item.icon;
                return (
                  <Reveal key={item.label} direction="up" delay={0.1 + i * 0.1}>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-gray-500" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-300 uppercase tracking-[0.1em] mb-1">{item.label}</p>
                        {item.href ? (
                          <a href={item.href} className="text-sm font-semibold text-gray-900 hover:text-gray-600 transition-colors">{item.value}</a>
                        ) : (
                          <p className="text-sm font-semibold text-gray-900">{item.value}</p>
                        )}
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  /* ── Success ── */
  if (submitted) {
    return (
      <>
        <Header />
        <main className="flex items-center justify-center min-h-[70vh] px-6">
          <div className="text-center max-w-md">
            <Reveal animation="scale">
              <div className="w-16 h-16 rounded-full bg-gray-900 flex items-center justify-center mx-auto mb-8">
                <Check className="w-7 h-7 text-white" />
              </div>
            </Reveal>
            <Reveal direction="up" delay={0.2}>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">Vielen Dank!</h2>
            </Reveal>
            <Reveal direction="up" delay={0.4}>
              <p className="text-gray-500 font-medium leading-relaxed">
                Wir haben Ihre Anfrage erhalten und melden uns innerhalb von 24 Stunden bei Ihnen.
              </p>
            </Reveal>
            <Reveal direction="up" delay={0.6}>
              <Link href="/" className="inline-block mt-8 text-sm font-bold text-gray-900 hover:text-gray-600 transition-colors">
                ← Zurück zur Startseite
              </Link>
            </Reveal>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  /* ── Multi-step form ── */
  return (
    <>
      <Header />
      <main className="min-h-[80vh]">
        <section className="pt-32 pb-24 px-6">
          <div className="max-w-3xl mx-auto">
            {/* Progress bar */}
            <div className="flex items-center gap-2 mb-4">
              {STEPS.map((s, i) => (
                <div
                  key={s.num}
                  className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                    i <= step ? "bg-gray-900" : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center justify-between mb-12">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.1em]">
                  Schritt {STEPS[step].num} von 04
                </p>
                <h2 className="text-2xl font-extrabold tracking-tight mt-1">{STEPS[step].title}</h2>
                <p className="text-sm text-gray-400 font-medium">{STEPS[step].subtitle}</p>
              </div>
            </div>

            {/* Step 0 */}
            <StepTransition active={step === 0}>
              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className={labelCls}>Name *</label>
                    <input type="text" value={data.ansprechpartner} onChange={(e) => update("ansprechpartner", e.target.value)} placeholder="Max Mustermann" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>E-Mail *</label>
                    <input type="email" value={data.email} onChange={(e) => update("email", e.target.value)} placeholder="max@firma.de" className={inputCls} />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Unternehmen <span className="text-gray-300 normal-case tracking-normal">(optional)</span></label>
                  <input type="text" value={data.firmenname} onChange={(e) => update("firmenname", e.target.value)} placeholder="Firma GmbH" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Telefon <span className="text-gray-300 normal-case tracking-normal">(optional)</span></label>
                  <input type="tel" value={data.telefon} onChange={(e) => update("telefon", e.target.value)} placeholder="+49 (0) 123 456 789" className={inputCls} />
                </div>
              </div>
            </StepTransition>

            {/* Step 1 */}
            <StepTransition active={step === 1}>
              <div>
                <label className={labelCls}>Was möchten Sie umsetzen? *</label>
                <CheckboxGroup options={PROJEKT_TYPEN} selected={data.projektTyp} onChange={(v) => update("projektTyp", v)} />
              </div>
            </StepTransition>

            {/* Step 2 */}
            <StepTransition active={step === 2}>
              <div className="space-y-8">
                <div>
                  <label className={labelCls}>Budget-Rahmen <span className="text-gray-300 normal-case tracking-normal">(optional)</span></label>
                  <RadioGroup options={BUDGET_OPTIONEN} value={data.budgetrahmen} onChange={(v) => update("budgetrahmen", v)} />
                </div>
                <div>
                  <label className={labelCls}>Zeitrahmen <span className="text-gray-300 normal-case tracking-normal">(optional)</span></label>
                  <RadioGroup options={ZEITRAHMEN_OPTIONEN} value={data.zeitrahmen} onChange={(v) => update("zeitrahmen", v)} />
                </div>
                <div>
                  <label className={labelCls}>Projektbeschreibung *</label>
                  <textarea value={data.nachricht} onChange={(e) => update("nachricht", e.target.value)} placeholder="Beschreiben Sie kurz Ihr Vorhaben…" rows={4} className={`${inputCls} resize-none`} />
                </div>
                <div>
                  <label className={labelCls}>Bestehende Website <span className="text-gray-300 normal-case tracking-normal">(optional)</span></label>
                  <input type="url" value={data.website} onChange={(e) => update("website", e.target.value)} placeholder="https://www.ihre-website.de" className={inputCls} />
                </div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={data.datenschutz} onChange={(e) => update("datenschutz", e.target.checked)} className="mt-1 accent-gray-900 w-4 h-4" />
                  <span className="text-xs text-gray-400 leading-relaxed">
                    Ich stimme der Verarbeitung meiner Daten gemäß der{" "}
                    <Link href="/datenschutz" className="text-gray-600 hover:text-gray-900 underline">Datenschutzerklärung</Link> zu. *
                  </span>
                </label>
              </div>
            </StepTransition>

            {/* Step 3 — Summary */}
            <StepTransition active={step === 3}>
              <div className="space-y-4">
                <h3 className="text-xl font-extrabold tracking-tight mb-6">Ihre Anfrage im Überblick</h3>
                {[
                  { label: "Name", value: data.ansprechpartner },
                  { label: "E-Mail", value: data.email },
                  { label: "Unternehmen", value: data.firmenname },
                  { label: "Projektart", value: data.projektTyp.join(", ") },
                  { label: "Budget", value: BUDGET_OPTIONEN.find((o) => o.value === data.budgetrahmen)?.label || "" },
                  { label: "Zeitrahmen", value: ZEITRAHMEN_OPTIONEN.find((o) => o.value === data.zeitrahmen)?.label || "" },
                  { label: "Nachricht", value: data.nachricht },
                ].filter((r) => r.value).map((row) => (
                  <div key={row.label} className="flex items-start gap-4 py-3 border-b border-gray-200/50">
                    <p className="text-xs font-bold text-gray-300 uppercase tracking-[0.1em] w-28 shrink-0 pt-0.5">{row.label}</p>
                    <p className="text-sm text-gray-700 font-medium whitespace-pre-line">{row.value}</p>
                  </div>
                ))}
              </div>
            </StepTransition>

            {/* Errors */}
            {errors.length > 0 && (
              <div className="mt-6 p-4 rounded-xl bg-red-50 border border-red-200">
                {errors.map((e) => (
                  <p key={e} className="text-xs text-red-600 font-medium">{e}</p>
                ))}
              </div>
            )}

            {/* Nav */}
            <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-200/50">
              <button
                onClick={prev}
                className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Zurück
              </button>
              {step < STEPS.length - 1 ? (
                <button
                  onClick={next}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gray-900 text-white text-sm font-bold hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  Weiter <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gray-900 text-white text-sm font-bold hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  Absenden <Check className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

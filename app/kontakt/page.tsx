"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import {
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  ArrowDown,
  Send,
  ChevronDown,
  Settings,
} from "lucide-react";

/* ── Contact Info ── */
const CONTACT_INFO = [
  {
    icon: Mail,
    label: "E-Mail",
    value: "hello@defuse.digital",
    href: "mailto:hello@defuse.digital",
  },
  {
    icon: MapPin,
    label: "Standort",
    value: "Augustusburg, Deutschland",
  },
  {
    icon: Clock,
    label: "Antwortzeit",
    value: "Innerhalb von 24 Stunden",
  },
];

/* ── FAQ Data ── */
const FAQ_ITEMS = [
  {
    question: "Was kostet eine Website bei defuse.?",
    answer:
      "Die Kosten hängen vom Umfang, den gewünschten Funktionen und der Komplexität des Designs ab. Eine einfache Landing Page beginnt bei ca. 2.500 EUR, individuelle Unternehmenswebsites starten ab 5.000 EUR. Nutzen Sie unseren Projekt-Konfigurator für eine unverbindliche Einschätzung.",
  },
  {
    question: "Wie lange dauert ein Webprojekt?",
    answer:
      "Eine typische Website ist in 4–8 Wochen fertig — abhängig von Umfang, Feedback-Zyklen und Content-Lieferung. Landing Pages realisieren wir oft in 1–2 Wochen. Komplexere Projekte wie Online-Shops oder Web-Apps planen wir individuell mit Ihnen.",
  },
  {
    question: "Arbeitet ihr nur mit Unternehmen aus der Region?",
    answer:
      "Nein. Wir arbeiten deutschlandweit und im gesamten DACH-Raum. Die meiste Kommunikation findet digital statt — per Video-Call, E-Mail oder Chat. Persönliche Treffen sind auf Wunsch natürlich möglich, besonders im Raum Chemnitz/Sachsen.",
  },
  {
    question: "Bietet ihr auch laufende Betreuung an?",
    answer:
      "Ja. Wir bieten Wartungsverträge mit technischem Support, Sicherheitsupdates, Performance-Monitoring und Content-Pflege. So bleibt Ihre Website langfristig schnell, sicher und aktuell — ohne dass Sie sich darum kümmern müssen.",
  },
];

/* ── Primitives ── */
const inputCls =
  "w-full px-4 py-3.5 rounded-xl bg-white border border-gray-200/60 text-sm text-gray-900 font-medium placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition-all";
const labelCls =
  "block text-xs font-bold text-gray-400 uppercase tracking-[0.1em] mb-2";

/* ── FAQ Accordion Item ── */
function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-gray-200/60 rounded-xl bg-white overflow-hidden transition-all">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer"
      >
        <span className="text-sm font-bold text-gray-900 pr-4">
          {question}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{
          maxHeight: open ? "300px" : "0px",
          opacity: open ? 1 : 0,
        }}
      >
        <p className="px-6 pb-5 text-sm text-gray-500 leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
}

/* ── Main Page ── */
export default function KontaktPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    nachricht: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<string[]>([]);

  const updateField = (field: string, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: string[] = [];
    if (!formData.name.trim()) errors.push("Bitte geben Sie Ihren Namen ein.");
    if (!formData.email.trim())
      errors.push("Bitte geben Sie Ihre E-Mail-Adresse ein.");
    if (!formData.nachricht.trim())
      errors.push("Bitte schreiben Sie uns eine Nachricht.");
    if (errors.length) {
      setFormErrors(errors);
      return;
    }
    setFormErrors([]);
    console.log("Kontakt-Formular:", formData);
    setFormSubmitted(true);
  };

  return (
    <>
      <Header />
      <main>
        {/* ──────────────────────────────────────────────
            SECTION 1 — HERO
        ────────────────────────────────────────────── */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 relative">
          {/* Decorative background number */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
            <span className="text-[20rem] sm:text-[28rem] md:text-[36rem] font-extrabold text-gray-100/60 leading-none">
              &
            </span>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <Reveal direction="up" distance={60} duration={1}>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-6">
                Kontakt
              </p>
            </Reveal>
            <Reveal direction="up" distance={60} duration={1} delay={0.1}>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.05]">
                Lassen Sie uns{" "}
                <span className="font-display italic font-normal text-gray-500">
                  reden
                </span>
              </h1>
            </Reveal>
            <Reveal direction="up" delay={0.3}>
              <p className="mt-8 text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed">
                Ob neue Website, Relaunch oder komplexes Digitalprojekt — wir
                hören zu, beraten ehrlich und liefern Ergebnisse.
              </p>
            </Reveal>
          </div>

          {/* Scroll indicator */}
          <Reveal direction="up" delay={0.6}>
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
              <span className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em]">
                Scrollen
              </span>
              <ArrowDown className="w-4 h-4 text-gray-300 animate-bounce" />
            </div>
          </Reveal>
        </section>

        {/* ──────────────────────────────────────────────
            SECTION 2 — CONTACT INFO + FORM
        ────────────────────────────────────────────── */}
        <section className="min-h-screen flex items-center px-6 py-24">
          <div className="max-w-6xl mx-auto w-full">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
              {/* LEFT — Contact Info */}
              <div className="flex flex-col justify-center">
                <Reveal direction="left" distance={40}>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">
                    Kontaktdaten
                  </p>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-8">
                    Direkt{" "}
                    <span className="font-serif italic font-normal text-gray-500">
                      erreichbar
                    </span>
                  </h2>
                </Reveal>

                <div className="space-y-6 mb-12">
                  {CONTACT_INFO.map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <Reveal
                        key={item.label}
                        direction="up"
                        delay={0.1 + i * 0.1}
                      >
                        <div className="flex gap-4 items-start">
                          <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                            <Icon className="w-5 h-5 text-gray-500" />
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em] mb-1">
                              {item.label}
                            </p>
                            {item.href ? (
                              <a
                                href={item.href}
                                className="text-base font-bold text-gray-900 hover:text-gray-600 transition-colors"
                              >
                                {item.value}
                              </a>
                            ) : (
                              <p className="text-base font-bold text-gray-900">
                                {item.value}
                              </p>
                            )}
                          </div>
                        </div>
                      </Reveal>
                    );
                  })}
                </div>

                <Reveal direction="up" delay={0.5}>
                  <div className="p-6 rounded-2xl bg-gray-100/80 border border-gray-200/50">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center shrink-0">
                        <Settings className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900 mb-1">
                          Detaillierte Projektanfrage?
                        </p>
                        <p className="text-xs text-gray-500 leading-relaxed mb-3">
                          Nutzen Sie unseren Projekt-Konfigurator fuer eine
                          strukturierte Anfrage mit allen relevanten Details.
                        </p>
                        <Link
                          href="/projekt-konfigurator"
                          className="inline-flex items-center gap-2 text-xs font-bold text-gray-900 hover:text-gray-600 transition-colors"
                        >
                          Zum Konfigurator{" "}
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>

              {/* RIGHT — Contact Form */}
              <div className="flex flex-col justify-center">
                <Reveal direction="right" distance={40}>
                  {formSubmitted ? (
                    <div className="p-8 rounded-2xl bg-white border border-gray-200/60 text-center">
                      <div className="w-16 h-16 rounded-full bg-gray-900 flex items-center justify-center mx-auto mb-6">
                        <Send className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-extrabold tracking-tight mb-3">
                        Nachricht gesendet!
                      </h3>
                      <p className="text-sm text-gray-500 font-medium leading-relaxed mb-6">
                        Vielen Dank fuer Ihre Nachricht. Wir melden uns
                        innerhalb von 24 Stunden bei Ihnen.
                      </p>
                      <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm font-bold text-gray-900 hover:text-gray-600 transition-colors"
                      >
                        Zurueck zur Startseite
                      </Link>
                    </div>
                  ) : (
                    <form
                      onSubmit={handleSubmit}
                      className="p-8 rounded-2xl bg-white border border-gray-200/60"
                    >
                      <h3 className="text-xl font-extrabold tracking-tight mb-1">
                        Schreiben Sie uns
                      </h3>
                      <p className="text-sm text-gray-400 font-medium mb-8">
                        Kurz und unkompliziert — wir melden uns schnell.
                      </p>

                      <div className="space-y-5">
                        <div>
                          <label className={labelCls}>Name *</label>
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) =>
                              updateField("name", e.target.value)
                            }
                            placeholder="Max Mustermann"
                            className={inputCls}
                          />
                        </div>
                        <div>
                          <label className={labelCls}>E-Mail *</label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                              updateField("email", e.target.value)
                            }
                            placeholder="max@firma.de"
                            className={inputCls}
                          />
                        </div>
                        <div>
                          <label className={labelCls}>Nachricht *</label>
                          <textarea
                            value={formData.nachricht}
                            onChange={(e) =>
                              updateField("nachricht", e.target.value)
                            }
                            placeholder="Erzaehlen Sie uns von Ihrem Vorhaben..."
                            rows={5}
                            className={`${inputCls} resize-none`}
                          />
                        </div>
                      </div>

                      {formErrors.length > 0 && (
                        <div className="mt-4 p-4 rounded-xl bg-red-50 border border-red-200">
                          {formErrors.map((err) => (
                            <p
                              key={err}
                              className="text-xs text-red-600 font-medium"
                            >
                              {err}
                            </p>
                          ))}
                        </div>
                      )}

                      <button
                        type="submit"
                        className="mt-6 w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gray-900 text-white text-sm font-bold hover:bg-gray-800 transition-colors cursor-pointer"
                      >
                        Nachricht senden{" "}
                        <Send className="w-4 h-4" />
                      </button>

                      <div className="mt-6 pt-6 border-t border-gray-100">
                        <Link
                          href="/projekt-konfigurator"
                          className="flex items-center justify-center gap-2 w-full px-8 py-4 rounded-full border-2 border-gray-900 text-gray-900 text-sm font-bold hover:bg-gray-900 hover:text-white transition-all cursor-pointer"
                        >
                          <Settings className="w-4 h-4" />
                          Projekt-Konfigurator starten
                        </Link>
                      </div>
                    </form>
                  )}
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────────────
            SECTION 3 — CTA
        ────────────────────────────────────────────── */}
        <section className="min-h-screen flex items-center justify-center px-6 relative">
          {/* Subtle background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-gray-100/50 to-gray-50 pointer-events-none" />

          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <Reveal animation="scale">
              <div className="w-20 h-20 rounded-2xl bg-gray-900 flex items-center justify-center mx-auto mb-10">
                <Mail className="w-8 h-8 text-white" />
              </div>
            </Reveal>
            <Reveal direction="up" delay={0.2}>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-6">
                Direkter Draht
              </p>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6">
                Lieber direkt{" "}
                <span className="font-display italic font-normal text-gray-500">
                  schreiben
                </span>
                ?
              </h2>
            </Reveal>
            <Reveal direction="up" delay={0.4}>
              <p className="text-lg text-gray-500 font-medium leading-relaxed mb-10 max-w-xl mx-auto">
                Kein Formular, kein Umweg. Schreiben Sie uns einfach eine E-Mail
                — wir antworten innerhalb von 24 Stunden.
              </p>
            </Reveal>
            <Reveal direction="up" delay={0.6}>
              <a
                href="mailto:hello@defuse.digital"
                className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-gray-900 text-white font-bold text-base hover:bg-gray-800 transition-colors group"
              >
                hello@defuse.digital
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Reveal>
          </div>
        </section>

        {/* ──────────────────────────────────────────────
            SECTION 4 — FAQ
        ────────────────────────────────────────────── */}
        <section className="min-h-screen flex items-center px-6 py-24">
          <div className="max-w-4xl mx-auto w-full">
            <div className="text-center mb-16">
              <Reveal direction="up">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">
                  FAQ
                </p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                  Haeufig gestellte{" "}
                  <span className="font-serif italic font-normal text-gray-500">
                    Fragen
                  </span>
                </h2>
              </Reveal>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {FAQ_ITEMS.map((item, i) => (
                <Reveal key={item.question} direction="up" delay={0.1 * i}>
                  <FAQItem question={item.question} answer={item.answer} />
                </Reveal>
              ))}
            </div>

            <Reveal direction="up" delay={0.5}>
              <div className="mt-16 text-center">
                <p className="text-sm text-gray-400 font-medium mb-4">
                  Ihre Frage war nicht dabei?
                </p>
                <a
                  href="mailto:hello@defuse.digital"
                  className="inline-flex items-center gap-2 text-sm font-bold text-gray-900 hover:text-gray-600 transition-colors"
                >
                  Schreiben Sie uns direkt{" "}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Kontakt — defuse.",
  description:
    "Projekt im Kopf? Schreiben Sie uns — wir melden uns innerhalb von 24 Stunden.",
};

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
    value: "Chemnitz, Deutschland",
  },
  {
    icon: Clock,
    label: "Antwortzeit",
    value: "Innerhalb von 24 Stunden",
  },
];

export default function KontaktPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-40 pb-24 px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.05]">
              Lassen Sie uns{" "}
              <span className="font-serif italic font-normal text-gray-500">
                reden
              </span>
            </h1>
            <p className="mt-8 text-lg text-gray-500 max-w-2xl font-medium leading-relaxed">
              Erzählen Sie uns von Ihrem Projekt. Je mehr Details, desto besser
              — wir melden uns schnell zurück.
            </p>
          </div>
        </section>

        {/* Form + Contact Info */}
        <section className="pb-40 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-16">
            {/* Form */}
            <div className="md:col-span-3">
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-bold text-gray-400 uppercase tracking-[0.1em] mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3.5 rounded-xl bg-white border border-gray-200/60 text-sm text-gray-900 font-medium placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition-all"
                      placeholder="Max Mustermann"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-bold text-gray-400 uppercase tracking-[0.1em] mb-2"
                    >
                      E-Mail
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3.5 rounded-xl bg-white border border-gray-200/60 text-sm text-gray-900 font-medium placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition-all"
                      placeholder="max@beispiel.de"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="company"
                    className="block text-xs font-bold text-gray-400 uppercase tracking-[0.1em] mb-2"
                  >
                    Unternehmen{" "}
                    <span className="text-gray-300 normal-case tracking-normal">
                      (optional)
                    </span>
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className="w-full px-4 py-3.5 rounded-xl bg-white border border-gray-200/60 text-sm text-gray-900 font-medium placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition-all"
                    placeholder="Firma GmbH"
                  />
                </div>
                <div>
                  <label
                    htmlFor="budget"
                    className="block text-xs font-bold text-gray-400 uppercase tracking-[0.1em] mb-2"
                  >
                    Budget
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    className="w-full px-4 py-3.5 rounded-xl bg-white border border-gray-200/60 text-sm text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition-all appearance-none"
                  >
                    <option value="">Bitte wählen</option>
                    <option value="2500-5000">2.500 – 5.000 €</option>
                    <option value="5000-10000">5.000 – 10.000 €</option>
                    <option value="10000-20000">10.000 – 20.000 €</option>
                    <option value="20000+">20.000+ €</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-bold text-gray-400 uppercase tracking-[0.1em] mb-2"
                  >
                    Nachricht
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full px-4 py-3.5 rounded-xl bg-white border border-gray-200/60 text-sm text-gray-900 font-medium placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition-all resize-none"
                    placeholder="Erzählen Sie uns von Ihrem Projekt…"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-gray-900 text-white font-bold text-sm hover:bg-gray-800 transition-colors"
                >
                  Nachricht senden
                </button>
              </form>
            </div>

            {/* Sidebar */}
            <div className="md:col-span-2">
              <div className="space-y-10">
                {CONTACT_INFO.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-gray-500" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-300 uppercase tracking-[0.1em] mb-1">
                          {item.label}
                        </p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-sm font-semibold text-gray-900 hover:text-gray-600 transition-colors"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-sm font-semibold text-gray-900">
                            {item.value}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-16 p-8 md:p-10 rounded-2xl bg-gray-900 text-white">
                <h3 className="text-lg font-extrabold mb-3">
                  Kostenloses Erstgespräch
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  30 Minuten, unverbindlich. Wir besprechen Ihr Projekt, klären
                  offene Fragen und geben eine erste Einschätzung zu Umfang und
                  Budget.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

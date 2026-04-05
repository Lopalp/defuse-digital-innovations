"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Mail, ArrowRight, AlertCircle } from "lucide-react";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    await fetch("/api/portal/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim() }),
    });

    router.push("/portal/login/verifizieren?email=" + encodeURIComponent(email.trim()));
  };

  return (
    <div className="min-h-screen flex">
      {/* Left — Dramatic Image with brand statement */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <Image
          src="/portal-paint.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="50vw"
          priority
        />
        {/* Gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/30 to-gray-950/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-gray-950/20" />

        {/* Brand statement overlay */}
        <div className="absolute inset-0 flex flex-col justify-between p-12">
          {/* Top — subtle logo area */}
          <div>
            <div className="flex items-center gap-2.5">
              <svg
                className="w-5 h-5 text-white/70"
                viewBox="0 0 32 32"
                fill="none"
              >
                <path
                  d="M16 0C16 8.83656 8.83656 16 0 16C8.83656 16 16 23.1634 16 32C16 23.1634 23.1634 16 32 16C23.1634 16 16 8.83656 16 0Z"
                  fill="currentColor"
                />
              </svg>
              <span className="text-sm font-headline font-bold tracking-tighter text-white/70">
                defuse digital
              </span>
            </div>
          </div>

          {/* Bottom — quote / brand statement */}
          <div>
            <blockquote className="max-w-sm">
              <p className="text-2xl font-bold tracking-tight text-white leading-snug mb-3">
                Websites, die wirken. Zusammenarbeit, die funktioniert.
              </p>
              <p className="text-sm text-white/50 leading-relaxed">
                Ihr persönlicher Bereich — Projekte, Dokumente und Support an einem Ort.
              </p>
            </blockquote>
          </div>
        </div>
      </div>

      {/* Right — Form */}
      <div className="flex-1 flex items-center justify-center px-8 bg-[#f5f5f7]">
        <div className="w-full max-w-sm">
          {/* Logo (mobile + desktop) */}
          <div className="mb-16">
            <a href="/" className="inline-flex items-center gap-2.5 group">
              <svg
                className="w-6 h-6 group-hover:-rotate-12 transition-transform duration-300"
                viewBox="0 0 32 32"
                fill="none"
              >
                <path
                  d="M16 0C16 8.83656 8.83656 16 0 16C8.83656 16 16 23.1634 16 32C16 23.1634 23.1634 16 32 16C23.1634 16 16 8.83656 16 0Z"
                  fill="currentColor"
                />
              </svg>
              <span className="text-base font-headline font-bold tracking-tighter">
                defuse digital
              </span>
            </a>
            <p className="text-xs text-gray-400 mt-1.5 pl-[34px]">Kundenportal</p>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-2">
            Willkommen zurück
          </h1>
          <p className="text-sm text-gray-500 mb-10">
            Wir senden Ihnen einen Login-Link per E-Mail.
          </p>

          {error && (
            <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 mb-6">
              <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
              <p className="text-sm text-red-600">
                {error === "expired"
                  ? "Der Link ist abgelaufen. Bitte fordern Sie einen neuen an."
                  : "Ungültiger Link. Bitte versuchen Sie es erneut."}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <label className="block text-xs text-gray-400 mb-2">
              E-Mail-Adresse
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ihre@email.de"
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)] text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 transition-all"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              {loading ? "Wird gesendet..." : (
                <>
                  Login-Link senden
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          <p className="text-xs text-gray-400 mt-10">
            Kein Zugang?{" "}
            <a href="/kontakt" className="text-gray-600 hover:text-gray-900 transition-colors">
              Kontaktieren Sie uns
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function PortalLoginPage() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  );
}

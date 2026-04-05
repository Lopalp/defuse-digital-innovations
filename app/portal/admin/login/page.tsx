"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, ArrowRight, AlertCircle, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/portal/admin/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim(), password }),
    });

    if (res.ok) {
      router.push("/portal/admin");
    } else {
      const data = await res.json();
      setError(data.error || "Login fehlgeschlagen");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black selection:bg-white/10 px-6">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-12 text-center group">
          <div className="inline-flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-white/20 transition-all">
              <svg className="w-5 h-5 text-white group-hover:-rotate-12 transition-transform duration-300" viewBox="0 0 32 32" fill="none">
                <path
                  d="M16 0C16 8.83656 8.83656 16 0 16C8.83656 16 16 23.1634 16 32C16 23.1634 23.1634 16 32 16C23.1634 16 16 8.83656 16 0Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-lg font-bold tracking-tight text-white uppercase leading-none">
                defuse
              </span>
              <span className="text-[10px] font-bold text-white/60 uppercase tracking-[0.2em] mt-1">
                Admin Portal
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-1 mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Interner Zugang
          </h1>
          <p className="text-xs font-medium text-white/70">
            Bitte authentifizieren Sie sich für den administrativen Bereich.
          </p>
        </div>

        {error && (
          <div className="flex items-start gap-3 p-4 rounded-xl bg-rose-500/[0.05] border border-rose-500/20 backdrop-blur-sm mb-6">
            <AlertCircle className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />
            <p className="text-xs text-rose-400 font-medium">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[10px] font-bold text-white/50 uppercase tracking-widest mb-2.5 ml-1">E-Mail Adresse</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@defuse-digital.de"
              className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-emerald-500/40 focus:bg-white/[0.06] transition-all disabled:opacity-50"
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-white/50 uppercase tracking-widest mb-2.5 ml-1">Passwort</label>
            <div className="relative group/input">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within/input:text-emerald-500 transition-colors" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-emerald-500/40 focus:bg-white/[0.06] transition-all disabled:opacity-50"
                disabled={loading}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-4 py-4 rounded-xl bg-white text-black text-[13px] font-bold uppercase tracking-widest hover:bg-neutral-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] disabled:opacity-50 active:scale-[0.98]"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin text-black" />
            ) : (
              <>
                Anmelden
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mt-10 text-center">
          <a href="/portal/login" className="hover:text-white transition-colors">
            Zum Kundenportal
          </a>
        </p>
      </div>
    </div>
  );
}

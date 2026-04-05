"use client";

import { useEffect, useState } from "react";
import { Search, Loader2, ExternalLink, AlertCircle } from "lucide-react";

interface VercelProject {
  name: string;
  url: string | null;
  customDomains: string[];
  framework: string | null;
  updatedAt: string | null;
  gitRepo: string | null;
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return "gerade eben";
  if (hours < 24) return `vor ${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `vor ${days}d`;
  return `vor ${Math.floor(days / 30)}mo`;
}

export default function AdminVercelPage() {
  const [projects, setProjects] = useState<VercelProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/portal/admin/vercel")
      .then((r) => r.json())
      .then((data) => {
        if (data.error && !Array.isArray(data)) {
          setError(data.error);
          setProjects([]);
        } else {
          setProjects(Array.isArray(data) ? data : []);
        }
        setLoading(false);
      });
  }, []);

  const filtered = projects.filter(
    (p) =>
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.customDomains.some((d) => d.toLowerCase().includes(search.toLowerCase()))
  );

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-8 md:px-12 pb-24 pt-12 space-y-8">
        <header>
          <h1 className="text-xl font-semibold tracking-tight text-gray-900">Vercel Deployments</h1>
          <p className="text-sm text-gray-500 mt-1">VNDL Team</p>
        </header>
        <div className="bg-amber-50 rounded-2xl p-5">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-amber-700">Vercel Token nicht konfiguriert</p>
              <p className="text-sm text-amber-700 mt-2">
                Um Vercel-Projekte anzuzeigen, f\u00FCge einen Token als{" "}
                <code className="bg-amber-100 px-1.5 py-0.5 rounded text-xs">VERCEL_TOKEN</code> in{" "}
                <code className="bg-amber-100 px-1.5 py-0.5 rounded text-xs">.env.local</code> hinzu.
              </p>
              <p className="text-xs text-amber-700 mt-2">
                Erstelle den Token unter{" "}
                <code className="bg-amber-100 px-1 rounded">vercel.com/account/tokens</code>.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-8 md:px-12 pb-24 pt-12 space-y-8">
      <header>
        <h1 className="text-xl font-semibold tracking-tight text-gray-900">Vercel Deployments</h1>
        <p className="text-sm text-gray-500 mt-1">
          {projects.length} Projekte im VNDL Team.
        </p>
      </header>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-400" />
        <input
          type="text"
          placeholder="Projekt oder Domain suchen..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)] rounded-xl pl-11 pr-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
        />
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-5 h-5 text-gray-300 animate-spin" />
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="text-left px-6 py-4 text-xs font-medium text-gray-400">Projekt</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-gray-400">Domain</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-gray-400">Framework</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-gray-400">Git Repo</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-gray-400">Aktualisiert</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-sm text-gray-400">
                    Keine Projekte gefunden.
                  </td>
                </tr>
              ) : (
                filtered.map((p) => (
                  <tr key={p.name} className="border-t border-gray-100 hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 text-gray-900 font-medium">{p.name}</td>
                    <td className="px-6 py-4">
                      {p.customDomains.length > 0 ? (
                        <span className="text-xs text-emerald-600">{p.customDomains[0]}</span>
                      ) : p.url ? (
                        <span className="text-xs text-gray-500">{p.url.replace("https://", "")}</span>
                      ) : (
                        <span className="text-gray-300">\u2013</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-xs">{p.framework || "\u2013"}</td>
                    <td className="px-6 py-4 text-gray-400 text-xs">{p.gitRepo || "\u2013"}</td>
                    <td className="px-6 py-4 text-gray-400 text-xs">
                      {p.updatedAt ? timeAgo(p.updatedAt) : "\u2013"}
                    </td>
                    <td className="px-6 py-4">
                      {p.url && (
                        <a
                          href={p.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-gray-900 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      <p className="text-xs text-gray-400">
        {filtered.length} von {projects.length} Projekten
      </p>
    </div>
  );
}

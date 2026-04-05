"use client";

import { useEffect, useState } from "react";
import { Search, Loader2, ExternalLink, GitBranch, AlertCircle, Lock, Globe } from "lucide-react";

interface Repo {
  name: string;
  fullName: string;
  url: string;
  description: string | null;
  private: boolean;
  updatedAt: string;
  pushedAt: string;
  language: string | null;
  openIssues: number;
  defaultBranch: string;
}

const LANG_COLORS: Record<string, string> = {
  TypeScript: "bg-blue-400",
  JavaScript: "bg-yellow-400",
  Python: "bg-green-400",
  CSS: "bg-purple-400",
  HTML: "bg-orange-400",
  Go: "bg-cyan-400",
  Rust: "bg-red-400",
};

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return "gerade eben";
  if (hours < 24) return `vor ${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `vor ${days}d`;
  return `vor ${Math.floor(days / 30)}mo`;
}

export default function AdminGitHubPage() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/portal/admin/github")
      .then((r) => r.json())
      .then((data) => {
        if (data.error && !Array.isArray(data)) {
          setError(data.error);
          setRepos([]);
        } else {
          setRepos(Array.isArray(data) ? data : []);
        }
        setLoading(false);
      });
  }, []);

  const filtered = repos.filter(
    (r) =>
      !search ||
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      (r.description || "").toLowerCase().includes(search.toLowerCase())
  );

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-8 md:px-12 pb-24 pt-12 space-y-8">
        <header>
          <h1 className="text-xl font-semibold tracking-tight text-gray-900">GitHub Repos</h1>
          <p className="text-sm text-gray-500 mt-1">VNDLmedia Organisation</p>
        </header>
        <div className="bg-amber-50 rounded-2xl p-5">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-amber-700">GitHub Token nicht konfiguriert</p>
              <p className="text-sm text-amber-700 mt-2">
                Um GitHub-Repos anzuzeigen, f\u00FCge einen Personal Access Token als{" "}
                <code className="bg-amber-100 px-1.5 py-0.5 rounded text-xs">GITHUB_TOKEN</code> in{" "}
                <code className="bg-amber-100 px-1.5 py-0.5 rounded text-xs">.env.local</code> hinzu.
              </p>
              <p className="text-xs text-amber-700 mt-2">
                Der Token braucht <code className="bg-amber-100 px-1 rounded">repo</code> und{" "}
                <code className="bg-amber-100 px-1 rounded">read:org</code> Scopes.
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
        <h1 className="text-xl font-semibold tracking-tight text-gray-900">GitHub Repos</h1>
        <p className="text-sm text-gray-500 mt-1">
          {repos.length} Repos in der VNDLmedia Organisation.
        </p>
      </header>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-400" />
        <input
          type="text"
          placeholder="Repo suchen..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)] rounded-xl pl-11 pr-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
        />
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-5 h-5 text-gray-300 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((r) => (
            <a
              key={r.name}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-5 hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-shadow"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {r.private ? (
                    <Lock className="w-3.5 h-3.5 text-gray-300" />
                  ) : (
                    <Globe className="w-3.5 h-3.5 text-gray-300" />
                  )}
                  <h3 className="text-sm font-semibold text-gray-900 group-hover:text-gray-700">
                    {r.name}
                  </h3>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-900 transition-colors" />
              </div>
              {r.description && (
                <p className="text-sm text-gray-500 line-clamp-1 mb-3">{r.description}</p>
              )}
              <div className="flex items-center gap-4 text-xs text-gray-400">
                {r.language && (
                  <span className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${LANG_COLORS[r.language] || "bg-gray-400"}`} />
                    {r.language}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <GitBranch className="w-3 h-3" />
                  {r.defaultBranch}
                </span>
                {r.openIssues > 0 && (
                  <span className="text-yellow-600">{r.openIssues} issues</span>
                )}
                <span className="text-gray-400">{timeAgo(r.pushedAt)}</span>
              </div>
            </a>
          ))}
        </div>
      )}

      <p className="text-xs text-gray-400">
        {filtered.length} von {repos.length} Repos
      </p>
    </div>
  );
}

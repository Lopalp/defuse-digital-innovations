"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Loader2, Globe, Github, LayoutGrid, List, Star, Archive, ArrowUpRight, Plus, X } from "lucide-react";

interface Project {
  id: string; name: string; customerName: string; customerId: string;
  status: string; notionStatus: string; type: string;
  endDate: string | null; description: string; repo: string;
  liveUrl: string; area: string; priority: string; createdAt: string;
  pinned?: boolean; archived?: boolean; assignedTo?: string;
}

const STATUS_FILTERS = [
  { value: "", label: "Alle" },
  { value: "In progress", label: "Aktiv" },
  { value: "Not started", label: "Planung" },
  { value: "on hold", label: "Pausiert" },
  { value: "Done", label: "Fertig" },
  { value: "__archived", label: "Archiv" },
];

const statusDot: Record<string, string> = {
  "In progress": "bg-emerald-500", "Not started": "bg-blue-400",
  "on hold": "bg-yellow-500", Done: "bg-gray-400",
};
const statusLabel: Record<string, string> = {
  "In progress": "Aktiv", "Not started": "Planung",
  "on hold": "Pausiert", Done: "Fertig",
};
const statusBadge: Record<string, string> = {
  "In progress": "text-emerald-600 bg-emerald-50",
  "Not started": "text-blue-600 bg-blue-50",
  "on hold": "text-yellow-600 bg-yellow-50",
  Done: "text-gray-500 bg-gray-100",
};

export default function AdminProjektePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);
  const [customers, setCustomers] = useState<{ id: string; name: string }[]>([]);
  const [newProject, setNewProject] = useState({ name: "", type: "", customerId: "", deadline: "", assignedTo: "", notes: "" });
  const router = useRouter();

  useEffect(() => {
    Promise.all([
      fetch("/api/portal/admin/projekte").then(r => r.json()),
      fetch("/api/portal/admin/kunden").then(r => r.json()),
    ]).then(([p, c]) => {
      setProjects(Array.isArray(p) ? p : []);
      setCustomers(Array.isArray(c) ? c.map((k: any) => ({ id: k.id, name: k.name })) : []);
      setLoading(false);
    });
  }, []);

  async function createProject() {
    if (!newProject.name.trim()) return;
    setCreating(true);
    const res = await fetch("/api/portal/admin/projekte", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newProject, status: "Not started" }),
    });
    if (res.ok) {
      const data = await res.json();
      setShowCreate(false);
      setNewProject({ name: "", type: "", customerId: "", deadline: "", assignedTo: "", notes: "" });
      // Reload projects
      const updated = await fetch("/api/portal/admin/projekte").then(r => r.json());
      setProjects(Array.isArray(updated) ? updated : []);
      if (data.id) router.push(`/portal/admin/projekte/${data.id}`);
    }
    setCreating(false);
  }

  async function togglePin(e: React.MouseEvent, id: string, pinned: boolean) {
    e.preventDefault();
    e.stopPropagation();
    await fetch(`/api/portal/admin/projekte/${id}`, {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pinned: !pinned }),
    });
    setProjects(prev => prev.map(p => p.id === id ? { ...p, pinned: !pinned } : p));
  }

  async function toggleArchive(e: React.MouseEvent, id: string, archived: boolean) {
    e.preventDefault();
    e.stopPropagation();
    if (!archived) {
      const confirmed = window.confirm("Projekt wirklich archivieren?");
      if (!confirmed) return;
    }
    await fetch(`/api/portal/admin/projekte/${id}`, {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ archived: !archived }),
    });
    setProjects(prev => prev.map(p => p.id === id ? { ...p, archived: !archived } : p));
  }

  const isArchiveView = statusFilter === "__archived";
  const filtered = projects.filter(p => {
    const s = search.toLowerCase();
    const matchesSearch = !s || p.name.toLowerCase().includes(s) || p.customerName.toLowerCase().includes(s);
    if (isArchiveView) return matchesSearch && p.archived === true;
    return matchesSearch && p.archived !== true && (!statusFilter || p.notionStatus === statusFilter);
  });

  const archivedCount = projects.filter(p => p.archived === true).length;

  return (
    <div className="max-w-6xl mx-auto px-8 md:px-12 pb-24 pt-12 space-y-6">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-gray-900">Projekte</h1>
          <p className="text-sm text-gray-500 mt-1">
            {isArchiveView ? `${archivedCount} archivierte Projekte` : `${projects.filter(p => !p.archived).length} Projekte`}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setShowCreate(true)}
            className="inline-flex items-center gap-2 bg-gray-900 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-800 transition-colors">
            <Plus className="w-4 h-4" />
            Neues Projekt
          </button>
          <div className="flex items-center gap-1 bg-white rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-1">
            <button onClick={() => setView("grid")}
              className={`p-2 rounded-md transition-colors ${view === "grid" ? "bg-gray-900 text-white" : "text-gray-400 hover:text-gray-900"}`}>
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button onClick={() => setView("list")}
              className={`p-2 rounded-md transition-colors ${view === "list" ? "bg-gray-900 text-white" : "text-gray-400 hover:text-gray-900"}`}>
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Create Project Modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm" onClick={() => setShowCreate(false)}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Neues Projekt erstellen</h2>
              <button onClick={() => setShowCreate(false)} className="text-gray-400 hover:text-gray-900 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Projektname *</label>
                <input type="text" value={newProject.name} onChange={e => setNewProject(p => ({ ...p, name: e.target.value }))}
                  placeholder="z.B. kanjo-creative"
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10" autoFocus />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Kunde</label>
                  <select value={newProject.customerId} onChange={e => setNewProject(p => ({ ...p, customerId: e.target.value }))}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10">
                    <option value="">Kein Kunde</option>
                    {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Typ</label>
                  <select value={newProject.type} onChange={e => setNewProject(p => ({ ...p, type: e.target.value }))}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10">
                    <option value="">Auswählen</option>
                    <option value="Website">Website</option>
                    <option value="Landing Page">Landing Page</option>
                    <option value="Onlineshop">Onlineshop</option>
                    <option value="React Native App">App</option>
                    <option value="Prestige">Prestige</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Deadline</label>
                  <input type="date" value={newProject.deadline} onChange={e => setNewProject(p => ({ ...p, deadline: e.target.value }))}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Zugewiesen an</label>
                  <select value={newProject.assignedTo} onChange={e => setNewProject(p => ({ ...p, assignedTo: e.target.value }))}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10">
                    <option value="">Niemand</option>
                    <option value="Louis">Louis</option>
                    <option value="Caro">Caro</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Notizen</label>
                <textarea value={newProject.notes} onChange={e => setNewProject(p => ({ ...p, notes: e.target.value }))} rows={3}
                  placeholder="Projektbeschreibung..."
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 resize-none" />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
              <button onClick={() => setShowCreate(false)} className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
                Abbrechen
              </button>
              <button onClick={createProject} disabled={!newProject.name.trim() || creating}
                className="inline-flex items-center gap-2 bg-gray-900 text-white rounded-lg px-5 py-2 text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50">
                {creating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                Erstellen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-400" />
          <input type="text" placeholder="Projekte suchen..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)] rounded-xl pl-11 pr-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10" />
        </div>
        <div className="flex gap-1 flex-wrap">
          {STATUS_FILTERS.map(f => (
            <button key={f.value} onClick={() => setStatusFilter(f.value)}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                statusFilter === f.value ? "bg-gray-900 text-white" : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
              }`}>
              {f.label}
              {f.value === "__archived" && archivedCount > 0 && <span className="ml-1 opacity-60">({archivedCount})</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="py-20 flex justify-center"><Loader2 className="w-5 h-5 text-gray-300 animate-spin" /></div>
      ) : filtered.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-sm text-gray-400">{isArchiveView ? "Keine archivierten Projekte." : "Keine Projekte gefunden."}</p>
        </div>
      ) : view === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(p => (
            <ProjectCard key={p.id} project={p} onPin={togglePin} onArchive={toggleArchive} />
          ))}
        </div>
      ) : (
        /* List View */
        <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="w-10 px-4 py-3"></th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-400">Projekt</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-400">Kunde</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-400">Zugewiesen</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-400">Status</th>
                <th className="w-10 px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id} className="border-t border-gray-100 hover:bg-gray-50/50 transition-colors group">
                  <td className="px-4 py-3">
                    <button onClick={(e) => togglePin(e, p.id, !!p.pinned)}
                      className={`transition-colors ${p.pinned ? "text-yellow-500" : "text-gray-200 hover:text-yellow-500"}`}>
                      <Star className={`w-4 h-4 ${p.pinned ? "fill-current" : ""}`} />
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/portal/admin/projekte/${p.id}`} className="font-semibold text-gray-900 hover:text-gray-700">{p.name}</Link>
                    {p.liveUrl && <p className="text-xs text-emerald-600 mt-0.5">{p.liveUrl.replace(/^https?:\/\//, "")}</p>}
                  </td>
                  <td className="px-4 py-3 text-gray-500">{p.customerName}</td>
                  <td className="px-4 py-3 text-gray-500">{p.assignedTo || "–"}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusBadge[p.notionStatus] || "text-gray-500 bg-gray-100"}`}>
                      {statusLabel[p.notionStatus] || p.notionStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={(e) => toggleArchive(e, p.id, !!p.archived)}
                      className="text-gray-200 hover:text-gray-500 transition-colors opacity-0 group-hover:opacity-100"
                      title={p.archived ? "Wiederherstellen" : "Archivieren"}>
                      <Archive className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="text-xs text-gray-400">{filtered.length} von {projects.length} Projekten</p>
    </div>
  );
}

function ProjectCard({ project: p, onPin, onArchive }: {
  project: Project;
  onPin: (e: React.MouseEvent, id: string, pinned: boolean) => void;
  onArchive: (e: React.MouseEvent, id: string, archived: boolean) => void;
}) {
  const router = useRouter();
  const [hoverStar, setHoverStar] = useState(false);
  const [hoverArchive, setHoverArchive] = useState(false);
  const [hoverGlobe, setHoverGlobe] = useState(false);
  const [hoverGithub, setHoverGithub] = useState(false);

  return (
    <div
      onClick={() => router.push(`/portal/admin/projekte/${p.id}`)}
      className="cursor-pointer bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-shadow flex flex-col overflow-hidden"
    >
      {/* Site Preview */}
      {p.liveUrl && <SitePreview url={p.liveUrl} name={p.name} />}

      <div className="p-5 flex flex-col flex-1">
      {/* Top: Status + Actions */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className={`w-1.5 h-1.5 rounded-full ${statusDot[p.notionStatus] || "bg-gray-300"}`} />
          <span className="text-xs text-gray-400">{statusLabel[p.notionStatus] || p.notionStatus}</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={(e) => { e.stopPropagation(); onPin(e, p.id, !!p.pinned); }}
            onMouseEnter={() => setHoverStar(true)}
            onMouseLeave={() => setHoverStar(false)}
            title={p.pinned ? "Entpinnen" : "Pinnen"}
            className="p-1.5 rounded-lg transition-all"
            style={{
              color: p.pinned ? "#111827" : hoverStar ? "#111827" : "#9ca3af",
              backgroundColor: hoverStar || p.pinned ? "#f3f4f6" : "transparent",
            }}
          >
            <Star className={`w-4 h-4 ${p.pinned ? "fill-current" : ""}`} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onArchive(e, p.id, !!p.archived); }}
            onMouseEnter={() => setHoverArchive(true)}
            onMouseLeave={() => setHoverArchive(false)}
            title={p.archived ? "Wiederherstellen" : "Archivieren"}
            className="p-1.5 rounded-lg transition-all"
            style={{
              color: hoverArchive ? "#111827" : "#9ca3af",
              backgroundColor: hoverArchive ? "#f3f4f6" : "transparent",
            }}
          >
            <Archive className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Name + Customer */}
      <h3 className="text-sm font-semibold text-gray-900 mb-1">{p.name}</h3>
      <p className="text-sm text-gray-400 mb-3">{p.customerName}</p>

      {/* Metadata */}
      <div className="flex flex-wrap gap-2 mb-3">
        {p.assignedTo && (
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{p.assignedTo}</span>
        )}
        {p.liveUrl && (
          <span className="text-xs text-emerald-600 truncate max-w-[180px]">{p.liveUrl.replace(/^https?:\/\//, "")}</span>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100 pt-3 mt-auto flex items-center justify-between">
        <span className="text-xs text-gray-400">{p.type || "Entwicklung"}</span>
        <div className="flex items-center gap-1">
          {p.liveUrl && (
            <a
              href={p.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              onMouseEnter={() => setHoverGlobe(true)}
              onMouseLeave={() => setHoverGlobe(false)}
              className="p-1.5 rounded-lg transition-all"
              style={{
                color: hoverGlobe ? "#111827" : "#9ca3af",
                backgroundColor: hoverGlobe ? "#f3f4f6" : "transparent",
              }}
            >
              <Globe className="w-4 h-4" />
            </a>
          )}
          {p.repo && (
            <a
              href={p.repo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              onMouseEnter={() => setHoverGithub(true)}
              onMouseLeave={() => setHoverGithub(false)}
              className="p-1.5 rounded-lg transition-all"
              style={{
                color: hoverGithub ? "#111827" : "#9ca3af",
                backgroundColor: hoverGithub ? "#f3f4f6" : "transparent",
              }}
            >
              <Github className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}

function SitePreview({ url, name }: { url: string; name: string }) {
  const [error, setError] = useState(false);

  if (error) return null;

  const screenshotUrl = `/api/portal/admin/screenshot?url=${encodeURIComponent(url)}`;

  return (
    <div className="w-full h-[150px] bg-gray-50 overflow-hidden border-b border-gray-100">
      <img
        src={screenshotUrl}
        alt={name}
        className="w-full h-full object-cover object-top"
        loading="lazy"
        onError={() => setError(true)}
      />
    </div>
  );
}

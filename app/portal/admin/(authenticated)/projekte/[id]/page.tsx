"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import {
  ArrowLeft, Globe, Github, Loader2, Calendar, User,
  Check, FolderKanban, Pencil, TrendingUp,
  ArrowUpRight,
} from "lucide-react";
import NextLink from "next/link";

interface ProjectDetail {
  id: string; name: string; customerName: string; customerId: string;
  notionStatus: string; type: string; area: string; priority: string;
  endDate: string | null; description: string; repo: string; liveUrl: string;
  invoiceStatus: string; nextAction: string;
  milestones: { id: string; name: string; date: string | null; status: string; order: number }[];
}

const STATUS_OPTIONS = [
  { value: "Not started", label: "Planung" },
  { value: "In progress", label: "Aktiv" },
  { value: "on hold", label: "Pausiert" },
  { value: "Done", label: "Fertig" },
];

const PRIO_OPTIONS = [
  { value: "high", label: "Hoch", active: "bg-red-50 text-red-600" },
  { value: "medium", label: "Mittel", active: "bg-yellow-50 text-yellow-600" },
  { value: "low", label: "Niedrig", active: "bg-gray-100 text-gray-500" },
  { value: "", label: "\u2013", active: "bg-gray-100 text-gray-400" },
];

export default function ProjectDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Editable fields
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [deadline, setDeadline] = useState("");
  const [notes, setNotes] = useState("");
  const [nextAction, setNextAction] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [repo, setRepo] = useState("");

  const [editing, setEditing] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetch(`/api/portal/admin/projekte/${id}`)
      .then(r => r.json())
      .then(data => {
        if (!data.error) {
          setProject(data);
          setStatus(data.notionStatus || "");
          setPriority(data.priority || "");
          setDeadline(data.endDate || "");
          setNotes(data.description || "");
          setNextAction(data.nextAction || "");
          setLiveUrl(data.liveUrl || "");
          setRepo(data.repo || "");
        }
        setLoading(false);
      });
  }, [id]);

  const save = useCallback(async (fields: Record<string, any>) => {
    setSaving(true);
    try {
      const res = await fetch(`/api/portal/admin/projekte/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      if (res.ok) {
        setProject(prev => prev ? { ...prev, ...mapFieldsToProject(fields) } : prev);
      }
    } catch {} finally {
      setSaving(false);
    }
  }, [id]);

  function mapFieldsToProject(fields: Record<string, any>) {
    const mapped: Record<string, any> = {};
    if (fields.status) mapped.notionStatus = fields.status;
    if (fields.priority !== undefined) mapped.priority = fields.priority;
    if (fields.deadline !== undefined) mapped.endDate = fields.deadline || null;
    if (fields.notes !== undefined) mapped.description = fields.notes;
    if (fields.nextAction !== undefined) mapped.nextAction = fields.nextAction;
    if (fields.liveUrl !== undefined) mapped.liveUrl = fields.liveUrl;
    if (fields.repo !== undefined) mapped.repo = fields.repo;
    return mapped;
  }

  if (loading) return (
    <div className="flex items-center justify-center py-32">
      <Loader2 className="w-5 h-5 text-gray-300 animate-spin" />
    </div>
  );

  if (!project) return (
    <div className="text-center py-32">
      <p className="text-sm text-gray-500">Projekt nicht gefunden.</p>
      <NextLink href="/portal/admin/projekte" className="text-sm text-gray-400 hover:text-gray-900 transition-colors mt-4 inline-block">Zur\u00FCck zur \u00DCbersicht</NextLink>
    </div>
  );

  const milestones = project.milestones || [];
  const doneMilestones = milestones.filter(m => m.status === "Erledigt").length;
  const progress = milestones.length > 0 ? Math.round((doneMilestones / milestones.length) * 100) : 0;

  return (
    <div>
      {/* Saving toast */}
      {saving && (
        <div className="fixed bottom-8 right-8 z-50 flex items-center gap-3 px-5 py-3 rounded-xl bg-gray-900 text-white text-xs font-medium shadow-lg">
          <Loader2 className="w-4 h-4 animate-spin" /> Speichern...
        </div>
      )}

      {/* Hero with screenshot background — edge to edge, tall */}
      <div className="relative overflow-hidden" style={{ minHeight: "480px" }}>
        {/* Screenshot as full background */}
        {project.liveUrl ? (
          <img
            src={`/api/portal/admin/screenshot?url=${encodeURIComponent(project.liveUrl)}`}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-top"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
        ) : null}
        {/* Fallback bg */}
        <div className="absolute inset-0 bg-gray-900" style={{ zIndex: -1 }} />
        {/* Gradient: strong at bottom for text, lighter at top to show the screenshot */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

        {/* Content pinned to bottom */}
        <div className="relative z-10 flex flex-col justify-between h-full" style={{ minHeight: "480px" }}>
          {/* Top: Back link */}
          <div className="p-6 md:p-10">
            <NextLink href="/portal/admin/projekte" className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Projekte</span>
            </NextLink>
          </div>

          {/* Bottom: Project info */}
          <div className="p-6 md:p-10 pt-0">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs text-white/50 font-medium uppercase tracking-wider">{project.type || "Entwicklung"}</span>
              {project.area && <span className="text-xs text-white/40">· {project.area}</span>}
              {project.customerName && project.customerName !== "–" && (
                <NextLink href={project.customerId ? `/portal/admin/kunden/${project.customerId}` : "#"}
                  className="text-xs text-white/40 hover:text-white transition-colors">· {project.customerName}</NextLink>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-6">{project.name}</h1>

          <div className="flex flex-wrap items-center gap-3">
            {/* Status selector */}
            <div className="flex bg-white/10 backdrop-blur-sm rounded-lg p-1">
              {STATUS_OPTIONS.map(opt => (
                <button key={opt.value} onClick={() => { setStatus(opt.value); save({ status: opt.value }); }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    status === opt.value ? "bg-white text-gray-900" : "text-white/60 hover:text-white"
                  }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    status === opt.value
                      ? (opt.value === "In progress" ? "bg-emerald-500" : opt.value === "on hold" ? "bg-yellow-500" : opt.value === "Done" ? "bg-blue-500" : "bg-gray-400")
                      : opt.value === "In progress" ? "bg-emerald-400" : opt.value === "on hold" ? "bg-yellow-400" : opt.value === "Done" ? "bg-blue-400" : "bg-gray-400"
                  }`} />
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Priority selector */}
            <div className="flex bg-white/10 backdrop-blur-sm rounded-lg p-1">
              {PRIO_OPTIONS.map(opt => (
                <button key={opt.value} onClick={() => { setPriority(opt.value); save({ priority: opt.value }); }}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    priority === opt.value ? "bg-white text-gray-900" : "text-white/60 hover:text-white"
                  }`}>
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Action buttons */}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-white/20 transition-colors flex items-center gap-2">
                <Globe className="w-3.5 h-3.5" />
                Live
                <ArrowUpRight className="w-3 h-3" />
              </a>
            )}
            {project.repo && (
              <a href={project.repo} target="_blank" rel="noopener noreferrer"
                className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-white/20 transition-colors flex items-center gap-2">
                <Github className="w-3.5 h-3.5" />
                Repo
                <ArrowUpRight className="w-3 h-3" />
              </a>
            )}
          </div>
          </div>
        </div>
      </div>

      {/* Content with padding */}
      <div className="max-w-6xl mx-auto px-8 md:px-12 pb-24 pt-8 space-y-8">

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <NextLink href={project.customerId ? `/portal/admin/kunden/${project.customerId}` : "#"} className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-5 group hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-shadow">
          <User className="w-4 h-4 text-gray-300 mb-3" />
          <p className="text-[11px] text-gray-400 mb-1">Kunde</p>
          <p className="text-sm font-semibold text-gray-900 truncate">{project.customerName}</p>
        </NextLink>

        <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-5">
          <Calendar className="w-4 h-4 text-gray-300 mb-3" />
          <p className="text-[11px] text-gray-400 mb-1">Deadline</p>
          <input type="date" value={deadline} onChange={e => setDeadline(e.target.value)} onBlur={() => save({ deadline })}
            className="text-sm font-semibold text-gray-900 bg-transparent border-none p-0 focus:outline-none focus:ring-0 w-full cursor-pointer" />
        </div>

        <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-5">
          <FolderKanban className="w-4 h-4 text-gray-300 mb-3" />
          <p className="text-[11px] text-gray-400 mb-1">Rechnung</p>
          <p className="text-sm font-semibold text-gray-900">{project.invoiceStatus || "Ausstehend"}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-5">
          <TrendingUp className="w-4 h-4 text-gray-300 mb-3" />
          <p className="text-[11px] text-gray-400 mb-1">Fortschritt</p>
          <p className="text-sm font-semibold text-gray-900 mb-2">{progress}%</p>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-gray-900 rounded-full transition-all duration-1000" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8 space-y-4">
          {/* Next Action */}
          <section className="bg-amber-50 rounded-2xl p-5">
            <p className="text-xs font-medium text-amber-600 mb-2">Nächster Schritt</p>
            <div className={`relative group ${editing.nextAction ? "" : "cursor-pointer"}`} onClick={() => !editing.nextAction && setEditing(e => ({ ...e, nextAction: true }))}>
              {editing.nextAction ? (
                <div className="space-y-3">
                  <input type="text" value={nextAction} onChange={e => setNextAction(e.target.value)}
                    onKeyDown={e => { if (e.key === "Enter") { save({ nextAction }); setEditing(ed => ({ ...ed, nextAction: false })); } }}
                    className="w-full text-sm text-amber-800 bg-transparent border-b border-amber-200 pb-2 focus:outline-none focus:border-amber-400 transition-colors"
                    placeholder="Was steht als nächstes an?" autoFocus />
                  <div className="flex gap-2">
                    <button onClick={(e) => { e.stopPropagation(); save({ nextAction }); setEditing(e => ({ ...e, nextAction: false })); }} className="px-4 py-2 bg-gray-900 text-white text-xs font-medium rounded-lg hover:bg-gray-800 transition-colors">Speichern</button>
                    <button onClick={(e) => { e.stopPropagation(); setNextAction(project.nextAction || ""); setEditing(e => ({ ...e, nextAction: false })); }} className="px-4 py-2 text-gray-400 text-xs font-medium rounded-lg hover:text-gray-900 transition-colors">Abbrechen</button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between">
                  <p className="text-sm text-amber-800">
                    {nextAction || <span className="text-amber-400 italic">Kein n\u00E4chster Schritt definiert...</span>}
                  </p>
                  <Pencil className="w-3.5 h-3.5 text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-3" />
                </div>
              )}
            </div>
          </section>

          {/* Description / Notes */}
          <section className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-5">
            <p className="text-xs font-medium text-gray-400 mb-3">Projektnotizen</p>
            <div className={`relative group ${editing.notes ? "" : "cursor-pointer"}`} onClick={() => !editing.notes && setEditing(e => ({ ...e, notes: true }))}>
              {editing.notes ? (
                <div className="space-y-3">
                  <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={8}
                    className="w-full bg-gray-50 rounded-xl p-4 border-0 focus:ring-2 focus:ring-gray-900/10 text-sm text-gray-700 resize-none focus:outline-none"
                    placeholder="Notizen zum Projekt..." autoFocus />
                  <div className="flex gap-2">
                    <button onClick={(e) => { e.stopPropagation(); save({ notes }); setEditing(e => ({ ...e, notes: false })); }} className="px-4 py-2 bg-gray-900 text-white text-xs font-medium rounded-lg hover:bg-gray-800 transition-colors">Speichern</button>
                    <button onClick={(e) => { e.stopPropagation(); setNotes(project.description || ""); setEditing(e => ({ ...e, notes: false })); }} className="px-4 py-2 text-gray-400 text-xs font-medium rounded-lg hover:text-gray-900 transition-colors">Abbrechen</button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between">
                  <p className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed">
                    {notes || <span className="text-gray-300 italic">Keine Notizen vorhanden.</span>}
                  </p>
                  <Pencil className="w-3.5 h-3.5 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-3" />
                </div>
              )}
            </div>
          </section>
        </div>

        <aside className="lg:col-span-4">
          {/* Milestones */}
          <section className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-5 h-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-gray-900">Meilensteine</h2>
              <span className="text-xs text-gray-400">{doneMilestones}/{milestones.length}</span>
            </div>
            <div className="space-y-2">
              {milestones.length > 0 ? (
                milestones.sort((a, b) => a.order - b.order).map(m => (
                  <div key={m.id} className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-0">
                    <div className="shrink-0">
                      {m.status === "Erledigt" ? (
                        <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        </div>
                      ) : m.status === "In Arbeit" ? (
                        <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium truncate ${m.status === "Erledigt" ? "text-gray-400 line-through" : "text-gray-900"}`}>
                        {m.name}
                      </p>
                      {m.date && <p className="text-[11px] text-gray-400 mt-0.5">{m.date}</p>}
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center">
                  <p className="text-sm text-gray-400">Keine Meilensteine definiert.</p>
                </div>
              )}
            </div>
          </section>
        </aside>
      </div>
      </div>
    </div>
  );
}

function SitePreview({ url, name, large }: { url: string; name: string; large?: boolean }) {
  const [error, setError] = useState(false);
  if (error) return null;

  const screenshotUrl = `/api/portal/admin/screenshot?url=${encodeURIComponent(url)}`;

  return (
    <a href={url} target="_blank" rel="noopener noreferrer"
      className={`block bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-shadow ${large ? "h-[300px]" : "h-[150px]"}`}>
      <img
        src={screenshotUrl}
        alt={name}
        className="w-full h-full object-cover object-top"
        loading="lazy"
        onError={() => setError(true)}
      />
    </a>
  );
}

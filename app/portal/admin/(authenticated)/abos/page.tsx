"use client";

import { useEffect, useState } from "react";
import { Plus, Loader2, X, Pencil, Trash2, CreditCard } from "lucide-react";
import { useCachedFetch } from "@/lib/portal/use-cached-fetch";

interface Abo {
  id: string;
  name: string;
  anbieter?: string;
  kosten?: number;
  intervall?: string;
  naechsteVerlaengerung?: string;
  status?: string;
  kategorie?: string;
}

const KATEGORIE_OPTIONS = ["Hosting", "Domain", "SaaS", "API", "Sonstiges"];
const INTERVALL_OPTIONS = ["Monatlich", "Jährlich", "Einmalig"];
const STATUS_OPTIONS = ["Aktiv", "Gekündigt", "Pausiert"];

const STATUS_BADGE: Record<string, string> = {
  "Aktiv": "text-blue-600 bg-blue-50",
  "Gekündigt": "text-gray-500 bg-gray-100",
  "Pausiert": "text-gray-500 bg-gray-100",
};

const KATEGORIE_BADGE: Record<string, string> = {
  "Hosting": "text-blue-600 bg-blue-50",
  "Domain": "text-blue-600 bg-blue-50",
  "SaaS": "text-gray-600 bg-gray-100",
  "API": "text-gray-500 bg-gray-100",
  "Sonstiges": "text-gray-500 bg-gray-100",
};

function formatCurrency(value?: number) {
  if (value == null) return "\u2014";
  return `${value.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} \u20AC`;
}

function formatDate(dateStr?: string) {
  if (!dateStr) return "\u2014";
  try {
    return new Date(dateStr).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" });
  } catch {
    return dateStr;
  }
}

export default function AdminAbosPage() {
  const [abosCache, abosLoading] = useCachedFetch<Abo[]>("/api/portal/admin/abos", []);
  const [abos, setAbos] = useState<Abo[]>([]);
  const loading = abosLoading && abos.length === 0;

  useEffect(() => { setAbos(abosCache); }, [abosCache]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterKategorie, setFilterKategorie] = useState("");
  const [saving, setSaving] = useState(false);

  // Form state
  const [formName, setFormName] = useState("");
  const [formAnbieter, setFormAnbieter] = useState("");
  const [formKosten, setFormKosten] = useState("");
  const [formIntervall, setFormIntervall] = useState("");
  const [formVerlaengerung, setFormVerlaengerung] = useState("");
  const [formStatus, setFormStatus] = useState("Aktiv");
  const [formKategorie, setFormKategorie] = useState("");

  function resetForm() {
    setFormName("");
    setFormAnbieter("");
    setFormKosten("");
    setFormIntervall("");
    setFormVerlaengerung("");
    setFormStatus("Aktiv");
    setFormKategorie("");
    setEditingId(null);
    setShowForm(false);
  }

  function startEdit(abo: Abo) {
    setFormName(abo.name);
    setFormAnbieter(abo.anbieter || "");
    setFormKosten(abo.kosten != null ? String(abo.kosten) : "");
    setFormIntervall(abo.intervall || "");
    setFormVerlaengerung(abo.naechsteVerlaengerung || "");
    setFormStatus(abo.status || "Aktiv");
    setFormKategorie(abo.kategorie || "");
    setEditingId(abo.id);
    setShowForm(true);
  }

  async function saveAbo() {
    if (!formName.trim()) return;
    setSaving(true);

    const body = {
      name: formName.trim(),
      anbieter: formAnbieter.trim() || undefined,
      kosten: formKosten ? parseFloat(formKosten) : undefined,
      intervall: formIntervall || undefined,
      naechsteVerlaengerung: formVerlaengerung || undefined,
      status: formStatus || undefined,
      kategorie: formKategorie || undefined,
    };

    try {
      if (editingId) {
        const res = await fetch(`/api/portal/admin/abos/${editingId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const updated = await res.json();
        setAbos(prev => prev.map(a => a.id === editingId ? updated : a));
      } else {
        const res = await fetch("/api/portal/admin/abos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const created = await res.json();
        setAbos(prev => [...prev, created]);
      }
      resetForm();
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  }

  async function deleteAbo(id: string) {
    try {
      await fetch(`/api/portal/admin/abos/${id}`, { method: "DELETE" });
      setAbos(prev => prev.filter(a => a.id !== id));
    } catch (e) {
      console.error(e);
    }
  }

  const filtered = abos.filter(a => {
    if (filterStatus && a.status !== filterStatus) return false;
    if (filterKategorie && a.kategorie !== filterKategorie) return false;
    return true;
  });

  const activeAbos = abos.filter(a => a.status === "Aktiv");
  const monatlicheKosten = activeAbos
    .filter(a => a.intervall === "Monatlich")
    .reduce((s, a) => s + (a.kosten || 0), 0);
  const jaehrlicheKosten = activeAbos
    .filter(a => a.intervall === "Jährlich")
    .reduce((s, a) => s + (a.kosten || 0), 0);

  return (
    <div className="max-w-6xl mx-auto px-8 md:px-12 pb-24 pt-12 space-y-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-gray-900">Abonnements</h1>
          <p className="text-sm text-gray-500 mt-1">{abos.length} Abos verwaltet</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="inline-flex items-center gap-2 bg-gray-900 text-white rounded-full px-5 py-2.5 text-sm font-semibold hover:bg-gray-800 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Neues Abo
        </button>
      </header>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-300">
              <CreditCard className="w-5 h-5" strokeWidth={1.5} />
            </div>
          </div>
          {loading ? (
            <div className="h-8 w-24 bg-gray-100 animate-pulse rounded-xl mb-2" />
          ) : (
            <p className="text-2xl font-bold tracking-tight text-gray-900 mb-1">{formatCurrency(monatlicheKosten)}</p>
          )}
          <p className="text-xs font-medium text-gray-400">Monatliche Kosten</p>
        </div>
        <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-300">
              <CreditCard className="w-5 h-5" strokeWidth={1.5} />
            </div>
          </div>
          {loading ? (
            <div className="h-8 w-24 bg-gray-100 animate-pulse rounded-xl mb-2" />
          ) : (
            <p className="text-2xl font-bold tracking-tight text-gray-900 mb-1">{formatCurrency(jaehrlicheKosten)}</p>
          )}
          <p className="text-xs font-medium text-gray-400">Jährliche Kosten</p>
        </div>
        <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-300">
              <CreditCard className="w-5 h-5" strokeWidth={1.5} />
            </div>
          </div>
          {loading ? (
            <div className="h-8 w-24 bg-gray-100 animate-pulse rounded-xl mb-2" />
          ) : (
            <p className="text-2xl font-bold tracking-tight text-gray-900 mb-1">{abos.length}</p>
          )}
          <p className="text-xs font-medium text-gray-400">Anzahl Abos</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="flex gap-1">
          <button
            onClick={() => setFilterStatus("")}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              filterStatus === "" ? "bg-gray-900 text-white" : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            Alle
          </button>
          {STATUS_OPTIONS.map(s => (
            <button
              key={s}
              onClick={() => setFilterStatus(filterStatus === s ? "" : s)}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                filterStatus === s ? "bg-gray-900 text-white" : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <select
          value={filterKategorie}
          onChange={e => setFilterKategorie(e.target.value)}
          className="bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)] rounded-full px-5 py-2.5 text-sm font-semibold text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900/10 appearance-none cursor-pointer pr-10"
        >
          <option value="">Alle Kategorien</option>
          {KATEGORIE_OPTIONS.map(k => (
            <option key={k} value={k}>{k}</option>
          ))}
        </select>
      </div>

      {/* New/Edit form */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-900">
              {editingId ? "Abo bearbeiten" : "Neues Abo"}
            </h2>
            <button onClick={resetForm} className="text-gray-400 hover:text-gray-900 transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Name *"
              value={formName}
              onChange={e => setFormName(e.target.value)}
              className="bg-gray-50 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
            />
            <input
              type="text"
              placeholder="Anbieter"
              value={formAnbieter}
              onChange={e => setFormAnbieter(e.target.value)}
              className="bg-gray-50 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
            />
            <input
              type="number"
              placeholder="Kosten"
              step="0.01"
              value={formKosten}
              onChange={e => setFormKosten(e.target.value)}
              className="bg-gray-50 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
            />
            <select
              value={formIntervall}
              onChange={e => setFormIntervall(e.target.value)}
              className="bg-gray-50 rounded-xl px-4 py-3 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
            >
              <option value="">Intervall</option>
              {INTERVALL_OPTIONS.map(i => (
                <option key={i} value={i}>{i}</option>
              ))}
            </select>
            <input
              type="date"
              placeholder="Nächste Verlängerung"
              value={formVerlaengerung}
              onChange={e => setFormVerlaengerung(e.target.value)}
              className="bg-gray-50 rounded-xl px-4 py-3 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
            />
            <select
              value={formStatus}
              onChange={e => setFormStatus(e.target.value)}
              className="bg-gray-50 rounded-xl px-4 py-3 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
            >
              {STATUS_OPTIONS.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <select
              value={formKategorie}
              onChange={e => setFormKategorie(e.target.value)}
              className="bg-gray-50 rounded-xl px-4 py-3 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
            >
              <option value="">Kategorie</option>
              {KATEGORIE_OPTIONS.map(k => (
                <option key={k} value={k}>{k}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={saveAbo}
              disabled={saving || !formName.trim()}
              className="bg-gray-900 text-white rounded-full px-6 py-2.5 text-sm font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : editingId ? "Speichern" : "Erstellen"}
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      {loading ? (
        <div className="py-20 flex justify-center"><Loader2 className="w-5 h-5 text-gray-300 animate-spin" /></div>
      ) : (
        <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="text-left px-6 py-4 text-xs font-medium text-gray-400">Name</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-gray-400">Anbieter</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-gray-400">Kosten</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-gray-400">Intervall</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-gray-400">Nächste Verlängerung</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-gray-400">Kategorie</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-gray-400">Status</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-gray-400 w-24"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={8} className="px-6 py-12 text-center text-sm text-gray-400">Keine Abos gefunden.</td></tr>
              ) : (
                filtered.map(abo => (
                  <tr key={abo.id} className="border-t border-gray-100 hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">{abo.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{abo.anbieter || "\u2014"}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">{formatCurrency(abo.kosten)}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{abo.intervall || "\u2014"}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{formatDate(abo.naechsteVerlaengerung)}</td>
                    <td className="px-6 py-4">
                      {abo.kategorie ? (
                        <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${KATEGORIE_BADGE[abo.kategorie] || "text-gray-500 bg-gray-100"}`}>
                          {abo.kategorie}
                        </span>
                      ) : "\u2014"}
                    </td>
                    <td className="px-6 py-4">
                      {abo.status ? (
                        <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_BADGE[abo.status] || "text-gray-500 bg-gray-100"}`}>
                          {abo.status}
                        </span>
                      ) : "\u2014"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => startEdit(abo)}
                          className="text-gray-300 hover:text-gray-900 transition-colors"
                          title="Bearbeiten"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteAbo(abo.id)}
                          className="text-gray-300 hover:text-gray-600 transition-colors"
                          title="Löschen"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      <p className="text-xs text-gray-400">{filtered.length} von {abos.length} Abos</p>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Search, Loader2, TrendingUp } from "lucide-react";

interface Invoice {
  id: string; name: string; invoiceNo: string; client: string;
  project: string; amount: number; issueDate: string | null;
  dueDate: string | null; status: string;
}

const statusStyles: Record<string, string> = {
  Bezahlt: "text-emerald-600 bg-emerald-50",
  Gesendet: "text-blue-600 bg-blue-50",
  Entwurf: "text-gray-500 bg-gray-100",
  "\u00DCberf\u00E4llig": "text-red-600 bg-red-50",
};

const STATUS_FILTERS = [
  { value: "", label: "Alle" },
  { value: "Bezahlt", label: "Bezahlt" },
  { value: "Gesendet", label: "Offen" },
  { value: "Entwurf", label: "Entwurf" },
];

export default function AdminRechnungenPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    fetch("/api/portal/admin/rechnungen")
      .then(r => r.json())
      .then(data => { setInvoices(Array.isArray(data) ? data : []); setLoading(false); });
  }, []);

  const filtered = invoices.filter(inv => {
    const s = search.toLowerCase();
    const matchesSearch = !s || inv.name.toLowerCase().includes(s) || inv.client.toLowerCase().includes(s) || inv.invoiceNo.toLowerCase().includes(s) || inv.project.toLowerCase().includes(s);
    return matchesSearch && (!statusFilter || inv.status === statusFilter);
  });

  const totalRevenue = invoices.filter(i => i.status === "Bezahlt").reduce((s, i) => s + i.amount, 0);
  const totalPending = invoices.filter(i => i.status === "Gesendet").reduce((s, i) => s + i.amount, 0);
  const totalDraft = invoices.filter(i => i.status === "Entwurf").reduce((s, i) => s + i.amount, 0);

  return (
    <div className="max-w-6xl mx-auto px-8 md:px-12 pb-24 pt-12 space-y-8">
      <header>
        <h1 className="text-xl font-semibold tracking-tight text-gray-900">Rechnungen</h1>
        <p className="text-sm text-gray-500 mt-1">{invoices.length} Rechnungen</p>
      </header>

      {/* Revenue Summary */}
      {!loading && (
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-emerald-50 rounded-2xl p-6">
            <TrendingUp className="w-4 h-4 text-emerald-600 mb-3" />
            <p className="text-xl font-bold text-emerald-600 tracking-tight">{totalRevenue.toLocaleString("de-DE")} \u20AC</p>
            <p className="text-[11px] text-emerald-600 mt-1">Bezahlt</p>
          </div>
          <div className="bg-blue-50 rounded-2xl p-6">
            <p className="text-xl font-bold text-blue-600 tracking-tight mt-7">{totalPending.toLocaleString("de-DE")} \u20AC</p>
            <p className="text-[11px] text-blue-600 mt-1">Offen</p>
          </div>
          <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-6">
            <p className="text-xl font-bold text-gray-400 tracking-tight mt-7">{totalDraft.toLocaleString("de-DE")} \u20AC</p>
            <p className="text-[11px] text-gray-400 mt-1">Entwurf</p>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-400" />
          <input type="text" placeholder="Rechnung, Kunde oder Projekt suchen..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)] rounded-xl pl-11 pr-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10" />
        </div>
        <div className="flex gap-1">
          {STATUS_FILTERS.map(f => (
            <button key={f.value} onClick={() => setStatusFilter(f.value)}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${statusFilter === f.value ? "bg-gray-900 text-white" : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"}`}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50/50">
              <th className="text-left px-6 py-4 text-xs font-medium text-gray-400">Nr.</th>
              <th className="text-left px-6 py-4 text-xs font-medium text-gray-400">Bezeichnung</th>
              <th className="text-left px-6 py-4 text-xs font-medium text-gray-400">Kunde</th>
              <th className="text-left px-6 py-4 text-xs font-medium text-gray-400">Projekt</th>
              <th className="text-right px-6 py-4 text-xs font-medium text-gray-400">Betrag</th>
              <th className="text-left px-6 py-4 text-xs font-medium text-gray-400">Datum</th>
              <th className="text-left px-6 py-4 text-xs font-medium text-gray-400">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} className="px-6 py-12 text-center"><Loader2 className="w-5 h-5 text-gray-300 animate-spin mx-auto" /></td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={7} className="px-6 py-12 text-center text-sm text-gray-400">Keine Rechnungen gefunden.</td></tr>
            ) : (
              filtered.map(inv => (
                <tr key={inv.id} className="border-t border-gray-100 hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 text-gray-400 text-xs font-mono">{inv.invoiceNo || "\u2013"}</td>
                  <td className="px-6 py-4 text-gray-900 font-medium">{inv.name}</td>
                  <td className="px-6 py-4 text-gray-500 text-sm">{inv.client || "\u2013"}</td>
                  <td className="px-6 py-4 text-gray-400 text-xs">{inv.project || "\u2013"}</td>
                  <td className="px-6 py-4 text-right text-gray-900 font-semibold">{inv.amount.toLocaleString("de-DE")} \u20AC</td>
                  <td className="px-6 py-4 text-gray-400 text-xs">{inv.issueDate || "\u2013"}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[inv.status] || statusStyles.Entwurf}`}>{inv.status}</span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-gray-400">{filtered.length} von {invoices.length} Rechnungen</p>
    </div>
  );
}

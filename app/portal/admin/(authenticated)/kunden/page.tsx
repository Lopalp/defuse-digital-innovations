"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Loader2, Check, X } from "lucide-react";
import { useCachedFetch } from "@/lib/portal/use-cached-fetch";

interface Customer {
  id: string; name: string; email: string; contactPerson: string;
  phone?: string; portalAccess: boolean; avvSigned: boolean; avvSignedAt: string | null;
}

export default function AdminKundenPage() {
  const [customers, customersLoading] = useCachedFetch<Customer[]>("/api/portal/admin/kunden", []);
  const [projects] = useCachedFetch<any[]>("/api/portal/admin/projekte", []);
  const loading = customersLoading && customers.length === 0;
  const [search, setSearch] = useState("");
  const [portalFilter, setPortalFilter] = useState<"" | "yes" | "no">("");

  const projectCounts: Record<string, number> = {};
  for (const p of projects) {
    if (p.customerId) projectCounts[p.customerId] = (projectCounts[p.customerId] || 0) + 1;
  }

  const filtered = customers.filter(c => {
    const s = search.toLowerCase();
    const matchesSearch = !s || c.name.toLowerCase().includes(s) || c.email.toLowerCase().includes(s);
    const matchesPortal = !portalFilter || (portalFilter === "yes" && c.portalAccess) || (portalFilter === "no" && !c.portalAccess);
    return matchesSearch && matchesPortal;
  });

  return (
    <div className="max-w-6xl mx-auto px-8 md:px-12 pb-24 pt-12 space-y-8">
      <header>
        <h1 className="text-xl font-semibold tracking-tight text-gray-900">Kunden</h1>
        <p className="text-sm text-gray-500 mt-1">{customers.length} Kunden im Verzeichnis</p>
      </header>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-400" />
          <input type="text" placeholder="Kunden suchen..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)] rounded-xl pl-11 pr-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10" />
        </div>
        <div className="flex gap-1 overflow-x-auto pb-1 md:pb-0 scrollbar-none w-full md:w-auto">
          {([{ value: "" as const, label: "Alle" }, { value: "yes" as const, label: "Portal aktiv" }, { value: "no" as const, label: "Kein Portal" }]).map(f => (
            <button key={f.value} onClick={() => setPortalFilter(f.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                portalFilter === f.value
                  ? "bg-gray-900 text-white"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
              }`}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center"><Loader2 className="w-5 h-5 text-gray-300 animate-spin" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.length === 0 ? (
            <div className="col-span-full py-20 text-center">
              <p className="text-sm text-gray-400">Keine Kunden gefunden.</p>
            </div>
          ) : (
            filtered.map(c => (
              <Link key={c.id} href={`/portal/admin/kunden/${c.id}`} className="group bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-shadow p-6 flex flex-col h-full">
                <div className="mb-4">
                  <h3 className="text-base font-semibold text-gray-900 group-hover:text-gray-700 truncate">{c.name}</h3>
                  <p className="text-sm text-gray-400 truncate mt-0.5">{c.email}</p>
                </div>

                <div className="border-t border-gray-100 pt-4 mt-auto flex items-center gap-6">
                  <div>
                    <p className="text-[11px] text-gray-400">Projekte</p>
                    <p className="text-sm font-semibold text-gray-900">{projectCounts[c.id] || 0}</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-400">Portal</p>
                    <div className="mt-0.5">
                      {c.portalAccess ? (
                        <span className="text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full text-xs font-medium">Aktiv</span>
                      ) : (
                        <span className="text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full text-xs font-medium">Inaktiv</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-400">AVV</p>
                    <div className="mt-0.5">
                      {c.avvSigned ? (
                        <span className="text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full text-xs font-medium">Signiert</span>
                      ) : (
                        <span className="text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full text-xs font-medium">Ausstehend</span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      )}

      <p className="text-xs text-gray-400">{filtered.length} von {customers.length} Kunden</p>
    </div>
  );
}

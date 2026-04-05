"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, Loader2, Mail, Phone, Globe, Github,
  FolderKanban, Shield, User, ArrowUpRight
} from "lucide-react";

interface CustomerDetail {
  id: string; name: string; email: string; contactPerson: string;
  phone?: string; portalAccess: boolean; avvSigned: boolean;
  avvSignedAt: string | null; avvSignedBy: string;
  projects: {
    id: string; name: string; notionStatus: string; type: string;
    endDate: string | null; repo: string; liveUrl: string; priority: string;
  }[];
}

const statusBadge: Record<string, string> = {
  "Not started": "text-blue-600 bg-blue-50",
  "In progress": "text-emerald-600 bg-emerald-50",
  "on hold": "text-yellow-600 bg-yellow-50",
  "Done": "text-gray-500 bg-gray-100",
};
const statusLabels: Record<string, string> = { "Not started": "Planung", "In progress": "Aktiv", "on hold": "Pausiert", Done: "Fertig" };

export default function CustomerDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [customer, setCustomer] = useState<CustomerDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/portal/admin/kunden/${id}`)
      .then(r => r.json())
      .then(data => { setCustomer(data.error ? null : data); setLoading(false); });
  }, [id]);

  if (loading) return (
    <div className="max-w-6xl mx-auto px-8 md:px-12 pb-24 pt-12 flex items-center justify-center py-32">
      <Loader2 className="w-5 h-5 text-gray-300 animate-spin" />
    </div>
  );

  if (!customer) return (
    <div className="max-w-6xl mx-auto px-8 md:px-12 pb-24 pt-12 text-center py-32">
      <p className="text-sm text-gray-500">Kunde nicht gefunden.</p>
      <Link href="/portal/admin/kunden" className="text-sm text-gray-400 hover:text-gray-900 transition-colors mt-4 inline-block">Zur\u00FCck zur \u00DCbersicht</Link>
    </div>
  );

  const projects = customer.projects || [];
  const active = projects.filter(p => p.notionStatus === "In progress");
  const done = projects.filter(p => p.notionStatus === "Done");
  const other = projects.filter(p => p.notionStatus !== "In progress" && p.notionStatus !== "Done");

  return (
    <div className="max-w-6xl mx-auto px-8 md:px-12 pb-24 pt-12 space-y-8">
      <header className="space-y-6">
        <Link href="/portal/admin/kunden" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-900 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Zurück zu Kunden</span>
        </Link>

        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400">Kunde</span>
              {customer.portalAccess && (
                <span className="text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full text-xs font-medium">Portal aktiv</span>
              )}
            </div>
            <h1 className="text-xl font-semibold tracking-tight text-gray-900">{customer.name}</h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              {customer.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-gray-300" />
                  <span>{customer.email}</span>
                </div>
              )}
              {customer.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-gray-300" />
                  <span>{customer.phone}</span>
                </div>
              )}
              {customer.contactPerson && (
                <div className="flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-gray-300" />
                  <span>{customer.contactPerson}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-5">
          <FolderKanban className="w-4 h-4 text-gray-300 mb-3" />
          <p className="text-[11px] text-gray-400 mb-1">Projekte gesamt</p>
          <p className="text-sm font-semibold text-gray-900">{projects.length}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-5">
          <User className="w-4 h-4 text-gray-300 mb-3" />
          <p className="text-[11px] text-gray-400 mb-1">Portal-Zugang</p>
          {customer.portalAccess ? (
            <span className="text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full text-xs font-medium">Aktiv</span>
          ) : (
            <span className="text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full text-xs font-medium">Inaktiv</span>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-5">
          <Shield className="w-4 h-4 text-gray-300 mb-3" />
          <p className="text-[11px] text-gray-400 mb-1">AVV-Status</p>
          {customer.avvSigned ? (
            <span className="text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full text-xs font-medium">Signiert</span>
          ) : (
            <span className="text-yellow-600 bg-yellow-50 px-2.5 py-1 rounded-full text-xs font-medium">Ausstehend</span>
          )}
          {customer.avvSignedAt && (
            <p className="text-[11px] text-gray-400 mt-2">{customer.avvSignedAt}</p>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-5">
          <div className={`w-4 h-4 rounded-full mb-3 ${active.length > 0 ? "bg-emerald-400" : "bg-gray-200"}`} />
          <p className="text-[11px] text-gray-400 mb-1">Aktive Projekte</p>
          <p className="text-sm font-semibold text-gray-900">{active.length}</p>
        </div>
      </div>

      {/* Projects List */}
      {projects.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-base font-semibold text-gray-900">Kundenprojekte</h2>
            <span className="text-xs text-gray-400">{projects.length}</span>
          </div>
          <div className="space-y-3">
            {[...active, ...other, ...done].map(p => (
              <Link key={p.id} href={`/portal/admin/projekte/${p.id}`}
                className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-5 hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-shadow flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <span className={`w-2 h-2 rounded-full ${p.notionStatus === "In progress" ? "bg-emerald-500" : p.notionStatus === "Done" ? "bg-blue-500" : p.notionStatus === "on hold" ? "bg-yellow-500" : "bg-gray-300"}`} />
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 group-hover:text-gray-700">{p.name}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusBadge[p.notionStatus] || "text-gray-500 bg-gray-100"}`}>{statusLabels[p.notionStatus] || p.notionStatus}</span>
                      {p.type && <span className="text-xs text-gray-400">{p.type}</span>}
                      {p.endDate && <span className="text-xs text-gray-400">{p.endDate}</span>}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {p.liveUrl && <Globe className="w-3.5 h-3.5 text-gray-300" />}
                  {p.repo && <Github className="w-3.5 h-3.5 text-gray-300" />}
                  <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-gray-900 transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

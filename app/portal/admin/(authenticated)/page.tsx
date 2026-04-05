"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FolderKanban,
  Users,
  Github,
  Triangle,
  Receipt,
  MessageSquare,
  ArrowUpRight,
  Loader2,
  Star,
} from "lucide-react";
import { useCachedFetch } from "@/lib/portal/use-cached-fetch";

interface Stats {
  projects: { total: number; active: number; done: number; onHold: number; planning: number };
  customers: { total: number; portalActive: number };
  github: { total: number; error?: string };
  vercel: { total: number; error?: string };
  invoices: { total: number; revenue: number; pending: number; pendingAmount: number };
  messages: { total: number; unread: number };
}

interface Project {
  id: string;
  name: string;
  customerName: string;
  notionStatus: string;
  liveUrl: string;
  pinned?: boolean;
  archived?: boolean;
  assignedTo?: string;
}

function StatCard({ icon: Icon, label, value, sub, href, loading }: {
  icon: any; label: string; value: string | number; sub?: string; href: string; loading: boolean;
}) {
  return (
    <Link href={href} className="group bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)] p-5 flex flex-col justify-between transition-shadow">
      <div className="flex items-center justify-between mb-6">
        <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-300">
          <Icon className="w-5 h-5" strokeWidth={1.5} />
        </div>
        <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-gray-900 transition-colors" />
      </div>
      <div>
        {loading ? (
          <div className="h-8 w-20 bg-gray-100 animate-pulse rounded-xl mb-2" />
        ) : (
          <p className="text-2xl font-bold tracking-tight text-gray-900 mb-1">{value}</p>
        )}
        <p className="text-xs font-medium text-gray-400">{label}</p>
        {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
      </div>
    </Link>
  );
}

const statusDot: Record<string, string> = {
  "In progress": "bg-blue-500",
  "Not started": "bg-blue-400",
  "on hold": "bg-gray-400",
  "Done": "bg-gray-400",
};

export default function AdminDashboard() {
  const [projData] = useCachedFetch<any[]>("/api/portal/admin/projekte", []);
  const [custData] = useCachedFetch<any[]>("/api/portal/admin/kunden", []);
  const [ghData] = useCachedFetch<any>("/api/portal/admin/github", []);
  const [vcData] = useCachedFetch<any>("/api/portal/admin/vercel", []);
  const [invData] = useCachedFetch<any[]>("/api/portal/admin/rechnungen", []);
  const [msgData] = useCachedFetch<any[]>("/api/portal/admin/nachrichten", []);

  const [projects, setProjects] = useState<Project[]>([]);
  useEffect(() => { setProjects(projData || []); }, [projData]);

  const loading = projData.length === 0 && custData.length === 0;

  const stats: Stats = {
    projects: {
      total: projData.length || 0,
      active: projData.filter((x: any) => x.notionStatus === "In progress").length,
      done: projData.filter((x: any) => x.notionStatus === "Done").length,
      onHold: projData.filter((x: any) => x.notionStatus === "on hold").length,
      planning: projData.filter((x: any) => x.notionStatus === "Not started").length,
    },
    customers: { total: custData.length || 0, portalActive: custData.filter((x: any) => x.portalAccess).length },
    github: { total: Array.isArray(ghData) ? ghData.length : 0, error: ghData?.error },
    vercel: { total: Array.isArray(vcData) ? vcData.length : 0, error: vcData?.error },
    invoices: {
      total: invData.length || 0,
      revenue: invData.filter((x: any) => x.status === "Bezahlt").reduce((s: number, x: any) => s + x.amount, 0),
      pending: invData.filter((x: any) => x.status !== "Bezahlt" && x.status !== "Entwurf").length,
      pendingAmount: invData.filter((x: any) => x.status === "Gesendet").reduce((s: number, x: any) => s + x.amount, 0),
    },
    messages: { total: msgData.length || 0, unread: msgData.filter((x: any) => !x.read).length },
  };

  const pinnedProjects = projects.filter(p => p.pinned === true);
  const activeProjects = projects.filter(p => p.notionStatus === "In progress").slice(0, 5);

  async function handleUnpin(id: string) {
    try {
      await fetch(`/api/portal/admin/projekte/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pinned: false }),
      });
      setProjects(prev => prev.map(p => p.id === id ? { ...p, pinned: false } : p));
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-8 md:px-12 pb-24 pt-12 space-y-10">
      <header>
        <h1 className="text-xl font-semibold tracking-tight text-gray-900">Übersicht</h1>
        <p className="text-sm text-gray-500 mt-1">Systemübersicht & Aktivität</p>
      </header>

      {/* Gepinnte Projekte */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Star className="w-4 h-4 text-blue-500 fill-current" />
          <h2 className="text-base font-semibold text-gray-900">Gepinnte Projekte</h2>
        </div>
        {loading ? (
          <div className="py-8 flex justify-center"><Loader2 className="w-5 h-5 text-gray-300 animate-spin" /></div>
        ) : pinnedProjects.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-6">
            <p className="text-sm text-gray-400">Pinne wichtige Projekte auf der Projekte-Seite.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pinnedProjects.map(p => (
              <div key={p.id} className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-shadow p-5 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${statusDot[p.notionStatus] || "bg-gray-300"}`} />
                    <span className="text-xs text-gray-400">{p.notionStatus}</span>
                  </div>
                  <button
                    onClick={() => handleUnpin(p.id)}
                    className="text-blue-500 hover:text-blue-600 transition-colors"
                    title="Projekt entpinnen"
                  >
                    <Star className="w-4 h-4 fill-current" />
                  </button>
                </div>
                <Link href={`/portal/admin/projekte/${p.id}`} className="group">
                  <h3 className="text-sm font-semibold text-gray-900 group-hover:text-gray-700 mb-0.5">{p.name}</h3>
                  <p className="text-xs text-gray-400 mb-2">{p.customerName}</p>
                </Link>
                {p.liveUrl && (
                  <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:text-blue-700 transition-colors truncate">
                    {p.liveUrl.replace(/^https?:\/\//, "")}
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={FolderKanban} label="Projekte" value={stats?.projects.total ?? 0}
          sub={stats ? `${stats.projects.active} aktiv` : undefined}
          href="/portal/admin/projekte" loading={loading} />
        <StatCard icon={Users} label="Kunden" value={stats?.customers.total ?? 0}
          sub={stats ? `${stats.customers.portalActive} mit Portal` : undefined}
          href="/portal/admin/kunden" loading={loading} />
        <StatCard icon={Receipt} label="Umsatz"
          value={stats ? `${stats.invoices.revenue.toLocaleString("de-DE")} \u20AC` : "0 \u20AC"}
          sub={stats?.invoices.pendingAmount ? `${stats.invoices.pendingAmount.toLocaleString("de-DE")} \u20AC offen` : "Alles bezahlt"}
          href="/portal/admin/rechnungen" loading={loading} />
        <StatCard icon={MessageSquare} label="Nachrichten" value={stats?.messages.total ?? 0}
          sub={stats?.messages.unread ? `${stats.messages.unread} ungelesen` : "Alles gelesen"}
          href="/portal/admin/nachrichten" loading={loading} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
             <h2 className="text-base font-semibold text-gray-900">Aktive Projekte</h2>
             <Link href="/portal/admin/projekte" className="text-sm text-gray-400 hover:text-gray-900 transition-colors">Alle anzeigen</Link>
          </div>
          <div className="space-y-1 flex-1">
            {loading ? (
              <div className="py-12 flex justify-center"><Loader2 className="w-5 h-5 text-gray-300 animate-spin" /></div>
            ) : activeProjects.length === 0 ? (
              <p className="text-sm text-gray-400">Keine aktiven Projekte.</p>
            ) : (
              activeProjects.map(p => (
                <Link key={p.id} href={`/portal/admin/projekte/${p.id}`} className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50/50 transition-colors group">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 group-hover:text-gray-700 mb-0.5">{p.name}</h3>
                    <p className="text-xs text-gray-400">{p.customerName}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full text-xs font-medium">Aktiv</span>
                    <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-gray-900 transition-colors" />
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        <div className="space-y-4 flex flex-col">
          <Link href="/portal/admin/github" className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)] p-5 flex-1 group transition-shadow">
            <div className="flex items-center gap-3 mb-4 text-gray-400">
              <Github className="w-4 h-4" />
              <span className="text-xs font-medium text-gray-400">Repositories</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 tracking-tight">{stats?.github.total || 0}</p>
          </Link>

          <Link href="/portal/admin/vercel" className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)] p-5 flex-1 group transition-shadow">
            <div className="flex items-center gap-3 mb-4 text-gray-400">
              <Triangle className="w-4 h-4" />
              <span className="text-xs font-medium text-gray-400">Deployments</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 tracking-tight">{stats?.vercel.total || 0}</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

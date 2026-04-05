"use client";

import { useState } from "react";
import { Search, Loader2, MessageSquare, LifeBuoy, Circle, CheckCircle2 } from "lucide-react";
import { useCachedFetch } from "@/lib/portal/use-cached-fetch";

interface Message {
  id: string; subject: string; body: string; createdAt: string;
  read: boolean; type: string; sender: string;
}

interface Ticket {
  id: string; title: string; description: string; priority: string;
  status: string; createdAt: string;
}

function timeAgo(d: string) {
  const diff = Date.now() - new Date(d).getTime();
  const h = Math.floor(diff / 3600000);
  if (h < 1) return "gerade eben";
  if (h < 24) return `vor ${h}h`;
  const days = Math.floor(h / 24);
  if (days < 30) return `vor ${days}d`;
  return `vor ${Math.floor(days / 30)}mo`;
}

const prioBadge: Record<string, string> = {
  Dringend: "text-gray-600 bg-gray-100",
  Hoch: "text-gray-500 bg-gray-100",
  Normal: "text-gray-500 bg-gray-100",
  Niedrig: "text-gray-500 bg-gray-100",
};

const ticketStatusBadge: Record<string, string> = {
  Offen: "text-gray-500 bg-gray-100",
  "In Bearbeitung": "text-blue-600 bg-blue-50",
  "Warten auf Antwort": "text-gray-500 bg-gray-100",
  Geschlossen: "text-gray-500 bg-gray-100",
};

export default function AdminNachrichtenPage() {
  const [messages] = useCachedFetch<Message[]>("/api/portal/admin/nachrichten", []);
  const [tickets] = useCachedFetch<Ticket[]>("/api/portal/admin/tickets", []);
  const loading = messages.length === 0 && tickets.length === 0;
  const [tab, setTab] = useState<"messages" | "tickets">("messages");
  const [search, setSearch] = useState("");

  const unread = messages.filter(m => !m.read).length;
  const openTickets = tickets.filter(t => t.status !== "Geschlossen").length;

  const filteredMessages = messages.filter(m => {
    const s = search.toLowerCase();
    return !s || m.subject.toLowerCase().includes(s) || m.body.toLowerCase().includes(s);
  });

  const filteredTickets = tickets.filter(t => {
    const s = search.toLowerCase();
    return !s || t.title.toLowerCase().includes(s) || t.description.toLowerCase().includes(s);
  });

  return (
    <div className="max-w-6xl mx-auto px-8 md:px-12 pb-24 pt-12 space-y-8">
      <header>
        <h1 className="text-xl font-semibold tracking-tight text-gray-900">Nachrichten & Support</h1>
        <p className="text-sm text-gray-500 mt-1">{messages.length} Nachrichten &middot; {tickets.length} Tickets</p>
      </header>

      {/* Tabs */}
      <div className="flex gap-1">
        <button onClick={() => setTab("messages")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${tab === "messages" ? "bg-gray-900 text-white" : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"}`}>
          <MessageSquare className="w-3.5 h-3.5" />
          Nachrichten {unread > 0 && <span className="px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-medium">{unread}</span>}
        </button>
        <button onClick={() => setTab("tickets")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${tab === "tickets" ? "bg-gray-900 text-white" : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"}`}>
          <LifeBuoy className="w-3.5 h-3.5" />
          Support-Tickets {openTickets > 0 && <span className="px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-500 text-[10px] font-medium">{openTickets}</span>}
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-400" />
        <input type="text" placeholder="Suchen..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)] rounded-xl pl-11 pr-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10" />
      </div>

      {loading ? (
        <div className="py-16 text-center"><Loader2 className="w-5 h-5 text-gray-300 animate-spin mx-auto" /></div>
      ) : tab === "messages" ? (
        <div className="space-y-3">
          {filteredMessages.length === 0 ? (
            <p className="text-sm text-gray-400 py-8 text-center">Keine Nachrichten.</p>
          ) : (
            filteredMessages.map(m => (
              <div key={m.id} className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-5">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {m.read ? <CheckCircle2 className="w-4 h-4 text-gray-300" /> : <Circle className="w-4 h-4 text-blue-500" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm text-gray-900 font-medium">{m.subject}</p>
                      <span className="text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full text-xs font-medium">{m.sender}</span>
                      <span className="text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full text-xs font-medium">{m.type}</span>
                    </div>
                    {m.body && <p className="text-sm text-gray-500 line-clamp-2">{m.body}</p>}
                    <p className="text-xs text-gray-400 mt-1.5">{timeAgo(m.createdAt)}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredTickets.length === 0 ? (
            <p className="text-sm text-gray-400 py-8 text-center">Keine Tickets.</p>
          ) : (
            filteredTickets.map(t => (
              <div key={t.id} className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm text-gray-900 font-medium">{t.title}</p>
                    {t.description && <p className="text-sm text-gray-500 line-clamp-2 mt-1">{t.description}</p>}
                    <p className="text-xs text-gray-400 mt-1.5">{timeAgo(t.createdAt)}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${prioBadge[t.priority] || prioBadge.Normal}`}>{t.priority}</span>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${ticketStatusBadge[t.status] || ticketStatusBadge.Offen}`}>{t.status}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
